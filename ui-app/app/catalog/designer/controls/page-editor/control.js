/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			"padding": true
		},
		"content": [
			{
				"ctl": "title",
				"name": "title",
				"size": "large",
				"color": "blue",
				"icon": "columns",
				"text": "PageName"
			},
			{
				"ctl": "tabs",
				"name": "pagetabs",
				"tabs": [
					{
						"label": "Page Setup",
						"name": "pagetabs-setup",
						"ctl": "tab",
						"content": [

							{
								"ctl": "tabs",
								"name": "page-setup-tabs",
								"tabs": [
									{
										"label": "Page Info",
										"name": "page-setup-tabs-info",
										"ctl": "tab",
										"content": [
											{
												"ctl": "field",
												"name": "title",
												"label": "Page / Tab Title",
												"req": true
											},
											{
												"ctl": "radiolist",
												"name": "where-to-show",
												"label": "Where to show",
												"list": "Primary|primary,Side Only|side,Hidden|hidden",
												"req": true
											},
											{
												"ctl": "hidden",
												"name": "pagename"
											}
										]
									},
									{
										"label": "Page Resources",
										"name": "page-setup-tabs-required",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Resources loaded when page loads",
												"name": "setup-required"
											}
										]
									}
				
								]
							}
						]
					},
				
					{
						"label": "Layout",
						"name": "pagetabs-layout",
						"ctl": "tab",
						"content": [
							{
								"ctl": "tabs",
								"name": "page-layout-tabs",
								"tabs": [
									{
										"label": "Regions",
										"name": "page-layout-tabs-regions",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Layout Options JSON",
												"name": "layout-options"
											}
										]
									},
									{
										"label": "Config",
										"name": "page-layout-tabs-config",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Config JSON",
												"name": "layout-config"
											}
										]
									}
				
								]
							}
						]
				
					},
					{
						"label": "Events",
						"name": "pagetabs-events",
						"ctl": "tab",
						"content": [
							{
								"ctl": "tabs",
								"name": "page-events-tabs",
								"tabs": [
									{
										"label": "Initialize",
										"name": "page-events-tabs-on-init",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Initilized when app loads",
												"name": "on-init"
											}
										]
									},
									{
										"label": "First Activate",
										"name": "page-events-tabs-on-first-init",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "First time activated - before content loads",
												"name": "on-first-init"
											}
										]
									},
									{
										"label": "First Load",
										"name": "page-events-tabs-on-first-load",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Ready event - after content loaded",
												"name": "on-first-load"
											}
										]
									},
									{
										"label": "Activate",
										"name": "page-events-tabs-on-activate",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Activate event - runs every time page is activated",
												"name": "on-activate"
											}
										]
									},
									{
										"label": "Resize",
										"name": "page-events-tabs-on-resize",
										"ctl": "tab",
										"content": [
											{
												"ctl": "textarea",
												label: "Resize event - runs when layout is resized",
												"name": "on-resize"
											}
										]
									}
								]
							}
						]
				
					},
					{
						"label": "Code",
						"name": "pagetabs-code",
						"ctl": "tab",
						"content": [
							{
								"ctl": "textarea",
								"label": "Page Code",
								"name": "page-code"
							}
						]
					}
	
					
				]
	
	
			}
	
		]
	
	}

	var ControlCode = {
		setup: setup
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
		
	
	}





	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;
})(ActionAppCore, $);

