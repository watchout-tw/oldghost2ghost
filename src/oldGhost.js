import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
let ghost = axios.create({
  baseURL: `https://${process.env.OLD_GHOST_API_URL}/ghost/api/v0.1/`
});
let clientAuthString = `client_id=${process.env.OLD_GHOST_CLIENT_ID}&client_secret=${process.env.OLD_GHOST_CLIENT_SECRET}`;

/**
* Get Articles
*/
const getOldGhostArticles = () => {
  const defaultInclude = ['authors'];
  return ghost.get(`/posts?limit=all&formats=mobiledoc&include=${defaultInclude.join(',')}&${clientAuthString}`);
};

/**
* Get Authors
*/
const getOldGhostAuthors = () => {
  return ghost.get(`/users?limit=all&${clientAuthString}`);
};

module.exports = {
  getOldGhostArticles,
  getOldGhostAuthors
};
