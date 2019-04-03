/*
 *  Send bulk data from CSV to NoSQL Database
 */
'use strict';

const THIS_MODULE_NAME = 'Tester';
const THIS_MODULE_TITLE = 'Return code that is evaulated into a control in the UI';

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
                res.contentType('text/plain')
              

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
           
            
          var tmpContent = [
            {
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
                "content": [
                    {
                        "ctl": "tbl-ol-node",
                        "name": "application",
                        "type": "app",
                        "details": "My First App",
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
                                "item": "page-HomePage",
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
                                "item": "page-LogsPage",
                                "icon": "columns",
                                "color": "green"
                            }
                        ]
                    },
                    {
                        "ctl": "tbl-ol-node",
                        "name": "appTwo",
                        "type": "app",
                        "details": "My Second App",
                        "meta": "ThisApp",
                        "classes": "app-table",
                        "level": 2,
                        "group": "workspace-outline",
                        "item": "appTwo",
                        "icon": "globe",
                        "color": "blue",
                        "content": [
                            {
                                "ctl": "tbl-ol-node",
                                "type": "page",
                                "name": "appTwo-HomePage",
                                "details": "HomePage",
                                "meta": "Page",
                                "level": 1,
                                "group": "workspace-outline",
                                "item": "appTwo-page-HomePage",
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
                                "item": "appTwo-page-LogsPage",
                                "icon": "columns",
                                "color": "purple"
                            }
                        ]
                    }
                ]
            }
        ]
        
          
          var tmpControl = function(ActionAppCore, $) {
      
            var ControlSpecs = {
                "related": {
                    "workspace": {
                         content: []
                    }
                },
                "options": {
                    "padding": true,
                    "css": [
                        ".app-table table.outline > tbody > tr[oluse=\"select\"] {",
                        "  cursor: pointer;",
                        "}",
                        ".app-table table.outline > tbody > tr[oluse=\"collapsable\"] {",
                        "  cursor: pointer;",
                        "}",
                        ".app-table table.outline > tbody > tr > td.tbl-label {",
                        "  width:90px;",
                        "  color:black;",
                        "  background-color: #eeeeee;",
                        "}",
                        ".app-table table.outline > tbody > tr.active > td.tbl-label {",
                        "  width:90px;",
                        "  background-color: #777777;",
                        "  color: white;",
                        "}",
                        ".app-table table.outline > tbody > tr > td.tbl-icon {",
                        "  width:40px;",
                        "}",
                        ".app-table table.outline > tbody > tr > td.tbl-icon2 {",
                        "  width:80px;",
                        "}",
                        ".app-table table.outline > tbody > tr > td.tbl-details {",
                        "  white-space: nowrap;",
                        "  font-weight:bolder;",
                        "  overflow:auto;",
                        "  width:auto;",
                        "}",
                        ".app-table table.outline > tbody > tr.active[type=\"page\"] > td.tbl-label {",
                        "  background-color: #21ba45;",
                        "}",
                        ".app-table table.outline > tbody > tr.active[type=\"app\"] > td.tbl-label {",
                        "  background-color: #2185d0;",
                        "}",
                        ".app-table table.outline > tbody > tr.active[type=\"region\"] > td.tbl-label {",
                        "  background-color: #a333c8;",
                        "}"
                    ]
                },
                "content": MYCONTENTARRAYHERE
            }
        
        
            var ControlCode = {
                helloCounter: 0,
                sayHello: sayHello
            }
            
            function sayHello(theOptionalName){
                var tmpMsg = '';
                if( theOptionalName ){
                    tmpMsg = "Howdy " + theOptionalName;
                } else {
                    this.helloCounter++;
                    var tmpColor = "blue";
                    if (this.helloCounter % 2 == 0){
                        tmpColor = "orange";    
                    }
                    tmpMsg = 'Tester - Hello ' + this.helloCounter + ' times.'
                }
                
        
                this.setFieldValue('title',tmpMsg);
                this.setFieldMessage('title','I was set',{color: tmpColor});
                ThisApp.refreshLayouts();
                var tmpThis = this;
                ThisApp.delay(1000).then(function(){
                    tmpThis.setFieldMessage('title', '');
                    ThisApp.refreshLayouts();
                })
            }
        
        
            var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};
        
            return ThisControl;
        
          };
          var tmpText = tmpControl.toString();

          tmpText = tmpText.replace('MYCONTENTARRAYHERE', JSON.stringify(tmpContent));
          res.contentType('text/plain');

          tmpText = '(' + tmpText + ')(ActionAppCore, $)';
          res.send(tmpText);
        
        } catch (ex) {
            res.json({ status: false, error: ex.toString() })
        }
    })
};

