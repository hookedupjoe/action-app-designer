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

  var loadedTabs = {};

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
  
  
  ControlCode.openAccount = openAccount;
  function openAccount(theParams, theTarget){
      var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['accountid']);
      console.log('MongoDash openAccount',tmpParams);   
      this.addMongoAccountTab(tmpParams.accountid);
  }

  //closeTab

  ControlCode.closeMyTab = function(theParams, theTarget){
    var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['tab']);
    console.log('closeTab',tmpParams);
    var tmpTabName = tmpParams.tab;
    if( !(tmpTabName) ){
        alert('Could not close tab, no tab name provided');
    }
    if( loadedTabs[tmpTabName] ){
        var tmpToRemove = loadedTabs[tmpTabName];
        if( tmpToRemove && tmpToRemove._subid ){
            tmpToRemove.unsubscribe('',tmpToRemove._subid);
        }
        if( tmpToRemove && tmpToRemove.destroy ){
            tmpToRemove.destroy();
        }
        delete loadedTabs[tmpTabName];
    }
    this.tabs.closeTab(tmpTabName);
}

  ControlCode.addMongoAccountTab = function(theAccountID){
    var tmpThis = this;
    var tmpTabKey = 'tab-mongo-account-' + theAccountID;
    var tmpTabTitle = '' + theAccountID;
    if( loadedTabs[tmpTabKey] ){
        this.tabs.gotoTab(tmpTabKey);
    } else {
        var tmpCloseMe = '<i style="margin-right:-5px;margin-left:10px;" tab="' + tmpTabKey + '" myaction="closeMyTab" class="icon close grey inverted"></i>';
        ThisApp.getResourceFromSource('control','AccountDashboard','_data','AccountDashboard').then(function(theLoadedControl){
            var tmpNewTabControl = theLoadedControl.create(tmpTabKey);

            tmpThis.tabs.addTab({item:tmpTabKey,text: tmpTabTitle + tmpCloseMe, icon: 'server', content:''})
            var tmpNewSpot = tmpThis.tabs.getTabSpot(tmpTabKey);
            tmpNewTabControl.loadToElement(tmpNewSpot).then(function () {
                loadedTabs[tmpTabKey] = tmpNewTabControl;
                //--- Go to the newly added card (to show it and hide others)
                var tmpParams = {};
                tmpParams.accountid = theAccountID;
                if( tmpNewTabControl.setup ){
                    tmpNewTabControl.setup(tmpParams);
                }
                ThisApp.delay(1).then(function(){
                  tmpThis.tabs.gotoTab(tmpTabKey);
                })
                
            });
        });
        

    }
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