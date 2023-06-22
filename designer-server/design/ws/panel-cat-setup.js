'use strict';
const THIS_MODULE_NAME = 'panel-cat-setup';
const THIS_MODULE_TITLE = 'Catalog Details Panel';

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

        var tmpBuildCfg = await($.bld.getBuildConfigJson(scope));
        var tmpWSDir = scope.locals.path.ws.catalogs;
        var tmpDeployDir = scope.locals.path.ws.deploy;

        var tmpCatName = req.query.catname || req.query.name || req.query.filename || '';
        tmpCatName = tmpCatName.replace('.json', '')

        var tmpCatBase = tmpWSDir + tmpCatName + '/';
        var tmpCatDetails = await($.bld.getJsonFile(tmpCatBase + 'cat-info.json'))
        

        var tmpRet = {
          "options": {
            "readonly": true,
            "padding": false,
            "links": {
              "path": tmpCatBase
            },
            "doc": tmpCatDetails
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
                    "label": "Catalog Title",
                    "req": true
                  },
                  {
                    "name": "details",
                    "label": "Details",
                    "placeholder": "Enter optional details about this catalog",
                    "ctl": "field"
                  },
                  {
                    "ctl": "hidden",
                    "name": "name"
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

