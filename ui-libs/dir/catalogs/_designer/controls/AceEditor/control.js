/*
Author: Joseph Francis
License: LGPL
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			padding: false,
		},
		"content": [
			{
				"ctl": "spot",				
				"name": "code-editor"
			}
		]
	}

	var ControlCode = {};

	ControlCode.setParentEl = setParentEl;
	function setParentEl(theParentEl) {
		this.parentEl = theParentEl;
	}
	
	ControlCode.resizeToParent = resizeToParent;
	function resizeToParent(theParentEl) {
		var tmpSpot = this.getSpot$('code-editor');
		tmpSpot.height($(tmpSpot.context).height());

		var tmpParent = this.parentEl;
		
		if( !(tmpParent) ){
			console.error('Could not resizeToParent due to no parent being found or passed');
			return;	
		}
		var tmpH = tmpParent.height();
		var tmpW = tmpParent.width();
		if( tmpH == 0 ){
			tmpParent = this.parentEl.closest('.ui-layout-pane');
			tmpH = tmpParent.height();
			tmpW = tmpParent.width();
		}

		ThisApp.util.resizeToParent(this.codeEditor.container)

		if (this.codeEditorEl && this.codeEditor) {
			this.codeEditorEl
			.css('height', '' + tmpH + 'px')
			.css('width', '' + tmpW + 'px')
			.css('position', 'relative');
			this.codeEditor.resize(true);
			this.codeEditorEl.show();
		}
	}	
	ControlCode.setValue = setValue;
	function setValue(theValue) {
		this.codeEditor.setValue(theValue);
		this.codeEditor.clearSelection();
	}
	ControlCode.getValue = getValue;
	function getValue(theValue) {
		return this.codeEditor.getValue(theValue);
	}
	ControlCode.setup = setup;
	function setup(theDetails) {
		if( !theDetails ){
			return;
		}
		var tmpDetails = theDetails || {};
		if( tmpDetails.editorSetupCallback ){
			tmpDetails.editorSetupCallback(this.codeEditor,this);
		}
	}
	ControlCode._onInit = _onInit;
	function _onInit() {
		var tmpThis = this;

		this.codeEditorEl = this.getSpot$('code-editor')
		this.codeEditor = ace.edit(this.codeEditorEl.get(0));

		this.codeEditor.setFontSize(14);
		this.codeEditor.session.setMode("ace/mode/json");
		this.codeEditor.session.setTabSize(2);

		this.codeEditor.setValue(ThisApp.json({}));
			this.codeEditor.setOptions({
				enableBasicAutocompletion: true,
				enableSnippets: true,
				enableLiveAutocompletion: false
			});
		
		if( this.parentControl ){
			this.subscribeEvent(this.parentControl, 'resized', this.resizeToParent.bind(this) );
		} else if( this.context && this.context.page && this.context.page.controller ){
			this.subscribeEvent(this.context.page.controller, 'resized', this.resizeToParent.bind(this) );
		}
		this.resizeToParent();
		ace.config.loadModule('ace/ext/beautify', function (theResults) {
			tmpThis.beautify = theResults;
		
		});


	}


	ControlCode.clearJson = clearJson;
	function clearJson() {
		this.codeEditor.setValue('{}');
		this.selectAll();
	}

	ControlCode.selectAll = selectAll;
	function selectAll() {
		this.codeEditor.selectAll();
		this.codeEditor.focus();
	}
	ControlCode.toClipboard = toClipboard;
	function toClipboard() {
		navigator.clipboard.writeText(this.codeEditor.getValue());
		this.codeEditor.focus();
	}

	ControlCode.getJsonAsObject = getJsonAsObject;
	function getJsonAsObject(theOptionalJson) {
		var tmpJSON = theOptionalJson || this.codeEditor.getValue();
		var tmpRet = false;
		var tmpConverter = {};//<-- Do not remove, used below in eval
		try {
			return eval('tmpConverter =' + tmpJSON);
		} catch (ex) {
			try {
			if (tmpJSON.startsWith('var ')) {
				tmpJSON = tmpJSON.replace("var ", "tmpConverter.");
			}
			return eval(tmpJSON);
			} catch (ex) {
				return false;
			}
		}
		return tmpRet;
	}

	ControlCode.formatJson = formatJson;
	function formatJson() {
		var tmpObj = this.getJsonAsObject();
		if( tmpObj !== false){
			this.loadJson(tmpObj);
		} else {
			console.error("formatJson error in json");
			alert("Invalid JSON", "Format Error", "e")
		}
		this.codeEditor.clearSelection();
	}

	ControlCode.loadJson = loadJson;
	function loadJson(theObj) {
		this.codeEditor.setValue(ThisApp.json(theObj, true));
		this.codeEditor.clearSelection();
	}

	//---- Return Control
	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };
	return ThisControl;

})(ActionAppCore, $);


