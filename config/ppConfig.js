const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

// Serialize user
passport.serializeUser(function(user, callback) {
    callback(null, user.id);
})

// Deserialize user
passport.deserializeUser(function(id, callback) {
    db.user.findByPk(id)
    .then(function(user) {
        callback(null, user);
    }).catch(callback);
})

// config local variables/settings
passport.use(new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, callback) {
    db.user.findOne({
        where: {
            email
        }
    }).then(function(user) {
        if (!user || user.validPassword(password)) {
            callback(null, false)
        } else {
            callback(null, user)
        }
    }).catch(callback)
}));

module.exports = passport;