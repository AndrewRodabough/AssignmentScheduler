import express from 'express';
const app = express();

// Allow selecting port from cmd line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Serve static files from public dir
app.use(express.static('public'));

// Basic root endpoint
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
