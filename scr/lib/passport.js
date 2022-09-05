const passport = require( 'passport');
const LocalStrategy = require( 'passport-local').Strategy

const pool = require('../database')
const helper = require('../lib/helpers')

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,username, password,done) =>{
   const rows = await pool.query('select * from usuarios where username = ?',[username])
    if (rows.length > 0) {
        const user = rows[0];
        const validando = await helper.matchPassword(password, user.password)
        if(validando) {
            done(null,user,req.flash('success','Bienvenido'+  username));}
            else {
                done(null,false,req.flash('message','Clave incorrecta'));
            }}
    else{
        return done(null,false,req.flash('message','El username no es correcto'))
    }

})) 


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,username,password,done) =>{
    const { firstname,lastname,email }=req.body;
    const newUser = {
        firstname,
        lastname,
        email,
        username,
        password
    };
    newUser.password =  await helper.encryptPassword(password)
    const result = await pool.query('INSERT INTO usuarios SET ?', [newUser])
    newUser.id = result.insertId;
    return done(null,newUser)
}));

passport.serializeUser((user,done) =>{
    done(null,user.id);
});

passport.deserializeUser(async (id,done) =>{
    const rows = await pool.query ('SELECT * FROM usuarios where id = ?',[id]);
    done(null, rows[0]);
});
