import React, { useContext } from 'react';
import CalendarContext from '../../context/calendarContext.jsx';
import './calendar.css';

export const CalendarShareCalendar = ({ onCalendarShared }) => {

    const { groups, getGroupNames, handleShareCalendar } = useContext(CalendarContext);
    
    const handleSubmitShareCalendar = async (e) => {
        e.preventDefault();

        const shareUsername = document.querySelector('input[name="shareUsername"]');
        const shareCalendar = document.querySelector('select[name="shareCalendar"]');

        console.log(shareUsername.value, shareCalendar.value);
        
        if ((shareUsername && shareUsername.value) && (shareCalendar && shareCalendar.value)) {
        
            try {    
                //await handleShareCalendar(shareUsername.value, shareCalendar.value);
                if(onCalendarShared) { onCalendarShared() }
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmitShareCalendar}>
                <label htmlFor="shareCalendar">Calendar:</label>
                <select id="shareCalendar" name="shareCalendar">
                    {
                        getGroupNames().length === 0 ? (
                            <option disabled value="">You Have No Calendars</option>
                        ) : (
                            getGroupNames().map(calendar => (
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
    )
}

export default CalendarShareCalendar;