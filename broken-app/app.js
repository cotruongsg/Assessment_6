const express = require('express');
const ExpressError = require('./expressError');
const axios = require('axios');
const app = express();

// Middleware to parse request body
app.use(express.json());

app.post('/', async function (req, res, next) {
  try {
    // Use Promise.all to await all API requests
    const results = await Promise.all(
      req.body.developers.map(async (d) => {
        try {
          const response = await axios.get(`https://api.github.com/users/${d}`);
          return response.data;
        } catch (error) {
          // Handle API request error appropriately
          console.error(`Error fetching data for ${d}:`, error.message);
          return null;
        }
      })
    );

    // Filter out any failed requests (null values)
    const out = results.filter((r) => r !== null).map((r) => ({ name: r.name, bio: r.bio }));

    // Send response as JSON
    return res.json(out);
  } catch (err) {
    next(err);
  }
});

// Middleware to handle 404 error
app.use(function (req, res, next) {
  return next(new ExpressError('Not Found', 404));
});

// Middleware to handle general errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err.message,
  });
});

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
