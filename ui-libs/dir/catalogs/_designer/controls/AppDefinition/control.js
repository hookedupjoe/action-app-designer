(function (ActionAppCore, $) {

    var ControlSpecs = {
          "options": {padding: true},
          "content": [
              {
                  "ctl": "title",
                  "size": "Large",
                  "color": "blue",
                  "name": "headertitle",
                  "text": "Application Definition"
              },
              {
                  "ctl": "message",
                  "color": "blue",
                  "size": "large",
                  "name": "welcome",
                  "hidden": false,
                  "text": "Provide details about this Application below."
              },
              {
                  "ctl": "fieldrow",
                  "items": [
                      {
                          "label": "Application Name",
                          "ctl": "field",
                          "name": "name",
                          "note": "Should be unique",
                          "req": true
                      },
                      {
                          "label": "Application Title",
                          "ctl": "field",
                          "name": "title",
                          "note": "Display name for this form",
                          "req": true
                      }
                  ]
              },
              {
                  "ctl": "fieldrow",
                  "items": [
                      {
                          "label": "Write Capabilities",
                          "ctl": "dropdown",
                          "note": "Required to use this Application, comma delim",
                          "name": "writecaps",
                          "default": "actappapps",
                          "list": "None|,Applications Access|actappapps,Designer Access|actappdesign",
                          "req": true
                      },
                      {
                          "label": "Read Capabilities",
                          "ctl": "dropdown",
                          "note": "Required to use this Application, comma delim",
                          "name": "readcaps",
                          "default": "actappapps",
                          "list": "None|,Applications Access|actappapps,Designer Access|actappdesign",
                          "req": true
                      }
                  ]
              }
                  ,
              {
                  "name": "id",
                  "ctl": "hidden"
              },
              {
                  "name": "__doctype",
                  "ctl": "hidden",
                  "value": "app"
              },
              {
                  "name": "__doctitle",
                  "ctl": "hidden", 
                  "value":  {
                    "[computed]": "context.this.controller.getFieldValue('title') || ''"
                }
              },
              {
                  "name": "tag",
                  "ctl": "hidden"
              },
              {
                  "ctl": "segment",
                  "raised": true,
                  "clearing": true,
                  "name":'submit-bar',
                  "hidden": false,
                  "content":[
                      {
                          "ctl": "button",
                          "color": "blue",
                          "size": "large",
                          "onClick": {
                              "run": "action",
                              "action": "submitForm",
                              "validate": true
                          },
                          "labeled": true,
                          "right": true,
                          "toright": true,
                          "icon": "arrow right",
                          "name": "btn-submit",
                          "text": "Submit Form"
                      }
                  ]
              }
              
      
          ]
          
      }
  
  
      function submitForm() {
          var tmpData = this.getData();
          var tmpDocTitle = tmpData.title;
          
          var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
          var tmpDocType = 'app';
          
          var tmpPostOptions = {
              formSubmit: false,
              data: tmpData,
              url: tmpBaseURL + '/wp-json/actappdesigner/savedesign?open&doctype=' + tmpDocType+ '&doctitle=' + tmpDocTitle
          };
          
          return ThisApp.apiCall(tmpPostOptions);
      }
      
    var ControlCode = {
          submitForm: submitForm,
    };
  
    ControlCode.setup = setup;
    function setup() {
      console.log("Ran setup")
    }
  
    ControlCode._onInit = _onInit;
    function _onInit() {
      //console.log("Ran _onInit")
    }
  
    var ThisControl = {
      specs: ControlSpecs, options: {
        proto: ControlCode, parent: ThisApp
      }};
    return ThisControl;
  })(ActionAppCore, $);