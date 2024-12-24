const express = require('express');
const { Player } = require('../models/player');
const router = express.Router();

// Validatie voor het toevoegen en bijwerken van een speler
const validatePlayer = (player) => {
  if (!player.name || !player.position || !player.birthdate || !player.teamId) {
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
    res.status(500).send('Error adding player');
  }
});

// PUT: Een speler bijwerken via id
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
    res.status(500).send('Error deleting player');
  }
});

module.exports = router;
