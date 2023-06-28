(function (ActionAppCore, $) {

  var ControlSpecs = {
   options: {
      padding: false,
      required: {
        templates: {
            map:
            {
                "MongoAccountDash": {source: "_data", name: "MongoAccountDash"}
            }
        }
      }
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
        hidden: false,
        content: [{
          "ctl": "div",
          "classes": "ui message invered pad5",
          hidden: true,
          "content": [ {
            "ctl": "title",
            "color": "blue",
            "text": 'Account: <span myspot="account-name"></span>'
          }]
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
  function setup(theOptions) {
    if( theOptions && theOptions.accountid ){
      this.accountid = theOptions.accountid;
    }
    this.tabs.addTab({
      item: 'main',
      text: this.accountid,
      icon: 'server',
      content: '<div myspot="dashhome"></div>'
    });
    	
    this.refreshDash();

  

  }

  ControlCode.refreshUI = function(){
    this.loadSpot('account-name',this.accountid);
  }

  ControlCode.newDoc = newDoc;
  function newDoc() {
    var tmpThis = this;

    this.parts.mainform.prompt().then(function(theWasSubmitted, theData) {
      if (!(theWasSubmitted)) return;

      var tmpData = theData;
      tmpData.id = tmpData.id.toLowerCase();
      var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
      var tmpBaseURL = ActionAppCore.ActAppData.appDataEndpoint;

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
  
  
  
  ControlCode.openDatabaseDash = openDatabaseDash;
  function openDatabaseDash(theParams, theTarget){
      var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['dbname']);
      this.openDatabaseDashTab(tmpParams.dbname);
  }

  ControlCode.openDatabaseDashTab = function(theDBName){
    var tmpTabKey = 'tab-mongo-db-' + theDBName;
    var tmpTabTitle = '' + theDBName;

    var tmpParams = {};
    tmpParams.accountid = this.accountid;
    tmpParams.dbname = theDBName;

    this.tabs.openTab({
      tabname: tmpTabKey,
      tabtitle: '<i class="icon database blue"></i> ' + tmpTabTitle,
      controlname: 'DatabaseDashboard',
      catalog: '_data',
      closable: true,
      setup: tmpParams
    });
  }

  ControlCode.refreshDash = function(theContent, theOptTpl){
    var self = this;
    var tmpBaseURL = ActionAppCore.ActAppData.appDataEndpoint;
      var tmpURL = tmpBaseURL + 'get-db-list/?account=' + self.accountid;      

      ThisApp.apiCall(tmpURL).then(function(theReply){
        self.accountData = theReply;
        self.loadDash(self.accountData,"MongoAccountDash");
        self.refreshUI();
      })
  }
  ControlCode.loadDash = function(theContent, theOptTpl){
    this.loadSpot('dashhome', theContent, theOptTpl);
  }
  ControlCode.openDatabase = function(theContent, theOptTpl){
    console.log('openDatabase acct');
  }
  

  
  ControlCode._onInit = _onInit;
  function _onInit() {
    var tmpThis = this;
    this.refreshUI();
	
    this.accountData = {
      isLoading:true,
      dbs: [
      ]
    }

    this.tabs = this.parts.tabs;

		


  }

  var ThisControl = {
    specs: ControlSpecs, options: {
      proto: ControlCode, parent: ThisApp
    }};
  return ThisControl;
})(ActionAppCore, $);