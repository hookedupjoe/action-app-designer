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
				"name": "page-events-tabs",
				"tabs": [
					{
						"label": "Initialize",
						"name": "page-events-tabs-on-init",
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
						"name": "page-events-tabs-on-first-init",
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
						"name": "page-events-tabs-on-first-load",
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
						"name": "page-events-tabs-on-activate",
						"ctl": "tab",
						"content": [
							{
								"ctl": "textarea",
								label: "Activate event - runs every time page is activated",
								"name": "on-activate"
							}
						]
					},
					{
						"label": "Resize",
						"name": "page-events-tabs-on-resize",
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

	}

	var ControlCode = {

	};

	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };


	return ThisControl;
})(ActionAppCore, $);

