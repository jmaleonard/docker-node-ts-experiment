const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'your-service' });
const port = process.env.SERVICE_PORT || 8000;
let TIMEOUT: any = process.env.TIMEOUT || 30; // seconds for timeout
const { syncTables } = require('./startup');
const { sequelize } = require('./src/postgres/models/');
import _ from 'lodash';
const { Files } = require('./src/postgres/models');

const writeFile = async (jsonData, fileName) => {
  try {
    await Files.create({ fileName: fileName, data: jsonData });
  } catch (error) {
    log.warn(error)
  }
}

(async () => {
  log.info({}, `Pausing ${TIMEOUT} seconds for the database to startup`);
  await wait(TIMEOUT * 100); // this is here to setup your local postgress
  await syncTables(true, 'Files'); // set to true to remove data on startup
})();

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
