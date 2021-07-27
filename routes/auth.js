const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
//middleware for checking the validity of request data
const {check, validationResult} = require('express-validator/check');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
//@route     GET api/auth
// @desc     get logged  user
// @access   Private
router.get('/',auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    //res.send("Get a logged user");

});


//@route     POST api/auth
// @desc     Auth user & get user token
// @access   Public

router.post('/',[check('email', 'Please include a valid email').isEmail(), 
                check('password','Password is required').exists()],
                async (req,res) => {
                    const errors = validationResult(req);
                    if(!errors.isEmpty()) {
                        //send 400 error message if checks do not pass
                        return res.status(400).json({errors: errors.array()});
                    }
                   const {email, password} = req.body;

                   try {
                    let user = await User.findOne({email});

                    if(!user) {
                        return res.status(400).json({msg: "Invalid Email"})
                    }
                     const isMatch = await bcrypt.compare(password, user.password);

                    if(!isMatch) {
                        return res.status(400).json({msg: "Invalid Password"})
                    }

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
                            )

                   } catch (err) {
                        console.error(err.message);
                        res.status(500).send('Server Error');
                   }
                }
    );


module.exports = router;