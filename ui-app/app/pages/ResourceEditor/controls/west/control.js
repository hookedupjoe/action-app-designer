/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"related": {
			"workspace": {
				 content: []
			}
		},
		"options": {
			"padding": false,
		},
		"content": [
			{
				"ctl": "button",
				pageaction: "refreshResources",
				text: "Refresh",
				basic: true,
				"name": "refresh-resources"
			},
			{
				"ctl": "button",
				pageaction: "addResource",
				text: "Add ...",
				basic: true,
				color: "purple",
				icon: "plus",
				"name": "btn-new-box"
			},
			{
				"ctl": "panel",
				"controlname": "design/ws/get-ws-resources",
				"name": "resources"
			}
		]
		}

		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);

