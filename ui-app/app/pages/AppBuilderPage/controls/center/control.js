/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			padding: true
		},
		"content": [
			{
				ctl: "title",
				size: "large",
				text: "Testing Drop Down Menu"
			},
			{
				ctl: "dropmenu",
				icon: "sidebar",
				text: "Select Person",
				content: [
					{
						ctl: "item",
						classes: 'fluid',
						attr: {
							pageaction: 'runTest1'
						},
						text: "Run Test 1"
					},
					{
						ctl: "item",						
						classes: 'fluid',
						attr: {
							pageaction: 'runTest2'
						},
						text: "Run Test 2"
					}
				]
			}
		]

	}

	var ControlCode = {};
	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;

})(ActionAppCore, $);

