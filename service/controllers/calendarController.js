import { CalendarService } from '../services/calendarService.js';
import { UserService } from '../services/userService.js';
import { EventService } from '../services/eventService.js';
import { Calendar } from '../models/calendar.js';

export class CalendarController {
    
    constructor(dataStore) {
        this.userService = new UserService(dataStore);
        this.calendarService = new CalendarService(dataStore);
        this.eventService = new EventService(dataStore);
    }

    async create(token, calendarName) {

        console.log("CC: Create()");
        // get user name from token
        const user = await this.userService.getUserFromToken(token);
        if (!user) {
            throw new Error("User not Found");
        }
        
        const calendar = new Calendar(calendarName, user.username);
        
        await this.calendarService.create(calendar);
    }

    async delete(token, CalendarName) {
        console.log("CC: Delete()");

        // get username from token
        const user = await this.userService.getUserFromToken(token);
        if (!user) {
            throw new Error("User not Found");
        }
                
        // get calendar from token
        const calendar = await this.calendarService.get(CalendarName);
        if (!calendar) {
            throw new Error("Calendar not Found");
        }
        
        await this.eventService.deleteAll(calendar);
        await this.calendarService.delete(calendar);

        return { message: "success" };
    }

    async update(req, res) {
        console.log("CC: Update()");
    }

    async get(req, res) {
        console.log("CC: Get()");
    }

    async getAll(token) {

        console.log("CC: GetAll()");
        // get user name from token
        const user = await this.userService.getUserFromToken(token);
        if (!user) {
            console.log("CC: User Not Found");
            throw new Error("User not Found");
        }

        // get calendars from username
        return await this.calendarService.getAll(user.username)
    }

    async share(token, shareUser, shareCalendar) {

        console.log("CC: Share()");
        // get user name from token
        const user = await this.userService.getUserFromToken(token)
        if (!user) {
            console.log("CC: User Not Found");
            throw new Error("User not Found");
        }

        const calendar = await this.calendarService.get(shareCalendar);


        console.log(calendar);
        console.log(user);

        if (!(calendar.username === user.username)) {
            console.log("CC: not authorized to change share status");
            throw new Error("not authorized to change share status")
        }

        if (calendar.sharedUsers.findIndex(item => item === shareUser) !== -1) {
            console.log("CC: Already shared to user");
            throw new Error("Already shared to user");
        }

        calendar.shared = true;
        calendar.sharedUsers.push(shareUser);

        await this.calendarService.update(calendar);
    }
}