/*
  Standard MongoDB Access Library
*/
'use strict';
const bcrypt = require("bcrypt")

let $,
    scope,
    AuthMgr;

    
function setup(theScope) {
    scope = theScope;
    $ = scope.$;
    AuthMgr = new AuthManager();
    $.AuthMgr = AuthMgr;
    //console.log('setup auth',typeof($.AuthMgr));
}

module.exports.setup = setup;

function AuthManager(theOptions) {
    this.authOptions = theOptions || {};
    
}
var meAuthManager = AuthManager.prototype;
module.exports.AuthManager = AuthManager;

meAuthManager.saveUser = function(theUser, theOptions){
    return new Promise( async function (resolve, reject) {
        try {
            var tmpUser = theUser;
            
            var tmpAccount = await $.MongoManager.getAccount('_home');
            var tmpDB = await tmpAccount.getDatabase('actappauth');
            var tmpDocType = 'user';
            var tmpCollName = 'actapp-'  + tmpDocType;

            var tmpAddRet = false;
            var tmpID = tmpUser.data._id || false;
            //--- Remove ID (even if blank) for add / edit operations
            if( tmpUser.data.hasOwnProperty('_id')){
                delete tmpUser.data._id;
            }
            if( tmpUser.data.password ){
                tmpUser.data.password = await bcrypt.hash(tmpUser.data.password, 10);
            }
            
            if( tmpID ){
                var tmpCollection = await tmpDB.getCollection(tmpCollName);
                var tmpUD =  { $set: tmpUser.data };
                tmpAddRet = await tmpCollection.updateOne({_id: new ObjectId(tmpID)}, tmpUD)

            } else {
                tmpAddRet = await tmpDB.createDoc(tmpCollName, tmpUser.data);
            }
           
            var tmpRet = {success:true};
            tmpRet = $.merge(false, tmpRet, tmpAddRet);

            resolve(tmpRet);

        }
        catch (error) {
            console.log('Err : ' + error);
            reject(error);
        }

    });

}

meAuthManager.getUsers = function(){
    return new Promise( async function (resolve, reject) {
        try {
            var tmpAccount = await $.MongoManager.getAccount('_home');
            var tmpDB = await tmpAccount.getDatabase('actappauth');
            var tmpDocType = 'user';
            var tmpMongoDB = tmpDB.getMongoDB();
            var tmpDocs = await tmpMongoDB.collection('actapp-' + tmpDocType).find().filter({__doctype:tmpDocType}).toArray();
            var tmpRet = {success:true};
            tmpRet = $.merge(false, tmpRet, {data:tmpDocs});
            resolve(tmpRet);
        }
        catch (error) {
            console.log('Err : ' + error);
            reject(error);
        }
    });
}