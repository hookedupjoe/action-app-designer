/*
Common routes index to setup application routes
*/
'use strict';

module.exports.setup = function (app, scope) {

    //--- Add Global Uitilies to commonly passed locals
    scope.locals.$ = require(scope.locals.path.libraries + "/globalUtilities").$;
    scope.locals.$.NoSQL = require(scope.locals.path.libraries + "/lib_NoSQL.js");

    scope.locals.$.BuildUtils = require(scope.locals.path.libraries + "/lib_BuildUtils.js");
    scope.locals.path.designer = scope.locals.path.root + "/.designer"
    scope.locals.path.preview = scope.locals.path.root + "/preview-app"

    var express = require('express');
    
    var appRouter = express.Router(),
        appEntryPoint = require('./app/index').setup(scope);

    app.use(express.static(__dirname + '/../../data'));

    appRouter.all('/*', appEntryPoint);
    app.use('/app/',appRouter);


};
