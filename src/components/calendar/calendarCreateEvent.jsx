import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../../context/calendarContext.jsx';
import JSCalendarFactory from '../../models/jscalendarfactory.js'
import './calendar.css';

const CalendarCreateEvent = ({ onEventCreated, selectedCalendarUID }) => {


    const { groups, events, handleCreateEvent, getGroupUID, getGroupNames, setEvents } = useContext(CalendarContext);
    const [selectedForm, setSelectedForm] = useState("Event");
    
    // Controlled form state
    const [eventForm, setEventForm] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        groupUID: ''
    });

    // Controlled form state
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        due: '',
        dueTime: '',
        estimatedHours: '',
        estimatedMinutes: '',
        groupUID: ''
    });

    // Set default group
    useEffect(() => {
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
    }, [groups, selectedCalendarUID]);

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

    const handleClearForms = async () => {
        //selectedCalendarUID = null;
        setEventForm({
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            groupUID: '' 
        });
        setTaskForm({
            title: '',
            description: '',
            due: '',
            dueTime: '',
            estimatedHours: '',
            estimatedMinutes: '',
            groupUID: ''
        });
    }

    const handleSubmitBoth = async (groupUID, event) => {
        try {
            await handleCreateEvent(groupUID, event);
            setEvents(prevEvents => [...prevEvents, {eventUID: event.eventUID, groupUID: groupUID, event: event} ]);
            handleClearForms();
            if (onEventCreated) onEventCreated();
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitCreateEvent = async (e) => {
        e.preventDefault();
        let message = "";
        if (!eventForm.title) message += "Title is required.\n";
        if (!eventForm.startDate) message += "Start date is required.\n";
        if (!eventForm.groupUID) message += "Calendar is required.\n";
        if (message) {
            alert(message);
            return;
        }

        const event = JSCalendarFactory.createEvent()
            .setTitle(eventForm.title)
            .setDescription(eventForm.description)
            .setStart(eventForm.startDate)
            .setDuration();

        handleSubmitBoth(eventForm.groupUID, event);
    };

    const handleSubmitCreateTask = async (e) => {
        e.preventDefault();
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
            .setDue(taskForm.due)
            .setEstimatedDuration(taskForm.estimatedHours, taskForm.estimatedMinutes);

        handleSubmitBoth(taskForm.groupUID, task);
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
                        <label htmlFor="createEventGroup">Add To:</label>
                        <select
                            id="createEventGroup"
                            name="group"
                            value={eventForm.groupUID}
                            onChange={handleChange}
                            required
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
                        <label htmlFor="createTaskGroup">Add To:</label>
                        <select
                            id="createTaskGroup"
                            name="group"
                            value={taskForm.groupUID}
                            onChange={handleChange}
                            required
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
                    </div>
                    <button className="create-event-btn" type="submit">Create Task</button>
                </form>
            )}
        </> 
    );
}

export default CalendarCreateEvent;