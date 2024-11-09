import React from 'react';
/*
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
*/
import './app.css';

function App() {

    return (
        <BrowserRouter>
            <div>
                <header>

                </header>

                <Routes>
                    <Route path="/home" />
                    <Route path="/about" />
                    
                    <Route path="/login" />
                    <Route path="/register" />
                    
                    <Route path="/main" />
                    
                    <Route path='*' element={<NotFound />} />


                    <Route
                        path='/'
                        element={
                            <Login
                                userName={userName}
                                authState={authState}
                                onAuthChange={(userName, authState) => {
                                    setAuthState(authState);
                                    setUserName(userName);
                                }}
                            />
                        }
                        exact
                    />

                    {
                        /*
                        <Route path='/play' element={<Play userName={userName} />} />
                        <Route path='/scores' element={<Scores />} />
                        <Route path='/about' element={<About />} />
                        */
                    }
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