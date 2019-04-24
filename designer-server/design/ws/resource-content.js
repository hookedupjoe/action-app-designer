'use strict';
const THIS_MODULE_NAME = 'resource-content';
const THIS_MODULE_TITLE = 'Process: Get resource content';

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
    base.run = function (req, res, next) {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {
               
                var tmpReq = req.query;

                if( !(tmpReq.resname && tmpReq.restype)){
                    throw "No resource name and type provided";
                }

                var tmpResName = tmpReq.resname || '';
                var tmpResType = tmpReq.restype || '';
                var tmpAppsDir = scope.locals.path.ws.uiApps; 
                var tmpPagesDir = scope.locals.path.ws.pages;
                var tmpSourceDir = tmpPagesDir;

                if( tmpReq.source == 'app' && tmpReq.appname){
                    tmpSourceDir = tmpAppsDir + tmpReq.appname + '/app/pages/';
                }
                
                var tmpRet = '<h2>Testing</h2><p>hello</p>';

                resolve(tmpRet);

            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }

        }));



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


    function wrapIt(theString) {
        return '\r\n\r\n' + theString + '\r\n\r\n'
    }
};





