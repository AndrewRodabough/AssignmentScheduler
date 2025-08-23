import express from 'express';

import groupRoutes from './routes/groupRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js';

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

////////////
// Routes //
////////////

apiRouter.use('/auth', userRoutes(dataStore));
apiRouter.use('/group', groupRoutes(dataStore));
apiRouter.use('/event', eventRoutes(dataStore));

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