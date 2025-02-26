import React from 'react';
import './main.css';
import { useEffect, useState } from 'react';
import { format, eachDayOfInterval, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import { useAuth } from '../AuthContext.jsx';
import { Event } from '../models/event.js';
import { v4 as uuid } from 'uuid';

const CalendarGrid = () => {
    const { events } = useAuth();
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
  
    return (
      <div className="calendar-container">
        <div className="date-input-section">
          <div className='box'>
                <div>

                <label htmlFor="start-date"></label>
                <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                : 
                <label htmlFor="end-date"></label> 
                <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
          </div>
        </div>
  
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
                                    {eventsForDay.length > 0 ? (
                                        eventsForDay.map(event => (
                                            // Display event title with time
                                            <p key={event.id}>
                                                {event.title} ({event.startTime} - {event.endTime})
                                            </p>
                                        ))
                                    ) : (
                                        <p>No Events</p> // Placeholder if no events exist for the day
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
        )}
      </div>
    );
};


function Main() {
  
    const { handleCreateCalendar, handleGetAllCalendar, handleShareCalendar, handleCreateEvent, calendars, handleGetAllEvent, messages } = useAuth();
    useEffect(() => { handleGetAllCalendar(); handleGetAllEvent(); }, []);    
    
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

        if ((title && title.value) &&
        (startDate && startDate.value) &&
        (endDate && endDate.value) &&
        (startTime) &&
        (endTime) &&
        (calendar && calendar.value)) {
    
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

    return (
    <>  
        <section className='topbox'>
            
        </section>
        

        <section className='calendar-split'>

            <section className='box calendar-controls'>
                <section>
                    <h3>Calendars</h3>
                    <div>
                        <fieldset>
                            <legend>Private Calendars</legend>
                            {calendars.filter(calendar => !calendar.shared).map(calendar => (
                                <>
                                    <label htmlFor={calendar.name}>
                                        {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1)}
                                    </label>
                                    <input 
                                        type="checkbox" 
                                        id={calendar.name} 
                                        name={calendar.name} 
                                    />
                                </>
                            ))}
                        </fieldset>
                        
                        <fieldset>
                            <legend>Shared Calendars</legend>
                            {calendars.filter(calendar => calendar.shared).map(calendar => (
                                <>
                                    <label htmlFor={calendar.name}>
                                        {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1)}
                                    </label>
                                    <input 
                                        type="checkbox" 
                                        id={calendar.name} 
                                        name={calendar.name} 
                                    />
                                </>
                            ))}
                        </fieldset>
                    </div>
                </section>

                <section>
                    <h3>Share</h3>
                    <form onSubmit={handleSubmitShareCalendar}>
                        <label htmlFor="shareCalendar">Calendar:</label>
                        <select id="shareCalendar" name="shareCalendar">
                            {calendars.map(calendar => (
                                <option 
                                    key={calendar.name} 
                                    value={calendar.name}
                                >
                                    {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1)}
                                </option>
                            ))}
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
                    <h3>New Calendar</h3>
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
                    <h3>New Event</h3>
                    <form onSubmit={handleSubmitCreateEvent}>
                        <p>Title</p>
                        <input
                            type="text" 
                            id="createEventTitle" 
                            name="createEventTitle" 
                        />
                        <p>Start Date / End Date</p>
                        <input 
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
                        <input 
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
                        
                        <label htmlFor="createEventCalendar">Add To:</label>
                        <br/>
                        <select id="createEventCalendar" name="createEventCalendar">
                            {calendars.map(calendar => (
                                <option 
                                    key={calendar.name} 
                                    value={calendar.name}
                                >
                                    {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1)}
                                </option>
                            ))}
                        </select>
                        <br/>
                        <button type="submit">Create Event</button>
                    </form>
                </section>


                <section>
                    <h3>Websocket Messages:</h3>
                    <div>
                        {messages.map((message, index) => (
                            <div key={index}>{message}</div>
                        ))}
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