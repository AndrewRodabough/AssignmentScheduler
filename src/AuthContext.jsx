// src/contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { login} from './Requests/Authentication/login';
import { createUser } from './Requests/Authentication/createUser';
import { logout } from './Requests/Authentication/logout';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

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

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout }}>
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
