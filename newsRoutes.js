const express = require('express');
const axios = require('axios');
const router = express.Router();

// Your NewsAPI key
const API_KEY = 'a942c176c8624f0a95e4a306b70a8890';  // Replace with your actual API key
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

const getNews = async (category = '', searchTerm = '') => {
  let url = `${BASE_URL}?apiKey=${API_KEY}`;

  if (category) {
    url += `&category=${category}`;
  }

  if (searchTerm) {
    url += `&q=${encodeURIComponent(searchTerm)}`;
  }

  try {
    const response = await axios.get(url);
    return response.data.articles; // Return the articles array
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
};

router.get('/', async (req, res) => {
  const { category, searchTerm } = req.query;
  
  const news = await getNews(category, searchTerm);
  
  if (news && news.length > 0) {
    res.json(news);
  } else {
    res.json({ message: 'No news found' });
  }
});

module.exports = router;
