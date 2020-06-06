import fs from 'fs';
import path from 'path';

const getLogFileName = (type) => {
  const t = new Date();
  return `${type}-${t.getFullYear()}-${t.getMonth()}-${t.getDate()}-${t.getHours()}-${t.getMinutes()}-${t.getSeconds()}`;
};

const newLog =  (type) => {
  const t = getLogFileName(type);
  fs.writeFileSync(
    path.join(__dirname, `../log/${t}.json`),
    '[]'
  );
  return t;
};

const readLog = async (logName) => {
  let rawdata = await fs.readFileSync(path.join(__dirname, `../log/${logName}.json`));
  return (JSON.parse(rawdata));
};

const addLog =  async (newData, logName) => {
  const data = await readLog(logName);
  data.push(newData);
  fs.writeFileSync(
    path.join(__dirname, `../log/${logName}.json`),
    JSON.stringify(data)
  );  
};

const delLog = async (logName) => {
  fs.unlinkSync(
    path.join(__dirname, `../log/${logName}.json`)
  );  
};

const setLog =  async (data, logName) => {
  fs.writeFileSync(
    path.join(__dirname, `../log/${logName}.json`),
    JSON.stringify(data)
  );  
};

module.exports = {
  newLog,
  readLog,
  addLog,
  delLog,
  setLog
};