/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"content": [
			{
				"ctl": "field",
				"size": "huge",
				"name": "title",
				"text": "Hello World"
			}
		]
	}

	var ThisControl = ThisApp.controls.newControl(ControlSpecs, {parent: ThisApp} )

	return ThisControl;

})(ActionAppCore, $);

