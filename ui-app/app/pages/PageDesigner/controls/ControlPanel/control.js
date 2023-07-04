/*
Author: Joseph Francis
License: LGPL
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			"padding": false
		},
		"content": [
			{
				"ctl": "tabs",
				"name": "main-tabs",
				"tabs": [
					{
						"label": "Controls",
						"name": "main-tab-1",
						"ctl": "tab",
						"content": [
							{
								"ctl": "tabs",
								"name": "control-tabs",
								"color": "purple",
								"tabs": [
									{
										"label": "Available",
										"name": "control-tab-list-tab",
										"ctl": "tab",
										"content": [
											{
												"ctl": "pagespot",
												"name": "control-list"
											}
										]
									},
									{
										"label": "Loaded",
										"name": "control-tab-loaded-tab",
										"ctl": "tab",
										"content": [
											{
												"ctl": "pagespot",
												"name": "control-tab-loaded"
											},
											{
												"ctl":"button",
												"text": "Show Debug Page",
												"color": "purple",
												"attr": {
													"action": "openPage", 
													"pagename": "DebugPage"
												}

											}
										]
									}
								]
							}
						]
					},
					{
						"label": "Catalog",
						"name": "apps-catalog-tab",
						"ctl": "tab",
						"content": [
							{
								"ctl": "ui",
								"name": "demo-cat-items",
								"content": [
									{
										"ctl": "ui",
										"classes": "vertical menu slim fluid",
										"content": [
											{
												"ctl": "a",
												"classes": "active blue item",
												"text": "Item 1",
												"content": [
													{
														"ctl": "i",
														"classes": "ui icon arrow right blue"
													}
												]
											},
											{
												"ctl": "a",
												"classes": "item",
												"text": "Item 2",
												"content": [
													{
														"ctl": "i",
														"classes": "ui icon arrow right blue"
													}
												]
											},
											{
												"ctl": "a",
												"classes": "item",
												"text": "Another Item",
												"content": [
													{
														"ctl": "i",
														"classes": "ui icon arrow right blue"
													}
												]
											}
										]


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
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);

