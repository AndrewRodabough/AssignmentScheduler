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

process.on('SIGINT', async () => {
    await client.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
});


// User Functions
async function getUser(username) {
    return await userCol.findOne({ username: username });
}

async function setUser(username, password) {
    await userCol.insertOne({ username, password })
}

async function getToken(token) {
    return await tokenCol.findOne({ token: token });
}

async function setToken(token, username) {
    await tokenCol.insertOne({ token, username })
}

async function deleteToken(token) {
    await tokenCol.deleteOne({ token })
}

async function getUserByToken(token) {
  return await tokenCol.findOne({ token: token }).username;
}


// Calendar Functions
async function getCalendar(name) {
    return await calendarCol.findOne({ name: name });
}

async function setCalendar(calendar) {
    await calendarCol.insertOne(calendar)
}

async function getAllCalendar(username) {
    const result = await calendarCol.find({
      $or: [
          { username: username },
          { sharedUsers: username }
      ]
    }).toArray();

    return result;
}
  
async function updateCalendar(calendar) {
    await calendarCol.updateOne(
        { name: calendar.name }, 
        { $set: calendar }
    )
    
}


// Event Functions
async function setEvent(event) {
    await eventCol.insertOne(event)
}

async function getEvent(eventId) {
    return await eventCol.findOne({ id: eventId });
}

async function getAllEvent(calendars) {
    const calendarNames = calendars.map(calendar => calendar.name);
    const filteredEvents = await eventCol.find({
        calendarName: { $in: calendarNames }
    }).toArray();
    
    return filteredEvents;
}

async function updateEvent() {
    return
}
  
async function getEventsByCalendar(calendarName) {
    return await eventCol.find({ name: calendarName }).toArray();
}
  
async function deleteEvent(eventId) {
    return await eventCol.deleteOne({ id: eventId });
}
  