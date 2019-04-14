/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

    var thisPageSpecs = {
        pageName: "WorkspacePage",
        pageTitle: "Workspace",
        navOptions: {
            topLink: true,
            sideLink: true
        }
    };

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';


    thisPageSpecs.required = {
        controls: {
            map: {
                "app/catalog/designer/controls/app-console": "panelAppConsole"
            }
        },
        panels: {
            map: {
                "design/ws/frmNewApp": "frmNewApp"
            }
        }
    }

    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        north: { control: "north" },
        east: { html: "east" },
        west: { partname: "west", control: "west" },
        center: { html: "body" },
        south: false
    }

    //--- Customize default layout configuration
    //--- See http://layout.jquery-dev.com/documentation.cfm for details
    thisPageSpecs.layoutConfig = {
        west__size: "250"
        , east__size: "400"
    }


    //--- Start with a ase SitePage component
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    // .. they happen in this order

    //=== On Application Load ===
    /*
    * This happens when the page is loaded, try to push activity back to when the tab is used
    *    If your component need to do stuff to be availale in the background, do it here
    */
    var actions = ThisPage.pageActions;
    var openAppGroupName = 'workspace-outline';
    var loadedApps = {};
    window.loadedApps = loadedApps;
    var appSetupConfig = false;

    ThisPage._onPreInit = function (theApp) {
        ThisPage._om = theApp.om;

    }
    ThisPage._onInit = function () {

    }

    //=== On Page Activation ===
    /*
    * This happens the first time the page is activated and happens only one time
    *    Do the lazy loaded stuff in the initial activation, then do any checks needed when page is active
    *    Do stuff that needs to be available from this component, such as services, 
    *     that are needed even if the page was not activated yet
    */
    ThisPage._onFirstActivate = function (theApp) {
        // openAppGroupName = ThisPage.ns(openAppGroupName);
        //--- This tells the page to layout the page, load templates and controls, et
        ThisPage.initOnFirstLoad().then(
            function () {
                //--- Now your done - READY to do stuff the first time on your page

                //--- Do special stuff on page load here
                //--- Then optionally call the stuff that will happen every time 
                //      the page is activated if not already called by above code
                ThisPage._onActivate();
            }
        );
    }

    ThisPage._onActivate = function () {
        //-- Do refresh / checks here to update when page is activated

    }
    //--- End lifecycle hooks

    //=== Page Setup


    //--- Layout related lifecycle hooks
    ThisPage._onResizeLayout = function (thePane, theElement, theState, theOptions, theName) {

    }

    //=== Page Stuff

   
    actions.refreshWorkspace = refreshWorkspace;
    function refreshWorkspace(){
        ThisPage.parts.west.parts.workspace.refreshFromURI();
    };
    
    
    actions.showAppConsole = showAppConsole;
    function showAppConsole(theParams, theTarget) {
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname', 'apptitle', 'name','title']);
        var tmpAppName = tmpParams.appname  || tmpParams.name || '';
        if (!(tmpAppName)) {
            alert("No app name provided to open");
            return;
        }
        var tmpAppTitle = tmpParams.apptitle || tmpParams.title || '';

        if (loadedApps[tmpAppName]) {
            var tmpTabAttr = { group: openAppGroupName, item: tmpAppName };
            ThisApp.gotoTab(tmpTabAttr);
        } else {
            var tmpNewApp = ThisPage.getControl('panelAppConsole').create('app-' + tmpAppName);
            tmpNewApp.setup({ appname: tmpAppName, title: tmpAppTitle });
            tmpNewApp.subscribe('update-app-setup', function(){
                refreshWorkspace()
            })
            loadedApps[tmpAppName] = tmpNewApp;

            //--- For Debugging
            window[tmpAppName] = tmpNewApp;

            //--- Create a new card for this app
            ThisPage.addToSpot('body', '<div appuse="cards" group="' + openAppGroupName + '" item="' + tmpAppName + '">TESTING</div>');
            var tmpTabAttr = { group: openAppGroupName, item: tmpAppName };
            //--- Find created cards jQuery element
            var tmpNewGroup = ThisPage.getByAttr$({ group: openAppGroupName, item: tmpAppName, appuse: 'cards' });
            //--- Load App Console into that card
            tmpNewApp.loadToElement(tmpNewGroup);
            //--- Go to the newly added card (to show it and hide others)
            ThisApp.gotoTab(tmpTabAttr);
        }
    };


    actions.addApp = addApp;
    function addApp(theParams, theTarget) {
        ThisPage.getPanel('frmNewApp').prompt(
            {
                isNew: true,
                doc: { template: 'default' }
            }
        ).then(function (theSubmitted, theData) {
            if (!theSubmitted) {
                return;
            }

            ThisApp.common.apiCall({
                url: '/design/ws/new-app',
                data: theData
            }).then(function (theReply) {
                ThisPage.parts.west.parts.workspace.refreshFromURI();
                showAppConsole(theData);
            })
            console.log('theData', theData);
        })
    };


})(ActionAppCore, $);
