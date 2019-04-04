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
                    "classes": "app-table",
                    "level": 3,
                    "icon": "database",
                    "color": "black",
                    "content": []
                }


                $.fs.readdir(scope.locals.path.start + '/../local_ws/apps/', function (err, files) {
                    if (err) {
                        throw err;
                    }

                    for (var index in files) {
                        //console.log(files[index]);
                        var tmpAppName = files[index];

                        var tmpApp = {
                            "ctl": "tbl-ol-node",
                            "name": "app-" + tmpAppName + "",
                            "type": "app",
                            "details": "My " + tmpAppName + " App",
                            "meta": "ThisApp",
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
                        "content": [tmpBase]

                    }

                    resolve(tmpRet);


                });

                //    var tmpAppOne = {
                //         "ctl": "tbl-ol-node",
                //         "name": "application",
                //         "type": "app",
                //         "details": "My First App",
                //         "meta": "ThisApp",
                //         "level": 2,
                //         "group": "workspace-outline",
                //         "item": "application",
                //         "icon": "globe",
                //         "color": "blue",
                //         "content": [
                //             {
                //                 "ctl": "tbl-ol-node",
                //                 "type": "page",
                //                 "name": "HomePage",
                //                 "details": "HomePage",
                //                 "meta": "Page",
                //                 "level": 1,
                //                 "group": "workspace-outline",
                //                 "item": "page-HomePage",
                //                 "icon": "columns",
                //                 "color": "green"
                //             },
                //             {
                //                 "ctl": "tbl-ol-node",
                //                 "name": "LogsPage",
                //                 "type": "page",
                //                 "details": "LogsPage",
                //                 "meta": "Page",
                //                 "level": 1,
                //                 "group": "workspace-outline",
                //                 "item": "page-LogsPage",
                //                 "icon": "columns",
                //                 "color": "green"
                //             }
                //         ]
                //     }

                //     var tmpAppTwo = {
                //         "ctl": "tbl-ol-node",
                //         "name": "appTwo",
                //         "type": "app",
                //         "details": "My Second App",
                //         "meta": "ThisApp",
                //         "classes": "app-table",
                //         "level": 2,
                //         "group": "workspace-outline",
                //         "item": "appTwo",
                //         "icon": "globe",
                //         "color": "blue",
                //         "content": [
                //             {
                //                 "ctl": "tbl-ol-node",
                //                 "type": "page",
                //                 "name": "appTwo-HomePage",
                //                 "details": "HomePage",
                //                 "meta": "Page",
                //                 "level": 1,
                //                 "group": "workspace-outline",
                //                 "item": "appTwo-page-HomePage",
                //                 "icon": "columns",
                //                 "color": "green"
                //             },
                //             {
                //                 "ctl": "tbl-ol-node",
                //                 "name": "LogsPage",
                //                 "type": "page",
                //                 "details": "LogsPage",
                //                 "meta": "Page",
                //                 "level": 1,
                //                 "group": "workspace-outline",
                //                 "item": "appTwo-page-LogsPage",
                //                 "icon": "columns",
                //                 "color": "purple"
                //             }
                //         ]
                //     }

                //     tmpBase.content.push(tmpAppOne);
                //tmpBase.content.push(tmpAppTwo);



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





