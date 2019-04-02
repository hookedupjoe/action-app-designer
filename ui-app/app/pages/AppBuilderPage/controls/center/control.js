/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = { "content": [
		{
			"ctl": "spot",
			"name": "body"
		},
		{
			"ctl": "control",
			"controlname": "TesterControl",
			"source": "parent",
			"name": "control1"
		},
		{
			"ctl": "panel",
			"controlname": "east",
			"source": "parent",
			"name": "panel1"
		},		
		{
			"ctl": "cardfull",
			"classes": "orange raised tall",
			"name": "card-full-matt",
			"header": "Matt Giampietro",
			"meta": "<a>Friends</a>",
			"description": "Matthew is an interior designer living in New York.",
			"extraText": "<i class=\"user icon\"></i> 75 Friends",
			"extraTextRight": "Joined in 2013"
		}

	]
}

	var ThisControl = ThisApp.controls.newControl(ControlSpecs, {parent: ThisApp} )

	return ThisControl;

})(ActionAppCore, $);


