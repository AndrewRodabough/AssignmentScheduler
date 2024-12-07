export class CalendarService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getAll(username) {
        return this.dataStore.calendars.filter(calendar => 
            calendar.username === username || 
            calendar.sharedUsers.includes(username)
        );
    }

    async get(calendarName) {
        return this.dataStore.calendars.find(item => item.name === calendarName)
    }

    async create(calendar) {
        console.log(calendar);
        this.dataStore.calendars.push(calendar);
    }

    async update(newCalendar) {
        
        const index = this.dataStore.calendars.findIndex(calendar => calendar.name === newCalendar.name);
        
        if (index === -1) {
            throw new Error("cal not found");
        }
        this.dataStore.calendars[index] = newCalendar;
    }
}