export class EventService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getAll(calendars) {
        console.log("ES: getAll()");
        return await this.dataStore.getAllEvent(calendars);
    }

    async get(eventId) {
        console.log("ES: get()");
        return await this.dataStore.getEvent(eventId);
    }

    async create(event) {
        console.log("ES: create()");
        await this.dataStore.setEvent(event);
    }

    async update(newEvent) {
        console.log("ES: update()");
        await this.dataStore.updateEvent(newEvent);
    }

    async deleteAll(calendarName) {
    
        console.log("ES: deleteAll()");
        await this.dataStore.deleteAllEvent(calendarName);
    }
}