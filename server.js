const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

// Create an Express application
const app = express();

// Define CORS options for the /player-price endpoint
const corsOptions = {
	origin: '*', // Allow requests from any origin
	methods: ['GET'], // Allow only GET requests
};


// Define a route to handle GET requests to the root URL '/'
app.get('/', (req, res) => {
	res.send('Hello, World!');
});

// https://www.sktables.org/prices?skills=0,18,10,9,8,7,6,5&age=24
app.get('/player-price', cors(corsOptions), async (req, res) => {

	try {
		// Extract query parameters from the request query
		const { skills, age } = req.query;

		// Build the URL with the dynamic query parameters
		const url = `https://www.sktables.org/prices?skills=${skills}&age=${age}`;

		// Make a GET request to the URL
		const response = await axios.get(url);

		// Load the HTML content into Cheerio
		const $ = cheerio.load(response.data);

		// Now you can use Cheerio to parse and manipulate the HTML
		// For example, to extract the text of a specific element:
		const title = $('.max-w-8 .strong').text();

		// Send the parsed HTML or extracted data as a response
		res.send({ price: parseInt(title.replace(/[,€]/g, ''), 10) * 6.4 });
	} catch (error) {
		// Handle any errors that occur during the process
		console.error('Error fetching and parsing HTML:', error);
		res.status(500).send('An error occurred while fetching and parsing HTML');
	}
});

// Start the server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
