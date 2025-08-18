import React, { createContext, useState } from "react";
import createCalendarApi from "../Api/Calendar/createCalendarApi";
import getAllCalendarApi from "../Api/Calendar/getAllCalendarsApi";
import shareCalendarApi from "../Api/Calendar/shareCalendarApi";
import deleteCalendarApi from "../Api/Calendar/deleteCalendarApi";
import createEventApi from "../Api/Event/createEventApi";
import getAllEventApi from "../Api/Event/getAllEventsApi";

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {

    const [calendars, setCalendars] = useState([]);
    const [events, setEvents] = useState([]);

    const handleCreateCalendar = async (calendarName) => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to create a calendar');
        }

        await createCalendarApi(user.token, calendarName);
    }

    const handleGetAllCalendar = async () => {
        if (!user || !user.token) {
            console.log('User must be logged in to get calendar');
            return
            //throw new Error('User must be logged in to get calendar');
        }

        const result = await getAllCalendarApi(user.token);
        setCalendars(result);
    }

    const handleShareCalendar = async (sharedUsername, sharedCalendar) => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to share calendar');
        }

        await shareCalendarApi(user.token, sharedUsername, sharedCalendar);
    }

    const handleCreateEvent = async (event) => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to create Event');
        }

        await createEventApi(user.token, event);
    }

    const handleGetAllEvent = async () => {
        console.log("in authcontex to get events");
        if (!user || !user.token) {
            console.log('User must be logged in to get calendar');
            //throw new Error('User must be logged in to get calendar');
            return
        }

        console.log("sending get");
        const result = await getAllEventApi(user.token);
        setEvents(result);
    }

    const handleClear = async () => {
        console.log("clearing");
        await clear();
        console.log("cleared");
    }

    const handleDeleteCalendar = async (calendarName) => {
        if (!user || !user.token) {
            console.log('User must be logged in to delete calendar');
            //throw new Error('User must be logged in to delete calendar');
        }

        console.log("sending delete");
        await deleteCalendarApi(user.token, calendarName);
    }

     return (
        <CalendarContext.Provider value={{ calendars, events, handleCreateCalendar, handleGetAllCalendar, handleShareCalendar, handleCreateEvent, handleGetAllEvent, handleDeleteCalendar, handleClear }}>
            {children}
        </CalendarContext.Provider>
  );
};

export default CalendarContext;
export { CalendarProvider };