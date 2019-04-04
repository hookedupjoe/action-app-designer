'use strict';
const THIS_MODULE_NAME = 'apps';
const THIS_MODULE_TITLE = 'Get Applications in Workspace Panel';

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

                var tmpBase = {
                    "ctl": "tbl-ol-node",
                    "name": "workspace",
                    "type": "workspace",
                    "item": "workspace",
                    "group": "workspace-outline",
                    "details": "(default)",
                    "meta": "Workspace",
                    "classes": "ws-outline",
                    "level": 3,
                    "icon": "database",
                    "color": "black",
                    "content": []
                }
                var tmpWSDir = scope.locals.path.start + '/../local_ws/apps/';
                var tmpFiles = $.await($.bld.readDir(tmpWSDir))
                // var tmpFiles = $.await($.fs.readdir(tmpWSDir));


                for (var index in tmpFiles) {
                    var tmpAppName = tmpFiles[index];
                    var tmpAppBase = tmpWSDir + tmpAppName + '/';
                    var tmpAppDetails = $.await($.bld.getJsonFile(tmpAppBase + 'app.json'))
                    //console.log( 'tmpAppDetails', tmpAppDetails);
                    var tmpAppTitle = tmpAppDetails.title || "(untitled)";

                    var tmpApp = {
                        "ctl": "tbl-ol-node",
                        "name": "app-" + tmpAppName + "",
                        "type": "app",
                        "details": "" + tmpAppName + ": " + tmpAppTitle,
                        "meta": "App",
                        "level": 2,
                        "group": "workspace-outline",
                        "item": "application",
                        "icon": "globe",
                        "color": "blue",
                        "content": [
                            {
                                "ctl": "tbl-ol-node",
                                "type": "page",
                                "name": "HomePage",
                                "details": "HomePage",
                                "meta": "Page",
                                "level": 1,
                                "group": "workspace-outline",
                                "item": "" + tmpAppName + "-page-HomePage",
                                "icon": "columns",
                                "color": "green"
                            },
                            {
                                "ctl": "tbl-ol-node",
                                "name": "LogsPage",
                                "type": "page",
                                "details": "LogsPage",
                                "meta": "Page",
                                "level": 1,
                                "group": "workspace-outline",
                                "item": "" + tmpAppName + "-page-LogsPage",
                                "icon": "columns",
                                "color": "green"
                            }
                        ]
                    }
                    //    console.log('tmpApp', tmpApp);
                    tmpBase.content.push(tmpApp);


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
                            "  width:90px;",
                            "  color:black;",
                            "  background-color: #eeeeee;",
                            "}",
                            ".ws-outline table.outline > tbody > tr.active > td.tbl-label {",
                            "  width:90px;",
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





