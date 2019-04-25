/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			padding: false
		},
		"content": [
			{
				ctl: "div",
				attr: {
					pagespot: "body"
				},
				content: [
					{
						ctl: "div",
						attr: {
							appuse: "cards",
							group: "workspace-outline",
							item: "workspace"
						},
						content: [
							{
								ctl: "pagespot",
								name: "nav-tabs",
								text: "TEST"
							},
							{
								ctl: "segment",
								basic: true,
								slim: true,
								content: [
									{
										ctl: "title",
										icon: "hdd",
										color: "black",
										size: "large",
										text: "Designer Workspace"
									}
								]
							}
						]
					}
				]
			}
		]
	}

	var ControlCode = {};
	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;

})(ActionAppCore, $);

