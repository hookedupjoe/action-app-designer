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
           
           
          
          var tmpControl = function(ActionAppCore, $) {
      
            var ControlSpecs = {
                "content":  [
                    {
                        "ctl": "field",
                        "size": "huge",
                        "name": "title",
                        "text": "Hello World"
                    }
                ]
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

          res.contentType('text/plain');

          tmpText = '(' + tmpText + ')(ActionAppCore, $)';
          res.send(tmpText);
        
        } catch (ex) {
            res.json({ status: false, error: ex.toString() })
        }
    })
};

