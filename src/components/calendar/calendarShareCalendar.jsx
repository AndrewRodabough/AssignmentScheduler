import React, { useContext, useState, useEffect } from 'react';
import CalendarContext from '../../context/calendarContext.jsx';
import './calendar.css';

export const CalendarShareCalendar = ({ onCalendarShared, selectedCalendarUID }) => {

    const { groups, handleShareCalendar, getGroupUID } = useContext(CalendarContext);
    const [shareUsername, setShareUsername] = useState("");
    const [shareCalendar, setShareCalendar] = useState("");

    useEffect(() => {
        if (selectedCalendarUID && selectedCalendarUID !== "") {
            setShareCalendar(selectedCalendarUID);
        } else if (groups.length > 0) {
            setShareCalendar(groups[0].groupUID);
        } else {
            setShareCalendar("");
        }
    }, [groups, selectedCalendarUID]);

    const handleSubmitShareCalendar = async (e) => {
        e.preventDefault();
        if (shareUsername && shareCalendar) {
            const groupUID = getGroupUID(shareCalendar);
            try {
                await handleShareCalendar(shareUsername, groupUID);
                if (onCalendarShared) { onCalendarShared(); }
            } catch (error) {
                console.log(error);
            }
        }
    }    

    return (
        <section>
            <form onSubmit={handleSubmitShareCalendar}>
                <label htmlFor="shareCalendar">Calendar:</label>
                <select
                    id="shareCalendar"
                    name="shareCalendar"
                    value={shareCalendar}
                    onChange={e => setShareCalendar(e.target.value)}
                >
                    {
                        groups.length === 0 ? (
                            <option disabled value="">You Have No Calendars</option>
                        ) : (
                            groups.map(group => (
                                <option
                                    key={group.groupUID}
                                    value={group.groupUID}
                                >
                                    {group.title}
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
                    value={shareUsername}
                    onChange={e => setShareUsername(e.target.value)}
                />

                <button type="submit">Share</button>
            </form>
        </section>
    );
}

export default CalendarShareCalendar;