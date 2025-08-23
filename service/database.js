import { MongoClient } from 'mongodb';
import { readFile } from 'fs/promises';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

const config = JSON.parse(
  await readFile(new URL('./dbConfig.json', import.meta.url))
);
console.log(config);


const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('calendarApp');

// collections
const userCol = db.collection('users');
const tokenCol = db.collection('tokens');
const groupCol = db.collection('groups');
const eventCol = db.collection('events');
const groupPermissionCol = db.collection('groupPermissions');

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


    ////////////////////
    // User Functions //
    ////////////////////
    
    async getUser(userUID) {
        try {
            const gotUser = await userCol.findOne({ userUID });
            if (!gotUser) { throw new Error('User Does Not Exist'); }
            return gotUser;
        }
        catch (e) {
            throw new Error(`getUser failed for userUID=${userUID}: ${e.message}`);
        }
    },

    async getUserByUsername(username) {
        try {
            const gotUser = await userCol.findOne({ username });
            if (!gotUser) { return null; }
            return gotUser;
        }
        catch (e) {
            throw new Error(`getUserByUsername failed for username=${username}: ${e.message}`);
        }
    },

    async userExists(userUID) {
        try {
            const gotUser = await userCol.findOne({ userUID });
            return gotUser !== null;
        }
        catch (e) {
            throw new Error(`userExists failed for userUID=${userUID}: ${e.message}`);
        }
    },

    async setUser(username, password) {
        try {
            const userUID = v4();
            const hashedPassword = await bcrypt.hash(password, 10);
            await userCol.insertOne({ userUID, username, hashedPassword });
            return userUID;
        }
        catch (e) {
            throw new Error(`setUser failed for username=${username}: ${e.message}`);
        }
    },

    async deleteUser(userUID) {
        throw new Error('Not Implemented');
        // await userCol.deleteOne({ userUID });
        // TODO: delete all calendars, events, groups, permissions, tokens associated with this user
    },

    async updateUser(userUID, updates) {
        try {
            const updatesCopy = { ...updates };
            if (updatesCopy.hasOwnProperty('password')) {
                updatesCopy.hashedPassword = await bcrypt.hash(updatesCopy.password, 10);
                delete updatesCopy.password;
            }

            const allowedFields = ['username', 'hashedPassword'];
            const updateData = {};

            // Check for invalid fields
            const invalidFields = Object.keys(updatesCopy).filter(key => !allowedFields.includes(key));
            if (invalidFields.length > 0) {
                throw new Error(`Invalid field(s) in update: ${invalidFields.join(', ')}`);
            }

            // Collect valid fields only
            for (const key of allowedFields) {
                if (updatesCopy.hasOwnProperty(key)) {
                updateData[key] = updatesCopy[key];
                }
            }

            if (Object.keys(updateData).length === 0) {
                throw new Error('No valid fields to update');
            }

            await userCol.updateOne(
                { userUID },
                { $set: updateData }
            );
        }
        catch(e) {
            throw new Error(`updateUser failed for userUID=${userUID}, updates=${JSON.stringify(updates)}: ${e.message}`);
        }
    },

    async getToken(token) {
        try {
            const gotToken = await tokenCol.findOne({ token });
            if (!gotToken) { return null; }
            return gotToken;
        }
        catch (e) {
            throw new Error(`getToken failed: ${e.message}`);
        }
    },

    async setToken(token, userUID) {
        try {
            await tokenCol.insertOne({ token, userUID });
        }
        catch (e) {
            throw new Error(`setToken failed for userUID=${userUID}: ${e.message}`);
        }
    },

    async deleteToken(token) {
        try {
            await tokenCol.deleteOne({ token: token });
        }
        catch (e) {
            throw new Error(`deleteToken failed: ${e.message}`);
        }
    },

    async getUserFromToken(token) {
        try {
            const gotToken = await tokenCol.findOne({ token });
            if (!gotToken) { return null; }
            const user = await userCol.findOne({ userUID: gotToken.userUID });
            if (!user) { return null; }
            return { userUID: user.userUID, username: user.username };
        }
        catch (e) {
            throw new Error(`getUserFromToken failed: ${e.message}`);
        }
    },


    /////////////////////
    // Group Functions //
    /////////////////////

    async groupExists(groupUID) {
        try {
            const gotGroup = await groupCol.findOne({ groupUID: groupUID });
            return gotGroup !== null;
        }
        catch (e) {
            throw new Error(`groupExists failed for groupUID=${groupUID}: ${e.message}`);
        }
    },


    async getGroup(groupUID) {
        try {
            const gotGroup = await groupCol.findOne({ groupUID: groupUID });
            if (!gotGroup) { throw new Error('Group Does Not Exist'); }
            return gotGroup;
        }
        catch (e) {
            throw new Error(`getGroup failed for groupUID=${groupUID}: ${e.message}`);
        }
    },

    async setGroup(userUID, group) {
        const session = client.startSession();
        
        try {
            session.startTransaction();

            if (!group || !group.groupUID) { throw new Error('Invalid group object'); }
            
            const groupCopy = { ...group };
            if (groupCopy.entries) { delete groupCopy.entries; } // entries are stored separately

            await groupCol.insertOne(groupCopy, { session })
            await groupPermissionCol.insertOne({ userUID, groupUID: groupCopy.groupUID, permission: 'owner' }, { session });
            await session.commitTransaction();
            await session.endSession();
        }
        catch (e) {
            await session.abortTransaction();
            await session.endSession();
            throw new Error(`setGroup failed for groupUID=${group.groupUID}: ${e.message}`);
        }
    },

    async getGroupsForUser(userUID) {
        try {
            const gotGroupPermissions = await groupPermissionCol.find({ userUID }).toArray();
            if (!gotGroupPermissions || gotGroupPermissions.length === 0) { return [];}
            const groupUIDs = gotGroupPermissions.map(gp => gp.groupUID);
            if (!groupUIDs || groupUIDs.length === 0) { return []}
            const gotGroups = await groupCol.find({ groupUID: { $in: groupUIDs } }).toArray();
            return gotGroups;
        }
        catch (e) {
            throw new Error(`getAllGroupsForUser failed for userUID=${userUID}: ${e.message}`);
        }
    },
    
    async updateGroup(groupUID, updates) {
        // TODO: validate updates
        try {
            const updateData = { ...updates };
            const result = await groupCol.updateOne(
                { groupUID: groupUID },
                { $set: updateData }
            );
        }
        catch (e) {
            throw new Error(`updateGroup failed for groupUID=${groupUID}, updates=${JSON.stringify(updates)}: ${e.message}`);
        }
    },

    async deleteGroup(groupUID) {
        const session = client.startSession();
        
        try {
            session.startTransaction();
            await groupCol.deleteOne({ groupUID });
            await eventCol.deleteMany({ groupUID });
            await groupPermissionCol.deleteMany({ groupUID });
            await session.commitTransaction();
            await session.endSession();
        }
        catch (e) {
            await session.abortTransaction();
            await session.endSession();
            throw new Error(`deleteGroup failed for groupUID=${groupUID}: ${e.message}`);
        }
    },


    /////////////////////
    // Event Functions //
    /////////////////////

    async setEvent(groupUID, event) {
        try {
            if (!event || !event.eventUID) { throw new Error('Invalid event object'); }

            if (await this.groupExists(groupUID) === false) {
                throw new Error(`Group with UID ${groupUID} does not exist`);
            }

            await eventCol.insertOne({ eventUID: event.eventUID, groupUID, event })
        }
        catch (e) {
            throw new Error(`setEvent failed for groupUID=${groupUID}: ${e.message}`);
        }
    },

    async eventExists(eventUID) {
        try {
            const gotEvent = await eventCol.findOne({ eventUID });
            return gotEvent !== null;
        }
        catch (e) {
            throw new Error(`eventExists failed for eventUID=${eventUID}: ${e.message}`);
        }
    },

    async getEvent(eventUID) {
        try {
            const gotEvent = await eventCol.findOne({ eventUID });
            if (!gotEvent) { throw new Error("Event Does Not Exist"); }
            return gotEvent;
        }
        catch (e) {
            throw new Error(`getEvent failed for eventUID=${eventUID}: ${e.message}`);
        }
        
    },

    async updateEvent(eventUID, updates) {
        //TODO: implement
        throw new Error('Not Implemented');
    },
    
    async getEventsForGroup(groupUID) {
        try {
            if (await this.groupExists(groupUID) === false) {
                throw new Error(`Group with UID ${groupUID} does not exist`);
            }
            return await eventCol.find({ groupUID }).toArray();
        }
        catch (e) {
            throw new Error(`getEventsByGroup failed for groupUID=${groupUID}: ${e.message}`);
        }
    },

    async getEventsForUser(userUID) {
        try {
            const gotGroupPermissions = await groupPermissionCol.find({ userUID }).toArray();
            if (!gotGroupPermissions || gotGroupPermissions.length === 0) { return [];}
            const groupUIDs = gotGroupPermissions.map(gp => gp.groupUID);
            if (!groupUIDs || groupUIDs.length === 0) { return []}
            const events = await eventCol.find({ groupUID: { $in: groupUIDs } }).toArray();
            if (!events || events.length === 0) { return [] }
            return events;
        }
        catch (e) {
            throw new Error(`getEventsForUser failed for userUID${userUID}: ${e.message}`);
        }
    },
    
    async deleteEvent(eventUID) {
        try {
            await eventCol.deleteOne({ eventUID });
        }
        catch (e) {
            throw new Error(`deleteEvent failed for eventUID=${eventUID}: ${e.message}`);
        }
    },

    /////////////////
    // Permissions //
    /////////////////

    async getPermission(userUID, groupUID) {
        try {
            const gotPermission = await groupPermissionCol.findOne({ userUID, groupUID });
            if (!gotPermission) { return null; }
            return gotPermission.permission;
        }
        catch (e) {
            throw new Error(`getPermission failed for userUID=${userUID}, groupUID=${groupUID}: ${e.message}`);
        }
    }
}

export default dataStore;