const express = require('express');

// Create an Express application
const app = express();

// Define a route to handle GET requests to the root URL '/'
app.get('/', (req, res) => {
	res.send('Hello, World!');
});

// Start the server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
