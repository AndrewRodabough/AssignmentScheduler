/**
 * CalendarContext and CalendarProvider - React context for calendar and event management.
 *
 * This module defines a context and provider for calendars and events within the application.
 * It provides state and handler functions to manage calendars and events, including creating,
 * retrieving, sharing, and deleting calendars, as well as creating events.
 *
 * The provider requires that a user is logged in (with a valid token) to perform operations,
 * and communicates with the backend API using imported helper functions.
 *
 * Exports:
 *   - CalendarContext: The context object for access via useContext in child components.
 *   - CalendarProvider: The provider component that wraps parts of the app needing calendar/event functionality.
 *
 * Provided context value:
 *   - groups: Array of calendar objects for the user.
 *   - handleCreateGroup: Function to create a new calendar.
 *   - handleGetAllGroup: Function to fetch all user's calendars.
 *   - handleShareGroup: Function to share a calendar with another user.
 *   - handleDeleteGroup: Function to delete a user's calendar.
 *   - handleCreateEvent: Function to create a new event.
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
import createGroupApi from "../Api/Group/createGroupApi.js";
import getAllGroupApi from "../Api/Group/getAllGroupsApi.js";
import shareGroupApi from "../Api/Group/shareGroupApi.js";
import deleteGroupApi from "../Api/Group/deleteGroupApi.js";
import createEventApi from "../Api/Event/createEventApi.js";
import getAllEventsApi from "../Api/Event/getAllEventsApi.js"
import getAllPermissionsApi from "../Api/Group/getAllPermissionsApi.js";
import updateGroupApi from "../Api/Group/updateGroupApi.js";
import JSCalendarFactory from "../models/jscalendarfactory.js";
import updateEventApi from "../Api/Event/updateEventApi.js";
import deleteEventApi from "../Api/Event/deleteEventApi.js";

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {

    const { getUserUID, getToken, isLoggedIn } = useContext(UserContext);
    const [groups, setGroups] = useState([]);
    const [events, setEvents] = useState([]);
    const [permissions, setPermissions] = useState([]);

    const eventFieldsToExpose = [
        "eventUID",
        "groupUID",
        "title",
        "description",
        "showWithoutTime",
        "start",
        "duration",
    ];

    const getGroupByGroupUID = (groupUID) => {
        if (!groups || groups.length === 0) return null;
        const group = groups.find(g => g.groupUID === groupUID);
        if (!group) return null;
        return {
            groupUID: group.groupUID,
            title: group.title,
            color: group.color,
            privacy: group.privacy,
        };
    };

    const getGroups = () => {
        return groups.map(group => ({
            groupUID: group.groupUID,
            title: group.title,
            color: group.color,
            privacy: group.privacy,
        }));
    };

    const getEventByEventUID = (eventUID) => {
        if (!events || events.length === 0) return null;
        const event = events.find(e => e.eventUID === eventUID);
        if (!event) return null;
        const exposed = {};
        eventFieldsToExpose.forEach(field => {
            exposed[field] = event[field];
        });
        return exposed;
    };

    const getEventsByGroupUID = (groupUID) => {
        if (!events || events.length === 0) return [];
        return events
            .filter(e => e.groupUID === groupUID)
            .map(event => {
                const exposed = {};
                eventFieldsToExpose.forEach(field => {
                    exposed[field] = event[field];
                });
                return exposed;
            });
    };

    const getEvents = () => {
        return events.map(event => {
            const exposed = {};
            eventFieldsToExpose.forEach(field => {
            exposed[field] = event[field];
            });
            return exposed;
        });
    };

    const getPermissions = () => {
        return permissions.map(permission => ({
            userUID: permission.userUID,
            groupUID: permission.groupUID,
            permission: permission.permission,
        }));
    }

    const getPermissionByGroupUID = (groupUID) => {
        if (!permissions || permissions.length === 0) return null;
        const permission = permissions.find(p => p.groupUID === groupUID);
        if (!permission) return null;
        return {
            userUID: permission.userUID,
            groupUID: permission.groupUID,
            permission: permission.permission,
        };
    }

    const checkLogin = async () => {        
        if (!isLoggedIn()) {
            throw new Error('User is not logged in');
        }
    }

    const handleGetAllRemote = async () => {
        await Promise.all([
            handleGetAllRemoteGroups(),
            handleGetAllRemoteEvents(),
            handleGetAllRemotePermissions()
        ]);
    }

    const handleGetAllRemoteGroups = async () => {
        try {
            checkLogin();
            setGroups(await getAllGroupApi(getToken()));
        }
        catch (e) {
            throw new Error('Failed to get all remote groups: ' + e.message);
        }
    }

    const handleGetAllRemoteEvents = async () => {
        try {
            checkLogin();
            setEvents(await getAllEventsApi(getToken()));
        }
        catch (e) {
            throw new Error('Failed to get all remote events: ' + e.message);
        }
    }

    const handleGetAllRemotePermissions = async () => {
        try {
            checkLogin();
            setPermissions(await getAllPermissionsApi(getToken()));
        }
        catch (e) {
            throw new Error('Failed to get all remote permissions: ' + e.message);
        }
    }

    const handleCreateGroup = async ({
        title,
        color
    }) => {
        try {
            checkLogin();
            const group = JSCalendarFactory.createCalendar()
                .setPrivacy("private")
                .setTitle(title)
                .setColor(color);
            await createGroupApi(getToken(), group);
            setGroups(prev => [...prev, group]);
            setPermissions(prev => [...prev, { userUID: getUserUID(), groupUID: group.groupUID, permission: "owner" }]);
        }
        catch (e) {
            throw new Error('Failed to create group: ' + e.message);
        }
    }

    const handleCreateEvent = async ({
        groupUID,
        title,
        description,
        showWithoutTime,
        start,
        duration,
    }) => {
        try {
            checkLogin();
            const event = JSCalendarFactory.createEvent()
                .setGroupUID(groupUID)
                .setTitle(title)
                .setDescription(description)
                .setShowWithoutTime(showWithoutTime)
                .setStart(start)
                .setDuration(duration);
            await createEventApi(getToken(), event);
            setEvents(prev => [...prev, event]);
        }
        catch (e) {
            throw new Error('Failed to create event: ' + e.message);
        }
    }

    const handleDeleteGroup = async (groupUID) => {
        try {
            checkLogin();
            await deleteGroupApi(getToken(), groupUID);
            setGroups(prev => prev.filter(group => group.groupUID !== groupUID));
        }
        catch(e) {
            throw new Error('Failed to delete group: ' + e.message);
        }
    }

    const handleDeleteEvent = async (eventUID) => {
        try {
            checkLogin();
            await deleteEventApi(getToken(), eventUID);
            setEvents(prev => prev.filter(event => event.eventUID !== eventUID));
        }
        catch (e) {
            throw new Error('Failed to delete event: ' + e.message);
        }
    }

    const handleUpdateEvent = async (eventUID, updates) => {
        try {
            checkLogin();
            await updateEventApi(getToken(), eventUID, updates);
            setEvents(prev => prev.map(event =>
                event.eventUID === eventUID ? { ...event, ...updates } : event
            ));
        }
        catch (e) {
            throw new Error('Failed to update event: ' + e.message);
        }
    }

    const handleUpdateGroup = async (calendarUID, updates) => {
        try {
            checkLogin();
            await updateGroupApi(getToken(), calendarUID, updates);
            setGroups(prev => prev.map(group => group.groupUID === calendarUID ? { ...group, ...updates } : group));
        }
        catch (e) {
            throw new Error('Failed to update group: ' + e.message);
        }
    }

    const handleShareGroup = async (userUID, groupUID, permissionLevel) => {
        try {
            checkLogin();
            await shareGroupApi(getToken(), userUID, groupUID, permissionLevel);
            setGroups(prev => prev.map(group => group.groupUID === groupUID ? { ...group, privacy: "public" } : group));
        }
        catch (e) {
            throw new Error('Failed to share group: ' + e.message);
        }
    }

    return (
        <CalendarContext.Provider value={{
            getGroupByGroupUID,
            getGroups,
            getEventByEventUID,
            getEventsByGroupUID,
            getEvents,
            getPermissions,
            getPermissionByGroupUID,
            handleGetAllRemote,
            handleCreateGroup,
            handleCreateEvent,
            handleUpdateEvent,
            handleUpdateGroup,
            handleDeleteEvent,
            handleDeleteGroup,
            handleShareGroup,
        }}>
            {children}
        </CalendarContext.Provider>
    );
};

export default CalendarContext;
export { CalendarProvider };