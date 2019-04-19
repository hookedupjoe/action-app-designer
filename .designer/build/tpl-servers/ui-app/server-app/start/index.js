/*
Common routes index to setup application routes
*/
'use strict';

module.exports.setup = function (app, scope) {

    //--- Add Global Uitilies to commonly passed locals
    scope.locals.$ = require(scope.locals.path.libraries + "/globalUtilities").$;
    scope.locals.$.file = require(scope.locals.path.libraries + "/lib_FileUtils");
    scope.locals.$.appUtils = require(scope.locals.path.start + "/libs/lib_AppUtils")(scope);

    var express = require('express');
    
    var svrRouter = express.Router(),
    svrRoute = require('./svr/index').setup(scope);

    svrRouter.all('/*', svrRoute);
    app.use('/svr/',svrRouter);


};
