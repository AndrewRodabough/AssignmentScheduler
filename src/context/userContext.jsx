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
        const token = Cookies.get('token');
        if (username && token) {
            return { username, token };
        }
        return null;
    });

    const isLoggedIn = () => {
        return user !== null;
    }

    const handleLogin = async (userInfo) => {
    const result = await loginApi(userInfo.username, userInfo.password);
    const newUserData = { username: userInfo.username, token: result };
    Cookies.set('username', userInfo.username);
    Cookies.set('token', result);
    setUser(newUserData);
    }

    const handleLogout = async () => {
        if (user && user.token) {
            await logoutApi(user.token);
        }
        Cookies.remove('username');
        Cookies.remove('token');
        setUser(null);
    }

    const handleRegister = async (userInfo) => {
        await createUserApi(userInfo.username, userInfo.password);
        await handleLogin(userInfo);
    }

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, handleLogin, handleLogout, handleRegister }}>
            {children}
        </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };