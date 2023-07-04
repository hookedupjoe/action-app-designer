/*
Author: Joseph Francis
License: LGPL
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options" : {
			padding: false,
			css: [
				"table.outline > tbody > tr[oluse=\"select\"] {",
				"  cursor: pointer;",
				"}",
								"table.outline > tbody > tr > td.tbl-label {",
				"  width:90px;",
				"  color:black;",
				"  background-color: #eeeeee;",
				"}",
				"table.outline > tbody > tr.active > td.tbl-label {",
				"  width:90px;",
				"  background-color: #777777;",
				"  color: white;",
				"}",
				"table.outline > tbody > tr > td.tbl-icon {",
				"  width:40px;",
				"}",
				"table.outline > tbody > tr > td.tbl-icon2 {",
				"  width:80px;",
				"}",
				"table.outline > tbody > tr > td.tbl-details {",
				"  white-space: nowrap;",
				"  font-weight:bolder;",
				"  overflow:auto;",
				"  width:auto;",
				"}"
			]
		},
		"content": [
			{
				"ctl": "spot",
				"name": "body"
			},
			{
				ctl: "segment",
				basic: true,
				slim: true,
				name: "outline",
				content: [
					{
						ctl: "table",
						classes: "ui very compact table selectable outline",
						content: [
							{
								ctl: "tbody",
								content: [
									{
										ctl: "tr",
										classes: "",
										attr: {
											action: "selectMe",
											group: "app-outline",
											item: "application",
											type: "app",
											oluse: "select"
										},
										content: [
											{
												ctl: "td",
												classes: "tbl-icon",
												content: [
													{
														ctl: "i",
														classes: "large globe blue icon"
													}
												]
											},
											{
												ctl: "td",
												classes: "tbl-details",
												text: "My First App"
											},
											{
												ctl: "td",
												classes: "tbl-label",
												text: "ThisApp"
											},
											{
												ctl: "td",
												classes: "tbl-icon2",
												content: [
													{
														ctl: "i",
														attr: {
															action: "outlineDisplay",
															select: "false",
															scope: "children"
														},
														classes: "icon square minus large toright"
													},
													{
														ctl: "i",
														attr: {
															action: "outlineDisplay",
															select: "true",
															scope: "children"
														},
														classes: "icon square plus large toright"
													}
												]
											}
										]
									},
									{
										ctl: "tr",
										attr: {
											type: "app",
											oluse: "container"
										},
										content: [
											{
												ctl: "td",
												attr: {
													colspan: "4",
												},
												content: [
													{
														ctl: "table",
														classes: "ui very compact table selectable outline",
														content: [
															{
																ctl: "tbody",
																content: [
																	{
																		ctl: "tr",
																		attr: {
																			oluse: "collapsable",
																			action: "selectMe",
																			group: "app-outline",
																			item: "page1-page",
																			type: "page"
																		},
																		content: [
																			{
																				ctl: "td",
																				classes: "tbl-icon",
																				content: [
																					{
																						ctl: "i",
																						classes: "columns icon green large"
																					}
																				]
																			},
																			{
																				ctl: "td",
																				classes: "tbl-details",
																				text: "Home Page"
																			},
																			{
																				ctl: "td",
																				classes: "tbl-label",
																				text: "Page"
																			},
																			{
																				ctl: "td",
																				classes: "tbl-icon",
																				attr: {
																					action: "toggleMe"
																				},
																				content: [
																					{
																						ctl: "i",
																						classes: "icon square minus large toright"
																					}
																				]
																			}
																		]

																	},
																	{
																		ctl: "tr",
																		attr: {
																			type: "page",
																			oluse: "container"
																		},
																		content: [
																			{
																				ctl: "td",
																				attr: {
																					colspan: "4"
																				},
																				content: [
																					{
																						ctl: "table",
																						classes: "ui very compact table selectable outline",
																						content: [
																							{
																								ctl: "tbody",
																								content: [
																									{
																										ctl: "tr",
																										attr: {
																											type: "region",
																											type: "region",
																											action: "selectMe",
																											group: "app-outline",
																											item: "page1-east",
																											oluse: "select"
																										},
																										content: [
																											{
																												ctl: "td",
																												classes: "tbl-icon",
																												content: [
																													{
																														ctl: "i",
																														classes: "newspaper outline icon purple large"
																													}
																												]
																											},
																											{
																												ctl: "td",
																												classes: "tbl-details",
																												text: "East"
																											},
																											{
																												ctl: "td",
																												classes: "tbl-label",
																												text: "Panel"
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

		]
	}

	var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};

	return ThisControl;

})(ActionAppCore, $);

