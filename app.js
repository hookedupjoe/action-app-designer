/**
 * Action App Designer
 * 
 *   Author: Joseph Francis, 2017-2023
 *   License: MIT
 * 
 *  */


var path = require('path'),
    http = require('http'),
    fs = require('fs-extra'),
    previewScope = {},
    scope = {};

var https = require('https');

require('dotenv').config();

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_SECRET;
  

scope.locals = {
    name: 'action-app-designer',
    title: 'Action App Designer',
    path: {
        root: path.resolve(__dirname)
    }
};
scope.locals.path.start = scope.locals.path.root + "/designer-server";
scope.locals.path.libraries = scope.locals.path.root + "/server-libs";

var $ = require(scope.locals.path.libraries + '/globalUtilities.js').$;
$.scope = scope;
var bld = require(scope.locals.path.libraries + '/lib_BuildUtils.js');


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
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    //--- If OPTIONS check, just send back headers
    if( (req.method == 'OPTIONS')){
        res.send('')
    } else {
        next();
    }
 });

 
//  app.all('*', function(req, res, next) {
//     var tmpUserInfo = req.session.passport.user;
//     if( tmpUserInfo ){
//         var tmpSource = tmpUserInfo.provider || 'local';
//         tmpUser.userid = tmpSource + '-' + tmpUserInfo.id;
//         tmpUser.displayName = tmpUserInfo.displayName || '';
//         console.log('login tmpUser',tmpUser);
//     }
//     next();
//  });

//===================










const MongoStore = require('connect-mongo');

//--- Passport Auth ------------------
var tmpIsPassport = (process.env.AUTH_TYPE == 'passport');

var passport = require('passport');
$.passport = passport;

passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
  

app.use(session({
    resave: false,
    saveUninitialized: true,
    maxAge: new Date(Date.now() + 3600000),
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_STARTUP_URL,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        dbName: 'actappauth-sessions',
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
      }),
    secret: process.env.SESSION_SECRET || 'sdflksjflksdjflksdjfieieieiei'
  }));

  if( tmpIsPassport ){
    app.use(passport.initialize());
    app.use(passport.session());
  }

  var tmpBaseCallback = 'http://localhost:33460/';
  if( process.env.PASSPORT_BASE_CALLBACK ){
    tmpBaseCallback = process.env.PASSPORT_BASE_CALLBACK;
  }
  //-- when home page loaded, see if auth
  app.all('/', function(req, res, next) {
   
    try {
        var tmpUser = {};
        if( tmpIsPassport ){

            app.use(passport.initialize());
            app.use(passport.session());
            
            app.get('/auth/google/callback',
            passport.authenticate('google', { failureRedirect: '/error' }),
            function (req, res) {
                // Successful authentication, redirect success.
                res.redirect('/');
            });

                
                app.get('/auth/github/callback',
                passport.authenticate('github', { failureRedirect: '/error' }),
                function (req, res) {
                // Successful authentication, redirect success.
                res.redirect('/');
                });

                app.get('/auth/google',
                passport.authenticate('google', { scope: ['profile', 'email'] }));

                app.get('/auth/github',
                passport.authenticate('github', { scope: ['profile', 'email'] }));

    
        passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: tmpBaseCallback + "auth/google/callback"
        },
            function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
            }
        ));
        
        passport.use(new GitHubStrategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: tmpBaseCallback + "auth/github/callback"
        },
            function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
            }
        ));


            if( req.session && req.session.passport && req.session.passport.user ){
                var tmpUserInfo = req.session.passport.user;
                var tmpSource = tmpUserInfo.provider || 'local';
                tmpUser.userid = tmpSource + '-' + tmpUserInfo.id;
                tmpUser.displayName = tmpUserInfo.displayName || '';
                console.log('login tmpUser',tmpUser);
            } else {
                res.redirect('/login.html');
            }
        }
    } catch (error) {
        console.log("Error in oath check", error);
    }
   
    next();
 });

























//=============



app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });

 try {
    //--- ToDo: Make this optional.
    const chokidar = require('chokidar');
    var tmpWatchDir = scope.locals.path.root + "/designer-server"
    //--> Watch All (CLOSE BEFORE COMMIT!)-->      var tmpWatchDir = scope.locals.path.root;

    chokidar.watch(tmpWatchDir, {ignored: /index\.js$/})
        .on('change', (path) => {
            try {
                if (require.cache[path]) delete require.cache[path];
                console.log('New file loaded for ' + path);
            } catch (theChangeError) {
                console.log("Could not hot update: " + path);
                console.log("The reason: " + theChangeError);
            }
        });

    } catch (ex){
        console.log('Not hot reading, chokidar not installed on dev side')  
    }

