/*
Author: Joseph Francis
License: MIT
*/
//---  MyCouchPage module --- --- --- --- --- --- --- --- --- --- --- --- 
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisPageSpecs = {
        pageName: "MyCouchPage",
        pageTitle: "My Couch",
        pageNamespace: 'mycouch',
        navOptions: {
            topLink: false,
            sideLink: true
        }
    };

    //--- Define page templates that should load when the page is activated
    thisPageSpecs.required = {
        templates: {
            baseURL: 'app/pages/MyCouchPage/tpl',
            map: {
                "database-info": thisPageSpecs.pageNamespace + ":database-info",
                "database-list": thisPageSpecs.pageNamespace + ":database-list"
            }
        }
    }

    //--- Define this applications layouts
    thisPageSpecs.layoutOptions = {
        baseURL: 'app/pages/MyCouchPage/',
        html: {
            "west": "page-west",
            "east": "page-east",
            "north": "page-header",
            "center": "page-body",
            "south": "page-footer"
        },
        spotPrefix: thisPageSpecs.pageNamespace,
        north: true,
        west: true,
        east: true
    }
//            "east": "page-east",

    //--- Customize default layout configuration
    //--- See http://layout.jquery-dev.com/documentation.cfm for details
    thisPageSpecs.layoutConfig = {
        east__size: "60%"
        ,   west__size: "10%"
        ,	west__togglerTip_open:		"Close West Pane"
		,	west__togglerTip_closed:		"Open West Pane"
		,	west__resizerTip_open:		"Resize West Pane"
		,	west__slideTrigger_open:		"click" 	// default
		,	west__initClosed:				true
    }

    //--- Start with a ase SitePage component
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    ThisPage._onInit = function (theApp) {
        ThisPage._om = theApp.om;
        ThisPage.dt = theApp.getComponent("plugin:DataTables");
    }

    ThisPage._onFirstActivate = function (theApp) {
        var tmpThis = this;


        ThisPage.initOnFirstLoad().then(
            function () {
                var me = ThisPage;
                setTimeout(function () {
                    ThisPage.loadDatabases();
                }, 100);
            }
        );

    }

    ThisPage.showWestSidebar = function(){
        ThisPage.layout.toggle('west');
    }


    ThisPage.databaseList = [];
    ThisPage.databaseIndex = {};
    ThisPage.loadDatabases = loadDatabases;    
    function loadDatabases() {
        refreshDatabaseList()
        
    }

    
    function refreshUI() {
          ThisPage.loadSpot('center', {items:ThisPage.databaseList}, ThisPage.ns('database-list'))
    }
    ThisPage.showLoading = showLoading;
    function showLoading() {
        ThisPage.loadSpot('center', '');
        ThisPage.loadSpot('center', '', 'app:page-loading-spinner');
    }

    ThisPage.refreshDatabaseList = refreshDatabaseList;
    function refreshDatabaseList() {
        ThisPage.showLoading();
        var tmpURL = "/app/action?name=get-databases";
        ThisApp.common.apiCall({
            timeout: 3000,
            url: tmpURL
        }).then(
            function (theResponse) {
                
                var tmpData = [];
                if (theResponse && theResponse.status && theResponse.results) {
                    tmpData = theResponse.results;
                }
               
                ThisPage.databaseIndex = {};
                ThisPage.databaseList = [];

                if( tmpData.dbDocs ){
                    for (var index = 0; index < tmpData.dbDocs.length; index++) {
                        var tmpDBDoc = tmpData.dbDocs[index];
                        if(tmpDBDoc && tmpDBDoc.name){
                            ThisPage.databaseIndex[tmpDBDoc.name] = tmpDBDoc;
                        }
                    }
                }
                

                if( tmpData.databases ){
                    
                    for (var index = 0; index < tmpData.databases.length; index++) {
                        var tmpDBName = tmpData.databases[index];
                        //--- If not an internal db starting with _
                        if( tmpDBName.indexOf('_') !== 0){
                            ThisPage.databaseList.push({
                                name: tmpDBName
                                ,title: "(Unknown)"
                            })
                        }
                    }
                }
               
                refreshUI()
            },
            function (theError) {
                var tmpMessage = "Error getting database list"
                if( theError && theError.status == 0){
                    tmpMessage = "Network error, assure app running."
                }
                ThisPage.loadSpot('center',  tmpMessage);
            }
        )
    }

    ThisPage.openThisDatabase = openThisDatabase;
    function openThisDatabase(theAction,theTarget) {
        var tmpName = $(theTarget).attr('name');
        var tmpURL = "/app/action?name=get-info-for-db&database=" + tmpName;
        ThisApp.common.apiCall({
            timeout: 3000,
            url: tmpURL
        }).then(
            function (theResponse) {
                
                var tmpData = [];
                if (theResponse && theResponse.status && theResponse.results) {
                    tmpData = theResponse.results;
                }
                tmpData.name = tmpName;

                if( tmpData && tmpData.design && tmpData.design.length == 0){
                    tmpData.design = false;
                }
                ThisPage.loadSpot('east', tmpData, ThisPage.ns('database-info'));
            },
            function (theError) {
                var tmpMessage = "Error getting database info"
                if( theError && theError.status == 0){
                    tmpMessage = "Network error, assure app running."
                }
                ThisPage.loadSpot('east',  tmpMessage);
            }
        )
        
    }


})(ActionAppCore, $);
