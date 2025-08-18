import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { format, eachDayOfInterval, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import { v4 as uuid } from 'uuid';
import UserContext from '../context/userContext.jsx';
import CalendarContext from '../context/calendarContext.jsx';
import { Event } from '../models/event.js';
import './main.css';

const CalendarGrid = () => {
    const { events } = useContext(CalendarContext);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateColumns, setDateColumns] = useState([]);
    const today = new Date();
    const currentDate = format(today, 'yyyy-MM-dd');

    useEffect(() => {
        const sOfWeek = startOfWeek(today, { weekStartsOn: 0 });
        const eOfWeek = endOfWeek(today, { weekStartsOn: 0 });
        
        setStartDate(format(sOfWeek, 'yyyy-MM-dd'));
        setEndDate(format(eOfWeek, 'yyyy-MM-dd'));
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
          handleGenerateCalendar();
        }
    }, [startDate, endDate]);

    const handleGenerateCalendar = () => {
      if (!startDate || !endDate) {
        alert('Please enter both start and end dates');
        return;
      }
  
      const start = parseISO(startDate);
      const end = parseISO(endDate);
  
      if (end < start) {
        alert('End date must be after start date');
        return;
      }
  
      const columns = eachDayOfInterval({ start, end }).map(date => ({
        fullDate: format(date, 'yyyy-MM-dd'),
        dayOfWeek: format(date, 'EEE'),
        dayOfMonth: format(date, 'dd')
      }));
  
      setDateColumns(columns);
    };
  
    const handleEventClick = (event) => {
        console.log("Event clicked:", event);
        // TODO implement menu that shows event details
    }


    return (
        <>
            <section className="box calendar-topbar">
                
                <div>
                    <label htmlFor="start-date"></label>
                    <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    : 
                    <label htmlFor="end-date"></label> 
                    <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <div className="custom-radio-group">
                    <label className="option">
                        <input type="radio" name="selection" value="option1"/>
                        <span className="text">View A</span>
                    </label>
                    
                    <label className="option">
                        <input type="radio" name="selection" value="option2"/>
                        <span className="text">View B</span>
                    </label>
                    
                    <label className="option">
                        <input type="radio" name="selection" value="option3"/>
                        <span className="text">View C</span>
                    </label>
                </div>
            </section>
    
            <section className="calendar-view">
                {dateColumns.length > 0 && (
                    <div className="calendar-grid">
                        {dateColumns.map(({ fullDate, dayOfWeek, dayOfMonth }) => {
                            // Find events matching the current date
                            const eventsForDay = events.filter(event => event.startDate === fullDate);

                            return (
                                <div key={fullDate} className={`calendar-column ${fullDate === currentDate ? 'current-day' : ''}`}>
                                    <div className="column-header">
                                        <span className="day-of-week">{dayOfWeek}</span>
                                        <span className="day-of-month">{dayOfMonth}</span>
                                    </div>
                                    <div className="column-content">
                                    {eventsForDay.map(event => (
                                        <p 
                                            key={event.id} 
                                            className="calendar-event" 
                                            onDoubleClick={() => handleEventClick(event)}
                                        >
                                            {event.title} ({event.startTime} - {event.endTime}) {'CAL:' + event.calendarName}
                                        </p>
                                    ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
      </>
    );
};


function Main() {
  
    const { handleCreateCalendar, handleGetAllCalendar, handleShareCalendar, handleCreateEvent, calendars, handleGetAllEvent, handleDeleteCalendar} = useContext(CalendarContext);
    useEffect(() => { handleGetAllCalendar(); handleGetAllEvent(); }, []);        //KEEP COMMENT TO STOP UPDATE ON REFRESH
    
    const handleSubmitCreateCalendar = async (e) => {
        e.preventDefault();

        const calendarName = document.querySelector('input[name="newCalendarName"]');

        if (calendarName && calendarName.value) {
        
            try {    
                await handleCreateCalendar(calendarName.value);
                await handleGetAllCalendar();
                calendarName.value = '';
            }
            catch(error) {
                console.log(error);
            }
        }
    };

    const handleSubmitShareCalendar = async (e) => {
        e.preventDefault();

        const shareUsername = document.querySelector('input[name="shareUsername"]');
        const shareCalendar = document.querySelector('select[name="shareCalendar"]');

        console.log(shareUsername.value, shareCalendar.value);
        
        if ((shareUsername && shareUsername.value) && (shareCalendar && shareCalendar.value)) {
        
            try {    
                await handleShareCalendar(shareUsername.value, shareCalendar.value);
                await handleGetAllCalendar();
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    const handleSubmitCreateEvent = async (e) => {
        e.preventDefault();

        const title = document.querySelector('input[name="createEventTitle"]');
        
        const startDate = document.querySelector('input[name="createEventStartDate"]');
        const endDate = document.querySelector('input[name="createEventEndDate"]');
        
        const startTime = document.querySelector('input[name="createEventStartTime"]');
        const endTime = document.querySelector('input[name="createEventEndTime"]');
        
        const calendar = document.querySelector('select[name="createEventCalendar"]');

        var message = "";
        if (!(title && title.value))            { message += "Title is required. \n"; }
        if (!(startDate && startDate.value))    { message += "Start date is required. \n"; }
        if (!(endDate && endDate.value))        { message += "End date is required. \n"; }
        if (!(startTime))                       { message += "Start time is required. \n"; }
        if (!(endTime))                         { message += "End time is required. \n"; }
        if (!(calendar && calendar.value))      { message += "Calendar is required. \n"; }
        
        if (message != "") {
            alert(message);
            return;
        }
        
        if (message == "") {
    
            const event = new Event(uuid(), title.value , startDate.value, startTime.value, endDate.value, endTime.value, calendar.value);

            try {
                console.log("send to auth context");
                await handleCreateEvent(event);
                await handleGetAllEvent();
            }
            catch (error) {
                console.log(error);
            }

        }
    }

    const handleSubmitDeleteCalendar = async (e) => {
        e.preventDefault();

        const calendar = document.querySelector('select[name="deleteCalendarCalendar"]');

        if (calendar && calendar.value) {
        
            try {    
                await handleDeleteCalendar(calendar.value);
                await handleGetAllCalendar();
                await handleGetAllEvent();
            }
            catch(error) {
                console.log(error);
            }
        }
    }



    const [activeMenu, setActiveMenu] = useState(null);

    const toggleMenu = (calendarName, e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setActiveMenu(activeMenu === calendarName ? null : calendarName);
    };

    useEffect(() => {
        const closeDropdowns = (e) => {
            if (!e.target.closest('.menu-container')) {
                setActiveMenu(null);
            }
        };
        
        document.addEventListener('click', closeDropdowns);
        return () => document.removeEventListener('click', closeDropdowns);
    }, []);
    



    return (
    <>  
        <section className='calendar-split'>

            <section className='box calendar-controls'>

                <section>
                    <h3>Share</h3>
                    <form onSubmit={handleSubmitShareCalendar}>
                        <label htmlFor="shareCalendar">Calendar:</label>
                        <select id="shareCalendar" name="shareCalendar">
                            {
                                calendars.length === 0 ? (
                                    <option disabled value="">You Have No Calendars</option>
                                ) : (
                                    calendars.map(calendar => (
                                    <option 
                                        key={calendar.name} 
                                        value={calendar.name}
                                    >
                                        {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1)}
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
                        />
                        
                        <button type="submit">Share</button>
                    </form>
                </section>

                <section>
                    <h3>Create Calendar</h3>
                    <form onSubmit={handleSubmitCreateCalendar}>
                    <input 
                        type="text" 
                        name="newCalendarName" 
                        placeholder="Calendar Name"
                        required 
                    />  
                    <button type="submit" name="CreateCalendar">Create Calendar</button>
                    </form>
                </section>

                <section>
                    <h3>Create Event</h3>
                    <form onSubmit={handleSubmitCreateEvent}>
                        <input
                            type="text" 
                            id="createEventTitle" 
                            name="createEventTitle"
                            placeholder='Event Title'
                            required
                        />
                        <br/>
                        S: <input 
                            type="date" 
                            id="createEventStartDate" 
                            name="createEventStartDate" 
                            required
                        />
                        <input 
                            type="time" 
                            id="createEventStartTime"
                            name="createEventStartTime"
                        />
                        <br/>
                        E: <input
                            type="date" 
                            id="createEventEndDate" 
                            name="createEventEndDate" 
                            required 
                        />
                        <input 
                            type="time" 
                            id="createEventEndTime" 
                            name="createEventEndTime" 
                        />
                        <br/>
                        
                        <label htmlFor="createEventCalendar">Add To: </label>
                        <select id="createEventCalendar" name="createEventCalendar">
                        {
                            calendars.length === 0 ? (
                                <option disabled value="">You Have No Calendars</option>
                            ) : (
                                calendars.map(calendar => (
                                <option 
                                    key={calendar.name} 
                                    value={calendar.name}
                                >
                                    {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1)}
                                </option>
                                ))
                            )
                        }

                        </select>
                        <br/>
                        <button type="submit">Create Event</button>
                    </form>
                </section>

                <section>
                    <h3>Delete Calendar</h3>
                    <select id="deleteCalendarCalendar" name="deleteCalendarCalendar">
                        {
                            calendars.length === 0 ? (
                                <option disabled value="">You Have No Calendars</option>
                            ) : (
                                calendars.map(calendar => (
                                <option 
                                    key={calendar.name} 
                                    value={calendar.name}
                                >
                                    {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1)}
                                </option>
                                ))
                            )
                        }
                    </select>
                    <form onSubmit={handleSubmitDeleteCalendar}>
                        <button type="submit">Delete</button>
                    </form>
                </section>


                <section>
                    <h3>Calendars</h3>
                    <div>
                        <fieldset>
                        {
                            calendars.length === 0 ? (
                                <p>You Have No Calendars</p>
                            ) : (
                                calendars.map(calendar => (
                                    <section className="calendar-list-item" key={calendar.name}>
                                        
                                        <div>
                                            <input 
                                                type="checkbox" 
                                                id={calendar.name} 
                                                name={calendar.name}
                                            />
                                            <label htmlFor={calendar.name}>
                                                {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1) + (calendar.shared ? " (shared)" : "")}
                                            </label>
                                        </div>
                                        
                                        <div className='calendar-list-icons'>
                                            
                                            <div>
                                                {calendar.shared && <span className="material-symbols-outlined">group</span> }
                                            </div>
    
                                            <div className="calendar-list-menu-container">
                                                
                                                <div className="calendar-list-menu-trigger" onClick={(e) => toggleMenu(calendar.name, e)}>
                                                    <span className="calendar-list-three-dots">&#8942;</span>
                                                </div>
                                                <div className={`calendar-list-dropdown-menu ${activeMenu === calendar.name ? 'active' : ''}`}>
                                                    <ul>
                                                        <li>Edit Calendar</li>
                                                        <li>Share Calendar</li>
                                                        <li>Delete Calendar</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                ))
                            )
                        }
                            
                        </fieldset>
                    </div>
                </section>

            </section>        
            <section className='calendar-container'>
                <CalendarGrid />
            </section>
        </section>
    </>
    );
}

export default Main;