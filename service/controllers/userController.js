import { UserService } from '../services/userService.js';
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';

export class UserController {
    constructor(dataStore) {
        this.userService = new UserService(dataStore);
        this.JWT_SECRET = process.env.JWT_SECRET;
    }

    async createUser(username, password) {

        // Password hashing
        const saltRounds = 6;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Store user with hashed password
        await this.userService.createUser(username, hashedPassword);
    }

    async login (username, password) {
        
        // Retrieve user
        const user = await this.userService.getUser(username);
        if (!user) {
            throw new Error("User not found");
        }

        // Compare passwords using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = uuid();
        await this.userService.storeToken(token, username);

        return token;
    }

    async logout(token) {

        await this.userService.deleteToken(token);
    }
}