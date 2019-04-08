/*
 *  
 */
'use strict';

const THIS_MODULE_NAME = 'db-setup-update';
const THIS_MODULE_TITLE = 'Used to update setup details in the designer client';

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

                var tmpBody = req.body || {};

                if (typeof (tmpBody) == 'string') {
                    try {
                        tmpBody = JSON.parse(tmpDtmpBodyta)
                    } catch (ex) {
                        throw("Bad JSON Passed")
                    }
                }
                var tmpRet = {}
                //-- If addAccount - get setup doc, add/update process and save
                if (!(tmpBody.process)) {
                    throw ("No process provided")
                }
                var tmpDirectoryDB = $.AppData.getDefaultDatabase();
                var tmpSetupDoc = $.await(getSetupDoc());
                if (!(tmpSetupDoc && tmpSetupDoc.dataMap)) {
                    throw("Setup document not present or containing dataMap object")
                }

                if (tmpBody.process == 'accountPut') {
                    tmpSetupDoc.dataMap.accounts = tmpSetupDoc.dataMap.accounts || {};
                    var tmpDoc = tmpBody.data;
                    var tmpName = tmpDoc.name || '';
                    if (tmpName) {
                        delete (tmpDoc.name);
                        tmpSetupDoc.dataMap.accounts[tmpName] = tmpDoc;
                        tmpRet.sendResults = $.await(tmpDirectoryDB.sendBulkUpdate([tmpSetupDoc]))
                    } else {
                        throw('Name not found in account, can not save')
                    }
                   
                } else if (tmpBody.process == 'accountRemove') {
                    var tmpName = tmpBody.name || '';
                    if (tmpName && tmpSetupDoc.dataMap.accounts[tmpName]) {
                        delete (tmpSetupDoc.dataMap.accounts[tmpName])
                        tmpRet.sendResults = $.await(tmpDirectoryDB.sendBulkUpdate([tmpSetupDoc]))
                    } else {
                        throw ('name not found in accounts, can not remove, name: ' + tmpName)
                    }
                } else if (tmpBody.process == 'dbMapPut') {
                    var tmpDoc = tmpBody.data;
                    var tmpName = tmpDoc.name || '';
                    var tmpDBName = tmpDoc.dbname || '';
                    tmpSetupDoc.dataMap.databases[tmpName] = tmpDBName;
                    tmpRet.sendResults = $.await(tmpDirectoryDB.sendBulkUpdate([tmpSetupDoc]))
                } else if (tmpBody.process == 'dbMapRemove') {
                    var tmpDoc = tmpBody.data;
                    var tmpName = tmpDoc.name || '';
                    if (tmpName && tmpSetupDoc.dataMap.databases[tmpName]) {
                        delete (tmpSetupDoc.dataMap.databases[tmpName])
                        tmpRet.sendResults = $.await(tmpDirectoryDB.sendBulkUpdate([tmpSetupDoc]))
                    } else {
                        throw ('name not found in accounts, can not remove, name: ' + tmpName)
                    }
                }
                //-- ToDo: Check bulk update and assure update was a success
                //     *** build into the base for all calls, check everytime

                //-- Repull setup doc to assure the latest
                tmpSetupDoc = $.await(getSetupDoc());
                delete(tmpSetupDoc._id);
                delete(tmpSetupDoc._rev);
                tmpRet.setupDoc = tmpSetupDoc;

                $.AppUtils.refreshAppSetup().then(function(){
                    resolve(tmpRet);    
                });
                

            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }
        }));

        function getSetupDoc() {
            return new Promise(function (resolve, reject) {
                var tmpDirectoryDB = $.AppData.getDefaultDatabase();
                var tmpSetupDoc = false;
                var tmpSetupDocs = $.await(tmpDirectoryDB.getDocumentsByKeys(['app-setup']));
        
                if (tmpSetupDocs && tmpSetupDocs.length == 1) {
                    resolve(tmpSetupDocs[0]);
                } else {
                    reject("No setup document found")
                }
            })
        }
        
    }




    function getDocsFromParsedData(theData, theOptionalMergeData) {
        var tmpFieldNames = theData[0];
        var tmpFieldCount = theData.length;
        var tmpDocs = [];
        for (let index = 1; index < theData.length; index++) {
            var tmpCells = theData[index];
            var tmpNewDoc = {};
            if (tmpCells.length = tmpFieldCount) {
                for (var i = 0; i < tmpFieldCount; i++) {
                    var tmpVal = tmpCells[i];
                    var tmpFN = tmpFieldNames[i];
                    tmpNewDoc[tmpFN] = tmpVal;
                }
                if (theOptionalMergeData) {
                    tmpNewDoc = $.merge(tmpNewDoc, theOptionalMergeData)
                }
                tmpDocs.push(tmpNewDoc);
            } else {
                console.error("Invalid data", tmpCells, "at " + index)
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