/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = { 
		"options": {
			padding: false,
		},
		"content": [
		{
			"ctl": "pagespot",
			"name": "ace-editor"
		}
	]
}

		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);


