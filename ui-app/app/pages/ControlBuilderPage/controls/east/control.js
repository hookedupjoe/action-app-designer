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
						"ctl": "pagespot",
						"name": "preview-area"
					}
				]
			}
		]
	}

		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);


