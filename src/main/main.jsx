import React from 'react';
import '../app.css';
import { NavLink } from 'react-router-dom';

function Main() {
    return (
    <>
        <section className="box">
            <h3>Share</h3>
            <label htmlFor="shareCalendar">Calendar:</label>
            <select id="shareCalendar" name="shareCalendar">
                <option value="personal">Personal</option>
                <option value="exams">Exam and Quizes</option>
                <option value="events">Events</option>
                <option value="team">Team Events</option>
                <option value="bob">Bob's Availability Schedule</option>
            </select>
            
            <br/>
            
            <input 
                type="text" 
                id="shareUsername" 
                name="shareUsername" 
                placeholder="username" 
                required 
            />
            
            <button type="button">Share</button>
        </section>
      
        <br/>
      
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
      
        <br/>
      
        <section className="box">
            <h3>New Calendar</h3>
            <input 
                type="text" 
                id="newCalendarName" 
                name="newCalendarName" 
                placeholder="Calendar Name" 
                required 
            />  
            <button type="button">Create Calendar</button>
        </section>

        <section>
            <h3>Calendar</h3>
            <div>
                <fieldset>
                    <legend>Private Calendars</legend>
                    <label htmlFor="personal">Personal</label>
                    <input type="checkbox" id="personal" name="personal" defaultChecked />
                    
                    <label htmlFor="exams">Exams and Quizes</label>
                    <input type="checkbox" id="exams" name="exams" />
                    
                    <label htmlFor="events">Events</label>
                    <input type="checkbox" id="events" name="events" />
                </fieldset>
                
                <fieldset>
                    <legend>Shared Calendars</legend>
                    <label htmlFor="teamEvents">Team Events</label>
                    <input type="checkbox" id="teamEvents" name="teamEvents" defaultChecked />
                    
                    <label htmlFor="bobSchedule">Bob's Availability Schedule</label>
                    <input type="checkbox" id="bobSchedule" name="bobSchedule" />
                    
                    <label htmlFor="birthday">birthday[ical]</label>
                    <input type="checkbox" id="birthday" name="birthday" />
                </fieldset>
            </div>
            <div>
                <p>
                    Calendar View Here <br/>
                    -database data <br/>
                    -websocket data <br/>
                    -api data <br/>
                </p>
                <img 
                    style={{
                        borderRadius: "20px",
                        objectFit: "cover",
                        height: "600px",
                        width: "800px"
                    }} 
                    src="https://github.com/AndrewRodabough/startup/blob/main/Screenshot%20(109).png?raw=true"
                    alt="Calendar View"
                />
            </div>
        </section>
    </>
    );
}

export default Main;