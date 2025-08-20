export class DevController {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async clear(req, res) {
        try {
            console.log("DC: Clear");
            await this.dataStore.clear();
            return res.status(200).json({ message: "success" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}