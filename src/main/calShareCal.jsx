import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../context/calendarContext.jsx';
import './main.css';

export const CalShareCal = () => {

    const { handleGetAllCalendar, handleShareCalendar, calendars, handleGetAllEvent } = useContext(CalendarContext);
    useEffect(() => { handleGetAllCalendar(); handleGetAllEvent(); }, []);        //KEEP COMMENT TO STOP UPDATE ON REFRESH
    
    const handleSubmitShareCalendar = async (e) => {
        e.preventDefault();

        const shareUsername = document.querySelector('input[name="shareUsername"]');
        const shareCalendar = document.querySelector('select[name="shareCalendar"]');

        console.log(shareUsername.value, shareCalendar.value);
        
        if ((shareUsername && shareUsername.value) && (shareCalendar && shareCalendar.value)) {
        
            try {    
                await handleShareCalendar(shareUsername.value, shareCalendar.value);
                await handleGetAllCalendar();
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <section>
                <h3>Share</h3>
                <form onSubmit={handleSubmitShareCalendar}>
                    <label htmlFor="shareCalendar">Calendar:</label>
                    <select id="shareCalendar" name="shareCalendar">
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
                    
                    <input 
                        type="text" 
                        id="shareUsername" 
                        name="shareUsername" 
                        placeholder="username" 
                        required 
                    />
                    
                    <button type="submit">Share</button>
                </form>
            </section>
        </>    
    )
    
}

export default CalShareCal;