/*
Author: Joseph Francis
License: MIT
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
        north: { partname: "north", control: "north" },
        east: { html: 'east'},
        west: { partname: "west", control: "west" },
        center: { partname: "center", control: "center"  },
        south: false
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
    actions.loadASpot = loadASpot;
    function loadASpot(){
        var tmpHTML = [];
        tmpHTML.push('<div class="ui-layout-center">Center')
        tmpHTML.push('</div>')
        tmpHTML.push('<div class="ui-layout-north">North</div>')
        tmpHTML.push('<div class="ui-layout-south">South</div>')
        tmpHTML.push('<div class="ui-layout-east">East</div>')
        tmpHTML.push('<div class="ui-layout-west">West</div>')
        tmpHTML = tmpHTML.join('');

        ThisPage.loadSpot("body",tmpHTML);
        var tmpBodySpot =  ThisPage.getSpot("body");
        var tmpLayout = tmpBodySpot.layout();
        console.log( 'tmpLayout', tmpLayout);
        if (typeof (ThisApp.refreshLayouts) == 'function') {
            ThisApp.refreshLayouts();
        }
        console.log( 'tmpBodySpot', tmpBodySpot);

        
    };
    //===== PAGE-ACTIONS-END

    
    //===== NO EDIT ABOVE THIS LINE ====== ====== ====== ====== ====== ====== ====== ====== 
    //===== CUSTOM-PAGE-CODE-START
    

    //===== CUSTOM-PAGE-CODE-END
})(ActionAppCore, $);
