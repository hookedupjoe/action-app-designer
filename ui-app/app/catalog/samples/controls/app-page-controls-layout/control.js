/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			"padding": false
		},
		"content": [		
			{
				ctl: "layout",
				name: "layout",
				center: [
					{
						ctl: "spot",
						name: "center",
						text: "Body Here"
					}
				],
				west: [
					{
						"ctl": "tbl-ol-node",
						"name": "application",
						"type": "app",
						"details": "My First App",
						"meta": "&#160;",
						"classes": "app-table",
						"level": 1,
						"group": "application-outline",
						"item": "application",
						"icon": "globe",
						"color": "blue",
						"content": [
							{
								"ctl": "tbl-ol-node",
								"type": "page",
								"name": "HomePage",
								"details": "HomePage",
								"meta": "&#160;",
								"level": 1,
								"group": "application-outline",
								"item": "page-HomePage",
								"icon": "columns",
								"color": "green",
								"content": [
									{
										"ctl": "tbl-ol-node",
										"name": "HomePage-east",
										"type": "region",
										"details": "East",
										"meta": "&#160;",
										"group": "application-outline",
										"item": "page-HomePage-east",
										"icon": "newspaper outline",
										"color": "purple"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "HomePage-center",
										"type": "region",
										"details": "Center",
										"meta": "&#160;",
										"group": "application-outline",
										"item": "page-HomePage-center",
										"icon": "newspaper",
										"color": "purple"
									}
								]
							}
						]
					}
				
				],
				north: [
					{
						"ctl": "title",
						"name": "layout-title",
						"size": "large",
						"color": "black",
						"text": "Page Code"
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
		var tmpPageName = theDetails.pagename || '';
		this.params = this.params || {};
		this.params.pagename = tmpPageName;
		var tmpTitle = theDetails.title || theDetails.pagetitle || tmpPageName;
		// this.controlConfig.index.controls.pages.controlname += tmpPageName
		// this.controlConfig.index.controls.setupinfo.controlname += tmpPageName
		var tmpPageTitle = tmpPageName
		if (tmpTitle && (tmpTitle != tmpPageName)) {
			tmpPageTitle = '[' + tmpPageName + '] ' + tmpTitle;
		}
		this.controlConfig.index.items.title.text = tmpPageTitle;
		
	
	}





	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;
})(ActionAppCore, $);

