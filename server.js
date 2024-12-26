const express = require('express');
const bodyParser = require('body-parser');
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const { sequelize } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use('/players', playerRoutes);
app.use('/teams', teamRoutes);
app.use(express.static('public'));

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});