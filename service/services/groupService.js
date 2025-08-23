export class GroupService {
    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    async getGroupsForUser(userUID) {
        try {
            if (!userUID) { throw new Error('userUID is required'); }
            if (!await this.dataStore.userExists(userUID)) {
                throw new Error(`userUID ${userUID} does not exist`);
            }
            return await this.dataStore.getGroupsForUser(userUID);
        }
        catch (e) {
            throw new Error(`getGroupsForUser failed for userUID=${userUID}:${e.message}`)
        }
    }

    async getGroup(userUID, groupUID) {
        try {
            if (!userUID) { throw new Error('userUID is required'); }
            if (!groupUID) { throw new Error('groupUID is required'); }
            if (!await this.dataStore.groupExists(groupUID)) {
                throw new Error(`groupUID ${groupUID} does not exist`);
            }
            if (!await this.dataStore.userExists(userUID)) {
                throw new Error(`userUID ${userUID} does not exist`);
            }
            if (await this.dataStore.getPermission(userUID, groupUID) != 'owner') {
                throw new Error(`userUID ${userUID} does not have permission to delete groupUID ${groupUID}`);
            }
            return await this.dataStore.getGroup(groupUID);
        }
        catch (e) {
            throw new Error(`getGroup failed for userUID=${userUID}, groupUID=${groupUID}: ${e.message}`);
        }

    }

    async createGroup(userUID, group) {
        try {
            // TODO validate group object
            if (!userUID) { throw new Error('userUID is required'); }
            if (!group) { throw new Error('group is required'); }
            if (!await this.dataStore.userExists(userUID)) {
                throw new Error(`createGroup failed for userUID=${userUID}: userUID ${userUID} does not exist`);
            }
            await this.dataStore.setGroup(userUID, group);
        }
        catch (e) {
            throw new Error(`createGroup failed with userUID=${userUID}: ${e.message}`)
        }

    }

    async updateGroup(userUID, groupUID, updates) {
        try {
            // TODO validate updates
            if (!userUID) { throw new Error('userUID is required'); }
            if (!groupUID) { throw new Error('groupUID is required'); }
            if (!updates) { throw new Error('updates is required'); }
            if (!await this.dataStore.groupExists(groupUID)) {
                throw new Error(`groupUID ${groupUID} does not exist`);
            }
            if (!await this.dataStore.userExists(userUID)) {
                throw new Error(`userUID ${userUID} does not exist`);
            }
            const permission = await this.dataStore.getPermission(userUID, groupUID);
            if (!permission || (permission!= 'owner' && permission != 'write')) {
                throw new Error(`userUID ${userUID} does not have permission to update groupUID ${groupUID}`);
            }
            await this.dataStore.updateGroup(groupUID, updates);
        }
        catch (e) {
            throw new Error(`updateGroup failed for userUID=${userUID}, groupUID=${groupUID}: ${e.message}`);
        }
    }

    async deleteGroup(userUID, groupUID) {
        try {
            if (!userUID) { throw new Error('userUID is required'); }
            if (!groupUID) { throw new Error('groupUID is required'); }
            if (!await this.dataStore.groupExists(groupUID)) {
                throw new Error(`groupUID ${groupUID} does not exist`);
            }
            if (!await this.dataStore.userExists(userUID)) {
                throw new Error(`userUID ${userUID} does not exist`);
            }
            const permission = await this.dataStore.getPermission(userUID, groupUID)
            if (!permission || permission != 'owner') {
                throw new Error(`userUID ${userUID} does not have permission to delete groupUID ${groupUID}`);
            }
            await this.dataStore.deleteGroup(groupUID);
        }
        catch (e) {
            throw new Error(`deleteGroup failed for userUID=${userUID}, groupUID=${groupUID}: ${e.message}`);
        }
    }
}