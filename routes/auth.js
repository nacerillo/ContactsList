const express = require('express');
const router = express.Router();

//@route     GET api/auth
// @desc     get logged  user
// @access   Private
router.get('/',(req,res) => {
    res.send("Get a logged user");
});


//@route     POST api/auth
// @desc     Auth user & get user token
// @access   Public
router.post('/',(req,res) => {
    res.send("logged user");
});


module.exports = router;