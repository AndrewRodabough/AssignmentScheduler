import express from 'express';

import createUser from './routes/Authentication/createUser.js';
import login from './routes/Authentication/login.js';
import logout from './routes/Authentication/logout.js';
import createCalendar from './routes/Calendar/createCalendar.js';
import deleteCalendar from './routes/Calendar/deleteCalendar.js';
import getAllCalendars from './routes/Calendar/getAllCalendars.js';
import updateCalendar from './routes/Calendar/updateCalendar.js';
import shareCalendar from './routes/Calendar/shareCalendar.js';
import createEvent from './routes/Event/createEvent.js';
import deleteEvent from './routes/Event/deleteEvent.js';
import getAllEvents from './routes/Event/getAllEvents.js';
import updateEvent from './routes/Event/updateEvent.js';
import clearAll from './routes/clearAll.js'

import dataStore from './database.js';
import socket from './websocket.js';



const app = express();
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Allow selecting port from cmd line
const port = process.argv.length > 2 ? process.argv[2] : 4000;
//const port = 4000;

// Serve static files from public dir
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


//////////////////////////////
// Authentication Endpoints //
//////////////////////////////

apiRouter.use('/auth/create', createUser(dataStore));
apiRouter.use('/auth/login', login(dataStore));
apiRouter.use('/auth/logout', logout(dataStore));
  

//////////////////////////////////
// Calendar Managment Endpoints //
//////////////////////////////////

//// Event ////

apiRouter.use('/event/create', createEvent(dataStore));
apiRouter.use('/event/delete', deleteEvent(dataStore));
apiRouter.use('/event/getAll', getAllEvents(dataStore));
apiRouter.use('/event/update', updateEvent(dataStore));

//// Calendars ////

apiRouter.use('/calendar/create', createCalendar(dataStore));
apiRouter.use('/calendar/delete', deleteCalendar(dataStore));
apiRouter.use('/calendar/getAll', getAllCalendars(dataStore));
apiRouter.use('/calendar/update', updateCalendar(dataStore));
apiRouter.use('/calendar/share', shareCalendar(dataStore));


///////////////////
// Dev Endpoints //
///////////////////

apiRouter.use('/clear', clearAll(dataStore));


//////////////
// Database //
//////////////

// start server and mongoDB
// Start HTTP Server and WebSocket Server
(async () => {
    try {
        await dataStore.connect();
        const httpService = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
  
        // Initialize WebSocket server
        socket(httpService);
        console.log("WebSocket server initialized on /ws");
  
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
  })();