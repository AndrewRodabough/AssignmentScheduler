import { CalendarService } from '../services/calendarService.js';
import { UserService } from '../services/userService.js';
import { Calendar } from '../../src/models/calendar.js';

export class CalendarController {
    
    constructor(dataStore) {
        this.userService = new UserService(dataStore);
        this.calendarService = new CalendarService(dataStore);
    }

    async create(token, calendarName) {
        // get user name from token
        const username = await this.userService.getUserFromToken(token);
        if (!username) {
            throw new Error("User not Found");
        }
        
        const calendar = new Calendar(calendarName, username);
        
        await this.calendarService.create(calendar);
    }

    async delete(token, CalendarName) {
        
    }

    async update(req, res) {

    }

    async get(req, res) {

    }

    async getAll(token) {
        // get user name from token
        const username = await this.userService.getUserFromToken(token)
        if (!username) {
            throw new Error("User not Found");
        }

        console.log(username)

        // get calendars from username
        return await this.calendarService.getAll(username)
    }

}