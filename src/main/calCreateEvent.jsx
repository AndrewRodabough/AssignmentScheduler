import React, { useContext, userContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../context/calendarContext.jsx';
import { Event } from '../models/event.js';
import { v4 as uuid } from 'uuid';
import './main.css';

export const CalCreateEvent = () => {

    const { handleGetAllCalendar, handleCreateEvent, calendars, handleGetAllEvent } = useContext(CalendarContext);
    useEffect(() => { handleGetAllCalendar(); handleGetAllEvent(); }, []);        //KEEP COMMENT TO STOP UPDATE ON REFRESH

    const handleSubmitCreateEvent = async (e) => {
        e.preventDefault();

        const title = document.querySelector('input[name="createEventTitle"]');
        
        const startDate = document.querySelector('input[name="createEventStartDate"]');
        const endDate = document.querySelector('input[name="createEventEndDate"]');
        
        const startTime = document.querySelector('input[name="createEventStartTime"]');
        const endTime = document.querySelector('input[name="createEventEndTime"]');
        
        const calendar = document.querySelector('select[name="createEventCalendar"]');

        var message = "";
        if (!(title && title.value))            { message += "Title is required. \n"; }
        if (!(startDate && startDate.value))    { message += "Start date is required. \n"; }
        if (!(endDate && endDate.value))        { message += "End date is required. \n"; }
        if (!(startTime))                       { message += "Start time is required. \n"; }
        if (!(endTime))                         { message += "End time is required. \n"; }
        if (!(calendar && calendar.value))      { message += "Calendar is required. \n"; }
        
        if (message != "") {
            alert(message);
            return;
        }
        
        if (message == "") {
    
            const event = new Event(uuid(), title.value , startDate.value, startTime.value, endDate.value, endTime.value, calendar.value);

            try {
                console.log("send to auth context");
                await handleCreateEvent(event);
                await handleGetAllEvent();
            }
            catch (error) {
                console.log(error);
            }

        }
    }

    return (
        <>
            <section>
                <h3>Create Event</h3>
                <form onSubmit={handleSubmitCreateEvent}>
                    <input
                        type="text" 
                        id="createEventTitle" 
                        name="createEventTitle"
                        placeholder='Event Title'
                        required
                    />
                    <br/>
                    S: <input 
                        type="date" 
                        id="createEventStartDate" 
                        name="createEventStartDate" 
                        required
                    />
                    <input 
                        type="time" 
                        id="createEventStartTime"
                        name="createEventStartTime"
                    />
                    <br/>
                    E: <input
                        type="date" 
                        id="createEventEndDate" 
                        name="createEventEndDate" 
                        required 
                    />
                    <input 
                        type="time" 
                        id="createEventEndTime" 
                        name="createEventEndTime" 
                    />
                    <br/>
                    
                    <label htmlFor="createEventCalendar">Add To: </label>
                    <select id="createEventCalendar" name="createEventCalendar">
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
                    <br/>
                    <button type="submit">Create Event</button>
                </form>
            </section>
        </>    
    )
    
}

export default CalCreateEvent;