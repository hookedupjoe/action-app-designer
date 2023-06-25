(function (ActionAppCore, $) {

  var ControlSpecs = {
    options: {
      padding: false,
      required: {
        templates: {
            map:
            {
                "MongoDatabaseDash": {source: "_data", name: "MongoDatabaseDash"}
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
            "text": 'Database: <span myspot="db-name-header"></span>'
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
    this.collections = {};
    if( theOptions && theOptions.accountid ){
      this.accountid = theOptions.accountid;
      if( theOptions && theOptions.dbname ){
        this.dbname = theOptions.dbname;
      }
    }
    
    //console.log("Database:",this.dbname,'accountid',this.accountid,'db',this.dbname);
    this.tabs.addTab({
      item: 'main',
      text: this.dbname,
      icon: 'database',
      content: '<div myspot="dashhome"></div>'
    });

    this.refreshDash();

  

  }

  ControlCode.closeTab = function(theParams, theTarget){
    console.log('closeTab on acct dash')
  }

  ControlCode.refreshUI = function(){
    this.loadSpot('db-name-header',this.dbname);
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

      //console.log('submitted', theWasSubmitted, theData);
      var tmpData = theData;
      //var tmpDocTitle = tmpData.id;
      tmpData.id = tmpData.id.toLowerCase();
      var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
      var tmpBaseURL = './appdata/api/';


      var tmpPostOptions = {
        formSubmit: false,
        data: tmpData,
        url: tmpBaseURL + 'mongo-create-collecion?open'
      };
      return ThisApp.apiCall(tmpPostOptions).then(function(theReply) {
        tmpThis.refreshDash()
      });

    });
    
  }
  
  ControlCode.refreshDash = function(theContent, theOptTpl){
    var self = this;
    var tmpBaseURL = './appdata/api/';
    var tmpURL = tmpBaseURL + 'get-collection-list/?account=' + self.accountid + '&database=' + self.dbname;      
    console.log('tmpURL',tmpURL)
    ThisApp.apiCall(tmpURL).then(function(theReply){
      self.collections = theReply.collections;
      console.log(theReply);
      self.loadDash(self,"MongoDatabaseDash");
      self.refreshUI();
    })
  }

  ControlCode.loadDash = function(theContent, theOptTpl){
    this.loadSpot('dashhome', theContent, theOptTpl);
  }

  
  ControlCode._onInit = _onInit;
  function _onInit() {
    var tmpThis = this;
    this.refreshUI();
    console.log('init');
	
    //--- temp
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