const express = require('express');
const router = express.Router();
//Getting Models
const Users = require('../models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const chalk = require('chalk');
const { registerValidation, loginValidation } = require('../validation');


//Home Route
router.get('/', (req, res) => {
    res.json( {"message" : "Welcome to Pseudo API for UPI 2.0" })
})

//Getting All Users
router.get('/all', async (req, res)=>{
    try{
        const user = await Users.find()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message : "Something Went Wrong" })
    }
})

//registration for new users
router.post('/register', async (req, res) => {
    //Validating user input
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).json({ message: error.details[0].message })


    //checking for existing user
    const userExist = await Users.findOne({ username : req.body.username });
    if(userExist) return res.status(400).json( {message : "Username Taken."} )

    //Hashing password
    const hashPass = await bcrypt.hash(req.body.password, 10)
    const user = new Users({
        name: req.body.name,
        username: req.body.username,
        password: hashPass
    })
    try{
        const newUser = await user.save();
        res.status(201).json({
            accountNumber: newUser.accountNumber,
            name: newUser.name,
            username: newUser.username
        });
    } catch (err) {
        res.status(400).json({ message : err.message })
    }
})

//Login Functionality
router.post('/login', async (req, res) => {
    //Validating user input
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).json({ message: error.details[0].message })

    //checking for existing use
    const userName = await Users.findOne({ username: req.body.username });
    if(!userName) return res.status(400).json( {message : "Upload your CSV"} )
    
    //password checking
    const passCheck = await bcrypt.compare(req.body.password, userName.password);
    if(!passCheck) return res.status(400).json( {message : "Check Your Credentials"} )

    //Creating JWT token
    const token = jwt.sign({id: userName._id}, process.env.JWT_SECRET)

    //Response after login
    res.header('token', token).status(200).json({
        accountNumber: userName.accountNumber,
        name: userName.name,
        username: userName.usernamep
    })
    
})

module.exports = router