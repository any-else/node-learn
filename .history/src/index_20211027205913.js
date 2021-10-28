const express = require('express')
const app = express()
//DB
const connectDB = require('../config/db')
//Morgan
const morgan = require('morgan');
//lay Posts
const posts = require('./routers/posts.router');
const { post } = require('./routers/posts.router');
//start express middleware
app.use(express.json())
//use morgan
app.use(morgan('combined'));
//connect database
connectDB()
//one of the most post can use at router
app.get('/', (req, res) => res.render('index'))
app.get('/about', (req, res) => res.render('about'))
//Test Post
app.use('/posts', post)

const PORT = 5000
app.listen(PORT, () => console.log(`start server in port http://localhost:${PORT}`))
