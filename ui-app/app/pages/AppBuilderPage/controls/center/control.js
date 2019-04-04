/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options" : {
			padding: false
		},
		"content": [
			{
				"ctl": "panel",
				"controlname": "design/ws/apps",
				"name": "workspace"
			}
			
		]	
	
	}

	var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};

	return ThisControl;

})(ActionAppCore, $);

