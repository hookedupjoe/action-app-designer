/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			"padding": true
		},
		"content": [
			{
				"ctl": "title",
				"name": "title",
				"size": "large",
				"color": "blue",
				"icon": "columns",
				"text": "Resource Name"
			},
			{
				"ctl": "tabs",
				"name": "pagetabs",
				"tabs": [
					{
						"label": "Resource Setup",
						"name": "pagetabs-setup",
						"ctl": "tab",
						"content": [

							{
								"ctl": "tabs",
								"name": "resource-setup-tabs",
								"tabs": [
									{
										"label": "Resource Info",
										"name": "resource-setup-tabs-info",
										"ctl": "tab",
										"content": [
											{
												"ctl": "field",
												"name": "title",
												"label": "Resource / Tab Title",
												"req": true
											},
											{
												"ctl": "radiolist",
												"name": "where-to-show",
												"label": "Where to show",
												"list": "Primary|primary,Side Only|side,Hidden|hidden",
												"req": true
											},
											{
												"ctl": "hidden",
												"name": "pagename"
											}
										]
									},
									{
										"label": "Resource Resources",
										"name": "resource-setup-tabs-required",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Resources loaded when resource loads",
												"name": "setup-required"
											}
										]
									}
				
								]
							}
						]
					},
				
					{
						"label": "Layout",
						"name": "pagetabs-layout",
						"ctl": "tab",
						"content": [
							{
								"ctl": "tabs",
								"name": "resource-layout-tabs",
								"tabs": [
									{
										"label": "Regions",
										"name": "resource-layout-tabs-regions",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Layout Options JSON",
												"name": "layout-options"
											}
										]
									},
									{
										"label": "Config",
										"name": "resource-layout-tabs-config",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Config JSON",
												"name": "layout-config"
											}
										]
									}
				
								]
							}
						]
				
					},
					{
						"label": "Events",
						"name": "pagetabs-events",
						"ctl": "tab",
						"content": [
							{
								"ctl": "tabs",
								"name": "resource-events-tabs",
								"tabs": [
									{
										"label": "Initialize",
										"name": "resource-events-tabs-on-init",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Initilized when app loads",
												"name": "on-init"
											}
										]
									},
									{
										"label": "First Activate",
										"name": "resource-events-tabs-on-first-init",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "First time activated - before content loads",
												"name": "on-first-init"
											}
										]
									},
									{
										"label": "First Load",
										"name": "resource-events-tabs-on-first-load",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Ready event - after content loaded",
												"name": "on-first-load"
											}
										]
									},
									{
										"label": "Activate",
										"name": "resource-events-tabs-on-activate",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Activate event - runs every time resource is activated",
												"name": "on-activate"
											}
										]
									},
									{
										"label": "Resize",
										"name": "resource-events-tabs-on-resize",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Resize event - runs when layout is resized",
												"name": "on-resize"
											}
										]
									}
								]
							}
						]
				
					},
					{
						"label": "Code",
						"name": "pagetabs-code",
						"ctl": "tab",
						"content": [
							{
								"ctl": "textarea",
								"label": "Resource Code",
								"name": "resource-code"
							}
						]
					}
	
					
				]
	
	
			}
	
		]
	
	}

	var ControlCode = {
		setup: setup
	};


	//---- Initial Setup of the control
	function setup(theDetails) {
		console.log( 'setup theDetails', theDetails);
		var tmpResName = theDetails.resname || '';
		var tmpResType = theDetails.restype || '';
		this.params = this.params || {};
		this.params.resname = tmpResName;
		this.params.restype = tmpResType;
		var tmpTitle = tmpResType + ": " + tmpResName;

		this.controlConfig.index.items.title.text = tmpTitle;
	
	}





	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;
})(ActionAppCore, $);

