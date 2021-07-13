const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../db/index');

const users = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || '0123456789abcd';

users.post('/search', (req, res) => {
  if (!req.body.headers || !req.body.headers['Authorization']) {
    res.sendStatus(401);
    return;
  }

  if (!req.body.data) {
    res.sendStatus(400);
    return;
  }

  const token = req.body.headers['Authorization'];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
      return;
    }

    User.find({ email: req.body.data }, null, { limit: 10 })
      .exec()
      .then(result => res.json(result))
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  });
});

module.exports = users;
