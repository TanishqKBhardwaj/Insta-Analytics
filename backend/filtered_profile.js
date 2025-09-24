import fs from "fs";

// Load raw Apify scraper output
const rawData = JSON.parse(fs.readFileSync("profile_output.json", "utf-8"));

// Since it's always a list with one object
const profile = rawData[0];

// Transform into our own format
const formattedData = {
  username: profile.username,
  fullName: profile.fullName,
  followers: profile.followersCount,
  following: profile.followsCount,
  profilePic: profile.profilePicUrlHD || profile.profilePicUrl,
  postsCount: profile.postsCount,
  latestPosts: (profile.latestPosts || []).map(post => ({
    type: post.type,
    caption: post.caption || "",
    hashtags: post.hashtags || [],
    commentsCount: post.commentsCount || 0,
    displayUrl: post.displayUrl,
    images: post.images || [],
    likesCount: post.likesCount || 0,
    timestamp: post.timestamp || null,
  })),
};

// Save to file
fs.writeFileSync("filtered_profile.json", JSON.stringify(formattedData, null, 2));

console.log("✅ Filtered data saved to filtered_profile.json");
