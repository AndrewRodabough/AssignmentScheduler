import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../../context/calendarContext.jsx';
import JSCalendarFactory from '../../models/jscalendarfactory.js';
import './calendar.css';

export const CalendarCreateCalendar = ({ onCalendarCreated }) => {

    const { handleCreateGroup } = useContext(CalendarContext);
    const [calendarName, setCalendarName] = useState("");

    const handleSubmitCreateCalendar = async (e) => {
        e.preventDefault();
        if (calendarName.trim()) {
            try {
                await handleCreateGroup(calendarName);
                setCalendarName("");
                if (onCalendarCreated) { onCalendarCreated(); }
            } catch (error) {
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
                    value={calendarName}
                    onChange={e => setCalendarName(e.target.value)}
                />
                <button type="submit" name="CreateCalendar">Create Calendar</button>
            </form>
        </section>
    );
}

export default CalendarCreateCalendar;