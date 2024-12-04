export class DevController {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async clear() {
        this.dataStore.calendars = [];
        this.dataStore.events = {};
        this.dataStore.users = {};
        this.dataStore.tokens = {};
    }
}