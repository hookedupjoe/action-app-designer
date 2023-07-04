/*
Author: Joseph Francis
License: LGPL
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"related": {
			"workspace": {
				 content: []
			}
		},
		"options": {
			"padding": false,
		},
		"content": [
			{
				"ctl": "button",
				pageaction: "refreshPages",
				text: "Refresh",
				basic: true,
				"name": "refresh-pages"
			},
			{
				"ctl": "button",
				pageaction: "addPage",
				text: "Add Page",
				basic: true,
				color: "green",
				icon: "plus",
				"name": "btn-new-page"
			},
			{
				"ctl": "panel",
				"controlname": "design/ws/get-ws-pages",
				"name": "pages"
			}
		]
		}

		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);

