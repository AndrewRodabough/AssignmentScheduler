

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
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default Home;