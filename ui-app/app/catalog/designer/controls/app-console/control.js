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
								"classes": "ui button green",
								"attr": {
									href: "http://localhost:33461/app001",
									target: "app-app001"
								},
								text: "Preview Now",
								"name": "preview-link"
							},
							{
								"ctl": "button",
								"color": "blue",
								pageaction: "openInCode",
								"attr": {
									appname: ""
								},
								text: "Open in VS Code",
								"name": "open-in-vs-code"
							},
							{
								"ctl": "button",
								pageaction: "rebuildApp",
								"attr": {
									appname: ""
								},
								text: "Rebuild",
								"name": "rebuild-app"
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
								"ctl": "button",
								"toright": true,
								"color": "blue",
								"size": "large",
								"labeled": true,
								"right": true,
								"icon": "arrow down",
								pageaction: "promptAppSetup",
								"attr": {
									appname: ""
								},
								text: "Edit Setup",
								"name": "edit-app-setup"
							},
							{
								"ctl": "button",
								"size": "large",
								"basic": true,
								"icon": "close",
								hidden: true,
								pageaction: "cancelAppSetup",
								"attr": {
									appname: ""
								},
								text: "Cancel",
								"name": "cancel-app-setup"
							},
							{
								"ctl": "button",
								"hidden": true,
								"toright": true,
								"color": "green",
								"size": "large",
								"labeled": true,
								"right": true,
								"icon": "save",
								pageaction: "saveAppSetup",
								"attr": {
									appname: ""
								},
								text: "Save Setup",
								"name": "save-app-setup"
							},
							{
								"ctl": "divider",
								"color": "blue",
								"size": "medium",
								"text": "Welcome",
								"clearing": true
							}
							,
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
		refreshPages: refreshPages,
		refreshSetupInfo: refreshSetupInfo,
		getSetupInfo: getSetupInfo,
		promptForSetupInfo: promptForSetupInfo
	};
	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	function setup(theDetails) {
		var tmpAppName = theDetails.appname || '';
		var tmpTitle = theDetails.title || heDetails.apptitle || tmpAppName;
		this.controlConfig.index.controls.pages.controlname += tmpAppName
		this.controlConfig.index.controls.setupinfo.controlname += tmpAppName
		var tmpAppTitle = tmpAppName
		if (tmpTitle) {
			tmpAppTitle = '[' + tmpAppName + '] ' + tmpTitle;
		}
		this.controlConfig.index.items.title.text = tmpAppTitle;
		this.controlConfig.index.items["preview-link"].attr = {
			href: "http://localhost:33461/" + tmpAppName,
			target: "app" + tmpAppName
		}
		this.controlConfig.index.items["open-in-vs-code"].attr = {
			appname: tmpAppName
		}
		this.controlConfig.index.items["rebuild-app"].attr = {
			appname: tmpAppName
		}
		this.controlConfig.index.items["edit-app-setup"].attr = {
			appname: tmpAppName
		}
		this.controlConfig.index.items["save-app-setup"].attr = {
			appname: tmpAppName
		}
		this.controlConfig.index.items["cancel-app-setup"].attr = {
			appname: tmpAppName
		}
		
		

		


	}
	
	function promptForSetupInfo() {
		this.parts.setupinfo.refreshUI({ readonly: false });
		this.gotoItem('setupinfo');
		this.parts.setupinfo.gotoField("appname");
	}

	function refreshPages(){
		this.parts.pages.refreshFromURI();
	}

	function refreshSetupInfo(){
		this.parts.setupinfo.refreshFromURI();
	}
	function getSetupInfo(){
		return this.parts.setupinfo.getData();
	}

	return ThisControl;
})(ActionAppCore, $);

