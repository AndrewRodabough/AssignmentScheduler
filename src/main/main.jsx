import React, { useContext, useEffect, useState } from 'react';
import ModalClose from '../components/modal/ModalClose.jsx';
import Modal from '../components/modal/Modal.jsx';
import CalendarContext from '../context/calendarContext.jsx';
import CalCreateEvent from './calCreateEvent.jsx';
import CalendarGrid from '../components/CalendarGrid.jsx';
import CalendarMenu from '../components/CalendarMenu.jsx';
import useModal from '../hooks/useModal.js';
import './main.css';

function Main() {
  
    const { setEvents, handleCreateCalendar, handleGetAllCalendar, handleShareCalendar, calendars, handleGetAllEvent, handleDeleteCalendar} = useContext(CalendarContext);
    useEffect(() => { handleGetAllCalendar(); handleGetAllEvent(); }, []);        //KEEP COMMENT TO STOP UPDATE ON REFRESH
    
    // Controlled form state for share calendar
    const [shareForm, setShareForm] = useState({ username: '', calendar: '' });
    const handleShareFormChange = e => {
        const { name, value } = e.target;
        setShareForm(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmitShareCalendar = async (e) => {
        e.preventDefault();
        if (shareForm.username && shareForm.calendar) {
            try {
                await handleShareCalendar(shareForm.username, shareForm.calendar);
                closeShareModal();
                setShareForm({ username: '', calendar: '' });
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Controlled form state for delete calendar
    const [deleteCalendarName, setDeleteCalendarName] = useState('');
    const handleDeleteCalendarChange = e => setDeleteCalendarName(e.target.value);
    const handleSubmitDeleteCalendar = async (e) => {
        e.preventDefault();
        if (deleteCalendarName) {
            try {
                await handleDeleteCalendar(deleteCalendarName);
                // Remove events for the deleted calendar from local state
                setEvents && setEvents(prev => prev.filter(event => event.calendarName !== deleteCalendarName));
                closeDeleteModal();
                setDeleteCalendarName('');
            } catch (error) {
                console.log(error);
            }
        }
    };



    const [activeMenu, setActiveMenu] = useState(null);
    const [newCalendarName, setNewCalendarName] = useState("");

    // Modal states using useModal
    const [showDeleteModal, openDeleteModal, closeDeleteModal] = useModal(false);
    const [showShareModal, openShareModal, closeShareModal] = useModal(false);
    const [showCreateEventModal, openCreateEventModal, closeCreateEventModal] = useModal(false);
    const [showCreateCalModal, openCreateCalModal, closeCreateCalModal] = useModal(false);


    const handleCreateCalendarConfirm = async (e) => {
        e.preventDefault();
        if (newCalendarName) {
            try {
                await handleCreateCalendar(newCalendarName);
                closeCreateCalModal();
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Handler skeletons for menu actions
    const handleEditCalendarMenu = (calendarName) => {
        // TODO: Implement edit logic (e.g., open edit dialog)
        console.log('Edit Calendar:', calendarName);
        //openShareModal();
        setActiveMenu(null);
    };

    // Opens share modal with selected calendar and closes 3 dot menu
    const handleShareCalendarMenu = (calendarName) => {
        setShareForm(prev => ({ ...prev, calendar: calendarName }));
        openShareModal();
        setActiveMenu(null);
    };

    // Opens delete modal with selected calendar and closes 3 dot menu
    const handleDeleteCalendarMenu = (calendarName) => {
        setDeleteCalendarName(calendarName);
        openDeleteModal();
        setActiveMenu(null);
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
                <div>
                    <button 
                        className="create-event-btn" 
                        onClick={openCreateEventModal}
                    >
                        New Event
                    </button>
                    <ModalClose
                        isOpen={showCreateEventModal}
                        onClose={closeCreateEventModal}
                        title="Create Event"
                    >
                        <CalCreateEvent onEventCreated={() => { closeCreateEventModal();}} />
                    </ModalClose>
                </div>
                <section>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ margin: 0 }}>Calendars</h3>
                        <button 
                            type="button" 
                            aria-label="Create Calendar" 
                            style={{ fontSize: '1.5rem', padding: '0.2rem 0.7rem', borderRadius: '50%', border: 'none', background: 'rgba(0, 0, 0, 0)', cursor: 'pointer' }}
                            onClick={openCreateCalModal}
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
                                    calendar && calendar.name ? (
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
                                            {/* Modular calendar menu */}
                                            <CalendarMenu
                                                calendar={calendar}
                                                activeMenu={activeMenu}
                                                onEdit={handleEditCalendarMenu}
                                                onShare={handleShareCalendarMenu}
                                                onDelete={handleDeleteCalendarMenu}
                                                onToggleMenu={toggleMenu}
                                            />
                                        </section>
                                    ) : null
                                ))
                            )
                        }
                        </fieldset>
                    </div>
                </section>
            </section>
            <section className='calendar-container'>
                <CalendarGrid onEventClick={event => console.log('Event clicked:', event)} />
            </section>
        </section>

        <Modal isOpen={showDeleteModal} onClose={closeDeleteModal}>
            <form onSubmit={handleSubmitDeleteCalendar} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <h2>Delete Calendar</h2>
                <label htmlFor="deleteCalendar">Select Calendar:</label>
                <select
                    id="deleteCalendar"
                    name="deleteCalendar"
                    value={deleteCalendarName}
                    onChange={handleDeleteCalendarChange}
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
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <button type="submit" style={{ padding: '0.5rem 1.5rem' }}>Delete</button>
                    <button type="button" onClick={closeDeleteModal} style={{ padding: '0.5rem 1.5rem' }}>Cancel</button>
                </div>
            </form>
        </Modal>
        <ModalClose isOpen={showShareModal} onClose={closeShareModal} title="Share">
            <form onSubmit={handleSubmitShareCalendar} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <label htmlFor="shareCalendar">Calendar:</label>
                <select
                    id="shareCalendar"
                    name="calendar"
                    value={shareForm.calendar}
                    onChange={handleShareFormChange}
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
                    id="shareUsername"
                    name="username"
                    placeholder="username"
                    value={shareForm.username}
                    onChange={handleShareFormChange}
                    required
                />
                <button type="submit">Share</button>
            </form>
        </ModalClose>
        <ModalClose isOpen={showCreateCalModal} onClose={closeCreateCalModal} title="Create Calendar">
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