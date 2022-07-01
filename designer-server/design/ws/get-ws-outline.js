'use strict';
const THIS_MODULE_NAME = 'get-ws-outline';
const THIS_MODULE_TITLE = 'Panel: Get outline from workspace';

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
                var tmpCatName = req.query.catname || '';
                var tmpAppName = req.query.appname || '';
                var tmpPageName = req.query.pagename || '';
                var tmpType = req.query.type || '';
                var tmpWSDir = scope.locals.path.ws.uiApps;
                var tmpPagesDir = scope.locals.path.ws.pages;
                var tmpCatsDir = scope.locals.path.ws.catalogs;

                //todo: scope.locals.ports.preview on init not here
                var tmpPreviewPort = process.env.PREVIEWPORT || 33461;
                scope.locals.ports = scope.locals.ports || {};
                scope.locals.ports.preview = tmpPreviewPort;

                  
                var tmpResponse = false;
                if (tmpAppName && tmpType == 'pages') {

                    var tmpBase = {
                        "ctl": "tbl-ol-node",
                        "type": "pages",
                        "name": "pages",
                        "item": "",
                        "details": ".../pages",
                        "meta": "&#160;",
                        "classes": "ws-outline",
                        "level": 3,
                        "icon": "columns",
                        "color": "black",
                        "group": "workspace-outline",
                        "content": []
                    }
                    tmpResponse = $.await(getPagesNode({ appname: tmpAppName }));

                    tmpBase.content = tmpResponse.content;


                    var tmpRet = {
                        "options": {
                            padding: false
                        },
                        "content": [tmpBase]
                    }

                    resolve(tmpRet);
                    
                } else if (tmpCatName && tmpType == 'resources') {
                   

                    var tmpRes = false;

                    var tmpCatBase = tmpCatsDir + tmpCatName + '/';
                    tmpRes = $.await(getWSResourcesNode({baseURL: tmpCatBase, catname: tmpCatName}));

                    //--- To assure proper css applied to outline
                    tmpRes.classes = "ws-outline"

                    var tmpRet = {
                        "options": {
                            padding: false,
                        },
                        "content": [tmpRes]
                    }

                    resolve(tmpRet);
                } else if (tmpAppName && tmpType == 'resources') {

                    var tmpRes = false;

                    if( tmpPageName ){
                        var tmpPageBase = tmpPagesDir + tmpPageName + '/';
                        tmpRes = $.await(getWSResourcesNode({baseURL: tmpPageBase, appname: tmpAppName, pagename: tmpPageName}));
                      
                    }  else {
                        var tmpAppBase = tmpWSDir + tmpAppName + '/';
                        tmpRes = $.await(getWSResourcesNode({baseURL: tmpAppBase + 'catalog/', appname: tmpAppName}));
                    }

                    //--- To assure proper css applied to outline
                    tmpRes.classes = "ws-outline"

                    var tmpRet = {
                        "options": {
                            padding: false,
                        },
                        "content": [tmpRes]
                    }

                    resolve(tmpRet);
                } else {
                    tmpResponse = $.await(getFullWorkspace(req, res, next))
                    tmpResponse.options.extra = {previewPort:tmpPreviewPort};
                    resolve(tmpResponse);
                }




            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }

        }));
    }


    function getFullWorkspace(req, res, next) {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {



                var tmpBase = {
                    "ctl": "tbl-ol-node",
                    "type": "workspace",
                    "name": "workspace",
                    "item": "",
                    "details": "Workspace",
                    "meta": "&#160;",
                    "classes": "ws-outline",
                    "level": 3,
                    "icon": "hdd outline",
                    "color": "black",
                    "group": "workspace-outline",
                    "content": []
                }

                var tmpAppsNode = $.await(getApplicationsNode());
                tmpBase.content.push(tmpAppsNode);
                var tmpCatsNode = $.await(getCatalogsNode());
                tmpBase.content.push(tmpCatsNode);
                // var tmpCataNode = $.await(getCatalogsNode());
                // tmpBase.content.push(tmpCataNode);
                // var tmpWSNode = $.await(getWSResourcesNode());
                // tmpBase.content.push(tmpWSNode);
                // var tmpPagesNode = $.await(getPagesNode());
                // tmpBase.content.push(tmpPagesNode);

                var tmpRet = {
                    "options": {
                        padding: false,
                        "css": [
                            ".ws-outline table.outline > tbody > tr[oluse=\"select\"] {",
                            "  cursor: pointer;",
                            "}",
                            ".ws-outline table.outline > tbody > tr[oluse=\"collapsable\"] {",
                            "  cursor: pointer;",
                            "}",
                            ".ws-outline table.outline > tbody > tr > td.tbl-label {",
                            "  width:20px;",
                            "  color:black;",
                            "  background-color: #eeeeee;",
                            "}",
                            ".ws-outline table.outline > tbody > tr.active > td.tbl-label {",
                            "  background-color: #777777;",
                            "  color: white;",
                            "}",
                            ".ws-outline table.outline > tbody > tr > td.tbl-icon {",
                            "  width:40px;",
                            "}",
                            ".ws-outline table.outline > tbody > tr > td.tbl-icon2 {",
                            "  width:80px;",
                            "}",
                            ".ws-outline table.outline > tbody > tr > td.tbl-details {",
                            "  font-weight:bolder;",
                            "  overflow:auto;",
                            "  width:auto;",
                            "}",
                            ".ws-outline table.outline > tbody > tr.active[type=\"page\"] > td.tbl-label {",
                            "  background-color: #21ba45;",
                            "}",
                            ".ws-outline table.outline > tbody > tr.active[type=\"app\"] > td.tbl-label {",
                            "  background-color: #2185d0;",
                            "}",
                            ".ws-outline table.outline > tbody > tr.active[type=\"resource\"] > td.tbl-label {",
                            "  background-color: #a333c8;",
                            "}"
                        ]
                    },
                    "content": [tmpBase]

                }

                resolve(tmpRet);

            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }

        }));
    }


    function getCatalogsNode() {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {


                var tmpBase = {
                    "ctl": "tbl-ol-node",
                    "type": "catalogs",
                    "details": "Catalogs",
                    "meta": "&#160;",
                    "classes": "ws-editor-outline",
                    "level": 2,
                    "icon": "archive",
                    "color": "black",
                    "group": "workspace-outline",
                    "content": []
                }

                var tmpBaseDir = scope.locals.path.ws.catalogs;

                var tmpFiles = $.await($.bld.getDirFiles(tmpBaseDir))

                for (var index in tmpFiles) {
                    var tmpCatName = tmpFiles[index];
                    var tmpBasePath = tmpBaseDir + tmpCatName + '/';
                    var tmpDetails = $.await($.bld.getJsonFile(tmpBasePath + 'cat-info.json'))
                    var tmpTitle = tmpDetails.title || "(untitled)";

                    var tmpCat = {
                        "ctl": "tbl-ol-node",
                        "type": "catalog",
                        "item": tmpCatName + "",
                        attr: {
                            catname: tmpCatName,
                            cattitle: tmpTitle,
                            source: "catalog"
                        },
                        "details": '[' + tmpCatName + '] ' + tmpTitle,
                        "meta": "&#160;",
                        "level": 1,
                        "icon": "archive",
                        "color": "teal",
                        "group": "workspace-outline"
                    }

                    tmpBase.content.push(tmpCat);
                }

                resolve(tmpBase);
            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }

        }));



    }


    function getApplicationsNode() {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {


                var tmpBase = {
                    "ctl": "tbl-ol-node",
                    "type": "apps",
                    "details": "Applications",
                    "meta": "&#160;",
                    "classes": "ws-editor-outline",
                    "level": 2,
                    "icon": "globe",
                    "color": "black",
                    "group": "workspace-outline",
                    "content": []
                }

                var tmpWSDir = scope.locals.path.ws.uiApps;

                var tmpFiles = $.await($.bld.getDirFiles(tmpWSDir))

                for (var index in tmpFiles) {
                    var tmpAppName = tmpFiles[index];
                    var tmpAppBase = tmpWSDir + tmpAppName + '/';
                    var tmpAppDetails = $.await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))
                    var tmpAppTitle = tmpAppDetails.title || "(untitled)";

                    var tmpApp = {
                        "ctl": "tbl-ol-node",
                        "type": "app",
                        "item": tmpAppName + "",
                        attr: {
                            appname: tmpAppName,
                            apptitle: tmpAppTitle,
                            source: "workspace"
                        },
                        "details": '[' + tmpAppName + '] ' + tmpAppTitle,
                        "meta": "&#160;",
                        "level": 1,
                        "icon": "globe",
                        "color": "blue",
                        "group": "workspace-outline"
                    }

                    tmpBase.content.push(tmpApp);
                }

                resolve(tmpBase);
            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }

        }));



    }


    function getAllApplicationsDetailsNode() {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {


                var tmpBase = {
                    "ctl": "tbl-ol-node",
                    "type": "apps",
                    "details": "Applications",
                    "meta": "&#160;",
                    "classes": "ws-editor-outline",
                    "level": 2,
                    "icon": "globe",
                    "color": "black",
                    "group": "workspace-outline",
                    "content": []
                }

                var tmpWSDir = scope.locals.path.ws.uiApps;

                var tmpFiles = $.await($.bld.getDirFiles(tmpWSDir))

                for (var index in tmpFiles) {
                    var tmpAppName = tmpFiles[index];
                    var tmpAppBase = tmpWSDir + tmpAppName + '/';
                    var tmpAppDetails = $.await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))
                    var tmpAppTitle = tmpAppDetails.title || "(untitled)";

                    var tmpApp = {
                        "ctl": "tbl-ol-node",
                        "type": "app",
                        "item": tmpAppName + "",
                        attr: {
                            appname: tmpAppName,
                            apptitle: tmpAppTitle,
                            source: "workspace"
                        },
                        "details": '[' + tmpAppName + '] ' + tmpAppTitle,
                        "meta": "&#160;",
                        "level": 2,
                        "icon": "globe",
                        "color": "blue",
                        "group": "workspace-outline"
                    }

                    var tmpPagesNode = $.await(getPagesNode({ appname: tmpAppName }));
                    tmpApp.content.push(tmpPagesNode);

                    var tmpAppRes = $.await(getWSResourcesNode({baseURL: tmpAppBase + 'catalog/', appname: tmpAppName}));

                    if (tmpAppRes && tmpAppRes.content && tmpAppRes.content.length) {
                        tmpApp.content.push(tmpAppRes);
                    }

                    tmpBase.content.push(tmpApp);

                }



                resolve(tmpBase);

            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }

        }));



    }

    function getPagesNode(theOptions) {



        return new Promise($.async(function (resolve, reject) {
            try {

                var tmpOptions = theOptions || {};
                var tmpBaseDir = '';
                if (tmpOptions.appname) {
                    tmpBaseDir = tmpOptions.appname + '/app/pages/'
                }

                var tmpTitle = "Workspace Pages"

                var tmpPagesDir = scope.locals.path.ws.pages;
                var tmpAppsDir = scope.locals.path.ws.uiApps;

                if (tmpBaseDir) {
                    tmpTitle = '.../pages';
                    tmpPagesDir = tmpAppsDir + tmpBaseDir
                }


                var tmpBase = {
                    "ctl": "tbl-ol-node",
                    "type": "pages",
                    "details": tmpTitle,
                    "meta": "&#160;",
                    "classes": "page-editor-outline",
                    "level": 2,
                    "icon": "columns",
                    "color": "black",
                    "group": "workspace-outline",
                    "content": []
                }


                var tmpFiles = $.await($.bld.getDirFiles(tmpPagesDir))

                var tmpAppName = '';
                if (tmpOptions.appname) {
                    tmpAppName = tmpOptions.appname;
                }
                for (var index in tmpFiles) {
                    var tmpPageName = tmpFiles[index];
                    var tmpPageBase = tmpPagesDir + tmpPageName + '/';
                    var tmpPageTitle = tmpPageName;
                    var tmpEntryName = tmpPageName;
                    if (tmpAppName) {
                        tmpEntryName = tmpAppName + "-" + tmpEntryName
                    } else {
                        tmpEntryName = tmpEntryName
                    }

                    var tmpPage = {
                        "ctl": "tbl-ol-node",
                        "type": "page",
                        "item": tmpEntryName + "",
                        attr: {
                            appname: tmpAppName,
                            pagename: tmpPageName,
                            source: (tmpAppName ? "app" : "workspace")
                        },
                        "details": tmpPageTitle,
                        "meta": "&#160;",
                        "level": 2,
                        "icon": "columns",
                        "color": "green",
                        "group": "workspace-outline",
                        content: []
                    }

                    //var tmpPageRes = $.await(getWSResourcesNode(tmpPageBase, tmpPage, tmpAppName, tmpPageName));
                    var tmpPageRes = $.await(getWSResourcesNode({baseURL: tmpPageBase, appname: tmpAppName, pagename: tmpPageName, baseObject: tmpPage}));

                    if (tmpPageRes && tmpPageRes.content && tmpPageRes.content.length) {
                        //tmpPage.content.push(tmpPageRes);
                    } else {
                        //tmpPage.level = 1;
                    }
                    //tmpPage.content.push();

                    tmpBase.content.push(tmpPage);

                }


                resolve(tmpBase);

            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }

        }));



    }



    function getWSResourcesNode(theOptions) {
       
        
        return new Promise($.async(function (resolve, reject) {
            try {

                var tmpOptions = theOptions || {};
                //theBaseDir, theBase, theAppName, thePageName

                var tmpTitle = "Workspace Resources"
                var tmpCatName = tmpOptions.catname || '';
                var tmpAppName = tmpOptions.appname || '';
                var tmpPageName = tmpOptions.pagename || '';
                var tmpBaseURL = tmpOptions.baseURL || '';
                var tmpBaseObj = tmpOptions.baseObject || false;

                var tmpPagesDir = scope.locals.path.ws.pages;
                var tmpAppsDir = scope.locals.path.ws.uiApps;
                var tmpCatsDir = scope.locals.path.ws.catalogs;

                if (tmpBaseURL) {
                    tmpTitle = 'Resources';
                }

                var tmpBase = {
                    "ctl": "tbl-ol-node",
                    "type": "resources",
                    "details": tmpTitle,
                    "meta": "&#160;",
                    "classes": "ws-editor-outline",
                    "level": 2,
                    "icon": "box",
                    "color": "black",
                    "group": "workspace-outline",
                    "content": []
                }

                var tmpTypes = [
                    { type: 'Controls', dir: "controls", icon: 'newspaper' },
                    { type: 'Panels', dir: "panels", icon: 'newspaper outline' },
                    { type: 'Template', dir: "tpl", icon: 'object group outline' },
                    { type: 'HTML', dir: "html", icon: 'code' }
                ]

                var tmpCatDir = scope.locals.path.ws.catalog;

                for (var iType = 0; iType < tmpTypes.length; iType++) {
                    var tmpType = tmpTypes[iType];

                    var tmpTypeEntry = {
                        "ctl": "tbl-ol-node",
                        "type": "resource-type",
                        "details": tmpType.type,
                        "meta": "&#160;",
                        "level": 2,
                        "icon": tmpType.icon,
                        "color": "black",
                        "group": "workspace-outline",
                        "content": []
                    }

                    var tmpEntryName = tmpFileName;

                    var tmpBaseDir = tmpCatDir + 'resources/' + tmpType.dir + '/';

                    if (tmpBaseURL) {
                        tmpBaseDir = tmpBaseURL + tmpType.dir + '/';
                        tmpEntryName = tmpBaseDir + '-' + tmpBaseDir
                    }
                    if( tmpAppName && tmpPageName ){
                        tmpBaseDir = tmpAppsDir + '/' + tmpAppName + '/app/pages/' + tmpPageName + '/' + tmpType.dir + '/';
                    } else if( tmpCatName ){
                        tmpBaseDir = tmpCatsDir + '/' + tmpCatName + '/' + tmpType.dir + '/';
                    }

                    var tmpFiles = $.await($.bld.getDirFiles(tmpBaseDir));
                    for (var index in tmpFiles) {
                        var tmpFileName = tmpFiles[index];
                        var tmpShowName = tmpFileName
                            .replace('.html','')
                            .replace('.json','')
                            .replace('.js','')

                        var tmpEntryColor = "purple";
                        if( tmpCatName != ''){
                            tmpEntryColor = "brown";
                        } else if( tmpPageName == ''){
                            tmpEntryColor = "violet";
                        }
                        var tmpSource = "workspace";
                        var tmpMainName = ''
                        if( tmpAppName ){
                            tmpSource = "app";
                            tmpMainName = tmpAppName;
                        } else if( tmpCatName ){
                            tmpSource = "cat";
                            tmpMainName = tmpCatName;
                        }
                        var tmpEntry = {
                            "ctl": "tbl-ol-node",
                            "type": "resource",
                            "item": tmpMainName + '-' + tmpPageName + '-' + tmpFileName + "",
                            "details": tmpShowName,
                            "meta": "&#160;",
                            "level": 1,
                            "icon": tmpType.icon,
                            "color": tmpEntryColor,
                            attr: {
                                catname: tmpCatName,
                                appname: tmpAppName,
                                pagename: tmpPageName,
                                resname: tmpFileName,
                                restype: tmpType.type,
                                source: tmpSource
                            },
                            "group": "workspace-outline",
                        }
                        if (!(tmpBaseURL)) {
                            tmpTypeEntry.content.push(tmpEntry);
                        } else {
                            if (tmpBaseObj) {
                                tmpBaseObj.content.push(tmpEntry);
                            } else {
                                tmpBase.content.push(tmpEntry);
                            }
                        }

                    }

                    if (!(tmpBaseURL)) {

                        if (tmpBaseObj) {
                            tmpBaseObj.content.push(tmpTypeEntry);
                        } else {
                            tmpBase.content.push(tmpTypeEntry);
                        }
                    }


                }


                resolve(tmpBase);

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





