const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
    user : { 
        //when we create an entry, we refer to an object ID
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
    },
    phone : {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "personal"
    },
    date : {
        type: Date,
        default: Date.now,
    }, 
    address : {
        type: String
    }
});

module.exports = mongoose.model('contact',ContactSchema);