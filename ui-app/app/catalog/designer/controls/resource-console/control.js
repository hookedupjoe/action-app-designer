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
					"default": "Resource",
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
							hidden: true,
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
							"label": "Content",
							"name": "pagetabs-one",
							"ctl": "tab",
							"content": [
									{
								ctl: "layout",
								name: "layout",
								center: [
									{
										ctl: "spot",
										name: "preview-area",
										text: "Preview"
									}
								],
								east: [
									{
										ctl: "spot",
										name: "controls-area",
										text: "Controls"
									}
								],
								west: [
									{
										ctl: "spot",
										name: "ace-editor",
										text: ""
									}
				
								],
								rem_north: [
									{
										"ctl": "field",
										"name": "code-title",
										"fluid": true,
										"readonly": true,
										"inputClasses": "title",
										"default": "Resource Editor",
										"placeholder": "",
										"content": [
											
										]
									}
								]
								
							}
							]
						},
						{
							"label": "Info",
							"name": "pagetabs-info",
							"ctl": "tab",
							"content": [
								
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
		_onInit: _onInit,
		_onParentResize: _onParentResize
	};

	function _onParentResize(){
		var tmpThis = this;
		ThisApp.delay(200).then(function(theReply){
			if( tmpThis.aceEditorEl ){
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

	function _onInit(){
		//this.parts.resources.subscribe('selectMe', onResSelect.bind(this))
	}

	function onResSelect(theEvent, theControl, theTarget){
		this.publish('selected', [theControl, theTarget])
	}


	//--- Run before
	function preLoad(theDetails) {
		// var tmpPageName = theDetails.pagename || '';
		// var tmpAppName = theDetails.appname || '';
		// var tmpResName = theDetails.resname || '';
		// var tmpResType = theDetails.restype || '';
		
		//var tmpEntryName = tmpAppName + '-' + tmpPageName + '-' + tmpResName + '-' + tmpResType;

		// this.uniqueGroups(tmpEntryName);
		// var tmpCloseBtn = this.controlConfig.index.items['btn-close-page'];
		// tmpCloseBtn.attr.appname = tmpAppName;
		// tmpCloseBtn.attr.pagename = tmpPageName;

	}
	//---- Initial Setup of the control
	function setup(theDetails) {
	
		var tmpPageName = theDetails.pagename || '';
		var tmpAppName = theDetails.appname || '';
		var tmpResName = theDetails.resname || '';
		var tmpResType = theDetails.restype || '';
		
		var tmpSource = tmpOptions.source || 'ws';

		this.setFieldValue('title', '[' + tmpResType + '] ' + tmpResName);
	
		this.details = {
			pagename: tmpPageName,
			source: tmpSource,
			appname: tmpAppName,
			resname: tmpResName,
			restype: tmpResType
		}

		this.aceSessionType = "ace/mode/javascript"
		if( tmpResType == 'HTML' || tmpResType == 'Template' || tmpResType == 'html' || tmpResType == 'Templates'){
			this.aceSessionType = "ace/mode/html"
		}
		console.log( 'this.aceSessionType', this.aceSessionType);
		this.setupEditor();
		
		
		if( (tmpAppName || tmpPageName) && tmpResName ){
			var tmpHTML = [];
			tmpHTML.push('<div class="pad0 ui top attached tabular menu" style="">');
			if( tmpAppName ){
				tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '" appname="' + tmpAppName + '" pageaction="showAppConsole" class="item black  "><i class="icon globe blue"></i> ' + tmpAppName + '</a>');
			}
			if( tmpPageName ){
				tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '-' + tmpPageName + '" appname="' + tmpAppName + '" pagename="' + tmpPageName + '" pageaction="showPageConsole" class="item black"><i class="icon columns green"></i> ' + tmpPageName + '</a>');
			}
			tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '-' + tmpPageName + '-' + tmpResName + '" class="item black"><i class="icon box purple"></i> ' + tmpResName + '</a>')
			tmpHTML.push('</div><div class="ui divider fitted black"></div>')
			tmpHTML = tmpHTML.join('\n');
			this.loadSpot('nav-tabs', tmpHTML)
		}

		this.endpointURL = 'design/ws/resource-content?run&source=' + tmpSource + '&resname=' + tmpResName + '&restype=' + tmpResType;
		if( tmpPageName ){
			this.endpointURL += '&pagename=' + tmpPageName;
		}
		if( tmpAppName ){
			this.endpointURL += '&appname=' + tmpAppName;
		}
		this.refreshFromSource();


	}

	function ORIGINAL____setup(theOptions) {
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
		this.endpointURL = 'design/ws/res-code?run&source=' + tmpSource + '&pagename=' + tmpPageName;
		if( tmpAppName ){
			this.endpointURL += '&appname=' + tmpAppName;
		}
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

		this.aceEditor.setOptions({
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: false
		});

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
				console.log( 'this.aceSessionType USED ', this.aceSessionType);
				this.loaded.sessions[aName] = ace.createEditSession(aName, this.aceSessionType || "ace/mode/javascript")
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
		var tmpParams = theParams || 'content';
		if (typeof (tmpParams) == 'string') {
			tmpParams = { name: tmpParams }
		}
		var tmpName = tmpParams.name || tmpParams.codename || defaultCodeName;
		this.aceEditor.setSession(this.loaded.sessions[tmpName])
	}

	function refreshFromSource() {
		var tmpThis = this;

		ThisApp.apiCall(this.endpointURL).then(function (theReply) {
			var tmpIndex = {content:0};
			var tmpParts = [theReply];
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
			console.log( 'tmpThis.loaded', tmpThis.loaded);

			tmpThis.refreshFromLoaded();
			

		})
	}



	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;
})(ActionAppCore, $);

