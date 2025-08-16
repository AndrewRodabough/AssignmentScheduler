import React from 'react';
import './main.css';
import { useEffect, useState } from 'react';
import { format, eachDayOfInterval, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import { useAuth } from '../AuthContext.jsx';
import { Event } from '../models/event.js';
import { v4 as uuid } from 'uuid';

export const CalCreateCal = () => {

    const { handleCreateCalendar, handleGetAllCalendar, handleShareCalendar, handleCreateEvent, calendars, handleGetAllEvent, handleDeleteCalendar} = useAuth();
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



    const [activeMenu, setActiveMenu] = useState(null);

    const toggleMenu = (calendarName, e) => {
    e.stopPropagation(); // Prevent event from bubbling up
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