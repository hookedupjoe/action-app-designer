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

              var tmpBuildCfg = $.await($.bld.getBuildConfigJson());
              var tmpWSDir = scope.locals.path.workspace + 'apps/';

              var tmpAppName = req.query.appname || req.query.name || req.query.filename || '';
              tmpAppName = tmpAppName.replace('.json', '')
              
              var tmpAppBase = tmpWSDir + tmpAppName + '/';
              var tmpAppDetails = $.await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))

              var tmpPagesBase = tmpAppBase + '/app/pages/';
              var tmpPages = $.await($.bld.getDirFiles(tmpPagesBase))

              // console.log( 'tmpBuildCfg', tmpBuildCfg);

var tmpAppTpls = tmpBuildCfg.applicationTemplates || [];
var tmpAppsList = [];

for (var aIndex in tmpAppTpls){
  var tmpTpl = tmpAppTpls[aIndex];
  var tmpTplItem = tmpTpl.title + "|" + tmpTpl.name;
  tmpAppsList.push(tmpTplItem);
}

var tmpLibLocations = [];
for( var aIndex in tmpBuildCfg.libraryLocations){
  var tmpEntry = tmpBuildCfg.libraryLocations[aIndex];
  tmpLibLocations.push(tmpEntry.label + "|" + tmpEntry.name)
}

var tmpLibs = [];
for( var aIndex in tmpBuildCfg.libraries){
  var tmpEntry = tmpBuildCfg.libraries[aIndex];
  tmpLibs.push(tmpEntry.name)
}

var tmpPlugins = [];
for( var aIndex in tmpBuildCfg.plugins){
  var tmpEntry = tmpBuildCfg.plugins[aIndex];
  tmpPlugins.push(tmpEntry.name)
}



                var tmpRet = {
                  "options": {
                    "readonly": true,
                    "padding": false,
                    "doc": tmpAppDetails
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
                            "ctl": "field",
                            "name": "title",
                            "label": "Application Title",
                            "req": true
                          },
                          {
                            "ctl": "dropdown",
                            "multi": true,
                            "name": "pages",
                            "label": "Pages to load",
                            "default": "local",
                            "list": tmpPages.join(','),
                            "req": true
                          },
                          {
                            "ctl": "hidden",
                            "name": "name"
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
                            "list": tmpLibLocations.join(","),
                            "req": true
                          },
                          {
                            "ctl": "dropdown",
                            "multi": true,
                            "name": "libraries",
                            "label": "Libraries",
                            "default": "local",
                            "list": tmpLibs.join(","),
                            "req": true
                          },
                          {
                            "ctl": "dropdown",
                            "multi": true,
                            "name": "plugins",
                            "label": "Plugins",
                            "default": "local",
                            "list":  tmpPlugins.join(","),
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
                console.error('Err : ' + error);
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

