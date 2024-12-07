import React from 'react';
import '../app.css';

function Home() {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <section className="title">
                    AssignmentScheduler
                </section>
                <section>
                    <img src="../../public/construction.png" style={{ width: '100vw', height: 'auto', display: 'block', margin: 0, padding: 0 }} />
                </section>
            </div>
        </>
    );
}

export default Home;
