export class UserService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getUser(username) {
        if (!username) { throw new Error('Username is required'); }
        return this.dataStore.users[username];
    }

    async createUser(username, password) {
        if (!username || !password) { throw new Error('Username and password are required'); }
        if (this.dataStore.users[username]) { throw new Error('User already exists'); }
        
        this.dataStore.users[username] = {
            username:username,
            password:password
        }
    }

    async storeToken(token, username) {
        if (!token || !username) { throw new Error('Token and username are required'); }

        this.dataStore.tokens[token] = {
            token:token,
            username:username
        }

        console.log("token", token, "username", username)
    }

    async getUserFromToken(token) {
        if (!token) { throw new Error('Token required'); }
        if (!this.dataStore.tokens[token]) { throw new Error('Token does not Exist'); }

        console.log(this.dataStore.tokens[token].username)
        return this.dataStore.tokens[token].username

    }

    async deleteToken(token) {
        if (!token) { throw new Error('Token is required'); }
        if (!this.dataStore.tokens[token]) { throw new Error('Token does not Exist'); }
     
        delete this.dataStore.tokens[token];

    }

}