/*
Author: Joseph Francis
License: LGPL
*/
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

    var thisPageSpecs = {
        pageName: "SetupPage",
        pageTitle: "Welcome",
        navOptions: {
            topLink: true,
            sideLink: true
        }
    };

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';

    
    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,        
        east:false,
        west: false,
        south: false,
        north: { partname: "north", control: "north" },
        center: { partname: "center", control: "center"}
    }


    //--- Customize default layout configuration
    //--- See http://layout.jquery-dev.com/documentation.cfm for details
    thisPageSpecs.layoutConfig = {
        west__size: "500"
        , east__size: "250"
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

        //--- This tells the page to layout the page, load templates and controls, et
        ThisPage.initOnFirstLoad().then(
            function () {
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

    //===== PAGE-ACTIONS-START-loadASpot
    actions.loadASpot = loadASpot;
    function loadASpot(){
        ThisPage.loadSpot("funspot", "We are having fun now")
    };
    //===== PAGE-ACTIONS-END-loadASpot

    //===== PAGE-ACTIONS-START
    actions.setupWS = setupWS;
    function setupWS(){
        var tmpDir = ThisPage.parts.center.getFieldValue('root');
        ThisApp.common.apiCall({
            url: '/design/setup/initial-setup?rootdir=' + tmpDir
        }).then(function(theReply){
            console.log( 'initial-setup Reply', theReply);
            alert("You Did it! Restart the server and reload this page.", "Setup Complete", "c").then(function(theReply){
                // ThisApp.apiCall({url:'/design/setup/restart-server'})
                // ThisApp.delay(8000).then(function(theReply){
                //     window.location = window.location;
                // })
                
            });
        })
    };
    //===== PAGE-ACTIONS-END

    
    //===== NO EDIT ABOVE THIS LINE ====== ====== ====== ====== ====== ====== ====== ====== 
    //===== CUSTOM-PAGE-CODE-START
    

    //===== CUSTOM-PAGE-CODE-END
})(ActionAppCore, $);
