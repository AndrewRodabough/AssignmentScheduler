import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

export class UserService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getUser(username) {
        try {
            if (!username) { throw new Error('username is required'); }
            return await this.dataStore.getUserByUsername(username);
        }
        catch (e) {
            throw new Error(`getUser failed for username=${username}: ${e.message}`);
        }
    }

    async createUser(username, password) {
        try {
            if (!password) { throw new Error('password is required') }
            if (!username) { throw new Error('username is required') }
            if (await this.dataStore.getUserByUsername(username)) { 
                throw new Error(`username=${username} already exists`); 
            }
            await this.dataStore.setUser(username, password)
        }
        catch (e) {
            throw new Error(`createUser failed for username=${username}: ${e.message}`)
        }
    }

    async createToken(username, password) {
        try {
            if (!password) { throw new Error('password is required') }
            if (!username) { throw new Error('username is required') }
            const userData = await this.dataStore.getUserByUsername(username);
            if (! await bcrypt.compare(password, userData.hashedPassword)) {
                throw new Error('password does not match');
            }
            const token = v4();
            await this.dataStore.setToken(token, userData.userUID)
            return token
        }
        catch (e) {
            throw new Error(`createToken failed with username=${username}: ${e.message}`)
        }
    }

    async getToken(token) {
        try {
            if (!token){ throw new Error('token Required'); }
            const tokenData = await this.dataStore.getToken(token);
            if (!tokenData) {
                throw new Error('token Does Not Exist');
            }
            return tokenData;
        }
        catch (e) {
            throw new Error(`getToken failed with token=${token}: ${e.message}`)
        }

    }

    async getUserFromToken(token) {
        try {
            if (!token){ throw new Error('token Required'); }
            const tokenData = await this.dataStore.getToken(token);
            if (!tokenData) {
                throw new Error('token Does Not Exist');
            }
            return await this.dataStore.getUserFromToken(token);
        }
        catch (e) {
            throw new Error(`getUserFromToken failed with token=${token}: ${e.message}`);
        }

    }

    async deleteToken(token) {
        try {
            if (!token) { throw new Error('token is required'); }
            if (!await this.dataStore.getToken(token)) { throw new Error('token does not Exist'); }
            await this.dataStore.deleteToken(token);
        }
        catch (e) {
            throw new Error(`deleteToken failed with token=${token}: ${e.message}`);
        }
    }
}