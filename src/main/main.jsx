import React from 'react';
import './main.css';
import { useEffect, useState } from 'react';
import { format, eachDayOfInterval, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import { useAuth } from '../AuthContext.jsx';

const CalendarGrid = () => {
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
          <div className="input-group">
            <label htmlFor="start-date">Start Date:</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="end-date">End Date:</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
  
        {dateColumns.length > 0 && (
          <div className="calendar-grid">
            {dateColumns.map(({ fullDate, dayOfWeek, dayOfMonth }) => (
              <div 
                key={fullDate} 
                className={`calendar-column ${fullDate === currentDate ? 'current-day' : ''}`}
              >
                <div className="column-header">
                  <span className="day-of-week">{dayOfWeek}</span>
                  <span className="day-of-month">{dayOfMonth}</span>
                </div>
                <div className="column-content">
                  {/* Placeholder for events or scheduling content */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};


function Main() {
  
    const { handleCreateCalendar, handleGetAllCalendar, handleShareCalendar, calendars } = useAuth();
    useEffect(() => { handleGetAllCalendar(); }, []);

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

        console.log("in handle");

        const shareUsername = document.querySelector('input[name="shareUsername"]');
        const shareCalendar = document.querySelector('select[name="shareCalendar"]');

        console.log(shareUsername.value, shareCalendar.value);
        
        if ((shareUsername && shareUsername.value) && (shareCalendar && shareCalendar.value)) {
        
            try {    
                await handleShareCalendar(shareUsername.value, shareCalendar.value);
                console.log("shared");
                await handleGetAllCalendar();
                console.log("got");
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    return (
    <>      
        <section className="box">
            <h3>New Event</h3>
            <div>
                <input 
                    type="date" 
                    id="startDate" 
                    name="startDate" 
                    placeholder="Start Date (Optional)" 
                />
                <input 
                    type="date" 
                    id="endDate" 
                    name="endDate" 
                    placeholder="End Date" 
                    required 
                />
                <br/>
                <input 
                    type="time" 
                    id="startTime" 
                    name="startTime" 
                    placeholder="Start Time (Optional)" 
                />
                <input 
                    type="time" 
                    id="endTime" 
                    name="endTime" 
                    placeholder="End Time (Optional)" 
                />
                <br/>
                <input 
                    type="number" 
                    id="hoursToCompletion" 
                    name="hoursToCompletion" 
                    placeholder="Hours to Completion" 
                    required 
                />
                <br/>
                <label htmlFor="eventType">Type:</label>
                <select id="eventType" name="eventType">
                    <option value="project">Project</option>
                    <option value="exam">Exam</option>
                    <option value="quiz">Quiz</option>
                    <option value="hw">HW</option>
                </select>
                
                <label htmlFor="addTo">Add To:</label>
                <select id="addTo" name="addTo">
                    <option value="personal">Personal</option>
                    <option value="exams">Exam and Quizes</option>
                    <option value="events">Events</option>
                    <option value="team">Team Events</option>
                    <option value="bob">Bob's Availability Schedule</option>
                </select>
            </div>
            <br/>
            <button type="button">Create Event</button>
        </section>

        <section className='box calendar-controls'>
            <section>
                <h3>Calendar</h3>
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
        </section>

        <section>
            <div>
                <CalendarGrid />
            </div>
        </section>
    </>
    );
}

export default Main;