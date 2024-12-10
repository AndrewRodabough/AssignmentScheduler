export class UserService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getUser(username) {

        console.log("US: getUser()");

        if (!username) { 
                console.log('US: Username is required');
                throw new Error('US: Username is required'); 
            }
        const gotUser = await this.dataStore.getUser(username);
        console.log("US: gotUser: ", gotUser);
        return gotUser;
    }

    async createUser(username, password) {

        console.log("US: createUser()");

        if (!username || !password) { 
            console.log('US: Username and password are required');
            throw new Error('US: Username and password are required');
        }
        if (await this.dataStore.getUser(username)) { 
            console.log('US: User already exists');
            throw new Error('US: User already exists'); 
        }
        
        await this.dataStore.setUser(username, password)
        console.log("US: setUser: ", {username: username, password: password});
    }

    async storeToken(token, username) {

        console.log("US: storeToken()");

        if (!token || !username) { throw new Error('US: Token and username are required'); }

        await this.dataStore.setToken(token, username)
    }

    async getUserFromToken(token) {

        console.log("US: getUserFromToken()");

        if (!token){
            console.log("US: Token Required")
            throw new Error('US: Token Required');
        }
        if (!await this.dataStore.getToken(token)) {
            console.log("US: Token Does Not Exist")
            throw new Error('US: Token Does Not Exist');
        }

        const gotUser = await this.dataStore.getUserFromToken(token);
        if (!gotUser) {
            console.log("US: user not found");
            return null;
        }
        return gotUser;
    }

    async deleteToken(token) {

        console.log("US: deleteToken()");

        if (!token) { throw new Error('US: Token is required'); }
        if (!await this.dataStore.getToken(token)) { throw new Error('US: Token does not Exist'); }
     
        await this.dataStore.deleteToken(token)
    }
}