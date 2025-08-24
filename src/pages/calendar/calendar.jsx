import CalendarView from '../../components/calendar/calendarDisplay/calendarViews/calendarView.jsx';
import CalendarMenu from '../../components/calendar/calendarDisplay/calendarMenu.jsx';
import './calendar.css';

function Main() {
    return (
        <main>
            <section className='calendar-split'>
                <section className='box calendar-controls'>
                    <CalendarMenu />
                </section>
                <section className='calendar-main'>
                    <CalendarView />
                </section>
            </section>
        </main>
    );
}

export default Main;