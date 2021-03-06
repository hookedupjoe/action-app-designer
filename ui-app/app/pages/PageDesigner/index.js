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
        east: { partname: "preview", panel: "previewPanel", source: "catalog/panels/common"},
        west: { partname: "controls", control: "ControlPanel"},
        north: { partname: "north", control: "north"},
        south: { partname: "statusBar", control: "StatusBar", source: "catalog/controls/common"}
        
    }
//~layoutOptions~//~

//~layoutConfig//~
    thisPageSpecs.layoutConfig = {
        west__size: "500"
        , east__size: "250"
    }
//~layoutConfig~//~


    //~required//~
    thisPageSpecs.required = {
        // controls: {
        //     map: {
        //         "app/catalog/designer/controls/page-console": "pageConsole"
        //     }
        // },
        panels: {
            map: {
                "design/ws/frmNewPage": "frmNewPage"
            }
        }
    }
    //~required~//~

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
            //~_onFirstLoad//~

            //~_onFirstLoad~//~
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






actions.addPage = addPage;
function addPage(theParams, theTarget) {
    ThisPage.getPanel('frmNewPage').prompt(
        {
            isNew: true,
            doc: { template: 'DefaultPage' }
        }
    ).then(function (theSubmitted, theData) {
        if (!theSubmitted) {
            return;
        }

        console.log( 'addPage Data', theData);
        // ThisApp.common.apiCall({
        //     url: '/design/ws/new-page?run&target=workspace',
        //     data: theData
        // }).then(function (theReply) {
        //     refreshWorkspace();
        //     showAppConsole(theData);
        // })
        //console.log('theData', theData);
    })
};

//~YourPageCode~//~

})(ActionAppCore, $);
