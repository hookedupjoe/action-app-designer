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
				"ctl": "tabs",
				"name": "page-layout-tabs",
				"tabs": [
					{
						"label": "Regions",
						"name": "page-layout-tabs-regions",
						"ctl": "tab",
						"content": [
							{
								"ctl": "checkboxlist",
								readonly: true,
								"name": "regions-to-include",
								"label": "Optional Regions",
								"list": "North,South,East,West",
								"req": true
							}
						]
					},
					{
						"label": "Config",
						"name": "page-layout-tabs-config",
						"ctl": "tab",
						"content": [
							{
								"ctl": "textarea",
								label: "Config JSON",
								"name": "setupinfo"
							}
						]
					}

				]
			}
		]

	}

	var ControlCode = {

	};

	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };


	return ThisControl;
})(ActionAppCore, $);

