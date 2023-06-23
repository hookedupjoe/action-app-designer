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
				items: [
					{
						"ctl": "title",
						"text": "Sample Panels"
					},
					{
						"ctl": "pagespot",
						"name": "control-list"
					}
				]
			}

		]
	}

		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);

