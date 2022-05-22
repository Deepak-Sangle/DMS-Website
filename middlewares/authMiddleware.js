function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else
        // return res.redirect('/signin');
        res.status(200).send({"isAuthenticated" : false});    
    
}

function checkNotAuthenticated(req, res, next) {
    // console.log(req.headers);
    if (req.isAuthenticated()) {
        return res.status(200).send({"isAuthenticated" : true});
        // return res.redirect('/');
    }
    else
        next();
}

function isVerify(req, res, next) {
    if(req.user.status!="Active") {
        res.redirect('/verifying');
        return ;
    }
    else next();
}

module.exports = {checkAuthenticated, checkNotAuthenticated, isVerify};