/*
Common routes index to setup application routes
*/
'use strict';

module.exports.setup = function (app, scope) {

    //--- Add Global Uitilies to commonly passed locals
    scope.locals.$ = require(scope.locals.path.libraries + "/globalUtilities").$;
    scope.locals.$.NoSQL = require(scope.locals.path.libraries + "/lib_NoSQL.js");

    var express = require('express');
    
    var svrRouter = express.Router(),
    svrRoute = require('./svr/index').setup(scope);

    svrRouter.all('/*', svrRoute);
    app.use('/svr/',svrRouter);

    var dataRouter = express.Router(),
    dataRoute = require('./appdata/index').setup(scope);
    dataRouter.all('/:type/:name*', dataRoute);
    dataRouter.all('/*', dataRoute);
    app.use('/appdata/',dataRouter);


};
