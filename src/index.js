import dotenv from 'dotenv';
import {getOldGhostArticles, getOldGhostAuthors} from './oldGhost';
import fs from 'fs';
import path from 'path';
dotenv.config();

const start = async () => {
  try {
    const authors = await getOldGhostAuthors();
    console.log('[OLD GHOST] GET %d authors', authors.data.users.length);
    fs.writeFileSync(
      path.join(__dirname, '../old_ghost_authors.json'),
      JSON.stringify(authors.data)
    );

    const articles = await getOldGhostArticles();
    console.log('[OLD GHOST] GET %d Articles', articles.data.posts.length);
    fs.writeFileSync(
      path.join(__dirname, '../old_ghost_articles.json'),
      JSON.stringify(articles.data)
    );

  } catch (error) {
    console.error('[SYSTEM] ERROR: ',error);
  }
  
};

start();

