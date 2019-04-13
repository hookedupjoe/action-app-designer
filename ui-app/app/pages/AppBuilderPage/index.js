/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

    var thisPageSpecs = {
        pageName: "AppBuilderPage",
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

    //center:  { html: "layout-demo-1" },
    //center: { control: "center" },

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
                //ThisPage.loadPageSpot('header-area', 'Welcome');


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


        if (thePane == 'center') {


        } else if (thePane == 'east') {

        }
    }

    //=== Page Stuff

    actions.openInCode = openInCode;
    function openInCode(theParams, theTarget){
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname']);
        var tmpAppName = tmpParams.appname || ''
        if( !(tmpAppName) ){
            alert("No app to open");
            return;
        }
        ThisApp.apiCall({url: '/design/ws/launch-app?appname=' + tmpAppName})
    };
    
    
    actions.rebuildApp = rebuildApp;
    function rebuildApp(theParams, theTarget){
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname']);
        var tmpAppName = tmpParams.appname || ''
        if( !(tmpAppName) ){
            alert("No app to open");
            return;
        }
        ThisApp.apiCall({url: '/design/ws/build-app?appname=' + tmpAppName}).then(function(theReply){
            alert("Recreated " + tmpAppName, "Build Complete", "c");
        })
    };
    
   
    actions.promptAppSetup = promptAppSetup;
    function promptAppSetup(theParams, theTarget){
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname']);
        var tmpAppName = tmpParams.appname || '';

        var tmpApp = loadedApps[tmpAppName];
        console.log( 'tmpApp', tmpApp);
        tmpApp.promptForSetupInfo();
        tmpApp.setItemDisplay('edit-app-setup', false)
        tmpApp.setItemDisplay('save-app-setup', true)
        tmpApp.setItemDisplay('cancel-app-setup', true)
        
    };

    actions.cancelAppSetup = cancelAppSetup;
    function cancelAppSetup(theParams, theTarget){
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname']);
        var tmpAppName = tmpParams.appname || '';

        var tmpApp = loadedApps[tmpAppName];
        tmpApp.promptForSetupInfo();
        tmpApp.setItemDisplay('edit-app-setup', true)
        tmpApp.setItemDisplay('save-app-setup', false)
        tmpApp.setItemDisplay('cancel-app-setup', false)
        tmpApp.parts.setupinfo.refreshUI({readonly:true});
        
    };
    
    actions.saveAppSetup = saveAppSetup;
    function saveAppSetup(theParams, theTarget){
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname']);
        var tmpAppName = tmpParams.appname || tmpParams.name || '';

        var tmpApp = loadedApps[tmpAppName];
        tmpApp.setItemDisplay('edit-app-setup', true)
        tmpApp.setItemDisplay('save-app-setup', false)
        tmpApp.setItemDisplay('cancel-app-setup', false)

        var tmpData = tmpApp.getSetupInfo();
        
        updateAppSetup(tmpAppName,tmpData).then(function(theReply){
            if( theReply === true ){
                tmpApp.gotoItem("preview-link");
            } else {
                alert("Not Updated, there was a problem", "Did not save", "e")
            }
        })
        
    };
    

    function updateAppSetup(theAppName, theDetails){
        var dfd = jQuery.Deferred();
        
        
       try {
        var tmpAppName = theAppName;
        if( !(tmpAppName) ){
            throw("No app to open");
        }
        var tmpNewSetupInfo = theDetails;
        if( !(tmpNewSetupInfo) ){
            throw("No details to process");
        }

        console.log( 'tmpNewSetupInfo', tmpNewSetupInfo);

        var tmpApp = loadedApps[tmpAppName];
            
        ThisApp.apiCall({
            url: '/design/ws/update-app-setup',
            data: (tmpNewSetupInfo)
        }).then(function(theReply){
            tmpApp.refreshSetupInfo();
            tmpApp.parts.setupinfo.refreshUI({readonly:true});
            refreshWorkspace();
            dfd.resolve(true)
        })
       } catch (ex) {
           console.error("Calling app setup update",ex)
           dfd.resolve(false);
       }
        
        
        return dfd.promise();
    };
    

    actions.refreshWorkspace = refreshWorkspace;
    function refreshWorkspace(){
        ThisPage.parts.west.parts.workspace.refreshFromURI();
    };
    
    actions.createAppDeployment = createAppDeployment;
    function createAppDeployment(theParams, theTarget){
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname']);
        var tmpAppName = tmpParams.appname || tmpParams.name || '';
        var tmpURL = '/design/ws/deploy-app?appname=' + tmpAppName
        ThisApp.apiCall({url: tmpURL}).then(function(theReply){
            var tmpPath = theReply.path || '';
            console.log( 'tmpPath theReply', tmpPath, theReply);
            ThisApp.confirm("Done, open in VS code now?", "Deployment Created").then(function(theIsYes){
                if (!theIsYes){
                    return;
                }
                vscodeDeployment({appname: tmpAppName})
            })
        })
    };
    
    actions.vscodeDeployment = vscodeDeployment;
    function vscodeDeployment(theParams, theTarget){
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname']);
        var tmpAppName = tmpParams.appname || tmpParams.name || '';
        var tmpURL = '/design/ws/launch-app-deploy?appname=' + tmpAppName
        ThisApp.apiCall({url: tmpURL}).then(function(theReply){
            
        })
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
            })
            console.log('theData', theData);
        })
    };


})(ActionAppCore, $);
