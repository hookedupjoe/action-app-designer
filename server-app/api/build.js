/*
 *  Simple method for running individually created actions from a directory
 */
'use strict';

module.exports.setup = function setup(scope) {
    return function processReq(req, res, next) {
        var tmpName = req.query.action || req.query.name || '';
        
        if (!tmpName) {
            throw "No build action name provided";
        }        
        try {
            var tmpFilePath = './build/' + tmpName + '.js';
            var tmpProcessReq = require(tmpFilePath);
            if (typeof(tmpProcessReq.setup) == 'function') {
                var tmpToRun = tmpProcessReq.setup(scope);
                tmpToRun(req, res, next);
                return
            } else {
                res.json({status:false, error: "Could not find build action " + tmpName})
                return
            }
        } catch (ex) {
            res.json({status:false, error: ex.toString()})
        }
    };
};
