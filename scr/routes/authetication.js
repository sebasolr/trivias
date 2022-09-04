const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup', (req, res) => {
    res.render('links/login');})

router.post('/signup', passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));



router.get('/profile', (req, res) => {
        res.send("holi")
});

module.exports = router ;