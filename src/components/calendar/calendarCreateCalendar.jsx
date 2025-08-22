import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../../context/calendarContext.jsx';
import JSCalendarFactory from '../../models/jscalendarfactory.js';
import './calendar.css';

export const CalendarCreateCalendar = ({ onCalendarCreated}) => {

    const { handleCreateCalendar } = useContext(CalendarContext);
    
    const handleSubmitCreateCalendar = async (e) => {
        e.preventDefault();

        const calendarName = document.querySelector('input[name="newCalendarName"]');

        if (calendarName && calendarName.value) {
        
            try {    
                await handleCreateCalendar(calendarName.value);
                calendarName.value = '';
                if (onCalendarCreated) { onCalendarCreated() }
            }
            catch(error) {
                console.log(error);
            }
        }
    };

    return (
        <section>
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
    )
}

export default CalendarCreateCalendar;