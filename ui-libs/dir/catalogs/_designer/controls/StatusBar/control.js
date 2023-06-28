/*
SearchBar Control

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
				"name": "",
				"content": [
					{
						"ctl": "title",
						"name": "title",
						"text": "Common Status Bar"
					}
				]
			}
		]
	}

		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);

