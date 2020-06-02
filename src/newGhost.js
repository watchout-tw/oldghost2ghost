import GhostAdminAPI from '@tryghost/admin-api';
import dotenv from 'dotenv';
dotenv.config();

// API config
const api = new GhostAdminAPI({
  url: `https://${process.env.NEW_GHOST_API_URL}`,
  version: 'v2',
  key: process.env.NEW_GHOST_ADMIN_API_KEY
});

/**
  * read posts
  */
 const getnewGhostArticles = () => {
  return api.posts.browse();
};

/**
  * add posts
  * @param {Object} post - post opject
  * @param {Steing} authorID - new ghost author ID
  * @param {Steing} authorEmail - new ghost author Email
  */
 const addGhostArticles = async (post, authorID, authorEmail, action) => { 
  console.log(`[TEST] action: ${action} | authorID : ${authorID}`);
  if(action === 'test') {
    if ( authorID  !== '1') return null;
    console.log('[TEST] authorID:', authorID);
  }
  console.log('[ARTICLE] adding post : ', post.title);
  return await api.posts.add({
      id : post.id,
      title : `${(action === 'test' ? '[TEST] ' : '')}${post.title}`,
      slug: post.slug,
      mobiledoc: post.mobiledoc,
      feature_image: post.feature_image,
      status: 'published',
      created_at: post.created_at,
      created_by: authorID,
      updated_at: post.updated_at,
      updated_by: authorID,
      published_at: post.published_at,
      published_by: authorID,
      custom_excerpt: post.custom_excerpt,
      authors: [authorEmail],
      url: post.url
  });
};

/**
  * read posts
  * @param {string} url - target url
  */
 const getNewGhostAuthors = async () => {
   const users = await api.users.browse();
  return users;
};




module.exports = {
  getnewGhostArticles,
  addGhostArticles,
  getNewGhostAuthors
};
