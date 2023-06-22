'use strict';
const THIS_MODULE_NAME = 'build-app';
const THIS_MODULE_TITLE = 'Create application files for specified app';

module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;

    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }
    var base = Route.prototype;

    var $ = config.locals.$;
    var bld = $.bld;

    //--- Load the prototype
    base.run = function (req, res, next) {
        var self = this;
        var tmpAppName = req.query.appname || req.query.name || req.query.filename || '';
        return bld.buildApp(tmpAppName, scope)
       


    }





    //====== IMPORTANT --- --- --- --- --- --- --- --- --- --- 
    //====== End of Module / setup ==== Nothing new below this
    return async function processReq(req, res, next) {
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





