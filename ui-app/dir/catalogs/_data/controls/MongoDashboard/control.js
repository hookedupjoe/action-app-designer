(function (ActionAppCore, $) {

  var ControlSpecs = {
    options: {
      padding: false
    },
    content: [{
      ctl: 'div',
      classes: 'hidden',
      content: [
        {
        "ctl": "control",
        "catalog": "_data",
        "controlname": "MongoAccount",
        "name": "mainform"
      }]
    }, {
      "ctl": "layout",
      "name": "lo",
      "north": [{
        ctl: 'div',
        name: 'toolbar',
        hidden: true,
        content: [{
          "ctl": "ui",
          "name": "search-toolbar",
          "classes": "labeled icon compact pad5",
          hidden: false,
          "content": [ {
            "ctl": "button",
            "toLeft": true,
            "color": "blue",
            "icon": "plus",
            compact: true,
            "name": "btn-page-tb-new",
            "label": "Add Account",
            "onClick": {
              "run": "action",
              "action": "newDoc"

            }
          }]
        },
          {
            ctl: 'divider',
            fitted: true,
            clearing: true
          }]
      }],
      "center": [{
        ctl: "control",
        name: "tabs",
        catalog: "_designer",
        controlname: "TabsContainer"
      }]

    }]
  }

  var ControlCode = {};

  ControlCode.setup = setup;
  function setup() {
    console.log("Ran setup")
  }

  ControlCode.newDoc = newDoc;
  function newDoc() {
    var tmpThis = this;
    // this.parts.mainform.subscribe('submitted', function(theReply){
    //   console.log('submitted',theReply);
    // })
    //console.log('this.parts.mainform new');
    this.parts.mainform.prompt().then(function(theWasSubmitted, theData) {
      if (!(theWasSubmitted)) return;

      console.log('submitted', theWasSubmitted, theData);
      var tmpData = theData;
      //var tmpDocTitle = tmpData.id;
      tmpData.id = tmpData.id.toLowerCase();
      var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
      var tmpBaseURL = 'http://localhost:33460/appdata/api/';

      //var tmpDocType = 'app';

      var tmpPostOptions = {
        formSubmit: false,
        data: tmpData,
        url: tmpBaseURL + 'mongo-create-account?open'
      };
      //console.log('tmpPostOptions',tmpPostOptions);
      return ThisApp.apiCall(tmpPostOptions).then(function(theReply) {
        //console.log(theReply);
        tmpThis.refreshDash()
      });

    });
    
  }
  
  
  ControlCode.refreshDash = function(theContent, theOptTpl){
    var tmpThis = this;
    ThisApp.getResourceFromSource("template","MongoDashHome", "_data", "MongoDashHome").then(function(theTemplateHTML){
      ThisApp.addTemplate("MongoDashHome",theTemplateHTML);

      var tmpBaseURL = 'http://localhost:33460/appdata/api/';
      var tmpURL = tmpBaseURL + 'get-account-list';      
      ThisApp.apiCall(tmpURL).then(function(theReply){
        //delete this.accountData.isLoading;
        tmpThis.accountData = theReply;
        tmpThis.loadDash(tmpThis.accountData,"MongoDashHome");
      })
      
    })
  }
  ControlCode.loadDash = function(theContent, theOptTpl){
    this.loadSpot('dashhome', theContent, theOptTpl);
  }

  ControlCode._onInit = _onInit;
  function _onInit() {
    var tmpThis = this;
	
    //--- temp
    this.accountData = {
      isLoading:true,
      accounts: [
      ]
    }

    this.tabs = this.parts.tabs;
    this.tabs.addTab({
      item: 'main',
      text: "",
      icon: 'server',
      content: '<div myspot="dashhome"></div>'
    });
    	
		this.refreshDash();


  }

  var ThisControl = {
    specs: ControlSpecs, options: {
      proto: ControlCode, parent: ThisApp
    }};
  return ThisControl;
})(ActionAppCore, $);