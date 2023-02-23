const Router = require ('express');
const {fetchAllArticles,fetchAllSources} = require('../controllers/FeedsController.js');
const feedRouter = Router();
feedRouter.post('/fetch-all-feeds/:page', fetchAllArticles );			
feedRouter.get('/fetch-all-src', fetchAllSources );	
module.exports = feedRouter;
