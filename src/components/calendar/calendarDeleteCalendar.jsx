import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../../context/calendarContext';
import './calendar.css';

export const CalendarDeleteCalendar = ({ onCalendarDeleted, selectedCalendarUID }) => {

    const { groups, getGroupNames, handleDeleteGroup, getGroupUID } = useContext(CalendarContext);
    const [selectedCalendar, setSelectedCalendar] = useState("");

    useEffect(() => {
        if (selectedCalendarUID && selectedCalendarUID !== "") {
            setSelectedCalendar(selectedCalendarUID);
        } else if (groups.length > 0) {
            setSelectedCalendar(groups[0].groupUID);
        } else {
            setSelectedCalendar("");
        }
    }, [groups, selectedCalendarUID, getGroupUID]);

    const handleSubmitDeleteCalendar = async (e) => {
        e.preventDefault();
        if (selectedCalendar) {
            const groupUID = selectedCalendar;
            try {
                await handleDeleteGroup(groupUID);
                setSelectedCalendar("");
                //selectedCalendarUID = null;;
                if (onCalendarDeleted) { onCalendarDeleted(); }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <section>
                <form onSubmit={handleSubmitDeleteCalendar}>
                    <select
                        id="deleteCalendarCalendar"
                        name="deleteCalendarCalendar"
                        value={selectedCalendar}
                        onChange={e => setSelectedCalendar(e.target.value)}
                    >
                        {groups.length === 0 ? (
                            <option disabled value="">You Have No Calendars</option>
                        ) : (
                            groups.map(group => (
                                <option key={group.groupUID} value={group.groupUID}>
                                    {group.title}
                                </option>
                            ))
                        )}
                    </select>
                    <button type="submit">Delete</button>
                </form>
            </section>
        </>
    );
    
}

export default CalendarDeleteCalendar;