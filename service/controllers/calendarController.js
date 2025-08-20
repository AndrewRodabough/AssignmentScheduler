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

    async create(req, res) {
        try {
            const token = req.headers.authorization;
            const { calendarName } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            const calendar = new Calendar(calendarName, user.username);
            await this.calendarService.create(calendar);
            return res.status(200).json({ calendar });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const token = req.headers.authorization;
            const { calendarName } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            const calendar = await this.calendarService.get(calendarName);
            if (!calendar) {
                return res.status(404).json({ error: "Calendar not Found" });
            }
            await this.eventService.deleteAll(calendar.name);
            await this.calendarService.delete(calendar);
            return res.status(200).json({ message: "success" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const token = req.headers.authorization;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            const calendars = await this.calendarService.getAll(user.username);
            return res.status(200).json(calendars);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async share(req, res) {
        try {
            const token = req.headers.authorization;
            const { shareUser, shareCalendar } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            const calendar = await this.calendarService.get(shareCalendar);
            if (!(calendar.username === user.username)) {
                return res.status(403).json({ error: "not authorized to change share status" });
            }
            if (calendar.sharedUsers.findIndex(item => item === shareUser) !== -1) {
                return res.status(409).json({ error: "Already shared to user" });
            }
            calendar.shared = true;
            calendar.sharedUsers.push(shareUser);
            await this.calendarService.update(calendar);
            return res.status(200).json({ calendar });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const token = req.headers.authorization;
            const { calendar } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            // You may want to check if user is authorized to update this calendar
            await this.calendarService.update(calendar);
            return res.status(200).json({ message: "success" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}