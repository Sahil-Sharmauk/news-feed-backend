require('dotenv').config()

const  FETCH_NEWS_URL = "https://newsapi.org/v2"
const API_KEY = process.env.API_KEY
module.exports = {FETCH_NEWS_URL,API_KEY}