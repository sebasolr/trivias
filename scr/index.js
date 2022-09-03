const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');

//inicializar express
const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//variables glbales
app.use((req, res,next)=>{
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
