/*
  Common data access functionality, including defaults

  This controls access and provides mapping information

  Mapping information includes relative db names to actuals
    * This is great for working in -dev versions of databases

  Note that view details are stored as individual documents
  
*/
'use strict';

module.exports.setup = function setup(scope, theDataMap) {
    var config = scope;
    var dataMap = theDataMap;

    let $ = config.locals.$;
    let NoSQL = $.NoSQL
    
    var defaultDocType = dataMap.defaultDocType || '';
    var defaultAccountName = dataMap.defaultAccountName || '';
    var tmpNoSQLAccountInfo = dataMap.accounts[defaultAccountName];
    if (!(tmpNoSQLAccountInfo)) {
        throw "NoSQL default account not setup"
    }
    var accountDefault = new NoSQL.NoSqlAccount($.cloneObject(tmpNoSQLAccountInfo));
    var defaultDatabaseName = dataMap.defaultDatabaseName || '';
    

    return {
        dataMap: dataMap
        ,defaultAccountName: defaultAccountName
        ,defaultDatabaseName: defaultDatabaseName
        ,accountDefault: accountDefault
        ,getFullViewDetails: getFullViewDetails
        ,getAccount: getAccount
        ,getDatabaseForView: getDatabaseForView
        ,getDefaultDatabase: getDefaultDatabase
        ,getDetails: getDetails
        ,getDatabaseList: getDatabaseList
    }
    
    function getDatabaseList(){
        return accountDefault.getDatabaseList();

    }

    function getDetails(){
        var tmpRet = {};
        tmpRet.defaultAccountName = defaultAccountName
        tmpRet.defaultDatabaseName = defaultDatabaseName
        tmpRet.defaultDocType = defaultDocType
        tmpRet.databases = dataMap.databases

        tmpRet.defaultDatabaseRealName = '';
        if( tmpRet.defaultDatabaseName && tmpRet.databases[tmpRet.defaultDatabaseName]){
            tmpRet.defaultDatabaseRealName = tmpRet.databases[tmpRet.defaultDatabaseName];
        }
        return tmpRet;
    }

    function getAccount(theAccountName, theDataMap){
        var tmpDM = theDataMap || dataMap;
        var tmpAccountInfo = tmpDM.accounts[theAccountName];
        if (!(tmpAccountInfo)) {
            console.warn("Account not found, using default account " + defaultAccountName );
            //or ..>   throw "NoSQL account not setup " + tmpViewDetails.account
            return accountDefault;
        } else {
            return new NoSQL.NoSqlAccount($.cloneObject(tmpAccountInfo));
        }
    }

    function getDefaultDatabase(){
        if( !(defaultDatabaseName)){
            throw "No default database configured"
        }
        //--- Allow non-mapped name as default db na,e
        var tmpDBName = dataMap.databases[defaultDatabaseName] || defaultDatabaseName;
        return accountDefault.getDatabase(tmpDBName)
    }

    function getDatabaseForView(theViewDetails,theDataMap){
        var tmpViewDetails = getFullViewDetails(theViewDetails,theDataMap);
        var tmpAccount = accountDefault;
        if( theViewDetails.account){
            tmpAccount = getAccount(theViewDetails.account);
        }
        return tmpAccount.getDatabase(tmpViewDetails.db);
    }

    function getFullViewDetails(theInitialDetails,theDataMap){
        var tmpDM = theDataMap || dataMap;
        var tmpDetails = theInitialDetails;
        try {
            if (!(tmpDetails)) {
                throw "View not found"
            }
            if( !(tmpDetails.db) ){
                tmpDetails.db = defaultDatabaseName;
            }
            //--- Only allow know databases
            tmpDetails.db = tmpDM.databases[tmpDetails.db] || '';
            if( !(tmpDetails.db) ){
                throw "No database for this view or defaulit"
            }
        } catch(ex){
            tmpDetails = {error: ex.toString()}
        }
        
        return tmpDetails;
    }

    

};
