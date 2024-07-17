const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find().sort('-timestamp');
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;