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
                  "content": [
                    
                    {
                      "ctl": "title",
                      "size": "large",
                      "icon": "globe",
                      "name": "title",
                      "color": "blue",
                      "text": "Application Setup"
                    },
                    {
                      "ctl": "sep",
                      "size": "small",
                      "icon": "road",
                      "name": "about-your-app-sep",
                      "text": "Application Information"
                    },
                    {
                      "ctl": "fieldrow",
                      "name": "info-row",
                      "items": [
                        {
                          "name": "appname",
                          "label": "Unique Name",
                          "req": true
                        },
                        {
                          "name": "title",
                          "label": "App Title",
                          "req": true
                        }
                      ]
                    },
                    {
                      "ctl": "sep",
                      "size": "small",
                      "icon": "cog",
                      "name": "app-setup-info",
                      "text": "Application Setup"
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
                      "ctl": "textarea",
                      "rows": 2,
                      "req": true
                    }
                  ]
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

