(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

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

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';

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

    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    var actions = ThisPage.pageActions;

    ThisPage._onPreInit = function (theApp) {
        //[PART[_onPreInit]]

        //[PART[_onPreInit]END]
    }

    ThisPage._onInit = function () {
    //[PART[_onInit]]

    //[PART[_onInit]END]
}


    ThisPage._onFirstActivate = function (theApp) {
        //[PART[_onFirstActivate]]

        //[PART[_onFirstActivate]END]
        ThisPage.initOnFirstLoad().then(
            function () {
                //[PART[initOnFirstLoad]]

                //[PART[initOnFirstLoad]END]
                ThisPage._onActivate();
            }
        );
    }


    ThisPage._onActivate = function () {
    //[PART[_onActivate]]

    //[PART[_onActivate]END]
    }

    ThisPage._onResizeLayout = function (thePane, theElement, theState, theOptions, theName) {
    //[PART[_onResizeLayout]]

    //[PART[_onResizeLayout]END]
    }

    //------- --------  --------  --------  --------  --------  --------  -------- 
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
    
})(ActionAppCore, $);
