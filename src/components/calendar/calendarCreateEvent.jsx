import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../../context/calendarContext.jsx';
import JSCalendarFactory from '../../models/jscalendarfactory.js'
import './calendar.css';

const CalendarCreateEvent = ({ onEventCreated }) => {

    const { handleCreateEvent, getGroupUID, getGroupNames} = useContext(CalendarContext);
    const [selectedForm, setSelectedForm] = useState("Event");
    
    // Controlled form state
    const [eventForm, setEventForm] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        calendar: ''
    });

    // Controlled form state
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        due: '',
        dueTime: '',
        estimatedHours: '',
        estimatedMinutes: '',
        calendar: ''
    });



    const handleChange = e => {
        const { name, value } = e.target;
        if (selectedForm == "Task") 
        {
            setTaskForm(prev => ({ ...prev, [name]: value }));
        }
        else if (selectedForm == "Event") {
            setEventForm(prev => ({ ...prev, [name]: value }));            
        }
    };

    const handleSubmitCreateEvent = async (e) => {
        e.preventDefault();
        let message = "";
        if (!form.title) message += "Title is required.\n";
        if (!form.startDate) message += "Start date is required.\n";
        if (!form.calendar) message += "Calendar is required.\n";
        if (message) {
            alert(message);
            return;
        }

        const event = JSCalendarFactory.createEvent()
            .setTitle(eventForm.title)
            .setDescription(eventForm.description)
            .setStartDate(eventForm.startDate)
            .setDuration();
        const uid = getGroupUID(eventForm.calendar)

        try {
            await handleCreateEvent(uid, event);
            setEventForm({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                startTime: '',
                endTime: '',
                calendar: '' 
            });
            setTaskForm({
                title: '',
                description: '',
                due: '',
                dueTime: '',
                estimatedHours: '',
                estimatedMinutes: '',
                calendar: ''
            })
            if (onEventCreated) onEventCreated();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitCreateTask = async (e) => {
        e.preventDefault();
        let message = "";
        if (!form.title) message += "Title is required.\n";
        if (!form.calendar) message += "Calendar is required.\n";
        if (message) {
            alert(message);
            return;
        }
        
        const task = JSCalendarFactory.createTask()
            .setTitle(eventForm.title)
            .setDescription(eventForm.description)
            .setDue()
            .setEstimatedDuration()
        const uid = getGroupUID(eventForm.calendar)
        
        try {
            await handleCreateEvent(uid, task);
            setTaskForm({
                title: '',
                description: '',
                due: '',
                dueTime: '',
                estimatedHours: '',
                estimatedMinutes: '',
                calendar: ''
            })
            setEventForm({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                startTime: '',
                endTime: '',
                calendar: '' 
            });
            if (onEventCreated) onEventCreated();
        } catch (error) {
            console.log(error);
        }
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
                    <label>S:</label>
                    <input
                        type="date"
                        id="createEventStartDate"
                        name="startDate"
                        value={eventForm.startDate}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="time"
                        id="createEventStartTime"
                        name="startTime"
                        value={eventForm.startTime}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <label>E:</label>
                    <input
                        type="date"
                        id="createEventEndDate"
                        name="endDate"
                        value={eventForm.endDate}
                        onChange={handleChange}
                    />
                    <input
                        type="time"
                        id="createEventEndTime"
                        name="endTime"
                        value={eventForm.endTime}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="createEventCalendar">Add To:</label>
                    <select
                        id="createEventCalendar"
                        name="calendar"
                        value={eventForm.calendar}
                        onChange={handleChange}
                        required
                    >
                        {getGroupNames().length === 0 ? (
                            <option disabled value="">You Have No Calendars</option>
                        ) : (
                            getGroupNames().map(calendar => (
                                <option key={calendar.name} value={calendar.name}>
                                    {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1)}
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
                        name="due"
                        value={taskForm.startDate}
                        onChange={handleChange}
                    />
                    <input
                        type="time"
                        id="createTaskDueTime"
                        name="dueTime"
                        value={taskForm.startTime}
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
                    <label htmlFor="createTaskCalendar">Add To:</label>
                    <select
                        id="createTaskCalendar"
                        name="calendar"
                        value={taskForm.calendar}
                        onChange={handleChange}
                        required
                    >
                        {getGroupNames().length === 0 ? (
                            <option disabled value="">You Have No Calendars</option>
                        ) : (
                            getGroupNames().map(calendar => (
                                <option key={calendar.name} value={calendar.name}>
                                    {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1)}
                                </option>
                            ))
                        )}
                    </select>
                </div>
                <button className="create-event-btn" type="submit">Create Task</button>
            </form>
        )}
    </>    
)
    
}

export default CalendarCreateEvent;