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
				"ctl": "segment",
				"basic": true,
				"slim": true,
				"name": "demo-item",
				"content": [
					{
						"ctl": "field",
						"name": "search",
						"fluid": true,
						"placeholder": "Search for ...",
						"content": [
							{
								"ctl": "button",
								"color": "green",
								"icon": "search",
								"name": "btn-search",
								"pageaction": "controlSearch"
							},
							{
								"ctl": "button",
								"icon": "close",
								"name": "btn-clear",
								"pageaction": "controlSearchClear"
							},
							{
								"ctl": "button",
								"icon": "plus",
								"text": "Add",
								"right": "true",
								"color": "blue",
								"name": "btn-add",
								"pageaction": "controlSearchAdd"
							}
						]
					}
				]
			}
		]
	}

	var ThisControl = ThisApp.controls.newControl(ControlSpecs, {parent: ThisApp} )

	return ThisControl;

})(ActionAppCore, $);


