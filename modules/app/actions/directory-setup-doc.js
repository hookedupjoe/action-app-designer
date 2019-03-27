/*
 *  Send bulk data from CSV to NoSQL Database
 */
'use strict';

const THIS_MODULE_NAME = 'directory-setup-doc';
const THIS_MODULE_TITLE = 'Get Setup Document from local directory';

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
        return new Promise($.async(function (resolve, reject) {
            try {

                var tmpRet = {
                    setup: $.await(getDirectoryDetails())
                }

                resolve(tmpRet);
            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }

        }));



    }



    //--- Helpers ..

    function getDirectoryDetails() {

        return new Promise(function (resolve, reject) {

            try {
                
                var tmpDB = $.AppData.getDefaultDatabase();
                var tmpDocs = $.await(tmpDB.getDocumentsByKeys(["app-setup"]));
                if( tmpDocs && tmpDocs.length == 1){
                    var tmpDoc = tmpDocs[0];
                    delete(tmpDoc._id);
                    delete(tmpDoc._rev);
                }
                resolve(tmpDoc);
            } catch (error) {
                reject(error);
            }
        });
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