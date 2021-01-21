const express = require('express');
const router = express.Router();
const db = require('../models');

//middleware
const flash = require('connect-flash');
const passport = require('../config/ppConfig');

// router.get('/register', function(req, res) {
//     res.render('auth/register')
// })

// register user post route
router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password,
            username: req.body.username,
            age: req.body.age
        }
    }).then(function([user, created]) {
        if (created) {
            // authenticate user and start auth process
            console.log('user created');
            passport.authenticate('local', {
                successRedirect: '/',
                successFlash: 'Thanks for signing up'
            })(req, res);
        } else {
            console.log('user email already exists');
            req.flash('error', "Error: email already exists, please try again")
            res.redirect('/')
        }
    }).catch(function(error) {
        console.log(error)
        req.flash('error', error.message);
        res.redirect('/')
    })
})

// router.get('/login', function(req, res) {
//     res.render('auth/login')
// })

// Log user in
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        if(!user) {
            req.flash('error', 'Invalid username or password')
            return res.redirect('/auth/login');
        } if (error) {
            return next(error)
        } req.login(user, function(error) {
            if (error) next(error);
            req.session.save(function() {
                return res.redirect('/')
            })
        })
    })(req, res, next);
})

// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// })



module.exports = router;