import React from 'react';
import { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './login/login';
import Register from './register/register';
import Home from './home/home';
import About from './about/about';
import Main from './main/main';

//import { AuthState } from './login/authState';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {

    return (
        <BrowserRouter>
            <div>
                <Routes>

                    <Route element={<LoggedOutHeader/>}>
                        <Route path="/home" element={<Home/>} />
                        <Route path="/about" element={<About/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path='*' element={<NotFound />} />
                    </Route>

                    <Route element={<LoggedInHeader/>}>
                        <Route path="/main" element={<Main />}/>
                    </Route>
                    

                </Routes>

                <footer>
                    <div>
                        <a href="https://github.com/AndrewRodabough/startup.git"> Github </a>
                        <br />
                        <a href="about.html">About</a>
                        <br />
                        Author: Andrew Rodabough
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    )
}

function LoggedInHeader() {
    return (
        <>
            <header>

            </header>
        </>
    )
}
function LoggedOutHeader() {
    return (
        <header>
            <nav>
                <div>
                    <NavLink to="/home"> <h2 >Assignment Scheduler</h2> </NavLink>
                </div>
                <div>
                    <NavLink href="/home">Home</NavLink>
                    <NavLink href="/login">Login</NavLink>
                    <NavLink href="/register">Create Account</NavLink>
                    <NavLink href="/about">About Page</NavLink>
                </div>
            </nav>
        </header>
    )
}


function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Address unknown.</main>;
  }
  
  export default App;