/*
Entry point for Application Data
*/
'use strict';

module.exports.setup = function setup(scope) {

    let $ = scope.locals.$;
    scope.locals.path.appdata = scope.locals.path.start + "/appdata"
    
    return  async function processReq(req, res, next) {
        if( req.authUser ){
            //--- validate access?
            console.log('authUser',req.authUser);
        } else {
            console.log('anonymous');
            if( $.isUsingPassport ){
                return res.sendStatus(401)
            }
        }


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

            
        var tmpFilePath = scope.locals.path.appdata + '/' + tmpType + '/' + tmpName + '.js';
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
    };


};
