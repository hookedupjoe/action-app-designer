'use strict';

const THIS_MODULE_NAME = 'couch-test';
const THIS_MODULE_TITLE = 'Test that the NoSQL API works';

module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;
    let NoSQL = $.NoSQL

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

             

                var tmpRet = {
                    query:req.query
                }

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

            var tmpNoSQLAccountInfo = {
                "url": "http://localhost:5984/",
                "key": "yourkey",
                "password": "yourpw"
            };
            var accountDefault = new NoSQL.NoSqlAccount($.cloneObject(tmpNoSQLAccountInfo));
            var tmpDBName = 'mock-data-001'; //dev-catalog
            var tmpViewURI  = '/_design/report-all-mock/_view/docs'; //'/_design/sys_view_doctypes/_view/all'
            
            var tmpDB = accountDefault.getDatabase(tmpDBName);
            var tmpFoundDocs = $.await(tmpDB.getDocumentsByViewKeys(tmpViewURI ));

            res.json({
                nosql:true,
                found:tmpFoundDocs,
                verion:9,
                status: true,
                results: tmpResults
            })
        } catch (ex) {
            res.json({ status: false, error: ex.toString() })
        }
    })
};