const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();  // Zorg ervoor dat de omgevingsvariabelen correct worden geladen

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

// Importeren van je model
const Team = require('./team')(sequelize, Sequelize.DataTypes);
const Player = require('./player')(sequelize, Sequelize.DataTypes);

module.exports = { sequelize, Team, Player };  // Exporteer de objecten
