// models/player.js
module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('Player', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true, // Alleen letters toegestaan voor een naam
        },
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      teamId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Teams',
          key: 'id',
        },
      },
    });
  
    return Player;
  };
  