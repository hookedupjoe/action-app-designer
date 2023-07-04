/*
Author: Joseph Francis
License: LGPL
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			"padding": true
		},
		"content": [
			{
				"ctl":"button",
				"text": "Format JSON",
				"color": "purple",
				"pageaction": "formatJson"
			},
			{
				"ctl":"button",
				"text": "Clear JSON",
				"pageaction": "clearJson"
			},
			{
				"ctl":"sep",
				"clearing": true
			},
			{
				"ctl":"button",
				"text": "Copy to Clipbaord",
				"color": "blue",
				"fluid": true,
				"pageaction": "toClipboard"
			},
			{
				"ctl":"sep",
				"clearing": true,
				'fitted': true
			},
			{
				"ctl":"button",
				"text": "Select All",
				"color": "blue",
				"fluid": true,
				"pageaction": "selectAll"
			}
		]
	}

	var tmpOptional = [
		{
			"ctl":"button",
			"text": "Save JSON",
			"fluid": true,
			"color": "blue",
			"pageaction": "saveJson"
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
			"text": "Load Selected",
			"disabled": true,
			"name": "btn-load-selected",
			"fluid": true,
			"color": "green",
			"pageaction": "loadJsonClipboardSelected"
		},
		{
			"ctl":"button",
			"text": "Delete All Saved",
			"fluid": true,						
			"disabled": true,
			"color": "red",							
			"name": "btn-delete-all-saved",
			"pageaction": "clearClipboardList"
		}]
		var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};


	return ThisControl;

})(ActionAppCore, $);

