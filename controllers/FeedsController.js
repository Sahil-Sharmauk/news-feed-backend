
const { all } = require('axios')
const NewsArticlesFeeds = require('../models/newsArticles.model')
const  fetchAllArticles = async (req,res,next)=>{
    console.log(req.body)
    let response = {}
    let allArticles =[]
    let count = 0
    let pagecount = 0
    try{
        let page = req.body.page
        let pageSize = parseInt(15);
      
        let fetched_count =  page*pageSize
        const {source,search} = req.body
        if(source === 'All'  && search === false){   
            count = await NewsArticlesFeeds.count();
            pagecount = Math.trunc(count/pageSize) +1
         
            if(page <= pagecount){
                allArticles = await NewsArticlesFeeds.find().sort({createdAt: -1}).skip((page - 1) * pageSize).limit(pageSize)
            }else{
                response['success']=false
                response['message']= 'No more results'
            }
        }else if(source !== 'All' && search === false){
            count = await NewsArticlesFeeds.countDocuments({"source.name":source});
            pagecount = Math.trunc(count/pageSize) +1
            if(page <= pagecount){
                allArticles = await NewsArticlesFeeds.find({"source.name":source}).sort({createdAt: -1}).skip((page - 1) * pageSize).limit(pageSize)
            }else{
                response['success']=false
                response['message']= 'No more results'
            }
        }
        else if(source !== 'All' && search === true){
            count = await NewsArticlesFeeds.countDocuments({$text:{$search:source}})
            pagecount = Math.trunc(count/pageSize) +1
            console.log("count",count)
            console.log("pagecount",pagecount)
            console.log('pageSize',page)
            if(page <= pagecount){
                allArticles = await NewsArticlesFeeds.find({$text:{$search:source}}).skip((page - 1) * pageSize).limit(pageSize)
            }else{
                response['success']=false
                response['message']= 'No more results'
            }
        }
        if(allArticles.length>0){
            // console.log("allArticles::::>",allArticles)        
            response['success']=true
            response['allArticles']=allArticles
        }else{
            response['success']=false
            response['message']= 'Not found Results'
        }
    }catch(err){
        console.log("Error in fetchAllArticles",err)
        response['success']=false
        
    }
    return res.json(response)
}

const fetchAllSources = async (req,res,next)=>{
    let response = {}
    try{  
        let allSources = await NewsArticlesFeeds.distinct("source.name")      
        let temp = ['All',...allSources]
        response['allSources']=temp
        response['success']=true
       
    }catch(err){
        console.log("Error in fetchAllArticles")
        response['success']=false
    }
    return res.json(response)
}
module.exports = {fetchAllArticles,fetchAllSources}