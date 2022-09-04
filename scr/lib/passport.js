const passport = require( 'passport');
const LocalStrategy = require( 'passport-local').Strategy

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,username,pass,done) =>{
    console.log(req.body);
}));
