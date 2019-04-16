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
				name: "layout",
				center: [
					{
						ctl: "spot",
						name: "center",
						text: "Body Here"
					}
				],
				west: [
					{
						"ctl": "tbl-ol-node",
						"name": "page-code",
						"type": "page",
						"details": "Code Outline",
						"meta": "&#160;",
						"classes": "page-code-table",
						"level": 1,
						"group": "page-code-outline",
						"item": "page",
						"icon": "columns",
						"color": "green",
						"content": [
							{
								"ctl": "tbl-ol-node",
								"type": "setup",
								"name": "Setup",
								"details": "Page",
								"meta": "&#160;",
								"level": 2,
								"icon": "certificate",
								"color": "green",
								"content": [
									{
										"ctl": "tbl-ol-node",
										"name": "setup-pageinfo",
										"details": "Page Info",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "setup-pageinfo",
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "setup-resources",
										"details": "Resources",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "setup-resources",
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "setup-pagecode",
										"details": "Page Code",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "setup-pagecode",
										"icon": "file code outline",
										"color": "blue"
									}
								]
							},
							{
								"ctl": "tbl-ol-node",
								"type": "layout",
								"name": "Layout",
								"details": "Layout",
								"meta": "&#160;",
								"level": 2,
								"icon": "calculator",
								"color": "orange",
								"content": [
									{
										"ctl": "tbl-ol-node",
										"name": "layout-regions",
										"details": "Regions",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "layout-regions",
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "layout-config",
										"details": "Config",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "layout-config",
										"icon": "file code outline",
										"color": "blue"
									}
								]
							},
							{
								"ctl": "tbl-ol-node",
								"type": "events",
								"name": "Events",
								"details": "Events",
								"meta": "&#160;",
								"level": 2,
								"icon": "recycle",
								"color": "black",
								"content": [
									{
										"ctl": "tbl-ol-node",
										"name": "events-pre-init",
										"details": "Pre Init",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "events-pre-init",
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "events-init",
										"details": "Initialize",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "events-init",
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "events-preload",
										"details": "Pre Load",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "events-preload",
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "events-load",
										"details": "Initial Load",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "events-load",
										"icon": "file code outline",
										"color": "blue"
									},
									{
										"ctl": "tbl-ol-node",
										"name": "events-resize",
										"details": "Resized",
										"meta": "&#160;",
										"group": "page-code-outline",
										"item": "events-resize",
										"icon": "file code outline",
										"color": "blue"
									}
								]
							}
						]
					}
				
				],
				north: [
					{
						"ctl": "title",
						"name": "title",
						"size": "large",
						"color": "black",
						"text": "Page Code"
					}
				]
			}
	
		]
	
	}

	var ControlCode = {
		setup: setup,
		refreshFromSource: refreshFromSource,
		refreshFromLoaded: refreshFromLoaded
	};

	

	//---- Initial Setup of the control
	function setup(theDetails) {
		var tmpPageName = theDetails.pagename || '';
		this.params = this.params || {};
		this.params.pagename = tmpPageName;
		var tmpTitle = theDetails.title || theDetails.pagetitle || tmpPageName;
		// this.controlConfig.index.controls.pages.controlname += tmpPageName
		// this.controlConfig.index.controls.setupinfo.controlname += tmpPageName
		var tmpPageTitle = tmpPageName
		if (tmpTitle && (tmpTitle != tmpPageName)) {
			tmpPageTitle = '[' + tmpPageName + '] ' + tmpTitle;
		}
		this.controlConfig.index.items.title.text = tmpPageTitle;

		this.endpointURL = 'design/ws/page-code?run&source=workspace&pagename=' + tmpPageName;
		this.refreshFromSource();
	
	}

	function refreshFromLoaded(){
		console.log( 'refreshFromLoaded', this.loaded);
	}

	function refreshFromSource(){
		var tmpThis = this;

		ThisApp.apiCall(this.endpointURL).then(function(theReply){
			if( theReply && theReply.index && theReply.parts ){
				var tmpIndex = theReply.index;
				var tmpParts = theReply.parts;
				var tmpCodeIndex = {};
				
				tmpThis.loaded = {
					index: tmpIndex,
					parts: tmpParts, 
					codeIndex: tmpCodeIndex
				}

				for( var aName in tmpIndex){
					var tmpCode = tmpParts[tmpIndex[aName]];
					tmpCodeIndex[aName] = tmpCode
				}
			}
			tmpThis.refreshFromLoaded();
			
		})
	}



	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;
})(ActionAppCore, $);

