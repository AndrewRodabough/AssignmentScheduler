import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../context/calendarContext';
import './calendar.css';

export const CalDeleteCal = () => {

    const { handleGetAllCalendar, calendars, handleGetAllEvent, handleDeleteCalendar} = useContext(CalendarContext);
    useEffect(() => { handleGetAllCalendar(); handleGetAllEvent(); }, []);        //KEEP COMMENT TO STOP UPDATE ON REFRESH
    
    const handleSubmitDeleteCalendar = async (e) => {
        e.preventDefault();

        const calendar = document.querySelector('select[name="deleteCalendarCalendar"]');

        if (calendar && calendar.value) {
        
            try {    
                await handleDeleteCalendar(calendar.value);
                await handleGetAllCalendar();
                await handleGetAllEvent();
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <section>
                <h3>Delete Calendar</h3>
                <select id="deleteCalendarCalendar" name="deleteCalendarCalendar">
                    {
                        calendars.length === 0 ? (
                            <option disabled value="">You Have No Calendars</option>
                        ) : (
                            calendars.map(calendar => (
                            <option 
                                key={calendar.name} 
                                value={calendar.name}
                            >
                                {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1)}
                            </option>
                            ))
                        )
                    }
                </select>
                <form onSubmit={handleSubmitDeleteCalendar}>
                    <button type="submit">Delete</button>
                </form>
            </section>
        </>    
    )
    
}

export default CalDeleteCal;