const express = require('express');
const router = express.Router();

//Requirign Models Schemas
const User = require('../models/user');

//Getting all requests
router.get('/', (req,res)=>{
    res.send("YES");
});



module.exports = router;
