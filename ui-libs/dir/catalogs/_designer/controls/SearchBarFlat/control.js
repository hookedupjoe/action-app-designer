/*
SearchBar Control

Author: Joseph Francis
License: LGPL
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
		clearSearch: clearSearch		
	};

	//--- Automatically runs when loaded in UI
	ControlCode["_onInit"] = onInit

	function onInit(){
		//ToDo: Add autosearch config option that tracks key up with debounce
		//console.log('init search ctl');
	}
	function runSearch() {
		this.publish('search',[this,this.getFieldValue('search')]);
	}
	function clearSearch() {
		this.setFieldValue('search','');
		this.publish('clear',[this]);
	}


	//---- Return control
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};
	return ThisControl;

})(ActionAppCore, $);

