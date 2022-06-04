const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const { checkNotAuthenticated, checkAuthenticated, isVerify } = require('../middlewares/authMiddleware');
const router = express.Router();
require("dotenv").config();

//Requiring Models Schemas
const User = require('../models/user');

//Getting all requests

router.get('/', checkAuthenticated, (req,res)=> {
    res.status(200).send(req.user);
});

router.get('/signup', checkNotAuthenticated, (req,res)=>{
    res.status(200).send("Hello this is get request for signup");
});

router.post('/signup', async (req, res) => {
    const characters = 'lbjksdfih327t6234kbjsfd98bf56gr/*3r=-d[;..,/.,g5ggsa4dsyjnbgsg2egsg1';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        confirmationCode: token
    });
    User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                res.status(200).send({"message": "User Already Exists", "isSuccess" : false });
                return ;
            }
            else{
                user.save((err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(200).send({"message" : "Success","isSuccess" : true });
                });
            }
        })
        .catch((err)=> console.log(err));
});

router.get("/signin", checkNotAuthenticated, (req, res) => {
    res.status(200).send({"isAuthenticated" : false});
});

// router.post('/signin', (req,res,next)=>{
//     passport.authenticate('local', (err,user,info) => {
//         if(err) throw err;
//         if(user) {
//             res.send(user);
//         }
//         res.send(info);
//     })(req,res,next);
// });

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/successjson',
    failureRedirect: '/failurejson',
    failureFlash: true
}));

router.get('/successjson', (req,res)=>{
    res.status(200).send(req.user);
});

router.get('/failurejson', (req,res)=>{
    res.send(req.flash);
});

router.get('/checkauth', checkAuthenticated, (req,res)=>{
    return res.status(200).send({"isAuthenticated" : true});    
});

router.get('/getdata', checkAuthenticated, (req,res)=> {
    return res.status(200).send(req.user);
});

module.exports = router;
