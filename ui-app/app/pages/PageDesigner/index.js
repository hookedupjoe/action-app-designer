(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

//~thisPageSpecs//~

var thisPageSpecs = {
	"pageName": "PageDesigner",
	"pageTitle": "Page Designer",
	"navOptions": {
		"topLink": true,
		"sideLink": true
	}
}

//~thisPageSpecs~//~

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';

//~layoutOptions//~
    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        center: { partname: "center", control: "center"},
        east: false, //{ partname: "preview", panel: "previewPanel", source: "catalog/panels/common"},
        west: { partname: "controls", control: "ControlPanel"},
        north: { partname: "north", control: "north"},
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


//~YourPageCode~//~

})(ActionAppCore, $);
