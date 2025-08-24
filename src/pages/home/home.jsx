

import React from 'react';
import '../../app.css';
import './home.css';
import Footer from '../../components/layout/footer';

function Home() {
    return (
        <>
            <main>
                <div className="home-container">
                    <section className="title">
                        AssignmentScheduler
                    </section>
                    <section className="dev-notes-box">
                        <h3>Dev Notes</h3>
                        <br />
                        <p>Current Functionality:</p>
                        <ul>
                            <li>Users: Login, Logout, Registration</li>
                            <li>Calendars: Creation, Deletion, Sharing w permissions</li>
                            <li>Event/Task Creation</li>
                            <li>Calendar Color Coding</li>
                            <li>Calendar Views</li>
                        </ul>
                        <br />
                        <p>Future Enhancements:</p>
                        <ul>
                            <li>Calendars: addtional settings; ability to update settings</li>
                            <li>Events: addtional settings; ability to update settings; event deletion</li>
                            <li>User: Settings; user deletion</li>
                        </ul>
                    </section>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default Home;