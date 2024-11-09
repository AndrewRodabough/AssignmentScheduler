import React from 'react';
import { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';

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
                <header>

                </header>

                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/about" element={<About/>}/>
                    
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    
                    <Route path="/main" element={<Main />}/>
                    
                    <Route path='*' element={<NotFound />} />

                </Routes>

                <footer>
                    <div>
                        <a href="https://github.com/AndrewRodabough/startup.git"> Github </a>
                        <a href="about.html">About this project</a>
                        Author: Andrew Rodabough
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    )
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Address unknown.</main>;
  }
  
  export default App;