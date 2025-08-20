import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../context/calendarContext.jsx';
import './calendar.css';

export const CalCreateCal = () => {

    const { handleCreateCalendar, handleGetAllCalendar, handleGetAllEvent } = useContext(CalendarContext);
    useEffect(() => { handleGetAllCalendar(); handleGetAllEvent(); }, []);        //KEEP COMMENT TO STOP UPDATE ON REFRESH
    
    const handleSubmitCreateCalendar = async (e) => {
        e.preventDefault();

        const calendarName = document.querySelector('input[name="newCalendarName"]');

        if (calendarName && calendarName.value) {
        
            try {    
                await handleCreateCalendar(calendarName.value);
                await handleGetAllCalendar();
                calendarName.value = '';
            }
            catch(error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <section>
                <h3>Create Calendar</h3>
                <form onSubmit={handleSubmitCreateCalendar}>
                <input 
                    type="text" 
                    name="newCalendarName" 
                    placeholder="Calendar Name"
                    required 
                />  
                <button type="submit" name="CreateCalendar">Create Calendar</button>
                </form>
            </section>
        </>    
    )
}

export default CalCreateCal;