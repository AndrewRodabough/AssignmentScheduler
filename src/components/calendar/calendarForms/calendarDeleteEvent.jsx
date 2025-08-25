import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import CalendarContext from '../../../context/calendarContext';
import '../calendar.css';

export const CalendarDeleteEvent = ({ onEventDeleted, selectedEventUID }) => {

    const { events, handleDeleteEvent } = useContext(CalendarContext);
    const [eventUID, setEventUID] = useState("");

    useEffect(() => {
        console.log("selectedEventUID changed:", selectedEventUID);
        if (selectedEventUID && selectedEventUID !== "") {
            setEventUID(selectedEventUID);
        } 
        else {
            setEventUID("");
        }
    }, [selectedEventUID]);

    const handleSubmitDeleteEvent = async (e) => {
        e.preventDefault();
        console.log("Deleting event:", eventUID);
        if (eventUID) {
            try {
                await handleDeleteEvent(eventUID);
                setEventUID("");
                if (onEventDeleted) { onEventDeleted(); }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <section>
                <p>Are You Sure you want to delete : {eventUID && events.find(event => event.eventUID === eventUID)?.event.title}</p>
                <button onClick={handleSubmitDeleteEvent}>Delete</button>
            </section>
        </>
    );
    
}

export default CalendarDeleteEvent;