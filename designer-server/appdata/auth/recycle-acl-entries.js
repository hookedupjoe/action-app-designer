'use strict';
const THIS_MODULE_NAME = 'recycle-acl-entries';
const THIS_MODULE_TITLE = 'Auth: Recycle ACL Entry Docs';
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
        var tmpBody = req.body || {};
        if (typeof (tmpBody) == 'string') {
            try {
                tmpBody = JSON.parse(tmpBody)
            } catch (ex) {
                throw("Bad JSON Passed")
            }
        }
        return $.AuthMgr.getAclEntries(tmpBody);
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





