const mongoose= require('mongoose')
const Random = require('meteor-random-universal');

const NewsArticlesSchema = new mongoose.Schema({
	source:{
		id:String,
		name:String
	},
	author:{type:String},
	title:{type:String},
	urlToImage:{type:String},
	description:{type:String},
	url:{type:String},
	publishedAt:{type:Date},
	content:{type:String},
	createdAt:{type:Date},
	updatedAt:{type:Date},
})
NewsArticlesSchema.index({title:"text",description:"text"})
const NewsArticlesFeeds = mongoose.model('FeeNewsArticlesFeed', NewsArticlesSchema)
module.exports = NewsArticlesFeeds