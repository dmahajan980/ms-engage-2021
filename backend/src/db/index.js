const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const UserSchema = require('./schema/user');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', err => console.error('DB: ', err));
db.once('open', () => console.log('DB: Connected successfully.'));

// Schema
const User = mongoose.model('User', UserSchema);

module.exports = { User };
