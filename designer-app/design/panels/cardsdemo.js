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
                    "content": [
                        {
                            "ctl": "fieldrow",
                            "inline": true,
                            "name": "name-row",
                            "items": [
                                {
                                    "ctl": "button",
                                    "toright": true,
                                    "color": "blue",
                                    "fluid": true,
                                    "size": "large",
                                    "onClick": {
                                        "run": "publish",
                                        "event": "blueButton",
                                        "validate": true
                                    },
                                    "labeled": true,
                                    "right": true,
                                    "icon": "arrow right",
                                    "name": "btn-blue",
                                    "text": "Server Gen Blue"
                                },
                                {
                                    "ctl": "button",
                                    "toright": true,
                                    "color": "green",
                                    "fluid": true,
                                    "size": "large",
                                    "onClick": {
                                        "run": "publish",
                                        "event": "greenButton",
                                        "validate": true
                                    },
                                    "labeled": true,
                                    "right": true,
                                    "icon": "arrow right",
                                    "name": "btn-green",
                                    "text": "Server Gen Green"
                                }
                            ]
                        },
                        {
                            "ctl": "cards",
                            "name": "west-cards",
                            "slim": true,
                            "link": true,
                            "content": [
                                {
                                    "ctl": "cardfull"
                                    ,"classes":"orange raised tall"
                                    ,"attr": {
                                        "pageaction": "runTest",
                                        "testname": "matthew-full"
                                    }
                                    ,"name": "card-matthew-full"
                                    ,"header":"Matt Giampietro"
                                    ,"imageSrc": "/images/avatar2/large/matthew.png"
                                    ,"meta": "<a>Friends</a>"
                                    ,"description": "Matthew is an interior designer living in New York."
                                    ,"extraText": "<i class=\"user icon\"></i> 75 Friends"
                                    ,"extraTextRight": "Joined in 2013"
                                },
                                {
                                    "ctl": "card",
                                    "name": "card-matthew",
                                    "attr": {
                                        "pageaction": "runTest",
                                        "testname": "matthew"
                                    },
                                    "content": [
                                        {
                                            "ctl": "image",
                                            "src": "/images/avatar2/large/matthew.png"
                                        },
                                        {
                                            "ctl": "content",
                                            "content": [
                                                {
                                                    "ctl": "header",
                                                    "text": "Matt Giampietro"
                                                },
                                                {
                                                    "ctl": "meta",
                                                    "text": "<a>Friends</a>"
                                                },
                                                {
                                                    "ctl": "description",
                                                    "text": "Matthew is an interior designer living in New York."
                                                }
                                            ]
                                        },
                                        {
                                            "ctl": "extra",
                                            "content": [
                                                {
                                                    "ctl": "span",
                                                    "classes": "right floated",
                                                    "text": "Joined in 2013"
                                                },
                                                {
                                                    "ctl": "span",
                                                    "text": "<i class=\"user icon\"></i> 75 Friends"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "ctl": "card",
                                    "attr": {
                                        "pageaction": "runTest",
                                        "testname": "molly"
                                    },
                                    "content": [
                                        {
                                            "ctl": "image",
                                            "src": "/images/avatar2/large/molly.png"
                                        },
                                        {
                                            "ctl": "content",
                                            "content": [
                                                {
                                                    "ctl": "header",
                                                    "text": "Molly McMolly"
                                                },
                                                {
                                                    "ctl": "meta",
                                                    "text": "<a>Other</a>"
                                                },
                                                {
                                                    "ctl": "description",
                                                    "text": "Molly is a personal assistant living in Paris"
                                                }
                                            ]
                                        },
                                        {
                                            "ctl": "extra",
                                            "content": [
                                                {
                                                    "ctl": "span",
                                                    "classes": "right floated",
                                                    "text": "Joined in 2011"
                                                },
                                                {
                                                    "ctl": "span",
                                                    "text": "<i class=\"user icon\"></i> 35 Friends"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "ctl": "card",
                                    "attr": {
                                        "pageaction": "runTest",
                                        "testname": "elyse"
                                    },
                                    "content": [
                                        {
                                            "ctl": "image",
                                            "src": "/images/avatar2/large/elyse.png"
                                        },
                                        {
                                            "ctl": "content",
                                            "content": [
                                                {
                                                    "ctl": "header",
                                                    "text": "Elyse"
                                                },
                                                {
                                                    "ctl": "meta",
                                                    "text": "<a>Other</a>"
                                                },
                                                {
                                                    "ctl": "description",
                                                    "text": "Elyse is the boss"
                                                }
                                            ]
                                        },
                                        {
                                            "ctl": "extra",
                                            "content": [
                                                {
                                                    "ctl": "span",
                                                    "classes": "right floated",
                                                    "text": "Joined in 2008"
                                                },
                                                {
                                                    "ctl": "span",
                                                    "text": "<i class=\"user icon\"></i> 2035 Friends"
                                                }
                                            ]
                                        }
                                    ]
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