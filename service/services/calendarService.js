export class CalendarService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getAll(username) {
        return this.dataStore.calendars.filter(calendar => 
            calendar.username === username
        );
    }

    async create(calendar) {
        console.log(calendar);
        this.dataStore.calendars.push(calendar);
    }
}