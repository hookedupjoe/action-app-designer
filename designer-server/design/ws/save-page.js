'use strict';
const THIS_MODULE_NAME = 'save-page';
const THIS_MODULE_TITLE = 'Process: Save page';

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

                var tmpResDetails = {
                    dir: ''
                };
                if( tmpResType ){
                    tmpResDetails = $.bld.detailsIndex.getDetails(tmpResType);
                }
                if (!(tmpPageName)) {
                    throw "Page name not provided"
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
       
                var tmpNewCodeIndex = tmpReq.code || [];
                var tmpPageBase = tmpPagesBase + tmpPageName + '/';
                
                var tmpPartsLoc = scope.locals.path.designer + '/build/tpl-page/';
                var tmpTpl = $.await($.bld.getTextFile(tmpPartsLoc + 'tpl-index.js'))

                var tmpTplParts = tmpTpl.split("//~");
                var tmpTplIndex = {
                    thisPageSpecs: ''
                    , layoutOptions: ''
                    , layoutConfig: ''
                    , required: ''
                    , _onPreInit: ''
                    , _onInit: ''
                    , _onFirstActivate: ''
                    , _onFirstLoad: ''
                    , _onActivate: ''
                    , _onResizeLayout: ''
                    , YourPageCode: ''
                };
                var tmpPartName = '';
                var tmpInPart = false;
                for (var aIndex in tmpTplParts) {
                    var tmpPart = tmpTplParts[aIndex];
                    if (tmpTplIndex.hasOwnProperty(tmpPart)) {
                        tmpInPart = true;
                        tmpPartName = tmpPart;
                    } else if (tmpInPart) {
                        tmpTplIndex[tmpPartName] = aIndex;
                        //--- ToDo: Check to see if changed?
                        //--- replace out this part with new code
                        tmpTplParts[aIndex] = tmpNewCodeIndex[tmpPartName];
                        tmpInPart = false;
                    }

                }

                var tmpNewPage = tmpTplParts.join("//~");

                $.await($.fs.ensureDir(tmpPageBase));
                $.await($.fs.writeFile(tmpPageBase + 'index.js', tmpNewPage));

                var tmpRet = {
                    status: true,
                    tmpPageBase: tmpPageBase,
                    fn: tmpPageBase + 'index.js',
                    page: tmpNewPage
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





