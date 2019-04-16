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
						"name": "page-code",
						"type": "page",
						"details": "Page Outline",
						"meta": "&#160;",
						"classes": "page-code-table",
						"level": 1,
						"group": "page-code-outline",
						"item": "page",
						"icon": "columns",
						"color": "green",
						"content": [
							{
								"ctl": "tbl-ol-node",
								"type": "layout",
								"name": "Layout",
								"details": "Layout",
								"meta": "&#160;",
								"level": 1,
								"group": "page-code-outline",
								"item": "outline-layout",
								"icon": "calculator",
								"color": "orange",
								"content": [
									{
										"ctl": "tbl-ol-node",
										"name": "layout-regions",
										"details": "Regions",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "layout-regions",
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "layout-config",
										"details": "Config",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "layout-config",
										"icon": "file code outline",
										"color": "blue"
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

