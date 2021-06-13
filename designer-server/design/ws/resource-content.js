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
                var tmpCatsDir = scope.locals.path.ws.catalogs; 
                var tmpPagesDir = scope.locals.path.ws.pages;
                var tmpSourceDir = tmpPagesDir;

                if(tmpReq.appname){
                    tmpSourceDir = tmpAppsDir + tmpReq.appname;
                    if( tmpReq.pagename ){
                        tmpSourceDir += '/app/pages/' + tmpReq.pagename;
                    } else {
                        tmpSourceDir += '/catalog/';
                    }
                    if( tmpResType == 'Panel' ){
                        tmpSourceDir += '/panels/'
                        tmpSourceDir += tmpResName;
                    } else if( tmpResType == 'Control' ){
                        tmpSourceDir += '/controls/'
                        tmpSourceDir += tmpResName + '/control.js';
                    } else if( tmpResType == 'HTML' ){
                        tmpSourceDir += '/html/'
                        tmpSourceDir += tmpResName;
                    } else if( tmpResType == 'Template' ){
                        tmpSourceDir += '/tpl/'
                        tmpSourceDir += tmpResName;
                    } 
                } else  if(tmpReq.catname){
                    tmpSourceDir = tmpCatsDir + tmpReq.catname + '/';
                    if( tmpResType == 'Panel' ){
                        tmpSourceDir += '/panels/'
                        tmpSourceDir += tmpResName;
                    } else if( tmpResType == 'Control' ){
                        tmpSourceDir += '/controls/'
                        tmpSourceDir += tmpResName + '/control.js';
                    } else if( tmpResType == 'HTML' ){
                        tmpSourceDir += '/html/'
                        tmpSourceDir += tmpResName;
                    } else if( tmpResType == 'Template' ){
                        tmpSourceDir += '/tpl/'
                        tmpSourceDir += tmpResName;
                    } 
                }

                var tmpRet = 'Location is ' + tmpSourceDir;
                var tmpContent = $.await($.bld.getTextFile(tmpSourceDir));
                resolve(tmpContent);

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





