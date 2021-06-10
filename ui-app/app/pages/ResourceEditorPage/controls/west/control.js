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
				hidden: true,
				pageaction: "refreshResources",
				text: "Refresh",
				basic: true,
				"name": "refresh-resources"
			},
			{
				"ctl": "button",
				pageaction: "addResource",
				attr:{"restype":"control"},
				text: "New Control",
				basic: true,
				color: "purple",
				icon: "plus",
				"name": "btn-new-box"
			},
			{
				"ctl": "button",
				pageaction: "addResource",
				attr:{"restype":"panel"},
				text: "New Panel",
				basic: true,
				color: "purple",
				icon: "plus",
				"name": "btn-new-box"
			},
			{
				"ctl": "button",
				pageaction: "addResource",
				attr:{"restype":"template"},
				text: "New Template",
				basic: true,
				color: "purple",
				icon: "plus",
				"name": "btn-new-box"
			}
		]
		}

		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);

