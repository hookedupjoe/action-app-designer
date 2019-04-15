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
				"ctl": "tabs",
				"name": "main-tabs",
				"tabs": [
					{
						"label": "Controls",
						"name": "main-tab-1",
						"ctl": "tab",
						"content": [
							{
								"ctl":"button",
								"text": "Format JSON",
								"color": "purple",
								"pageaction": "formatJson",
							},
							{
								"ctl":"button",
								"text": "Clear JSON",
								"pageaction": "clearJson",
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

