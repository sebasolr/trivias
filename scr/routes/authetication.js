const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotloggedIn } = require('../lib/auth')

//crear usuarios para la aplicacion
router.get('/signup',isNotloggedIn, (req, res) => {
    res.render('auth/add');
});

router.post('/signup', passport.authenticate('local.signup',{
        successRedirect: '/signin',
        failureRedirect: '/signup',
        failureFlash: true
}));

//logear a los usuarios
router.get('/signin',isNotloggedIn, (req, res) => {    
        res.render('auth/login');
})

router.post('/signin', (req, res,next) => {
        passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
})(req,res,next)});


router.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile')
});

router.get('/exit', isLoggedIn,function(req, res, next){
        req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/signin');
        });
      });

module.exports = router ;