import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    influencer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
      required: true,
    },
    type:{
      type:String
    },
    postId: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    images:{
      type:Array,
      default:[]
    },
    caption: String,
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    postedAt: Date,

    // ML enrichments
    tags: [String],
    vibe: String,
    quality: {
      brightness: Number,
      contrast: Number,
      blurriness: Number,
    },
    result: { 
    type: Object, // can store analysis results
    default: null 
  },

    postedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
