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
				ctl: "layout",
				name: "layout",
				center: [
					{
						ctl: "spot",
						name: "ace-editor",
						text: ""
					}
				],
				west: [
					{
						"ctl": "tbl-ol-node",
						"name": "page-code",
						"type": "page",
						"details": "Code Outline",
						"meta": "&#160;",
						"classes": "page-code-table",
						"level": 1,
						"group": "page-code-outline",
						"item": "page",
						"icon": "columns",
						"color": "green",
						"content": [
							{
								"ctl": "tbl-ol-node",
								"type": "setup",
								"name": "Setup",
								"details": "Page",
								"meta": "&#160;",
								"level": 2,
								"icon": "certificate",
								"color": "green",
								"content": [
									{
										"ctl": "tbl-ol-node",
										"name": "setup-pageinfo",
										"details": "Page Info",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "setup-pageinfo",
										"onClick": {
											"run": "action",
											"action": "showCode",
											"name": "thisPageSpecs"
										},
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "setup-resources",
										"details": "Resources",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "setup-resources",
										"onClick": {
											"run": "action",
											"action": "showCode",
											"name": "required"
										},
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "setup-pagecode",
										"details": "Page Code",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "setup-pagecode",
										"onClick": {
											"run": "action",
											"action": "showCode",
											"name": "YourPageCode"
										},
										"icon": "file code outline",
										"color": "blue"
									}
								]
							},
							{
								"ctl": "tbl-ol-node",
								"type": "layout",
								"name": "Layout",
								"details": "Layout",
								"meta": "&#160;",
								"level": 2,
								"icon": "calculator",
								"color": "orange",
								"content": [
									{
										"ctl": "tbl-ol-node",
										"name": "layout-regions",
										"details": "Regions",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "layout-regions",
										"onClick": {
											"run": "action",
											"action": "showCode",
											"name": "layoutOptions"
										},
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "layout-config",
										"details": "Config",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "layout-config",
										"onClick": {
											"run": "action",
											"action": "showCode",
											"name": "layoutConfig"
										},
										"icon": "file code outline",
										"color": "blue"
									}
								]
							},
							{
								"ctl": "tbl-ol-node",
								"type": "events",
								"name": "Events",
								"details": "Events",
								"meta": "&#160;",
								"level": 2,
								"icon": "recycle",
								"color": "black",
								"content": [
									{
										"ctl": "tbl-ol-node",
										"name": "events-pre-init",
										"details": "Pre Init",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "events-pre-init",
										"onClick": {
											"run": "action",
											"action": "showCode",
											"name": "_onPreInit"
										},
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "events-init",
										"details": "Initialize",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "events-init",
										"onClick": {
											"run": "action",
											"action": "showCode",
											"name": "_onInit"
										},
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "events-preload",
										"details": "Pre Load",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "events-preload",
										"onClick": {
											"run": "action",
											"action": "showCode",
											"name": "_onFirstActivate"
										},
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "events-load",
										"details": "Initial Load",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "events-load",
										"onClick": {
											"run": "action",
											"action": "showCode",
											"name": "_onFirstLoad"
										},
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "events-resize",
										"details": "Resized",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "events-resize",
										"onClick": {
											"run": "action",
											"action": "showCode",
											"name": "_onResizeLayout"
										},
										"icon": "file code outline",
										"color": "blue"
									}
								]
							}
						]
					}

				],
				north: [
					{
						"ctl": "field",
						"name": "title",
						"fluid": true,
						"readonly": true,
						"inputClasses": "title",
						"default": "My Page",
						"placeholder": "",
						"content": [
							{
								"ctl": "button",
								"color": "green",
								"icon": "search",
								"name": "title",
								"onClick": {
									"run": "publish",
									"event": "ctl-event",
									"params": "search"
								}
							},
							{
								"ctl": "button",
								"icon": "close",
								"name": "btn-clear",
								"onClick": {
									"run": "publish",
									"event": "ctl-event",
									"params": "clear"
								}
							},
							{
								"ctl": "button",
								"icon": "plus",
								"text": "Add",
								"right": "true",
								"color": "orange",
								"name": "btn-add",
								"onClick": {
									"run": "publish",
									"event": "ctl-event",
									"params": "add",
									"validate": true
								}
							}
						]
					}
				]
				
			}

		]

	}

	var ControlCode = {
		setup: setup,
		preLoad: preLoad,
		refreshFromSource: refreshFromSource,
		refreshFromLoaded: refreshFromLoaded,
		refreshEditorFromCodeIndex: refreshEditorFromCodeIndex,
		showCode: showCode,
		uniqueGroups: uniqueGroups,
		setupEditor: setupEditor
	};


	//--- Run before
	function preLoad(theDetails) {
		var tmpPageName = theDetails.pagename || '';
		this.uniqueGroups(tmpPageName);
	}
	//---- Initial Setup of the control
	function setup(theDetails) {
		var tmpPageName = theDetails.pagename || '';
		this.params = this.params || {};
		this.params.pagename = tmpPageName;
		var tmpTitle = theDetails.title || theDetails.pagetitle || tmpPageName;
		// this.controlConfig.index.controls.pages.controlname += tmpPageName
		// this.controlConfig.index.controls.setupinfo.controlname += tmpPageName
		var tmpPageTitle = tmpPageName
		if (tmpTitle && (tmpTitle != tmpPageName)) {
			tmpPageTitle = '[' + tmpPageName + '] ' + tmpTitle;
		}
		this.controlConfig.index.items.title.text = tmpPageTitle;


		this.setupEditor();
		this.endpointURL = 'design/ws/page-code?run&source=workspace&pagename=' + tmpPageName;
		this.refreshFromSource();

	}


	function uniqueGroups(theUniqueness) {
		var tmpIndex = this.getIndex();
		if (tmpIndex && tmpIndex.items) {
			for (var aName in tmpIndex.items) {
				var tmpEntry = tmpIndex.items[aName];
				if (tmpEntry && ThisApp.util.isStr(tmpEntry.group)) {
					tmpEntry.group += theUniqueness;
				}
			}
		}
	}

	function setupEditor() {
		if (this.editorSetup === true) {
			return;
		}
		this.editorSetup = true;
		
		this.aceEditorEl = this.getSpot("ace-editor");
		this.aceEditor = ace.edit(this.aceEditorEl.get(0));
		this.aceEditor.setTheme("ace/theme/vibrant_ink");
		this.aceEditor.setFontSize(16);
	}

	function refreshEditorFromCodeIndex() {
		for (var aName in this.loaded.codeIndex) {
			var tmpCode = this.loaded.codeIndex[aName];
			if (!(this.loaded.sessions[aName])) {
				this.loaded.sessions[aName] = ace.createEditSession(aName, "ace/mode/javascript")
			}
			this.loaded.sessions[aName].setValue(tmpCode);
		}

	}

	var defaultCodeName = 'thisPageSpecs'
	function refreshFromLoaded() {
		this.refreshEditorFromCodeIndex();
		this.showCode();
	}


	function showCode(theParams) {
		var tmpParams = theParams || {};
		if (typeof (tmpParams) == 'string') {
			tmpParams = { name: tmpParams }
		}
		var tmpName = tmpParams.name || tmpParams.codename || defaultCodeName;
		this.aceEditor.setSession(this.loaded.sessions[tmpName])
	}

	function refreshFromSource() {
		var tmpThis = this;

		ThisApp.apiCall(this.endpointURL).then(function (theReply) {
			if (theReply && theReply.index && theReply.parts) {
				var tmpIndex = theReply.index;
				var tmpParts = theReply.parts;
				var tmpCodeIndex = {};

				tmpThis.loaded = {
					index: tmpIndex,
					parts: tmpParts,
					codeIndex: tmpCodeIndex,
					sessions: {}
				}

				for (var aName in tmpIndex) {
					var tmpCode = tmpParts[tmpIndex[aName]];
					tmpCodeIndex[aName] = tmpCode
				}
			}
			tmpThis.refreshFromLoaded();

		})
	}



	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;
})(ActionAppCore, $);

