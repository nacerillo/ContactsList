const express = require('express');
const router = express.Router();

//@route     GET api/contacts
// @desc     Get all users contacts
// @access   Public

router.get('/',(req,res) => {
    res.send("Get all contacts");
});

//@route     POST api/contacts
// @desc     Add a user to contacts
// @access   Public

router.post('/',(req,res) => {
    res.send("Add contacts");
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