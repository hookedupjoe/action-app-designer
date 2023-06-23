'use strict';
const THIS_MODULE_NAME = 'get-db-list';
const THIS_MODULE_TITLE = 'Panel: Databases Available';

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

                var tmpBase = {
                    "ctl": "tbl-ol-node",
                    "type": "workspace",
                    "name": "workspace",
                    "item": "workspace",
                    "details": "Workspace",
                    "meta": "&#160;",
                    "classes": "ws-outline",
                    "level": 2,
                    "icon": "hdd outline",
                    "color": "black",
                    "group": "workspace-outline",
                    "content": []
                }

                var tmpWSDir = scope.locals.path.ws.uiApps;
                
                // var tmpFiles = await($.bld.getDirFiles(tmpWSDir))

                // for (var index in tmpFiles) {
                //     var tmpAppName = tmpFiles[index];
                //     var tmpAppBase = tmpWSDir + tmpAppName + '/';
                //     var tmpAppDetails = await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))
                //     var tmpAppTitle = tmpAppDetails.title || "(untitled)";
                    
                //     var tmpApp = {
                //         "ctl": "tbl-ol-node",
                //         "type": "app",
                //         "name": tmpAppName + "",
                //         "item": tmpAppName + "",
                //         "details": tmpAppTitle,
                //         "meta": "&#160;",
                //         attr: {
                //             pageaction: 'showAppConsole',
                //             apptitle: tmpAppTitle,
                //             appname: tmpAppName
                //         },
                //         "level": 1,
                //         "icon": "globe",
                //         "color": "blue",
                //         "group": "workspace-outline"
                //     }

                //     tmpBase.content.push(tmpApp);

                // }

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
                    "content": [{"ctl":"div","text":"Hello"}]

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





