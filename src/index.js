import dotenv from 'dotenv';
import {getArticles} from './oldGhost';
import fs from 'fs';
import path from 'path';
dotenv.config();

const start = async () => {
  try {
    const data = await getArticles();
    console.log('[OLD GHOST] GET %d Articles', data.data.posts.length);
    fs.writeFileSync(
      path.join(__dirname, '../old_ghost_articles.json'),
      JSON.stringify(data.data)
    );
  } catch (error) {
    console.error('[SYSTEM] ERROR: ',error);
  }
  
};

start();

