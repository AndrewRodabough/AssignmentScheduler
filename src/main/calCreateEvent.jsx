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
                await handleCreateEvent(event);
                await handleGetAllEvent();
                if (onEventCreated) onEventCreated(); // <-- Close modal after creation
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    return (
    <>
        <section className="create-event-section">
            <h3>Create Event</h3>
            <form className="create-event-form" onSubmit={handleSubmitCreateEvent}>
                <div className="form-group">
                    <input
                        type="text" 
                        id="createEventTitle" 
                        name="createEventTitle"
                        placeholder='Event Title'
                        required
                    />
                </div>
                <div className="form-row">
                    <label>S:</label>
                    <input 
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
                </div>
                <div className="form-row">
                    <label>E:</label>
                    <input
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
                </div>
                <div className="form-group">
                    <label htmlFor="createEventCalendar">Add To:</label>
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
                </div>
                <button className="create-event-btn" type="submit">Create Event</button>
            </form>
        </section>
    </>    
)
    
}

export default CalCreateEvent;