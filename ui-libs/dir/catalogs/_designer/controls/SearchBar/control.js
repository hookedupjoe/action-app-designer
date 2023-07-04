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

  var ControlCode = {
		runSearch: runSearch,
		clearSearch: clearSearch,
		showLoading: showLoading,
		clearLoading: clearLoading,
		_onInit: _onInit
	};

	
	function showLoading(theIsLoading) {
		var tmpSeg = this.getItem('container');
		if( !tmpSeg && tmpSeg.el){
			return;
		}
		if( theIsLoading !== false ){
			tmpSeg.el.addClass('loading');
		} else {
			tmpSeg.el.removeClass('loading');
		}
	}
	function clearLoading() {
		this.showLoading(false)
	}
	function runSearch(theOnlyIfChangedFlag) {
		var tmpVal = this.getFieldValue('search');
		if( (this.lastVal == tmpVal) && (theOnlyIfChangedFlag === true)){
			return;
		}
		this.lastVal = tmpVal;
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
		var processChange = ActionAppCore.debounce(function (theEvent) {			
			var tmpOnlyIfChanged = true;
			this.runSearch(tmpOnlyIfChanged);
		}, 500).bind(this);
		this.elSearch = this.getFieldEl('search');
		this.elSearch.on('change', processChange.bind(this));
		this.elSearch.keyup(processChange.bind(this));
		
		this.elSearch.keyup((function(theEvent){
			if( ( theEvent && theEvent.keyCode  && theEvent.keyCode == 13) ){
				this.runSearch(true);
			}
		 }).bind(this));
	}
	
	

	//---- Return control
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};
	return ThisControl;

})(ActionAppCore, $);

