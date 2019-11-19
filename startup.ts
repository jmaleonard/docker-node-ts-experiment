'use strict';

const bunyan = require('bunyan');
var log = bunyan.createLogger({ name: "startup" });
const { sequelize } = require('./src/postgres/models');
const { Client } = require('pg');

const client = new Client({
  password: "postgres",
  user: "postgres",
  host: "postgres",
});

const createDB = async (dbName) => {
  await client.connect();
  try {
    log.info({}, "Trying to create database");
    await client.query(`CREATE DATABASE ${dbName};`);
  } catch (e) {
    log.info({}, "DATABASE EXISTS");
    return Promise.resolve();
  } finally{
    client.end();
  }
}

const syncTables = async (cleanStart, dbName) => {
  log.info({}, 'SYNCING TABLES');
  await createDB(dbName);
  return sequelize.sync({ force: cleanStart }).then(log.info('Tables are synced')).catch(error => log.error({ error }, 'Error Syncing Tables'))
}

module.exports = { syncTables }
