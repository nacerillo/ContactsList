const mongoose = require("mongoose");

const User = require('../models/User');
const UserSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now,
    }, 
    address : {
        type: String
    }
});

module.exports = mongoose.model('user',UserSchema);