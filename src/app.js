const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');






//Setting
app.set('port', 5000);
app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'ejs')

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//Routes
app.use(require('./routes/route'));

//Static Files
app.use(express.static(path.join(__dirname,'/public')));

// 404 handler
app.use( (req,res,next) =>{
    res.status(404).send('Error 404 pag not found')
})

module.exports = app;