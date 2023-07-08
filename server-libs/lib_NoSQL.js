/*
  Standard NoSQL Access Library

  NO LONGER IN USE - SEE lib_Mongo.js
*/
'use strict';

let $ = require("./globalUtilities").$;

//==== NoSqlAccount === === === === === === === === === === 
function NoSqlAccount(scope) {
    this.accountConfig = false;
    this.loadConfig(scope);
}
module.exports.NoSqlAccount = NoSqlAccount;

NoSqlAccount.prototype.loadConfig = function (scope) {
    if (!scope) {
        throw "Config not provided"
    }
    if (!scope.account && !scope.url) {
        throw "Account not provided"
    }
    if (!scope.key) {
        throw "Key not provided"
    }
    if (!scope.password) {
        throw "Password not provided"
    }
    this.accountConfig = scope;
};


//--- Options: 
//      accountConfig = default base config to use instead of default for account
NoSqlAccount.prototype.createDatabase = function (theDBName, theOptions) {
    var tmpThis = this;
    return new Promise(function (resolve, reject) {
        //ToDo: Check for existence and create if not there only
        try {
            var tmpOptions = theOptions || {};
            var tmpConfig = $.cloneObject(tmpOptions.accountConfig || tmpThis.getNoSqlBaseConfig());
            tmpConfig.method = 'PUT';
            tmpConfig.uri += '/' + theDBName;
            $.request(tmpConfig, function (error, response, body) {

                if (!error) {

                    if (typeof (body) === 'string') {
                        body = JSON.parse(body);
                    }
                    resolve(body);
                }
                else {
                    reject(error);
                }
            });

        } catch (error) {
            reject(error);
        }
    });
}

//--- Options: 
//      accountConfig = default base config to use instead of default for account
//      configOverrides = requestConfig details to merge in such as timeout changes, etc
NoSqlAccount.prototype.getDatabase = function (theDBName, theOptions) {
    var tmpOptions = theOptions || {};
    var tmpBaseConfig = $.cloneObject(tmpOptions.accountConfig || this.getNoSqlBaseConfig());
    if (typeof (tmpOptions.configOverrides) == 'object') {
        tmpBaseConfig = $.merge(false, tmpBaseConfig, tmpOptions.configOverrides);
    }
    return new NoSqlDatabase(tmpBaseConfig, theDBName);
}


NoSqlAccount.prototype.getDatabaseList = function () {
    let tmpConfig = $.cloneObject(this.getNoSqlBaseConfig());
    
    tmpConfig.method = 'GET';
    tmpConfig.uri = tmpConfig.uri + '/_all_dbs';
    let self = this;

    return new Promise(function (resolve, reject) {

        try {
         

            $.request(tmpConfig, function (error, response, body) {

                if (!error) {

                    if (typeof (body) === 'string') {
                        body = JSON.parse(body);
                    }
                    resolve({databases:body});
                }
                else {
                    reject(error);
                }
            });

        } catch (error) {
            reject(error);
        }
    });
}

NoSqlAccount.prototype.getNoSqlBaseConfig = function () {
    if (!(this.accountConfig)) {
        throw "NoSql info not found in config"
    }
    if (!((this.accountConfig.account || this.accountConfig.url) && this.accountConfig.key && this.accountConfig.password)) {
        throw "NoSql config is incomplete"
    }

    var tmpBaseURL = '';
    if( typeof(this.accountConfig.url) == 'string' ){
        tmpBaseURL = this.accountConfig.url;
    } else {
        tmpBaseURL =  "https://" + this.accountConfig.account + ".cloudant.com/";
    }
    var tmpBaseConfig = {
        "baseUrl": tmpBaseURL,
        "uri": "",
        "method": "GET",
        "timeout": 120000,
        "headers": {
            "Content-type": "application/json"
        },
        "auth": {
            "sendImmediately": true,
            "user": this.accountConfig.key,
            "pass": this.accountConfig.password
        }
    }

    return tmpBaseConfig;
}


//==== NoSqlDatabase === === === === === === === === === === 
function NoSqlDatabase(scope, theDBName) {
    this.setup(scope, theDBName);
}
module.exports.NoSqlDatabase = NoSqlDatabase;

