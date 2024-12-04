// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { login} from './Requests/Authentication/login';
import { createUser } from './Requests/Authentication/createUser';
import { logout } from './Requests/Authentication/logout';
import { createCalendar } from './Requests/Calendar/createCalendar.js';
import { getAllCalendar } from './Requests/Calendar/getAllCalendars.js';
import { shareCalendar } from './Requests/Calendar/shareCalendar.js';
import { clear } from './Requests/clear.js';
import { createEvent } from './Requests/Event/createEvent.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [calendars, setCalendars] = useState([]);

    const handleLogin = async (userData) => {
        const result = await login(userData.username, userData.password);
        userData.token = result;
        setUser(userData);
    };

    const handleRegister = async (userData) => {
        await createUser(userData.username, userData.password);
        await handleLogin(userData);
    };

    const handleLogout = async () => {
        await logout(user.token);
        setUser(null);
    };

    const handleCreateCalendar = async (calendarName) => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to create a calendar');
        }

        await createCalendar(user.token, calendarName);
    }

    const handleGetAllCalendar = async () => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to get calendar');
        }

        const result = await getAllCalendar(user.token);
        setCalendars(result);
    }

    const handleShareCalendar = async (sharedUsername, sharedCalendar) => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to share calendar');
        }

        await shareCalendar(user.token, sharedUsername, sharedCalendar);
    }

    const handleCreateEvent = async (event) => {
        if (!user || !user.token) {
            throw new Error('User must be logged in to create Event');
        }

        await createEvent(event);
    }

    const handleClear = async () => {
        console.log("clearing");
        await clear();
        console.log("cleared");
    }

    return (
        <AuthContext.Provider value={{
            user,
            calendars,
            handleLogin,
            handleRegister,
            handleLogout,
            handleCreateCalendar,
            handleGetAllCalendar,
            handleShareCalendar,
            handleClear,
            handleCreateEvent
            }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
