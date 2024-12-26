const dotenv = require('dotenv');
dotenv.config();  // Zorg ervoor dat de omgevingsvariabelen correct worden geladen

const { Sequelize } = require('sequelize');

// Verkrijg de waarden uit de .env bestand
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

// Verbind met de database met Sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  port: dbPort, // Poortnummer is meestal 3306 voor MySQL
  logging: false,  // Zet logging uit (of laat het aan als je query's wilt zien)
});

// Test de databaseverbinding
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

// Importeren van je model
const Player = require('./player')(sequelize);
const Team = require('./team')(sequelize);

sequelize.sync();

module.exports = { sequelize, Team, Player };  // Exporteer de objecten