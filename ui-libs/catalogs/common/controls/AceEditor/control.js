/*
Author: Joseph Francis
License: MIT
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
		window.tmpLastEditor = this;
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
	
	
	ControlCode._onInit = _onInit;
	function _onInit() {
		//console.log(this.getSpot$('code-editor'));
		this.codeEditorEl = this.getSpot$('code-editor')

		this.codeEditor = ace.edit(this.codeEditorEl.get(0));
		//this.codeEditor.setTheme("ace/theme/tomorrow_night_bright");
		this.codeEditor.setFontSize(16);
		this.codeEditor.session.setMode("ace/mode/json");
		this.codeEditor.session.setTabSize(2);

		this.codeEditor.setValue(ThisApp.json({}));
		if( this.context && this.context.page && this.context.page.controller ){
			this.parent.subscribe('resized', this.resizeToParent.bind(this) );
		}

	}

	//---- Return Control
	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };
	return ThisControl;

})(ActionAppCore, $);


