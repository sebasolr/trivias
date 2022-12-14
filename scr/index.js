const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore =require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');



//inicializar express
const app = express();
require('./lib/passport')

//settings 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


//middleware
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//variables glbales
app.use((req, res,next)=>{
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user = req.user;
    next()
})



//rutas
app.use(require('./routes'));
app.use(require('./routes/authetication'));
app.use('/links',require('./routes/links'));

//archivos publicos
app.use(express.static(path.join(__dirname,'public')))
//starting server

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
