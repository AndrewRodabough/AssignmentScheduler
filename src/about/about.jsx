import React from 'react';
import '../app.css';
import { useEffect, useState } from 'react';

function About() {

    const [quote, setQuote] = useState("");
    

    const handleGetQuote = () => {
        const url = "https://api.chucknorris.io/jokes/random?category=dev";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setQuote(data.value);
            })
            .catch((error) => {
                console.error("Error fetching quote:", error);
            });
    };

    useEffect(() => { handleGetQuote(); }, []);
    

    return (
        <>
            <section>
                <p>3rd Party API (Deliverable):</p>
                <p>{quote}</p>
            </section>
            <section>
                <br/>
                Assignment Scheduler is a project for a web dev class at my school. 
                I have always found it dificult to keep track of my assignments and their deadlines
                to adequately plan what to work on an when. I found that a calendar to put the due date
                or exam date, was difficult to keep track of since i would need to look different amounts
                ahead for different types of work. A hw assignment, i might only need to look a a few days
                ahead, while a project might be 2 weeks, and a quiz a week. thus the goal of this project is to
                allow a user to quickly add events and choose when they should be brought to their attention.
                The github is linked below
            </section>
        </>

    )
}
export default About;