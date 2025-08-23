import React, { useState, useEffect,useContext } from 'react';
import CalendarContext from '../../../context/calendarContext';
import '../calendar.css';

const CalendarEditEvent = ({ event, onSubmit }) => {
    if (!event) return <div>No event selected.</div>;

    const { handleUpdateEvent } = useContext(CalendarContext);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start: '',
        end: '',
    });

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title || '',
                description: event.description || '',
                start: event.start || '',
                end: event.end || '',
            });
        }
    }, [event]);

    const handleClearForms = () => {
        setFormData({
            title: '',
            description: '',
            start: '',
            end: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleUpdateEvent(event);
            handleClearForms();
            if (onSubmit) {onSubmit()};
        }
        catch (e) {
            console.error("Error submitting form:", e);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <form className="create-event-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label>Title:</label>
                <input 
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div className="form-row">
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div className="form-row">
                <label>Start Date:</label>
                <input
                    type="date"
                    name="start"
                    value={formData.start}
                    onChange={handleChange}
                />
            </div>
            <div className="form-row">
                <label>End Date:</label>
                <input
                    type="date"
                    name="end"
                    value={formData.end}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default CalendarEditEvent;