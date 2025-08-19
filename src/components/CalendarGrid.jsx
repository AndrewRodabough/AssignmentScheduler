import React, { useContext, useEffect, useState } from 'react';
import { format, eachDayOfInterval, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import CalendarContext from '../context/calendarContext.jsx';

const CalendarGrid = ({ onEventClick }) => {
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
                            const eventsForDay = events.filter(event => event.startDate === fullDate);
                            return (
                                <div key={fullDate} className={`calendar-column ${fullDate === currentDate ? 'current-day' : ''}`}>
                                    <div className="column-header">
                                        <span className="day-of-week">{dayOfWeek}</span>
                                        <span className="day-of-month">{dayOfMonth}</span>
                                    </div>
                                    <div className="column-content">
                                        {eventsForDay.map(event => (
                                            <p key={event.id} className="calendar-event" onDoubleClick={() => onEventClick(event)}>
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

export default CalendarGrid;
