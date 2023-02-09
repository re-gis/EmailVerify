const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const asyncHandler = require('async-handler')
const { User, validate } = require('../models/UserModel')
const Token = require('../models/token')
const token = require('../models/token')
const sendEmail = require('../utils/email')

router.post('/', async (req, res) => {
     try {
        const { error } = validate(req.body)
        if(error) {
         res.status(400).send(error.details[0].message)
        //  console.log(name = req.body.name);
        } else {
            let user = await User.findOne({ email: req.body.email })
            if(user) {
                return res.status(400).send('Email already exists!')
            } else {
                user = await new User({
                    name: req.body.name,
                    email: req.body.email
                }).save()

                let token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex')
                }).save()
            }

            const message = `${process.env.BASE_URL}/users/verify/${userId}/${token.token}`
            await sendEmail(user.email, 'verify email', message);

            res.send('email sent to your account, please verify')
        }
    } catch (err) {
        console.log(err);
        res.status(400).send('An error occurred!')
    }
})

router.get('/verify/:id/:token', async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id})
        if(!user) {
            console.log('Invalid link');
            res.send('Invalid link!').status(400)
        } else {
            let token = await Token.findOne({ userId: user._id, token: req.params.token})
            if(!token) {
                console.log('Invalid link please!');
                res.status(400).send('Invalid link please!')
            } else {
                await User.updateOne({ _id: user._id, verified: true})
                await Token.findByIdAndRemove(token._id)

                res.send('Email verified successfully!')
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).send('Error occurred!')
        
    }
})



module.exports = router