const express = require('express')
const mongoose = require('mongoose')


//Connexion to Data base
const connectDB = async () => {
        try {
               await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
                console.log("mongoose is connected")
        } catch (error) {
                console.log("Data Base connection failed")
        }
} 


module.exports = connectDB