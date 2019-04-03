/*
 *  Send bulk data from CSV to NoSQL Database
 */
'use strict';

const THIS_MODULE_NAME = 'cardsdemo';
const THIS_MODULE_TITLE = 'Return JSON for content';

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
                  "onValidate": {
                    "isStoredFunction": true,
                    "_func": "function(theControl){\r\n            if (!theControl){\r\n                return true;\r\n            }\r\n            console.log(\"Validation called \", theControl);\r\n            var tmpLast = theControl.getFieldValue('last');\r\n            console.log( 'tmpLast', tmpLast);\r\n            if( tmpLast == 'na' ){\r\n\r\n                theControl.setFieldMessage('last', 'na not allowed', {color:'red'})\r\n                return \"We do not allow na in the last field\"\r\n            }\r\n            return true;\r\n        }"
                  },
                  "content": [
                    {
                      "ctl": "title",
                      "size": "large",
                      "name": "title",
                      "text": "Test Control"
                    },
                    
                    {
                      "ctl": "fieldrow",
                      "name": "name-row",
                      "items": [
                        {
                          "name": "first",
                          "label": "First Name",
                          "note": "Using a nick name is fine",
                          "req": true
                        },
                        {
                          "name": "last",
                          "label": "Last Name",
                          "note": "Do not use na",
                          "req": false
                        }
                      ]
                    },
                    {
                      "ctl": "fieldrow",
                      "label": "Badge",
                      "name": "badge-row",
                      "req": false,
                      "items": [
                        {
                          "placeholder": "First Name",
                          "name": "badgefirst",
                          "req": false
                        },
                        {
                          "placeholder": "Last Name",
                          "name": "badgelast",
                          "req": false
                        }
                      ]
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

