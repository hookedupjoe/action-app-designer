/*
SearchBar Control

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
				"ctl": "segment",
				"basic": true,
				"slim": true,
				"name": "",
				"classes": "mar4 pad0",
				"content": [
					{
						"ctl": "spot",
						"name": "status-bar",
						"classes": "ui message fluid",
						"text": "Common Status Bar"
					}
				]
			}
		]
	}

	var ControlCode = {
		setValue: setValue,
		setColor: setColor,
		_onInit: _onInit
	};

	function setValue(theValue){
		this.loadSpot('status-bar', theValue);
	}

	function setColor(theValue){
		if( this.pColor ){
			this.messageSpot.removeClass(this.pColor);
		}
		this.messageSpot.addClass(theValue);
		this.pColor = theValue;
	}

	function _onInit(){
		this.messageSpot = this.getSpot('status-bar');
		this.pColor = '';
		this.loadSpot('status-bar','Welcome');
	}



	//--- Return the control
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};
	return ThisControl;

})(ActionAppCore, $);

