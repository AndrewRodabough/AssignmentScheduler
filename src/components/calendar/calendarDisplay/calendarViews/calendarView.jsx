import React from 'react';

import CalendarViewControls from './calendarViewControls.jsx';
import CalendarGrid from './calendarViewGrid.jsx';
import { CalendarViewProvider } from '../../../../context/calendarViewContext.jsx';
import './calendarViews.css';

const CalendarView = () => {
    return (
        <CalendarViewProvider>
            <div className='calendar-view'>
                <CalendarViewControls />
                <CalendarGrid />
            </div>
        </CalendarViewProvider>
    );
};

export default CalendarView;