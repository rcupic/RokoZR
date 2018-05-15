'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('config').get('development');

const models = {};
const sequelize = new Sequelize(config.database, config.username, config.password, {dialect: config.dialect, operatorsAliases: config.operatorAliases, pool: config.pool});

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== 'index.js';
}).forEach(function (file) {
  const model = sequelize['import'](path.join(__dirname, file));
  models[model.name] = model;
});

Object.keys(models).forEach(function (modelName) {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
