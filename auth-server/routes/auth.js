const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const { checkNotAuthenticated, checkAuthenticated, isVerify } = require('../middlewares/authMiddleware');
const router = express.Router();
require("dotenv").config();
const sendEmail = require('../email/nodemailer-config');

//Requiring Models Schemas
const User = require('../models/user');

//Getting all requests

router.post('/auth/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        confirmationCode: ""
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

router.post('/auth/signin', passport.authenticate('local', {
    successRedirect: '/auth/successjson',
    failureRedirect: '/auth/failurejson',
    failureFlash: true
}));

router.delete('/auth/signout', (req, res) => {
    req.logOut();
    res.status(200).send({isSucess : true, message : "Logout Successfully"})
});

router.get('/auth/successjson', (req,res)=>{
    res.status(200).send(req.user);
});

router.get('/auth/failurejson', (req,res)=>{
    const message = req.flash('error');
    const needVerification = (message == "Email ID is not verified") ? true : false;
    res.status(200).send({needVerification, message });
});

router.get('/auth/checkauth', checkAuthenticated, (req,res)=>{
    return res.status(200).send({"isAuthenticated" : true});    
});

router.get('/auth/getdata', checkAuthenticated, (req,res)=> {
    return res.status(200).send(req.user);
});

router.post('/auth/send-otp', async (req, res)=> {
    const characters = 'lbjksdfih327t6234kbABHCUIIHGYSUJjsfd98bf56gr3rdg5ggsa4dsyjnbgsg2egsg1';
    let token = '';
    for (let i = 0; i < 6; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }

    const {email, contentType} = req.body;
    const savedUser = await User.findOne({email : email})
    if(!savedUser){
        res.status(200).send({isSuccess : false, message : "User is not registered with this Email Address"});
    }
    else{
        savedUser.confirmationCode = token;
        savedUser.save((err)=> {
            if(err) {
                console.log(err);
                res.status(200).send({isSuccess : false, message : "Something went wrong! Login again"});
            }
            else{
                res.status(200).send({isSuccess : true});
            } 
        })
        await sendEmail(email, savedUser, contentType);
    }
});

router.post('/auth/verify-otp', async (req,res)=> {
    const {email, otp} = req.body;
    const savedUser = await User.findOne({email : email})
    if(!savedUser){
        res.status(200).send({isSuccess : false, message : "User is not registered with this Email Address"});
    }
    else{
        if(otp == savedUser.confirmationCode){
            if(savedUser.status == "Active") {
                res.status(200).send({isSuccess : true});
            }
            else{
                savedUser.status = "Active";
                savedUser.save((err)=> {
                    if(err){
                        console.log(err);
                        res.status(200).send({isSuccess : false, message : "Something went wrong! Login again"})        
                    }
                    else{
                        res.status(200).send({isSuccess : true});
                    }
                })
            }
        }
        else{
            res.status(200).send({isSuccess : false, message : "OTP Does not match"});
        }
    }
});

// Very insecure auth request !!!
router.post('/auth/set-password', async (req, res)=> {
    const {email, password} = req.body;
    const savedUser = await User.findOne({email : email})

    if(!savedUser){
        res.status(200).send({isSuccess : false, message : "User is not registered with this Email Address"});
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10);
        savedUser.password = hashedPassword;
        savedUser.save((err)=> {
            if(err) {
                console.log(err);
                res.status(200).send({isSuccess : false, message : "Something went wrong! Login again"});
            }
            else{
                res.status(200).send({isSuccess : true});
            } 
        })
    }
});

module.exports = router;
