const mongoose = require('mongoose')
const asynHandler = require('async-handler')


const dbConnect = async () => {
    try {
        const conn = await mongoose.createConnection(process.env.DB)
        console.log('Database connected');
    } catch (err) {
        console.log('err');
        process.exit()
    }
}

module.exports = dbConnect