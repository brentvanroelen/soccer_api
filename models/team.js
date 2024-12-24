// models/team.js
module.exports = (sequelize, DataTypes) => {
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
      validate: {
        isNumeric: true, // Alleen numerieke waarden toegestaan
      },
    },
    stadium: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,  // Zet timestamps uit
  });

  return Team;
};

  