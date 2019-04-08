/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			padding: true
		},
		"content": [
			{
				"ctl": "title",
				"size": "large",
				"icon": "hdd",
				"name": "title",
				"text": "Setup your workspace"
			},
			{
				"ctl": "field",
				"name": "root",
				"label": "Workspace Directory",
				"default": "[home]/actapp",
				"req": true
			},
			{
				ctl: 'button',
				label: 'Setup Workspace',
				pageaction: 'setupWS'
			}

		]

	}

	var ControlCode = {};
	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;

})(ActionAppCore, $);

