/**
 * Action App Designer
 * 
 *   Author: Joseph Francis, 2017-2019
 *   License: MIT
 * 
 *  */ 


 var path = require('path'),
    http = require('http'),
    scope = {}; 

scope.locals = {
    name: 'action-app-designer',
    title: 'Action App Designer',
    path: {
        root: path.resolve(__dirname)
    }
};
scope.locals.path.modules = scope.locals.path.root + "/server-app";
scope.locals.path.libraries = scope.locals.path.root + "/server-app";
scope.locals.path.localSecurity = scope.locals.path.root + "/local_security";
scope.locals.path.localData = scope.locals.path.root + "/local_data";

var app = require('express')(),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

//--- Use standard body and cookie parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//--- Plug in application routes
require('./server-app/start').setup(app, scope);

// error handlers
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    next();
});


//--- Standard Server Startup
var server = http.createServer(app);
var port = 33460;
server.listen(port, '0.0.0.0');

//--- Show port in console
server.on('listening', onListening(server));
function onListening(server) {
    return function () {
        var address = server.address();
        var bind = (typeof address === 'string') ? 'pipe ' + address : address.address + ':' + address.port;
        console.log('Listening on ' + bind);
    };
}
