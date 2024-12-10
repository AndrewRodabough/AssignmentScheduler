export class DevController {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async clear() {
        this.dataStore.clear()
    }
}