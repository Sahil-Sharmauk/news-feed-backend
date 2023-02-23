const Router = require ('express');
const {fetchAllArticles,fetchAllSources,fetchTopHeadLines} = require('../controllers/FeedsController.js');
const feedRouter = Router();
feedRouter.post('/fetch-all-feeds/:page', fetchAllArticles );			
feedRouter.get('/fetch-all-src', fetchAllSources );	
feedRouter.get('/fetch-top-headlines',fetchTopHeadLines)
module.exports = feedRouter;
