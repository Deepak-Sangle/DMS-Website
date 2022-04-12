const express = require('express');
const app = express();
var methodOverride = require('method-override')
const path = require('path');
const session = require("express-session");
const passport = require("passport");
// const flash = require("express-flash");
const mongoose = require('mongoose');
const PORT = 3000;

//Requiring models if any

//Middleware Functions

//Route Requests
app.use(require('./routes/auth'));

//Listen Port
app.listen(PORT, (req,res)=>{
    console.log(`Listening to the port ${PORT}`);
});