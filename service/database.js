import { MongoClient } from 'mongodb';
import { readFile } from 'fs/promises';

const config = JSON.parse(
  await readFile(new URL('./dbConfig.json', import.meta.url))
);
console.log(config);


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

        console.log("DB: getUser()");

        const gotUser = await userCol.findOne({ username: username });
        if (!gotUser) {
            console.log("DB: User Does Not Exist");
            return null;
        }
        console.log("DB: Got User: ", gotUser);
        return gotUser;
    },

    async setUser(username, password) {

        console.log("DB: setUser()");

        await userCol.insertOne({ username: username, password: password })
        console.log("DB: setUser: ", { username: username, password: password });
    },

    async getToken(token) {

        console.log("DB: getToken(", token, ")");

        const gotToken = await tokenCol.findOne({ token: token });
        if (!gotToken) {
            console.log("DB: Token Does Not Exist");
            return null;
        }
        console.log("DB: Got Token: ", gotToken);
        return gotToken;        
    },

    async setToken(token, username) {

        console.log("DB: setToken()");

        await tokenCol.insertOne({ token: token, username: username });
        console.log("DB: setToken: ", { token: token, username: username });
    },

    async deleteToken(token) {

        console.log("DB: deleteToken()");

        await tokenCol.deleteOne({ token: token });
        console.log("DB: deleteToken: ", { token: token });
    },

    async getUserFromToken(token) {

        console.log("DB: getUserFromToken()");

        const gotToken = await tokenCol.findOne({ token: token });
        if (!gotToken) {
            console.log("DB: Token Does Not Exist");
            return null;
        }
        console.log("DB: Got User: ", { username: gotToken.username });
        return { username: gotToken.username };
    },


    // Calendar Functions
    async getCalendar(name) {

        console.log("DB: getCalendar()");

        const gotCalendar = await calendarCol.findOne({ name: name });
        if (!gotCalendar) {
            console.log("DB: Calendar Does Not Exist");
            return null;
        }
        console.log("DB: Got Calendar: ", gotCalendar);
        return gotCalendar;
    },

    async setCalendar(calendar) {

        console.log("DB: setCalendar()");

        await calendarCol.insertOne(calendar)
        console.log("DB: setCalendar: ", calendar);
    },

    async getAllCalendar(username) {

        console.log("DB: getAllCalendar(", username, ")");

        const gotCalendars = await calendarCol.find({
        $or: [
            { username: username },
            { sharedUsers: username }
        ]
        }).toArray();

        if (!gotCalendars) {
            console.log("DB: No Calendars For User");
            return null;
        }
        console.log("DB: Got Calendars: ", gotCalendars);
        return gotCalendars;
    },
    
    async updateCalendar(calendar) {

        console.log("DB: updateCalendar()");
        
        await calendarCol.updateOne(
            { name: calendar.name }, 
            { $set: calendar }
        );
        console.log("DB: updateCalendar: ", calendar);
    },


    // Event Functions
    async setEvent(event) {

        console.log("DB: setEvent()");

        await eventCol.insertOne(event)
        console.log("DB: setEvent: ", event);
    },

    async getEvent(eventId) {

        console.log("DB: getEvent()");

        const gotEvent = await eventCol.findOne({ id: eventId }).event;
        if (!gotEvent) {
            console.log("DB: Event Does Not Exist");
            return null;
        }
        console.log("DB: got Event: ", gotEvent);
    },

    async getAllEvent(calendars) {

        console.log("DB: getAllEvent()");

        const calendarNames = calendars.map(calendar => calendar.name);
        const filteredEvents = await eventCol.find({
            calendarName: { $in: calendarNames }
        }).toArray();
        
        return filteredEvents;
    },

    async updateEvent() {

        console.log("DB: updateEvent()");

        return
    },
    
    async getEventsByCalendar(calendarName) {

        console.log("DB: getEventsByCalendar()");

        return await eventCol.find({ name: calendarName }).toArray();
    },
    
    async deleteEvent(eventId) {

        console.log("DB: deleteEvent()");

        return await eventCol.deleteOne({ id: eventId });
    },

    // dev

    async clear() {

        console.log("DB: clear()");

        eventCol.drop();
        calendarCol.drop();
        userCol.drop();
        tokenCol.drop();
        console.log("DB: db cleared");
    }

}

export default dataStore;