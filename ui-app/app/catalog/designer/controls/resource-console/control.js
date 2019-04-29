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
									"action": "saveContent"
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
						ctl: "layout",
						name: "layout",
						east: [
							{
								"ctl": "button",
								"color": "orange",
								toLeft: true,
								"name": "btn-refresh-page",
								"label": "Refresh",				
								"onClick": {
									"run": "action",
									"action": "refreshControlDisplay"
								}								
							},
							{
								ctl: "divider",
								fitted: true,
								clearing: true
							},
							{
								ctl: "spot",
								name: "preview-area",
								text: "Preview"
							}
						],
						// east: [
						// 	{
						// 		ctl: "spot",
						// 		name: "controls-area",
						// 		text: "Controls"
						// 	}
						// ],
						center: [
							{
								ctl: "spot",
								name: "ace-editor",
								text: ""
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
		saveContent: saveContent,
		uniqueGroups: uniqueGroups,
		setupEditor: setupEditor,
		refreshTabNav: refreshTabNav,
		_onInit: _onInit,
		_onParentResize: _onParentResize
	};

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

	function _onInit() {
		//this.parts.resources.subscribe('selectMe', onResSelect.bind(this))
	}

	function onResSelect(theEvent, theControl, theTarget) {
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

		tmpResType = ThisApp.controls.detailsIndex.getUnifiedName(tmpResType);

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
		if (tmpResType == 'HTML' || tmpResType == 'Template' || tmpResType == 'html' || tmpResType == 'Templates') {
			this.aceSessionType = "ace/mode/html"
		}
		this.setupEditor();

		this.refreshTabNav();
		this.endpointURL = 'design/ws/resource-content?run&source=' + tmpSource + '&resname=' + tmpResName + '&restype=' + tmpResType;
		if (tmpPageName) {
			this.endpointURL += '&pagename=' + tmpPageName;
		}
		if (tmpAppName) {
			this.endpointURL += '&appname=' + tmpAppName;
		}
		this.refreshFromSource();




	}

	function refreshTabNav() {
		this.details = this.details || {};
		var tmpAppName = this.details.appname || '';
		var tmpPageName = this.details.pagename || '';
		var tmpResName = this.details.resname || '';
		var tmpResType = this.details.restype || '';

		if ((tmpAppName || tmpPageName) && tmpResName) {
			var tmpHTML = [];
			var tmpIcon = ThisApp.controls.detailsIndex.getDetails(tmpResType).icon;

			tmpHTML.push('<div class="pad0 ui top attached tabular tab-nav menu" style="">');
			if (tmpAppName) {
				tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '" appname="' + tmpAppName + '" pageaction="showAppConsole" class="item black  "><i class="icon globe blue"></i> ' + tmpAppName + '</a>');
			}
			if (tmpPageName) {
				tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '-' + tmpPageName + '" appname="' + tmpAppName + '" pagename="' + tmpPageName + '" pageaction="showPageConsole" class="item black"><i class="icon columns green"></i> ' + tmpPageName + '</a>');
			}
			tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '-' + tmpPageName + '-' + tmpResName + '" class="item black"><i class="icon ' + tmpIcon + ' purple"></i> ' + tmpResName + '</a>')
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
		var tmpThis = this;

		this.editorSetup = true;

		this.aceEditorEl = this.getSpot("ace-editor");
		this.aceEditor = ace.edit(this.aceEditorEl.get(0));
		this.aceEditor.setTheme("ace/theme/vibrant_ink");
		this.aceEditor.setFontSize(16);

		ace.config.loadModule('ace/ext/language_tools', function () {
			tmpThis.aceEditor.setOptions({
				enableBasicAutocompletion: true,
				enableSnippets: true,
				enableLiveAutocompletion: false
			});
		});
		var tmpThis = this;
		this.aceEditor.on('change', function () {
			//--- ToDo: Check for actual changes to account for undo
			//     and add a reset to original button for each session

			var tmpIsDirty = false;
			for (var aName in tmpThis.loaded.sessions) {

				if ((tmpThis.isCodeDirty(aName))) {

					tmpIsDirty = true;
				}
			}

			tmpThis.setItemDisabled('btn-save-code', !tmpIsDirty)
		})

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
		if (!tmpSession.getUndoManager().isClean()) {
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
				this.loaded.sessions[aName] = ace.createEditSession(aName, this.aceSessionType || "ace/mode/javascript")
				initSession(this.loaded.sessions[aName]);
			}
			this.loaded.sessions[aName].setValue(tmpCode);
		}
	}

	var defaultCodeName = 'thisPageSpecs'
	function refreshFromLoaded() {
		this.refreshEditorFromCodeIndex();
		this.showCode();
		this.refreshControlDisplay();
	}



	function saveContent() {
		var tmpThis = this;
		var tmpNewCodeIndex = {};
		for (var aName in this.loaded.sessions) {
			var tmpSession = this.loaded.sessions[aName];
			var tmpCode = tmpSession.getValue();
			tmpNewCodeIndex[aName] = tmpCode;
		}

		var tmpContentText = tmpNewCodeIndex["content"];
		var tmpRequest = {
			pagename: this.details.pagename,
			appname: this.details.appname || '',
			resname: this.details.resname || '',
			restype: this.details.restype || '',
			content: tmpContentText,
			origContent: 'todo'
		}

		ThisApp.apiCall({
			url: '/design/ws/save-resource?run',
			data: tmpRequest
		}).then(function (theReply) {
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
			var tmpIndex = { content: 0 };
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

			tmpThis.refreshFromLoaded();


		})
	}








	//======


	//======


	/**
	 */

	ControlCode.showControl = showControl;
	function showControl(theControlSpec) {

		if (this.activeControl) {
			delete (this.activeControl)
		}
		//-- ToDo: If active control, destroy it
		this.activeControl = this.activeControlSpec.create(this.activeControlName);
		this.activeControl.loadToElement(this.spot$('preview-area'))

		//--- allow console access for testing
		window.activeControl = this.activeControl;

		//this.loadFieldList()
	}

	ControlCode.showControlDetails = showControlDetails;
	function showControlDetails() {
		var tmpDetails = activeControl.getControlDetails()
		this.aceEditor.setValue(ThisApp.json(tmpDetails.data));
		this.aceEditor.clearSelection();
	};


	function showDetailsJson(theObject) {
		this.aceEditor.setValue(ThisApp.json(theObject, true));
		this.aceEditor.clearSelection();
	}

	ControlCode.showControlSpecConfig = showControlSpecConfig;
	function showControlSpecConfig() {
		showDetailsJson(this.loadedControlSpec.controlConfig);
	};

	function getTarget(theEvent) {
		var tmpEl = theEvent.target || theEvent.currentTarget || theEvent.delegetTarget || false;
		if (tmpEl) {
			tmpEl = $(tmpEl);
			var tmpName = tmpEl.attr('name');
			if (!(tmpName)) { return false; };
			return { name: tmpName, el: tmpEl };
		}
		return false;
	}

	function frmPreviewFocusChange(theEvent) {
		if (theEvent && theEvent.target) {
			var tmpTarget = $(theEvent.target);
			var tmpFN = tmpTarget.attr('name');
			setSelectedField(tmpFN);
		}
	}
	function frmPreviewChange(theEvent) {
		var tmpTarget = getTarget(theEvent);
		var tmpFN = tmpTarget.name;
		setSelectedField(tmpFN);
	};

	ControlCode.fieldToggleDisplay = fieldToggleDisplay;
	function fieldToggleDisplay() {
		var tmpFN = getSelectedField();
		if (!tmpFN) {
			return alert("Select a field");
		}
		var tmpIsVis = activeControl.getFieldDisplay(tmpFN);
		activeControl.setFieldDisplay(tmpFN, !tmpIsVis)
	};

	ControlCode.fieldSetValue = fieldSetValue;
	function fieldSetValue() {
		var tmpFN = getSelectedField() || '';
		this.fieldSelect.focus();
		if (!tmpFN) { return alert("Select a field to set first") }

		var tmpDefault = activeControl.getFieldValue(tmpFN);

		ThisApp.input("Enter a new value", "New Value", "Set field value", tmpDefault).then(function (theValue) {
			if (!(theValue)) { return };
			activeControl.setFieldValue(tmpFN, theValue);

		})

	};

	ControlCode.fieldShowSpecs = fieldShowSpecs;
	function fieldShowSpecs() {
		var tmpFN = getSelectedField() || '';
		if (!tmpFN) { return alert("Select a Field") }
		var tmpSpecs = activeControl.getFieldSpecs(tmpFN);
		var tmpCtlName = tmpSpecs.ctl || 'field';

		var tmpCtl = ThisApp.controls.webControls.get(tmpCtlName);
		if (tmpCtl && tmpCtl.getInfo) {
			var tmpInfo = tmpCtl.getInfo(tmpCtlName);
		} else {
			alert("Not found " + tmpCtlName)
		}

		tmpSpecs.controlDetails = tmpInfo;

		showDetailsJson(tmpSpecs);
	};

	ControlCode.fieldGoto = fieldGoto;
	function fieldGoto() {
		var tmpFN = getSelectedField() || '';
		if (!tmpFN) { return alert("Select a Field") }
		activeControl.gotoField(tmpFN);
	};

	function setSelectedField(theFieldName) {
		ControlCode.fieldSelectEl.dropdown('set exactly', [theFieldName]);
	}
	function getSelectedField() {
		var tmpVal = this.fieldSelectEl.dropdown('get value');
		return tmpVal
	}

	ControlCode.loadFieldList = loadFieldList;
	function loadFieldList() {
		var tmpConfig = activeControl.getConfig();
		if (!tmpConfig && tmpConfig.index && tmpConfig.index.fields) {
			return alert("No tmpField found in form config index")
		}
		var tmpFieldList = [];
		var tmpFields = tmpConfig.index.fields;
		for (var aField in tmpFields) {
			var tmpField = tmpFields[aField];
			tmpFieldList.push({
				name: tmpField.label || aField,
				value: aField
			});
		}

		this.fieldSelect.dropdown('change values', tmpFieldList)
		this.selectedFieldName = '';
	};


	ControlCode.showFieldInfo = showFieldInfo;
	function showFieldInfo(theFieldName) {
		var tmpFN = theFieldName || '';
		if (!tmpFN) {
			return alert("No field name")
		}
		var tmpConfig = activeControl.getConfig();
		if (!tmpConfig && tmpConfig.index && tmpConfig.index.fields) {
			return alert("No tmpField found in form config index")
		}
		var tmpFields = tmpConfig.index.fields;
		var tmpFieldInfo = tmpFields[tmpFN];
		if (!tmpFieldInfo) {
			return alert("No field details")
		}

		showDetailsJson(tmpFieldInfo);

	};

	ControlCode.validateActiveControl = validateActiveControl;
	function validateActiveControl() {
		var tmpValidation = activeControl.validate();
		if (!tmpValidation.isValid) {
			//Message shows automatically
			//alert("Not valid, see form for deatils", "Did not pass validation", "i");
		} else {
			alert("Your good", "Passed Validation", "c")
		}
	};



	ControlCode.refreshControlDisplay = refreshControlDisplay;
	function refreshControlDisplay() {
		

		var tmpResType = this.details.restype;
	
		
		if (tmpResType == 'HTML' || tmpResType == 'Template' || tmpResType == 'html' || tmpResType == 'Templates') {
			var tmpContent = this.aceEditor.getValue();
			this.loadSpot('preview-area',tmpContent);
		} else if( tmpResType == 'Panel' ){
			var tmpObject = this.aceEditor.getValue();
			tmpObject = ThisApp.json(tmpObject);
			this.activeControlSpec = ThisApp.controls.newControl(tmpObject, { parent: this });
			this.activeControlSpec.parent = this;
			this.showControl()	
		} else if( tmpResType == 'Control' ){
			var tmpCode = this.aceEditor.getValue();
			this.activeControlSpec = eval(tmpCode);
			this.activeControlSpec = ThisApp.controls.newControl(this.activeControlSpec.specs, this.activeControlSpec.options || {})
			this.activeControlSpec.parent = this;
			this.showControl()	
		} else {
			console.error("Unknown resource type " + tmpResType)
		}
	};




	//==== END



	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;
})(ActionAppCore, $);

