import React, { useContext, useEffect } from 'react';
import CalendarList from './calendarList.jsx';
import CalendarCreateEvent from '../calendarForms/calendarCreateEvent.jsx';
import ModalContext from '../../../context/modalContext.jsx';
import CalendarContext from '../../../context/calendarContext.jsx';
import CalendarCreateCalendar from "../calendarForms/calendarCreateCalendar.jsx";
import '../calendar.css';

const CalendarMenu = () => {

    const { openModal, closeModal } = useContext(ModalContext);
    const { groups, handleGetAllGroups, handleGetAllEvents, handleGetAllPermissions } = useContext(CalendarContext);
    useEffect(() => {
        handleGetAllGroups();
        handleGetAllEvents();
        handleGetAllPermissions();
    }, []);

    return (
        <>
            <div>
                <button
                    className="create-event-btn"
                    onClick={() => openModal("modal_close", {
                        title: "Create Event",
                        content: <CalendarCreateEvent onEventCreated={closeModal} />
                    })}
                >
                    New Event
                </button>
            </div>
            <div className='calendar-list-container'>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1>Calendars</h1>
                    <button 
                        className='create-calendar-btn'
                        onClick={() => openModal("modal_close", {
                            title: "Create Calendar",
                            content: <CalendarCreateCalendar onCalendarCreated={closeModal} />
                        })}
                    >
                        +
                    </button>
                </div>
                <CalendarList
                    groups={groups}
                />
            </div>
        </>
    );
}

export default CalendarMenu;