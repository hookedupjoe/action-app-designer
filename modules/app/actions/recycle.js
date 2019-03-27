/*
 *  Recycle the keys passed with new doc type
 */
'use strict';

const THIS_MODULE_NAME = 'recycle';
const THIS_MODULE_TITLE = 'Recycle documents';

module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;
    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }
    var base = Route.prototype;
    //==== End of common setup - add special stuff below
    //--- must have a "run" method *** 
    var $ = config.locals.$;
   
    //--- Load the prototype
    base.run = function (req, res, next) {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {

                var tmpKeys = req.query.keys || req.query.key || '';
                if( !(tmpKeys) ){
                    throw ("No keys passed")
                }
                tmpKeys = tmpKeys.split(",");

                var tmpUndo = false;
                if( req.query.undo == 'true' ){
                    tmpUndo = true;
                }

                var tmpRet = {
                    keys:tmpKeys
                }
                var dbTarget = $.AppUtils.getDefaultDatabase();
                
                var tmpCopyToFrom = {
                    "sys_RecycledDocType": "sys_DocType"
                }                
                
                var tmpUpdates = {
                    sys_RecycledOn: $.getNowTimestamp(),
                    sys_DocType : "_recycled"
                }

                tmpRet.bulkUpdates = dbTarget.mergeUpdates({keys:tmpKeys, updates: tmpUpdates, copy: tmpCopyToFrom })
                resolve(tmpRet);
            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }

        }));



    }







    //====== IMPORTANT --- --- --- --- --- --- --- --- --- --- 
    //====== End of Module / setup ==== Nothing new below this
    return $.async(function processReq(req, res, next) {
        try {
            var tmpRoute = new Route();
            var tmpResults = $.await(tmpRoute.run(req, res, next));
            res.json({
                status: true,
                results: tmpResults
            })
        } catch (ex) {
            res.json({ status: false, error: ex.toString() })
        }
    })
};