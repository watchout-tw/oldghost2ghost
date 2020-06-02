import fs from 'fs';
import path from 'path';

const getLogFileName = () => {
  const t = new Date();
  return `${t.getFullYear()}-${t.getMonth()}-${t.getDate()}-${t.getHours()}-${t.getMinutes()}-${t.getSeconds()}.json`;
};

const newLog =  () => {
  const t = getLogFileName();
  fs.writeFileSync(
    path.join(__dirname, `../log/${t}`),
    '[]'
  );
  return t;
};

const readLog = async (logName) => {
  let rawdata = await fs.readFileSync(path.join(__dirname, `../log/${logName}`));
  return (JSON.parse(rawdata));
};

const addLog =  async (newData, logName) => {
  const data = await readLog(logName);
  console.log('data :', data);
  data.push(newData);
  fs.writeFileSync(
    path.join(__dirname, `../log/${logName}`),
    JSON.stringify(data)
  );  
};

module.exports = {
  newLog,
  readLog,
  addLog,
};