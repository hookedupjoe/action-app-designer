//=== Lifecycle events for this page
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
