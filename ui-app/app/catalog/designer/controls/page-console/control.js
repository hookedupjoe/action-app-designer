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
			north: [
				{
					"ctl":"spot",
					"name":"nav-tabs"
				},
				{
					"ctl": "field",
					"name": "title",
					"fluid": true,
					"readonly": true,
					"inputClasses": "title",
					"default": "Page",
					"placeholder": "",
					"content": [
						{
							"ctl": "button",
							"color": "blue",
							"icon": "save",
							"disabled": true,
							"name": "btn-save-code",
							"label": "Save Changes",
							"onClick": {
								"run": "action",
								"action": "saveCode"
							}
						},
						{
							"ctl": "button",
							"color": "black",
							basic: true,
							right: true,
							"icon": "cancel",
							"name": "btn-close-page",
							"label": "Close",
							attr: {
								"pageaction": "closePage",
								appname: "",
								pagename: ""
							}
						}
					]
				}
			],
			center: [
				{
					"ctl": "tabs",
					"name": "pagetabs",
					"layout": true,
					"tabs": [
						{
							"label": "Code",
							"name": "pagetabs-one",
							"ctl": "tab",
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
								rem_north: [
									{
										"ctl": "field",
										"name": "code-title",
										"fluid": true,
										"readonly": true,
										"inputClasses": "title",
										"default": "Page Editor",
										"placeholder": "",
										"content": [
											
										]
									}
								]
								
							}
							]
						},
						{
							"label": "Resources",
							"name": "pagetabs-resources",
							"ctl": "tab",
							"content": [
								{
									"ctl": "panel",
									"controlname": "design/ws/get-ws-outline?type=resources&appname=app001&pagename=HomePage",
									"name": "resources"
								}
							]
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
		isCodeDirty: isCodeDirty,
		markClean: markClean,
		refreshFromSource: refreshFromSource,
		refreshFromLoaded: refreshFromLoaded,
		refreshEditorFromCodeIndex: refreshEditorFromCodeIndex,
		showCode: showCode,
		saveCode: saveCode,
		uniqueGroups: uniqueGroups,
		setupEditor: setupEditor,
		_onInit: _onInit
	};


	function _onInit(){
		this.parts.resources.subscribe('selectMe', onResSelect.bind(this))
	}

	function onResSelect(theEvent, theControl, theTarget){
		console.log( 'onResSelect pub', theTarget);
		this.publish('selected', [theControl, theTarget])
	}


	//--- Run before
	function preLoad(theDetails) {
		var tmpPageName = theDetails.pagename || '';
		var tmpAppName = theDetails.appname || '';
		this.uniqueGroups(tmpAppName + '-' + tmpPageName);
		var tmpCloseBtn = this.controlConfig.index.items['btn-close-page'];
		tmpCloseBtn.attr.appname = tmpAppName;
		tmpCloseBtn.attr.pagename = tmpPageName;

		var tmpServerURL = '/design/ws/get-ws-outline?type=resources&appname=' + tmpAppName;
		tmpServerURL += '&pagename=' + tmpPageName;
		console.log( 'tmpServerURL', tmpServerURL);
		this.controlConfig.index.controls.resources.controlname = tmpServerURL


	}
	//---- Initial Setup of the control
	function setup(theOptions) {
		var tmpOptions = theOptions || {};
		
		var tmpPageName = tmpOptions.pagename || '';
		this.params = this.params || {};
		this.params.pagename = tmpPageName;

		
		var tmpTitle = tmpPageName;
		var tmpSource = tmpOptions.source || 'ws';
		var tmpAppName = tmpOptions.appname || '';

		var tmpPageTitle = tmpPageName
		if (tmpAppName) {
			tmpPageTitle = '[' + tmpAppName + '] ' + tmpTitle;
		}


		this.setFieldValue('title', tmpPageTitle);
		this.setupEditor();
		this.details = {
			pagename: tmpPageName,
			source: tmpSource,
			appname: tmpAppName,
			name: ''
		}
		this.endpointURL = 'design/ws/page-code?run&source=' + tmpSource + '&pagename=' + tmpPageName;
		if( tmpAppName ){
			this.endpointURL += '&appname=' + tmpAppName;
		}
		this.refreshFromSource();

		if( tmpAppName ){

			var tmpHTML = [];
			tmpHTML.push('<div class="pad0 ui top attached tabular menu" style="">');
			tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '" appname="' + tmpAppName + '" pageaction="showAppConsole" class="item black  "><i class="icon globe blue"></i> ' + tmpAppName + '</a>');
			tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '-' + tmpPageName + '" appname="' + tmpAppName + '" pagename="' + tmpPageName + '" pageaction="showPageConsole" class="item black"><i class="icon columns green"></i> ' + tmpPageName + '</a>');
			tmpHTML.push('</div><div class="ui divider fitted black"></div>')
			tmpHTML = tmpHTML.join('\n');
			this.loadSpot('nav-tabs', tmpHTML)

		}

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

		var tmpThis = this;
		this.aceEditor.on('change', function(){
			//--- ToDo: Check for actual changes to account for undo
			//     and add a reset to original button for each session

			var tmpIsDirty = false;
			for (var aName in tmpThis.loaded.sessions) {
				
				if( (tmpThis.isCodeDirty(aName)) ){
					
					tmpIsDirty = true;
				}
			}

			tmpThis.setItemDisabled('btn-save-code', !tmpIsDirty)
		})
		
	}

	function markClean(){
		for (var aName in this.loaded.sessions) {
			var tmpSession = this.loaded.sessions[aName];			
			this.loaded.codeIndex[aName] = tmpSession.getValue();
			tmpSession.getUndoManager().markClean();
		}
	}

	function isCodeDirty(theName){
		var tmpSession = this.loaded.sessions[theName];
		if( !tmpSession.getUndoManager().isClean() ){
			 try {
					var tmpCode = tmpSession.getValue();
					var tmpOrig = this.loaded.codeIndex[theName];
					if( tmpOrig == tmpCode ){
					tmpSession.getUndoManager().markClean();
					} else {
						return true;
					}
				} catch (error) {
					return true;
			 }			
		}
		return false;
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



	function saveCode() {
		var tmpThis = this;
		var tmpNewCodeIndex = {};
		for (var aName in this.loaded.sessions) {
			var tmpSession = this.loaded.sessions[aName];
			var tmpCode = tmpSession.getValue();
			tmpNewCodeIndex[aName] = tmpCode;
		}
		var tmpRequest = {
			pagename: this.details.pagename,
			target: this.details.source || 'ws',
			appname: this.details.appname || '',
			name: this.details.name || '',
			index: this.loaded.index,
			parts: this.loaded.parts,
			code: tmpNewCodeIndex,
			origCode: this.loaded.codeIndex
		}
		
		ThisApp.apiCall({
			url: '/design/ws/save-page',
			data: tmpRequest
		}).then(function(theReply){
			tmpThis.setItemDisabled('btn-save-code', true);
			tmpThis.markClean();
		})
	

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
			//console.log( 'tmpThis.parts.resources', tmpThis.parts.resources);
			tmpThis.parts.resources.refreshFromURI();

		})
	}



	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;
})(ActionAppCore, $);

