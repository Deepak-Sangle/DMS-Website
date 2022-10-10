const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const { checkNotAuthenticated, checkAuthenticated, isVerify } = require('../middlewares/authMiddleware');
const router = express.Router();
require("dotenv").config();
const sendEmail = require('../nodemailer-config');

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

router.get("/signin", checkNotAuthenticated, (req, res) => {
    const message = (req.flash('error'))[0];
    res.status(200).send({message});
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/successjson',
    failureRedirect: '/failurejson',
    failureFlash: true
}));

router.delete('/signout', (req, res) => {
    req.logOut();
    res.status(200).send({isSucess : true, message : "Logout Successfully"})
});

router.get('/successjson', (req,res)=>{
    res.status(200).send(req.user);
});

router.get('/failurejson', (req,res)=>{
    const message = req.flash('error');
    const needVerification = (message == "Email ID is not verified") ? true : false;
    res.send({needVerification, message });
});

router.get('/checkauth', checkAuthenticated, (req,res)=>{
    return res.status(200).send({"isAuthenticated" : true});    
});

router.get('/getdata', checkAuthenticated, (req,res)=> {
    return res.status(200).send(req.user);
});

router.post('/send-otp', async (req, res)=> {
    const characters = 'lbjksdfih327t6234kbABHCUIIHGYSUJjsfd98bf56gr3rdg5ggsa4dsyjnbgsg2egsg1';
    let token = '';
    for (let i = 0; i < 6; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }

    const {email, password} = req.body;
    const savedUser = await User.findOne({email : email})
    if(!savedUser){
        res.status(200).send({isSuccess : false, message : "Something went wrong! Login again"});
    }
    else{
        const match = await bcrypt.compare(password, savedUser.password);
        if(match){
            sendEmail(email, token);
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
        }
        else{
            res.status(200).send({isSuccess : false, message : "Something went wrong! Login again"})    
        }
    }
});

router.post('/verify-otp', async (req,res)=> {
    const {email, password, otp} = req.body;
    const savedUser = await User.findOne({email : email})
    if(!savedUser){
        res.status(200).send({isSuccess : false, message : "Something went wrong! Login again"});
    }
    else{
        const match = await bcrypt.compare(password, savedUser.password);
        if(match){
            if(otp == savedUser.confirmationCode){
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
            else{
                res.status(200).send({isSuccess : false, message : "OTP Does not match"});
            }
        }
        else{
            res.status(200).send({isSuccess : false, message : "Something went wrong! Login again"})    
        }
    }
});

router.get("/api/auth/confirm/:code", (req, res) => {
    User.findOne({
        confirmationCode: req.params.code,
    })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ isSuccess : false, message: "User Not found." });
            }
            user.status = "Active";
            user.save((err) => {
                if (err) {
                    res.status(500).send({ isSuccess : false, message: err });
                    return;
                }
            });
            res.status(200).send({isSuccess : true});
        })
        .catch((e) => console.log("error", e));
});

module.exports = router;
