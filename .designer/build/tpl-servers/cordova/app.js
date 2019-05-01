var express = require('express');
var app = express();

app.use(express.static('CordovaApp/www'));

//--- When running node.js, Cordova is not in play.
//-    we can plug in mock and even Node.js functionality
app.get('/cordova.js', function (req, res) {
    res.send('window._cordovaTestMode = true;')
})

var server = app.listen(process.env.PORT ||7073, function () {
    var host = server.address().address ;
    var port = server.address().port;
    console.log("Simply web server running on http://%s:%s", host, port)
});