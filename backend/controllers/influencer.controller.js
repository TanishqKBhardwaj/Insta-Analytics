import Influencer from "../models/Influencer.js";
import Post from "../models/Post.js";
import { getInstagramData } from "../data_pipeline/dataextractor.js";
import { checkInstagramUserExists } from "../data_pipeline/checkInstagramUserExists.js";
import { preprocessInstagramData } from "../utils/preprocessInstagram.js";
import { uploadInstagramMediaToCloudinary } from "../config/InstaToCloud.js";
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
    if (influencerData.profilePic) {
      influencerData.profilePic = await uploadInstagramMediaToCloudinary(
        influencerData.profilePic,
        `influencer_${username}`
      );
    }

    // 2️⃣ Save or update influencer in DB
     influencer = await Influencer.findOneAndUpdate(
      { username },
      influencerData,
      { new: true, upsert: true }
    );

    await User.findByIdAndUpdate(user._id, { influencer: influencer._id })
   await Promise.all(
      postsData.map(async (post) => {
        // 1️⃣ Upload main imageUrl to Cloudinary
        if (post.imageUrl) {
          post.imageUrl = await uploadInstagramMediaToCloudinary(post.imageUrl, post.postId);
        }

        // 2️⃣ Upload all images in the images array
        if (post.images && post.images.length > 0) {
          const cloudinaryImages = await Promise.all(
            post.images.map((imgUrl, index) =>
              uploadInstagramMediaToCloudinary(imgUrl, `${post.postId}_${index}`)
            )
          );
          post.images = cloudinaryImages;
          // Optionally update imageUrl to first image if not already set
          if (!post.imageUrl && cloudinaryImages.length > 0) {
            post.imageUrl = cloudinaryImages[0];
          }
        }

        // 3️⃣ Assign influencer ID
        post.influencer = influencer._id;

        // 4️⃣ Save or update post in DB
        await Post.findOneAndUpdate(
          { postId: post.postId },
          { ...post },
          { new: true, upsert: true }
        );
      })
    )



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
    user=await User.findById(user.id)
   if(!user)
    return res.status(403).json({success:false,message:"We are not able to locate you in our database, seems like you haven't registered/login yet"})
    

    const influencer=await Influencer.findById(user.influencer)
    if(!influencer)
      return res.status(404).json({success:false,message:"Cannot find your influencer profile in our database"})
    return res.status(200).json({success:true,message:"Influencer's data fetched successfully",influencer})
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
    const exists= await checkInstagramUserExists(username)
    if(!exists){
      return res.status(404).json({success:true,exists:false,message:"This influencer doesn't exist"})
    }

    return res.status(200).json({success:true,message:"Successfully found the user , now let us scrape the data, this may take some time wait...",exists:true})

   
  } catch (error) {
    console.error("Error happened at checkInfluencer controller ")
    return res.status(500).json({success:false,message:"Server error , please try after some time."})
  }
};


