import { UserService } from '../services/userService.js';
import { v4 as uuidv4 } from 'uuid';

export class UserController {
    constructor(dataStore) {
        this.userService = new UserService(dataStore);
    }

    async createUser(token, username, password) {

        try {

            // Call service to create user
            const user = await this.userService.createUser({
                username,
                password,
                created: new Date(),
                token: uuidv4()
            });

            // Return success response
            res.status(201).json({
                message: 'User created successfully',
                token: user.token
            });

        } catch (error) {
            if (error.message === 'User already exists') {
                return res.status(409).json({ error: error.message });
            }
            // Pass other errors up to route error handler
            throw error;
        }
    }

    async deleteUser(req, res) {

    }
}