'use strict';
const THIS_MODULE_NAME = 'save-resource';
const THIS_MODULE_TITLE = 'Process: Save a resource';

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
                var tmpBody = req.body || {};
                if (typeof (tmpBody) == 'string') {
                    try {
                        tmpBody = JSON.parse(tmpBody)
                    } catch (ex) {
                        throw("Bad JSON Passed")
                    }
                }

                var tmpWSDir = scope.locals.path.ws.uiApps;
                var tmpPagesDir = scope.locals.path.ws.pages;

                var tmpReq = tmpBody;

                var tmpAppName = tmpReq.appname || '';
                var tmpResName = tmpReq.resname || '';
                var tmpResType = tmpReq.restype || '';
                var tmpPageName = tmpReq.pagename || '';

                var tmpTarget = 'workspace';
                if( tmpAppName ){
                    tmpTarget = 'app';
                }
                var tmpResDetails = {
                    dir: ''
                };
                if( tmpResType ){
                    tmpResDetails = $.bld.detailsIndex.getDetails(tmpResType);
                }
                if (!(tmpPageName)) {
                    throw "Page name not provided"
                }
                if ( typeof(tmpReq.content) != 'string' ){
                    throw 'No text content provided';
                }

                var tmpPagesBase = tmpPagesDir;

                if( tmpAppName ){
                    var tmpAppBase = tmpWSDir + tmpAppName + '/';

                    var tmpAppDetails = $.await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))
                    var tmpAppTitle = tmpAppDetails.title || '';
    
                    if (!(tmpAppTitle)) {
                        throw ("Application " + tmpAppName + " not found at " + tmpAppBase);
                    }

                    tmpPagesBase = tmpAppBase + 'app/pages/';

                    var tmpPages = $.await($.bld.getDirFiles(tmpPagesBase))

                    if (tmpPages.indexOf(tmpPageName) == -1) {
                        throw "Page " + tmpPageName + " does not exists"
                    }

                }
       
                var tmpPageBase = tmpPagesBase + tmpPageName ;

                var tmpContentBase = tmpPageBase + '/' + tmpResDetails.dir;
                var tmpFN = tmpContentBase + '/' + tmpResName;
                $.await($.fs.writeFile(tmpFN, tmpReq.content));

                var tmpRet = {
                    status: true,
                    filename: tmpFN
                }

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





