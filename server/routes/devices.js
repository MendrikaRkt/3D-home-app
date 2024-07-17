const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const devices = await Device.find();
    res.send(devices);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const device = new Device(req.body);
    await device.save();
    res.status(201).send(device);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!device) {
      return res.status(404).send();
    }
    res.send(device);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;