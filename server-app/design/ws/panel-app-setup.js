'use strict';
const THIS_MODULE_NAME = 'panel-app-setup';
const THIS_MODULE_TITLE = 'Application Setup Panel';

module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;

    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }
    var base = Route.prototype;
    //==== End of common setup - add special stuff below
    //--- must have a "run" method *** 
    
    var $ = config.locals.$;

    //--- Load the prototype
    base.run = function (req, res, next) {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {

              var tmpAppConfig = $.await($.bld.getJsonFile(scope.locals.path.designer + '/build/app-build-config.json'));
//console.log( 'tmpAppConfig', tmpAppConfig);

var tmpLibLocations = '';
var tmpAppTpls = tmpAppConfig.applicationTemplates || [];
var tmpAppsList = [];

for (var aIndex in tmpAppTpls){
  var tmpTpl = tmpAppTpls[aIndex];
  var tmpTplItem = tmpTpl.title + "|" + tmpTpl.name;
  tmpAppsList.push(tmpTplItem);
  
}

var tmpDoc = {"name":"app001","title":"My First App","pages":["HomePage","LogsPage"],"plugins":["DataTables"],"cdn":"local","libraries":["DataTables","Ace"],"required":{},"extend":{},"details":"Testing"};


                var tmpRet = {
                  "options": {
                    "readonly": true,
                    "padding": false,
                    "doc": tmpDoc
                  },
                  "content": [{
                    "ctl": "tabs",
                    "name": "my-tabs",
                    "tabs": [
                      
                      {
                        "label": "Basic Info",
                        "name": "my-tab-1",
                        "ctl": "tab",
                        "content": [
                          {
                            "ctl": "fieldrow",
                            "name": "info-row",
                            "items": [
                              {
                                "ctl": "field",
                                "name": "name",
                                "label": "Application Filename",
                                "readonly": true,
                                "req": true
                              },
                              {
                                "ctl": "field",
                                "name": "title",
                                "label": "Application Title",
                                "req": true
                              }
                            ]
                          },
                          {
                            "ctl": "dropdown",
                            "multi": true,
                            "name": "pages",
                            "label": "Pages to load",
                            "default": "local",
                            "list": "HomePage,LogsPage,TestPage",
                            "req": true
                          }
                        ]
                      },
                      {
                        "label": "Libraries",
                        "name": "my-tab-2-tab-1",
                        "ctl": "tab",
                        "content": [
                          {
                            "ctl": "dropdown",
                            "name": "cdn",
                            "label": "Library Location",
                            "default": "local",
                            "list": "Preview|local,Cloud|cloud,In App|app",
                            "req": true
                          },
                          {
                            "ctl": "dropdown",
                            "multi": true,
                            "name": "libraries",
                            "label": "Libraries",
                            "default": "local",
                            "list": "DataTables,Ace",
                            "req": true
                          },
                          {
                            "ctl": "dropdown",
                            "multi": true,
                            "name": "plugins",
                            "label": "Plugins",
                            "default": "local",
                            "list": "DataTables,SvgWorkspaces",
                            "req": true
                          }
                        ]
                      }
                    ]
                  }]
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

