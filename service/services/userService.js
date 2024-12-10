export class UserService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getUser(username) {
        if (!username) { throw new Error('Username is required'); }
        return await this.dataStore.getUser(username);
    }

    async createUser(username, password) {
        if (!username || !password) { throw new Error('Username and password are required'); }
        if (await this.dataStore.getUser(username)) { throw new Error('User already exists'); }
        
        await this.dataStore.setUser(username, password)
    }

    async storeToken(token, username) {
        if (!token || !username) { throw new Error('Token and username are required'); }

        await this.dataStore.setToken(token, username)
    }

    async getUserFromToken(token) {
        if (!token) { throw new Error('Token required'); }
        if (!await this.dataStore.getToken(token)) { throw new Error('Token does not Exist'); }

        return await this.dataStore.getUserFromToken(token);
    }

    async deleteToken(token) {
        if (!token) { throw new Error('Token is required'); }
        if (!await this.dataStore.getToken(token)) { throw new Error('Token does not Exist'); }
     
        await this.dataStore.deleteToken(token)
    }
}