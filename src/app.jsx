import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UserContext, { UserProvider } from './context/userContext.jsx';
import { CalendarProvider } from './context/calendarContext.jsx';
import Login from './pages/login/login.jsx';
import Home from './pages/home/home.jsx';
import Calendar from './pages/calendar/calendar.jsx';
import Footer from './components/layout/footer.jsx';
import Navbar from './components/layout/navbar.jsx';
import './app.css';
import { Modal } from 'bootstrap';
import { ModalProvider } from './context/modalContext.jsx';

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
                        <Route 
                            path="/main" 
                            element={
                                isLoggedIn() ? <Calendar /> : <Navigate to="/login" replace />
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
                <ModalProvider>
                    <App />
                </ModalProvider>
            </CalendarProvider>
        </UserProvider>
    );
}