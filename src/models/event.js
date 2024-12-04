export class Event {
    constructor(id, title, startDate, startTime, endDate, endTime, calendarName) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.calendarName = calendarName;
    }
}