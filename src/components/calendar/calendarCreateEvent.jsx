import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../../context/calendarContext.jsx';
import { v4 as uuid } from 'uuid';
import './calendar.css';

const CalendarCreateEvent = ({ onEventCreated }) => {

    const { handleGetAllGroups, handleCreateEvent, groups } = useContext(CalendarContext);

    // Controlled form state
    const [form, setForm] = useState({
        title: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        calendar: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitCreateEvent = async (e) => {
        e.preventDefault();
        /*
        let message = "";
        if (!form.title) message += "Title is required.\n";
        if (!form.startDate) message += "Start date is required.\n";
        if (!form.endDate) message += "End date is required.\n";
        if (!form.startTime) message += "Start time is required.\n";
        if (!form.endTime) message += "End time is required.\n";
        if (!form.calendar) message += "Calendar is required.\n";
        if (message) {
            alert(message);
            return;
        }
        const event = new Event(uuid(), form.title, form.startDate, form.startTime, form.endDate, form.endTime, form.calendar);
        */
        try {
            //await handleCreateEvent(event);
            //setForm({ title: '', startDate: '', endDate: '', startTime: '', endTime: '', calendar: '' });
            if (onEventCreated) onEventCreated();
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <>
        <form className="create-event-form" onSubmit={handleSubmitCreateEvent}>
            <div className="form-group">
                <input
                    type="text"
                    id="createEventTitle"
                    name="title"
                    placeholder='Event Title'
                    value={form.title}
                    onChange={handleChange}
                    //required
                />
            </div>
            <div className="form-row">
                <label>S:</label>
                <input
                    type="date"
                    id="createEventStartDate"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    //required
                />
                <input
                    type="time"
                    id="createEventStartTime"
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                />
            </div>
            <div className="form-row">
                <label>E:</label>
                <input
                    type="date"
                    id="createEventEndDate"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    //required
                />
                <input
                    type="time"
                    id="createEventEndTime"
                    name="endTime"
                    value={form.endTime}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="createEventCalendar">Add To:</label>
                <select
                    id="createEventCalendar"
                    name="calendar"
                    value={form.calendar}
                    onChange={handleChange}
                    //required
                >
                    {groups.length === 0 ? (
                        <option disabled value="">You Have No Calendars</option>
                    ) : (
                        groups.map(calendar => (
                            <option key={calendar.name} value={calendar.name}>
                                {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1)}
                            </option>
                        ))
                    )}
                </select>
            </div>
            <button className="create-event-btn" type="submit">Create Event</button>
        </form>
    </>    
)
    
}

export default CalendarCreateEvent;