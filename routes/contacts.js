const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Contact = require("../models/Contact");
//middleware for checking the validity of request data
const {check, validationResult} = require('express-validator/check');

//json web token
const jwt = require('jsonwebtoken');
const config = require('config');
//@route     GET api/contacts
// @desc     Get all users contacts
// @access   Public

router.get('/',auth, async (req,res) => {

    try{
        //find user by checking for user.id
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({msg: "Server Error"})
    }
    //res.send("Get all contacts");
});

//@route     POST api/contacts
// @desc     Add a user to contacts
// @access   Public

router.post('/',[
    auth,[check('name', 'Name is required').not().isEmpty()]],
    async (req,res) => {
    //res.send("Add contacts");
    const errors = validationResult(req);
        if(!errors.isEmpty()) {
            //send 400 error message if checks do not pass
            return res.status(400).json({errors: errors.array()});
        }
    const {name, email, phone, type, address} = req.body;

    try {
        const newContact = new Contact({
            name, 
            email,
            phone,
            type,
            address,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route     GET api/contacts/:od
// @desc     UPDATE contact
// @access   Public

router.put('/:id',(req,res) => {
    res.send("Update contacts");
});

//@route     DELETE api/contacts/:id
// @desc     DLETE  contact
// @access   Public

router.delete('/:id',(req,res) => {
    res.send("Update contacts");
});



module.exports = router;