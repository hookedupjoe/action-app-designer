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
						"label": "Projects",
						"name": "main-tab-1",
						"ctl": "tab",
						"content": [
							{
								"ctl": "tabs",
								"name": "catalog-tabs",
								"color": "purple",
								"tabs": [
									{
										"label": "Available",
										"name": "apps-tab-list-tab",
										"ctl": "tab",
										"content": [
											{
												"ctl": "ui",
												"name": "demo-item",
												"content": [
													{
														"ctl": "ui",
														"classes": "vertical menu slim fluid",
														"content": [
															{
																"ctl": "a",
																"classes": "active blue item",
																"text": "Designer",
																"content": [
																	{
																		"ctl": "ui",
																		"classes": "label  blue",
																		"text": "3"
																	}
																]
															},
															{
																"ctl": "a",
																"classes": "item",
																"text": "Test Apps",
																"content": [
																	{
																		"ctl": "ui",
																		"classes": "label",
																		"text": "7"
																	}
																]
															},
															{
																"ctl": "a",
																"classes": "item",
																"text": "More Apps",
																"content": [
																	{
																		"ctl": "ui",
																		"classes": "label",
																		"text": "2"
																	}
																]
															}
														]


													}
												]
											}
										]
									},
									{
										"label": "Recent",
										"name": "apps-tab-recent-tab",
										"ctl": "tab",
										"content": [
											{
												"ctl": "pagespot",
												"name": "apps-tab-recent"
											},
											{
												"ctl": "button",
												"label": "Test 1", 
												"name": "btn-runtest1",
												"pageaction": "runTest1"
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

