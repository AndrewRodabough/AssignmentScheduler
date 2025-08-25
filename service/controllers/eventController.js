import { UserService } from '../services/userService.js';
import { GroupService } from '../services/groupService.js';
import { EventService } from '../services/eventService.js';
import { th } from 'date-fns/locale';

export class EventController {
    constructor(dataStore) {
        this.userService = new UserService(dataStore);
        this.groupService = new GroupService(dataStore);
        this.eventService = new EventService(dataStore);
    }

    async create(req, res) {
        try {
            const token = req.headers.authorization;
            const { groupUID, event } = req.body;
            console.log(event);
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            await this.eventService.createEvent(user.userUID, groupUID, event)
            return res.status(200).json({ message: "success" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const token = req.headers.authorization;
            const { eventUID } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            await this.eventService.deleteEvent(eventUID);
            return res.status(200).json({ message: "success" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const token = req.headers.authorization;
            const { eventUID, updates } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            await this.eventService.updateEvent(user.userUID, eventUID, updates);
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
            const events = await this.eventService.getEventsForUser(user.userUID);
            return res.status(200).json(events);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}