'use strict';
const THIS_MODULE_NAME = 'page-code';
const THIS_MODULE_TITLE = 'Process: Get and update page code';

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
               
                var tmpReq = {
                    source: req.query.source || 'app',
                    name: req.query.name || req.query.appname,
                    pagename: req.query.pagename
                }

                if( !(tmpReq.pagename)){
                    throw "No page name provided";
                }

                var tmpSourceDir = scope.locals.path.ws.uiApps 
                var tmpPagesDir = scope.locals.path.ws.pages;
                if( tmpReq.source == 'workspace'){
                    tmpSourceDir = tmpPagesDir;
                }
                var tmpPageName = tmpReq.pagename;

                var tmpPartsLoc = tmpSourceDir + tmpPageName;

                var tmpTpl = $.await($.bld.getTextFile(tmpPartsLoc + '/index.js'))

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
                        tmpInPart = false;
                    }

                }

                var tmpRet = {
                    status: true,
                    loc: tmpPartsLoc,
                    index: tmpTplIndex,
                    parts: tmpTplParts
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





