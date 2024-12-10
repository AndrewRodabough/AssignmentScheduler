export class DevController {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async clear() {

        console.log("DC: Clear");

        this.dataStore.clear()
    }
}