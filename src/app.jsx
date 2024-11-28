import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login/login';
import Home from './home/home';
import About from './about/about';
import Main from './main/main';
import './app.css';

import { AuthProvider } from './AuthContext.jsx';
import { useAuth } from './AuthContext.jsx';

function App() {
    const { user, handleLogout } = useAuth();

    return (
        <BrowserRouter>
        <div>
            
            <div className="page-container">
                
                {user ? (
                    <header>
                        <nav>
                            <div>
                                <NavLink to="/"><h2>Assignment Scheduler</h2></NavLink>
                            </div>
                            <div>
                                <NavLink to="/main">Main</NavLink>
                                <NavLink to="/about">About Page</NavLink>
                                <span>Current User: {user.username}</span>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </nav>
                    </header>
                ) : (
                    <header>
                        <nav>
                            <div>
                                <NavLink to="/"><h2>Assignment Scheduler</h2></NavLink>
                            </div>
                            <div>
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/login">Login</NavLink>
                                <NavLink to="/about">About Page</NavLink>
                            </div>
                        </nav>
                    </header>
                )}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route 
                        path="/login" 
                        element={
                            !user ? <Login /> : <Navigate to="/main" replace />
                        }
                        />
                    <Route 
                        path="/main" 
                        element={
                            user ? <Main /> : <Navigate to="/login" replace />
                        }
                        />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>

            <footer>
                <div>
                    <a href="https://github.com/AndrewRodabough/startup.git">Github</a>
                    <br />
                    Author: Andrew Rodabough
                </div>
            </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Address unknown.</main>;
}

function AppWithAuth() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}

export default AppWithAuth;