NoSqlDatabase.prototype.setup = function (scope, theDBName) {
    this.setRequestConfig(scope);
    this.setDBName(theDBName);
};

NoSqlDatabase.prototype.setRequestConfig = function (scope) {
    this.requestConfig = scope || {};
};
NoSqlDatabase.prototype.setDBName = function (theDBName) {
    this.dbname = theDBName || '';
};
1

NoSqlDatabase.prototype.getDesignElements = function () {
    var tmpURI = '/_all_docs?inclusive_end=false&start_key=\"_design\"&end_key=\"_design0\"';
    return this.getRows(tmpURI,{valueAsDoc:true})    
}

NoSqlDatabase.prototype.getDBInfo = function () {
    var tmpURI = '/';
    return this.getURI(tmpURI,{valueAsDoc:true})    
}

//--- Sends already merged in bulk update documents
NoSqlDatabase.prototype.sendBulkUpdate = function (theBulkDocs) {
    let tmpConfig = $.cloneObject(this.requestConfig);
    tmpConfig.method = 'POST';
    tmpConfig.json = { docs: theBulkDocs };
    tmpConfig.uri = '/' + this.dbname + '/_bulk_docs';
    let self = this;

    return new Promise(function (resolve, reject) {

        try {
           // console.log('NoSqlDatabase - sendBulkUpdate - ' + tmpConfig.uri);
            if (!(self.dbname)) {
                throw 'No Database Found'
            }

            $.request(tmpConfig, function (error, response, body) {

                if (!error) {

                    if (typeof (body) === 'string') {
                        body = JSON.parse(body);
                    }
                    resolve(body);
                }
                else {
                    reject(error);
                }
            });

        } catch (error) {
            reject(error);
        }
    });
};

NoSqlDatabase.prototype.getDocumentsByKeys = function (theKeys) {
    let tmpConfig = $.cloneObject(this.requestConfig);
    tmpConfig.method = 'POST';
    tmpConfig.json = { keys: theKeys };
    tmpConfig.uri = '/' + this.dbname + '/_all_docs?include_docs=true';
    let self = this;

    return new Promise(function (resolve, reject) {

        try {
          //  console.log('NoSqlDatabase - getDocumentsByKeys - ' + tmpConfig.uri);
            if (!(self.dbname)) {
                throw 'No Database Found'
            }

            $.request(tmpConfig, function (error, response, body) {

                if (!error) {

                    if (typeof (body) === 'string') {
                        body = JSON.parse(body);
                    }
                    //--- return nothing on fail instead of crashing
                    //- todo: Add indicator a failure happened in response
                    body.rows = body.rows || [];
                    var tmpDocs = [];
                    for (var i = 0; i < body.rows.length; i++) {
                        var tmpDoc = body.rows[i];
                        if (tmpDoc && tmpDoc.doc) {
                            tmpDoc = tmpDoc.doc
                        }
                        tmpDocs.push(tmpDoc);
                    }
                    resolve(tmpDocs);
                }
                else {
                    reject(error);
                }
            });

        } catch (error) {
            reject(error);
        }
    });
};

NoSqlDatabase.prototype.getDocumentsByViewKeys = function (theViewURI, theKeys) {
    let tmpConfig = $.cloneObject(this.requestConfig);
    tmpConfig.method = 'GET';
    if( theKeys ){
        tmpConfig.uri = '/' + this.dbname + theViewURI + '?include_docs=true&keys=' + JSON.stringify(theKeys);
    } else {
        tmpConfig.uri = '/' + this.dbname + theViewURI + '?include_docs=true';
    }
    let self = this;

    return new Promise(function (resolve, reject) {

        try {
            if (!(self.dbname)) {
                throw 'No Database Found'
            }

            $.request(tmpConfig, function (error, response, body) {

                if (!error) {

                    if (typeof (body) === 'string') {
                        body = JSON.parse(body);
                    }
                    //--- return nothing on fail instead of crashing
                    //- todo: Add indicator a failure happened in response
                    body.rows = body.rows || [];
                    var tmpDocs = [];
                    for (var i = 0; i < body.rows.length; i++) {
                        var tmpDoc = body.rows[i];
                        if (tmpDoc && tmpDoc.doc) {
                            tmpDoc = tmpDoc.doc
                        }
                        tmpDocs.push(tmpDoc);
                    }
                    resolve(tmpDocs);
                }
                else {
                    reject(error);
                }
            });

        } catch (error) {
            reject(error);
        }
    });
};



