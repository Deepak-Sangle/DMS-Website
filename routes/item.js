const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const { checkNotAuthenticated, checkAuthenticated, isVerify } = require('../middlewares/authMiddleware');
const router = express.Router();
require("dotenv").config();

//Requiring Models Schemas
const User = require('../models/user');
const Item = require('../models/item');

//Getting all requests

router.post('/create', checkAuthenticated, (req,res)=> {
    const {name, price, source, description} = req.body;
    const item = new Item({
        name, price, source, description
    });

    item.save((err)=>{
        if(err)
            console.log(err);
        res.status(200).send({"Success" : true});
    });
});

router.get('/getitems', checkAuthenticated, (req,res)=> {
    Item.find()
        .then((item)=> {
            console.log(item);
            res.json(item);
        })
        .catch((err)=> console.log(err));
});

module.exports = router;