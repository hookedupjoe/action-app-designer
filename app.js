/**
 * Action App Designer
 * 
 *   Author: Joseph Francis, 2017-2019
 *   License: MIT
 * 
 *  */


var path = require('path'),
    http = require('http'),
    chalk = require('chalk'),
    fs = require('fs-extra'),
    previewScope = {},
    scope = {};



scope.locals = {
    name: 'action-app-designer',
    title: 'Action App Designer',
    path: {
        root: path.resolve(__dirname)
    }
};
scope.locals.path.start = scope.locals.path.root + "/designer-server";
scope.locals.path.libraries = scope.locals.path.root + "/server-libs";
// scope.locals.path.localSecurity = scope.locals.path.root + "/local_security";

var $ = require(scope.locals.path.libraries + '/globalUtilities.js').$;
var bld = require(scope.locals.path.libraries + '/lib_buildUtils.js');




previewScope.locals = {
    name: 'action-app-preview-server',
    title: 'Action App Preview Server',
    path: {
        root: path.resolve(__dirname)
    }
}
previewScope.locals.path.start = scope.locals.path.root + "/preview-server";
previewScope.locals.path.libraries = scope.locals.path.root + "/server-libs";




var express = require('express'),
app = express(),
preview = express(),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser');

//--- Use standard body and cookie parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });
 

function setup() {

    return new Promise($.async(function (resolve, reject) {
        try {
            var tmpSettingsDir = bld.settingsHome();
            var tmpStaticDir = '/ui-app';
            var tmpWSDirectory = '';
            //--- See if setup, if not, do the setup screen
            if (tmpSettingsDir) {
                
                $.await(fs.ensureDir(tmpSettingsDir));

                var tmpSetup = $.await(bld.getJsonFile(tmpSettingsDir + '/setup.json'));
                if (tmpSetup && tmpSetup.rootDir){
                    tmpWSDirectory = tmpSetup.rootDir
                } else {
                    tmpStaticDir = '/ui-setup';
                }
            }

            //--- Deprecated - remove
            // scope.locals.path.workspace = tmpWSDirectory;

            scope.locals.path.ws = {
                root: tmpWSDirectory,
                deploy: tmpWSDirectory + "deploy/",
                uiApps: tmpWSDirectory + "ui-apps/",
                catalog: tmpWSDirectory + "catalog/",
                pages: tmpWSDirectory + "catalog/pages/",
                serverApps: tmpWSDirectory + "designer-servers/"
            }
            
            app.use(express.static(scope.locals.path.root + '/ui-libs'));
            app.use(express.static(scope.locals.path.root + tmpStaticDir));

            //--- Plug in application routes
            require('./designer-server/start').setup(app, scope);

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
                    console.log(chalk.green('Open designer on port:' + address.port + "."));
                    console.log(chalk.blue('Launch it here'));
                    console.log("http://localhost:" + address.port);
                    console.log("");

                };
            }




            ///===  Preview



            //==========   PREVIEW  ====


            //--- Use standard body and cookie parsers
            preview.use(bodyParser.json());
            preview.use(bodyParser.urlencoded({ extended: false }));
            preview.use(cookieParser());

            preview.use(express.static(scope.locals.path.root + '/ui-libs'));
            preview.use(express.static(tmpWSDirectory + '/ui-apps'));

                        //--- Plug in application routes
            require('./preview-server/start').setup(preview, previewScope);
                        
            // error handlers
            preview.use(function (req, res, next) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            });
            preview.use(function (err, req, res, next) {
                res.status(err.status || 500);
                next();
            });


            //--- Standard Server Startup
            var serverPreview = http.createServer(preview);
            var portPreview = 33461;
            serverPreview.listen(portPreview, '0.0.0.0');

            //--- Show port in console
            serverPreview.on('listening', onListeningPreview(serverPreview));
            function onListeningPreview(serverPreview) {
                return function () {
                    var address = serverPreview.address();

                    var bind = (typeof address === 'string') ? 'pipe ' + address : address.address + ':' + address.port;
                    console.log(chalk.green('Preview sites on port:' + address.port + "."));
                    console.log("");
                };
            }


        }
        catch (error) {
            console.error("Error " + error,error)
            resolve("")
        }

    }));
}



//--- Run setup with async wrapper to allow async stuff
setup();