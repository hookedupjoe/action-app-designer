/**
 * Action App Designer
 * 
 *   Author: Joseph Francis, 2017-2023
 *   License: LGPL
 * 
 *  */


var path = require('path'),
    http = require('http'),
    fs = require('fs-extra'),
    previewScope = {},
    scope = {};

var https = require('https');
const jwt = require('jsonwebtoken');
//const passportJWT = require("passport-jwt");
// const ExtractJWT = passportJWT.ExtractJwt;
// const JWTStrategy   = passportJWT.Strategy;
const ejs = require('ejs');

require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local').Strategy

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


var isUsingData = false;
var startupDataString = '';
var mongoSystemAccount = false;
var homeAccountConfig = {};

const ACTAPP_DB_HOME_ACCOUNT_ADDRESS = process.env.ACTAPP_DB_HOME_ACCOUNT_ADDRESS;
if( ACTAPP_DB_HOME_ACCOUNT_ADDRESS ){
    const ACTAPP_DB_HOME_ACCOUNT_PORT=process.env.ACTAPP_DB_HOME_ACCOUNT_PORT;
    const ACTAPP_DB_HOME_ACCOUNT_USERNAME=process.env.ACTAPP_DB_HOME_ACCOUNT_USERNAME;
    const ACTAPP_DB_HOME_ACCOUNT_PASSWORD=process.env.ACTAPP_DB_HOME_ACCOUNT_PASSWORD;
    var tmpAcct = '';
    homeAccountConfig.id = "_system";
    homeAccountConfig.address = ACTAPP_DB_HOME_ACCOUNT_ADDRESS;
    homeAccountConfig.port = ACTAPP_DB_HOME_ACCOUNT_PORT
    
    if( ACTAPP_DB_HOME_ACCOUNT_USERNAME ){
        tmpAcct = ACTAPP_DB_HOME_ACCOUNT_USERNAME;
        homeAccountConfig.username = ACTAPP_DB_HOME_ACCOUNT_USERNAME;
        if( ACTAPP_DB_HOME_ACCOUNT_PASSWORD ){
            tmpAcct += ':' + ACTAPP_DB_HOME_ACCOUNT_PASSWORD;
            homeAccountConfig.password = ACTAPP_DB_HOME_ACCOUNT_PASSWORD
        }
    }
    startupDataString = 'mongodb://' + tmpAcct + '@' + ACTAPP_DB_HOME_ACCOUNT_ADDRESS + ':' + ACTAPP_DB_HOME_ACCOUNT_PORT + '/?retryWrites=true&w=majority';
    isUsingData = true;
}

const bcrypt = require("bcrypt")
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

//--- Passport Auth ------------------
var isUsingPassport = (process.env.AUTH_TYPE == 'passport');
$.isUsingPassport = isUsingPassport;

const MongoStore = require('connect-mongo');
var passport = require('passport');
$.passport = passport;

if( isUsingPassport ){
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

//---ToDo: Use ACTAPP_DB_HOME_ACCOUNT to spin up default connection db for application data
//         Keep accounts for access to more than one.
//---ToDo: move to mongo for accounts?
app.use(session({
    resave: false,
    saveUninitialized: true,
    maxAge: new Date(Date.now() + 3600000),
    store: MongoStore.create({
        mongoUrl: startupDataString,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        dbName: 'actappauth-sessions',
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
      }),
    secret: process.env.SESSION_SECRET || 'sdflksjflksdjflksdjfieieieiei'
  }));

    
    async function authUser(theUsername, thePassword, done){
        var tmpAccount = await $.MongoManager.getAccount('_system');
        var tmpDB = await tmpAccount.getDatabase('actappauth');
        var tmpDocType = 'user';
        var tmpMongoDB = tmpDB.getMongoDB();        
        var tmpDocs = await tmpMongoDB.collection('actapp-' + tmpDocType)
            .find({username:theUsername})
            .filter({username:theUsername, __doctype:tmpDocType})
            .toArray();

        if( tmpDocs && tmpDocs.length == 1){
            var tmpUserDoc = tmpDocs[0];
            if( tmpUserDoc.username != theUsername ){
                return done (null, false );
            }
            var tmpIsGood = await bcrypt.compare(thePassword, tmpUserDoc.password);
            if( !(tmpIsGood) ){
                return done (null, false );
            }
            var tmpRetDoc = {id: tmpUserDoc.username, displayName: tmpUserDoc.firstname + ' ' + tmpUserDoc.lastname};
            return done (null, tmpRetDoc ) 
        } else {
            return done (null, false ) 
        }
    }

    
    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/github',
    passport.authenticate('github', { scope: ['profile', 'email'] }));
    
    app.post ("/login", passport.authenticate('local', {
    successRedirect: "/authcomplete",
    failureRedirect: "/login.html",
    }))

/* JWT login. */
app.post('/login/jwt', function (req, res, next) {

    passport.authenticate('local', {scope: ['profile', 'email'] , session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user, process.env.JWT_SECRET);

            return res.json({user, token});
        });
    })
    (req, res);

});

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy (authUser))

    
function processAuth(req, res, next) {
    if( req.session && req.session.passport && req.session.passport.user ){
        var tmpUser = req.session.passport.user;
        var tmpUserKey = tmpUser.provider + "-" + tmpUser.id;
        req.authUser = {
            id: tmpUserKey,
            displayName: tmpUser.displayName
        }
        next()
    } else {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
      
        if (token == null){
            req.authUser = false;
            next()
        } else {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err){
                    req.authUser = false;
                } else {
                    var tmpCurr = {
                        id: user.id,
                        displayName: user.displayName
                    }
                    req.authUser = tmpCurr;
                }
                next()
                })
        }
    }
    
  
    
  }
  app.use(processAuth)

  
}

  var tmpBaseCallback = 'http://localhost:33460/';
  if( process.env.PASSPORT_BASE_CALLBACK ){
    tmpBaseCallback = process.env.PASSPORT_BASE_CALLBACK;
  }

  
