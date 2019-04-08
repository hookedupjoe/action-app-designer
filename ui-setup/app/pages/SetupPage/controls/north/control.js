/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			"padding": true
		},
		"content": [
			{
				"ctl": "title",
				"size": "small",
				"text": "Action App Designer - First Time Setup"
			}
		]
	}

	var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};

	return ThisControl;

})(ActionAppCore, $);

