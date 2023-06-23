/*
Common routes index to setup application routes
*/
'use strict';

module.exports.setup = function (app, scope) {

    //--- Add Global Uitilies to commonly passed locals
    scope.locals.$ = require(scope.locals.path.libraries + "/globalUtilities").$;
    scope.locals.$.NoSQL = require(scope.locals.path.libraries + "/lib_NoSQL.js");

    scope.locals.$.bld = require(scope.locals.path.libraries + "/lib_BuildUtils.js");
    scope.locals.path.designer = scope.locals.path.root + "/.designer"
    scope.locals.path.preview = scope.locals.path.root + "/local_preview"
    scope.locals.path.uilibs = scope.locals.path.root + "/ui-libs"
    
    var express = require('express');
    
    var designRouter = express.Router(),
    designRoute = require('./design/index').setup(scope);
    designRouter.all('/:type/:name*', designRoute);
    designRouter.all('/*', designRoute);
    app.use('/design/',designRouter);

    var dataRouter = express.Router(),
    dataRoute = require('./appdata/index').setup(scope);
    dataRouter.all('/:type/:name*', dataRoute);
    dataRouter.all('/*', designRoute);
    app.use('/appdata/',dataRouter);


};
