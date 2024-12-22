const { Sequelize } = require('sequelize');
require('dotenv').config();

// Maak verbinding met de MySQL-database via Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,  // Je database naam
  process.env.DB_USER,  // Je database gebruiker
  process.env.DB_PASSWORD,  // Je database wachtwoord
  {
    host: process.env.DB_HOST,  // Het IP-adres of de hostname van je database server
    dialect: 'mysql',  // Geef aan dat je MySQL gebruikt
    port: process.env.DB_PORT,  // De poort (standaard is 3306)
  }
);

// Test de verbinding
sequelize.authenticate()
  .then(() => {
    console.log('Verbinding met de database is gelukt!');
  })
  .catch((error) => {
    console.error('Kan geen verbinding maken met de database:', error);
  });

module.exports = sequelize;
