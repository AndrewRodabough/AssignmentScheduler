export class EventService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getAll(calendars) {
        return await this.dataStore.getAllEvent(calendars);
    }

    async get(eventId) {
        return await this.dataStore.getEvent(eventId);
    }

    async create(event) {
        await this.dataStore.setEvent(event);
    }

    async update(newEvent) {
        await this.dataStore.updateEvent(newEvent);
    }
}