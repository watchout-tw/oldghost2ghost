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
  * @param {Steing} author - new ghost author ID
  */
 const addGhostArticles = async (post, author) => {
  const postRes = await api.posts.add({
      title : post.title,
      slug: post.slug,
      mobiledoc: post.mobiledoc,
      feature_image: post.feature_image,
      status: 'published',
      created_at: author,
      created_by: post.created_by,
      updated_at: author,
      updated_by: post.updated_by,
      published_at: author,
      published_by: post.published_by,
      custom_excerpt: post.custom_excerpt,
      author: author,
      url: post.url
  });
  return postRes;
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
