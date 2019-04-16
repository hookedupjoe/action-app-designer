/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

    var thisPageSpecs = {
        pageName: "PageEditorPage",
        pageTitle: "Page Editor",
        navOptions: {
            topLink: true,
            sideLink: true
        }
    };

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';


    thisPageSpecs.required = {
        controls: {
            map: {
                "app/catalog/designer/controls/page-editor": "pageEditor"
            }
        },
        panels: {
            map: {
                "design/ws/frmNewPage": "frmNewPage"
            }
        }
    }

    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        north: false,
        east: false,
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

    //=== On Page Load ===
    /*
    * This happens when the page is loaded, try to push activity back to when the tab is used
    *    If your component need to do stuff to be availale in the background, do it here
    */
    var actions = ThisPage.pageActions;
    var openPageGroupName = 'page-editor-outline';
    var loadedPages = {};
    window.loadedPages = loadedPages;
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

   
    
    actions.showPageConsole = showPageConsole;
    function showPageConsole(theParams, theTarget) {
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname', 'apptitle', 'name','title']);
        var tmpPageName = tmpParams.appname  || tmpParams.name || '';
        if (!(tmpPageName)) {
            alert("No app name provided to open");
            return;
        }
        var tmpPageTitle = tmpParams.apptitle || tmpParams.title || '';

        if (loadedPages[tmpPageName]) {
            var tmpTabAttr = { group: openPageGroupName, item: tmpPageName };
            ThisApp.gotoTab(tmpTabAttr);
        } else {
            var tmpNewPage = ThisPage.getControl('pageEditor').create('app-' + tmpPageName);
            tmpNewPage.setup({ pagename: tmpPageName, title: tmpPageTitle });
            tmpNewPage.subscribe('update-app-setup', function(){
                refreshWorkspace()
            })
            loadedPages[tmpPageName] = tmpNewPage;

            //--- For Debugging
            window[tmpPageName] = tmpNewPage;

            //--- Create a new card for this app
            ThisPage.addToSpot('body', '<div appuse="cards" group="' + openPageGroupName + '" item="' + tmpPageName + '">TESTING</div>');
            var tmpTabAttr = { group: openPageGroupName, item: tmpPageName };
            //--- Find created cards jQuery element
            var tmpNewGroup = ThisPage.getByAttr$({ group: openPageGroupName, item: tmpPageName, appuse: 'cards' });
            //--- Load Page Console into that card
            tmpNewPage.loadToElement(tmpNewGroup);
            //--- Go to the newly added card (to show it and hide others)
            ThisApp.gotoTab(tmpTabAttr);
        }
    };

    actions.refreshPages = refreshPages;
    function refreshPages(){
        ThisPage.parts.west.parts.pages.refreshFromURI()
    };
    

    actions.addPage = addPage;
    function addPage(theParams, theTarget) {
        ThisPage.getPanel('frmNewPage').prompt(
            {
                isNew: true,
                doc: { template: 'default' }
            }
        ).then(function (theSubmitted, theData) {
            if (!theSubmitted) {
                return;
            }

            // ThisApp.common.apiCall({
            //     url: '/design/ws/new-page?run&target=workspace',
            //     data: theData
            // }).then(function (theReply) {
            //     refreshWorkspace();
            //     showAppConsole(theData);
            // })
            console.log('theData', theData);
        })
    };


})(ActionAppCore, $);
