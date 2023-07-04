/*
Author: Joseph Francis
License: LGPL
*/

(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    
    var thisPageSpecs = {
        pageName:"DebugPage",
        pageTitle: "Debug", 
        navOptions:{
            topLink:false,
            sideLink:true
        }
    };

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';

    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
    
        east: false,
        north: {html: "page-header"},
        center: {html: "page-body"},
        west: false,
        south: {html: "page-footer"}
    }

    //--- Start with a ase SitePage component
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    //=== On Application Load ===
    /*
    * This happens when the page is loaded, try to push activity back to when the tab is used
    *    If your component need to do stuff to be availale in the background, do it here
    */
    ThisPage._onPreInit = function(theApp){
        ThisPage.om = theApp.om;
        //console.log("Log Page: _onPreInit ");
    }
    ThisPage._onInit = function() {
        //console.log("Log Page: _onInit");
    }

    //=== On Page Activation ===
    /*
    * This happens the first time the page is activated and happens only one time
    *    Do the lazy loaded stuff in the initial activation, then do any checks needed when page is active
    *    Do stuff that needs to be available from this component, such as services, 
    *     that are needed even if the page was not activated yet
    */
    ThisPage._onFirstActivate = function(){
        //console.log("Log Page: _onFirstActivate");
        ThisPage.initOnFirstLoad().then(
            function(){
                ThisPage._onActivate();
            }
        );        
    }
    
    ThisPage._onActivate = function(){

    }
    //--- End lifecycle hooks
    
        
})(ActionAppCore, $);
