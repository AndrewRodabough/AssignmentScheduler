import React, { useContext, useEffect, useState } from 'react';
import { format, eachDayOfInterval, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import CalendarContext from '../../../../context/calendarContext.jsx';
import ModalContext from '../../../../context/modalContext.jsx';
import CalendarEditEvent from '../../calendarForms/calendarEditEvent.jsx';
import CalendarViewContext from '../../../../context/calendarViewContext.jsx';
import CalendarDeleteEvent from '../../calendarForms/calendarDeleteEvent.jsx';
import './calendarViews.css';

const CalendarGrid = () => {
    const { getGroups, getEvents } = useContext(CalendarContext);
    const { openModal, closeModal } = useContext(ModalContext);
    const { startDate, endDate, currentView } = useContext(CalendarViewContext);

    const [dateColumns, setDateColumns] = useState([]);
    const today = new Date();
    const currentDate = format(today, 'yyyy-MM-dd');

    const handleOnEventClick = (event) => {
        openModal("modal_close", { 
            title: event.title,
            content: <CalendarEditEvent eventUID={event.eventUID} onEventEdited={closeModal} />});
    };

    const handleOnEventDeleteClick = (event) => {
        openModal("modal_close", {
            title: "Delete Event",
            content: <CalendarDeleteEvent selectedEventUID={event.eventUID} onEventDeleted={closeModal} />
        });
    };

    useEffect(() => {
        if (!startDate || !endDate) return;
        const start = parseISO(startDate);
        const end = parseISO(endDate);
        let columns = [];
        const diffDays = (end - start) / (1000 * 60 * 60 * 24) + 1;

        if (diffDays > 7) {
            // Month view: pad start and end to fill weeks, always start on Sunday
            const firstDayOfMonth = start;
            const lastDayOfMonth = end;
            const startPad = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });
            const endPad = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 });
            columns = eachDayOfInterval({ start: startPad, end: endPad }).map(date => ({
                fullDate: format(date, 'yyyy-MM-dd'),
                dayOfWeek: format(date, 'EEE'),
                dayOfMonth: format(date, 'dd'),
                inMonth: date >= firstDayOfMonth && date <= lastDayOfMonth
            }));
        } else if (diffDays > 1) {
            const weekStart = startOfWeek(start, { weekStartsOn: 0 });
            const weekEnd = endOfWeek(start, { weekStartsOn: 0 });
            columns = eachDayOfInterval({ start: weekStart, end: weekEnd }).map(date => ({
                fullDate: format(date, 'yyyy-MM-dd'),
                dayOfWeek: format(date, 'EEE'),
                dayOfMonth: format(date, 'dd'),
                inMonth: true
            }));
        } else if (diffDays === 1) {
            columns = [{
                fullDate: format(start, 'yyyy-MM-dd'),
                dayOfWeek: format(start, 'EEE'),
                dayOfMonth: format(start, 'dd'),
                inMonth: true
            }];
        }
        setDateColumns(columns);
    }, [startDate, endDate, currentView]);

    return (
        <>
            <section className="calendar-view">
                {dateColumns.length > 0 && (
                    <div className={`calendar-grid${dateColumns.length === 1 ? ' single-column' : ''}`}>
                        {dateColumns.map(({ fullDate, dayOfWeek, dayOfMonth, inMonth }) => {
                            const eventsForDay = getEvents().filter(event => {
                                if (!event.start) return false;
                                // If event.start is a datetime, extract the date part
                                const eventDate = event.start.split('T')[0];
                                return eventDate === fullDate;
                            });
                            return (
                                <div key={fullDate} className={`calendar-column${inMonth ? ' in-month' : ''} ${fullDate === currentDate ? ' current-day' : ''}${!inMonth ? ' empty-day' : ''}`}>
                                    <div className="column-header">
                                        <span className="day-of-week">{dayOfWeek}</span>
                                        <span className="day-of-month">{dayOfMonth}</span>
                                    </div>
                                    <div className="column-content">
                                        {eventsForDay.map(event => {
                                            // Find the group/calendar for this event
                                            const group = getGroups().find(g => g.groupUID === event.groupUID);
                                            const eventColor = (group && group.color) ? group.color : '#fff';
                                            return (
                                                <div key={event.eventUID} className="calendar-event-wrapper">
                                                    <p className="calendar-event" onDoubleClick={() => handleOnEventClick(event)} style={{ backgroundColor: eventColor }}>
                                                        {event.title}
                                                        <span className="calendar-event-edit-icon" onClick={(e) => { e.stopPropagation(); handleOnEventClick(event); }}>
                                                            {/* Solid black pencil SVG icon */}
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="black" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12.146 2.854a.5.5 0 0 1 .708 0l.292.292a.5.5 0 0 1 0 .708l-8.5 8.5a.5.5 0 0 1-.168.11l-3 1a.5.5 0 0 1-.638-.638l1-3a.5.5 0 0 1 .11-.168l8.5-8.5zM11.207 3.5L3.5 11.207l-.646 1.939 1.939-.646L12.5 4.793l-1.293-1.293z" />
                                                            </svg>
                                                        </span>
                                                        <span className="calendar-event-delete-icon" onClick={(e) => { e.stopPropagation(); handleOnEventDeleteClick(event); }}>
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg" >
                                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                            </svg>
                                                        </span>
                                                    </p>
                                                </div>
                                            );
                                        })}
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
