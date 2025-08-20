import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext.jsx';
import CalDeleteCal from './calDeleteCal.jsx';
import CalViewCal from './calViewCal.jsx';
import CalCreateEvent from './calCreateEvent.jsx';
import CalCreateCal from './calCreateCal.jsx';
import CalShareCal from './calShareCal.jsx';
import './calendar.css';

export const CalControls = () => {
    const { handleGetAllCalendar, handleGetAllEvent, calendars } = useAuth();
    useEffect(() => { handleGetAllCalendar(); handleGetAllEvent(); }, []); //KEEP COMMENT TO STOP UPDATE ON REFRESH

    const [activeMenu, setActiveMenu] = useState(null);
    const toggleMenu = (calendarName, e) => {
        e.stopPropagation();
        setActiveMenu(activeMenu === calendarName ? null : calendarName);
    };
    useEffect(() => {
        const closeDropdowns = (e) => {
            if (!e.target.closest('.menu-container')) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('click', closeDropdowns);
        return () => document.removeEventListener('click', closeDropdowns);
    }, []);

    return (
        <>
            <section className='box calendar-controls'>
                <CalShareCal />
                <CalCreateCal />
                <CalCreateEvent />
                <CalDeleteCal />
                <CalViewCal />
            </section>
        </>    
    )
}

export default CalControls;