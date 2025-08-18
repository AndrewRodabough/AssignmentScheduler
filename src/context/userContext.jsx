import React, { createContext, useState } from "react";

// Create a UserContext
const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const isLoggedIn = () => {
        return user !== null;
    }

     return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
            {children}
        </UserContext.Provider>
  );
};

export { UserContext, UserProvider };