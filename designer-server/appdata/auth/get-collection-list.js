'use strict';
const THIS_MODULE_NAME = 'get-collection-list';
const THIS_MODULE_TITLE = 'Data: Get Collections Available';

module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;
    
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
                var tmpAccountID = req.query.account || '_home';
                var tmpDBName = req.query.database || 'local';
                var tmpRet = {};
                try {
                    var tmpAccount = await $.MongoManager.getAccount(tmpAccountID);
                    var tmpDB = await tmpAccount.getDatabase(tmpDBName);
                    tmpRet.collections = await tmpDB.getCollectionList();
                } catch (e) {
                    console.error(e);
                }

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





