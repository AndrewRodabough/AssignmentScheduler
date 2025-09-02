/**
 * UserContext and UserProvider - React context for user authentication management.
 * 
 * This module defines a context and provider to manage user authentication state.
 * It provides the current user state, login, logout, and registration handler functions.
 * 
 * The provider manages user state internally, stores username and token in cookies, and uses imported API functions to communicate
 * with the backend for login, logout, and user creation.
 * 
 * Exports:
 *   - UserContext: The context object to consume user-related state and functions.
 *   - UserProvider: The provider component to wrap app parts requiring authentication state.
 * 
 * Provided context value includes:
 *   - user: Current logged-in user information including username and token (stored in cookies).
 *   - setUser: Setter function for user state (primarily for internal use).
 *   - isLoggedIn: Function to check if there is a logged-in user.
 *   - handleLogin: Function to authenticate and log in a user.
 *   - handleLogout: Function to log out the current user.
 *   - handleRegister: Function to register a new user and automatically log them in.
 * 
 * Usage:
 *   Wrap your components within <UserProvider> for them to have access to authentication state 
 *   and actions via UserContext.
 * 
 * Dependencies:
 *   - Uses API helper functions for backend communication.
 *   - Uses js-cookie for storing username and token in cookies.
*/

import React, { createContext, useState } from "react";
import Cookies from "js-cookie";
import loginApi from '../Api/Authentication/loginApi';
import createUserApi from '../Api/Authentication/createUserApi';
import logoutApi from '../Api/Authentication/logoutApi';

const UserContext = createContext();

const UserProvider = ({ children }) => {

    // Initialize user state from cookies if available
    const [user, setUser] = useState(() => {
        const username = Cookies.get('username');
        const userUID = Cookies.get('userUID');
        const token = Cookies.get('token');
        if (username && token && userUID) {
            return { username, token, userUID };
        }
        return null;
    });

    const getToken = () => {
        return user && user.token;
    }

    const getUserUID = () => {
        return user && user.userUID;
    }

    const getUsername = () => {
        return user && user.username;
    }

    const isLoggedIn = () => {
        return user && user.token;
    }

    const handleLogin = async (userInfo) => {
        if (isLoggedIn()) {
            throw new Error('User already logged in');
        }
        
        try {
            const result = await loginApi(userInfo.username, userInfo.password);
            const newUserData = { userUID: result.userUID, username: userInfo.username, token: result.token };
            Cookies.set('username', userInfo.username);
            Cookies.set('token', result.token);
            Cookies.set('userUID', result.userUID);
            setUser(newUserData);         
        }
        catch (e) {
            throw new Error("handleLogin failed: " + e.message);
        }
    }

    const handleLogout = async () => {
        if(!isLoggedIn()) {
            throw new Error('User is not logged in');
        }

        try{
            await logoutApi(user.token);
            Cookies.remove('username');
            Cookies.remove('token');
            Cookies.remove('userUID');
            setUser(null);
        }
        catch (e) {
            throw e;
        }
    }

    const handleRegister = async (userInfo) => {
        if (isLoggedIn()) {
            throw new Error('User already logged in');
        }

        try {
            await createUserApi(userInfo.username, userInfo.password);
            await handleLogin(userInfo);
        }
        catch (e) {
            throw new Error("handleRegister failed: " + e.message);
        }
    }

    return (
        <UserContext.Provider value={{
            getToken,
            getUserUID,
            getUsername,
            isLoggedIn,
            handleLogin,
            handleLogout,
            handleRegister
        }}>
            {children}
        </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };