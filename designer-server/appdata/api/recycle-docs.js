'use strict';
const THIS_MODULE_NAME = 'recycle-docs';
const THIS_MODULE_TITLE = 'Data: Recycle Action App Docs in MongoDB';
//ToDo: Save and Create as one .. just save?  
//      Add a flag for create?
module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;
        
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
                
                var tmpAccount = await $.MongoManager.getAccount(tmpBody.accountid);
                var tmpDB = await tmpAccount.getDatabase(tmpBody.dbname);
                var tmpDocType = tmpBody.doctype || '';
                var tmpCollName = 'actapp-'  + tmpDocType;
                var tmpProcIds = [];

                var tmpColl = await tmpDB.getCollection(tmpCollName)
                for( var iPos in tmpBody.ids ){
                    var tmpID = tmpBody.ids[iPos];
                    tmpProcIds.push(new ObjectId(tmpID));
                }
                var tmpUD =  { $set: { '__doctype' : '_deleted' } }
                var tmpQuery = { _id: { $in: tmpProcIds } };
                var tmpRunRet = await tmpColl.updateMany(tmpQuery, tmpUD);
                var tmpRet = {success:true};
                tmpRet = $.merge(false, tmpRet, tmpRunRet);

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





