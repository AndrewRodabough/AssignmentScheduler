export class EventService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getAll(calendars) {
        console.log("in service")
        const filteredEvents = this.dataStore.events.filter(event =>
            calendars.some(calendar => event.calendarName === calendar.name)
        );
        return filteredEvents;
    }

    async get(eventId) {
        return this.dataStore.events.find(event => event.id === eventId)
    }

    async create(event) {
        console.log(event);
        this.dataStore.events.push(event);
    }

    async update(newEvent) {
        console.log("in update");
        
        const index = this.dataStore.events.findIndex(event => event.id === newEvent.id);

        console.log("survived find");
        
        if (index === -1) {
            throw new Error("event not found");
        }
        this.dataStore.events[index] = newEvent;
    }
}