function setup() {

    return new Promise( async function (resolve, reject) {
        try {
            var tmpSettingsDir = bld.settingsHome();
            var tmpWSDirectory = '';
            //--- See if setup, if not, do the setup screen
            if (tmpSettingsDir) {
                await fs.ensureDir(tmpSettingsDir);

                var tmpSetup = await bld.getJsonFile(tmpSettingsDir + '/setup.json');
                

                if (tmpSetup && tmpSetup.rootDir){
                    tmpWSDirectory = tmpSetup.rootDir
                } else {
                    //--- Build Initial Confiruration and Directories
                    var tmpRootDir = ($.os.homedir() + '/actapp/');
                    tmpRootDir = tmpRootDir.replace('[home]', $.os.homedir());

                    if( !(tmpRootDir.endsWith('/'))){
                        tmpRootDir += '/';
                    }
                    var tmpSetupDetails = {
                        rootDir: tmpRootDir
                    }
                    
                    tmpWSDirectory = tmpRootDir;

                    const tmpSettingsDir = bld.settingsHome();
                    await $.fs.ensureDir(tmpSettingsDir);
                    await bld.saveJsonFile(tmpSettingsDir + 'setup.json', tmpSetupDetails);
                
                    await $.fs.ensureDir(tmpSetupDetails.rootDir);
                    await $.fs.ensureDir(tmpSetupDetails.rootDir + 'ui-apps/');
                    await $.fs.ensureDir(tmpSetupDetails.rootDir + 'deploy/');
                }
            }

            
            scope.locals.path.ws = {
                root: tmpWSDirectory,
                deploy: tmpWSDirectory + "deploy/",
                uiApps: tmpWSDirectory + "ui-apps/",
                catalogs: tmpWSDirectory + "catalogs/",
                catalog: tmpWSDirectory + "catalog/",
                pages: tmpWSDirectory + "catalog/pages/",
                serverApps: tmpWSDirectory + "designer-servers/"
            }

            app.use(express.static(scope.locals.path.root + '/ui-libs'));
            app.use(express.static(scope.locals.path.root + '/common'));
            app.use(express.static(tmpWSDirectory));
            app.use(express.static(scope.locals.path.root + '/ui-app'));

            //--- Server Apps from same port ?
            app.use(express.static(tmpWSDirectory + '/ui-apps'));
            //--- Deployed Apps from same port using /ui-app ?
            app.use(express.static(scope.locals.path.ws.deploy));

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
            //var server = http.createServer(app);
            var port = 33460;

            //--- TEMPORARY
            //--- Seeing if it works at all with hard coded key names in certain spot
            var tmpUseSSL = false; 

            if (fs.existsSync(tmpWSDirectory + '/ssl/server.key')) {
                tmpUseSSL = true;
            }

            var server;

            if( tmpUseSSL ){

                // file location of private key
                var privateKey = fs.readFileSync( tmpWSDirectory + '/ssl/server.key' );
                // file location of SSL cert
                var certificate = fs.readFileSync( tmpWSDirectory + '/ssl/server.crt' );

                // set up a config object
                var server_config = {
                    key : privateKey,
                    cert: certificate
                };

                // create the HTTPS server on port 443
                var server = https.createServer(server_config, app);

            } else {
                var server = http.createServer(app);
            }
        server.listen(port, '0.0.0.0');

            //--- Show port in console
            server.on('listening', onListening(server));
            function onListening(server) {
                return function () {
                    var address = server.address();
                    var bind = (typeof address === 'string') ? 'pipe ' + address : address.address + ':' + address.port;
                    console.log(('Open designer on port:' + address.port + "."));
                    console.log(('Launch it here'));
                    if( tmpUseSSL ){
                        console.log("https://localhost:" + address.port);
                    } else {
                        console.log("http://localhost:" + address.port);
                    }
                    console.log("");

                };
            }


            //==========   PREVIEW  ====
            //--- Allow the designer server to access app files during design process
            preview.use(function(req, res, next) {
                //res.header("Access-Control-Allow-Origin", "http://localhost:33460");
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });

            //--- Use standard body and cookie parsers
            preview.use(bodyParser.json());
            preview.use(bodyParser.urlencoded({ extended: false }));
            preview.use(cookieParser());

            preview.use(express.static(scope.locals.path.root + '/ui-libs'));
            preview.use(express.static(scope.locals.path.root + '/common'));
            //preview.use(express.static(tmpWSDirectory + '/ui-apps'));
            //console.log('scope.locals.path.ws.deploy',scope.locals.path.ws.deploy);
            preview.use(express.static(scope.locals.path.ws.deploy));
            //preview.use(express.static(tmpWSDirectory));

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
            if( tmpUseSSL ){
                var serverPreview = https.createServer(server_config, preview);
            } else {
                var serverPreview = http.createServer(preview);
            }

            var portPreview = process.env.PREVIEWPORT || 33461;
            serverPreview.listen(portPreview, '0.0.0.0');

            //--- Show port in console
            serverPreview.on('listening', onListeningPreview(serverPreview));
            function onListeningPreview(serverPreview) {
                return function () {
                    var address = serverPreview.address();
                    console.log(('Preview sites on port:' + address.port + "."));
                };
            }


        }
        catch (error) {
            console.error("Error " + error,error)
            resolve("")
        }

    });
}



//--- Run setup with async wrapper to allow async stuff
setup();