//--- Gets value as a document with _id added, see below

NoSqlDatabase.prototype.getRowDocs = function (theURI, theOptions) {
    var tmpOptions = theOptions || {};
    tmpOptions.valueAsDoc = true;
    return this.getRows(theURI, tmpOptions);
}
// optional option: {valueAsDoc:true} will return the array of values with _id added
// optional option: {indexField:'somefield',valueAsDoc:true} will return an object instead of an array .. 
//                    indexed by the field passed (which should be unique)
//                    ** only valid with valueAsDoc:true feature for now
//                      indexField options: 
//                          dupsSaveDetails = _dups: [{1},{2},..], 
//                          indexedAsCategories = dups expected, return array of documents for each, even if only one
NoSqlDatabase.prototype.getRows = function (theURI, theOptions) {
    
    //--- Note: (this) no longer available in the promise, grab this stuff here
    let tmpConfig = $.cloneObject(this.requestConfig);
    let self = this;
    var tmpOptions = theOptions || {};


    return new Promise(function (resolve, reject) {

        try {
            if (!theURI) {
                throw 'No URI provided';
            }
            tmpConfig.uri = self.dbname + theURI;

            $.request(tmpConfig, function (error, response, body) {
                if (!error) {
                    var tmpUseIndex = (typeof (tmpOptions.indexField) == 'string' && tmpOptions.indexField !== '');

                    body = JSON.parse(body);
                    if (tmpOptions.valueAsDoc && tmpOptions.valueAsDoc === true) {
                        var tmpDocs = [];
                        var tmpIndex = {};
                        body.rows = body.rows || [];
                        for (let index = 0; index < body.rows.length; index++) {
                            let tmpDoc = body.rows[index];
                            if (typeof (tmpDoc.value) === 'object') {
                                tmpDoc.value._id = tmpDoc.value._id || tmpDoc.id;
                                tmpDoc = tmpDoc.value
                            }
                            if (tmpUseIndex) {
                                var tmpIndexValue = tmpDoc[tmpOptions.indexField];
                                if (tmpIndexValue && tmpIndexValue !== '') {
                                    if (tmpIndex[tmpIndexValue]) {
                                        tmpIndex.__dups = tmpIndex.__dups || {};
                                        if (tmpOptions.dupsSaveDetails === true) {
                                            if (!(tmpIndex.__dups[tmpIndexValue])) {
                                                tmpIndex.__dups[tmpIndexValue] = [tmpIndex[tmpIndexValue]]
                                            }
                                            tmpIndex.__dups[tmpIndexValue].push(tmpDoc);
                                            tmpIndex[tmpIndexValue]
                                        } else {
                                            tmpIndex.__dups[tmpIndexValue] = true;
                                        }

                                    } else {
                                        tmpIndex[tmpIndexValue] = tmpDoc;
                                    }
                                } else {
                                    tmpIndex.__not_found = tmpIndex.__not_found || [];
                                    tmpIndex.__not_found.push(tmpIndexValue);
                                }
                            } else {
                                tmpDocs.push(tmpDoc);
                            }

                        }
                        if (tmpUseIndex) {
                            resolve(tmpIndex || {});
                        } else {
                            resolve(tmpDocs);
                        }

                    } else {
                        //--- Support index here?
                        resolve(body.rows);
                    }

                }
                else {
                    reject(error);
                }
            });

        } catch (error) {
            reject(error);
        }
    });
}

NoSqlDatabase.prototype.getURI = function (theURI, theOptions) {
    
    //--- Note: (this) no longer available in the promise, grab this stuff here
    let tmpConfig = $.cloneObject(this.requestConfig);
    let self = this;
    var tmpOptions = theOptions || {};


    return new Promise(function (resolve, reject) {

        try {
            if (!theURI) {
                throw 'No URI provided';
            }
            tmpConfig.uri = self.dbname + theURI;

            $.request(tmpConfig, function (error, response, body) {
                if (!error) {
                    body = JSON.parse(body);
                     resolve(body);
                }
                else {
                    reject(error);
                }
            });

        } catch (error) {
            reject(error);
        }
    });
}



