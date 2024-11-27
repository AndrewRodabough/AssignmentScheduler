export class Calendar {
    constructor(id, name, userId) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.shared = false;
        this.sharedUsers = [];
    }
}