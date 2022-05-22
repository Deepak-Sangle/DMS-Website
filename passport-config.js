const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model("User");

function initPassport(passport, getUserbyEmail) {

    const authenticateUser = async (email, password, callback) => {
        const user = await getUserbyEmail(email);
        if (user == null) {
            return callback(null, false, { "message": "No user registered with this email" })
        }

        try {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return callback(null, user);
            }
            else {
                return callback(null, false, { "message": "Wrong username or password" });
            }

        } catch (error) {
            return callback(error);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

    passport.serializeUser((user, callback) => {
        callback(null, user.id);
    });

    passport.deserializeUser((id, callback) => {
        User.findById(id, (err, user) => {
            callback(err, user);
        });
    });
}

module.exports = initPassport;