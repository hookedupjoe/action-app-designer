/*
  Standard MongoDB Access Library
*/
'use strict';

let $ = require("./globalUtilities").$;
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

 $.scope.locals.path.ws.mongoConfig = $.scope.locals.path.ws.root + '/mongoconfig/';
 $.scope.locals.path.ws.mongoConfigAccounts = $.scope.locals.path.ws.mongoConfig + '/accounts/';

 //--- ToDo: This this only once or if not found?  
 $.fs.ensureDir($.scope.locals.path.ws.mongoConfig);
 $.fs.ensureDir($.scope.locals.path.ws.mongoConfigAccounts);

 $.MongoManager = new MongoManager();

//==== MongoManager === === === === === === === === === === 
function MongoManager(theAccountConfig) {
    this.accounts = {};
}
MongoManager.prototype.ObjectId = function( theObjID ){
    return new ObjectId(theObjID);
};
module.exports.MongoManager = MongoManager;
MongoManager.prototype.addAccountConfig = async function (theAccount) {
    let self = this;
    return new Promise(async function (resolve, reject) {
        try {
            var tmpBaseDir = $.scope.locals.path.ws.mongoConfigAccounts;
            var tmpID = theAccount.id || 'default'; //should always be there
            await $.bld.saveJsonFile(tmpBaseDir + tmpID + '.json', theAccount);
            resolve(true);
        } catch (error) {
            reject(error);
        } 
    });
}

MongoManager.prototype.getAccountConfig = async function (theID) {
    let self = this;
    return new Promise(async function (resolve, reject) {
        try {
            var tmpBaseDir = $.scope.locals.path.ws.mongoConfigAccounts;
            var tmpConfig = await $.bld.getJsonFile(tmpBaseDir + theID + '.json');
            resolve(tmpConfig);
        } catch (error) {
            reject(error);
        } 
    });
}

MongoManager.prototype.getAccountConfigs = async function () {
    var tmpBaseDir = $.scope.locals.path.ws.mongoConfigAccounts;
    var tmpFiles = await($.bld.getDirFiles(tmpBaseDir));
    var tmpRet = {accounts:[]}
    for (var index in tmpFiles) {
        var tmpFileName = tmpFiles[index];
        if( tmpFileName.indexOf('.json') > -1){
            var tmpDetails = await($.bld.getJsonFile(tmpBaseDir + tmpFileName))
            tmpRet.accounts.push(tmpDetails);
        }
        if( tmpRet.accounts.length == 0){
            tmpRet.isNew = true;
        }
    }
    return tmpRet;
}

MongoManager.prototype.getAccount = async function (theID) {
    let self = this;
    return new Promise(async function (resolve, reject) {
        try {
            if( self.accounts[theID] ){
                resolve(self.accounts[theID]);
            } else {
                var tmpConfig = await self.getAccountConfig(theID);
                if( !(tmpConfig)){
                    console.log("ERROR: NO CONFIG.  Save one for: " + theID);
                    resolve(false);
                } else {                    
                    self.accounts[theID] = new MongoAccount(tmpConfig);
                    resolve(self.accounts[theID]);
                }
            }
        } catch (error) {
            reject(error);
        } 
    });
}







//==== MongoAccount === === === === === === === === === === 
function MongoAccount(theAccountConfig) {
    this.accountConfig = false;
    this.databases = {};
    this.loadConfig(theAccountConfig);
    
}
module.exports.MongoAccount = MongoAccount;

MongoAccount.prototype.loadConfig = async function (theAccountConfig) {
    try {
        if (!theAccountConfig) {
            throw "Config not provided"
        }
        var tmpConfig = $.cloneObject(theAccountConfig);
        if (!tmpConfig.id) {
            throw "id not provided"
        }
        if (!tmpConfig.address) {
            throw "address not provided"
        }
        if (!tmpConfig.port) {
            tmpConfig.username = '27017'; 
        }
        if (!tmpConfig.username) {
            tmpConfig.username = '';
        }
        if (!tmpConfig.password) {
            tmpConfig.password = '';
        }
    } catch (error) {
        console.log("Error in mongo account creation", error);
    }
    this.accountConfig = tmpConfig;
    //--- ToDO: See if running and not allow or reset needed?
    var tmpAuth = '';
    if( tmpConfig.username && tmpConfig.password){
        //ToDo: Need only username?
        tmpAuth = tmpConfig.username  + ':' + tmpConfig.password;
    }
    var tmpConfigOptions = 'retryWrites=true&w=majority';
    var tmpURI = 'mongodb://' + tmpAuth +'@' + tmpConfig.address + ':' + tmpConfig.port + '/?' + tmpConfigOptions;
    //--- ToDo: What are the options and why?
    this.client = new MongoClient(tmpURI, { useUnifiedTopology: true });
    //--- Stay connected?
    await this.client.connect();
};

