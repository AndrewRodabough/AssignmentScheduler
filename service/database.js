const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('calendarApp');
const userCol = db.collection('users');
const calendarCol = db.collection('calendars');
const eventCol = db.collection('events');
const tokenCol = db.collection('tokens');

// Test the connection to MongoDB
(async function testConnection() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("Connected successfully to MongoDB");
  } catch (ex) {
    console.error(`Unable to connect to database: ${ex.message}`);
    process.exit(1);
  }
})();


// User Functions
function getUser(username) {
    return userCol.findOne({ username });
}

function setUser(username, password) {
    userCol.insertOne({ username, password })
}

function getToken(token) {
    return tokenCol.findOne({ token });
}

function setToken(token, username) {
    tokenCol.insertOne({ token, username })
}

function deleteToken(token) {
    tokenCol.deleteOne({ token })
}

function getUserByToken(token) {
  return tokenCol.findOne({ token }).username;
}