export class CalendarService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getAll(username) {
        const calendars = []
        for (const calendar in this.dataStore.calendars) {
            if (calendar.username === username) {
                calendars.push(calendar)
            }
        }
        return calendars
    }

    async create(calendar) {
        this.dataStore.calendars.push(calendar);
    }

    
}