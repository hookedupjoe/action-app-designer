/*
Entry point for JSON Template Content
*/
'use strict';

module.exports.setup = function setup(scope) {

    let $ = scope.locals.$;
    //--- Setup app data access entry point using application data scope
    var tmpAppDataConfig = require(scope.locals.path.localSecurity + "/couch-config.js");
    scope.locals.$.AppData = require(scope.locals.path.start + "/lib_AppData.js").setup(scope, tmpAppDataConfig);
    scope.locals.$.AppUtils = require(scope.locals.path.start + "/app/_common/AppUtils.js").setup(scope);

    scope.locals.path.scat = scope.locals.path.start + "/scat"

    return $.async(function processReq(req, res, next) {
        
        var tmpType = req.params.type || ''
        var tmpName = req.params.name || ''
        var tmpRet = {}
        
        tmpRet.type = tmpType;
        tmpRet.name = tmpName;
        tmpName = tmpName
            .replace('.json', '')
            .replace('/control.js', '')
            .replace('.js', '');

        try {

            
        var tmpFilePath = scope.locals.path.scat + '/' + tmpType + '/' + tmpName + '.js';
        var tmpProcessReq = require(tmpFilePath);
        if (typeof(tmpProcessReq.setup) == 'function') {
            var tmpToRun = tmpProcessReq.setup(scope);
            tmpToRun(req, res, next);
            return
        } else {
            res.json({status:false, error: "Could not find action " + tmpName})
            return
        }

        
        } catch (ex) {
            res.json({status:false, error: ex.toString()})
        }
    });

};
