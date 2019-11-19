import GhostAdminAPI from '@tryghost/admin-api';
import dotenv from 'dotenv';
dotenv.config();

// API config
const api = new GhostAdminAPI({
  url: process.env.NEW_GHOST_API_URL,
  version: 'v3',
  key: process.env.NEW_GHOST_ADMIN_API_KEY
});

/**
  * read posts
  * @param {string} url - target url
  */
 const readPosts = () => {
  return api.posts.browse();
};

module.exports = {
  readPosts
};
