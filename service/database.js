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


function getCalendar() {

}

function setCalendar() {

}

function getAllCalendar() {
  
}

// Calendar Functions
async function createCalendar(name, username) {
    const calendar = {
      name,
      username,
      shared: false,
      sharedUsers: [],
    };
    await calendarCol.insertOne(calendar);
  
    return calendar;
  }
  
  function getCalendarsByUsername(username) {
    return calendarCol.find({ username }).toArray();
  }
  
  async function shareCalendar(calendarName, sharedUser) {
    return calendarCol.updateOne(
      { name: calendarName },
      { $set: { shared: true }, $push: { sharedUsers: sharedUser } }
    );
  }
  
  // **Event Functions**
  async function createEvent(event) {
    const newEvent = {
      id: event.id,
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime,
      endTime: event.endTime,
      calendarName: event.calendarName,
    };
    await eventCol.insertOne(newEvent);
  
    return newEvent;
  }
  
  function getEventsByCalendar(calendarName) {
    return eventCol.find({ calendarName }).toArray();
  }
  
  async function deleteEvent(eventId) {
    return eventCol.deleteOne({ id: eventId });
  }
  
  // **Token Functions**
  async function addToken(token, email) {
    const tokenEntry = { token, email };
    await tokenCol.insertOne(tokenEntry);
  
    return tokenEntry;
  }
  
  function getToken(token) {
    return tokenCol.findOne({ token });
  }
  
  module.exports = {
    createUser,
    getUser,
    getUserByToken,
    createCalendar,
    getCalendarsByUsername,
    shareCalendar,
    createEvent,
    getEventsByCalendar,
    deleteEvent,
    addToken,
    getToken,
  };
  