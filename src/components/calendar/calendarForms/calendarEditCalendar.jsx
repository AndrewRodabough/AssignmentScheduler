import React, { useState, useEffect,useContext } from 'react';
import CalendarContext from '../../../context/calendarContext';
import '../calendar.css';

const CalendarEditCalendar = ({ selectedCalendarUID, onCalendarEdited }) => {
    if (!selectedCalendarUID) return <div>No calendar selected.</div>;

    const { handleUpdateGroup, getGroups } = useContext(CalendarContext);
    const [formData, setFormData] = useState({
        title: '',
        color: '',
    });

    useEffect(() => {
        if (selectedCalendarUID) {
            const group = getGroups().find(g => g.groupUID === selectedCalendarUID);
            setFormData({
                title: group.title || '',
                color: group.color || '',
                privacy: group.privacy || '',
            });
        }
    }, [selectedCalendarUID]);

    const handleClearForms = () => {
        setFormData({
            title: '',
            color: '',
        });
    };

    const handleSubmit = async (e) => {

        const updates = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== '')
        );

        e.preventDefault();
        try {
            await handleUpdateGroup(selectedCalendarUID, updates);
            handleClearForms();
            if (onCalendarEdited) {onCalendarEdited()};
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
        <form onSubmit={handleSubmit} className="calendar-edit-form">
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="color">Color:</label>
                <input
                    type="color"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default CalendarEditCalendar;