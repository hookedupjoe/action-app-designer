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
				"icon": "box",
				"text": "Resource Name"
			},
			{
				"ctl": "tabs",
				"name": "resourcetabs",
				"tabs": [
					{
						"label": "Info",
						"name": "resourcetabs-info",
						"ctl": "tab",
						"content": [
							{
								"ctl": "fieldrow",
								"name": "info-row",
								"items": [
									{
										"ctl": "field",
										"name": "appname",
										"label": "Location",
										"readonly":true,
										"default": "[ws]/catalog/controls",
										"req": true
									},
									{
										"ctl": "field",
										"name": "title",
										"readonly":true,
										"label": "Conrol Name",
										"default": "SearchControl",
										"req": true
									}
								]
							}
						]
					},
					{
						"label": "Content",
						"name": "resourcetabs-content-tab",
						"ctl": "tab",
						"content": [
							{
								"ctl": "spot",
								"name": "ace-editor"
							}					
						]
					}
				]
			}
		]
	}

	var ControlCode = {
		preLoad: preLoad,
		setup: setup,
		setupEditor: setupEditor
	};

	
	function setupEditor() {
		if (this.editorSetup === true) {
			return;
		}
		this.editorSetup = true;
		
		this.aceEditorEl = this.getSpot("ace-editor");
		this.aceEditor = ace.edit(this.aceEditorEl.get(0));
		this.aceEditor.setTheme("ace/theme/vibrant_ink");
		this.aceEditor.setFontSize(16);

		this.aceEditorEl.css('height', '100%');
		ThisApp.refreshLayouts();
	}

		//--- Run before
		function preLoad(theDetails) {
			console.log( 'setup theDetails', theDetails);
			var tmpResName = theDetails.resname || '';
			var tmpResType = theDetails.restype || '';
			this.params = ThisApp.clone(theDetails);
			
			var tmpTitle = tmpResType + ": " + tmpResName;

			this.controlConfig.index.items.title.text = tmpTitle;
		
		}
		//---- Initial Setup of the control
		function setup(theDetails) {
			this.setupEditor();
			this.aceEditor.setValue('var test = true;')
		}

		





	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

	return ThisControl;
})(ActionAppCore, $);

