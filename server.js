const express = require("express");
const { oneOf } = require("express-validator");
const connectDB = require("./config/db"); 
const path = require('path');
//defining our routes
const app = express();

connectDB();
//the basic structure of makeing a http get request

// Init Middleware
//exepting json body data
app.use(express.json({extended: false}));


//Application Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

//Serve static assets in productions
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is up and running on port ${PORT}`));