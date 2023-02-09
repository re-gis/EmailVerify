const mongoose = require()
const express = require('express')

mongoose.set('strictQuery', true)
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)

        console.log(`MongoDB connect: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        exit(1)
    }
}

module.exports = connectDB
