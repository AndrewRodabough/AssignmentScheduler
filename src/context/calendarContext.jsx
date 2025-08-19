/**
 * CalendarContext and CalendarProvider - React context for calendar and event management.
 *
 * This module defines a context and provider for calendars and events within the application.
 * It provides state and handler functions to manage calendars and events, including creating,
 * retrieving, sharing, and deleting calendars, as well as creating and fetching events.
 *
 * The provider requires that a user is logged in (with a valid token) to perform operations,
 * and communicates with the backend API using imported helper functions.
 *
 * Exports:
 *   - CalendarContext: The context object for access via useContext in child components.
 *   - CalendarProvider: The provider component that wraps parts of the app needing calendar/event functionality.
 *
 * Provided context value:
 *   - calendars: Array of calendar objects for the user.
 *   - events: Array of event objects for the user.
 *   - handleCreateCalendar: Function to create a new calendar.
 *   - handleGetAllCalendar: Function to fetch all user's calendars.
 *   - handleShareCalendar: Function to share a calendar with another user.
 *   - handleDeleteCalendar: Function to delete a user's calendar.
 *   - handleCreateEvent: Function to create a new event.
 *   - handleGetAllEvent: Function to fetch all user's events.
 *   - handleClear: Function to perform a clearing/reset operation.
 *
 * Usage:
 *   Wrap your component tree in <CalendarProvider> to make calendar/event state and handlers available via CalendarContext.
 *
 * Dependencies:
 *   - Requires UserContext to provide user and authentication token.
 *   - Uses API helper functions for backend communication.
 */

import React, { createContext, useState, useContext } from "react";
import UserContext from './userContext.jsx';
import createCalendarApi from "../Api/Calendar/createCalendarApi";
import getAllCalendarApi from "../Api/Calendar/getAllCalendarsApi";
import shareCalendarApi from "../Api/Calendar/shareCalendarApi";
import deleteCalendarApi from "../Api/Calendar/deleteCalendarApi";
import createEventApi from "../Api/Event/createEventApi";
import getAllEventApi from "../Api/Event/getAllEventsApi";

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {

    const [calendars, setCalendars] = useState([]); // Array to hold user's calendars
    const [events, setEvents] = useState([]); // Array to hold user's events
    const { user } = useContext(UserContext);

    const handleCreateCalendar = async (calendarName) => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to create a calendar');
        }
        // Assume API returns the new calendar object
        const newCalendar = await createCalendarApi(user.token, calendarName);
        if (!newCalendar || !newCalendar.name) {
            // API did not return a valid calendar, do not update state
            return null;
        }
        setCalendars(prev => [...prev, newCalendar]);
        return newCalendar;
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
        // Assume API returns the updated calendar object
        const updatedCalendar = await shareCalendarApi(user.token, sharedUsername, sharedCalendar);
        if (!updatedCalendar || !updatedCalendar.name) {
            // API did not return a valid calendar, do not update state
            return null;
        }
        setCalendars(prev => prev.map(cal => cal.name === updatedCalendar.name ? updatedCalendar : cal));
        return updatedCalendar;
    }

    const handleCreateEvent = async (event) => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to create Event');
        }
        // Assume API returns the new event object
        const newEvent = await createEventApi(user.token, event);
        if (!newEvent || !newEvent.id) {
            // API did not return a valid event, do not update state
            return null;
        }
        setEvents(prev => [...prev, newEvent]);
        return newEvent;
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
            return;
        }
        console.log("sending delete");
        await deleteCalendarApi(user.token, calendarName);
        setCalendars(prev => prev.filter(cal => cal.name !== calendarName));
    }

    return (
        <CalendarContext.Provider value={{ calendars, events, handleCreateCalendar, handleGetAllCalendar, handleShareCalendar, handleCreateEvent, handleGetAllEvent, handleDeleteCalendar, handleClear }}>
            {children}
        </CalendarContext.Provider>
    );
};

export default CalendarContext;
export { CalendarProvider };