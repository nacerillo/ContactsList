const express = require("express");
const { oneOf } = require("express-validator");
const connectDB = require("./config/db"); 
//defining our routes
const app = express();

connectDB();
//the basic structure of makeing a http get request

// Init Middleware
//exepting json body data
app.use(express.json({extended: false}));
app.get('/', (req,res) => res.json({msg : `Welcome to the Rice Fields MotherLovers!`})
);

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is up and running on port ${PORT}`));