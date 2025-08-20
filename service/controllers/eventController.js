import { UserService } from '../services/userService.js';
import { CalendarService } from '../services/calendarService.js';
import { EventService } from '../services/eventService.js';

export class EventController {
    constructor(dataStore) {
        this.userService = new UserService(dataStore);
        this.calendarService = new CalendarService(dataStore);
        this.eventService = new EventService(dataStore);
    }

    async create(req, res) {
        try {
            const token = req.headers.authorization;
            const { event } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            const calendar = await this.calendarService.get(event.calendarName);
            if (!calendar) {
                return res.status(404).json({ error: "Calendar not Found" });
            }
            if (!(calendar.username === user.username)) {
                return res.status(403).json({ error: "Unauthorized to create event for calendar" });
            }
            await this.eventService.create(event);
            return res.status(200).json({ message: "success" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const token = req.headers.authorization;
            const { eventId } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            // You may want to check event ownership here
            await this.eventService.delete(eventId);
            return res.status(200).json({ message: "success" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const token = req.headers.authorization;
            const { event } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            // You may want to check event ownership here
            await this.eventService.update(event);
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
            if (!calendars) {
                return res.status(200).json([]);
            }
            const events = await this.eventService.getAll(calendars);
            return res.status(200).json(events);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}