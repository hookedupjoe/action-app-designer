/*
 *  Add a test record to a NoSQL Database
 */
'use strict';

const THIS_MODULE_NAME = 'test-add';
const THIS_MODULE_TITLE = 'Test adding a doc to a db';

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

                var tmpRet = {
                    keys:tmpKeys,
                    data: [
                        { id: "1", title: "Test 1" },
                        { id: "2", title: "Test 2" }
                    ],
                    "sys_DateCreated": $.getNowTimestamp(),
                    "sys_DocType": "dummy-record"
                }

                var tmpDB = $.AppUtils.getDefaultDatabase();
                tmpDB.addDocument(tmpRet)

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