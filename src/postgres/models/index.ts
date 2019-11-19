const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const bunyan = require('bunyan')
const basename = path.basename(module.filename);


/*

I KNOW THIS IS BAD AND I SHOULD NEVER DO THIS
I KNOW I SHOULD USE AND ENV FILE BUT I AM PUSHED FOR TIME HERE SO PLEASE EXCUSE ME! :)

*/


const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  database: process.env.DB_NAME || 'fileAnalysis',
  port: process.env.DB_PORT || '5432',
  password: process.env.DB_PASSWORD || 'postgres',
  username: process.env.DB_USERNAME || 'postgres'
});

const db = { Sequelize, sequelize }
const onlyModels = file =>
  file.indexOf('.') !== 0 &&
  file !== basename &&
  file.slice(-3) === '.ts'
const importModel = file => {
  const modelPath = path.join(__dirname, file)
  const model = sequelize.import(modelPath)
  db[model.name] = model
}
const associate = modelName => {
  if (typeof db[modelName].associate === 'function')
    db[modelName].associate(db)
}
fs.readdirSync(__dirname)
  .filter(onlyModels)
  .forEach(importModel)
Object.keys(db).forEach(associate)

module.exports = db;
