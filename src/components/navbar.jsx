import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/userContext.jsx';

const Navbar = () => {

    const { user, isLoggedIn, handleLogout} = useContext(UserContext);

    return (
        <nav>
            <div>
                <NavLink to="/"><h2>Assignment Scheduler</h2></NavLink>
            </div>
            <div>
                <NavLink to="/">Home</NavLink>

                {isLoggedIn() ? (
                    <>
                        <NavLink to="/main">Main</NavLink>
                        <span>Current User: {user.username}</span>
                        <button onClick={handleLogout}>Logout</button>                            
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                    </>
                )}

            </div>
        </nav>
    );
};

export default Navbar;