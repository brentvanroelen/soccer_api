

//met behulp van chatgpt de connectie opgezet als ook de db aangemaakt: https://chatgpt.com/share/676a8ba7-f63c-8011-aee8-d3ba4c6f82eb
//debugging chatgpt zelfde link
// Maak verbinding met de MySQL-database via Sequelize
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

module.exports = sequelize;

