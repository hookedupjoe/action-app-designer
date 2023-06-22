'use strict';
const THIS_MODULE_NAME = 'frmNewApp';
const THIS_MODULE_TITLE = 'New Page Form';

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

        var tmpPageConfig = await($.bld.getJsonFile(scope.locals.path.designer + '/build/app-build-config.json'));

        var tmpPageTpls = tmpPageConfig.pageTemplates || [];
        var tmpPagesList = [];

        for (var aIndex in tmpPageTpls) {
          var tmpTpl = tmpPageTpls[aIndex];
          var tmpTplItem = tmpTpl.title + "|" + tmpTpl.name;
          tmpPagesList.push(tmpTplItem);

        }

        var tmpRet = {
          "options": {
            "prompt": {
              "submitLabel": "Save Page Changes",
              "title": "Page Details",
              "submitLabelNew": "Create New Page",
              "titleNew": "New Page"
            }
          },
          "content": [
            {
              "ctl": "fieldrow",
              "name": "info-row",
              "items": [
                {
                  "name": "pagename",
                  "label": "Page Filename",
                  "req": true
                },
                {
                  "name": "title",
                  "label": "Page Title",
                  "req": true
                }
              ]
            },
            {
              "ctl": "dropdown",
              "name": "template",
              "label": "Starting Point",
              "default": "local",
              "list": tmpPagesList.join(','),
              "req": true
            },
            {
              "name": "description",
              "label": "Description",
              "placeholder": "Enter optional details about this page",
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

