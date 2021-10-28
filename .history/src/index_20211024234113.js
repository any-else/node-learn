const express = require('express')
//create app 
const app = express()
const connectDB = require('../config/db')
//start express middleware
app.use(express.json())
//
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//connect database
connectDB()

const PORT = 5000
app.listen(PORT, () => console.log(`start server in port http://localhost:${PORT}`))
