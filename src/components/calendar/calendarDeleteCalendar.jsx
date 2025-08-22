import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../../context/calendarContext';
import './calendar.css';

export const CalendarDeleteCalendar = ({ onCalendarDeleted }) => {

    const { groups, getGroupNames, handleDeleteGroup} = useContext(CalendarContext);
    
    const handleSubmitDeleteCalendar = async (e) => {
        e.preventDefault();

        const calendar = document.querySelector('select[name="deleteCalendarCalendar"]');

        if (calendar && calendar.value) {
        
            try {    
                //await handleDeleteCalendar(calendar.value);
                if (onCalendarDeleted) { onCalendarDeleted() }
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <section>
                <select id="deleteCalendarCalendar" name="deleteCalendarCalendar">
                    {
                        getGroupNames().length === 0 ? (
                            <option disabled value="">You Have No Calendars</option>
                        ) : (
                            getGroupNames().map(calendar => (
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

export default CalendarDeleteCalendar;