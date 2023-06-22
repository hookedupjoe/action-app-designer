'use strict';
const THIS_MODULE_NAME = 'frmNewApp';
const THIS_MODULE_TITLE = 'New Application Form';

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
        return new Promise( async function (resolve, reject) {
            try {

              var tmpAppConfig = await($.bld.getJsonFile(scope.locals.path.designer + '/build/app-build-config.json'));
//console.log( 'tmpAppConfig', tmpAppConfig);

var tmpLibLocations = '';
var tmpAppTpls = tmpAppConfig.applicationTemplates || [];
var tmpAppsList = [];

for (var aIndex in tmpAppTpls){
  var tmpTpl = tmpAppTpls[aIndex];
  var tmpTplItem = tmpTpl.title + "|" + tmpTpl.name;
  tmpAppsList.push(tmpTplItem);
  
}

                var tmpRet = {
                  "options": {
                    "prompt": {
                      "submitLabel": "Save Application Changes",
                      "title": "Application Details",
                      "submitLabelNew": "Create New Application",
                      "titleNew": "New Application"
                    }
                  },
                  "content": [
                    {
                      "ctl": "fieldrow",
                      "name": "info-row",
                      "items": [
                        {
                          "name": "appname",
                          "label": "Application Filename",
                          "req": true
                        },
                        {
                          "name": "title",
                          "label": "Application Title",
                          "req": true
                        }
                      ]
                    },
                    {
                      "ctl": "dropdown",
                      "name": "template",
                      "label": "Starting Point",
                      "default": "local",
                      "list": tmpAppsList.join(','),
                      "req": true
                    },
                    {
                      "name": "description",
                      "label": "Description",
                      "placeholder": "Enter optional details about this application",
                      "ctl": "field"
                    }
                  ]
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
    return async function processReq(req, res, next) {
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