MongoAccount.prototype.close = async function () {
    return this.client.close();
}
MongoAccount.prototype.connect = async function () {
    return this.client.connect();
}

MongoAccount.prototype.getDatabase = async function (theName) {
    let self = this;
    return new Promise(async function (resolve, reject) {
        try {
            if( self.databases[theName] ){
                resolve(self.databases[theName]);
            } else {
                var tmpMongoDB = self.client.db(theName);
                var tmpNewDB = new MongoDatabase(theName, tmpMongoDB, self);
                self.databases[theName] = tmpNewDB;
                resolve(tmpNewDB);
            }
        } catch (error) {
            reject(error);
        } 
    });
}


MongoAccount.prototype.getConfig = function () {
    return this.accountConfig;
}

MongoAccount.prototype.getDatabaseList = async function () {
    let self = this;

    return new Promise(async function (resolve, reject) {

        try {
            var client = self.client;
            
            var databasesList = await client.db().admin().listDatabases();
            resolve(databasesList);
        } catch (error) {
            reject(error);
        } 
    });
}


//==== MongoDatabase === === === === === === === === === === 
function MongoDatabase(theDBName, theDB, theAccount) {
    this.setup(theDBName, theDB, theAccount);
}
module.exports.MongoDatabase = MongoDatabase;

MongoDatabase.prototype.setup = function (theDBName, theDB, theAccount) {
    this.collections = {};
    this.account = theAccount;
    this.db = theDB;
    this.setDBName(theDBName);
};




MongoDatabase.prototype.setDBName = function (theDBName) {
    this.dbname = theDBName || '';
};

MongoDatabase.prototype.getCollectionList = async function () {
    let self = this;

    return new Promise(async function (resolve, reject) {

        try {
            //var client = self.client;

            
            var tmpList = await self.db.listCollections().toArray();
            resolve(tmpList);
        } catch (error) {
            reject(error);
        } 
    });
}


MongoDatabase.prototype.createDoc = async function (theCollectionName, theDoc) {
    let self = this;

    return new Promise(async function (resolve, reject) {

        try {
            var tmpRunRet = await self.db.collection(theCollectionName).insertOne(theDoc);
            resolve(tmpRunRet);
        } catch (error) {
            reject(error);
        } 
    });
}


MongoDatabase.prototype.getMongoDB = function () {
   return this.db;
}



MongoDatabase.prototype.getCollection = async function (theName) {
    let self = this;

    return new Promise(async function (resolve, reject) {

        try {
            var tmpRunRet = await self.db.collection(theName)
            resolve(tmpRunRet);
        } catch (error) {
            reject(error);
        } 
    });
}


MongoDatabase.prototype.createCollection = async function (theName) {
    let self = this;

    return new Promise(async function (resolve, reject) {

        try {
            var tmpRunRet = await self.db.createCollection(theName)
            resolve(tmpRunRet);
        } catch (error) {
            reject(error);
        } 
    });
}

MongoDatabase.prototype.getDesignElements = function () {
    //ToDO: var tmpURI = '/_all_docs?inclusive_end=false&start_key=\"_design\"&end_key=\"_design0\"';
    //return this.getRows(tmpURI,{valueAsDoc:true})    
}

//--- Adds a new document (with no _rev) into this database
MongoDatabase.prototype.addDocument = function (theDoc) {
    //TODO

    // let tmpConfig = $.cloneObject(this.requestConfig);
    // tmpConfig.method = 'POST';
    // tmpConfig.json = theDoc;
    // tmpConfig.uri = '/' + this.dbname;
    // let self = this;

    // return new Promise(function (resolve, reject) {

    //     try {
    //        // console.log('MongoDatabase - addDocument - ' + tmpConfig.uri);
    //         if (!(self.dbname)) {
    //             throw 'No Database Found'
    //         }

    //         $.request(tmpConfig, function (error, response, body) {

    //             if (!error) {

    //                 if (typeof (body) === 'string') {
    //                     body = JSON.parse(body);
    //                 }
    //                 resolve(body);
    //             }
    //             else {
    //                 reject(error);
    //             }
    //         });

    //     } catch (error) {
    //         reject(error);
    //     }
    // });
};
