/*
Entry point for Designer
*/
'use strict';

module.exports.setup = function setup(scope) {

    let $ = scope.locals.$;
    scope.locals.path.api = scope.locals.path.start + "/svr"
    
    return $.async(function processReq(req, res, next) {
        
        var tmpType = req.params.type || ''
        var tmpName = req.params.name || ''
        var tmpRet = {}
        
        tmpRet.type = tmpType;
        tmpRet.name = tmpName;

        try {

            var tmpAppAreaName = req.path || '';
            if (tmpAppAreaName.charAt(0) == '/') {
                tmpAppAreaName = tmpAppAreaName.substr(1);
            }

            tmpAppAreaName = scope.locals.path.start + '/svr/' + tmpAppAreaName + '.js';
            var tmpAppReq = require(tmpAppAreaName);

            if (typeof(tmpAppReq.setup) == 'function') {
                var tmpToRun = tmpAppReq.setup(scope);
                tmpToRun(req, res, next);
                return
            } else {
                res.json({status:false, error: "Could not find application area " + tmpAppAreaName})
                return
            }
        
        } catch (ex) {
            res.json({status:false, error: ex.toString()})
        }
    });

};
