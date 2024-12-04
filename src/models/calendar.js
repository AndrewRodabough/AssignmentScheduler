export class Calendar {
    constructor(name, username) {
        this.name = name;
        this.username = username;
        this.shared = false;
        this.sharedUsers = [];
    }
}