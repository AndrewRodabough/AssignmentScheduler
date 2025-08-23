import React, { useState, useEffect,useContext } from 'react';
import CalendarContext from '../../../context/calendarContext';
import '../calendar.css';

const CalendarEditCalendar = ({ calendar, onSubmit }) => {
    if (!calendar) return <div>No calendar selected.</div>;

    const { handleUpdateCalendar } = useContext(CalendarContext);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start: '',
        end: '',
    });

    useEffect(() => {
        if (calendar) {
            setFormData({
                title: calendar.title || '',
                description: calendar.description || '',
                start: calendar.start || '',
                end: calendar.end || '',
            });
        }
    }, [calendar]);

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
        <>
            Placeholder for Calendar Edit
        </>
    );
};

export default CalendarEditCalendar;