//   //-- when home page loaded, see if auth
//   app.all('/', function(req, res, next) {
    
//     try {
//         var tmpUser = {};
//         if( isUsingPassport ){
//             if( req.session && req.session.passport && req.session.passport.user ){
//                 var tmpUserInfo = req.session.passport.user;
//                 var tmpSource = tmpUserInfo.provider || 'local';
//                 tmpUser.userid = tmpSource + '-' + tmpUserInfo.id;
//                 tmpUser.displayName = tmpUserInfo.displayName || '';
//                 console.log('login tmpUser',tmpUser);
//             } else {
//                 res.redirect('/login.html');
//             }
//         }
//     } catch (error) {
//         console.log("Error in oath check", error);
//     }
   
//     next();
//  });

  //-- stop pages from loading with index.html -vs- main entry point
  app.all(/index.html/, function(req, res, next) {
    
    try {
        var tmpCheckPos = req.url.toLowerCase().indexOf('index.html');
        if( tmpCheckPos > -1){
            var tmpURL = req.url.substring(0,tmpCheckPos);
            res.redirect(tmpURL);
        }
    } catch (error) {
        //--- OK?
        console.log('Error attempting to check for index',error);
    }
   
    next();
 });


 //-- When any directory is loaded (home page or app)
 app.all(/\/$/, function(req, res, next) {
    try {
        var tmpUser = {};
        if( isUsingPassport ){
            if( req.session && req.session.passport && req.session.passport.user ){
                var tmpUserInfo = req.session.passport.user;
                var tmpSource = tmpUserInfo.provider || 'local';
                tmpUser.userid = tmpSource + '-' + tmpUserInfo.id;
                tmpUser.displayName = tmpUserInfo.displayName || '';
            } else {
                var tmpLoginURL = '/pagelogin?type=page';
                tmpLoginURL += '&page=' + req.url;
                res.redirect(tmpLoginURL);
            }
        }
    } catch (error) {
        console.log("Error in oath check", error);
    }
   
    next();
 });

 app.get('/pagelogin', function (req, res, next) {
    
    // Render page using renderFile method
    ejs.renderFile('views/pagelogin.ejs', {},
    {}, function (err, template) {
        if (err) {
            throw err;
        } else {
            res.end(template);
        }
    });
});

app.get('/authcomplete', function (req, res, next) {
    
    // Render page using renderFile method
    ejs.renderFile('views/authcomplete.ejs', {},
    {}, function (err, template) {
        if (err) {
            throw err;
        } else {
            res.end(template);
        }
    });
});

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

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

function setup(thePassportFlag) {

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

            if( homeAccountConfig ){
                require(scope.locals.path.libraries + '/lib_Mongo.js');
                $.MongoManager.setAccountConfig('_system', homeAccountConfig);
            }

            await $.appIndexRefresh();

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


             if( thePassportFlag ){
                                

                //--- ToDo: Should we be doing this instead of doing this via middleware?
            //     passport.use(new JWTStrategy({
            //         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            //         secretOrKey   : process.env.JWT_SECRET
            //     },
            //     function (jwtPayload, cb) {
            //         //find the user in db if needed
            //         return UserModel.findOneById(jwtPayload.id)
            //             .then(user => {
            //                 return cb(null, user);
            //             })
            //             .catch(err => {
            //                 return cb(err);
            //             });
            //     }
            //     ));

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
                            
                app.get('/auth/google/callback',
                    passport.authenticate('google', { failureRedirect: '/error' }),
                    function (req, res) {
                        // Successful authentication, redirect success.
                        res.redirect('/authcomplete');
                    }
                );
                
                app.get('/auth/github/callback',
                    passport.authenticate('github', { failureRedirect: '/error' }),
                    function (req, res) {
                    // Successful authentication, redirect success.
                    res.redirect('/authcomplete');
                    }
                );

            }

  
            //--- Standard Server Startup
            var port = 33460;

            //--- ToDo: Allow dynamic location of SSL keys
            var tmpUseSSL = false; 

            if (fs.existsSync(tmpWSDirectory + '/ssl/server.key')) {
                tmpUseSSL = true;
            }

            var server;
            if( tmpUseSSL ){
                var privateKey = fs.readFileSync( tmpWSDirectory + '/ssl/server.key' );
                var certificate = fs.readFileSync( tmpWSDirectory + '/ssl/server.crt' );
                var server_config = {
                    key : privateKey,
                    cert: certificate
                };
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


            //==========   PREVIEW DEPLOYMENT ====
            //--- Allow the designer server to access deployed app files directly from designer
            preview.use(function(req, res, next) {
                //--- ToDo: Do we need remote access TO preview server?
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
                    //ToDo: Review need for this port?
                    //      Now used to preview deployment using /ui-app/ in the URL
                    //console.log(('Preview sites on port:' + address.port + "."));
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
setup(isUsingPassport);
