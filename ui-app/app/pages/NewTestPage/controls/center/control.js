/*
Author: Joseph Francis
License: LGPL
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options" : {
			padding: false
		},
		"content": [
			{
				"ctl":"pagespot",
				"name": "funspot"
			}
			
		]	
	
	}

	var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};

	return ThisControl;

})(ActionAppCore, $);

