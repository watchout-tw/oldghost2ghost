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
  * read posts
  * @param {string} url - target url
  */
 const getNewGhostAuthors = async () => {
   const users = await api.users.browse();
  return users;
};

module.exports = {
  getnewGhostArticles,
  getNewGhostAuthors
};
