// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { login} from './Requests/Authentication/login';
import { createUser } from './Requests/Authentication/createUser';
import { logout } from './Requests/Authentication/logout';
import { createCalendar } from './Requests/Calendar/createCalendar.js';
import { getAllCalendar } from './Requests/Calendar/getAllCalendars.js';
import { Calendar } from './models/calendar.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [calendars, setCalendars] = useState([]);

    const handleLogin = async (userData) => {
        try {
            const result = await login(userData.username, userData.password);
            userData.token = result;
            setUser(userData);
        } catch (error) {
            throw error;
        }
    };

    const handleRegister = async (userData) => {
        try {
            const result = await createUser(userData.username, userData.password);
            await handleLogin(userData);
        } catch (error) {
            throw error;
        }
    };

    const handleLogout = async () => {
        try {
            const result = await logout(user.token);
            setUser(null);
        } catch (error) {
            throw error;
        }
    };

    const handleCreateCalendar = async (calendarName) => {
        try {

            if (!user || !user.token) {
                throw new Error('User must be logged in to create a calendar');
            }

            const result = await createCalendar(user.token, calendarName);
        }
        catch (error) {
            throw error;
        }
    }

    const handleGetAllCalendar = async () => {
        try {

            if (!user || !user.token) {
                throw new Error('User must be logged in to get calendar');
            }

            const result = await getAllCalendar(user.token);
            setCalendars(result);
        }
        catch (error) {
            throw error;
        }        
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
