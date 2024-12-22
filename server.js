const express = require('express');
const axios = require('axios');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to handle JSON responses
app.use(express.json());

// API route for news
app.use('/api/news', newsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
