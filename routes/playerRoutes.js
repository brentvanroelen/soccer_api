const express = require('express');
const { Player } = require('../models');
const router = express.Router();

// Validatie voor het toevoegen en bijwerken van een speler
const validatePlayer = (player) => {
  if (!player.name || !player.position || !player.age || !player.teamId) {
    return 'All fields must be filled!';
  }
  return null;
};

// GET: Alle spelers ophalen
router.get('/', async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    console.error(error); // Voeg deze regel toe om de fout te loggen
    res.status(500).send('Error retrieving players');
  }
});

// GET: Eén speler ophalen via id
router.get('/:id', async (req, res) => {
  const playerId = req.params.id;
  try {
    const player = await Player.findByPk(playerId);
    if (player) {
      res.json(player);
    } else {
      res.status(404).send('Player not found');
    }
  } catch (error) {
    console.error(error); // Voeg deze regel toe om de fout te loggen
    res.status(500).send('Error retrieving player');
  }
});

// POST: Een nieuwe speler toevoegen
router.post('/', async (req, res) => {
  const validationError = validatePlayer(req.body);
  if (validationError) {
    return res.status(400).send(validationError);
  }

  try {
    const newPlayer = await Player.create(req.body);
    res.status(201).json(newPlayer);
  } catch (error) {
    console.error(error); // Voeg deze regel toe om de fout te loggen
    res.status(500).send('Error creating player');
  }
});

// PUT: Een bestaande speler bijwerken
router.put('/:id', async (req, res) => {
  const playerId = req.params.id;
  const validationError = validatePlayer(req.body);
  if (validationError) {
    return res.status(400).send(validationError);
  }

  try {
    const player = await Player.findByPk(playerId);
    if (player) {
      await player.update(req.body);
      res.json(player);
    } else {
      res.status(404).send('Player not found');
    }
  } catch (error) {
    console.error(error); // Voeg deze regel toe om de fout te loggen
    res.status(500).send('Error updating player');
  }
});

// DELETE: Een speler verwijderen via id
router.delete('/:id', async (req, res) => {
  const playerId = req.params.id;
  try {
    const player = await Player.findByPk(playerId);
    if (player) {
      await player.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Player not found');
    }
  } catch (error) {
    console.error(error); // Voeg deze regel toe om de fout te loggen
    res.status(500).send('Error deleting player');
  }
});

// GET: Spelers met paginatie
router.get('/paginate', async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const players = await Player.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
    res.json(players);
  } catch (error) {
    console.error(error); // Voeg deze regel toe om de fout te loggen
    res.status(500).send('Error retrieving players');
  }
});

// GET: Spelers zoeken op naam
router.get('/search', async (req, res) => {
  const { name } = req.query;
  try {
    const players = await Player.findAll({ where: { name } });
    res.json(players);
  } catch (error) {
    console.error(error); // Voeg deze regel toe om de fout te loggen
    res.status(500).send('Error searching players');
  }
});

module.exports = router;