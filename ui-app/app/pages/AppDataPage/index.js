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
        west: {
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

    // actions.openAccount = openAccount;
    // function openAccount(theParams, theTarget){
    //     var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['accountid']);
    //     console.log('openAccount',tmpParams);   
    // }

    ThisPage._onPreInit = function (theApp) {
        //~_onPreInit//~

        //~_onPreInit~//~
    }

    ThisPage.refreshDataViewSource = function(){
        return;
        if( !(ActionAppCore.ActAppData.rootPath)){
            return;
        }
        var tmpDataViewsURL = ActionAppCore.ActAppData.rootPath + '/wp-json/actappdesigner/alldocs?fields=(export)&doctype=&dataview=dataviews';
        ThisApp.apiCall(tmpDataViewsURL).then(function(theReply){
            if( theReply && theReply.data && theReply.data.length ){
                var tmpSources = [];
                for( var iPos in theReply.data ){
                    var tmpDoc = theReply.data[iPos];
                    tmpSources.push(tmpDoc.title + '|' + tmpDoc.name);
                }
                ActionAppCore.addSources({ActAppDataViews: tmpSources});
            };
            ThisApp.publish('Data:ActAppDataViewsUpdated')
        });
    }

    ThisPage._onInit = function () {
        //~_onInit//~

        var tmpSnippetManager = ace.require("ace/snippets").snippetManager;
        tmpSnippetManager.register( tmpSnippetManager.parseSnippetFile("snippet _log\n\tconsole.log( \'$1\', $2);\n"), "javascript");
        tmpSnippetManager.register( tmpSnippetManager.parseSnippetFile("snippet _fnandreply\n\tfunction(theReply){console.log(theReply)}\n"), "javascript");
        tmpSnippetManager.register( tmpSnippetManager.parseSnippetFile("snippet _fnandargs\n\tfunction(){console.log(arguments)}\n"), "javascript");
        tmpSnippetManager.register( tmpSnippetManager.parseSnippetFile("snippet _apiandreply\n\tThisApp.apiCall('$1').then(function(theReply){console.log(theReply)})\n"), "javascript");
        //console.log("Added some demo snippets. ToDo: Snippet Management");

        this.refreshDataViewSource();
        //~_onInit~//~
    }

    var loadedTabs = {};
    
    var demoImportData = {
        "data": [
           
        ]
    }
    
    // function demoImport(){
    //     var tmpData = demoImportData;
    //     var tmpURL = ActionAppCore.ActAppData.rootPath + '/wp-json/actappdesigner/import-docs';
    //     ThisApp.apiCall({url:tmpURL,data:tmpData}).then(
    //         function(theReply){
    //             console.log('demoImport Reply',theReply);
    //         }
    //     );
    // }

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

        ThisPage.ctlHeader.setHeader('Data Manager');
        ThisPage.ctlNav.addTab({item:'welcome',text: 'Welcome', icon: 'icon road blue', content:'getting started stuff here'});
        ThisPage.ctlNav.gotoTab('welcome');

            //~_onFirstLoad~//~
                ThisPage._onActivate();
            }
        );
    }
    
    actions.closeTab = function(theParams, theTarget){
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['tab']);
        var tmpTabName = tmpParams.tab;
        if( !(tmpTabName) ){
            alert('Could not close tab, no tab name provided');
        }
        if( loadedTabs[tmpTabName] ){
            var tmpToRemove = loadedTabs[tmpTabName];
            if( tmpToRemove && tmpToRemove._subid ){
                tmpToRemove.unsubscribe('',tmpToRemove._subid);
            }
            if( tmpToRemove && tmpToRemove.destroy ){
                tmpToRemove.destroy();
            }
            delete loadedTabs[tmpTabName];
        }
        ThisPage.ctlBody.closeTab(tmpTabName);
    }

    
    // actions.showDataViewDefs = function(theParams, theTarget){
    //     //var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['aaa','bbb']);
    //     var tmpTabKey = 'tab-showDataViewDefs';
    //     var tmpTabTitle = 'Data Views';
    //     if( loadedTabs[tmpTabKey] ){
    //         ThisPage.ctlBody.gotoTab(tmpTabKey);
    //     } else {
    //         var tmpCloseMe = '<i style="margin-right:-5px;margin-left:10px;" tab="' + tmpTabKey + '" pageaction="closeTab" class="icon close grey inverted"></i>';
    //         ThisApp.getResourceFromSource('control','DataViewDefinitions','_designer','DataViewDefinitions').then(function(theLoadedControl){
    //             var tmpNewTabControl = theLoadedControl.create(tmpTabKey);
    //             //var tmpNewTabControl = ThisPage.getControl('DataViewDefinitions').create(tmpTabKey);

    //             ThisPage.ctlBody.addTab({item:tmpTabKey,text: tmpTabTitle + tmpCloseMe, icon: 'table', content:''})
    //             var tmpNewSpot = ThisPage.ctlBody.getTabSpot(tmpTabKey);
    //             tmpNewTabControl.loadToElement(tmpNewSpot).then(function () {
    //                 loadedTabs[tmpTabKey] = tmpNewTabControl;
    //                 //--- Go to the newly added card (to show it and hide others)
    //                 if( tmpNewTabControl.setup ){
    //                     tmpNewTabControl.setup(tmpParams);
    //                 }
    //                 ThisApp.delay(1).then(function(){
    //                     ThisPage.ctlBody.gotoTab(tmpTabKey);
    //                 })
                    
    //             });
    //         });
            

    //     }
    // }

    // actions.selectListItem = function(theParams, theTarget){
    //     var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['itemname','itemtitle','dataview','viewname']);
        
    //     var tmpTabKey = 'tab-' + tmpParams.itemname;
    //     var tmpTabTitle = tmpParams.itemtitle || tmpParams.itemname;
    //     if( loadedTabs[tmpTabKey] ){
    //         ThisPage.ctlBody.gotoTab(tmpTabKey);
    //     } else {
    //         var tmpCloseMe = '<i style="margin-right:-5px;margin-left:10px;" tab="' + tmpTabKey + '" pageaction="closeTab" class="icon close grey inverted"></i>';

    //         var tmpSetupDetails = selectionListIndex[tmpParams.itemname] || tmpParams;
    //         var tmpControlName = tmpSetupDetails.controlname || 'PostsView';
    //         var tmpControlSource = tmpSetupDetails.catalog || '_designer';
    //         tmpSetupDetails.controlname = tmpControlName;
    //         tmpSetupDetails.catalog = tmpControlSource;
    //         //--- Use values from params instead of selectionListIndex entry
    //         //     this allows anything to open, not just what is in the list
    //         if( tmpParams.dataview ){
    //             tmpSetupDetails.isDataView = true;
    //         }
    //         if( tmpParams.viewname ){
    //             tmpSetupDetails.viewname = tmpParams.viewname;
    //         }
            
    //         ThisApp.getResourceFromSource('control',tmpControlName,tmpControlSource,tmpControlName).then(function(theLoadedControl){
    //             var tmpNewTabControl = theLoadedControl.create(tmpTabKey);
    //             ThisPage.ctlBody.addTab({item:tmpTabKey,text: tmpTabTitle + tmpCloseMe, icon: 'table', content:''})
    //             var tmpNewSpot = ThisPage.ctlBody.getTabSpot(tmpTabKey);
    //             tmpNewTabControl.loadToElement(tmpNewSpot).then(function () {
    //                 loadedTabs[tmpTabKey] = tmpNewTabControl;
    //                 //--- Go to the newly added card (to show it and hide others)
    //                 if( tmpNewTabControl.setup ){
    //                     tmpNewTabControl.setup(tmpSetupDetails);
    //                 }
    //                 if( tmpControlName ){
    //                     var tmpSubID = tmpNewTabControl.subscribe('urlOpenRequest', onURLOpenRequest.bind(this))
    //                     tmpNewTabControl._subid = tmpSubID;
    //                 }
    //                 ThisApp.delay(1).then(function(){
    //                     ThisPage.ctlBody.gotoTab(tmpTabKey);
    //                 })
                    
    //             });
    //         })
            

    //     }

        
        

    // }
    //ThisApp.actions.selectListItem = actions.selectListItem;

//     function onURLOpenRequest(theEvent, theControl, theURL){
//         window.open(theURL);
// //--- ToDo: Enable and make this like others with close request, etc
//         //tmpDataPage.parts.body.addTab({item:'temp1',text: "Viewer", icon: 'eye', content:''})
//         //tmpDataPage.parts.body.loadTabSpot('temp1','<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class="embed-container"><iframe src="' + theURL + '" style="border:0"></iframe></div>')
//     }

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
