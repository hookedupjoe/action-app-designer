'use strict';
const THIS_MODULE_NAME = 'get-db-list';
const THIS_MODULE_TITLE = 'Data: Get Databases Available';

module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;
    var Mongo = $.Mongo;

    //--- Temp hard code define
    var tmpAccountInfo = {
        "address": "127.0.0.1",
        "port": "27017",
        "username": "YOURNAME",
        "password": "YOURPASS"
    };
    var accountDefault = new Mongo.MongoAccount(tmpAccountInfo);
    console.log(accountDefault.getConfig());
    
    const { MongoClient } = require('mongodb');
    var databasesList;

    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }
    var base = Route.prototype;

    var $ = config.locals.$;

    async function listDatabases(client){
        databasesList = await client.db().admin().listDatabases();
    
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };
    async function createListing(client, newListing){
        const result = await client.db("airbnb").collection("listingsAndReviews").insertOne(newListing);
        console.log(`New listing created with the following id: ${result.insertedId}`);
    };
    

    
    //--- Load the prototype
    base.run = async function (req, res, next) {
        var self = this;
        return new Promise( async function (resolve, reject) {
            try {

                try {
                    var tmpDBList = await accountDefault.getDatabaseList();
                    tmpDBList.databases.forEach(db => console.log(`Name: ${db.name}`));
                } catch (e) {
                    console.error(e);
                }


                var tmpRet = {
                    dbs: tmpDBList
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





