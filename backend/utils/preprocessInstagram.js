/**
 * Preprocess scraped Instagram data into Influencer + Posts format
 * and compute engagement stats.
 * @param {Object} scrapedData
 * @returns {Object} { influencerData, postsData }
 */
export const preprocessInstagramData = (scrapedData) => {
  if (!scrapedData) throw new Error("No data received from scraper");

  const {
    username,
    fullName,
    followers,
    following,
    profilePic,
    postsCount,
    latestPosts,
  } = scrapedData;

  // Posts array
  const postsData = (latestPosts || []).map((post) => ({
    postId: post.postId,
    imageUrl: post.imageUrl,
    images: post.images || [],
    caption: post.caption || "",
    likesCount: post.likesCount || 0,
    commentsCount: post.commentsCount || 0,
    postedAt: new Date(post.postedAt),
    type:post.type,
    tags: post.tags || [],
    vibe: null, // placeholder for ML enrichment
    quality: {}, // placeholder for ML enrichment
  }));

  // --- Engagement Stats ---
  let avgLikes = 0;
  let avgComments = 0;
  let engagementRate = 0;

  if (postsData.length > 0) {
    const totalLikes = postsData.reduce((sum, p) => sum + p.likesCount, 0);
    const totalComments = postsData.reduce((sum, p) => sum + p.commentsCount, 0);

    avgLikes = totalLikes / postsData.length;
    avgComments = totalComments / postsData.length;
    engagementRate = followers
      ? ((avgLikes + avgComments) / followers) * 100
      : 0;
  }

  // Influencer object (with stats)
  const influencerData = {
    username,
    fullName,
    followers,
    following,
    profilePic,
    postsCount,
    avgLikes,
    avgComments,
    engagementRate,
    scrapedAt: new Date(),
  };

  return { influencerData, postsData };
};
