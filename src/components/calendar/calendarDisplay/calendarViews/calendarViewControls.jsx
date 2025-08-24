import React, { useState, useContext, useEffect } from "react";
import { format, eachDayOfInterval, parseISO, startOfWeek, endOfWeek, setDate, startOfMonth, endOfMonth } from 'date-fns';
import CalendarViewContext from "../../../../context/calendarViewContext";

const CalendarViewControls = () => {
    const { view, startDate, endDate, setStartDate, setEndDate, currentView, setCurrentView} = useContext(CalendarViewContext);
    const today = new Date();
    
    useEffect(() => {
        const sOfWeek = startOfWeek(today, { weekStartsOn: 0 });
        const eOfWeek = endOfWeek(today, { weekStartsOn: 0 });
        setStartDate(format(sOfWeek, 'yyyy-MM-dd'));
        setEndDate(format(eOfWeek, 'yyyy-MM-dd'));
        setCurrentView(view[0].id);
    }, []);

    const [range, setRange] = useState([
        { id: 'Month', label: 'Month' },
        { id: 'Week', label: 'Week' },
        { id: 'Day', label: 'Day' }
    ]);
    const [currentRange, setCurrentRange] = useState('Week');

    const handleRangeChange = (rangeId) => {
        setCurrentRange(rangeId);
        if (rangeId === 'Month') {
            setStartDate(format(startOfMonth(today), 'yyyy-MM-dd'));
            setEndDate(format(endOfMonth(today), 'yyyy-MM-dd'));
        } 
        else if (rangeId === 'Week') {
            setStartDate(format(startOfWeek(today), 'yyyy-MM-dd'));
            setEndDate(format(endOfWeek(today), 'yyyy-MM-dd'));
        } 
        else if (rangeId === 'Day') {
            setStartDate(format(today, 'yyyy-MM-dd'));
            setEndDate(format(today, 'yyyy-MM-dd'));
        }
    };

    const handleViewChange = (viewId) => {
        setCurrentView(viewId);
        if (viewId === "Timeline") {
            setStartDate(format(startOfWeek(today), 'yyyy-MM-dd'));
            setEndDate(format(endOfWeek(today), 'yyyy-MM-dd'));
        }
        else if (viewId === "Standard") {
            handleRangeChange(currentRange);
        }

    };

    return (
        <section className="box calendar-topbar">
            <div className="custom-radio-group">
                {view.map(option => (
                    <label className="option" key={option.id}>
                        <input
                            type="radio"
                            name="selection"
                            value={option.id}
                            checked={currentView === option.id}
                            onChange={() => handleViewChange(option.id)}
                        />
                        <span className="text">{option.label}</span>
                    </label>
                ))}
            </div>



            {currentView === 'Standard' && (
                <div className="custom-radio-group">
                    {range.map(option => (
                        <label className="option" key={option.id}>
                            <input
                                type="radio"
                                name="time"
                                value={option.id}
                                checked={currentRange === option.id}
                                onChange={() => handleRangeChange(option.id)}
                            />
                            <span className="text">{option.label}</span>
                        </label>
                    ))}
                </div>
            )}

            {currentView === 'Timeline' && (
                <>
                </>   
            )}

            {currentView === 'Other' && (
                <div>
                    <input className="date-input" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    :
                    <input className="date-input" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
            )}

        </section>
    );
};

export default CalendarViewControls;
