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
						"ctl": "title",
						"name": "title",
						"size": "large",
						"color": "blue",
						"icon": "globe",
						"text": "Application"
					}
				]
			},
			{
				"ctl": "tabs",
				"name": "apptabs",
				"tabs": [
					{
						"label": "Design",
						"name": "apptabs-design",
						"ctl": "tab",
						"content": [
							{
								"ctl": "tabs",
								"name": "apptabs-design-tabs",
								"tabs": [
									{
										"label": "Pages",
										"name": "apptabs-pages",
										"ctl": "tab",
										"content": [
											{
												"ctl": "button",
												"size": "small",
												compact: true,
												"onClick": {
													"run": "action",
													"action": "refreshPages"
												},
												"basic": true,
												"icon": "recycle",
												"name": "btn-refresh-pages",
												"text": "Refresh"
											},
											{
												"ctl": "button",
												"color": "blue",
												"size": "small",
												compact: true,
												"onClick": {
													"run": "action",
													"action": "addPage"
												},
												"labeled": true,
												"right": true,
												"icon": "plus",
												"name": "btn-add-page",
												"text": "Add Page"
											},
											
											{
												"ctl": "divider",
												"fitted": true,
												"clearing": true
											},
											{
												"ctl": "panel",
												"controlname": "design/ws/get-ws-outline?type=pages&appname=",
												"name": "pages"
											}
										]
									},
									{
										"label": "Resources",
										"name": "apptabs-resources",
										"ctl": "tab",
										"content": [
											{
												"ctl": "panel",
												"controlname": "design/ws/get-ws-outline?type=resources&appname=",
												"name": "resources"
											}
										]
									}
								]
							}
						]
					},
					{
						"label": "Preview",
						"name": "apptabs-preview",
						"ctl": "tab",
						"content": [
							{
								"ctl": "a",
								"classes": "ui button green",
								"attr": {
									href: "http://localhost:33461/app001",
									target: "app-app001"
								},
								text: "Preview Now",
								"name": "preview-link"
							},
							{
								"ctl": "button",
								"onClick": {
									"run": "action",
									"action": "rebuildApp"
								},
								text: "Rebuild",
								"name": "rebuild-app"
							}
						]
					},
					{
						"label": "Deploy",
						"name": "apptabs-deploy",
						"ctl": "tab",
						"content": [
							{
								"ctl": "button",
								"onClick": {
									"run": "action",
									"action": "createAppDeployment"
								},
								text: "Build Deployment",
								"name": "build-deploy-app"
							},
							{
								"ctl": "a",
								"classes": "ui button basic blue",
								"attr": {
									href: "",
									target: ""
								},
								text: "Open Deployment in VS Code",
								"name": "deploy-in-code-link"
							},
							{
								ctl: "divider",
								fitted: true,
								clearing: true
							},
							{
								"ctl": "button",
								"onClick": {
									"run": "action",
									"action": "createCordovaDeployment"
								},
								text: "Build Mobile App",
								"name": "build-deploy-cordova"
							},
							{
								"ctl": "a",
								"classes": "ui button basic blue",
								"attr": {
									href: "",
									target: ""
								},
								text: "Open Mobile Deployment in VS Code",
								"name": "cordova-in-code-link"
							}

						]
					},
					{
						"label": "Setup",
						"name": "apptabs-setup",
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
									"action": "promptAppSetup"
								},
								text: "Edit Setup",
								"name": "edit-app-setup"
							},
							{
								"ctl": "button",
								"size": "large",
								"basic": true,
								"icon": "close",
								hidden: true,
								"onClick": {
									"run": "action",
									"action": "cancelAppSetup"
								},
								text: "Cancel",
								"name": "cancel-app-setup"
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
									"action": "saveAppSetup"
								},
								text: "Save Setup",
								"name": "save-app-setup"
							},
							{
								"ctl": "a",
								"classes": "ui button basic blue",
								"attr": {
									href: "",
									target: ""
								},
								text: "Open in VS Code",
								"name": "open-in-code-link"
							},
							{
								"ctl": "button",
								"color": "blue",
								"onClick": {
									"run": "action",
									"action": "refreshSetupInfo"
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
								"controlname": "design/ws/panel-app-setup?appname=",
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
		promptAppSetup: promptAppSetup,
		preLoad: preLoad,
		setup: setup,
		refreshPages: refreshPages,
		refreshSetupInfo: refreshSetupInfo,
		getSetupInfo: getSetupInfo,
		cancelAppSetup: cancelAppSetup,
		saveAppSetup: saveAppSetup,
		updateAppSetup: updateAppSetup,
		createAppDeployment: createAppDeployment,
		createCordovaDeployment: createCordovaDeployment,
		vscodeDeployment: vscodeDeployment,
		rebuildApp: rebuildApp,
		openInCode: openInCode,
		refreshTabNav: refreshTabNav,
		addPage, addPage,
		promptForSetupInfo: promptForSetupInfo
	};

	function _onInit() {
		this.parts.pages.subscribe('selectMe', onPageSelect.bind(this))
		var tmpSetupInfo = this.getSetupInfo();
		var tmpAppPath = this.parts.setupinfo.controlSpec.controlConfig.options.links.path;		
		var tmpDeployPath = this.parts.setupinfo.controlSpec.controlConfig.options.links.deploy;
		var tmpCordovaPath = this.parts.setupinfo.controlSpec.controlConfig.options.links.cordova;
		this.details.path = tmpAppPath;
		this.details.deploy = tmpDeployPath;
		this.details.cordova = tmpCordovaPath;
		this.details.apptitle = tmpSetupInfo.title || this.details.appname;
		var tmpTitle = this.details.appname;
		if (this.details.apptitle) {
			tmpTitle = '[' + this.details.appname + '] ' + this.details.apptitle;
		}
		this.getItemEl('title').html(tmpTitle);
		var tmpCodeLink = this.getItemEl('open-in-code-link');
		tmpCodeLink.attr('href', "vscode://file/" + this.details.path);
		tmpCodeLink.attr('target', "app-code-" + this.details.appname);

		var tmpDeployLink = this.getItemEl('deploy-in-code-link');
		tmpDeployLink.attr('href', "vscode://file/" + this.details.deploy);
		tmpDeployLink.attr('target', "app-deploy-code-" + this.details.appname);

		var tmpMobileLink = this.getItemEl('cordova-in-code-link');
		tmpMobileLink.attr('href', "vscode://file/" + this.details.cordova);
		tmpMobileLink.attr('target', "app-cordova-code-" + this.details.appname);

	}

	function onPageSelect(theEvent, theControl, theTarget) {
		this.publish('selected', [theControl, theTarget])
	}

	function addPage() {
		var tmpThis = this;
		var tmpAppName = this.details.appname || '';

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
			theData.appname = tmpAppName;
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
		this.refreshSetupInfo();
	}

	function promptAppSetup(theParams, theTarget) {
		this.promptForSetupInfo();
		this.setItemDisplay('edit-app-setup', false)
		this.setItemDisplay('save-app-setup', true)
		this.setItemDisplay('cancel-app-setup', true)
	};


	function cancelAppSetup(theParams, theTarget) {
		this.setItemDisplay('edit-app-setup', true)
		this.setItemDisplay('save-app-setup', false)
		this.setItemDisplay('cancel-app-setup', false)
		this.parts.setupinfo.refreshUI({ readonly: true });

	};

	function saveAppSetup(theParams, theTarget) {
		// var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname']);
		var tmpAppName = this.params.appname || '';

		this.setItemDisplay('edit-app-setup', true)
		this.setItemDisplay('save-app-setup', false)
		this.setItemDisplay('cancel-app-setup', false)

		var tmpData = this.getSetupInfo();
		var tmpThis = this;
		this.updateAppSetup(tmpAppName, tmpData).then(function (theReply) {
			if (theReply === true) {
				tmpThis.gotoItem("preview-link");
			} else {
				alert("Not Updated, there was a problem", "Did not save", "e")
			}
		})

	};


	function updateAppSetup(theAppName, theDetails) {
		var dfd = jQuery.Deferred();


		try {
			var tmpAppName = theAppName;
			if (!(tmpAppName)) {
				throw ("No app to open");
			}
			var tmpNewSetupInfo = theDetails;
			if (!(tmpNewSetupInfo)) {
				throw ("No details to process");
			}

			var tmpThis = this;
			ThisApp.apiCall({
				url: '/design/ws/update-app-setup',
				data: (tmpNewSetupInfo)
			}).then(function (theReply) {
				tmpThis.refreshSetupInfo();
				tmpThis.parts.setupinfo.refreshUI({ readonly: true });
				tmpThis.publish('update-app-setup', [tmpThis]);
				dfd.resolve(true)
			})
		} catch (ex) {
			console.error("Calling app setup update", ex)
			dfd.resolve(false);
		}


		return dfd.promise();
	};



	
	function createCordovaDeployment() {
		var tmpAppName = this.params.appname || ''
		if (!(tmpAppName)) {
			alert("No app to open");
			return;
		}
		var tmpURL = '/design/ws/deploy-cordova?appname=' + tmpAppName
		ThisApp.apiCall({ url: tmpURL }).then(function (theReply) {
			ThisApp.alert("Done, open in VS code to review and deploy.", "Deployment Created");
		})
	};

	function createAppDeployment() {
		var tmpAppName = this.params.appname || ''
		if (!(tmpAppName)) {
			alert("No app to open");
			return;
		}
		var tmpURL = '/design/ws/deploy-app?appname=' + tmpAppName
		ThisApp.apiCall({ url: tmpURL }).then(function (theReply) {
			ThisApp.alert("Done, open in VS code to review and deploy.", "Deployment Created");
		})
	};

	ControlCode.vscodeDeploymentCordova = vscodeDeploymentCordova;
	function vscodeDeploymentCordova() {
		var tmpAppName = this.params.appname || ''
		if (!(tmpAppName)) {
			alert("No app to open");
			return;
		}
		var tmpURL = '/design/ws/launch-cordova-deploy?appname=' + tmpAppName
		ThisApp.apiCall({ url: tmpURL }).then(function (theReply) {

		})
	};
	function vscodeDeployment() {
		var tmpAppName = this.params.appname || ''
		if (!(tmpAppName)) {
			alert("No app to open");
			return;
		}
		var tmpURL = '/design/ws/launch-app-deploy?appname=' + tmpAppName
		ThisApp.apiCall({ url: tmpURL }).then(function (theReply) {

		})
	};


	function rebuildApp() {
		var tmpAppName = this.params.appname || ''
		if (!(tmpAppName)) {
			alert("No app to open");
			return;
		}
		ThisApp.apiCall({ url: '/design/ws/build-app?appname=' + tmpAppName }).then(function (theReply) {
			alert("Recreated " + tmpAppName, "Build Complete", "c");
		})
	};



	function openInCode() {
		var tmpAppName = this.params.appname || ''
		if (!(tmpAppName)) {
			alert("No app to open");
			return;
		}
		if (!(tmpAppName)) {
			alert("No app to open");
			return;
		}
		console.log("disabled");
		//ThisApp.apiCall({ url: '/design/ws/launch-app?appname=' + tmpAppName })
	};


	function preLoad(theDetails) {
		var tmpAppName = theDetails.appname || '';
		this.params = this.params || {};
		this.params.appname = tmpAppName;
		var tmpAppTitle = theDetails.title || theDetails.apptitle || tmpAppName;
		this.details = {
			appname: tmpAppName,
			title: tmpAppTitle
		}

		this.controlConfig.index.controls.pages.controlname += tmpAppName
		this.controlConfig.index.controls.resources.controlname += tmpAppName

		this.controlConfig.index.controls.setupinfo.controlname += tmpAppName
	
		//--- Set Title
		this.controlConfig.index.items.title.text = 'Loading ...';

		//--- Set Preview Link
		this.controlConfig.index.items["preview-link"].attr = {
			href: "http://localhost:33461/" + tmpAppName,
			target: "app" + tmpAppName
		}
		


	}
	//---- Initial Setup of the control
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

	function promptForSetupInfo() {
		this.parts.setupinfo.refreshUI({ readonly: false });
		this.gotoItem('setupinfo');
		this.parts.setupinfo.gotoField("appname");
	}

	function refreshPages() {
		this.parts.pages.refreshFromURI();
	}

	function refreshSetupInfo() {
		this.parts.setupinfo.refreshFromURI();
	}
	function getSetupInfo() {
		return this.parts.setupinfo.getData();
	}

	//~ControlCode~//~

	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };
	return ThisControl;
})(ActionAppCore, $);

