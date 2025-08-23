import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../../context/calendarContext';
import './calendar.css';

export const CalendarDeleteCalendar = ({ onCalendarDeleted }) => {

    const { groups, getGroupNames, handleDeleteGroup, getGroupUID} = useContext(CalendarContext);
    
    const handleSubmitDeleteCalendar = async (e) => {
        e.preventDefault();

        const calendar = document.querySelector('select[name="deleteCalendarCalendar"]');

        if (calendar && calendar.value) {

            const groupUID = getGroupUID(calendar.value)
        
            try {    
                await handleDeleteGroup(groupUID);
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
                        groups.length === 0 ? (
                            <option disabled value="">You Have No Calendars</option>
                        ) : (
                            groups.map(group => (
                            <option 
                                key={group.title} 
                                value={group.title}
                            >
                                {group.title}
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