/*
Author: Joseph Francis
License: LGPL
*/

/*  NoSqlDataManager

Designed to abstract json based data storage in a way that is not specific to source type or location.

---------------------- ---------------------- ---------------------- ----------------------
Important: 
    This expects PouchDB to be available for local storage as it is the default handler for data requests
    * To change this, replace the [default] handler with your own function / alternate handler
---------------------- ---------------------- ---------------------- ----------------------
How to use:
----------------------

Get the plugin (Singleton):
  var dataMgr = $.fn.NoSqlDataManager

Data Manager uses known or identified sources
  dataMgr.getDocument(sourceName, docID)
  dataMgr.putDocument(sourceName, docID, theObject)
  dataMgr.deleteDocument(sourceName, docID)
  dataMgr.getAll(sourceName)
  dataMgr.getAll(sourceName, ['key1','key2']);

  //--- Special functions


Data Manager can be extended to handle custom sources
  dataMgr.putSourceHandler('mytestdb',{"handler":"[couch]", "options":{"dbName","some-database-name"}}); 

Data Manager handlers can had defaults set / overridden
  dataMgr.putSourceHandlerDefaults('[ajax]',{ ajax: {"url": "http://your.location/apicall/"}});
  
Note: If the source is not an internal name [likethis],  but the handler is (i.e. [pouch]), then ...
          .. if no options object with a dbname is provided, the db name is assumed to be the source name
      Examples: 
        dataMgr.putDocument('testdb, 'mydoc1', {"title":"My Test Doc"}); //Add mydoc1 to the local pouch db: "testdb"
        dataMgr.getDocument('testdb', 'mydoc1'); //returns mydoc1 from the local pouch db: "testdb"

Source Handlers:  ("name" = function or name of other handler.)
[any-internal] = when [] is used, these are internal / common handlers for known source data

  "[default]" = the default handler if none is provided, [pouch] by default.

  DATABASE ACCESS
  "[pouch]" = Handler specifically for local pouch storage, where create and destroy requires no special privs
  "[couch]" = Handler for a (usually local) couch database
  "[ajax]" = Handler for any external ajax handler that follows the known protocol

  READ ONLY - AJAX BASED ACCESS
  "[get]": Handler to get a JSON object via ajax get url
  "[html]": Handler to get HTML via ajax get url


*/

