function checkAuthenticated(req, res, next) {
    isVerify(req, res, (err) => {
        if (err) {
            return res.status(200).send(err);
        }
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            return res.status(200).send({"isAuthenticated" : false});
        }
    });
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return res.status(200).send({"isAuthenticated" : true});
    else
        next();
}

function isVerify(req, res, next) {
    if (req.user?.status !== "Active")
        return res.status(200).send({ "isAuthenticated": false });
    else
        next();
}

module.exports = {checkAuthenticated, checkNotAuthenticated, isVerify};