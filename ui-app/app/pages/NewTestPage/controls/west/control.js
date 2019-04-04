/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
	
		"options": {
			"padding": true,
		},
		"content": [
			{
				"ctl": "button",
				"name": "btn-load-spot",
				"label": "Load A Spot",
				"pageaction": "loadASpot"
			}
		]
		}

		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);

