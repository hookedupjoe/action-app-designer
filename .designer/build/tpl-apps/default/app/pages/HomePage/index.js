/*
Author: Joseph Francis
License: MIT
*/

(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

    var thisPageSpecs = {
        pageName: "HomePage",
        pageTitle: "Home",
        navOptions: {
            icon: 'home',
            topLink: true,
            sideLink: true
        }
    };

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';

    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,

        east: {html: "page-east"},
        north: {html: "page-header"},
        center: {html: "page-body"},
        south: {html: "page-footer"},
        west: false
    }

    //--- Customize default layout configuration
    //--- See http://layout.jquery-dev.com/documentation.cfm for details
    thisPageSpecs.layoutConfig = {
        east__size: "48%"
    }


    //--- Start with a ase SitePage component
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    // .. they happen in this order

    //=== On Application Load ===
    /*
    * This happens when the page is loaded, try to push activity back to when the tab is used
    *    If your component need to do stuff to be availale in the background, do it here
    */
    ThisPage._onPreInit = function (theApp) {
        ThisPage.om = theApp.om;
        //console.log("Home Page: _onPreInit ");

    }
    ThisPage._onInit = function () {
        //console.log("Home Page: _onInit");
    }

    //=== On Page Activation ===
    /*
    * This happens the first time the page is activated and happens only one time
    *    Do the lazy loaded stuff in the initial activation, then do any checks needed when page is active
    *    Do stuff that needs to be available from this component, such as services, 
    *     that are needed even if the page was not activated yet
    */
    ThisPage._onFirstActivate = function (theApp) {


        ThisPage.initOnFirstLoad().then(
            function () {

                showContentInPreviewPane('about-action-app')

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

    //--- Layout related lifecycle hooks
    ThisPage._onResizeLayout = function () {
        //--- Do layout stuff

    }
    //--- End Layout related lifecycle hooks

   
    
    ThisPage.showBoxVideo = function (theVideoID, theTarget) {
        var tmpVideoID = theVideoID;
        if( theTarget ){
            tmpVideoID = $(theTarget).attr('video');
        }
        var tmpHTML = '<iframe src="https://ibm.ent.box.com/embed/s/' + tmpVideoID + '?sortColumn=date&view=list" width="100%" height="550" frameborder="0" allowfullscreen webkitallowfullscreen msallowfullscreen></iframe>';
        ThisApp.showCommonDialog({title:"Video", content: tmpHTML})
    }
     //--- End Layout related lifecycle hooks
     ThisPage.showDailyVideo = function (theVideoID, theTarget) {
        var tmpVideoID = theVideoID;
        if (theTarget) {
            tmpVideoID = $(theTarget).attr('video');
        }
        var tmpHTML = '<iframe frameborder="0" width="480" height="270" src="https://www.dailymotion.com/embed/video/' + tmpVideoID + '" allowfullscreen allow="autoplay"></iframe>';
        ThisApp.showCommonDialog({ title: "Video", content: tmpHTML })
    }



    ThisPage.gotoTab = function (theTabName) {
        ThisApp.gotoTab({ group: ThisPage.ns("tabs"), item: theTabName, animation: 'fade in', duration: 100 });
    }

    ThisPage.showDocs = showDocs;
    function showDocs(){
        ThisApp.gotoPage('DocsPage');
    };
    


    ThisPage.showGettingStarted = showGettingStarted;
    function showGettingStarted(){
        console.log( 'showGettingStarted');
        this.open();
        //--- In case this is the first open, set the main page load fisrt
        //* Shouldn't happen when HomePage is laoded first **
        setTimeout(function(){
            showContentInPreviewPane('quick-start-guide');
        }, 500)
        
        
    };
    
    

    ThisPage.previewContent = function (theAction, theTarget) {
        var tmpName = $(theTarget).attr('name');
        showContentInPreviewPane(tmpName)
    }

    function showContentInPreviewPane(theContentName) {
        var tmpName = theContentName || 'default-content';
        var tmpContenttEl = ThisPage.getByAttr$({ appuse: 'page-content', name: tmpName })
        if (tmpContenttEl && tmpContenttEl.length > 0) {
            ThisPage.loadPageSpot('preview-area', tmpContenttEl.html())
        }
    }

    
})(ActionAppCore, $);
