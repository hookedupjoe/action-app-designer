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
				"ctl": "layout",
				"name": "layout",
			
				"north": [
					{
						"ctl": "title",
						"size": "small",
						"text": "JSON - Helpers"
					}
				],

				"center": [
					{
						"ctl": "title",
						"size": "larger",
						"text": "Post Master"
					}
				]

			}
		]
	}

		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);

