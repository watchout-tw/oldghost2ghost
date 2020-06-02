import dotenv from 'dotenv';
import {getOldGhostArticles} from './oldGhost';
import {addGhostArticles} from './newGhost';
import {startMatchUser, readTunningAuthors, ghostRebirth} from './matchUsers';
import {newLog, addLog} from './log';
dotenv.config();

const start = async (action) => {
  try {
    await startMatchUser();
    let authors = await readTunningAuthors();
    const logFile = newLog();
    for ( let author of authors) {
      const articles = await getOldGhostArticles(author.oldSlug);
      console.log(`[ARTICLE] old ghost <${author.oldSlug}>  - (${articles.data.posts.length})articles`);
      let posts = articles.data.posts;
      for ( let post of posts) {
        const newGhost = ghostRebirth(post.author, authors);
        const addRes = await addGhostArticles(post, newGhost.newID, newGhost.newEmail, action);
        if(addRes) {
          console.log('[ARTICLE] post added ! ', addRes.title);
          await addLog({
            oldID: post.id,
            newID: addRes.id,
            title: addRes.title,
            author: newGhost.newEmail
          }, logFile);
        }
      }
    }
  } catch (error) {
    console.error('[SYSTEM] ERROR: ',error);
  }
  
};

module.exports = {
  start
};

