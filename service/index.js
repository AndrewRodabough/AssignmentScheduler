import express from 'express';
const app = express();

import { router as createUser } from './routes/Authentication/createUser.js';
import { router as login } from './routes/Authentication/login.js';
import { router as logout } from './routes/Authentication/logout.js';

import { router as createCalendar } from './routes/Calendar/createCalendar.js';
import { router as deleteCalendar } from './routes/Calendar/deleteCalendar.js';
import { router as getAllCalendars } from './routes/Calendar/getAllCalendars.js';
import { router as updateCalendar } from './routes/Calendar/updateCalendar.js';

import { router as createEvent } from './routes/Calendar/createEvent.js';
import { router as deleteEvent } from './routes/Calendar/deleteEvent.js';
import { router as getAllEvents } from './routes/Calendar/getAllEvents.js';
import { router as updateEvent } from './routes/Calendar/updateEvent.js';

// Users, Events, and Calendars are stored in memory
let users = {};
let calendars = {};
let events = {};

// Allow selecting port from cmd line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Serve static files from public dir
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


//////////////////////////////
// Authentication Endpoints //
//////////////////////////////

apiRouter.use('/auth/create', createUser);
apiRouter.use('/auth/login', login);
apiRouter.use('/auth/logout', logout);
  

//////////////////////////////////
// Calendar Managment Endpoints //
//////////////////////////////////

//// Event ////

apiRouter.use('/event/create', createEvent);
apiRouter.use('/event/delete', deleteEvent);
apiRouter.use('/event/get', getAllEvents);
apiRouter.use('/event/update', updateEvent);

//// Calendars ////

apiRouter.use('/calendar/create', createCalendar);
apiRouter.use('/calendar/delete', deleteCalendar);
apiRouter.use('/calendar/get', getAllCalendars);
apiRouter.use('/calendar/update', updateCalendar);


//////////////////
// Other Things //
//////////////////

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Additional Potential Endpoints Futur
// /api/events/range (get events within date range)
// /api/profile (user profile management)
// /api/preferences (calendar display preferences)


//////////////////////
// Helper Functions //
//////////////////////