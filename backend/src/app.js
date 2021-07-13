const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

require('dotenv').config();

const home = require('./routes/home');
const auth = require('./routes/auth');
const users = require('./routes/users');
const socketCallback = require('./socket');

// Instantiates Express app.
const app = express();
app.use(bodyParser.json());

// Socket configuration.
const server = http.Server(app);
const io = socketIO(server, {
  // TODO: Check if CORS needed for production.
  cors: { origin: '*' },
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Routes
// TODO: Add v1 before APIs
app.use('/auth', auth);
app.use('/users', users);
app.use('/', home);

// IO Connection
io.on('connection', socket => socketCallback(socket, io));

// Start server
const port = process.env.PORT || 9000;
server.listen(port);
