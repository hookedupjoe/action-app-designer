var express = require('express');
var app = express();
var chalk = require('chalk');
var path = require('path');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });


app.use(express.static('ui-app'));


var scope = {};
scope.locals = {
    path: {
        root: path.resolve(__dirname)
    }
};
scope.locals.path.start = scope.locals.path.root + "/server-app";
scope.locals.path.libraries = scope.locals.path.root + "/server-libs";

require('./server-app/start').setup(app, scope);

var server = app.listen(process.env.PORT || 33462, function () {
    var host = server.address().address;
    var port = server.address().port;
    if( host == "::"){
        console.log( 'host', host);
        console.log(chalk.magenta('Action App UI on port:' + port + "."));
        console.log(chalk.blue('Launch it here'));
        console.log("http://localhost:" + port);
        console.log("");
    }
});