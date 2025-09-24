// dataFilter.js

export function filterInstagramData(rawData) {
  if (!rawData || rawData.length === 0) {
    throw new Error("No profile data found");
  }

  const profile = rawData[0];

  return {
    username: profile.username,
    fullName: profile.fullName,
    followers: profile.followersCount,
    following: profile.followsCount,
    profilePic: profile.profilePicUrlHD || profile.profilePicUrl,
    postsCount: profile.postsCount,
    latestPosts: (profile.latestPosts || []).map(post => ({
      postId:post.id,
      type: post.type,
      caption: post.caption || "",
      tags: post.hashtags || [],
      commentsCount: post.commentsCount || 0,
      imageUrl: post.displayUrl,
      images: post.images || [],
      likesCount: post.likesCount || 0,
      postedAt: post.timestamp || null,
    })),
  };
}
