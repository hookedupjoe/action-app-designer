/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			"padding": false,
		},
		"content": [
			{
				"ctl": "button",
				pageaction: "refreshWorkspace",
				text: "Refresh",
				basic: true,
				"name": "refresh-workspace"
			},
			{
				"ctl": "button",
				pageaction: "showOpenOnly",
				hidden: true,
				text: "Open Only",
				color: 'blue',
				basic: true,
				"name": "btn-show-open"
			},
			{
				"ctl": "panel",
				"controlname": "design/ws/get-ws-outline",
				"name": "workspace"
			}
		]
		}

		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);

