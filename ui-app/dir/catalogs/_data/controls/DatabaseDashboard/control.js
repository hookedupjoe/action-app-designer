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
        "controlname": "MongoCollection",
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
    
    this.tabs.addTab({
      item: 'main',
      text: this.dbname,
      icon: 'database',
      content: '<div myspot="dashhome"></div>'
    });

    this.refreshDash();

  

  }


  ControlCode.refreshUI = function(){
    this.loadSpot('db-name-header',this.dbname);
  }

  ControlCode.newDoc = newDoc;
  function newDoc() {
    var self = this;
    this.parts.mainform.prompt().then(function(theWasSubmitted, theData) {
      if (!(theWasSubmitted)) return;

      var tmpData = theData;
      tmpData.id = tmpData.id.toLowerCase();
      tmpData.accountid = self.accountid;
      tmpData.dbname = self.dbname;
      
      var tmpBaseURL = ActionAppCore.ActAppData.appDataEndpoint;

      var tmpPostOptions = {
        formSubmit: false,
        data: tmpData,
        url: tmpBaseURL + 'mongo-create-collection?open'
      };
      return ThisApp.apiCall(tmpPostOptions).then(function(theReply) {
        self.refreshDash()
      });

    });
    
  }
  
  ControlCode.refreshDash = function(theContent, theOptTpl){
    var self = this;
    var tmpBaseURL = './appdata/api/';
    var tmpURL = tmpBaseURL + 'get-collection-list/?account=' + self.accountid + '&database=' + self.dbname;      
    ThisApp.apiCall(tmpURL).then(function(theReply){
      self.collections = theReply.collections;
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