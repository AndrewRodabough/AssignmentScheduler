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

    const handleLogin = async (userInfo) => {
        const result = await loginApi(userInfo.username, userInfo.password);
        const newUserData = { username: userInfo.username, token: result };
        setUser(newUserData);
    }

    const handleLogout = async () => {
        await logoutApi(user.token);
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