import { GroupService } from '../services/groupService.js';
import { UserService } from '../services/userService.js';
import { EventService } from '../services/eventService.js';

export class GroupController {
    constructor(dataStore) {
        this.userService = new UserService(dataStore);
        this.groupService = new GroupService(dataStore);
        this.eventService = new EventService(dataStore);
    }

    async create(req, res) {
        try {
            const token = req.headers.authorization;
            const { group } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            await this.groupService.createGroup(user.userUID, group);
            return res.status(200).json({ message: "success" });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    async delete(req, res) {
        try {
            const token = req.headers.authorization;
            const { groupUID } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            await this.groupService.deleteGroup(user.userUID, groupUID);
            return res.status(200).json({ message: "success" });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    async getAll(req, res) {
        try {
            const token = req.headers.authorization;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            const groups = await this.groupService.getGroupsForUser(user.userUID);
            return res.status(200).json(groups);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    async share(req, res) {
        try {
            const token = req.headers.authorization;
            const { username, groupUID, permission } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }

            await this.groupService.createPermission(user.userUID, username, groupUID, permission);
            await this.groupService.updateGroup(user.userUID, groupUID, { privacy: "public" });
            return res.status(200).json({ message: "success" });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }

    async update(req, res) {
        try {
            const token = req.headers.authorization;
            const { groupUID, updates } = req.body;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            await this.groupService.updateGroup(user.userUID, groupUID, updates);
            return res.status(200).json({ message: "success" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getAllPermissions(req, res) {
        try {
            const token = req.headers.authorization;
            const user = await this.userService.getUserFromToken(token);
            if (!user) {
                return res.status(404).json({ error: "User not Found" });
            }
            const permissions = await this.groupService.getPermissionsForUser(user.userUID);
            return res.status(200).json(permissions);
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }
}