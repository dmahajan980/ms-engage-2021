const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../db/index');

const auth = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || '0123456789abcd';

auth.post('/sign-in', (req, res) => {
  // Verify idToken
  if (
    !req.body.data ||
    !req.body.data.idToken ||
    req.body.data.idToken.exp * 1000 < Date.now().valueOf()
  ) {
    res.sendStatus(401);
    return;
  }

  const { name, email, id, idToken } = req.body.data;
  User.findById(id, async (_, userData) => {
    try {
      // Create new user if no user is found.
      if (!userData) {
        const user = new User({
          name,
          email,
          _id: id,
        });

        await user.save();
      }

      // Generate authToken from JWT and send as response.
      const token = jwt.sign({ id, name, email }, JWT_SECRET);
      res.json({ data: token });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }).lean();
});

module.exports = auth;
