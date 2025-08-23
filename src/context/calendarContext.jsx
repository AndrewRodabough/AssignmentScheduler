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
import JSCalendarFactory from "../models/jscalendarfactory.js";

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {

    const [groups, setGroups] = useState([]);
    const [events, setEvents] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const { user } = useContext(UserContext);

    const getGroupNames = () => {
        if (!groups) { return [] }
        return groups.map(group => group.title);
    }

    const getGroupUID = (groupTitle) => {
        if (!groups || groups.length === 0) return null;

        const group = groups.find(g => g.title === groupTitle);

        return group ? group.groupUID : null;
    };

    const handleCreateGroup = async (groupTitle) => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to create a group');
        }

        try {
            const group = JSCalendarFactory.createCalendar()
                .setPrivacy("private")
                .setTitle(groupTitle);
            await createGroupApi(user.token, group);
            setGroups(prev => [...prev, group]);
            setPermissions(prev => [...prev, { userUID: user.userUID, groupUID: group.groupUID, permission: "owner" }]);
        }
        catch (e) {
            throw e;
        }
    }

    const handleGetAllGroups = async () => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to get all groups');
        }

        try {
            const result = await getAllGroupApi(user.token);
            setGroups(result);
        }
        catch (e) {
            throw e;
        }
    }

    const handleGetAllEvents = async () => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to get all events');
        }

        try {
            const result = await getAllEventsApi(user.token);
            setEvents(result);
        }
        catch (e) {
            throw e;
        }
    }

    const handleShareGroup = async (username, groupUID, permissionLevel) => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to share group');
        }
        
        try {
            const result = await shareGroupApi(user.token, username, groupUID, permissionLevel);
            setGroups(prev => prev.map(group => group.groupUID === groupUID ? { ...group, privacy: "public" } : group));
        }
        catch (e) {
            throw e;
        }
    }

    const handleCreateEvent = async (groupUID, event) => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to create Event');
        }

        try {
            const result = await createEventApi(user.token, groupUID, event);
            //setEvents(prev => prev.map(group => group.groupUID === groupUID ? { ...group, entries: [...group.entries, result] } : group));
        }
        catch (e) {
            throw e;
        }
    }

    const handleDeleteGroup = async (groupUID) => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to delete a group');
        }
        
        try {
            const result = await deleteGroupApi(user.token, groupUID);
            setGroups(prev => prev.filter(group => group.groupUID !== groupUID));
        }
        catch(e) {
            throw e;
        }
    }

    const handleGetAllPermissions = async () => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to get all permissions');
        }

        try {
            const result = await getAllPermissionsApi(user.token);
            setPermissions(result);
        }
        catch (e) {
            throw e;
        }
    }

    const handleUpdateEvent = async (updatedEvent) => {
        throw new Error('Not implemented yet');
    }

    return (
        <CalendarContext.Provider value={{
            groups,
            events,
            permissions,
            setGroups,
            setEvents,
            setPermissions,
            handleCreateGroup,
            handleCreateEvent,
            handleUpdateEvent,
            handleShareGroup,
            handleDeleteGroup,
            handleGetAllGroups,
            handleGetAllEvents,
            handleGetAllPermissions,
            getGroupNames,
            getGroupUID
        }}>
            {children}
        </CalendarContext.Provider>
    );
};

export default CalendarContext;
export { CalendarProvider };