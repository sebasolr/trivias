const express = require('express');
const morgan = require('morgan');

//inicializar express
const app = express();

//settings 

app.set('port', process.env.PORT || 3000);


//middleware
app.use(morgan('dev'));

//variables glbales

//rutas
app.use(require('./routes'));
//archivos publicos

//starting server

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
