const express = require('express');
const { Team } = require('../models/team');  // Zorg ervoor dat dit pad correct is
const router = express.Router();

// Validatie voor het toevoegen en bijwerken van een team
const validateTeam = (team) => {
  if (!team.name || !team.country || !team.founded || !team.stadium) {
    return 'All fields must be filled!';
  }
  if (isNaN(team.founded)) {
    return 'Founded year must be a number!';
  }
  return null;
};

// GET: Alle teams ophalen
router.get('/', async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).send('Error retrieving teams');
  }
});

// GET: Eén team ophalen via id
router.get('/:id', async (req, res) => {
  const teamId = req.params.id;
  try {
    const team = await Team.findByPk(teamId);
    if (team) {
      res.json(team);
    } else {
      res.status(404).send('Team not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving team');
  }
});

// POST: Een nieuw team toevoegen
router.post('/', async (req, res) => {
  const validationError = validateTeam(req.body);
  if (validationError) {
    return res.status(400).send(validationError);
  }
  try {
    const newTeam = await Team.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).send('Error adding team');
  }
});

// PUT: Een team bijwerken via id
router.put('/:id', async (req, res) => {
  const teamId = req.params.id;
  const validationError = validateTeam(req.body);
  if (validationError) {
    return res.status(400).send(validationError);
  }
  try {
    const team = await Team.findByPk(teamId);
    if (team) {
      await team.update(req.body);
      res.json(team);
    } else {
      res.status(404).send('Team not found');
    }
  } catch (error) {
    res.status(500).send('Error updating team');
  }
});

// DELETE: Een team verwijderen via id
router.delete('/:id', async (req, res) => {
  const teamId = req.params.id;
  try {
    const team = await Team.findByPk(teamId);
    if (team) {
      await team.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Team not found');
    }
  } catch (error) {
    res.status(500).send('Error deleting team');
  }
});

module.exports = router;
