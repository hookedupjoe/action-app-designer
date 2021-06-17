/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	//~ControlSpecs//~	
	var ControlSpecs = {
		"options": {
			"padding": false
		},
		"content": [
			{
				"ctl": "spot",
				"name": "nav-tabs",
				"text": "."
			},
			{
				ctl: "segment",
				basic: true,
				slim: true,
				content: [
					{
						"ctl": "field",
						"name": "title",
						"fluid": true,
						"readonly": true,
						"inputClasses": "title",
						"default": "Resource",
						"placeholder": "",
						"content": [
							{
								"ctl": "button",
								"color": "black",
								hidden: false,
								basic: true,
								right: true,
								"icon": "cancel",
								"name": "btn-close-page",
								"label": "Close",
								onClick: {
									"run": "action",
									action: "closeMe"
								}
							}
						]
					}
				]
			},
			{
				"ctl": "tabs",
				"name": "cattabs",
				"tabs": [
					{
						"label": "Resources",
						"name": "cattabs-catalog",
						"ctl": "tab",
						"content": [
							{
								"ctl": "button",
								"size": "small",
								basic: true,
								compact: true,
								"onClick": {
									"run": "action",
									"action": "refreshResources"
								},
								"basic": true,
								"icon": "recycle",
								"name": "btn-refresh-catalog-resources",
								"text": "Refresh"
							},
							{
								"ctl": "button",
								"color": "brown",
								"size": "small",
								basic: false,
								compact: true,
								"onClick": {
									"run": "action",
									"action": "addCatalogControl"
								},
								"labeled": true,
								"right": true,
								"icon": "newspaper",
								"name": "btn-add-control",
								"text": "Add Control"
							},
							{
								"ctl": "button",
								"color": "brown",
								"size": "small",
								basic: false,
								compact: true,
								"onClick": {
									"run": "action",
									"action": "addCatalogPanel"
								},
								"labeled": true,
								"right": true,
								"icon": "newspaper outline",
								"name": "btn-add-panel",
								"text": "Add Panel"
							},
							{
								"ctl": "button",
								"color": "brown",
								"size": "small",
								basic: false,
								compact: true,
								"onClick": {
									"run": "action",
									"action": "addCatalogTemplate"
								},
								"labeled": true,
								"right": true,
								"icon": {
									"[computed]": "context.app.controller.controls.detailsIndex.getDetails('Template').icon"
								},
								"name": "btn-add-template",
								"text": "Add Template"
							},
							{
								"ctl": "button",
								"color": "brown",
								"size": "small",
								basic: false,
								compact: true,
								"onClick": {
									"run": "action",
									"action": "addCatalogHTML"
								},
								"labeled": true,
								"right": true,
								"icon": "code",
								"name": "btn-add-resource",
								"text": "Add HTML"
							},
							{
								"ctl": "panel",
								"controlname": "design/ws/get-ws-outline?type=resources&catname=",
								"name": "resources"
							}
						]
					},
					{
						"label": "Details",
						"name": "cattabs-setup",
						"ctl": "tab",
						"content": [
							{
								"ctl": "button",
								"toright": true,
								"color": "blue",
								"size": "large",
								"labeled": true,
								"right": true,
								"icon": "arrow down",
								"onClick": {
									"run": "action",
									"action": "promptCatDetails"
								},
								text: "Edit Details",
								"name": "edit-cat-setup"
							},
							{
								"ctl": "button",
								"size": "large",
								"basic": true,
								"icon": "close",
								hidden: true,
								"onClick": {
									"run": "action",
									"action": "cancelAppDetails"
								},
								text: "Cancel",
								"name": "cancel-cat-setup"
							},
							{
								"ctl": "button",
								"hidden": true,
								"toright": true,
								"color": "green",
								"size": "large",
								"labeled": true,
								"right": true,
								"icon": "save",
								"onClick": {
									"run": "action",
									"action": "saveCatDetails"
								},
								text: "Save Details",
								"name": "save-cat-setup"
							},
							{
								"ctl": "button",
								"color": "blue",
								"onClick": {
									"run": "action",
									"action": "refreshDetailsInfo"
								},
								text: "Refresh",
								"name": "btn-refresh-setup"
							},
							{
								"ctl": "divider",
								"fitted": true,
								"clearing": true
							}
							,
							{
								"ctl": "panel",
								"controlname": "design/ws/panel-cat-setup?catname=",
								"name": "setupinfo"
							}
						]
					}
				]
			}
		]
	}
	//~ControlSpecs~//~

	//~ControlCode//~
	var ControlCode = {
		_onInit: _onInit,
		promptCatDetails: promptCatDetails,
		preLoad: preLoad,
		setup: setup,
		refreshPages: refreshPages,
		refreshDetailsInfo: refreshDetailsInfo,
		getDetailsInfo: getDetailsInfo,
		cancelAppDetails: cancelAppDetails,
		saveCatDetails: saveCatDetails,
		updateCatDetails: updateCatDetails,
		createAppDeployment: createAppDeployment,
		createCordovaDeployment: createCordovaDeployment,
		vscodeDeployment: vscodeDeployment,
		rebuildApp: rebuildApp,
		openInCode: openInCode,
		refreshTabNav: refreshTabNav,
		addPage, addPage,
		addCatalogHTML: addCatalogHTML,
		addCatalogTemplate: addCatalogTemplate,
		addCatalogControl: addCatalogControl,
		addCatalogPanel: addCatalogPanel,
		refreshResources: refreshResources,
		closeMe: closeMe,
		promptForDetailsInfo: promptForDetailsInfo
	};

	function closeMe() {
		this.context.page.controller.closeCatalogConsole(this.details);
	}


	function _onInit() {
		//this.parts.pages.subscribe('selectMe', onPageSelect.bind(this))
		this.parts.resources.subscribe('selectMe', onResourceSelect.bind(this))

		//this.context.page.controller.actions.wsItemSelected('', theTarget);

		var tmpDetailsInfo = this.getDetailsInfo();
		var tmpAppPath = this.parts.setupinfo.controlSpec.controlConfig.options.links.path;
		this.details.title = tmpDetailsInfo.title || this.details.catname;
		var tmpTitle = this.details.catname;
		if (this.details.title) {
			tmpTitle = '[' + this.details.catname + '] ' + this.details.title;
		}
		//this.getItemEl('title').html(tmpTitle);
		this.setFieldValue('title',tmpTitle);
		window.activeControl = this;
	}

	function onPageSelect(theEvent, theControl, theTarget) {
		this.publish('selected', [theControl, theTarget]);
	}
	function onResourceSelect(theEvent, theControl, theTarget) {
		this.publish('selected', [theControl, theTarget]);
	}


	function addPage() {
		var tmpThis = this;
		var tmpcatname = this.details.catname || '';

		var tmpPage = this.context.page.controller;
		tmpPage.getPanel('frmNewPage').prompt(
			{
				isNew: true,
				doc: { template: 'DefaultPage' }
			}
		).then(function (theSubmitted, theData) {
			if (!theSubmitted) {
				return;
			}

			theData.target = 'app';
			theData.catname = tmpcatname;
			ThisApp.common.apiCall({
				url: '/design/ws/new-page?run',
				data: theData
			}).then(function (theReply) {
				tmpThis.refreshAll();
			})

		})

	}

	ControlCode.refreshAll = refreshAll;
	function refreshAll() {
		this.refreshPages();
		this.refreshDetailsInfo();
	}

	function promptCatDetails(theParams, theTarget) {
		this.promptForDetailsInfo();
		this.setItemDisplay('edit-cat-setup', false)
		this.setItemDisplay('save-cat-setup', true)
		this.setItemDisplay('cancel-cat-setup', true)
	};


	function cancelAppDetails(theParams, theTarget) {
		this.setItemDisplay('edit-cat-setup', true)
		this.setItemDisplay('save-cat-setup', false)
		this.setItemDisplay('cancel-cat-setup', false)
		this.parts.setupinfo.refreshUI({ readonly: true });

	};

	function saveCatDetails(theParams, theTarget) {
		// var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['catname']);
		var tmpcatname = this.params.catname || '';

		this.setItemDisplay('edit-cat-setup', true)
		this.setItemDisplay('save-cat-setup', false)
		this.setItemDisplay('cancel-cat-setup', false)

		var tmpData = this.getDetailsInfo();
		var tmpThis = this;
		this.updateCatDetails(tmpcatname, tmpData).then(function (theReply) {
			if (theReply === true) {
				tmpThis.gotoItem("preview-link");
			} else {
				alert("Not Updated, there was a problem", "Did not save", "e")
			}
		})

	};


	function updateCatDetails(thecatname, theDetails) {
		var dfd = jQuery.Deferred();


		try {
			var tmpcatname = thecatname;
			if (!(tmpcatname)) {
				throw ("No app to open");
			}
			var tmpNewDetailsInfo = theDetails;
			if (!(tmpNewDetailsInfo)) {
				throw ("No details to process");
			}

			var tmpThis = this;
			ThisApp.apiCall({
				url: '/design/ws/update-cat-setup',
				data: (tmpNewDetailsInfo)
			}).then(function (theReply) {
				tmpThis.refreshDetailsInfo();
				tmpThis.parts.setupinfo.refreshUI({ readonly: true });
				tmpThis.publish('update-cat-setup', [tmpThis]);
				dfd.resolve(true)
			})
		} catch (ex) {
			console.error("Calling app setup update", ex)
			dfd.resolve(false);
		}


		return dfd.promise();
	};




	function createCordovaDeployment() {
		var tmpcatname = this.params.catname || ''
		if (!(tmpcatname)) {
			alert("No app to open");
			return;
		}
		var tmpURL = '/design/ws/deploy-cordova?catname=' + tmpcatname
		ThisApp.apiCall({ url: tmpURL }).then(function (theReply) {
			ThisApp.appMessage("Mobile App Created.  Open in VS code to review and deploy.", "s", { show: true });
		})
	};

	function createAppDeployment() {
		var tmpcatname = this.params.catname || ''
		if (!(tmpcatname)) {
			alert("No app to open");
			return;
		}
		var tmpURL = '/design/ws/deploy-app?catname=' + tmpcatname
		ThisApp.apiCall({ url: tmpURL }).then(function (theReply) {
			ThisApp.appMessage("Done, open in VS code to review and deploy.", "s", { show: true });
		})
	};

	ControlCode.vscodeDeploymentCordova = vscodeDeploymentCordova;
	function vscodeDeploymentCordova() {
		var tmpcatname = this.params.catname || ''
		if (!(tmpcatname)) {
			alert("No app to open");
			return;
		}
		var tmpURL = '/design/ws/launch-cordova-deploy?catname=' + tmpcatname
		ThisApp.apiCall({ url: tmpURL }).then(function (theReply) {

		})
	};
	function vscodeDeployment() {
		var tmpcatname = this.params.catname || ''
		if (!(tmpcatname)) {
			alert("No app to open");
			return;
		}
		var tmpURL = '/design/ws/launch-cat-deploy?catname=' + tmpcatname
		ThisApp.apiCall({ url: tmpURL }).then(function (theReply) {

		})
	};


	function rebuildApp() {
		var tmpcatname = this.params.catname || ''
		if (!(tmpcatname)) {
			alert("No app to open");
			return;
		}
		ThisApp.apiCall({ url: '/design/ws/build-app?catname=' + tmpcatname }).then(function (theReply) {
			alert("Recreated " + tmpcatname, "Build Complete", "c");
		})
	};



	function openInCode() {
		var tmpcatname = this.params.catname || ''
		if (!(tmpcatname)) {
			alert("No app to open");
			return;
		}
		if (!(tmpcatname)) {
			alert("No app to open");
			return;
		}
	};


	function preLoad(theDetails) {
		var tmpcatname = theDetails.catname || '';
		this.params = this.params || {};
		this.params.catname = tmpcatname;
		var tmpAppTitle = theDetails.title || theDetails.cattitle || tmpcatname;
		this.details = {
			catname: tmpcatname,
			title: tmpAppTitle
		}

		this.controlConfig.index.controls.resources.controlname += tmpcatname
		this.controlConfig.index.controls.setupinfo.controlname += tmpcatname

		//--- Set Title
		//this.controlConfig.index.items.title.text = 'Loading ...';



	}
	//---- Initial Details of the control
	function setup(theDetails) {
		this.refreshTabNav();
	}

	function refreshTabNav() {
		var tmpHTML = this.context.page.controller.getSubNavTabs(this.details);
		if ((tmpHTML)) {
			this.loadSpot('nav-tabs', tmpHTML.join(''))
		}

	}

	ControlCode.refreshOnActivate = refreshOnActivate;
	function refreshOnActivate() {
		this.refreshTabNav();
	}

	function promptForDetailsInfo() {
		this.parts.setupinfo.refreshUI({ readonly: false });
		this.gotoItem('setupinfo');
		this.parts.setupinfo.gotoField("catname");
	}

	function refreshPages() {
		this.parts.pages.refreshFromURI();
	}

	function refreshDetailsInfo() {
		this.parts.setupinfo.refreshFromURI();
	}
	function getDetailsInfo() {
		return this.parts.setupinfo.getData();
	}
	
	function refreshResources() {
		this.parts.resources.refreshFromURI();
	}


	function addCatalogHTML() {
		var tmpThis = this;

		ThisApp.input("Enter HTML name", "HTML Name", "Create HTML Resource", "")
			.then(function (theValue) {
				if (!(theValue)) { return };
				var tmpRequest = {
					pagename: tmpThis.details.pagename || '',
					catname: tmpThis.details.catname || '',
					resname: theValue,
					restype: 'HTML',
					content: ""
				}

				ThisApp.apiCall({
					url: '/design/ws/save-resource?run',
					data: tmpRequest
				}).then(function (theReply) {
					tmpThis.refreshResources();
				})

			})



	}

	function addCatalogTemplate() {
		var tmpThis = this;

		ThisApp.input("Enter template name", "Template Name", "Create Template Resource", "")
			.then(function (theValue) {
				if (!(theValue)) { return };
				var tmpRequest = {
					pagename: tmpThis.details.pagename || '',
					catname: tmpThis.details.catname || '',
					resname: theValue,
					restype: 'Template',
					content: ""
				}

				ThisApp.apiCall({
					url: '/design/ws/save-resource?run',
					data: tmpRequest
				}).then(function (theReply) {
					tmpThis.refreshResources();
				})

			})

	}

	function addCatalogControl() {
		var tmpThis = this;

		ThisApp.input("Enter control name", "Control Name", "Create Control Resource", "")
			.then(function (theValue) {
				if (!(theValue)) { return };
				var tmpRequest = {
					pagename: tmpThis.details.pagename || '',
					catname: tmpThis.details.catname || '',
					resname: theValue,
					restype: 'Control',
					content: ""
				}

				ThisApp.apiCall({
					url: '/design/ws/save-resource?run',
					data: tmpRequest
				}).then(function (theReply) {
					tmpThis.refreshResources();
				})

			})



	}

	function addCatalogPanel() {
		var tmpThis = this;
		ThisApp.input("Enter panel name", "Panel Name", "Create Panel Resource", "")
			.then(function (theValue) {
				if (!(theValue)) { return };
				var tmpRequest = {
					pagename: tmpThis.details.pagename || '',
					catname: tmpThis.details.catname || '',
					resname: theValue,
					restype: 'Panel',
					content: ""
				}

				ThisApp.apiCall({
					url: '/design/ws/save-resource?run',
					data: tmpRequest
				}).then(function (theReply) {
					tmpThis.refreshResources();
				})

			})




	}

	//~ControlCode~//~

	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };
	return ThisControl;
})(ActionAppCore, $);

