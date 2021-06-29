const express = require('express');
const { v4: uuidV4 } = require('uuid');

const home = express.Router();

home.get('/:roomId', (req, res) => {
  console.log(req.params.roomId)
  res.send(req.params.roomId);
});

home.get('/', (req, res) => {
  // Don't redirect. Send the room id to client.
  // Client will redirect the app with internal routing.

  // TODO:
  // If the client is logged in, send the roomId.
  // Otherwise, throw a 401
  res.redirect(`/${uuidV4()}`);
});

module.exports = home;
