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

router.put('/:id', auth,async (req,res) => {
   // res.send("Update contacts");
    const {name, email, phone, type, address} = req.body;

    //build a contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;
    if(address) contactFields.address = address;
    try{
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(400).json({msg: "Contact Not Found"});

        //make sure user owns contact
        console.log(req);
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg : "Not Authorized"});
        }
     contact = await Contact.findByIdAndUpdate(req.params.id, 
        {$set: contactFields },
        {new: true}
    );

      res.json(contact);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route     DELETE api/contacts/:id
// @desc     DLETE  contact
// @access   Public

router.delete('/:id',auth, async (req,res) => {
    //res.send("Update contacts");
    try{
        let contact = await Contact.findById(req.params.id);
       // let contact = await Contact.findByIdAndDelete(req.params.id);
        if(!contact) return res.status(400).json({msg: "Contact Not Found"});

        //make sure user owns contact
       // console.log(req);
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg : "Not Authorized"});
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.json({msg: "Contact Removed"});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;