/*
  Standard MongoDB Access Library
*/
'use strict';

let $ = require("./globalUtilities").$;
const { MongoClient } = require('mongodb');

//$.MongoConfig = {};
//console.log("start of mongo",$.scope.locals.path.ws);

 $.scope.locals.path.ws.mongoConfig = $.scope.locals.path.ws.root + '/mongoconfig/';
 $.fs.ensureDir($.scope.locals.path.ws.mongoConfig);
 $.MongoSession = new MongoSession();
// appdata: tmpWSDirectory + "appdata/",
// appdataAccounts: tmpWSDirectory + "appdata/accounts/",


//==== MongoSession === === === === === === === === === === 
function MongoSession(theAccountConfig) {
    this.accounts = {};
}
module.exports.MongoSession = MongoSession;
MongoSession.prototype.addAccountConfig = async function (theAccount) {
    let self = this;
    return new Promise(async function (resolve, reject) {
        try {
            var tmpBaseDir = $.scope.locals.path.ws.mongoConfig;
            var tmpID = theAccount.id || 'default'; //should always be there
            await $.bld.saveJsonFile(tmpBaseDir + 'mongo-acct-' + tmpID + '.json', theAccount);
            resolve(true);
        } catch (error) {
            reject(error);
        } 
    });
}


MongoSession.prototype.getAccountConfig = async function (theID) {
    let self = this;
    return new Promise(async function (resolve, reject) {
        try {
            var tmpBaseDir = $.scope.locals.path.ws.mongoConfig
            var tmpConfig = await $.bld.getJsonFile(tmpBaseDir + 'mongo-acct-' + theID + '.json');
            resolve(tmpConfig);
        } catch (error) {
            reject(error);
        } 
    });
}

MongoSession.prototype.getAccount = async function (theID) {
    let self = this;
    return new Promise(async function (resolve, reject) {
        try {
            if( self.accounts[theID] ){
                console.log('existing account', theID);
                resolve(self.accounts[theID]);
            } else {
                var tmpConfig = await self.getAccountConfig(theID);
                if( !(tmpConfig)){
                    console.log("ERROR: NO CONFIG.  Save one for: " + theID);
                    reject(false);
                } else {
                    console.log('new account', theID);
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
    this.loadConfig(theAccountConfig);
    
}
module.exports.MongoAccount = MongoAccount;

MongoAccount.prototype.loadConfig = async function (theAccountConfig) {
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
function MongoDatabase(theDBName) {
    this.setup(theDBName);
}
module.exports.MongoDatabase = MongoDatabase;

MongoDatabase.prototype.setup = function (theDBName) {
    this.setDBName(theDBName);
};

MongoDatabase.prototype.setDBName = function (theDBName) {
    this.dbname = theDBName || '';
};

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
