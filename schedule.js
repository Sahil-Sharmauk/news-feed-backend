const cron = require('node-cron');
const axios= require('axios')
const NewsArticlesFeeds = require('./models/newsArticles.model')
const {FETCH_NEWS_URL,API_KEY} =require ('./constant.js')
 const job = cron.schedule('0 0 0/24 * * * ', async () => {
  console.log('running a task every two minutes');
  try{
      let allArticles = await axios.get(`${FETCH_NEWS_URL}/everthing/q=keyword&apiKey=${process.env.API_KEY}`)
    if(allArticles !== undefined && allArticles.data !== undefined && allArticles.data.articles.length>0){
      const {articles} = allArticles.data
      let data = await NewsArticlesFeeds.create(articles)
    }
    // console.log("data:::>",data.data.articles[0].source)
  }catch  (err){
    console.log("Error while inserting all news feeds",err)
  }
});

module.exports = job