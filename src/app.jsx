import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UserContext, { UserProvider } from './context/userContext.jsx';
import { CalendarProvider } from './context/calendarContext.jsx';
import Login from './login/login';
import Home from './home/home';
import Footer from './components/footer.jsx';
import Navbar from './components/navbar.jsx';
import './app.css';

function App() {
    const { isLoggedIn } = useContext(UserContext);
    return (
        <BrowserRouter>
            <div className="page-container">
                <header className='page-header'>
                    <Navbar />
                </header>
                <main className='page-main'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route 
                            path="/login" 
                            element={
                                !isLoggedIn() ? <Login /> : <Navigate to="/main" replace />
                            }
                        />

                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </main >
                <footer className='page-footer'>
                    <Footer />
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Address unknown.</main>;
}

export default function WrappedApp() {
    return (
        <UserProvider>
            <CalendarProvider>
                <App />
            </CalendarProvider>
        </UserProvider>
    );
}