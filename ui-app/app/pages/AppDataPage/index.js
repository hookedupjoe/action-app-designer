(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

    //~thisPageSpecs//~

var thisPageSpecs = {
	"pageName": "AppDataPage",
	"pageTitle": "Data",
	"navOptions": {
		"topLink": true,
		"sideLink": false
	}
}

//~thisPageSpecs~//~

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';

    //~layoutOptions//~
    thisPageSpecs.layoutOptions =  {
        baseURL: pageBaseURL,
        north: {
          source: '_designer',
          control: "MainHeader",
          name :'header'
        },
        east: false,
        west: false,
        waswest: {
          source: '_designer',
          control: "TabsContainer",
          name :'nav'
        },
        center: {
          source: '_data',
          control: "MongoDashboard",
          name :'body'
        },
        south: {
          source: '_designer',
          control: "MainStatusBar",
          name :'statusbar'
        }
      }
    //~layoutOptions~//~

    //~layoutConfig//~
    thisPageSpecs.layoutConfig = {
        west__size: "300"
        , east__size: "250"
    }

    //~layoutConfig~//~
    //~required//~

    // thisPageSpecs.required = {
    //     controls: {
    //         baseURL: pageBaseURL + 'controls/',
    //         map: {}
    //     }
    // }

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

    var loadedTabs = {};
    
    var demoImportData = {
        "data": [
           
        ]
    }
    
   

    var selectionListIndex = {};

    ThisPage._onFirstActivate = function (theApp) {
        //~_onFirstActivate//~

        //~_onFirstActivate~//~
        ThisPage.initOnFirstLoad().then(
            function () {
                //~_onFirstLoad//~
        window.tmpDataPage = ThisPage;
        //ThisPage.demoImport = demoImport;

        ThisPage.loadedTabs = loadedTabs;       
        //quick access
        ThisPage.ctlHeader = ThisPage.parts.header;
        ThisPage.ctlBody = ThisPage.parts.body;
        ThisPage.ctlNav = ThisPage.parts.nav;
        ThisPage.ctlStatusbar = ThisPage.parts.statusbar;

        ThisPage.ctlHeader.setHeader('Mongo Data Manager');
        // ThisPage.ctlNav.addTab({item:'welcome',text: 'Welcome', icon: 'icon road blue', content:'getting started stuff here'});
        // ThisPage.ctlNav.gotoTab('welcome');

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


    //~YourPageCode~//~

})(ActionAppCore, $);
