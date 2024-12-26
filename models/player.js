const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Player = sequelize.define('Player', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'team_id', // Zorg ervoor dat de kolomnaam overeenkomt met de database
    },
  }, {
    tableName: 'players', // Zorg ervoor dat de tabelnaam overeenkomt met de database
    timestamps: false, // Zet timestamps uit als deze niet in de database staan
  });

  return Player;
};