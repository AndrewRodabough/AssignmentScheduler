export class CalendarService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getAll(username) {
        return await this.dataStore.getAllCalendar(username);
    }

    async get(calendarName) {
        return await this.dataStore.getCalendar(calendarName);
    }

    async create(calendar) {
        await this.dataStore.setCalendar(calendar);
    }

    async update(newCalendar) {
        await this.dataStore.updateCalendar(newCalendar)
    }
}