NoSqlDatabase.prototype.mergeUpdates = function (theOptions) {
    var tmpOptions = theOptions || {};
    if (tmpOptions.keys || tmpOptions.key) {
        return this.mergeUpdatesForKeys(theOptions);
    }
}

NoSqlDatabase.prototype.mergeUpdatesForKeys = function (theOptions) {
    var tmpOptions = theOptions || {};
    var tmpKeys = tmpOptions.keys || tmpOptions.key || '';
    if (!(tmpKeys)) {
        throw ("No keys passed")
    }
    if(typeof(tmpKeys) == 'string'){
        tmpKeys = tmpKeys.split(",");
    }
   
    var tmpUpdates = tmpOptions.updates || {};
    //ToDo: Support backup when changed option
    //var tmpBackup = tmpOptions.backup || [];
    var tmpCopyToFrom = tmpOptions.copy || false;
    var tmpReport = {

    }
    tmpReport.keys = tmpKeys;
    var tmpFoundDocs = $.await(this.getDocumentsByKeys(tmpKeys));


    if (tmpCopyToFrom) {
        for (var i = 0; i < tmpFoundDocs.length; i++) {
            if (tmpFoundDocs[i]) {
                var tmpDoc = tmpFoundDocs[i];
                for (var iToFN in tmpCopyToFrom) {
                    var tmpFromFN = tmpCopyToFrom[iToFN];
                    var tmpFieldVal = tmpDoc[tmpFromFN];
                    if( typeof(tmpFieldVal) != 'undefined' && tmpFieldVal !== null ){
                        tmpDoc[iToFN] = tmpFieldVal
                    }
                }
            }
        }
    }

    //ToDo: Implement Standard Backup Routine
    // if (tmpBackup && tmpBackup.length > 0) {
    //     for (var i = 0; i < tmpFoundDocs.length; i++) {
    //         //tmpFoundDocs[i] = $.merge(false, tmpFoundDocs[i],{"agendaType":tmpReport.found[i].correct})
    //         if (tmpFoundDocs[i]) {
    //             var tmpDoc = tmpFoundDocs[i];
    //             for (let index = 0; index < tmpBackup.length; index++) {
    //                 var tmpBackupFN = tmpBackup[index];
    //                 var tmpBackupVal = tmpDoc[tmpBackupFN];
    //                 if( tmpBackupVal ){
    //                     tmpDoc["sys_bu_" + tmpBackupFN] = tmpBackupVal
    //                 }
    //             }
    //         }
    //     }
    // }

    for (var i = 0; i < tmpFoundDocs.length; i++) {
        if (tmpFoundDocs[i]) {
            //--- Merge in updates
            tmpFoundDocs[i] = $.merge(false, tmpFoundDocs[i], tmpUpdates)
        }
    }

    tmpReport.foundBulkResults = $.await(this.sendBulkUpdate(tmpFoundDocs));
    tmpReport.bulkCount = tmpReport.foundBulkResults.length;
    return tmpReport;
}

//--- Adds a new document (with no _rev) into this database
NoSqlDatabase.prototype.addDocument = function (theDoc) {
    let tmpConfig = $.cloneObject(this.requestConfig);
    tmpConfig.method = 'POST';
    tmpConfig.json = theDoc;
    tmpConfig.uri = '/' + this.dbname;
    let self = this;

    return new Promise(function (resolve, reject) {

        try {
           // console.log('NoSqlDatabase - addDocument - ' + tmpConfig.uri);
            if (!(self.dbname)) {
                throw 'No Database Found'
            }

            $.request(tmpConfig, function (error, response, body) {

                if (!error) {

                    if (typeof (body) === 'string') {
                        body = JSON.parse(body);
                    }
                    resolve(body);
                }
                else {
                    reject(error);
                }
            });

        } catch (error) {
            reject(error);
        }
    });
};
