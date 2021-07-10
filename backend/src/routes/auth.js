const express = require('express');

const auth = express.Router();

auth.post('/sign-in', (req, res) => {
  res.sendStatus(200);
});

module.exports = auth;
