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
						"ctl": "spot",
						"name": "nav-tabs"
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
								"color": "black",
								hidden: false,
								basic: true,
								right: true,
								toRight: true,
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
						slim: true,
						"tabs": [
							{
								"label": "Code",
								"name": "pagetabs-one",
								"ctl": "tab",
								"content": [
									{
										ctl: "layout",
										name: "layout",
										north: [
											
										],
										center: [
											{
												ctl: "spot",
												name: "ace-editor",
												text: ""
											}
										],
										west: [
											{
												"ctl": "button",
												"color": "black",
												basic: true,
												"name": "btn-format-code",
												"label": "Format",
												"onClick": {
													"run": "action",
													"action": "formatCode"
												},
											},
											{
												"ctl": "button",
												"color": "black",
												basic: true,
												hidden: true,
												"name": "btn-format-page-code",
												"label": "Format Page",
												"onClick": {
													"run": "action",
													"action": "formatPageCode"
												},
											},											
											{
												"ctl": "button",
												"toLeft": true,
												"color": "blue",
												"icon": "save",
												"disabled": true,
												"name": "btn-save",
												"label": "Save",
												"onClick": {
													"run": "action",
													"action": "saveCode"
												}
											},											
											{
												ctl: 'divider',
												fitted: true,
												clearing: true
											}
											,
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
										"ctl": "button",
										"size": "small",
										basic: true,
										compact: true,
										"onClick": {
											"run": "action",
											"action": "refreshResources"
										},
										"basic": true,
										"icon": "recycle",
										"name": "btn-refresh-pages",
										"text": "Refresh"
									},
									{
										"ctl": "button",
										"color": "purple",
										"size": "small",
										basic: true,
										compact: true,
										"onClick": {
											"run": "action",
											"action": "addPageControl"
										},
										"labeled": true,
										"right": true,
										"icon": "newspaper",
										"name": "btn-add-control",
										"text": "Add Control"
									},
									{
										"ctl": "button",
										"color": "purple",
										"size": "small",
										basic: true,
										compact: true,
										"onClick": {
											"run": "action",
											"action": "addPagePanel"
										},
										"labeled": true,
										"right": true,
										"icon": "newspaper outline",
										"name": "btn-add-panel",
										"text": "Add Panel"
									},
									{
										"ctl": "button",
										"color": "purple",
										"size": "small",
										basic: true,
										compact: true,
										"onClick": {
											"run": "action",
											"action": "addPageTemplate"
										},
										"labeled": true,
										"right": true,
										"icon": {
											"[computed]": "context.app.controller.controls.detailsIndex.getDetails('Template').icon"
										},
										"name": "btn-add-template",
										"text": "Add Template"
									},
									{
										"ctl": "button",
										"color": "purple",
										"size": "small",
										basic: true,
										compact: true,
										"onClick": {
											"run": "action",
											"action": "addPageHTML"
										},
										"labeled": true,
										"right": true,
										"icon": "code",
										"name": "btn-add-resource",
										"text": "Add HTML"
									},
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
		refreshTabNav: refreshTabNav,
		_onInit: _onInit,
		_onParentResize: _onParentResize,
		refreshResources: refreshResources,
		addPageHTML: addPageHTML,
		addPageTemplate: addPageTemplate,
		addPageControl: addPageControl,
		addPagePanel: addPagePanel,
		formatCode: formatCode
	};

	function refreshResources() {
		this.parts.resources.refreshFromURI();
	}

	
	function addPageHTML() {
		var tmpThis = this;

		ThisApp.input("Enter HTML name", "HTML Name", "Create HTML Resource", "")
			.then(function (theValue) {
				if (!(theValue)) { return };
				var tmpRequest = {
					pagename: tmpThis.details.pagename || '',
					appname: tmpThis.details.appname || '',
					resname: theValue,
					restype: 'HTML',
					content: ""
				}

				ThisApp.apiCall({
					url: '/design/ws/save-resource?run',
					data: tmpRequest
				}).then(function (theReply) {
					tmpThis.refreshResources();
				})

			})



	}

	function addPageTemplate() {
		var tmpThis = this;

		ThisApp.input("Enter template name", "Template Name", "Create Template Resource", "")
			.then(function (theValue) {
				if (!(theValue)) { return };
				var tmpRequest = {
					pagename: tmpThis.details.pagename || '',
					appname: tmpThis.details.appname || '',
					resname: theValue,
					restype: 'Template',
					content: ""
				}

				ThisApp.apiCall({
					url: '/design/ws/save-resource?run',
					data: tmpRequest
				}).then(function (theReply) {
					tmpThis.refreshResources();
				})

			})

	}

	function addPageControl() {
		var tmpThis = this;

		ThisApp.input("Enter control name", "Control Name", "Create Control Resource", "")
			.then(function (theValue) {
				if (!(theValue)) { return };
				var tmpRequest = {
					pagename: tmpThis.details.pagename || '',
					appname: tmpThis.details.appname || '',
					resname: theValue,
					restype: 'Control',
					content: ""
				}

				ThisApp.apiCall({
					url: '/design/ws/save-resource?run',
					data: tmpRequest
				}).then(function (theReply) {
					tmpThis.refreshResources();
				})

			})



	}

	function addPagePanel() {
		var tmpThis = this;
		ThisApp.input("Enter panel name", "Panel Name", "Create Panel Resource", "")
			.then(function (theValue) {
				if (!(theValue)) { return };
				var tmpRequest = {
					pagename: tmpThis.details.pagename || '',
					appname: tmpThis.details.appname || '',
					resname: theValue,
					restype: 'Panel',
					content: ""
				}

				ThisApp.apiCall({
					url: '/design/ws/save-resource?run',
					data: tmpRequest
				}).then(function (theReply) {
					tmpThis.refreshResources();
				})

			})




	}


	function _onParentResize() {
		var tmpThis = this;
		ThisApp.delay(200).then(function (theReply) {
			if (tmpThis.aceEditorEl) {
				var tmpH = tmpThis.aceEditorEl.closest('.ui-layout-pane').height();
				if (tmpThis.aceEditorEl && tmpThis.aceEditor) {
					tmpThis.aceEditorEl
						.css('height', '' + tmpH + 'px')
						.css('position', 'relative')
					tmpThis.aceEditor.resize(true);
				}
			}

		})

	}

	ControlCode.isActive = function(){
		var tmpIsVis = this.getItemEl('btn-save').is(":visible");
		return tmpIsVis;
	}
	function _onInit() {
		this.parts.resources.subscribe('selectMe', onResSelect.bind(this));
		var tmpThis = this;
		ThisApp.subscribe('saveRequested', function(){
			if( !tmpThis.isActive()){return}

			var tmpIsDirty = tmpThis.refreshButtonStatus();
			if( tmpIsDirty ){
				tmpThis.saveCode();
			}
		})
	}

	function onResSelect(theEvent, theControl, theTarget) {
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
		this.controlConfig.index.controls.resources.controlname = tmpServerURL


	}
	//---- Initial Setup of the control
	function setup(theOptions) {
		var tmpOptions = theOptions || {};
		var tmpPageName = tmpOptions.pagename || '';
		this.params = this.params || {};
		this.params.pagename = tmpPageName;


		var tmpTitle = tmpPageName;
		var tmpSource = tmpOptions.source || 'workspace';
		var tmpAppName = tmpOptions.appname || '';

		var tmpPageTitle = tmpPageName
		if (tmpAppName) {
			tmpPageTitle = '[' + tmpAppName + '] ' + tmpTitle;
			tmpSource = 'app';
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
		if (tmpAppName) {
			this.endpointURL += '&appname=' + tmpAppName;
		}
		this.refreshFromSource();

		this.refreshTabNav();

	}

	function refreshTabNav() {
		this.details = this.details || {};
	
		var tmpHTML = this.context.page.controller.getSubNavTabs(this.details);
		if ((tmpHTML)) {
			this.loadSpot('nav-tabs', tmpHTML.join(''))
		}
	}

	
	ControlCode.refreshOnActivate = refreshOnActivate;
	function refreshOnActivate() {
		this.refreshTabNav();
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
		this.aceEditor.setTheme("ace/theme/tomorrow_night_bright");
		this.aceEditor.setFontSize(16);

		var tmpThis = this;
		ace.config.loadModule('ace/ext/beautify', function (theResults) {
			tmpThis.beautify = theResults;

			tmpThis.aceEditor.setOptions({
				enableBasicAutocompletion: true,
				enableSnippets: true,
				enableLiveAutocompletion: false
			});

		});

		var tmpThis = this;
		var tmpThis = this;
		this.aceEditor.on('change', function () {
			//--- ToDo: Check for actual changes to account for undo
			//     and add a reset to original button for each session
		  tmpThis.refreshButtonStatus();		
		})

	}

	ControlCode.refreshButtonStatus = refreshButtonStatus;
	function refreshButtonStatus(){
		var tmpThis = this;
		var tmpIsDirty = false;
			for (var aName in tmpThis.loaded.sessions) {

				if ((tmpThis.isCodeDirty(aName))) {

					tmpIsDirty = true;
					break;
				}
			}

			tmpThis.setItemDisabled('btn-save', !tmpIsDirty);
			return tmpIsDirty;
	}


	function markClean() {
		for (var aName in this.loaded.sessions) {
			var tmpSession = this.loaded.sessions[aName];
			this.loaded.codeIndex[aName] = tmpSession.getValue();
			tmpSession.getUndoManager().markClean();
		}
	}

	function isCodeDirty(theName) {
		var tmpSession = this.loaded.sessions[theName];
	
		try {
			var tmpCode = tmpSession.getValue();
			var tmpOrig = this.loaded.codeIndex[theName];
			if (tmpOrig == tmpCode) {
				tmpSession.getUndoManager().markClean();
			} else {
				return true;
			}
		} catch (error) {
			return true;
		}
		return false;
	}
	function initSession(theSession){
		theSession.setTabSize(2);
	}
	function refreshEditorFromCodeIndex() {
		for (var aName in this.loaded.codeIndex) {
			var tmpCode = this.loaded.codeIndex[aName];
			if (!(this.loaded.sessions[aName])) {
				
				this.loaded.sessions[aName] = ace.createEditSession(aName, "ace/mode/javascript")
				initSession(this.loaded.sessions[aName]);

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
			tmpNewCodeIndex[aName] = padValue(tmpCode);
		}
		var tmpRequest = {
			pagename: this.details.pagename,
			target: this.details.source || 'ws',
			appname: this.details.appname || '',
			name: this.details.name || '',
			index: this.loaded.index,
			parts: this.loaded.parts,
			code: tmpNewCodeIndex
		}

		ThisApp.apiCall({
			url: '/design/ws/save-page',
			data: tmpRequest
		}).then(function (theReply) {
			tmpThis.setItemDisabled('btn-save', true);
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
			tmpThis.parts.resources.refreshFromURI();

		})
	}

	function padValue(theValue){
		return '\n' + theValue.trim() + '\n';
	}

	function formatCode() {
		this.beautify.beautify(this.aceEditor.session);
		var tmpValue = this.aceEditor.session.getValue();
		this.aceEditor.session.setValue(padValue(tmpValue));
	}

	
// 	ControlCode.beatifyCode = beatifyCode;
// 	function beatifyCode(theSession) {
//     var val = this.beautify.beautify(theSession);
// 	  theSession.setValue(padValue(val));
// }

	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;
})(ActionAppCore, $);

