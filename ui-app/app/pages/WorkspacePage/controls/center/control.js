/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			padding: false
		},
		"content": [
		{
			ctl: "layout",
			name: "layout",
			north: [{
				ctl: "div",
				attr: {
					pagespot: "nav-tabs",
					text: ""
				}
			}],
			center: [
				
				{
					ctl: "div",
					attr: {
						pagespot: "ws-work-area"
					},
					content: [
						{
							ctl: "div",
							attr: {
								appuse: "cards",
								group: "workspace-outline",
								item: "workspace"
							},
							content: [
								{
									ctl: "segment",
									basic: true,
									slim: true,
									content: [
									
										{
											ctl: "title",
											icon: "hdd",
											color: "black",
											size: "large",
											text: "Designer Workspace"
										},
										{
											ctl: "segment",
											basic: true,
											slim: true,
											content: [
												{
													"ctl": "button",
													"color": "blue",
													"size": "large",
													"pageaction": "addApp",
													"labeled": true,
													"right": true,
													"icon": "globe",
													"name": "btn-new-app",
													"text": "New Application"
												},
												{
													"ctl": "button",
													"color": "teal",
													"size": "large",
													"pageaction": "addCatalog",
													"labeled": true,
													"right": true,
													"icon": "archive",
													"name": "btn-new-cat",
													"text": "New Catalog"
												},
												{
													"ctl": "panel",
													"controlname": {"[computed]": "context.app.data.designer.endpoints.get_ws_outline || ''"},
													"name": "listpanel"
												}
	
											]
										}
	
									]
								}
							]
						}
					]
				}
			]
		}
		]
	}

	
	
	var ControlCode = {
		_onInit: _onInit,
		_onPreInit: _onPreInit
	};

	function _onInit(){
		this.parts.listpanel.subscribe('selectMe', onWsSelect.bind(this))
	}

	function _onPreInit(){

	}

	function onWsSelect(theEvent, theControl, theTarget){
		this.publish('selected', [theControl, theTarget])
	}


	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;

})(ActionAppCore, $);

