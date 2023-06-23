'use strict';
const THIS_MODULE_NAME = 'get-db-list';
const THIS_MODULE_TITLE = 'Data: Get Databases Available';

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

                /* 
                //--- Programmatic add

                var tmpNewConfig = {
                    "id": "aws",
                    "address": "YOURIP",
                    "port": "27017",
                    "username": "USERNAME",
                    "password": "PASSWORD"
                }
                await $.MongoSession.addAccountConfig(tmpNewConfig);
                */

                // var tmpAccountInfo = await $.MongoSession.getAccountConfig('localadmin');
              
                // var accountDefault = new Mongo.MongoAccount(tmpAccountInfo);
                
                //var tmpAccountID = 'localadmin';
                var tmpAccountID = 'aws';
                var tmpAccount = await $.MongoSession.getAccount(tmpAccountID);

                try {
                    var tmpDBList = await tmpAccount.getDatabaseList();
                    //tmpDBList.databases.forEach(db => console.log(`Name: ${db.name}`));
                } catch (e) {
                    console.error(e);
                }


                var tmpRet = {};
                tmpRet = $.merge(false, tmpRet, tmpDBList);

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





