/*
 *  Send bulk data from CSV to NoSQL Database
 */
'use strict';

const THIS_MODULE_NAME = 'update-docs';
const THIS_MODULE_TITLE = 'Update Documents';

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
                var tmpData = req.body || {};

                if (typeof (tmpData) == 'string') {
                    try {
                        tmpData = JSON.parse(tmpData)
                    } catch (ex) {
                        //ToDo: Handle bad data
                    }

                }
                //var tmpKeys = req.query.keys || req.query.key || '';
                var tmpRet = {
                    testing: true
                }

                var tmpDocs = tmpData.docs || tmpData.data || false;
                if( !(tmpDocs && tmpDocs.length > 0)){                   
                    resolve({status:true, results: 'Nothing to add'});
                    return;
                }

                var tmpDB = $.AppUtils.getDefaultDatabase();
                var tmpResults = $.await(tmpDB.sendBulkUpdate(tmpDocs));
                tmpRet.results = tmpResults;

                resolve(tmpRet);
            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }

        }));



    }




    function getDocsFromParsedData(theData, theOptionalMergeData){
        var tmpFieldNames = theData[0];
        var tmpFieldCount = theData.length;
        var tmpDocs = [];
        for (var index = 1; index < theData.length; index++) {
            var tmpCells = theData[index];
            var tmpNewDoc = {};
            if( tmpCells.length = tmpFieldCount ){
                for( var i = 0 ; i < tmpFieldCount ; i++){
                    var tmpVal = tmpCells[i];
                    var tmpFN = tmpFieldNames[i];
                    tmpNewDoc[tmpFN] = tmpVal;
                }
                if( theOptionalMergeData ){
                    tmpNewDoc = $.merge(tmpNewDoc,theOptionalMergeData)
                }
                tmpDocs.push(tmpNewDoc);
            } else {
                console.error("Invalid data",tmpCells,"at " + index)
            }
            
            
        }

        return tmpDocs;
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