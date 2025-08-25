export class EventService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getEventsForUser(userUID) {
        try {
            if (!userUID) { throw new Error('userUID is required'); }
            if (!await this.dataStore.userExists(userUID)) {
                throw new Error(`userUID ${userUID} does not exist`);
            }
            return await this.dataStore.getEventsForUser(userUID);
        }
        catch (e) {
            throw new Error(`getEventsForUser failed for userUID=${userUID}: ${e.message}`)
        }
    }

    async getEvent(userUID, eventUID) {
        try {
            if (!userUID) { throw new Error('userUID is required'); }
            if (!eventUID) { throw new Error('eventUID is required'); }
            if (!await this.dataStore.userExists(userUID)) {
                throw new Error(`userUID ${userUID} does not exist`);
            }
            if (!await this.dataStore.eventExists(eventUID)) {
                throw new Error(`eventUID ${eventUID} does not exist`);
            }
            const event = this.dataStore.getEvent(eventUID);
            const permission = await this.dataStore.getPermission(userUID, event.groupUID)
            if (!permission || (permission != 'owner' && permission != 'read' && permission != 'write')) {
                throw new Error(`userUID ${userUID} does not have permission to get eventUID ${eventUID}`);
            }
            return event;
        }    
        catch (e) {
            throw new Error(`getEvent failed with eventUID=${eventUID}: ${e.message}`)
        }
    }

    async createEvent(userUID, groupUID, event) {
        try {
            // TODO validate event data
            if (!userUID) { throw new Error('userUID is required'); }
            if (!groupUID) { throw new Error('groupID is required'); }
            if (!event) { throw new Error('event is required'); }
            if (!await this.dataStore.userExists(userUID)) {
                throw new Error(`userUID ${userUID} does not exist`);
            }
            if (!await this.dataStore.groupExists(groupUID)) {
                throw new Error(`groupUID ${groupUID} does not exist`);
            }
            const permission = await this.dataStore.getPermission(userUID, groupUID)
            if (!permission || (permission != 'owner' && permission != 'write')) {
                throw new Error(`userUID ${userUID} does not have permission to create eventUID ${eventUID}`);
            }
            this.dataStore.setEvent(groupUID, event);
        }
        catch (e) {
            throw new Error(`createEvent failed with userUID=${userUID}, groupUID=${groupUID}: ${e.message}`)
        }
    }

    async updateEvent(userUID, eventUID, updates) {
        try {
            // TODO validate updates
            if (!userUID) { throw new Error('userUID is required'); }
            if (!eventUID) { throw new Error('eventUID is required'); }
            if (!updates) { throw new Error('updates is required'); }
            if (!await this.dataStore.eventExists(eventUID)) {
                throw new Error(`eventUID ${eventUID} does not exist`);
            }
            if (!await this.dataStore.userExists(userUID)) {
                throw new Error(`userUID ${userUID} does not exist`);
            }
            const event = await this.dataStore.getEvent(eventUID);
            const permission = await this.dataStore.getPermission(userUID, event.groupUID);
            if (!permission || (permission!= 'owner' && permission != 'write')) {
                throw new Error(`userUID ${userUID} does not have permission to update eventUID ${eventUID}`);
            }
            await this.dataStore.updateEvent(eventUID, updates);
        }
        catch (e) {
            throw new Error(`updateEvent failed for userUID=${userUID}, eventUID=${eventUID}: ${e.message}`);
        }
    }

    async deleteEvent(eventUID) {
        try {
            if (!eventUID) { throw new Error('eventUID is required'); }
            if (!await this.dataStore.eventExists(eventUID)) {
                throw new Error(`eventUID ${eventUID} does not exist`);
            }
            await this.dataStore.deleteEvent(eventUID);
        }
        catch (e) {
            throw new Error(`deleteEvent failed with eventUID=${eventUID}: ${e.message}`);
        }
    }
}