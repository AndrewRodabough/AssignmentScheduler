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

        console.log("create controller called");
        console.log(token, event);

        // get user name from token
        const username = await this.userService.getUserFromToken(token);
        console.log("username", username);
        if (!username) {
            throw new Error("User not Found");
        }

        console.log("user found");
        
        // get calendar from token
        const calendar = await this.calendarService.get(event.calendarName);
        if (!calendar) {
            throw new Error("Calendar not Found");
        }

        console.log("calendar found");
        
        // check user and calendar user match
        if (!(calendar.username === username)) {
            throw new Error("Unathorized to create event for calendar");
        }

        console.log("calendar / user match");

        await this.eventService.create(event);
    }

    async delete() {

    }

    async update() {

    }

    async get() {

    }

    async getAll(token) {

        console.log("in get all")
        // get username from token
        const username = await this.userService.getUserFromToken(token);
        if (!username) {
            throw new Error("User not Found");
        }
        console.log("valid username")

        //get all calendars from username
        const calendars = await this.calendarService.getAll(username);
        console.log("got cal")
        if (!calendars) {
            return []
        }
        
        return this.eventService.getAll(calendars);
    }

}