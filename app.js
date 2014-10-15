var express = require('express');
var debug = require('debug')('app');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
var io = require("./server/io").listen(server);

// Delegata routing to `./routes/index`
app.use('/', routes);

app.get("/user_count", function(req, res){
    var count = io.sockets.clients().length;
    res.json({count:count});
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        var status = err.status || 500;
        res.status(status);
        switch(status){
            case 404:
                res.render('404', {   // Kick off `app/404.jade` rendering
                    message: err.message,
                    error: {}
                });
                break;
            default:
                res.render('error', {   // Kick off `app/error.jade` rendering
                    message: err.message,
                    error: err
                });
                break;
        }
    });
}

// production error handler
app.use(function(err, req, res, next) {
    var status = err.status || 500;
    res.status(status);
    switch(status){
        case 404:
            res.render('404', {   // Kick off `app/404.jade` rendering
                message: err.message,
                error: {}
            });
            break;
        default:
            res.render('error', {   // Kick off `app/error.jade` rendering
                message: err.message,
                error: err
            });
            break;
    }
});

module.exports = app;
