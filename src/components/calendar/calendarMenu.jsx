import React, { useContext } from 'react';
import CalendarList from './calendarList';
import CalendarCreateEvent from './calendarCreateEvent.jsx';
import ModalContext from '../../context/modalContext.jsx';
import CalendarContext from '../../context/calendarContext.jsx';
import CalendarCreateCalendar from "./calendarCreateCalendar.jsx";
import './calendar.css';

const CalendarMenu = () => {

    const { openModal, closeModal } = useContext(ModalContext);
    const { groups, getGroupNames } = useContext(CalendarContext);

    return (
        <>
            <div>
                <button
                    className="create-event-btn"
                    onClick={() => openModal("modal_close", {
                        title: "Create Event",
                        content: <CalendarCreateEvent onEventCreated={closeModal} />
                    })
                }
                >
                    New Event
                </button>
            </div>

            <div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ margin: 0 }}>Calendars</h3>
                    <button 
                        type="button" 
                        aria-label="Create Calendar" 
                        style={{ fontSize: '1.5rem', padding: '0.2rem 0.7rem', borderRadius: '50%', border: 'none', background: 'rgba(0, 0, 0, 0)', cursor: 'pointer' }}
                        onClick={() => openModal("modal_close", {
                            title: "Create Calendar",
                            content: <CalendarCreateCalendar onCalendarCreated={closeModal} />
                        })}
                        >
                        +
                    </button>
                </div>

                <CalendarList
                    groups={[{title: "Title", privacy: "public", uid:123},{title: "Title2", privacy: "private", uid:234}]}
                />
            </div>
        </>
    );
}

export default CalendarMenu;