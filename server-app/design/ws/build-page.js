'use strict';
const THIS_MODULE_NAME = 'build-page';
const THIS_MODULE_TITLE = 'Process: Create page in application from details';

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
                var tmpWSDir = scope.locals.path.workspace + 'apps/';

                var tmpAppName = req.query.appname || req.query.filename || '';
                tmpAppName = tmpAppName
                    .replace('.json', '')

                if( !(tmpAppName) ){
                    throw "Application name not provided"
                }
                var tmpPageName = req.query.pagename || req.query.name || '';
                if( !(tmpPageName) ){
                    throw "Page name not provided"
                }

                    // console.log( 'tmpAppName', tmpAppName);
                var tmpAppBase = tmpWSDir + tmpAppName + '/';
                var tmpAppDetails = $.await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))
                var tmpAppTitle = tmpAppDetails.title || '';
console.log( 'tmpAppBase', tmpAppBase);
                if( !(tmpAppTitle) ){
                    throw( "Application " + tmpAppName + " not found");
                }
                var tmpPagesBase = tmpAppBase + '/app/pages/';
                var tmpPages = $.await($.bld.getDirFiles(tmpPagesBase))

                if( tmpPages.indexOf(tmpPageName) > -1){
                    throw "Page " + tmpPageName + " already exists"
                }


                var tmpPartsLoc = scope.locals.path.designer + '/build/tpl-page/';
                var tmpTpl = $.await($.bld.getTextFile(tmpPartsLoc + 'tpl-index.js'))

                var tmpTplParts = tmpTpl.split("//~");
                var tmpTplIndex = {
                    thisPageSpecs: ''
                    , layoutOptions: ''
                    , layoutConfig: ''
                    , _onPreInit: ''
                    , _onInit: ''
                    , _onFirstActivate: ''
                    , _onActivate: ''
                    , _onResizeLayout: ''
                    , YourPageCode: ''
                };
                var tmpPartName = '';
                var tmpInPart = false;
                for (var aIndex in tmpTplParts) {
                    var tmpPart = tmpTplParts[aIndex];
                   // console.log( 'tmpPart', tmpPart);
                    var tmpLen = tmpPart.length;
                    if (tmpTplIndex.hasOwnProperty(tmpPart)) {
                        tmpInPart = true;
                        tmpPartName = tmpPart;
                        //console.log( 'tmpPartName', tmpPartName);
                    } else if (tmpInPart) {
                        tmpTplIndex[tmpPartName] = aIndex; // tmpPart
                        //console.log( 'tmpPart set for ' + tmpPartName, tmpPart);
                        tmpInPart = false;
                    } else {
                       // console.log("NOT ANYWHERE", tmpPart)
                    }

                }
                // console.log( 'tmpTplParts', tmpTplParts);
                var tmpRet = {
                    testing: true,
                    len: tmpTplParts.length,
                    index: tmpTplIndex
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
};





