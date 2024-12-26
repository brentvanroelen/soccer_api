const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    founded: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stadium: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'teams', // Zorg ervoor dat de tabelnaam overeenkomt met de database
    timestamps: false, // Zet timestamps uit als deze niet in de database staan
  });

  return Team;
};