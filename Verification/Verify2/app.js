const express = require('express')
const dotenv= require('dotenv').config()
const app = express()
const dbConnect = require('./db')
const users = require('./routes/userRoute')
const bodyParser = require('body-parser')

dbConnect()

// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use('/api/users', users)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}...`);
})