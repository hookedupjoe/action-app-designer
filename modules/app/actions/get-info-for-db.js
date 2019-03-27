/*
 *  Get Information About Database
 */
'use strict';

const THIS_MODULE_NAME = 'get-info-for-db';
const THIS_MODULE_TITLE = 'Get Information About Database';

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
    var NoSQL = $.NoSQL;

    var $ = config.locals.$;

    //--- Load the prototype
    base.run = function (req, res, next) {
        var self = this;
        var tmpDBName = req.query.database || '';
        return new Promise($.async(function (resolve, reject) {
            try {
                var tmpDB = $.AppData.accountDefault.getDatabase(tmpDBName);
                var tmpDetails = $.await(tmpDB.getDesignElements());
                var tmpDBInfo = $.await(tmpDB.getDBInfo());
                var tmpRet = {
                    design: tmpDetails,
                    info: tmpDBInfo
                };

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