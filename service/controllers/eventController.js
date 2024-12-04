import { UserService } from '../services/userService.js';
import { CalendarService } from '../services/calendarService.js';
import { EventService } from '../services/eventService.js';

export class EventController {
    
    constructor(dataStore) {
        this.userService = new UserService(dataStore);
        this.calendarService = new CalendarService(dataStore);
        this.eventService = new EventService(dataStore);
    }

    async create(token, event) {
        // get user name from token
        const username = await this.userService.getUserFromToken(token);
        if (!username) {
            throw new Error("User not Found");
        }
        
        // get calendar from token
        const calendar = await this.calendarService.get(event.calendarName);
        if (!calendar) {
            throw new Error("Calendar not Found");
        }
        
        // check user and calendar user match
        if (!(calendar.username === username)) {
            throw new Error("Unathorized to create event for calendar");
        }

        await this.eventService.create(event);
    }

    async delete() {

    }

    async update() {

    }

    async get() {

    }

    async getAll(username) {
        // get username from token
        const username = await this.userService.getUserFromToken(token);
        if (!username) {
            throw new Error("User not Found");
        }

        //get all calendars from username
        const calendars = await this.calendarService.getAll(username);
        if (!calendars) {
            return []
        }
        
        return this.eventService.getAll(calendars);
    }

}