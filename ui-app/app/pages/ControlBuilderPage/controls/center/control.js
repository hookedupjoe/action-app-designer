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
			"name": "details-editor"
		}
	]
}

	var ThisControl = ThisApp.controls.newControl(ControlSpecs, {parent: ThisApp} )

	return ThisControl;

})(ActionAppCore, $);


