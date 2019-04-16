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
                            "ctl": "field",
														readonly: true,
                            "name": "title",
                            "label": "Page / Tab Title",
                            "req": true
                          },
                          {
														"ctl": "radiolist",
														readonly: true,
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

	}

	var ControlCode = {
		// actions: {
		// 	promptAppSetup: promptAppSetup
		// },
		promptAppSetup: promptAppSetup,
		setup: setup,
		refreshPages: refreshPages,
		refreshSetupInfo: refreshSetupInfo,
		getSetupInfo: getSetupInfo,
		cancelAppSetup: cancelAppSetup,
		saveAppSetup: saveAppSetup,
		updateAppSetup: updateAppSetup,
		createAppDeployment: createAppDeployment,
		vscodeDeployment: vscodeDeployment,
		rebuildApp: rebuildApp,
		openInCode: openInCode,
		promptForSetupInfo: promptForSetupInfo
	};

	var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };

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



	function createAppDeployment() {
		var tmpAppName = this.params.appname || ''
		if (!(tmpAppName)) {
			alert("No app to open");
			return;
		}
		var tmpURL = '/design/ws/deploy-app?appname=' + tmpAppName
		var tmpThis = this;
		ThisApp.apiCall({ url: tmpURL }).then(function (theReply) {
			ThisApp.confirm("Done, open in VS code now?", "Deployment Created").then((function (theIsYes) {
				if (!theIsYes) {
					return;
				}
				tmpThis.vscodeDeployment({ appname: tmpAppName })
			}).bind(this))
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
		ThisApp.apiCall({ url: '/design/ws/launch-app?appname=' + tmpAppName })
	};


	//---- Initial Setup of the control
	function setup(theDetails) {
		// var tmpAppName = theDetails.appname || '';
		// this.params = this.params || {};
		// this.params.appname = tmpAppName;
		// var tmpTitle = theDetails.title || theDetails.apptitle || tmpAppName;
		// this.controlConfig.index.controls.pages.controlname += tmpAppName
		// this.controlConfig.index.controls.setupinfo.controlname += tmpAppName
		// var tmpAppTitle = tmpAppName
		// if (tmpTitle) {
		// 	tmpAppTitle = '[' + tmpAppName + '] ' + tmpTitle;
		// }
		// this.controlConfig.index.items.title.text = tmpAppTitle;
		// this.controlConfig.index.items["preview-link"].attr = {
		// 	href: "http://localhost:33461/" + tmpAppName,
		// 	target: "app" + tmpAppName
		// }

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

	return ThisControl;
})(ActionAppCore, $);

