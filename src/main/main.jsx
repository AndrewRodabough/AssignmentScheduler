import React, { useContext } from 'react';
import ModalClose from '../components/ModalClose.jsx';
import Modal from '../components/Modal.jsx';
import { useEffect, useState } from 'react';
import { format, eachDayOfInterval, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import { v4 as uuid } from 'uuid';
import CalendarContext from '../context/calendarContext.jsx';
import { Event } from '../models/event.js';
import CalDeleteCal from './calDeleteCal.jsx';
import CalCreateCal from './calCreateCal.jsx';
import CalShareCal from './calShareCal.jsx';
import CalCreateEvent from './calCreateEvent.jsx';
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
  
    const { handleCreateCalendar, handleGetAllCalendar, handleShareCalendar, calendars, handleGetAllEvent, handleDeleteCalendar} = useContext(CalendarContext);
    useEffect(() => { handleGetAllCalendar(); handleGetAllEvent(); }, []);        //KEEP COMMENT TO STOP UPDATE ON REFRESH
    
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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [calendarToDelete, setCalendarToDelete] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareCalendarName, setShareCalendarName] = useState("");
    const [shareUsername, setShareUsername] = useState("");

    // State for create calendar modal
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newCalendarName, setNewCalendarName] = useState("");

    // Handler for create calendar
    const handleCreateCalendarOpen = () => {
        setShowCreateModal(true);
    };

    const handleCreateCalendarClose = () => {
        setShowCreateModal(false);
        setNewCalendarName("");
    };

    const handleCreateCalendarConfirm = async (e) => {
        e.preventDefault();
        if (newCalendarName) {
            try {
                await handleCreateCalendar(newCalendarName);
                await handleGetAllCalendar();
                setShowCreateModal(false);
                setNewCalendarName("");
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Handler skeletons for menu actions
    const handleEditCalendarMenu = (calendarName) => {
        // TODO: Implement edit logic (e.g., open edit dialog)
        console.log('Edit Calendar:', calendarName);
        setActiveMenu(null);
    };

    const handleShareCalendarMenu = (calendarName) => {
        setShareCalendarName(calendarName);
        setShowShareModal(true);
        setActiveMenu(null);
    };

    const handleShareConfirm = async (e) => {
        e.preventDefault();
        if (shareCalendarName && shareUsername) {
            try {
                await handleShareCalendar(shareUsername, shareCalendarName);
                await handleGetAllCalendar();
            } catch (error) {
                console.log(error);
            }
        }
        setShowShareModal(false);
        setShareCalendarName("");
        setShareUsername("");
    };

    const handleShareClose = () => {
        setShowShareModal(false);
        setShareCalendarName("");
        setShareUsername("");
    };

    const handleDeleteCalendarMenu = (calendarName) => {
        setCalendarToDelete(calendarName);
        setShowDeleteModal(true);
        setActiveMenu(null);
    };

    const handleConfirmDelete = async () => {
        if (calendarToDelete) {
            try {
                await handleDeleteCalendar(calendarToDelete);
                await handleGetAllCalendar();
                await handleGetAllEvent();
            } catch (error) {
                console.log(error);
            }
        }
        setShowDeleteModal(false);
        setCalendarToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setCalendarToDelete(null);
    };

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
                <CalCreateEvent />
                <section>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ margin: 0 }}>Calendars</h3>
                        <button 
                            type="button" 
                            aria-label="Create Calendar" 
                            style={{ fontSize: '1.5rem', padding: '0.2rem 0.7rem', borderRadius: '50%', border: 'none', background: 'rgba(0, 0, 0, 0)', cursor: 'pointer' }}
                            onClick={handleCreateCalendarOpen}
                        >
                            +
                        </button>
                    </div>
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
                                                        <li onClick={() => handleEditCalendarMenu(calendar.name)}>Edit Calendar</li>
                                                        <li onClick={() => handleShareCalendarMenu(calendar.name)}>Share Calendar</li>
                                                        <li onClick={() => handleDeleteCalendarMenu(calendar.name)}>Delete Calendar</li>
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
        <Modal isOpen={showDeleteModal} onClose={handleCancelDelete}>
            <div>
                <h2>Are you sure you want to delete "{calendarToDelete}"?</h2>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <button onClick={handleConfirmDelete} style={{ padding: '0.5rem 1.5rem' }}>Yes</button>
                    <button onClick={handleCancelDelete} style={{ padding: '0.5rem 1.5rem' }}>No</button>
                </div>
            </div>
        </Modal>
        <ModalClose isOpen={showShareModal} onClose={handleShareClose} title="Share">
            <form onSubmit={handleShareConfirm} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <label htmlFor="shareCalendarModal">Calendar:</label>
                <select
                    id="shareCalendarModal"
                    name="shareCalendarModal"
                    value={shareCalendarName}
                    onChange={e => setShareCalendarName(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a calendar</option>
                    {calendars.length === 0 ? (
                        <option disabled value="">You Have No Calendars</option>
                    ) : (
                        calendars.map(calendar => (
                            <option key={calendar.name} value={calendar.name}>
                                {calendar.name.charAt(0).toUpperCase() + calendar.name.slice(1)}
                            </option>
                        ))
                    )}
                </select>
                <input
                    type="text"
                    id="shareUsernameModal"
                    name="shareUsernameModal"
                    placeholder="username"
                    value={shareUsername}
                    onChange={e => setShareUsername(e.target.value)}
                    required
                />
                <button type="submit">Share</button>
            </form>
        </ModalClose>
                <ModalClose isOpen={showCreateModal} onClose={handleCreateCalendarClose} title="Create Calendar">
            <form onSubmit={handleCreateCalendarConfirm} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <label htmlFor="newCalendarNameModal">Calendar Name:</label>
                <input
                    type="text"
                    id="newCalendarNameModal"
                    name="newCalendarNameModal"
                    placeholder="Calendar Name"
                    value={newCalendarName}
                    onChange={e => setNewCalendarName(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </ModalClose>
    </>
    );
}

export default Main;