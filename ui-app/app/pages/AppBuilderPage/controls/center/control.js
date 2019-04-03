/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options" : {
			padding: true
		},
		"content": [
			{
				"ctl": "title",
				"size": "large",
				"icon": "globe",
				"name": "title",
				"color": "blue",
				"text": "Application Setup"
			},
			{
				"ctl": "sep",
				"size": "small",
				"icon": "road",
				"name": "about-your-app-sep",
				"text": "Application Information"
			},
			{
				"ctl": "fieldrow",
				"name": "info-row",
				"items": [
					{
						"name": "appname",
						"label": "Unique Name",
						"req": true
					},
					{
						"name": "title",
						"label": "App Title",
						"req": true
					}
				]
			},
			{
				"ctl": "sep",
				"size": "small",
				"icon": "cog",
				"name": "app-setup-info",
				"text": "Application Setup"
			},
			{
				"ctl": "fieldrow",
				"name": "options-row",
				"items": [
					{
						"ctl": "dropdown",
						"name": "cdn",
						"label": "CDN Location",
						"default": "local",
						"list": "Local|local,IBM Cloud|cloud,In App|app",
						"req": true
					},
					{
						"ctl": "dropdown",
						"name": "template",
						"label": "Application Template",
						"list": "Blank|tpl-blank,Testing|tpl-testing,Demos|tpl-demos",
						"req": true
					}
				]
			},
			{
				"name": "description",
				"label": "Description",
				"placeholder": "Enter optional details about this application",
				"ctl": "textarea",
				"rows": 2,
				"req": true
			}
		]	}

	var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};

	return ThisControl;

})(ActionAppCore, $);

