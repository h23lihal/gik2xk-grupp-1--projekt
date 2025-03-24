var express = require('express');

var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    next();
  });

app.use('/products', require('./routes/productsRoute'));
app.use('/customers', require('./routes/customersRoute'));
app.use('/ratings', require('./routes/ratingsRoute'));
app.use('/cart', require('./routes/cartRoute'));


module.exports = app;
