require("dotenv").config();
const express = require('express');
const app = express();
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

//Requiring models if any
const User = require('./models/user');

//Set up MongoDB Database 
mongoose.connect(process.env.MONGOURI);

mongoose.connection.on('connected',()=>{
    console.log("Database connection On");
});
mongoose.connection.on('error',(err)=>{
    console.log("Error Connecting: ", err);
});

//Middleware Functions
// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const initPassport = require('./passport-config');
initPassport(passport, (email) => {
    return User.findOne({ email });
});


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie:{ secure :false}
}));

// session
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Route Requests
app.use(require('./routes/auth'));
app.use(require('./routes/item'));

//Listen Port
app.listen(PORT, (req,res)=>{
    console.log(`Listening to the port ${PORT}`);
});