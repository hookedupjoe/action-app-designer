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
		var tmpSpot = this.getSpot$('code-editor');
//		console.log('resizeToParent tmpSpot',tmpSpot,tmpSpot.context);
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

	//--- Private stuff
    function codeEditorSelectionChange(theEvent) {
        var tmpSelected = this.codeEditor.getSelectedText();
        if (tmpSelected) {
            var tmpLen = tmpSelected.length;

            if (tmpLen > 3 && tmpLen < 200) {
                var tmpItems = tmpSelected.split(':');
                if (tmpItems.length == 2) {
                    tmpSelected = tmpSelected.replace(',', '');
                    try {
                        tmpSelected = ThisApp.json('{' + tmpSelected + '}');
                        if (tmpSelected.ctl) {
                            var tmpCtl = ThisApp.controls.catalog.get(tmpSelected.ctl);
                            if (tmpCtl && tmpCtl.getInfo) {
                                var tmpControlInfo = tmpCtl.getInfo(tmpSelected.ctl);
                            }
                        }
                    } catch (ex) {
                        //---- not a valid selection
                    }
                }
            }
        }

    }



	//---- Return Control
	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };
	return ThisControl;

})(ActionAppCore, $);


