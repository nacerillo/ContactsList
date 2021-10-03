const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
//middleware for checking the validity of request data
const {check, validationResult} = require('express-validator/check');

//json web token
const jwt = require('jsonwebtoken');
const config = require('config');
//@route     POST api/users
// @desc     Register a user
// @access   Public
router.post(
    '/', 
    [check('name', 'name is required').not().isEmpty(), 
     check('email', 'Please include a valid email').isEmail(),
     check('password', 'Please create a password with at least 7 characters').isLength({min: 7})],
     async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            //send 400 error message if checks do not pass
            return res.status(400).json({errors: errors.array()});
        }
         const {name, email,password, address} = req.body;


       //try to make a new user, if they already exist, return error message
       // otherwise, create a new user instance
       try {
            let user = await User.findOne({email});

            if(user) {
            return res.status(400).json({msg : "User Already Exists"})
            }

            user = new User({name, email, password,address});
            //hash the password
            const salt = await bcrypt.genSalt(10); 

            user.password = await bcrypt.hash(password,salt);

            await user.save(); 
           
            const payload = {
                user: {
                    id: user.id
                }
            }
            //token will expire after X amount of time, making the user have to log back in again
            jwt.sign(payload,
                    config.get('jwtSecret'), 
                    {expiresIn: 360000}, 
                    (err,token) => {
                        if(err) throw err;
                        res.json({token});
                    }
                    );
            } catch(err) {
                console.log(err.message);
                res.status(500).send("Server Error");
                }
    }
);


module.exports = router;

