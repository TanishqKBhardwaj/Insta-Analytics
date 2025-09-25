import Influencer from "../models/Influencer.js";
import Post from "../models/Post.js";
import { getInstagramData } from "../data_pipeline/dataextractor.js";
import { preprocessInstagramData } from "../utils/preprocessInstagram.js";
import User from "../models/User.js";
import axios from "axios";

export const registerInfluencerProfile = async (req, res) => {
  try {
    const { username} = req.params;
    const {resultLimit}=req.query
    let user = req.user

    user = await User.findById(user.id)
    if (!user)
      return res.status(404).json({ success: false, message: "User not registered to the website" })

    if (user.influencer)
      return res.status(403).json({ success: false, message: "You cannot update you insta username more than once" })


    //If user exist , we return it
    let influencer = await Influencer.findOne({ username })
    if (influencer) {
      await User.findByIdAndUpdate(user._id, { influencer: influencer._id })
      return res.status(200).json({ success: true, message: "Successfully fetched influencer data", influencer })
    }

    // Fetch from scraper
    const scrapedData = await getInstagramData(username, resultLimit);
    if (!scrapedData) {
      return res.status(404).json({ success: false, message: "Unable to fetch influencer data" });
    }

    // Preprocess into model-friendly objects
    const { influencerData, postsData } = preprocessInstagramData(scrapedData);

    // Save/update Influencer
    influencer = await Influencer.findOneAndUpdate(
      { username },
      influencerData,
      { new: true, upsert: true }
    );

    await User.findByIdAndUpdate(user._id, { influencer: influencer._id })
    await Promise.all(
      postsData.map((post) =>
        Post.findOneAndUpdate(
          { postId: post.postId },
          { ...post, influencer: influencer._id },
          { new: true, upsert: true }
        )
      )
    );




    res.status(200).json({
      success: true,
      message: "Successfully fetched influencer data",
      influencer
    });
  } catch (error) {
    console.error("Error in getInfluencerProfile:", error);
    res.status(500).json({ success: false, message: "Couldn't fecth your data at the moment server Error", error: error.message });
  }
};


export const getInfluencerProfile=async(req,res)=>{
  try {
    let user=req.user

    const influencer=await Influencer.findById(user.influencer)
    if(!influencer)
      return res.status(404).json({success:false,message:"Cannot find your influencer profile in our database"})

    return res.status(200).json({success:true,messsage:"Influencer's data fetched successfully",influencer})
  } catch (error) {
    console.error("Error happened at getInfluencerProfile:",error)
    return res.status(500).json({success:false,message:"Cannot get your influencer data at the moment ,server error"})
  }
}



export const refreshInfluencerData = async (req, res) => {

  try {

    let { influencer } = req.params
    let user = await Influencer.findOne({ username: influencer })
    if (!user) {
      return res.status(404).json({ success: false, message: "Influencer not found in our data, please first register" })
    }

    const today = new Date(); // current date and time

    // Difference in milliseconds
    const diffMs = today - user.scrapedAt;

    // Convert to days
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 10)
      return res.status(400).json({ success: false, message: "You cannot refresh your data in a gap of less than 10 days " })

    // Fetch from scraper
    const scrapedData = await getInstagramData(user.username);
    if (!scrapedData) {
      return res.status(404).json({ success: false, message: "Unable to fetch influencer data" });
    }

    // Preprocess into model-friendly objects
    const { influencerData, postsData } = preprocessInstagramData(scrapedData);

    // Save/update Influencer
    influencer = await Influencer.findOneAndUpdate(
      { username: user.username },
      influencerData,
      { new: true, upsert: true }
    );
    for (const post of postsData) {
      await Post.findOneAndUpdate(
        { postId: post.postId },
        { ...post, influencer: influencer._id },
        { new: true, upsert: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched influencer data",
      influencer
    });

  } catch (error) {
    console.error("Error happened at refreshInfluencerData:", error)
    return res.status(500).json({ success: false, message: "Couldn't refresh your data at the moment , server error" })
  }

}






export const checkInfluencerProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://www.instagram.com/${username}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36",
      },
    });

    if (response.status === 200 && response.data.includes("<!DOCTYPE html>")) {
      // Now check inside HTML if it's public or private
      const isPrivate = response.data.includes("This account is private");

      return res.json({
        success: true,
        exists: true,
        isPrivate,
      });
    }

    return res.json({
      success: false,
      exists: false,
      isPrivate: null,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.json({
        success: true,
        exists: false,
        isPrivate: null,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
