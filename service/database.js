import { MongoClient } from 'mongodb';
import config from './dbConfig.json';

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('calendarApp');

// collections
const userCol = db.collection('users');
const calendarCol = db.collection('calendars');
const eventCol = db.collection('events');
const tokenCol = db.collection('tokens');

process.on('SIGINT', async () => {
    await client.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
});  

const dataStore = {
    async connect() {
        try {
            await client.connect();
            console.log("Connected successfully to MongoDB");
        } catch (error) {
            console.error(`Unable to connect to database: ${error.message}`);
            process.exit(1);
        }
    },

    // User Functions
    async getUser(username) {
        return await userCol.findOne({ username: username });
    },

    async setUser(username, password) {
        await userCol.insertOne({ username, password })
    },

    async getToken(token) {
        return await tokenCol.findOne({ token: token });
    },

    async setToken(token, username) {
        await tokenCol.insertOne({ token, username })
    },

    async deleteToken(token) {
        await tokenCol.deleteOne({ token })
    },

    async getUserByToken(token) {
    return await tokenCol.findOne({ token: token }).username;
    },


    // Calendar Functions
    async getCalendar(name) {
        return await calendarCol.findOne({ name: name });
    },

    async setCalendar(calendar) {
        await calendarCol.insertOne(calendar)
    },

    async getAllCalendar(username) {
        const result = await calendarCol.find({
        $or: [
            { username: username },
            { sharedUsers: username }
        ]
        }).toArray();

        return result;
    },
    
    async updateCalendar(calendar) {
        await calendarCol.updateOne(
            { name: calendar.name }, 
            { $set: calendar }
        )
        
    },


    // Event Functions
    async setEvent(event) {
        await eventCol.insertOne(event)
    },

    async getEvent(eventId) {
        return await eventCol.findOne({ id: eventId });
    },

    async getAllEvent(calendars) {
        const calendarNames = calendars.map(calendar => calendar.name);
        const filteredEvents = await eventCol.find({
            calendarName: { $in: calendarNames }
        }).toArray();
        
        return filteredEvents;
    },

    async updateEvent() {
        return
    },
    
    async getEventsByCalendar(calendarName) {
        return await eventCol.find({ name: calendarName }).toArray();
    },
    
    async deleteEvent(eventId) {
        return await eventCol.deleteOne({ id: eventId });
    }

}

export default dataStore;