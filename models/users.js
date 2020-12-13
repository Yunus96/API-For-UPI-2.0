const mongoose = require('mongoose');
const uniqid = require('uniqid');

const usersSchema = mongoose.Schema({
    accountNumber: {
        type: mongoose.Mixed,
        required: true,
        default: uniqid.time()
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        max: 20,
        min: 6
    },
    registrationDate: {
        type : Date,
        required: true,
        default: Date()
    }
})

let Users = module.exports = mongoose.model('Users', usersSchema)