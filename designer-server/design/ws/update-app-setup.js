'use strict';
const THIS_MODULE_NAME = 'update-app-setup';
const THIS_MODULE_TITLE = 'Update setup info and rebuild as needed';

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
       
        var tmpBody = req.body || {};
        // console.log( 'tmpBody', tmpBody);

        if (typeof (tmpBody) == 'string') {
            try {
                tmpBody = JSON.parse(tmpBody)
            } catch (ex) {
                throw("Bad JSON Passed")
            }
        }
        var tmpAppName = tmpBody.appname || tmpBody.name || '';
        if( !(tmpAppName) ){
            throw("No app name passed")
        }

        return bld.updateAppSetup(tmpAppName, tmpBody, scope)
       


    }





    //====== IMPORTANT --- --- --- --- --- --- --- --- --- --- 
    //====== End of Module / setup ==== Nothing new below this
    return $.async(function processReq(req, res, next) {
        try {
            var tmpRoute = new Route();
            var tmpResults = $.await(tmpRoute.run(req, res, next));

            //--- Getting documents to use directly by source, 
            //    .. do not wrap the success flag
            res.json(tmpResults)
        } catch (ex) {
            res.json({ status: false, error: ex.toString() })
        }
    })
};





