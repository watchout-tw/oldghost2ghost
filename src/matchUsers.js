import dotenv from 'dotenv';
import {getOldGhostAuthors} from './oldGhost';
import {getNewGhostAuthors} from './newGhost';
import fs from 'fs';
import path from 'path';
dotenv.config();


const tune = [
  {
    old: 'lai',
    new: 'lai'
  },
  {
    old: 'kuochun',
    new: 'jasjas110'
  },
  {
    old: 'dev',
    new: 'dev'
  },
  {
    old: 'yu',
    new: 'yuhanliao'
  },
  {
    old: 'roger',
    new: 'rock'
  },
  {
    old: 'windhong',
    new: 'hong'
  },
  {
    old: 'wang',
    new: 'joshwang'
  },
  {
    old: 'chihao',
    new: 'chihao'
  },
  {
    old: 'charlie',
    new: 'charlie'
  },
  {
    old: 'musou',
    new: 'musou'
  }
];

const startMatchUser = async () => {
  try {

    const authors = await getOldGhostAuthors();
    console.log('[OLD GHOST] GET %d authors', authors.data.users.length);
    fs.writeFileSync(
      path.join(__dirname, '../output/old_ghost_authors.json'),
      JSON.stringify(authors.data.users)
    );

    const newAuthors = await getNewGhostAuthors();
    console.log('[NEW GHOST] GET %d authors', newAuthors.length);
    fs.writeFileSync(
      path.join(__dirname, '../output/new_ghost_authors.json'),
      JSON.stringify(newAuthors)
    );

    let formatArr = authors.data.users.map( item => {

      console.log('[Mapping Ghost] old ghost :', item.slug);
      let newID = null;
      let newSlug = null;
      let newName = null;

      tune.forEach(t => {
        if (t.old === item.slug) {

          newAuthors.forEach( n => {
            if (t.new === n.slug) {
              console.log('[Mapping Ghost] Match!!! new ghost :', n.slug);
              newID = n.id;
              newSlug = n.slug;
              newName = n.name;
            }
          });
          
        }
      });

      return {
        oldID: item.id,
        oldSlug: item.slug,
        oldName: item.name,
        newID: newID,
        newSlug: newSlug,
        newName: newName
      };
    });

    fs.writeFileSync(
      path.join(__dirname, '../output/ghost_authors_tunning.json'),
      JSON.stringify(formatArr)
    );


  } catch (error) {
    console.error('[SYSTEM] ERROR: ',error);
  }
  
};

const readTunningAuthors =  () => {
  let rawdata = fs.readFileSync(path.join(__dirname, '../output/ghost_authors_tunning.json'));
  return (JSON.parse(rawdata));
};

const ghostRebirth =  (oldGhost) => {
  let newGhost = null;
  const auth_tunning = readTunningAuthors();
  auth_tunning.forEach( g => {
    if (oldGhost === g.oldID) {
      newGhost = g.newID;
    }
  });
  return newGhost;
};



startMatchUser();

module.exports = {
  startMatchUser,
  readTunningAuthors,
  ghostRebirth
};