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
							},
							{
								"ctl":"sep",
								"clearing": true
							},
							{
								"ctl":"button",
								"text": "Save JSON",
								"pageaction": "saveJson",
							},
							{
								"ctl":"divider",
								"label": "Clipboard",
								"size":"small",
								"color": "blue"
							},
							{
								"ctl":"dropdown",
								"label": "Saved JSON",
								"name":"json-clipboard",
								"list": {
									"[computed]": "context.page.data.jsonClipboardList || ''"
								}
							},
							{
								"ctl":"button",
								"text": "Load Selected JSON",
								"disabled": true,
								"name": "btn-load-selected",
								"pageaction": "loadJsonClipboardSelected",
							},
						]
					},
					{
						"label": "Saved",
						"name": "main-tab-2",
						"ctl": "tab",
						"content": [
							{
								"ctl":"button",
								"text": "Save JSON",
								"pageaction": "saveJson",
							},
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
			}
		]
	}

		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);

