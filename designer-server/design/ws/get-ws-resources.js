'use strict';
const THIS_MODULE_NAME = 'get-ws-resources';
const THIS_MODULE_TITLE = 'Panel: Get resources in WS';

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
                    "type": "resources",
                    "name": "resources",
                    "item": "resources",
                    "details": "WS Resources",
                    "meta": "&#160;",
                    "classes": "resource-editor-outline",
                    "level": 3,
                    "icon": "box",
                    "color": "black",
                    "group": "ws-resources-outline",
                    "content": []
                }

                var tmpTypes = [
                    {type: 'Controls', dir: "controls", icon: 'newspaper'},
                    {type: 'Panels', dir: "panels", icon: 'newspaper outline'},
                    {type: 'Template', dir: "tpl", icon: 'object group outline'},
                    {type: 'HTML', dir: "html", icon: 'code'}
                ]

                var tmpCatDir = scope.locals.path.ws.catalog;
            
              
                for (var iType = 0; iType < tmpTypes.length; iType++) {
                    var tmpType = tmpTypes[iType];
                        
                    var tmpTypeEntry = {
                        "ctl": "tbl-ol-node",
                        "type": "resource-type",
                        "name": tmpType.type + "",
                        "item": tmpType.type + "",
                        "details": tmpType.type,
                        "meta": "&#160;",
                        "level": 2,
                        "icon": tmpType.icon,
                        "color": "black",
                        "group": "ws-resources-outline",
                        "content": []
                    }


                
                    
                    var tmpBaseDir = tmpCatDir + tmpType.dir + '/';
                    var tmpFiles = $.await($.bld.getDirFiles(tmpBaseDir));

                    for (var index in tmpFiles) {
                        var tmpFileName = tmpFiles[index];
                        
                        var tmpEntry = {
                            "ctl": "tbl-ol-node",
                            "type": "resource",
                            "name": tmpFileName + "",
                            "item": tmpFileName + "",
                            "details": tmpFileName,
                            "meta": "&#160;",
                            attr: {
                                pageaction: 'showResourceConsole',
                                restype: tmpType.type,
                                resname: tmpFileName
                            },
                            "level": 1,
                            "icon": tmpType.icon,
                            "color": "purple",
                            "group": "ws-resources-outline"
                        }
                        tmpTypeEntry.content.push(tmpEntry);
                    }
                    tmpBase.content.push(tmpTypeEntry);
                }
               

                var tmpRet = {
                    "options": {
                        padding: false,
                        "css": [
                            ".resource-editor-outline table.outline > tbody > tr[oluse=\"select\"] {",
                            "  cursor: pointer;",
                            "}",
                            ".resource-editor-outline table.outline > tbody > tr[oluse=\"collapsable\"] {",
                            "  cursor: pointer;",
                            "}",
                            ".resource-editor-outline table.outline > tbody > tr > td.tbl-label {",
                            "  width:20px;",
                            "  color:black;",
                            "  background-color: #eeeeee;",
                            "}",
                            ".resource-editor-outline table.outline > tbody > tr.active > td.tbl-label {",
                            "  background-color: #777777;",
                            "  color: white;",
                            "}",
                            ".resource-editor-outline table.outline > tbody > tr > td.tbl-icon {",
                            "  width:40px;",
                            "}",
                            ".resource-editor-outline table.outline > tbody > tr > td.tbl-icon2 {",
                            "  width:80px;",
                            "}",
                            ".resource-editor-outline table.outline > tbody > tr > td.tbl-details {",
                            "  font-weight:bolder;",
                            "  overflow:auto;",
                            "  width:auto;",
                            "}",
                            ".resource-editor-outline table.outline > tbody > tr.active[type=\"page\"] > td.tbl-label {",
                            "  background-color: #21ba45;",
                            "}",
                            ".resource-editor-outline table.outline > tbody > tr.active[type=\"app\"] > td.tbl-label {",
                            "  background-color: #2185d0;",
                            "}",
                            ".resource-editor-outline table.outline > tbody > tr.active[type=\"resource\"] > td.tbl-label {",
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





