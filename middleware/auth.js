//middleware is just a function that has access to the request and response cycle/object

const jwt = require('jsonwebtoken');
const config = require('config');
// next = move on to the next piece of middleware
module.exports = function(req,res,next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token) { 
        return res.status(401).json({msg : "No Token || Authorization Denied"});
    }

    //verify that the token works
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg: "Invalid Token"});
        console.error(err.message);
    }
}