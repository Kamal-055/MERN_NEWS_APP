const axios = require('axios');

const getNews = async (req, res) => {
  const { searchTerm, category } = req.query;
  const apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.API_KEY}`;

  
  // If a search term is provided, include it in the API request
  if (searchTerm) {
    apiUrl += `&q=${searchTerm}`;
  }
  
  // If a category is provided, include it in the API request
  if (category) {
    apiUrl += `&category=${category}`;
  }

  try {
    // Send the request to the NewsAPI
    const response = await axios.get(apiUrl);
    
    // Check if articles are returned in the response
    if (response.data.articles && response.data.articles.length > 0) {
      // Return the articles as a JSON response
      return res.json(response.data.articles);
    } else {
      // If no articles are found, return a message
      return res.json({ message: 'No news found' });
    }
  } catch (error) {
    // In case of an error, return a failure message
    return res.json({ message: 'Failed to fetch news', error: error.message });
  }
};

module.exports = { getNews };
