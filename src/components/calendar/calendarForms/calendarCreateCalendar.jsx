import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../../../context/calendarContext.jsx';
import JSCalendarFactory from '../../../models/jscalendarfactory.js';
import '../calendar.css';

export const CalendarCreateCalendar = ({ onCalendarCreated }) => {

    const { handleCreateGroup } = useContext(CalendarContext);
    const [calendarName, setCalendarName] = useState("");
    const [calendarColor, setCalendarColor] = useState("#2196f3"); // Default color

    const handleSubmitCreateCalendar = async (e) => {
        e.preventDefault();
        if (calendarName.trim()) {
            try {
                // Pass color to handleCreateGroup if supported
                await handleCreateGroup(calendarName, calendarColor);
                setCalendarName("");
                setCalendarColor("#2196f3");
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
                <label htmlFor="calendarColor" style={{ marginLeft: '1em' }}>
                    Color:
                    <input
                        type="color"
                        id="calendarColor"
                        name="calendarColor"
                        value={calendarColor}
                        onChange={e => setCalendarColor(e.target.value)}
                        style={{ marginLeft: '0.5em', verticalAlign: 'middle' }}
                    />
                </label>
                <button type="submit" name="CreateCalendar" style={{ marginLeft: '1em' }}>Create Calendar</button>
            </form>
        </section>
    );
}

export default CalendarCreateCalendar;