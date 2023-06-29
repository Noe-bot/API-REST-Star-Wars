const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
    console.log('user created')
  } catch (err) {res.status(500).send(err);}});