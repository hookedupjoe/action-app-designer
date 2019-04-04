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
			"padding": true,
		},
		"content": [
			{
				"ctl": "panel",
				"controlname": "design/ws/get-apps",
				"name": "workspace"
			}
		]
		}

		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);

