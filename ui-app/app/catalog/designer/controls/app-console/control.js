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
								"ctl": "pagespot",
								"spotname": "apptabs-preview"
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
		setup: setup
	};
	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	function setup(theDetails){
		var tmpAppName = theDetails.appname || '';
		this.controlConfig.index.controls.pages.controlname += tmpAppName
		this.controlConfig.index.controls.setupinfo.controlname += tmpAppName
	}

	return ThisControl;
})(ActionAppCore, $);

