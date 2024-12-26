const express = require('express');
const { Team } = require('../models');
const router = express.Router();

// Validatie voor het toevoegen en bijwerken van een team
const validateTeam = (team) => {
  if (!team.name || !team.country || !team.founded || !team.stadium) {
    return 'All fields must be filled!';
  }
  return null;
};

// GET: Alle teams ophalen
router.get('/', async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    console.error(error); // Voeg deze regel toe om de fout te loggen
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
    console.error(error); // Voeg deze regel toe om de fout te loggen
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
    console.error(error); // Voeg deze regel toe om de fout te loggen
    res.status(500).send('Error creating team');
  }
});

// PUT: Een bestaand team bijwerken
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
    console.error(error); // Voeg deze regel toe om de fout te loggen
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
    console.error(error); // Voeg deze regel toe om de fout te loggen
    res.status(500).send('Error deleting team');
  }
});

// GET: Teams met paginatie
router.get('/paginate', async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const teams = await Team.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
    res.json(teams);
  } catch (error) {
    console.error(error); // Voeg deze regel toe om de fout te loggen
    res.status(500).send('Error retrieving teams');
  }
});

// GET: Teams zoeken op naam
router.get('/search', async (req, res) => {
  const { name } = req.query;
  try {
    const teams = await Team.findAll({ where: { name } });
    res.json(teams);
  } catch (error) {
    console.error(error); // Voeg deze regel toe om de fout te loggen
    res.status(500).send('Error searching teams');
  }
});

module.exports = router;