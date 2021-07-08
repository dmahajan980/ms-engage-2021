const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const home = require('./routes/home');
const socketCallback = require('./socket');

// Instantiates Express app.
const app = express();
const server = http.Server(app);
const io = socketIO(server, {
  // TODO: Check if CORS needed for production.
  cors: { origin: '*' },
});

// Home routes
app.use('/', home);

// IO Connection
io.on('connection', socketCallback);

// Start server
const port = process.env.PORT || 3000;
server.listen(port);
