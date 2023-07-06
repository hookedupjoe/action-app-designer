'use strict';
const THIS_MODULE_NAME = 'save-user';
const THIS_MODULE_TITLE = 'Data: Save New User in MongoDB';
//ToDo: Also create mongo user details?
//      roles?
module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;
    const bcrypt = require("bcrypt")

    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }
    var base = Route.prototype;
    const { ObjectId } = require('mongodb');
    
    var $ = config.locals.$;

    //--- Load the prototype
    base.run = async function (req, res, next) {
        var self = this;
        return new Promise( async function (resolve, reject) {
            try {
                var tmpBody = req.body || {};
                if (typeof (tmpBody) == 'string') {
                    try {
                        tmpBody = JSON.parse(tmpBody)
                    } catch (ex) {
                        throw("Bad JSON Passed")
                    }
                }
                
                
                var tmpAccount = await $.MongoManager.getAccount('_home');
                var tmpDB = await tmpAccount.getDatabase('actappauth');
                var tmpDocType = 'user';
                var tmpCollName = 'actapp-'  + tmpDocType;

                //--- ToDo: Refactor this ...
                var tmpAddRet = false;
                var tmpID = tmpBody.data._id || false;
                //--- Remove ID (even if blank) for add / edit operations
                if( tmpBody.data.hasOwnProperty('_id')){
                    delete tmpBody.data._id;
                }
                if( tmpBody.data.password ){
                    tmpBody.data.password = await bcrypt.hash(tmpBody.data.password, 10);
                }
                
                if( tmpID ){
                    var tmpCollection = await tmpDB.getCollection(tmpCollName);
                    var tmpUD =  { $set: tmpBody.data };
                    tmpAddRet = await tmpCollection.updateOne({_id: new ObjectId(tmpID)}, tmpUD)

                } else {
                    tmpAddRet = await tmpDB.createDoc(tmpCollName, tmpBody.data);
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





    //====== IMPORTANT --- --- --- --- --- --- --- --- --- --- 
    //====== End of Module / setup ==== Nothing new below this
    return  async function processReq(req, res, next) {
        try {
            var tmpRoute = new Route();
            var tmpResults = await(tmpRoute.run(req, res, next));

            //--- Getting documents to use directly by source, 
            //    .. do not wrap the success flag
            res.json(tmpResults)
        } catch (ex) {
            res.json({ status: false, error: ex.toString() })
        }
    }
};





