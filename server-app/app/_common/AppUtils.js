/*
  Common utilities for this application only, not all applications
*/
'use strict';

module.exports.setup = function setup(scope) {
    var config = scope;
    
    let $ = config.locals.$;
    let NoSQL = $.NoSQL
    let AppData = $.AppData

    let appSetup = false;
    
    var dataMap = false;
    var defaultAccountName = '';
    var accountDefault = false;
    var defaultDatabaseName = '';
    
    var defaultCatalogDesignElements = [{
        "_id": "_design/sys_view_db-templates",
        "views": {
            "all": {
                "map": "var tmpBaseFields = [\"name\",\"title\"];\nvar tmpDocType = 'db-template'\nfunction (doc) {\n  var tmpDoc = {};\n \n  if( doc.sys_DocType && doc.sys_DocType === tmpDocType ){\n    for( var i = 0 ; i < tmpBaseFields.length ; i++){\n      var tmpFN = tmpBaseFields[i];\n      var tmpVal = doc[tmpFN];\n      if( typeof(tmpVal) === 'undefined' || tmpVal === null){\n        tmpVal = '';\n      }\n      tmpDoc[tmpFN] = tmpVal;\n    }\n    \n    emit(doc._id, tmpDoc);  \n  }\n}"
            },
            "recycled": {
                "map": "var tmpBaseFields = [\"name\",\"title\"];\nvar tmpDocType = 'db-template'\n\nfunction (doc) {\n  var tmpDoc = {};\n \n  if( doc.sys_DocType && doc.sys_DocType === '_recycled' && doc.sys_RecycledDocType && doc.sys_RecycledDocType === tmpDocType ){\n    for( var i = 0 ; i < tmpBaseFields.length ; i++){\n      var tmpFN = tmpBaseFields[i];\n      var tmpVal = doc[tmpFN];\n      if( typeof(tmpVal) === 'undefined' || tmpVal === null){\n        tmpVal = '';\n      }\n      tmpDoc[tmpFN] = tmpVal;\n    }\n    emit(doc._id, tmpDoc);  \n  }\n}"
            }
        },
        "language": "javascript"
    },
    {
        "_id": "_design/sys_view_mock-data",
        "views": {
            "all": {
                "map": "var tmpBaseFields = [\"first_name\",\"last_name\",\"email\",\"application\",\"ip_address\",\"animal\", \"sys_DocCreated\"];\n\nfunction (doc) {\n  var tmpDoc = {};\n \n  if( doc.sys_DocType && doc.sys_DocType === 'mock-data' ){\n    for( var i = 0 ; i < tmpBaseFields.length ; i++){\n      var tmpFN = tmpBaseFields[i];\n      var tmpVal = doc[tmpFN];\n      if( typeof(tmpVal) === 'undefined' || tmpVal === null){\n        tmpVal = '';\n      }\n      tmpDoc[tmpFN] = tmpVal;\n    }\n    \n    emit(doc._id, tmpDoc);  \n  }\n}"
            },
            "recycled": {
                "map": "var tmpBaseFields = [\"first_name\",\"last_name\",\"email\",\"application\",\"ip_address\",\"animal\", \"sys_DocCreated\"];\n\nfunction (doc) {\n  var tmpDoc = {};\n \n  if( doc.sys_DocType && doc.sys_DocType === '_recycled' && doc.sys_RecycledDocType && doc.sys_RecycledDocType === \"mock-data\" ){\n    for( var i = 0 ; i < tmpBaseFields.length ; i++){\n      var tmpFN = tmpBaseFields[i];\n      var tmpVal = doc[tmpFN];\n      if( typeof(tmpVal) === 'undefined' || tmpVal === null){\n        tmpVal = '';\n      }\n      tmpDoc[tmpFN] = tmpVal;\n    }\n    \n    emit(doc._id, tmpDoc);  \n  }\n}"
            }
        },
        "language": "javascript"
    },
    {
        "_id": "_design/sys_view_view-specs",
        "views": {
            "all": {
                "map": "var tmpBaseFields = [\"name\",\"title\"];\nvar tmpDocType = 'view-specs'\nfunction (doc) {\n  var tmpDoc = {};\n \n  if( doc.sys_DocType && doc.sys_DocType === tmpDocType ){\n    for( var i = 0 ; i < tmpBaseFields.length ; i++){\n      var tmpFN = tmpBaseFields[i];\n      var tmpVal = doc[tmpFN];\n      if( typeof(tmpVal) === 'undefined' || tmpVal === null){\n        tmpVal = '';\n      }\n      tmpDoc[tmpFN] = tmpVal;\n    }\n    \n    emit(doc._id, tmpDoc);  \n  }\n}"
            },
            "recycled": {
                "map": "var tmpBaseFields = [\"name\",\"title\"];\nvar tmpDocType = 'view-specs'\n\nfunction (doc) {\n  var tmpDoc = {};\n \n  if( doc.sys_DocType && doc.sys_DocType === '_recycled' && doc.sys_RecycledDocType && doc.sys_RecycledDocType === tmpDocType ){\n    for( var i = 0 ; i < tmpBaseFields.length ; i++){\n      var tmpFN = tmpBaseFields[i];\n      var tmpVal = doc[tmpFN];\n      if( typeof(tmpVal) === 'undefined' || tmpVal === null){\n        tmpVal = '';\n      }\n      tmpDoc[tmpFN] = tmpVal;\n    }\n    emit(doc._id, tmpDoc);  \n  }\n}"
            }
        },
        "language": "javascript"
    },
    {
        "_id": "_design/sys_view_databases",
        "views": {
            "all": {
                "map": "var tmpBaseFields = [\"name\",\"title\"];\nvar tmpDocType = 'database'\nfunction (doc) {\n  var tmpDoc = {};\n \n  if( doc.sys_DocType && doc.sys_DocType === tmpDocType ){\n    for( var i = 0 ; i < tmpBaseFields.length ; i++){\n      var tmpFN = tmpBaseFields[i];\n      var tmpVal = doc[tmpFN];\n      if( typeof(tmpVal) === 'undefined' || tmpVal === null){\n        tmpVal = '';\n      }\n      tmpDoc[tmpFN] = tmpVal;\n    }\n    \n    emit(doc._id, tmpDoc);  \n  }\n}"
            },
            "recycled": {
                "map": "var tmpBaseFields = [\"name\",\"title\"];\nvar tmpDocType = 'database'\n\nfunction (doc) {\n  var tmpDoc = {};\n \n  if( doc.sys_DocType && doc.sys_DocType === '_recycled' && doc.sys_RecycledDocType && doc.sys_RecycledDocType === tmpDocType ){\n    for( var i = 0 ; i < tmpBaseFields.length ; i++){\n      var tmpFN = tmpBaseFields[i];\n      var tmpVal = doc[tmpFN];\n      if( typeof(tmpVal) === 'undefined' || tmpVal === null){\n        tmpVal = '';\n      }\n      tmpDoc[tmpFN] = tmpVal;\n    }\n    emit(doc._id, tmpDoc);  \n  }\n}"
            }
        },
        "language": "javascript"
    },
    {
        "_id": "_design/sys_view_doctypes",
        "views": {
            "all": {
                "map": "var tmpBaseFields = [\"name\",\"title\"];\nvar tmpDocType = 'doctype'\nfunction (doc) {\n  var tmpDoc = {};\n \n  if( doc.sys_DocType && doc.sys_DocType === tmpDocType ){\n    for( var i = 0 ; i < tmpBaseFields.length ; i++){\n      var tmpFN = tmpBaseFields[i];\n      var tmpVal = doc[tmpFN];\n      if( typeof(tmpVal) === 'undefined' || tmpVal === null){\n        tmpVal = '';\n      }\n      tmpDoc[tmpFN] = tmpVal;\n    }\n    \n    emit(doc._id, tmpDoc);  \n  }\n}"
            },
            "recycled": {
                "map": "var tmpBaseFields = [\"name\",\"title\"];\nvar tmpDocType = 'doctype'\n\nfunction (doc) {\n  var tmpDoc = {};\n \n  if( doc.sys_DocType && doc.sys_DocType === '_recycled' && doc.sys_RecycledDocType && doc.sys_RecycledDocType === tmpDocType ){\n    for( var i = 0 ; i < tmpBaseFields.length ; i++){\n      var tmpFN = tmpBaseFields[i];\n      var tmpVal = doc[tmpFN];\n      if( typeof(tmpVal) === 'undefined' || tmpVal === null){\n        tmpVal = '';\n      }\n      tmpDoc[tmpFN] = tmpVal;\n    }\n    emit(doc._id, tmpDoc);  \n  }\n}"
            }
        },
        "language": "javascript"
    }]

    return {
        getAppSetup: getAppSetup
        ,refreshAppSetup: refreshAppSetup
        ,getDetails: getDetails
        ,getAccount: getAccount
        ,getDatabase: getDatabase
        ,getDatabaseForView: getDatabaseForView
        ,getDefaultDatabase: getDefaultDatabase
    }
    
    function getAccount(theAccountName){
        return $.AppData.getAccount(theAccountName, dataMap);
    }
    function getDatabaseForView(theViewName){
        return $.AppData.getDatabaseForView(theViewName,dataMap)
    }

    function getDatabase(theDBName){
        var tmpDBName = dataMap.databases[theDBName] || theDBName;
        return accountDefault.getDatabase(tmpDBName)
    }

    function getDefaultDatabase(){
        if( !(defaultDatabaseName)){
            throw "No default application database configured"
        }
        //--- Allow non-mapped name as default db na,e
        var tmpDBName = dataMap.databases[defaultDatabaseName] || defaultDatabaseName;
        return accountDefault.getDatabase(tmpDBName)
    }

    function getDetails(){
        var tmpRet = AppData.getDetails();
        tmpRet.appSetup = appSetup
        return tmpRet;
    }

    function refreshAppSetup(){
        appSetup = false;      
        return getAppSetup();  
    }

    
    function getAppSetup(req, res, next) {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {
                if( appSetup ){
                    resolve(appSetup);
                    return;
                }
                var tmpDB = $.AppData.getDefaultDatabase();
                var tmpDocs = $.await(tmpDB.getDocumentsByKeys(["app-setup"]));
                if( tmpDocs && tmpDocs.length == 1){
                    var tmpDoc = tmpDocs[0];
                    delete(tmpDoc._id);
                    delete(tmpDoc._rev);
                }
                appSetup = tmpDoc;
                dataMap = appSetup.dataMap;
                //--- Load Application Data Map, account name required, default db suggested
                defaultAccountName = dataMap.defaultAccountName || '';
                var tmpNoSQLAccountInfo = dataMap.accounts[defaultAccountName];
                if (!(tmpNoSQLAccountInfo)) {
                    throw "NoSQL default account not setup"
                }
                accountDefault = new NoSQL.NoSqlAccount($.cloneObject(tmpNoSQLAccountInfo));
                defaultDatabaseName = dataMap.defaultDatabaseName || '';
                
                if( defaultDatabaseName ){
                    //--- Get Default Application DB
                    var tmpDB = getDefaultDatabase();
                    //--- Verify the catalog is valid / setup
                    var tmpDesignDetails = $.await(tmpDB.getDesignElements());
                    //console.log("tmpDesignDetails",tmpDesignDetails);
                    if( !(tmpDesignDetails && tmpDesignDetails.length > 2) ){
                        //-- Catalog not upset
                        console.log("Catalog not setup, creating one time");
                        try {

                            appSetup.createDatabaseResults = $.await(accountDefault.createDatabase(defaultDatabaseName));
                            tmpDB = getDefaultDatabase();
                            appSetup.createElementsResults = $.await(tmpDB.sendBulkUpdate(defaultCatalogDesignElements));
                            //console.log("appSetup.createElementsResults",appSetup.createElementsResults);
                        } catch (ex) {
                            console.log("Error doing creation ",ex)
                        }
                    }
                    
                }
    

                resolve(appSetup);
            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }
        }))
    }

};
