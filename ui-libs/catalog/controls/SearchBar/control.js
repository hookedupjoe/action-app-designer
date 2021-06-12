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
				"name": "demo-item",
				"content": [
					{
						"ctl": "field",
						"name": "search",
						"fluid": true,
						"placeholder": "Search for ...",
						"content": [
							{
								"ctl": "button",
								"color": "green",
								"icon": "search",
								"name": "btn-search",
								"onClick": {
									"run": "action",
									"action": "runSearch"
								}
							},
							{
								"ctl": "button",
								"icon": "close",
								"name": "btn-clear",
								"onClick": {
									"run": "action",
									"action": "clearSearch"
								}
							}
						]
					}
				]
			}
		]
	}

  var ControlCode = {
		runSearch: runSearch,
		clearSearch: clearSearch,
		_onInit: _onInit
	};

	function runSearch() {
		var tmpVal = this.getFieldValue('search');
		if( tmpVal == '' ){
			this.publish('clear',[this]);
			return;
		}
		this.publish('search',[this,tmpVal]);
	}
	function clearSearch() {
		this.setFieldValue('');
		this.publish('clear',[this]);
	}
	function _onInit() {
		//--- Only fire the process change event
		var processChange = ActionAppCore.debounce(function () {
			console.log('pc')
			this.runSearch();
		}, 400).bind(this);
		this.elSearch = this.getFieldEl('search');
		this.elSearch.on('change', processChange.bind(this));
		this.elSearch.keyup(processChange.bind(this));
		// this.elSearch.keyup(function(theEvent){
		// 	if( theEvent && theEvent.keyCode  && theEvent.keyCode == 13){
		// 		processChange();
		// 	}
			
		// });
	}
	
	

	//---- Return control
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};
	return ThisControl;

})(ActionAppCore, $);

