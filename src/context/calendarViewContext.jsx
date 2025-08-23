import React, { createContext, useContext, useState } from 'react';

// Define the context
const CalendarViewContext = createContext();

// Provider component
const CalendarViewProvider = ({ children }) => {
    const [view, setView] = useState([
        { id: 'Standard', label: 'Standard' },
        { id: 'Timeline', label: 'Timeline' },
        { id: 'Other', label: 'Other' }
    ]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentView, setCurrentView] = useState(null);

    const value = {
        view,
        setView,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        currentView,
        setCurrentView
    };

    return (
        <CalendarViewContext.Provider value={value}>
            {children}
        </CalendarViewContext.Provider>
    );
};

export default CalendarViewContext;
export { CalendarViewProvider };