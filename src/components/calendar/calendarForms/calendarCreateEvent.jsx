import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../../../context/calendarContext.jsx';
import JSCalendarFactory from '../../../models/jscalendarfactory.js'
import '../calendar.css';

const CalendarCreateEvent = ({ onEventCreated, selectedCalendarUID }) => {


    const { getGroups, getEvents, handleCreateEvent } = useContext(CalendarContext);
    const [selectedForm, setSelectedForm] = useState("Event");
    
    // Controlled form state
    const [eventForm, setEventForm] = useState({
        title: '',
        description: '',
        showWithoutTime: false,
        startDateTime: '',
        endDateTime: '',
        groupUID: ''
    });

    // Controlled form state
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        dueDate: '',
        dueTime: '',
        estimatedHours: '',
        estimatedMinutes: '',
        groupUID: ''
    });

    // Set default group
    useEffect(() => {
        const groups = getGroups();
        if (groups && groups.length > 0) {
            if (selectedCalendarUID && selectedCalendarUID !== "") {
                const initialGroupUID = selectedCalendarUID || groups[0].groupUID;
                setEventForm(prev => ({ ...prev, groupUID: initialGroupUID }));
                setTaskForm(prev => ({ ...prev, groupUID: initialGroupUID }));
            }
            else {
                setEventForm(prev => ({ ...prev, groupUID: groups[0].groupUID }));
                setTaskForm(prev => ({ ...prev, groupUID: groups[0].groupUID }));
            }
        }
    }, [getGroups, selectedCalendarUID]);

    const handleChange = e => {
        const { name, type, value, checked } = e.target;
        if (selectedForm === "Task") {
            setTaskForm(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }));
        } else if (selectedForm === "Event") {
            setEventForm(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }));
        }
    };

    const handleClearForms = async () => {
        setEventForm({
            title: '',
            description: '',
            showWithoutTime: false,
            startDateTime: '',
            endDateTime: '',
            groupUID: ''
        });
        setTaskForm({
            title: '',
            description: '',
            dueDate: '',
            dueTime: '',
            estimatedHours: '',
            estimatedMinutes: '',
            groupUID: ''
        });
    }

    const handleSubmitBoth = async (updates) => {
        try {
            await handleCreateEvent(updates);
            handleClearForms();
            if (onEventCreated) onEventCreated();
        } catch (error) {
            console.log(error);
        }
    }

    // Helper: calculate ISO 8601 duration string from two date/time strings
    function calculateDuration(start, end) {
        if (!start || !end) return "PT0S";
        const startDate = new Date(start);
        const endDate = new Date(end);
        let diffMs = endDate - startDate;
        if (isNaN(diffMs) || diffMs < 0) return "PT0S";
        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        let duration = "P";
        if (days) duration += days + "D";
        if (hours || minutes || seconds) {
            duration += "T";
            if (hours) duration += hours + "H";
            if (minutes) duration += minutes + "M";
            if (seconds) duration += seconds + "S";
        }
        if (duration === "P") duration = "PT0S";
        return duration;
    }

    const handleSubmitCreateEvent = async (e) => {
        e.preventDefault();
        let message = "";
        if (!eventForm.title) message += "Title is required.\n";
        if (!eventForm.startDateTime) message += "Start date and time are required.\n";
        if (!eventForm.groupUID) message += "Calendar is required.\n";
        if (message) {
            alert(message);
            return;
        }

        // If no end date/time, set end to start
        const endDateTime = eventForm.endDateTime && eventForm.endDateTime !== ''
            ? eventForm.endDateTime
            : eventForm.startDateTime;

        // Helper to check if time is specified in datetime-local value
        const hasTime = (dt) => {
            if (!dt) return false;
            const parts = dt.split('T');
            if (parts.length < 2) return false;
            const [hour, min] = parts[1].split(':');
            return !!(hour && min);
        };

        // Calculate duration for JSCalendar
        const duration = calculateDuration(eventForm.startDateTime, endDateTime);

        const updates = {
            groupUID: eventForm.groupUID,
            title: eventForm.title,
            description: eventForm.description,
            showWithoutTime: eventForm.showWithoutTime,
            start: eventForm.startDateTime,
            duration: duration
        };
        handleSubmitBoth(updates);
    };

    const handleSubmitCreateTask = async (e) => {
        e.preventDefault();
        
        throw new Error("Not implemented yet");
        
        let message = "";
        if (!taskForm.title) message += "Title is required.\n";
        if (!taskForm.groupUID) message += "Calendar is required.\n";
        if (message) {
            alert(message);
            return;
        }
        
        const task = JSCalendarFactory.createTask()
            .setTitle(taskForm.title)
            .setDescription(taskForm.description)
            .setDue(taskForm.dueDate, taskForm.dueTime)
            .setEstimatedDuration(taskForm.estimatedHours, taskForm.estimatedMinutes);

        handleSubmitBoth(task);
    };

    return (
        <>
            <div className="custom-radio-group">
                <label className="option">
                    <input type="radio" name="Event" value="Event" checked={selectedForm === "Event"} onChange={(e) => setSelectedForm(e.target.value)} />
                    <span className="text">Event</span>
                </label>
                
                <label className="option">
                    <input type="radio" name="Task" value="Task" checked={selectedForm === "Task"} onChange={(e) => setSelectedForm(e.target.value)}/>
                    <span className="text">Task</span>
                </label>
            </div>


            {selectedForm == "Event" && (
                <form className="create-event-form" onSubmit={handleSubmitCreateEvent}>
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
                            id="createEventShowWithoutTime"
                            name="showWithoutTime"
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
                                name="startDateTime"
                                value={eventForm.startDateTime}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                type="datetime-local"
                                id="createEventStartDateTime"
                                name="startDateTime"
                                value={eventForm.startDateTime}
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
                                name="endDateTime"
                                value={eventForm.endDateTime}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                type="datetime-local"
                                id="createEventEndDateTime"
                                name="endDateTime"
                                value={eventForm.endDateTime}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="createEventGroup">Add To:</label>
                        <select
                            id="createEventGroup"
                            name="groupUID"
                            value={eventForm.groupUID}
                            onChange={handleChange}
                            required
                        >
                            {getGroups().length === 0 ? (
                                <option disabled value="">You Have No Calendars</option>
                            ) : (
                                getGroups().map(group => (
                                    <option key={group.groupUID} value={group.groupUID}>
                                        {group.title}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <button className="create-event-btn" type="submit">Create Event</button>
                </form>
            )}

            {selectedForm == "Task" && (
                <form className="create-event-form" onSubmit={handleSubmitCreateTask}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="createTaskTitle"
                            name="title"
                            placeholder='Task Title'
                            value={taskForm.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="createTaskDescription"
                            name="description"
                            placeholder='Description'
                            value={taskForm.description}
                            onChange={handleChange}
                        />
                    </div>                
                    <div className="form-row">
                        <label>Due Date:</label>
                        <input
                            type="date"
                            id="createTaskDueDate"
                            name="dueDate"
                            value={taskForm.dueDate}
                            onChange={handleChange}
                        />
                        <input
                            type="time"
                            id="createTaskDueTime"
                            name="dueTime"
                            value={taskForm.dueTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <label>Time to Complete</label>
                        <label>
                            Hours:
                            <input
                                type="number"
                                id="createTaskEstimatedHours"
                                name="estimatedHours"
                                min={0}
                                max={99}
                                value={taskForm.estimatedHours}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Minutes:
                            <input
                                type="number"
                                id="createTaskEstimatedMinutes"
                                name="estimatedMinutes"
                                min={0}
                                max={59}
                                value={taskForm.estimatedMinutes}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="createTaskGroup">Add To:</label>
                        <select
                            id="createTaskGroup"
                            name="groupUID"
                            value={taskForm.groupUID}
                            onChange={handleChange}
                            required
                        >
                            {getGroups().length === 0 ? (
                                <option disabled value="">You Have No Calendars</option>
                            ) : (
                                getGroups().map(group => (
                                    <option key={group.groupUID} value={group.groupUID}>
                                        {group.title}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <button className="create-event-btn" type="submit">Create Task</button>
                </form>
            )}
        </> 
    );
}

export default CalendarCreateEvent;