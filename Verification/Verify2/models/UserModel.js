const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },

    email: {
        type:String,
        required: true
    },

    verified: {
        type: Boolean,
        default: false
    }
})


const User = mongoose.model('user', userSchema)


function validate(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required()
    })
    return schema.validate(user)
}


module.exports = {User, validate}

