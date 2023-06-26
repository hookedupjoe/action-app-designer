(function (ActionAppCore, $) {

    var ControlSpecs = {
      "options": {
        padding: true
      },
      "content": [{
        "ctl": "title",
        "size": "Large",
        "color": "blue",
        "name": "apptitle",
        "text": "Mongo Collection"
      },
        {
          "ctl": "message",
          "color": "blue",
          "size": "large",
          "name": "welcome",
          "hidden": false,
          "text": "Use a simple, all lowercase name."
        },
        {
          "label": "Collection name",
          "ctl": "field",
          "name": "id",
          "req": true
        },
        {
          "name": "__doctype",
          "ctl": "hidden",
          "value": "mongocollection"
        },
        {
          "name": "__title",
          "ctl": "hidden"
        },
        {
          "name": "tag",
          "ctl": "hidden"
        }]
  
    }
  
  
    function submitForm() {
      var tmpData = this.getData();
      var tmpDocTitle = tmpData.id;
  
      var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
      //http://localhost:33460/appdata/api/
      var tmpBaseURL = 'http://localhost:33460/appdata/api/';
  
      var tmpDocType = 'app';
  
      var tmpPostOptions = {
        formSubmit: false,
        data: tmpData,
        url: tmpBaseURL + 'mongo-create-account?open'
      };
      console.log('tmpPostOptions', tmpPostOptions);
      return ThisApp.apiCall(tmpPostOptions).then(function(theReply) {
        console.log(theReply);
      });
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