import Post from "../models/Post.js"
import User from "../models/User.js"


export const getPostsByInfluencer=async(req,res)=>{
    try {
        let user=await User.findById(req.user.id)
        if(!user.influencer)
            return res.status(403).json({success:false,message:"Invalid request , first register your influencer on our plateform"})
        const posts=await Post.find({influencer:user.influencer})
        if(!posts){
            return res.status(404).json({success:false,message:"Cannot find any posts"})
        }
        return res.status(200).json({success:true,message:"Successfully fetched all posts",posts})
    } catch (error) {
        console.error("Error happened at getPostByInfluencer:",error.message || error)
        return res.status(500).json({success:false,message:"Cannot find your post at the moment , server error"});
        
    }
}

export const getPostByPostId=async (req,res) => {

    const {id}=req.params

    try {
        const post=await Post.findOne({postId:id})
        if(!post)
            return res.status(404).json({success:false,message:"Unable to find the post you are looking for"})

        return res.status(200).json({success:true,message:"Successfully fetched the post",post})
    } catch (error) {
         console.error("Error happened at getPostByInfluencer:",error.message || error)
        return res.status(500).json({success:false,message:"Cannot find your post at the moment , server error"});
    }
    
}