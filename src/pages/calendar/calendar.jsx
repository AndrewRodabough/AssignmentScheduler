import CalendarGrid from '../../components/calendar/calendarGrid.jsx';
import CalendarMenu from '../../components/calendar/calendarMenu.jsx';
import './calendar.css';

function Main() {
    return (
        <>
            <section className='calendar-split'>
                <section className='box calendar-controls'>
                    <CalendarMenu />
                </section>
                <section className='calendar-main'>
                    <CalendarGrid />
                </section>
            </section>
        </>
    );
}

export default Main;