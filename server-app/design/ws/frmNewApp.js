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
        return new Promise($.async(function (resolve, reject) {
            try {
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
                      "ctl": "fieldrow",
                      "name": "options-row",
                      "items": [
                        {
                          "ctl": "dropdown",
                          "name": "cdn",
                          "label": "CDN Location",
                          "default": "local",
                          "list": "Local|local,IBM Cloud|cloud,In App|app",
                          "req": true
                        },
                        {
                          "ctl": "dropdown",
                          "name": "template",
                          "label": "Application Template",
                          "list": "Blank|tpl-blank,Testing|tpl-testing,Demos|tpl-demos",
                          "req": true
                        }
                      ]
                    },
                    {
                      "name": "description",
                      "label": "Description",
                      "placeholder": "Enter optional details about this application",
                      "ctl": "field",
                      "req": true
                    }
                  ],
                  "index": {
                    "fieldsList": [
                      "appname",
                      "title",
                      "cdn",
                      "template",
                      "description"
                    ],
                    "itemsList": [
                      "info-row",
                      "options-row"
                    ],
                    "fields": {
                      "appname": {
                        "name": "appname",
                        "label": "Application Filename",
                        "req": true
                      },
                      "title": {
                        "name": "title",
                        "label": "Application Title",
                        "req": true
                      },
                      "cdn": {
                        "ctl": "dropdown",
                        "name": "cdn",
                        "label": "CDN Location",
                        "default": "local",
                        "list": "Local|local,IBM Cloud|cloud,In App|app",
                        "req": true
                      },
                      "template": {
                        "ctl": "dropdown",
                        "name": "template",
                        "label": "Application Template",
                        "list": "Blank|tpl-blank,Testing|tpl-testing,Demos|tpl-demos",
                        "req": true
                      },
                      "description": {
                        "name": "description",
                        "label": "Description",
                        "placeholder": "Enter optional details about this application",
                        "ctl": "field",
                        "req": true
                      }
                    },
                    "items": {
                      "info-row": {
                        "ctl": "fieldrow",
                        "detail": ""
                      },
                      "options-row": {
                        "ctl": "fieldrow",
                        "detail": ""
                      }
                    },
                    "controls": {},
                    "required": {},
                    "outline": [
                      {
                        "ctl": "fieldrow",
                        "name": "info-row",
                        "children": [
                          {
                            "ctl": "field",
                            "name": "appname"
                          },
                          {
                            "ctl": "field",
                            "name": "title"
                          }
                        ]
                      },
                      {
                        "ctl": "fieldrow",
                        "name": "options-row",
                        "children": [
                          {
                            "ctl": "dropdown",
                            "name": "cdn"
                          },
                          {
                            "ctl": "dropdown",
                            "name": "template"
                          }
                        ]
                      },
                      {
                        "ctl": "field",
                        "name": "description"
                      }
                    ]
                  }
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

