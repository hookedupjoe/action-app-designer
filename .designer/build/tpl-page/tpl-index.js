(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

    //~thisPageSpecs//~
    var thisPageSpecs = {
        pageName: "NewTestPage",
        pageTitle: "Testing",
        navOptions: {
            topLink: true,
            sideLink: true
        }
    };
    //~thisPageSpecs~//~

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';

    //~layoutOptions//~
    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        north: { partname: "north", control: "north" },
        east: { html: 'east' },
        west: { partname: "west", control: "west" },
        center: { partname: "center", control: "center" },
        south: false
    }
    //~layoutOptions~//~

    //~layoutConfig//~
    thisPageSpecs.layoutConfig = {
        west__size: "500"
        , east__size: "250"
    }
    //~layoutConfig~//~

    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    var actions = ThisPage.pageActions;

    ThisPage._onPreInit = function (theApp) {
        //~_onPreInit//~

        //~_onPreInit~//~
    }

    ThisPage._onInit = function () {
        //~_onInit//~

        //~_onInit~//~
    }


    ThisPage._onFirstActivate = function (theApp) {
        //~_onFirstActivate//~

        //~_onFirstActivate~//~
        ThisPage.initOnFirstLoad().then(
            function () {
                //~initOnFirstLoad//~

                //~initOnFirstLoad~//~
                ThisPage._onActivate();
            }
        );
    }


    ThisPage._onActivate = function () {
        //~_onActivate//~

        //~_onActivate~//~
    }

    ThisPage._onResizeLayout = function (thePane, theElement, theState, theOptions, theName) {
        //~_onResizeLayout//~

        //~_onResizeLayout~//~
    }

    //------- --------  --------  --------  --------  --------  --------  -------- 
    //~YourPageCode//~


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
    //~YourPageCode~//~

})(ActionAppCore, $);
