(function (ActionAppCore, $) {

	var ControlSpecs = { 
		options: {
			padding: true
		},
		content: [
	{
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
              "label": "Add",
              "onClick": {
                "run": "action",
                "action": "newDoc"

              }
            },
              {
                "ctl": "button",
                "toLeft": true,
                "color": "blue",
                "icon": "pencil",
                compact: true,
                "name": "btn-page-tb-edit",
                "label": "Edit",
                "onClick": {
                  "run": "action",
                  "action": "editDoc"
                }
              },
              {
                "ctl": "button",
                "toLeft": true,
                "color": "blue",
                "icon": "trash",
                compact: true,
                "name": "btn-page-tb-recycle",
                "label": "Recycle",
                "onClick": {
                  "run": "action",
                  "action": "recycleSelected"
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
        console.log("Ran newDoc")
        ThisApp.loadSpot('mainout', 'new');
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