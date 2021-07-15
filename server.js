const express = require ('express')
require('dotenv').config({path: "./config/.env"})

const app = express()

// 4- Parse Data
app.use(express.json())


// 3- Routes
app.use("/api/persons",  require("./routes/person"))

// 2- Connect to the Data Base
connectDB()

// 1- Run the server
const PORT = process.env.PORT
app.listen(PORT, (err)=>{
    err
    ? console.log('Server Connection Failed', err) 
    : console.log(`Server running on port ${PORT}`)
})