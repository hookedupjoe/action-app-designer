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
				"icon": "globe",
				"text": "Application"
			},
			{
				"ctl": "tabs",
				"name": "apptabs",
				"tabs": [
					{
						"label": "Design",
						"name": "apptabs-design",
						"ctl": "tab",
						"content": [
							{
								"ctl": "tabs",
								"name": "apptabs-design-tabs",
								"tabs": [
									{
										"label": "Pages",
										"name": "apptabs-pages",
										"ctl": "tab",
										"content": [
											{
												"ctl": "panel",
												"controlname": "design/ws/get-pages?appname=",
												"name": "pages"
											}
										]
									},
									{
										"label": "Catalog",
										"name": "apptabs-catalog",
										"ctl": "tab",
										"content": [
											{
												"ctl": "pagespot",
												"spotname": "apptabs-catalog",
												"text": "CATALOG GOES HERE"
											}
										]
									}
								]
							}
						]
					},
					{
						"label": "Preview",
						"name": "apptabs-preview",
						"ctl": "tab",
						"content": [
							{
								"ctl": "a",
								"classes": "ui button blue",
								"attr": {
										href:"http://localhost:33461/app001",
										target: "app-app001"
								},
								text: "Preview Now",
								"name": "preview-link"
							}
						]
					},
					{
						"label": "Deploy",
						"name": "apptabs-deploy",
						"ctl": "tab",
						"content": [
							{
								"ctl": "pagespot",
								"spotname": "apptabs-deploy"
							}
						]
					},
					{
						"label": "Setup",
						"name": "apptabs-setup",
						"ctl": "tab",
						"content": [
							{
								"ctl": "panel",
								"controlname": "design/ws/panel-app-setup?appname=",
								"name": "setupinfo"
							}
						]
					}
				]
			}
		]
	}

	var ControlCode = {
		setup: setup,
		promptForSetupInfo: promptForSetupInfo
	};
	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	function setup(theDetails){
		var tmpAppName = theDetails.appname || '';
		var tmpTitle = theDetails.title || heDetails.apptitle || tmpAppName;
		this.controlConfig.index.controls.pages.controlname += tmpAppName
		this.controlConfig.index.controls.setupinfo.controlname += tmpAppName
		var tmpAppTitle = tmpAppName
		if( tmpTitle ){
			tmpAppTitle = '[' + tmpAppName + '] ' + tmpTitle;
		}
		this.controlConfig.index.items.title.text = tmpAppTitle;
		this.controlConfig.index.items["preview-link"].attr = {
			href:"http://localhost:33461/" + tmpAppName,
			target: "app" + tmpAppName
		}

	}

	function promptForSetupInfo(){
		this.parts.setupinfo.refreshUI({readonly:false});
		this.gotoItem('setupinfo');
		this.parts.setupinfo.gotoField("appname");
	}

	return ThisControl;
})(ActionAppCore, $);