$.fn.NoSqlDataManager = (function ($) {

    function DataManager(theOptions) { };
    var me = DataManager.prototype;

   

    me.getDataDetails = getDataDetails;
    function getDataDetails(theData) {

        var tmpRet = {
            fieldCount: 0,
            fields: {},
            details: []
        }
        if (!theData) {
            return;
        }
        var tmpData = theData;
        if (tmpData.docs) {
            tmpData = tmpData.docs;
        }
        if (tmpData.length < 1) {
            return tmpRet;
        }
        tmpRet.designDocs = 0;

        for (var i = 0; i < tmpData.length; i++) {
            var tmpDoc = tmpData[i];
            var tmpID = tmpDoc._id;

            if (tmpID.indexOf("_design") == 0) {
                tmpRet.designDocs++;
            } else {
                for (var aFieldName in tmpDoc) {

                    if (!(tmpRet.fields[aFieldName])) {
                        tmpRet.fields[aFieldName] = { isMissing: 0, hasField: 0, hasValue: 0, values: {}, valueTypes: {}, valuesTypes: {} }
                    }
                    var tmpFO = tmpRet.fields[aFieldName];

                    tmpFO.hasField++;
                    var tmpVals = tmpDoc[aFieldName];

                    var tmpValType = typeof (tmpVals);
                    var tmpIsEmpty = false;

                    if ($.isArray(tmpVals)) {
                        tmpValType = 'ARRAY';
                        if( tmpVals.length == 0){
                            tmpIsEmpty = true;
                        }
                    }
                    if (!tmpFO.valuesTypes.hasOwnProperty(tmpValType)) {
                        tmpFO.valuesTypes[tmpValType] = 1;
                    } else {
                        tmpFO.valuesTypes[tmpValType]++
                    }

                    if (!($.isArray(tmpVals)) && typeof (tmpVals) == 'object') {
                        tmpVals = '[OBJECT]';
                    }
                    if (tmpVals == null || typeof (tmpVals) == 'undefined') {
                        tmpFO.isMissing++;
                    } else if (typeof (tmpVals) == 'string') {
                        if (tmpVals) {
                            tmpFO.hasValue++;
                        }
                        tmpVals = [tmpVals];
                    } else {
                        if (!($.isArray(tmpVals))) {
                            tmpVals = [tmpVals];                       
                        }
                        if( !tmpIsEmpty && !(tmpVals.length == 1 && (tmpVals[0] == '' || tmpVals[0] == null))){
                            tmpFO.hasValue++;                           
                        }                        
                    }

                    for (var aValPos in tmpVals) {
                        var tmpVal = tmpVals[aValPos];

                        if (typeof (tmpVal) == 'boolean' || (tmpVal != '')) {
                            if (!tmpFO.values.hasOwnProperty(tmpVal)) {
                                tmpFO.values[tmpVal] = 1;
                            } else {
                                tmpFO.values[tmpVal]++
                            }
                        }
                        var tmpValType = typeof (tmpVal);
                        if (!tmpFO.valueTypes.hasOwnProperty(tmpValType)) {
                            tmpFO.valueTypes[tmpValType] = 1;
                        } else {
                            tmpFO.valueTypes[tmpValType]++
                        }
                    }
                }
            }
        }
        tmpRet.data = tmpData;

        return tmpRet;
    }

    me.getDocumentHandler = getDocumentHandler;
    function getDocumentHandler(theSourceName) {

        var tmpRet = {};
        var tmpSource = theSourceName;
        var tmpSourceHandlerName = tmpSourceName;
        var tmpSourceName = theSourceName;
        var tmpSources = tmpSource.split(":");
        if (tmpSources.length > 0) {
            tmpSourceHandlerName = tmpSources[0];
            tmpSourceName = tmpSourceName.replace(tmpSourceHandlerName + ':', '');
        }

        var tmpHandler = getSourceHandler(tmpSourceHandlerName);
        if (!tmpHandler) {
            console.error("Error in getDocumentHandler: No handler found for source " + tmpSource);
            return false;
        }

        var tmpHandlerFunc = tmpHandler;
        var tmpHandlerOptions = {};
        if (tmpSourceName == tmpSourceHandlerName && tmpHandler.source && (tmpHandler.source.indexOf(':') >= 0)) {
            tmpSource = tmpHandler.source;
            tmpSourceHandlerName = tmpSource;
            tmpSourceName = tmpSource;
            var tmpSources = tmpSource.split(":");
            if (tmpSources.length > 0) {
                tmpSourceHandlerName = tmpSources[0];
                tmpSourceName = tmpSourceName.replace(tmpSourceHandlerName + ':', '');
                tmpSource = tmpSourceName;
            }
            tmpHandlerFunc = getSourceHandler(tmpSourceHandlerName);
        } else {
            if (typeof (tmpHandlerFunc) == 'object') {

                if (typeof (tmpHandlerFunc.options) == 'object') {
                    tmpHandlerOptions = tmpHandlerFunc.options;
                }
                if (typeof (tmpHandlerFunc.source) == 'string') {
                    tmpSourceName = tmpHandlerFunc.source;
                }
                tmpHandlerFunc = getSourceHandler(tmpHandlerFunc.handler);;
            }
        }

        if (typeof (tmpHandlerFunc) != 'function') {
            console.error("Error in getDocumentHandler: No handler FUNCTION found for source " + tmpSource);
            return false;
        }

        if (sourceHandlerOptions.hasOwnProperty(tmpSourceHandlerName)) {
            tmpHandlerOptions = $.extend(sourceHandlerOptions[tmpSourceHandlerName], tmpHandlerOptions);
        }

        tmpRet.source = tmpSourceName;
        tmpRet.options = tmpHandlerOptions;
        tmpRet.handler = tmpHandlerFunc;

        return tmpRet;
    }


    //--- Public Implementation === === === === === === === === === === === === === === === === === === === === === === 
    /*
    
    Out of the box: 
     - getDocument
     - getDocuments
     - putDocument
     - deleteDocument
 
    Advanced Options to configure alternate sources and provide access creditials and/or APIs to use for source data.
     - putSourceHandler (advanced)
     - putSourceHandlerDefaults (advanced)
 
 
    
     */

    me.putSourceHandler = putSourceHandler;
    function putSourceHandler(theSourceName, theHandler) {
        sourceHandlers[theSourceName] = theHandler;
    }

    me.getDocument = getDocument;
    function getDocument(theSourceName, thePath) {
        var tmpHandlerDetails = getDocumentHandler(theSourceName);
        var tmpActionDetails = {
            action: 'get',
            location: thePath,
            source: tmpHandlerDetails.source
        }
        return tmpHandlerDetails.handler(tmpActionDetails, tmpHandlerDetails.options);
    }

    me.getDocuments = getDocuments;
    function getDocuments(theSourceName, theKeys) {
        var tmpHandlerDetails = getDocumentHandler(theSourceName);
        var tmpActionDetails = {
            action: 'getDocs',
            keys: theKeys,
            source: tmpHandlerDetails.source
        }
        return tmpHandlerDetails.handler(tmpActionDetails, tmpHandlerDetails.options);
    }

    me.addDocument = addDocument;
    function addDocument(theSourceName, thePath, theObject) {
        var tmpHandlerDetails = getDocumentHandler(theSourceName);
        //---ToDo: Work out deeper path or rename
        theObject._id = thePath;

        var tmpActionDetails = {
            action: 'add',
            doc: theObject,
            location: thePath,
            source: tmpHandlerDetails.source
        }
        return tmpHandlerDetails.handler(tmpActionDetails, tmpHandlerDetails.options);
    }

    me.putDocument = putDocument;
    function putDocument(theSourceName, thePath, theObject) {
        var tmpHandlerDetails = getDocumentHandler(theSourceName);
        //---ToDo: Work out deeper path or rename
        theObject._id = thePath;
        var tmpActionDetails = {
            action: 'put',
            doc: theObject,
            location: thePath,
            source: tmpHandlerDetails.source
        }
        return tmpHandlerDetails.handler(tmpActionDetails, tmpHandlerDetails.options);
    }

    me.deleteDocument = deleteDocument;
    function deleteDocument(theSourceName, thePath) {
        var tmpHandlerDetails = getDocumentHandler(theSourceName);
        var tmpActionDetails = {
            action: 'delete',
            location: thePath,
            source: tmpHandlerDetails.source
        }
        return tmpHandlerDetails.handler(tmpActionDetails, tmpHandlerDetails.options);
    }

    var sourceHandlers = {
        "[default]": "[pouch]",
        "[pouch]": sourceHandlerForPouch, //for client only data
        "[couch]": sourceHandlerForNoSQL, //for NoSQL data
        "[ajax]": sourceHandlerForAjaxPost, //for data
        "[get]": sourceHandlerForAjaxGet, //Read Only - json data type
        "[html]": sourceHandlerForHTML  //Read Only - html data type
    }

    var sourceHandlerOptions = {
        "[couch]": { auth: { username: '', password: '' } },
        "[ajax]": { ajax: { url: './' } }
    }
    me.putSourceHandlerDefaults = putSourceHandlerDefaults;
    function putSourceHandlerDefaults(theSourceName, theDefaultOptions) {
        if (!(theSourceName)) {
            return false;
        }
        sourceHandlerOptions[theSourceName] = theDefaultOptions || {}
        return true;
    }

    me.sourceHandlerForPouch = sourceHandlerForPouch;
    function sourceHandlerForPouch(theAction, theOptions) {
        var dfd = jQuery.Deferred();

        if (!(theAction) && typeof (theAction.source) == 'object') {
            dfd.reject("Error: No action passed");
            return dfd.promise();
        }

        var tmpDBName = theAction.source || '';
        var tmpDB = new PouchDB(tmpDBName);
        var tmpOptions = $.extend({}, theOptions, { db: tmpDB });
        return sourceHandlerForNoSQL(theAction, tmpOptions)
    }

    me.transformNoSQLDocs = function (theDocs) {
        if (typeof (theDocs.rows) == 'object') {
            theDocs = theDocs.rows;
        }
        var tmpRet = {
            docs: []
        }
        for (var aDocPos in theDocs) {
            var tmpDoc = theDocs[aDocPos];
            tmpDoc = tmpDoc.doc || tmpDoc;
            var tmpID = tmpDoc._id;
            if( tmpID.indexOf("_design") != 0){
                tmpDoc._index = aDocPos;
                tmpRet.docs.push(tmpDoc);
            }
        }
        return tmpRet;
    }


    me.getDatabaseFromSourceName = function (theSourceName) {
        var tmpHandler = getDocumentHandler(theSourceName);
        return me.getDatabase((tmpHandler.options.source || tmpHandler.source), tmpHandler.options);
    }

    me.getDatabase = function (theSourceName, theOptions) {
        var dfd = jQuery.Deferred();
        try {
            var tmpDB = null;
            if (theOptions.hasOwnProperty('url')) {
                var tmpDBOptions = {};
                if (typeof (theOptions.auth) == 'object') {
                    tmpDBOptions.auth = theOptions.auth;
                }
                tmpDB = new PouchDB(theOptions.url + theSourceName);
            } else {
                tmpDB = new PouchDB(theSourceName);
            }
            var tmpOptions = $.extend({}, (theOptions || {})); //, { db: tmpDB }
            if (tmpDBOptions.auth) {
                tmpDB.login(tmpDBOptions.auth.username, tmpDBOptions.auth.password).then(function (user) {
                    dfd.resolve(tmpDB);
                })
            } else {
                dfd.resolve(tmpDB);
            }

        } catch (theError) {
            dfd.reject("Error getting database: " + theError);
        }
        return dfd.promise();
    }

    me.sourceHandlerForNoSQL = sourceHandlerForNoSQL;
    function sourceHandlerForNoSQL(theAction, theOptions) {
        var dfd = jQuery.Deferred();

        theOptions = theOptions || {};
        var tmpDBName = theAction.source || '';

        if (!(typeof (theOptions.db) == 'object')) {
            me.getDatabase(tmpDBName, theOptions).then(function (theDB) {
                theOptions.db = theDB;
                me.sourceHandlerForNoSQL(theAction, theOptions).then(function (theResponse) {
                    dfd.resolve(theResponse);
                });
            })  
            return dfd.promise();
        }

        var tmpAction = theAction.action || 'get';
        var tmpDocID = theAction.location || '';

        var tmpDB = theOptions.db;
        if (tmpAction == 'get') {
            tmpDB.get(tmpDocID).then(function (theDoc) {
                if (theDoc.doc) {
                    theDoc = theDoc.doc;
                }
                dfd.resolve(theDoc);
            }).catch(function (err) {
                //dfd.reject("Error getting document from nosql db. " + err.toString());
                dfd.reject(err);
            });
        } else if (tmpAction == 'add') {
            return tmpDB.put(theAction.doc);
        } else if (tmpAction == 'put') {
            var tmpDoc = theAction.doc || false;

            tmpDB.get(tmpDocID).then(function (doc) {
                tmpDoc._rev = doc._rev;
                tmpDoc._id = doc._id;
                return tmpDB.put(tmpDoc);
            }).then(function (theResponse) {
                dfd.resolve(tmpDoc, theResponse);
            }).catch(function (err) {
                if (err.status == 404) {
                    tmpDB.put(tmpDoc).then(function (theResponse) {
                        dfd.resolve(tmpDoc, theResponse);
                    }).catch(function (err) {
                        dfd.reject("Error putting document into a nosql db. " + err.toString());
                    });
                } else {
                    dfd.reject("Error putting document into a nosql db. " + err.toString());
                }

            });
        } else if (tmpAction == 'getDocs') {
            
            var tmpRet = [];
            var tmpOptions = { include_docs: true };
            var tmpKeys = theAction.keys || [];
            if ((tmpKeys) && tmpKeys.length > 0) {
                tmpOptions.keys = tmpKeys;
            }
            tmpDB.allDocs(tmpOptions).then(function (theResponse) {
                tmpRet = me.transformNoSQLDocs(theResponse)
                dfd.resolve(tmpRet);
            }).catch(function (err) {
                dfd.reject("Error getting documents from a nosql db. " + err.toString());
            });
        } else if (tmpAction == 'delete') {
            var tmpRet = [];
            tmpDB.get(tmpDocID).then(function (doc) {
                return tmpDB.remove(doc);
            }).then(function (theResult) {
                dfd.resolve(theResult);
            }).catch(function (err) {

                if (err.status == 404) {
                    dfd.resolve({
                        _id: tmpDocID,
                        ok: true,
                        msg: "OK, Did not exist."
                    });
                } else {
                    dfd.reject("Error deleting document from a nosql db. " + err.toString());
                }

            });
        }

        return dfd.promise();
    }

    //--- Simple URL get method for HTML files (templates usually)
    me.sourceHandlerForHTML = sourceHandlerForAjaxGet;
    function sourceHandlerForHTML(theAction, theOptions) {
        //--- Merge from theOptions if supporting more options
        return sourceHandlerForAjaxGet(theAction, {dataType:'html'});
    }
    
    //--- Simple URL get method, default type is json for returning objects
    //?  me.defaultSourceForAjaxGet = 'app-data';
    me.sourceHandlerForAjaxGet = sourceHandlerForAjaxGet;    
    function sourceHandlerForAjaxGet(theAction, theOptions) {
        var dfd = jQuery.Deferred();
       
        var tmpAction = theAction.action || 'get';
        var tmpKey = theAction.location || '';
        var tmpKeys = [];
        var tmpDefs = [];
        var tmpTempls = [];

        var tmpSource = theAction.source || '';
        
        var tmpPre = './' + tmpSource + '/';
        if( tmpSource.startsWith('/' ) ){
            tmpPre = tmpSource + '/';
        }
        
        var tmpDataType = "json";
        if( theOptions && theOptions.dataType ){
            tmpDataType = theOptions.dataType;
        }

        if(tmpAction == 'getDocs' && theAction.keys && theAction.keys.length ){
            tmpKeys = theAction.keys;
            var tmpDefs = [];
            var tmpResults = {};
            
            for( var i = 0 ; i < tmpKeys.length ; i++){
                var tmpListKey = tmpKeys[i];
                //--- This is a trick that is needed to keep the keys from all being the last one when it really runs
                //--   ... this contains the keys inside the function.
                //--  Note: Just hit this doing the async, maybe better way?
                var fnGetAndAdd = function(theKey){
                    var tmpKey = theKey;
                    return function(theResponse){
                        theResponse["_key"] = tmpKey;
                        tmpResults[tmpKey] = theResponse;
                    }
                }
                var fnGetAndAddError = function(theKey){
                    var tmpKey = theKey;
                    return function(theError){
                        tmpResults[tmpKey] = {"_error":theError,"_key":tmpKey};
                    }
                }
                tmpDefs.push(
                    $.ajax({
                        url: tmpPre + tmpListKey,
                        method: 'GET',
                        dataType: tmpDataType,
                        success: fnGetAndAdd(tmpListKey),
                        error: fnGetAndAddError(tmpListKey)                    
                    })   
                                     
                );
            }
            $.whenAll(tmpDefs).then(
                function(){
                    dfd.resolve(tmpResults);
                }
            )
            return dfd.promise();
        } else {
            //---only one
            if (!(tmpKey)) {
                dfd.reject("No key to get");
                return dfd.promise();
            }
    
            $.ajax({
                url: tmpPre + tmpKey,
                method: 'GET',
                dataType: tmpDataType,
                success: function (theResponse) {
                    dfd.resolve(theResponse);
                },
                error: function (theError) {
                    dfd.reject("No URL setup to handle this ajax call: " + theError);
                }
            });

        }
        
        return dfd.promise();

    }

    me.sourceHandlerForAjaxPost = sourceHandlerForAjaxPost;
    function sourceHandlerForAjaxPost(theAction, theOptions) {
        var dfd = jQuery.Deferred();
        //theAction.options = theOptions || {};
        var tmpOptions = theOptions || {};

        if (typeof (tmpOptions.ajax) != 'object') {
            dfd.reject("No ajax object setup to handle this ajax call");
            return dfd.promise();
        }

        if (typeof (tmpOptions.ajax.url) != 'string') {
            dfd.reject("No URL setup to handle this ajax call");
            return dfd.promise();
        }

        $.ajax({
            url: tmpOptions.ajax.url,
            data: tmpOptions.ajax.data || theAction.data || theAction,
            method: 'POST',
            dataType: "json",
            success: function (theResponse) {
                dfd.resolve(theResponse);
            },
            error: function (theError) {
                dfd.reject("No URL setup to handle this ajax call: " + theError);
            }
        });
        return dfd.promise();

    }

    me.getSourceHandler = getSourceHandler;
    function getSourceHandler(theSourceName) {
        var tmpSourceName = theSourceName || '';
        if (tmpSourceName == '') {
            tmpSourceName = "[default]";
        }
        var tmpHandler = false;
        if (sourceHandlers.hasOwnProperty(theSourceName)) {
            tmpHandler = sourceHandlers[theSourceName];
        } else {
            tmpHandler = "[default]";
        }
        if (typeof (tmpHandler) == 'function' || typeof (tmpHandler) == 'object') {
            return tmpHandler;
        }

        //--- Go a few deep to find handler function
        for (var i = 0; i < 10; i++) {
            if (sourceHandlers.hasOwnProperty(tmpHandler)) {
                tmpHandler = sourceHandlers[tmpHandler];
            } else {
                //--- Something is not right, return sourceHandlerForPouch
                tmpHandler = sourceHandlerForPouch;
            }
            if (typeof (tmpHandler) == 'function' || typeof (tmpHandler) == 'object') {
                return tmpHandler;
            }
        }



    }

    me.init = init;
    function init() {
        return me;
    }

    return me;

})($);
