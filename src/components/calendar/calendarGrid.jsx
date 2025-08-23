/**
 * CalendarGrid - Displays a grid of calendar days for the current week and events for each day.
 *
 * @param {function} onEventClick - Callback for when an event is clicked.
 * @returns {React.ReactNode} The calendar grid component.
*/

import React, { useContext, useEffect, useState } from 'react';
import { format, eachDayOfInterval, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import CalendarContext from '../../context/calendarContext.jsx';
import ModalContext from '../../context/modalContext.jsx';
import CalendarEditEvent from './calendarEditEvent.jsx';

const CalendarGrid = () => {
    const { groups, events } = useContext(CalendarContext);
    const { openModal, closeModal } = useContext(ModalContext);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateColumns, setDateColumns] = useState([]);
    const today = new Date();
    const currentDate = format(today, 'yyyy-MM-dd');

    const handleOnEventClick = (event) => {
        console.log("Event clicked:", event);
        openModal("modal_close", { 
            title: event.event.title,
            content: <CalendarEditEvent event={event.event} onSubmit={closeModal} />});
    };


    useEffect(() => {
        const sOfWeek = startOfWeek(today, { weekStartsOn: 0 });
        const eOfWeek = endOfWeek(today, { weekStartsOn: 0 });
        setStartDate(format(sOfWeek, 'yyyy-MM-dd'));
        setEndDate(format(eOfWeek, 'yyyy-MM-dd'));
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            const start = parseISO(startDate);
            const end = parseISO(endDate);
            if (end < start) return;
            const columns = eachDayOfInterval({ start, end }).map(date => ({
                fullDate: format(date, 'yyyy-MM-dd'),
                dayOfWeek: format(date, 'EEE'),
                dayOfMonth: format(date, 'dd')
            }));
            setDateColumns(columns);
        }
    }, [startDate, endDate]);

    return (
        <>
            <section className="box calendar-topbar">
                <div>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    :
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
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
                            const eventsForDay = events.filter(event => event.event.start === fullDate);
                            return (
                                <div key={fullDate} className={`calendar-column ${fullDate === currentDate ? 'current-day' : ''}`}>
                                    <div className="column-header">
                                        <span className="day-of-week">{dayOfWeek}</span>
                                        <span className="day-of-month">{dayOfMonth}</span>
                                    </div>
                                    <div className="column-content">
                                        {eventsForDay.map(event => (
                                            <div key={event.event.eventUID} className="calendar-event-wrapper">
                                                <p className="calendar-event" onDoubleClick={() => handleOnEventClick(event)}>
                                                    {event.event.title} {event.event.start}
                                                    <span className="calendar-event-edit-icon" onClick={(e) => { e.stopPropagation(); handleOnEventClick(event); }}>
                                                        {/* Solid black pencil SVG icon */}
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="black" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.146 2.854a.5.5 0 0 1 .708 0l.292.292a.5.5 0 0 1 0 .708l-8.5 8.5a.5.5 0 0 1-.168.11l-3 1a.5.5 0 0 1-.638-.638l1-3a.5.5 0 0 1 .11-.168l8.5-8.5zM11.207 3.5L3.5 11.207l-.646 1.939 1.939-.646L12.5 4.793l-1.293-1.293z" />
                                                        </svg>
                                                    </span>
                                                </p>
                                            </div>
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

export default CalendarGrid;
