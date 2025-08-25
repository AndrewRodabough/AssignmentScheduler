import React, { useState, useEffect,useContext } from 'react';
import CalendarContext from '../../../context/calendarContext';
import '../calendar.css';

const CalendarEditEvent = ({ eventUID, onEventEdited }) => {
    if (!eventUID) return <div>No event selected.</div>;

    const { handleUpdateEvent, groups, events } = useContext(CalendarContext);

    const [eventForm, setEventForm] = useState({
        title: '',
        description: '',
        showWithoutTime: false,
        start: '',
        end: '',
    });

    const handleClearForms = () => {
        setEventForm({
            title: '',
            description: '',
            showWithoutTime: false,
            start: '',
            end: '',
        });
    };


    function formatDateTimeLocal(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return '';
        const pad = n => n.toString().padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }

    useEffect(() => {
        if (eventUID) {
            const found = events.find(e => e.eventUID === eventUID);
            if (found) {
                const event = found.event;
                setEventForm({
                    title: event.title || '',
                    description: event.description || '',
                    showWithoutTime: event.showWithoutTime || false,
                    start: event.showWithoutTime
                        ? (event.start || '')
                        : formatDateTimeLocal(event.start),
                    end: event.showWithoutTime
                        ? (event.end || '')
                        : formatDateTimeLocal(event.end),
                });
            }
        }
    }, [eventUID, events]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const event = events.find(e => e.eventUID === eventUID).event;
        
        const defaultForm = {
            title: '',
            description: '',
            showWithoutTime: false,
            start: '',
            end: '',
        };

        const updates = Object.fromEntries(
            Object.entries(eventForm).filter(([key, value]) => {
            // If value matches event, skip
            if (event[key] === value) return false;
            // If event is missing the field and form has default value, skip
            if (event[key] === undefined && value === defaultForm[key]) return false;
            return true;
            })
        );

        console.log("Updates to submit:", updates);

        try {
            await handleUpdateEvent(eventUID, updates);
            handleClearForms();
            if (onEventEdited) { onEventEdited() }
        }
        catch (e) {
            console.error("Error submitting form:", e);
        }
    };

    const handleChange = e => {
        const { name, type, value, checked } = e.target;
        // If toggling showWithoutTime, reformat start/end
        if (name === "showWithoutTime") {
            setEventForm(prev => {
                // If switching to all day, strip time
                if (checked) {
                    // Convert datetime-local to date
                    const toDate = dt => dt ? dt.split('T')[0] : '';
                    return {
                        ...prev,
                        showWithoutTime: true,
                        start: toDate(prev.start),
                        end: toDate(prev.end)
                    };
                } else {
                    // Convert date to datetime-local (set time to 00:00)
                    const toDateTimeLocal = d => {
                        if (!d) return '';
                        // If already in datetime-local format, return as is
                        if (d.includes('T')) return d;
                        return `${d}T00:00`;
                    };
                    return {
                        ...prev,
                        showWithoutTime: false,
                        start: toDateTimeLocal(prev.start),
                        end: toDateTimeLocal(prev.end)
                    };
                }
            });
        } else {
            setEventForm(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }));
        }
    };

    return (
        <>
            <form className="create-event-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        id="createEventTitle"
                        name="title"
                        placeholder='Event Title'
                        value={eventForm.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        id="createEventDescription"
                        name="description"
                        placeholder='Description'
                        value={eventForm.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>AllDay</label>
                    <input
                        type="checkbox"
                        id="createEventisAllDay"
                        name="showWithoutTime" // <-- fix here
                        checked={eventForm.showWithoutTime}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>Start:</label>
                    {eventForm.showWithoutTime ? (
                        <input
                            type="date"
                            id="createEventStartDate"
                            name="start"
                            value={eventForm.start}
                            onChange={handleChange}
                        />
                    ) : (
                        <input
                            type="datetime-local"
                            id="createEventStartDateTime"
                            name="start"
                            value={eventForm.start}
                            onChange={handleChange}
                        />
                    )}
                </div>
                <div className="form-row">
                    <label>End:</label>
                    {eventForm.showWithoutTime ? (
                        <input
                            type="date"
                            id="createEventEndDate"
                            name="end"
                            value={eventForm.end}
                            onChange={handleChange}
                        />
                    ) : (
                        <input
                            type="datetime-local"
                            id="createEventEndDateTime"
                            name="end"
                            value={eventForm.end}
                            onChange={handleChange}
                        />
                    )}
                </div>
                <button className="create-event-btn" type="submit">Save</button>
            </form>
        </>
    );
};

export default CalendarEditEvent;