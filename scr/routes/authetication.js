const express = require('express');
const router = express.Router();

const passport = require('passport');

//crear usuarios para la aplicacion
router.get('/signup', (req, res) => {
    res.render('auth/login');})


router.post('/signup', passport.authenticate('local.signup',{
        successRedirect: '/signin',
        failureRedirect: '/signup',
        failureFlash: true
}));

//logear a los usuarios
router.get('/signin',(req, res) => {    
        res.render('auth/login');
})
router.post('/signin', (req, res,next) => {
        passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
})(req,res,next)});


router.get('/profile', (req, res) => {
        res.send("holi")
});

module.exports = router ;