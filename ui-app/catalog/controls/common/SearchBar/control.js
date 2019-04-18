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
		clearSearch: clearSearch
	};


	function runSearch() {
		console.log( 'runSearch', this);		
	}
	function clearSearch() {
		console.log( 'clearSearch', this);		
	}


	//---- Return control
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};
	return ThisControl;

})(ActionAppCore, $);

