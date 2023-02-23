
const express = require('express');
const bodyParser = require('body-parser') ;
const mongoose = require('mongoose') ;
const cors = require('cors') ;
const http = require('http') ;
const router = require('./routes/index.js') ;
const job = require('./schedule.js') ;
require('dotenv').config()
const app = express();
const server = http.createServer(app)
const Port = 3800
const mongo_db_string = `mongodb://localhost:27017/newsfeedly`
app.use(express());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// job.start();

server.listen(Port,()=>{
	console.log('Server is running on......'+ Port)
})

app.use('/api', router);
mongoose.connect(mongo_db_string, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once('open',()=>{
    console.log("MongoDB database connection established successfully")
})