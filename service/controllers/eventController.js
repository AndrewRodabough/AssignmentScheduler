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

        console.log("EC: Create");

        // get user name from token
        const user = await this.userService.getUserFromToken(token);
        if (!user) {
            throw new Error("User not Found");
        }
        
        // get calendar from token
        const calendar = await this.calendarService.get(event.calendarName);
        if (!calendar) {
            throw new Error("Calendar not Found");
        }
        
        // check user and calendar user match
        if (!(calendar.username === user.username)) {
            throw new Error("Unathorized to create event for calendar");
        }

        await this.eventService.create(event);
    }

    async delete() {
        console.log("EC: Delete");
    }

    async update() {
        console.log("EC: Update");
    }

    async get() {
        console.log("EC: get");
    }

    async getAll(token) {

        console.log("EC: GetAll");
        // get username from token
        const user = await this.userService.getUserFromToken(token);
        if (!user) {
            throw new Error("User not Found");
        }
        console.log("valid username")

        //get all calendars from username
        const calendars = await this.calendarService.getAll(user.username);
        console.log("got cal")
        if (!calendars) {
            return []
        }
        
        return this.eventService.getAll(calendars);
    }

    async deleteAll(token, calendarId) {
        console.log("EC: DeleteAll");
        
        // get username from token
        const user = await this.userService.getUserFromToken(token);
        if (!user) {
            throw new Error("User not Found");
        }
        
        // get calendar from token
        const calendar = await this.calendarService.get(calendarId);
        if (!calendar) {
            throw new Error("Calendar not Found");
        }
        
        // check user and calendar user match
        if (!(calendar.username === user.username)) {
            throw new Error("Unathorized to delete events for calendar");
        }

        await this.eventService.deleteAll(calendarId);

        return { message: "success" }
    }

}