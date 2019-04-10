//[PART[Bubble-start]]
(function (ActionAppCore, $) {

    //[PART[Bubble-start]END]
    //[PART[SiteMod]]
    var SiteMod = ActionAppCore.module("site");

    //[PART[SiteMod]END]
    //[PART[thisPageSpecs]]
    var thisPageSpecs = {
        pageName: "NewTestPage",
        pageTitle: "Testing",
        navOptions: {
            topLink: true,
            sideLink: true
        }
    };

    //[PART[thisPageSpecs]END]
    //[PART[pageBaseURL]]
    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';

    //[PART[pageBaseURL]END]
    //[PART[layoutOptions]]
    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        north: { partname: "north", control: "north" },
        east: { html: 'east' },
        west: { partname: "west", control: "west" },
        center: { partname: "center", control: "center" },
        south: false
    }
    //[PART[layoutOptions]END]

    //[PART[layoutConfig]]
    thisPageSpecs.layoutConfig = {
        west__size: "500"
        , east__size: "250"
    }
    //[PART[layoutConfig]END]

    //[PART[ThisPage]]
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);


    //[PART[ThisPage]END]
    //[PART[CONFIGONLY]]
    //=======   CONFIG ONLY - DO NOT UPDATE ABOVE THIS LINE
    //=== === === === === === === === === === === === === === === === === === === === === === 


    //[PART[CONFIGONLY]END]
    //[PART[actions]]
    var actions = ThisPage.pageActions;
    //[PART[actions]END]

    //[PART[_onPreInit]]
    ThisPage._onPreInit = function (theApp) {
        ThisPage._om = theApp.om;

    }
    //[PART[_onPreInit]END]

    //[PART[_onInit]]
    ThisPage._onInit = function () {

    }

    //[PART[_onInit]END]
    //[PART[_onFirstActivate-start]]
    ThisPage._onFirstActivate = function (theApp) {

        //[PART[_onFirstActivate-start]END]
        //[PART[initOnFirstLoad]]
        ThisPage.initOnFirstLoad().then(
            //[PART[initOnFirstLoad]END]    
            //[PART[_onFirstActivate-start]]
            ThisPage._onFirstActivate = function (theApp) {
                //[PART[_onFirstActivate-start]END]
                //[PART[YourOnInitCode]]                
                //---- YOUR ON PAGE READY THE FIRST TIME CODE HERE
                //[PART[YourOnInitCode]END]                
                //[PART[_onActivate]]
                ThisPage._onActivate();
                //[PART[_onActivate]END]                
                //[PART[_onFirstActivate-end]]
            }
            //[PART[_onFirstActivate-end]END]
        );
        //[PART[_onFirstActivate-end]]
    }
    //[PART[_onFirstActivate-end]END]

    //[PART[_onActivate]]
    ThisPage._onActivate = function () {
        //-- Do refresh / checks here to update when page is activated

    }
    //[PART[_onActivate]END]

    //[PART[_onResizeLayout]]
    ThisPage._onResizeLayout = function (thePane, theElement, theState, theOptions, theName) {

    }

    //------- --------  --------  --------  --------  --------  --------  -------- 
    //[PART[_onResizeLayout]END]
    //[PART[YourPageCode]]


    actions.loadASpot = loadASpot;
    function loadASpot() {
        ThisPage.loadSpot("funspot", "We are having fun now")
    };

    actions.loadASpot = loadASpot;
    function loadASpot() {
        var tmpHTML = [];
        tmpHTML.push('<div class="ui-layout-center">Center')
        tmpHTML.push('</div>')
        tmpHTML.push('<div class="ui-layout-north">North</div>')
        tmpHTML.push('<div class="ui-layout-south">South</div>')
        tmpHTML.push('<div class="ui-layout-east">East</div>')
        tmpHTML.push('<div class="ui-layout-west">West</div>')
        tmpHTML = tmpHTML.join('');

        ThisPage.loadSpot("body", tmpHTML);
        var tmpBodySpot = ThisPage.getSpot("body");
        var tmpLayout = tmpBodySpot.layout();
        console.log('tmpLayout', tmpLayout);
        if (typeof (ThisApp.refreshLayouts) == 'function') {
            ThisApp.refreshLayouts();
        }
        console.log('tmpBodySpot', tmpBodySpot);


    };
    //[PART[YourPageCode]END]
//[PART[Bubble-end]]    
})(ActionAppCore, $);
//[PART[Bubble-end]END]