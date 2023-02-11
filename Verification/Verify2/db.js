const mongoose = require('mongoose')
const asynHandler = require('async-handler')

mongoose.set('strictQuery', true)
const dbConnect = async () => {
    try {
        mongoose.connect(process.env.DB, {
             useNewUrlParser: true,
             useUnifiedTopology: true,
        }, () => {
            console.log(`Connected to database!`);
        })
    } catch (err) {
        console.log('err');
        process.exit()
    }
}

module.exports = dbConnect