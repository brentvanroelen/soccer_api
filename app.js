// app.js
const express = require('express');
const dotenv = require('dotenv');
const { sequelize, Team } = require('./models');  // Gebruik de modellen die je hebt geïmporteerd

// Laad de omgevingsvariabelen
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rootroute
app.get('/', (req, res) => {
  res.send('Soccer AI draait!');  // Stuur een tekst terug voor de rootroute
});

// Route om de teams op te halen
app.get('/teams', async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);  // Stuur de teams als JSON terug
  } catch (error) {
    console.error('Fout bij het ophalen van teams:', error);
    res.status(500).json({ message: error.message });
  }
});

// Verbind met de database en start de server
sequelize.authenticate()
  .then(() => {
    console.log('Verbonden met de database!');
    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Kan geen verbinding maken met de database:', error);
  });


