import mongoose from "mongoose";

const influencerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
    postsCount: {
      type: Number,
      default: 0,
    },

    // Engagement stats
    avgLikes: {
      type: Number,
      default: 0,
    },
    avgComments: {
      type: Number,
      default: 0,
    },
    engagementRate: {
      type: Number,
      default: 0, // stored as percentage
    },

    // Metadata
    scrapedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Influencer = mongoose.model("Influencer", influencerSchema);

export default Influencer;
