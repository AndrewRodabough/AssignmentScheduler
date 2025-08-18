import React, { createContext, useState } from "react";
import loginApi from '../Api/Authentication/loginApi';
import createUserApi from '../Api/Authentication/createUserApi';
import logoutApi from '../Api/Authentication/logoutApi';

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const isLoggedIn = () => {
        return user !== null;
    }

    const handleLogin = async () => {
        const result = await loginApi(userData.username, userData.password);
        userData.token = result;
        setUser(userData);
    }

    const handleLogout = async () => {
        await logoutApi(user.token);
        setUser(null);
    }

    const handleRegister = async () => {
        await createUserApi(userData.username, userData.password);
        await handleLoginApi(userData);
    }

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, handleLogin, handleLogout, handleRegister }}>
            {children}
        </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };