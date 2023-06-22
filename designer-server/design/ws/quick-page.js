'use strict';
const THIS_MODULE_NAME = 'quick-page';
const THIS_MODULE_TITLE = 'Process: Create new page using minimal details';

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
        return new Promise( async function (resolve, reject) {
            try {
                var tmpWSDir = scope.locals.path.ws.uiApps;
                var tmpReq = {
                    appname: req.query.appname,
                    pagename: req.query.pagename,
                    pagetitle: req.query.pagetitle || req.query.pagename
                }

                var tmpAppName = tmpReq.appname;
                tmpAppName = tmpAppName
                    .replace('.json', '')

                if (!(tmpAppName)) {
                    throw "Application name not provided"
                }
                var tmpPageName = tmpReq.pagename || '';
                if (!(tmpPageName)) {
                    throw "Page name not provided"
                }

                var tmpPageTitle = tmpReq.pagetitle || '';

                var tmpSpecs = {
                    pageName: tmpPageName,
                    pageTitle: tmpPageTitle,
                    navOptions: {
                        topLink: true,
                        sideLink: true
                    }
                }

                var tmpThisPageSpecsText = 'var thisPageSpecs = ' + JSON.stringify(tmpSpecs, null, '\t');

                var tmpAppBase = tmpWSDir + tmpAppName + '/';
                var tmpAppDetails = await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))
                var tmpAppTitle = tmpAppDetails.title || '';

                if (!(tmpAppTitle)) {
                    throw ("Application " + tmpAppName + " not found");
                }
                var tmpPagesBase = tmpAppBase + '/app/pages/';
                var tmpPages = await($.bld.getDirFiles(tmpPagesBase))

                if (tmpPages.indexOf(tmpPageName) > -1) {
                    //  throw "Page " + tmpPageName + " already exists"
                }


                var tmpPartsLoc = scope.locals.path.designer + '/build/tpl-page/';
                var tmpTpl = await($.bld.getTextFile(tmpPartsLoc + 'tpl-index.js'))

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

                var tmpThisPageSpecsPos = tmpTplIndex['thisPageSpecs'];
                if (tmpThisPageSpecsPos !== '') {
                    tmpTplParts[tmpThisPageSpecsPos] = wrapIt(tmpThisPageSpecsText);
                    tmpThisPageSpecsText = tmpThisPageSpecsText + '\t';
                }

                var tmpNewPage = tmpTplParts.join("//~");

                var tmpNewPageBase = tmpPagesBase + tmpPageName + '/';

                await($.fs.ensureDir(tmpNewPageBase))
                await($.fs.writeFile(tmpNewPageBase + 'index.js', tmpNewPage))

                var tmpRet = {
                    status: true,
                    page: tmpNewPage
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


    function wrapIt(theString) {
        return '\r\n\r\n' + theString + '\r\n\r\n'
    }
};





