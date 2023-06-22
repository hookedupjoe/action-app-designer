'use strict';
const THIS_MODULE_NAME = 'get-pages';
const THIS_MODULE_TITLE = 'Panel: Pages in Application';

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

                var tmpAppName = req.query.appname || req.query.name || req.query.filename || '';
                tmpAppName = tmpAppName
                    .replace('.json', '')
                var tmpAppBase = tmpWSDir + tmpAppName + '/';
                var tmpAppDetails = await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))
                var tmpAppTitle = tmpAppDetails.title || "(untitled)";

                var tmpPagesBase = tmpAppBase + '/app/pages/';
                var tmpPages = await($.bld.getDirFiles(tmpPagesBase))
              
                var tmpApp = {
                    "ctl": "tbl-ol-node",                    
                    "type": "app",
                    "name": "app-" + tmpAppName + "",
                    "item": "app-" + tmpAppName + "",
                    "details": "./app/pages",
                    "meta": "&#160;",
                    "level": 1,
                    "refresh": true,
                    "icon": "globe",
                    "color": "blue",
                    "classes": "ws-outline",
                    "group": "app-pages-outline",
                    "content": []
                }

                for( var aIndex in tmpPages){
                    var tmpPage = tmpPages[aIndex];
                    var tmpPageInfo = {
                        "ctl": "tbl-ol-node",
                        "type": "page",
                        "name": "" + tmpAppName + "-page-" + tmpPage,
                        "item": "" + tmpAppName + "-page-" + tmpPage,
                        "details": tmpPage,
                        "meta": "&#160;",
                        "level": 1,
                        "group": "app-pages-outline",
                        
                        "icon": "columns",
                        "color": "green"
                    }
                    tmpApp.content.push(tmpPageInfo);
                }
                
                

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
                            ".ws-outline table.outline > tbody > tr.active[type=\"region\"] > td.tbl-label {",
                            "  background-color: #a333c8;",
                            "}"
                        ]
                     },
                    "content": [tmpApp]

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
};





