var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var apiRoute = require('./routes/apiRoute');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: true}));// application/x-www-form-urlencoded 格式key1=value1&key2=value2
app.use(bodyParser.json());// for parsing application/json head必须有Content-Type: application/json

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', apiRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});


module.exports = app;
