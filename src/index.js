import dotenv from 'dotenv';
import {getOldGhostArticles} from './oldGhost';
import {addGhostArticles} from './newGhost';
import {startMatchUser, readTunningAuthors, ghostRebirth} from './matchUsers';
//import {readLog, writeLog, clearnLog} from './log';
//import fs from 'fs';
//import path from 'path';
dotenv.config();

const start = async () => {
  try {
    await startMatchUser();
    let authors = await readTunningAuthors();

    for ( let author of authors) {
      const articles = await getOldGhostArticles(author.oldSlug);
      //clearnLog();
      let posts = articles.data.posts;
      for ( let post of posts) {

        if (post.id === '5df0e1b29bdff04a7c735291') {
          console.log('[TEST] test add post', post);
          const addRes = await addGhostArticles(post,ghostRebirth(post.author));
          console.log('[TEST] add post : ',addRes);
        }


        //console.log(`post ID : ${post.id}`);
        //let logArr = readLog();
        //console.log('logArr :', logArr);
        //logArr.push(post.id);
        //writeLog(logArr);
      }

      console.log(`[READ Articles] old ghost <${author.oldSlug}>  - (${articles.data.posts.length})articles`);
    }

    /*
    const articles = await getOldGhostArticles();
    console.log('[OLD GHOST] GET %d Articles', articles.data.posts.length);
    fs.writeFileSync(
      path.join(__dirname, '../output/old_ghost_articles.json'),
      JSON.stringify(articles.data)
    );

    const authors = await getOldGhostAuthors();
    console.log('[OLD GHOST] GET %d authors', authors.data.users.length);
    */

  } catch (error) {
    console.error('[SYSTEM] ERROR: ',error);
  }
  
};

start();

