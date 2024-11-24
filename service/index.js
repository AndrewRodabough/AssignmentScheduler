import express from 'express';
const app = express();

// Allow selecting port from cmd line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Serve static files from public dir
app.use(express.static('public'));


//////////////////////////////
// Authentication Endpoints //
//////////////////////////////

// Create new user account
apiRouter.post('/auth/create', (req, res) => {
    // similar to simon, create user with email/password
});
  
// User login
apiRouter.post('/auth/login', (req, res) => {
    // Validate credentials, return token
});
  
// User logout
apiRouter.delete('/auth/logout', (req, res) => {
    // Invalidate user session
});
  

//////////////////////////////////
// Calendar Managment Endpoints //
//////////////////////////////////

//// Events ////

// Get all events for a user
apiRouter.get('/events', (req, res) => {
    // Retrieve events for authenticated user
});
  
// Create a new event
apiRouter.post('/events', (req, res) => {
    // Add new event to user's calendar
});
  
// Delete an event
apiRouter.delete('/events', (req, res) => {
    // Remove event from user's calendar
});

// Update an existing event
apiRouter.put('/events', (req, res) => {
    // Modify specific event details
});

//// Calendars ////

// Create Calendar
apiRouter.post('/calendars', (req, res) => {
    // Modify specific event details
});

// Delete Calendar
apiRouter.delete('/calendars', (req, res) => {
    // Modify specific event details
});

// Update Calendar Visibility
apiRouter.put('/calendars', (req, res) => {
    // Modify specific event details
});


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