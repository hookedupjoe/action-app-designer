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
    //
  }

  ControlCode.newDoc = newDoc;
  function newDoc() {
    var tmpThis = this;
    this.parts.mainform.prompt().then(function(theWasSubmitted, theData) {
      if (!(theWasSubmitted)) return;

      console.log('submitted', theWasSubmitted, theData);
      var tmpData = theData;
      tmpData.id = tmpData.id.toLowerCase();
      var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
      var tmpBaseURL = 'http://localhost:33460/appdata/api/';

      var tmpPostOptions = {
        formSubmit: false,
        data: tmpData,
        url: tmpBaseURL + 'mongo-create-account?open'
      };
      return ThisApp.apiCall(tmpPostOptions).then(function(theReply) {
        tmpThis.refreshDash()
      });

    });
    
  }
  
  
  ControlCode.openAccount = openAccount;
  function openAccount(theParams, theTarget){
      var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['accountid']);
      console.log('MongoDash openAccount',tmpParams);   
      this.addMongoAccountTab(tmpParams.accountid);
  }


  ControlCode.addMongoAccountTab = function(theAccountID){
    var tmpTabKey = 'tab-mongo-account-' + theAccountID;
    var tmpTabTitle = '' + theAccountID;
    var tmpParams = {};
    tmpParams.accountid = theAccountID;
    this.tabs.openTab({
      tabname: tmpTabKey,
      tabtitle: tmpTabTitle,
      controlname: 'AccountDashboard',
      catalog: '_data',
      closable: true,
      setup: {accountid: theAccountID}
    });
  }

  
  ControlCode.refreshDash = function(theContent, theOptTpl){
    var tmpThis = this;
    ThisApp.getResourceFromSource("template","MongoDashHome", "_data", "MongoDashHome").then(function(theTemplateHTML){
      ThisApp.addTemplate("MongoDashHome",theTemplateHTML);

      var tmpBaseURL = 'http://localhost:33460/appdata/api/';
      var tmpURL = tmpBaseURL + 'get-account-list';      
      ThisApp.apiCall(tmpURL).then(function(theReply){
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
      icon: 'home',
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