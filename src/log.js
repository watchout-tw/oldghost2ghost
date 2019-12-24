import fs from 'fs';
import path from 'path';


const readLog =  () => {
  let rawdata = fs.readFileSync(path.join(__dirname, '../output/log.log'));
  return (rawdata.toString().split());
};

const writeLog =  (data) => {
  fs.writeFileSync(
    path.join(__dirname, '../output/log.log'),
    data.toString()
  );  
};


const clearnLog =  () => {
  fs.writeFileSync(
    path.join(__dirname, '../output/log.log'),
    ''
  );  
};

module.exports = {
  readLog,
  writeLog,
  clearnLog
};