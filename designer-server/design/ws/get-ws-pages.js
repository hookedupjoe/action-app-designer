'use strict';
const THIS_MODULE_NAME = 'get-ws-pages';
const THIS_MODULE_TITLE = 'Panel: Pages in Pages';

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
                    "type": "pages",
                    "name": "pages",
                    "item": "pages",
                    "details": "WS Pages",
                    "meta": "&#160;",
                    "classes": "page-editor-outline",
                    "level": 2,
                    "icon": "columns",
                    "color": "black",
                    "group": "pages-outline",
                    "content": []
                }

                var tmpPagesDir = scope.locals.path.ws.pages;
                
                var tmpFiles = $.await($.bld.getDirFiles(tmpPagesDir))

                for (var index in tmpFiles) {
                    var tmpPageName = tmpFiles[index];
                    var tmpPageBase = tmpPagesDir + tmpPageName + '/';
                    var tmpPageTitle = tmpPageName;
                    
                    var tmpPage = {
                        "ctl": "tbl-ol-node",
                        "type": "app",
                        "name": tmpPageName + "",
                        "item": tmpPageName + "",
                        "details": tmpPageTitle,
                        "meta": "&#160;",
                        attr: {
                            pageaction: 'showPageConsole',
                            pagename: tmpPageName
                        },
                        "level": 1,
                        "icon": "columns",
                        "color": "green",
                        "group": "pages-outline"
                    }

                    tmpBase.content.push(tmpPage);

                }

                var tmpRet = {
                    "options": {
                        padding: false,
                        "css": [
                            ".page-editor-outline table.outline > tbody > tr[oluse=\"select\"] {",
                            "  cursor: pointer;",
                            "}",
                            ".page-editor-outline table.outline > tbody > tr[oluse=\"collapsable\"] {",
                            "  cursor: pointer;",
                            "}",
                            ".page-editor-outline table.outline > tbody > tr > td.tbl-label {",
                            "  width:20px;",
                            "  color:black;",
                            "  background-color: #eeeeee;",
                            "}",
                            ".page-editor-outline table.outline > tbody > tr.active > td.tbl-label {",
                            "  background-color: #777777;",
                            "  color: white;",
                            "}",
                            ".page-editor-outline table.outline > tbody > tr > td.tbl-icon {",
                            "  width:40px;",
                            "}",
                            ".page-editor-outline table.outline > tbody > tr > td.tbl-icon2 {",
                            "  width:80px;",
                            "}",
                            ".page-editor-outline table.outline > tbody > tr > td.tbl-details {",
                            "  font-weight:bolder;",
                            "  overflow:auto;",
                            "  width:auto;",
                            "}",
                            ".page-editor-outline table.outline > tbody > tr.active[type=\"page\"] > td.tbl-label {",
                            "  background-color: #21ba45;",
                            "}",
                            ".page-editor-outline table.outline > tbody > tr.active[type=\"app\"] > td.tbl-label {",
                            "  background-color: #2185d0;",
                            "}",
                            ".page-editor-outline table.outline > tbody > tr.active[type=\"region\"] > td.tbl-label {",
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





