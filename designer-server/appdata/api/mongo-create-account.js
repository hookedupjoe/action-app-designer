'use strict';
const THIS_MODULE_NAME = 'mongo-create-account';
const THIS_MODULE_TITLE = 'Data: Create Locally Stored Account Details';

module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;
    var Mongo = $.Mongo;
    
    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }
    var base = Route.prototype;

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
                
                var tmpNewConfig = {
                    "id": tmpBody.id,
                    "address": tmpBody.address,
                    "port": tmpBody.port,
                    "username": tmpBody.username || '',
                    "password": tmpBody.password || ''
                }
                var tmpCallRet = await $.MongoManager.addAccountConfig(tmpNewConfig);
                // var tmpAccountID = 'aws';
                // var tmpAccount = await $.MongoManager.getAccount(tmpAccountID);

                // try {
                //     var tmpDBList = await tmpAccount.getDatabaseList();
                //     //tmpDBList.databases.forEach(db => console.log(`Name: ${db.name}`));
                // } catch (e) {
                //     console.error(e);
                // }


                var tmpRet = {success:true};
                tmpRet = $.merge(false, tmpRet, tmpCallRet);

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





