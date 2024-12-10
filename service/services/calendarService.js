export class CalendarService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getAll(username) {

        console.log("CS: getAll()");
        const cals = await this.dataStore.getAllCalendar(username);
        return cals
    }

    async get(calendarName) {
        console.log("CS: get()");
        return await this.dataStore.getCalendar(calendarName);
    }

    async create(calendar) {
        console.log("CS: getcreate()");
        await this.dataStore.setCalendar(calendar);
    }

    async update(newCalendar) {
        console.log("CS: update()");
        await this.dataStore.updateCalendar(newCalendar);
    }
}