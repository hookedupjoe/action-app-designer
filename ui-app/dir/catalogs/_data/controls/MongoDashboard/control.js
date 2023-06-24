(function (ActionAppCore, $) {

	var ControlSpecs = { 
		options: {
			padding: false
		},
		content: [
	{
      ctl: 'div',
      classes: 'hidden',
      content: [{
        "ctl": "control",
        "catalog": "_data",
        "controlname": "MongoAccount",
        "name": "mainform"
      }]
    },{
        "ctl": "layout",
        "name": "lo",
        "north": [{
          ctl: 'div',
          name: 'toolbar',
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

      }                                             
		]
	}

	var ControlCode = {};

    ControlCode.setup = setup;
    function setup(){
        console.log("Ran setup")
    }

    ControlCode.newDoc = newDoc;
    function newDoc(){
        // this.parts.mainform.subscribe('submitted', function(theReply){
        //   console.log('submitted',theReply);
        // })
        console.log('this.parts.mainform new');
        this.parts.mainform.prompt().then(function(theWasSubmitted, theData){
          if( !(theWasSubmitted)) return;
          
          var tmpData = theData;

      		tmpData.id = tmpData.id.toLowerCase();
      		var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
      		var tmpBaseURL = 'http://localhost:33460/appdata/api/';
      		
      		var tmpPostOptions = {
      			formSubmit: false,
      			data: tmpData,
      			url: tmpBaseURL + 'mongo-create-account?open'
      		};
      		//console.log('tmpPostOptions',tmpPostOptions);
      		return ThisApp.apiCall(tmpPostOptions).then(function(theReply){
      		  console.log(theReply);
      		});
      		
        });
        ThisApp.loadSpot('mainout', 'Did it!');
    }


    ControlCode._onInit = _onInit;
    function _onInit(){
        this.tabs = this.parts.tabs;
        this.tabs.addTab({ item: 'main', text: "", icon: 'home', content:'<div class="ui message" spot="mainout"></div>'});
        console.log("Ran _onInit",this.parts);
    }

	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};
	return ThisControl;
})(ActionAppCore, $);