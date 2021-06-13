/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

    var thisPageSpecs = {
        pageName: "WorkspacePage",
        pageTitle: "Workspace",
        navOptions: {
            topLink: true,
            sideLink: true
        }
    };

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';

    thisPageSpecs.required = {
        controls: {
            map: {
                "app/catalog/designer/controls/catalog-console": "panelCatConsole",
                "app/catalog/designer/controls/app-console": "panelAppConsole",
                "app/catalog/designer/controls/resource-console": "resourceConsole",
                "app/catalog/designer/controls/page-console": "pageConsole"
            }
        },
        panels: {
            map: {
                "app/catalog/designer/panels/frmNewCatalog": "frmNewCatalog",
                "app/catalog/designer/panels/frmNewApp": "frmNewApp",
                "app/catalog/designer/panels/frmNewPage": "frmNewPage"
            }
        }
    }
    //DEVELOPER NOTE: Can use the following for backend versions that can include backend created details
    /*
                "design/ws/frmNewApp": "frmNewApp",
                "design/ws/frmNewPage": "frmNewPage"
    */

    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        north: false,
        east: false,
        west: false,
        waswest: { partname: "west", control: "west" },
        center: { partname: "center", control: "center" },
        south: false
    }
    //

    //--- Customize default layout configuration
    //--- See http://layout.jquery-dev.com/documentation.cfm for details
    thisPageSpecs.layoutConfig = {
        west__size: "300"
        , east__size: "200"
    }

    //--- Start with a ase SitePage component
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    // .. they happen in this order

    //=== On Application Load ===
    /*
    * This happens when the page is loaded, try to push activity back to when the tab is used
    *    If your component need to do stuff to be availale in the background, do it here
    */
    var actions = ThisPage.pageActions;
    var wsOutlineName = 'workspace-outline';
    var loadedCats = {};
    var loadedApps = {};
    var loadedPages = {};
    var loadedResources = {};
    // var loadedOutline = {};

    //--- for debug
    window.loadedApps = loadedApps;
    window.loadedPages = loadedPages;
    window.loadedResources = loadedResources;

    var appSetupConfig = false;

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
        // wsOutlineName = ThisPage.ns(wsOutlineName);
        //--- This tells the page to layout the page, load templates and controls, et
        ThisPage.loadWorkspaceState();
        window.onbeforeunload = function () {
            return 'Are you sure you want to leave?';
        };

        $(document).bind('keydown', function (e) {
            if (e.altKey && (e.which == 70)) {
                e.preventDefault();
                return false;
            } else if (e.ctrlKey && (e.which == 83 || e.which == 80)) {
                e.preventDefault();
                if (e.which == 83) {
                    ThisApp.publish('saveRequested'); //ctrl+s
                } else {
                    ThisApp.publish('previewRequested'); //ctrl+p
                }
                return false;
            }
        });

        ThisPage.initOnFirstLoad().then(
            function () {
                //--- For debugging
                window.wsPage = ThisPage;

                ThisPage.subscribe('selectMe', ThisPage.pageTabSelected)

                //--- Now your done - READY to do stuff the first time on your page

                //--- Subscirbe to when item selected in workspace
                //ThisPage.parts.west.subscribe('selected', wsItemSelected);
                ThisPage.parts.center.subscribe('selected', wsItemSelected);

                //ThisPage.layout.toggle("west");
                ThisPage.refreshWSNav();
                
                //--- Do special stuff on page load here
                //--- Then optionally call the stuff that will happen every time 
                //      the page is activated if not already called by above code
                ThisPage._onActivate();

                

                //Todo: Change to when west publishes loaded
                ThisApp.delay(1000).then(function(){
                    //ThisPage.closeSiteMap();

                var tmpOutlineEl = ThisApp.getByAttr$({action: "outlineDisplay",type: "workspace"});
                if( tmpOutlineEl && tmpOutlineEl.length > 0){
                  ThisApp.outlineDisplay(false,tmpOutlineEl.get(0));  
                  if( tmpOutlineEl.length > 1){
                    ThisApp.outlineDisplay(false,tmpOutlineEl.get(1));  
                  }
                  ThisApp.delay(100).then(function(){
                    var tmpOutlineEl = ThisApp.getByAttr$({action: "toggleMe",type: "apps"});
                    if( tmpOutlineEl && tmpOutlineEl.length > 0){
                        ThisApp.toggleMe(false,tmpOutlineEl.get(0));  
                        if( tmpOutlineEl.length > 1){
                          ThisApp.toggleMe(false,tmpOutlineEl.get(1));  
                        }                        
                      }
                  })
                }

                })
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

    //=== Page Stuff

    ThisPage.closeSiteMap = closeSiteMap;
    function closeSiteMap(theParams, theTarget) {
        // var tmpNav = ThisPage.parts.west;
        // var tmpWSEl = tmpNav.getItemEl('workspace');
        // ThisPage.navHead = ThisPage.navHead || tmpWSEl.find('[action="outlineDisplay"][select="false"]');
        // if (ThisPage.navHead) {
        //     ThisPage.navHead.trigger('click');
        // }
    };

    var dsNameWorkspaceState = 'ws-page-state';

    ThisPage.loadWorkspaceState = loadWorkspaceState;
    function loadWorkspaceState() {
        var dfd = jQuery.Deferred();


        ThisPage.contextData.jsonClipboardIndex = {};

        ThisApp.om.getObject(dsNameWorkspaceState, 'ws-state').then(function (theReply) {
            //ToDo: Use State
            dfd.resolve(true)
        });


        return dfd.promise();
    }

    ThisPage.saveWorkspaceState = saveWorkspaceState;
    function saveWorkspaceState() {
        ThisPage.fullOpenIndex = {
            test: true
        };
        /*
        loadedApps: ThisApp.json(ThisApp.json(loadedApps,true),true),
            loadedPages: ThisApp.json(ThisApp.json(loadedPages,true),true), 
            loadedResources: ThisApp.json(ThisApp.json(loadedResources,true),true)
        */
        var tmpStateName = 'ws-state';

        ThisApp.om.putObject(dsNameWorkspaceState, tmpStateName, ThisPage.fullOpenIndex).then(function (theReply) {
            //--- saved
        })

    }


    actions.refreshWorkspace = refreshWorkspace;
    function refreshWorkspace() {
        //--- No longer using west panel
        //ThisPage.parts.west.parts.workspace.refreshFromURI();
        ThisPage.parts.center.parts.workspace.refreshFromURI();
        //ThisPage.refreshNavTabs();
    };

    

    actions.showCatalogConsole = showCatalogConsole;
    function showCatalogConsole(theParams, theTarget) {

        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['catname', 'cattitle', 'name', 'title']);
        var tmpCatName = tmpParams.catname || tmpParams.name || '';
        if (!(tmpCatName)) {
            alert("No category name provided to open");
            return;
        }
        var tmpCatTitle = tmpParams.cattitle || tmpParams.title || tmpCatName;

        if (loadedCats[tmpCatName]) {
            var tmpTabAttr = { group: wsOutlineName, item: tmpCatName };
            loadedCats[tmpCatName].refreshOnActivate();
            ThisApp.delay(1).then(function(){
                ThisApp.gotoTab(tmpTabAttr);
            })
        } else {
            var tmpNewCat = ThisPage.getControl('panelCatConsole').create('cat-' + tmpCatName);
            tmpNewCat.subscribe('selected', wsItemSelected);

            
            tmpNewCat.subscribe('update-cat-setup', function () {
                refreshWorkspace()
            })
            loadedCats[tmpCatName] = tmpNewCat;
            //--- For Debugging
            window[tmpCatName] = tmpNewCat;

            //--- Create a new card for this app
            ThisPage.addToSpot('ws-work-area', '<div appuse="cards" group="' + wsOutlineName + '" item="' + tmpCatName + '"></div>');
            var tmpTabAttr = { group: wsOutlineName, item: tmpCatName };
            //--- Find created cards jQuery element
            var tmpNewGroup = ThisPage.getByAttr$({ group: wsOutlineName, item: tmpCatName, appuse: 'cards' });

            var tmpSetupDetails = { catname: tmpCatName, title: tmpCatTitle };

            tmpNewCat.preLoad(tmpSetupDetails);
            //--- Load App Console into that card
            
            window.tmpNewGroup = tmpNewGroup;
            tmpNewCat.loadToElement(tmpNewGroup).then(function (theReply) {
                //--- Go to the newly added card (to show it and hide others)
                
                tmpNewCat.setup(tmpSetupDetails);
                //ThisPage.saveWorkspaceState();
                ThisApp.delay(1).then(function(){
                    ThisApp.gotoTab(tmpTabAttr);
                })
                
            });
        }
    };


    actions.showAppConsole = showAppConsole;
    function showAppConsole(theParams, theTarget) {

        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname', 'apptitle', 'name', 'title']);
        var tmpAppName = tmpParams.appname || tmpParams.name || '';
        if (!(tmpAppName)) {
            alert("No app name provided to open");
            return;
        }
        var tmpAppTitle = tmpParams.apptitle || tmpParams.title || tmpAppName;

        if (loadedApps[tmpAppName]) {
            var tmpTabAttr = { group: wsOutlineName, item: tmpAppName };
            loadedApps[tmpAppName].refreshOnActivate();
            ThisApp.gotoTab(tmpTabAttr);
        } else {
            var tmpNewApp = ThisPage.getControl('panelAppConsole').create('app-' + tmpAppName);
            tmpNewApp.subscribe('selected', wsItemSelected);

            
            tmpNewApp.subscribe('update-app-setup', function () {
                refreshWorkspace()
            })
            loadedApps[tmpAppName] = tmpNewApp;

            //--- For Debugging
            window[tmpAppName] = tmpNewApp;

            //--- Create a new card for this app
            ThisPage.addToSpot('ws-work-area', '<div appuse="cards" group="' + wsOutlineName + '" item="' + tmpAppName + '"></div>');
            var tmpTabAttr = { group: wsOutlineName, item: tmpAppName };
            //--- Find created cards jQuery element
            var tmpNewGroup = ThisPage.getByAttr$({ group: wsOutlineName, item: tmpAppName, appuse: 'cards' });

            var tmpSetupDetails = { appname: tmpAppName, title: tmpAppTitle };

            tmpNewApp.preLoad(tmpSetupDetails);
            //--- Load App Console into that card
            tmpNewApp.loadToElement(tmpNewGroup).then(function (theReply) {
                //--- Go to the newly added card (to show it and hide others)
                tmpNewApp.setup(tmpSetupDetails);
                ThisApp.gotoTab(tmpTabAttr);
                //ThisPage.refreshNavTabs();
                ThisPage.saveWorkspaceState();
            });
        }
    };



    actions.showResourceConsole = showResourceConsole;
    function showResourceConsole(theParams, theTarget) {
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, commonParams);
        var tmpResourceName = tmpParams.resname || tmpParams.name || '';
        if (!(tmpResourceName)) {
            alert("No resource name provided to open");
            return;
        }
        var tmpResourceTitle = tmpResourceName;

        var tmpCatName = '';
        var tmpAppName = '';
        var tmpPageName = '';


        var tmpEntryName = tmpResourceName || '';
        if ((tmpParams.appname)) {
            tmpAppName = tmpParams.appname;
        }
        if ((tmpParams.catname)) {
            tmpCatName = tmpParams.catname;
        }
        if ((tmpParams.pagename)) {
            tmpPageName = tmpParams.pagename;
        }

        if( tmpCatName ){
            tmpEntryName = tmpCatName + "--" + tmpEntryName;
        } else {
            tmpEntryName = tmpAppName + "-" + tmpPageName + "-" + tmpEntryName;
        }
        
        
        // if( tmpPageName ){
        //     tmpEntryName = tmpAppName + "-" + tmpPageName + "-" + tmpEntryName;
        // } else {
        //     tmpEntryName = tmpAppName + "-catalog-" + tmpEntryName;
        // }


        if (loadedResources[tmpEntryName]) {
            var tmpTabAttr = { group: wsOutlineName, item: tmpEntryName };
            loadedResources[tmpEntryName].refreshOnActivate();
            ThisApp.gotoTab(tmpTabAttr);
        } else {
            var tmpNewResource = ThisPage.getControl('resourceConsole').create(tmpEntryName);

            tmpNewResource.subscribe('update-app-setup', function () {
                refreshWorkspace()
            })
            loadedResources[tmpEntryName] = tmpNewResource;
            


            //--- For Debugging
            window[tmpEntryName] = tmpNewResource;

            //--- Create a new card for this app
            ThisPage.addToSpot('ws-work-area', '<div appuse="cards" group="' + wsOutlineName + '" item="' + tmpEntryName + '"></div>');
            var tmpTabAttr = { group: wsOutlineName, item: tmpEntryName };
            //--- Find created cards jQuery element
            var tmpNewGroup = ThisPage.getByAttr$({ group: wsOutlineName, item: tmpEntryName, appuse: 'cards' });
            //--- Load Resource Console into that card

            tmpNewResource.preLoad(tmpParams);
            tmpNewResource.loadToElement(tmpNewGroup).then(function (theReply) {
                tmpNewResource.setup(tmpParams);
                //ThisPage.refreshNavTabs();
                ThisPage.saveWorkspaceState();                
            });
            //--- Go to the newly added card (to show it and hide others)
            ThisApp.delay(1).then(function(){
                ThisApp.gotoTab(tmpTabAttr);
            })
        }
    };


    actions.showPageConsole = showPageConsole;
    function showPageConsole(theParams, theTarget) {
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, commonParams);
        var tmpPageName = tmpParams.pagename || tmpParams.name || '';
        if (!(tmpPageName)) {
            alert("No page name provided to open");
            return;
        }
        var tmpPageTitle = tmpPageName;

        var tmpAppName = '';

        var tmpEntryName = tmpPageName || '';
        if (tmpParams.appname) {
            tmpAppName = tmpParams.appname;
            tmpEntryName = tmpParams.appname + "-" + tmpEntryName
        }

        if (loadedPages[tmpEntryName]) {
            var tmpTabAttr = { group: wsOutlineName, item: tmpEntryName };
            loadedPages[tmpEntryName].refreshOnActivate();
            ThisApp.gotoTab(tmpTabAttr);
        } else {
            var tmpNewPage = ThisPage.getControl('pageConsole').create(tmpEntryName);

            tmpNewPage.subscribe('update-app-setup', function () {
                refreshWorkspace()
            })
            tmpNewPage.subscribe('selected', wsItemSelected);

            loadedPages[tmpEntryName] = tmpNewPage;

            //--- For Debugging
            window[tmpEntryName] = tmpNewPage;

            //--- Create a new card for this app
            ThisPage.addToSpot('ws-work-area', '<div appuse="cards" group="' + wsOutlineName + '" item="' + tmpEntryName + '"></div>');
            var tmpTabAttr = { group: wsOutlineName, item: tmpEntryName };
            //--- Find created cards jQuery element
            var tmpNewGroup = ThisPage.getByAttr$({ group: wsOutlineName, item: tmpEntryName, appuse: 'cards' });
            //--- Load Page Console into that card

            tmpNewPage.preLoad(tmpParams);
            tmpNewPage.loadToElement(tmpNewGroup).then(function (theReply) {
                tmpNewPage.setup(tmpParams);
                //ThisPage.refreshNavTabs();
                ThisPage.saveWorkspaceState();
            });
            //--- Go to the newly added card (to show it and hide others)
            ThisApp.gotoTab(tmpTabAttr);
        }
    };

    ThisPage.closePageConsole = actions.closePageConsole = closePageConsole;
    function closePageConsole(theParams, theTarget) {
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, commonParams);
        var tmpPageName = tmpParams.pagename || tmpParams.name || '';
        if (!(tmpPageName)) {
            alert("No page name provided to open");
            return;
        };

        var tmpEntryName = tmpPageName || '';
        if (tmpParams.appname) {
            tmpAppName = tmpParams.appname;
            tmpEntryName = tmpParams.appname + "-" + tmpEntryName
        }

        if (loadedPages[tmpEntryName]) {
            var tmpTabAttr = { group: wsOutlineName, item: tmpEntryName };
            var tmpAll = ThisPage.getByAttr$(tmpTabAttr);
            tmpAll.each(function (theIndex, theItem) {
                var tmpItemEl = $(theItem);
                if (!(tmpItemEl.attr('oluse'))) {
                    tmpItemEl.remove();
                }
            })
            delete loadedPages[tmpEntryName];

        } else {
            console.warn("No loaded page to close for " + tmpEntryName)
        }

        var tmpToRemove = [];
        for (var aName in loadedResources) {
            var tmpRes = loadedResources[aName]
            var tmpResAppName = '';
            if (tmpRes.details && tmpRes.details.appname) {
                tmpResAppName = tmpRes.details.appname
            }

            if (tmpResAppName) {
                var tmpResPageName = '';
                if (tmpRes.details && tmpRes.details.pagename) {
                    tmpResPageName = tmpRes.details.pagename
                }
                if (tmpResPageName == tmpPageName && tmpResAppName == tmpAppName) {
                    tmpToRemove.push(aName);
                }
            }

        }

        for (var iPos in tmpToRemove) {
            var tmpRemoveItem = tmpToRemove[iPos];
            var tmpTabAttr = { group: wsOutlineName, item: tmpRemoveItem };
            var tmpAll = ThisPage.getByAttr$(tmpTabAttr);
            tmpAll.each(function (theIndex, theItem) {
                var tmpItemEl = $(theItem);
                if (!(tmpItemEl.attr('oluse'))) {
                    tmpItemEl.remove();
                }
            })

            delete loadedResources[tmpRemoveItem];
        }

        showAppConsole(tmpParams);
    };


    ThisPage.closeResourceConsole = actions.closeResourceConsole = closeResourceConsole;
    function closeResourceConsole(theParams, theTarget) {

        var tmpParams = ThisApp.getActionParams(theParams, theTarget, commonParams);
        var tmpResourceName = tmpParams.resname || tmpParams.name || '';
        if (!(tmpResourceName)) {
            alert("No resource name provided to open");
            return;
        }

        var tmpCatName = '';
        var tmpAppName = '';
        var tmpPageName = '';

        var tmpEntryName = tmpResourceName || '';
        if ((tmpParams.appname)) {
            tmpAppName = tmpParams.appname;
        }
        if ((tmpParams.catname)) {
            tmpCatName = tmpParams.catname;
        }
        if ((tmpParams.pagename)) {
            tmpPageName = tmpParams.pagename;
        }
        if( tmpAppName ){
            tmpEntryName = tmpAppName + "-" + tmpPageName + "-" + tmpEntryName
        } else if( tmpCatName ){
            tmpEntryName = tmpCatName + "--" + tmpEntryName
        } 
        

        if (loadedResources[tmpEntryName]) {
            var tmpTabAttr = { group: wsOutlineName, item: tmpEntryName };
            var tmpAll = ThisPage.getByAttr$(tmpTabAttr);
            tmpAll.each(function (theIndex, theItem) {
                var tmpItemEl = $(theItem);
                if (!(tmpItemEl.attr('oluse'))) {
                    tmpItemEl.remove();
                }
            })
            delete loadedResources[tmpEntryName];
            if( tmpPageName ){
                showPageConsole(tmpParams);
            } else if( tmpCatName ){                
                showCatalogConsole(tmpParams);
            } else {
                showAppConsole(tmpParams);
            }
            
        } else {
            console.warn("No loaded resource to close for " + tmpEntryName)
        }

    };

    actions.addCatalog = addCatalog;
    function addCatalog(theParams, theTarget) {
        ThisPage.getPanel('frmNewCatalog').prompt(
            {
                isNew: true,
                doc: { template: 'default' }
            }
        ).then(function (theSubmitted, theData) {
            if (!theSubmitted) {
                return;
            }

            ThisApp.common.apiCall({
                url: '/design/ws/new-catalog',
                data: theData
            }).then(function (theReply) {
                refreshWorkspace();
                showCatalogConsole(theData);
            })
        })
    };

    actions.addApp = addApp;
    function addApp(theParams, theTarget) {
        ThisPage.getPanel('frmNewApp').prompt(
            {
                isNew: true,
                doc: { template: 'default' }
            }
        ).then(function (theSubmitted, theData) {
            if (!theSubmitted) {
                return;
            }

            ThisApp.common.apiCall({
                url: '/design/ws/new-app',
                data: theData
            }).then(function (theReply) {
                refreshWorkspace();
                showAppConsole(theData);
            })
        })
    };


    actions.addPage = addPage;
    function addPage() {
        var tmpThis = this;

        ThisPage.getPanel('frmNewPage').prompt(
            {
                isNew: true,
                doc: { template: 'DefaultPage' }
            }
        ).then(function (theSubmitted, theData) {
            if (!theSubmitted) {
                return;
            }

            theData.target = 'workspace';
            ThisApp.common.apiCall({
                url: '/design/ws/new-page?run',
                data: theData
            }).then(function (theReply) {
                tmpThis.refreshWorkspace();
            })

        })
    };


    var commonParams = ['catname', 'appname', 'apptitle', 'titie', 'source', 'type', 'pagename', 'resname', 'restype'];
    actions.wsItemSelected = wsItemSelected;
    function wsItemSelected(theEvent, theControl, theTarget) {
        var tmpParams = ThisApp.getActionParams('na', theTarget, commonParams);
        //        var tmpEl = $(theTarget);
        if (tmpParams.type == 'app') {
            showAppConsole(tmpParams);
        } else if (tmpParams.type == 'page') {
            showPageConsole(tmpParams);
        } else if (tmpParams.type == 'resource') {
            showResourceConsole(tmpParams);
        } else if (tmpParams.type == 'catalog') {
            showCatalogConsole(tmpParams);
        } else {

        }

    }

    actions.addWSResource = addWSResource;
    function addWSResource(theParams, theTarget) {
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['restype'])
        var tmpType = tmpParams.restype || '';
        console.info('Not implemented', tmpType);
    };

    actions.closePage = closePage;
    function closePage(theParams, theTarget) {
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname', 'pagename']);
        console.info('closePage - Not implemented', tmpParams);
    };


    ThisPage.pageTabSelected = pageTabSelected;
    function pageTabSelected(theEvent, theControl, theTarget) {
        var tmpDetails = ThisApp.getAttrs(theTarget, ['item', 'group']);
        if (tmpDetails.group != 'workspace-outline') {
            return;
        }
        var tmpItem = tmpDetails.item || '';
        if (!tmpItem) {
            return;
        }
        if (tmpItem == 'workspace') {
            ThisPage.refreshWSNav();
        }
    }

    ThisPage.refreshWSNav = refreshWSNav;
    function refreshWSNav(theDetails) {
        var tmpHTML = this.getNavTabs(theDetails);
        tmpHTML = tmpHTML.join('\n');
        ThisPage.loadSpot('nav-tabs', tmpHTML);
    }


    ThisPage.getSubNavTabs = getSubNavTabs
    function getSubNavTabs(theDetails) {
        var tmpAppsIndex = {};
        var tmpCatsIndex = {};
        var tmpHTML = [];
        tmpHTML.push('<div class="pad0 ui top attached tabular tab-nav menu" style="">');
        tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="workspace" action="selectMe" class="item black"><i class="icon hdd black"></i> </a>');
        
        var tmpForAppName = theDetails.appname || '';
        var tmpForCatName = theDetails.catname || '';
        var tmpForPageName = theDetails.pagename || '';

        for (var iPos in loadedCats) {
            var tmpCat = loadedCats[iPos]
            var tmpCatName = '';
            if (tmpCat.details && tmpCat.details.catname) {
                tmpCatName = tmpCat.details.catname;
                var tmpCatTitle = tmpCat.details.title ||  tmpCat.details.catname;
                if (!(tmpCatsIndex[tmpForCatName]) && tmpForCatName == tmpCatName) {
                    tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpCatName + '" catname="' + tmpCatName + '" pageaction="showCatalogConsole" class="item   "><i class="icon archive teal"></i> ' + tmpCatTitle + '</a>');
                }
                tmpCatsIndex[tmpCatName] = true;
            }
        }

        for (var iPos in loadedApps) {
            var tmpApp = loadedApps[iPos]
            var tmpAppName = '';
            if (tmpApp.details && tmpApp.details.appname) {
                tmpAppName = tmpApp.details.appname;
                var tmpAppTitle = tmpApp.details.title || tmpAppName;
                if (!(tmpAppsIndex[tmpForAppName]) && tmpForAppName == tmpAppName) {
                    tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '" appname="' + tmpAppName + '" pageaction="showAppConsole" class="item black  "><i class="icon globe blue"></i> ' + tmpAppTitle + '</a>');
                }
                tmpAppsIndex[tmpAppName] = true;
            }
        }
        for (var iPos in loadedResources) {
            var tmpRes = loadedResources[iPos]
            var tmpAppName = '';
            if (tmpRes.details && tmpRes.details.appname) {
                tmpAppName = tmpRes.details.appname
            }
            if (tmpRes.details && tmpRes.details.catname) {
                tmpCatName = tmpRes.details.catname
            }
             
            if (tmpAppName && (!(tmpAppsIndex[tmpAppName]) && tmpForAppName == tmpAppName)) {
                tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '" appname="' + tmpAppName + '" pageaction="showAppConsole" class="item black  "><i class="icon globe blue"></i> ' + tmpAppName + '</a>');
                tmpAppsIndex[tmpAppName] = true;
            } else if (tmpCatName && !(tmpCatsIndex[tmpCatName]) && tmpForCatName == tmpCatName){
                tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpCatName + '" catname="' + tmpCatName + '" pageaction="showCatalogConsole" class="item   "><i class="icon archive teal"></i> ' + tmpCatTitle + '</a>');
                tmpCatsIndex[tmpCatName] = true;
            }

            if (tmpAppName) {
                var tmpPageName = '';
                if (tmpRes.details && tmpRes.details.pagename) {
                    tmpPageName = tmpRes.details.pagename
                }
                var tmpPageFN = tmpAppName + '-' + tmpPageName;
                if( !tmpPageName ){
                    //--- If this is showing nav for the page, show resources
                    if (tmpForPageName || !(tmpPageName)) {
                        var tmpResName = tmpRes.details.resname;
                        var tmpResTitle = tmpRes.details.title || tmpRes.details.resname;

                        var tmpResType = tmpRes.details.restype;
                        var tmpResFN = tmpAppName + '-' + tmpPageName + '-' + tmpResName;

                        if (!(tmpAppsIndex[tmpResFN]) && (tmpForAppName == tmpAppName)) {
                            if (tmpPageName == tmpForPageName) {
                                var tmpIcon = ThisApp.controls.detailsIndex.getDetails(tmpResType).icon;
                                tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '-' + tmpPageName + '-' + tmpResName + '" appname="' + tmpAppName + '" pagename="' + tmpPageName + '"  resname="' + tmpResName + '" pageaction="showResourceConsole"    class="item black"><i class="icon ' + tmpIcon + ' violet"></i> ' + tmpResTitle + '</a>')
                                tmpAppsIndex[tmpResFN] = true;
                            }
                        }
                    }
                }
            } else if (tmpCatName) {
                
                var tmpResName = tmpRes.details.resname;
                var tmpResTitle = tmpRes.details.title || tmpRes.details.resname;

                var tmpResType = tmpRes.details.restype;
                var tmpResFN = tmpCatName + '--' + tmpResName;

                if (!(tmpCatsIndex[tmpResFN]) && (tmpForCatName == tmpCatName)) {
                    var tmpIcon = ThisApp.controls.detailsIndex.getDetails(tmpResType).icon;
                    tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpCatName + '--' + tmpResName + '" catname="' + tmpCatName + '" pagename="' + tmpPageName + '"  resname="' + tmpResName + '" pageaction="showResourceConsole"    class="item black"><i class="icon ' + tmpIcon + ' brown"></i> ' + tmpResTitle + '</a>')
                    tmpCatsIndex[tmpResFN] = true;
                }
            }

        }

        for (var iPos in loadedPages) {
            var tmpPage = loadedPages[iPos]
            var tmpAppName = '';
            var tmpCatName = '';
            if (tmpPage.details && tmpPage.details.appname) {
                tmpAppName = tmpPage.details.appname
            }
            if (tmpPage.details && tmpPage.details.catname) {
                tmpCatName = tmpPage.details.catname
            }
            if (!(tmpAppsIndex[tmpAppName]) && tmpForAppName == tmpAppName) {
                tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '" appname="' + tmpAppName + '" pageaction="showAppConsole" class="item black  "><i class="icon globe blue"></i> ' + tmpAppName + '</a>');
                tmpAppsIndex[tmpAppName] = true;
            }

            if (tmpAppName) {
                var tmpPageName = '';
                if (tmpPage.details && tmpPage.details.pagename) {
                    tmpPageName = tmpPage.details.pagename
                }
                var tmpPageFN = tmpAppName + '-' + tmpPageName;
                if (!(tmpAppsIndex[tmpPageFN])) {
                    if ((!tmpForPageName && (tmpForAppName == tmpAppName)) || (tmpForPageName && (tmpPageName == tmpForPageName)  && (tmpForAppName == tmpAppName))) {
                        tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '-' + tmpPageName + '" appname="' + tmpAppName + '" pagename="' + tmpPageName + '" pageaction="showPageConsole" class="item black"><i class="icon columns green"></i> ' + tmpPageName + '</a>');
                        tmpAppsIndex[tmpPageFN] = true;
                    }
                }

            }


        }
        for (var iPos in loadedResources) {
            var tmpRes = loadedResources[iPos]
            var tmpAppName = '';
            var tmpCatName = '';
            if (tmpRes.details && tmpRes.details.appname) {
                tmpAppName = tmpRes.details.appname
            }
            if (tmpRes.details && tmpRes.details.catname) {
                tmpCatName = tmpRes.details.catname
            }

            if (tmpAppName && !(tmpAppsIndex[tmpAppName]) && tmpForAppName == tmpAppName) {
                tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '" appname="' + tmpAppName + '" pageaction="showAppConsole" class="item black  "><i class="icon globe blue"></i> ' + tmpAppName + '</a>');
                tmpAppsIndex[tmpAppName] = true;
            }

            if (tmpAppName) {
                var tmpPageName = '';
                if (tmpRes.details && tmpRes.details.pagename) {
                    tmpPageName = tmpRes.details.pagename
                }
                var tmpPageFN = tmpAppName + '-' + tmpPageName;
                if( tmpPageName ){
                    if (!(tmpAppsIndex[tmpPageFN]) && tmpForAppName == tmpAppName) {
                        if (!(tmpForPageName) || (tmpForPageName && (tmpPageName == tmpForPageName))) {
                            tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '-' + tmpPageName + '" appname="' + tmpAppName + '" pagename="' + tmpPageName + '" pageaction="showPageConsole" class="item black"><i class="icon columns green"></i> ' + tmpPageName + '</a>');
                            tmpAppsIndex[tmpPageFN] = true;
                        }
                    }
                }


                //--- If this is showing nav for the page, show resources
                if (tmpForPageName || !(tmpPageName)) {
                    var tmpResName = tmpRes.details.resname;
                    var tmpResTitle = tmpRes.details.title || tmpRes.details.resname;

                    var tmpResType = tmpRes.details.restype;
                    var tmpResFN = tmpAppName + '-' + tmpPageName + '-' + tmpResName;

                    if (!(tmpAppsIndex[tmpResFN]) && (tmpForAppName == tmpAppName)) {
                        if (tmpPageName == tmpForPageName) {
                            var tmpIcon = ThisApp.controls.detailsIndex.getDetails(tmpResType).icon;
                            tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '-' + tmpPageName + '-' + tmpResName + '" appname="' + tmpAppName + '" pagename="' + tmpPageName + '"  resname="' + tmpResName + '" pageaction="showResourceConsole"    class="item black"><i class="icon ' + tmpIcon + ' purple"></i> ' + tmpResTitle + '</a>')
                            tmpAppsIndex[tmpResFN] = true;
                        }
                    }
                }


            } else if (tmpCatName && (tmpForCatName == tmpCatName)) {
                
                var tmpResName = tmpRes.details.resname;
                var tmpResTitle = tmpRes.details.title || tmpRes.details.resname;

                var tmpResType = tmpRes.details.restype;
                var tmpResFN = tmpCatName + '--' + tmpResName;
                if (!(tmpCatsIndex[tmpResFN]) && (tmpForCatName == tmpCatName)) {
                    var tmpIcon = ThisApp.controls.detailsIndex.getDetails(tmpResType).icon;
                    tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpCatName + '--' + tmpResName + '" catname="' + tmpCatName + '" pagename="' + tmpPageName + '"  resname="' + tmpResName + '" pageaction="showResourceConsole"    class="item black"><i class="icon ' + tmpIcon + ' brown"></i> ' + tmpResTitle + '</a>')
                    tmpCatsIndex[tmpResFN] = true;
                }


            }

        }

        tmpHTML.push('</div><div class="ui divider fitted black"></div>')

        // var tmpNavHTML = [];
        // tmpNavHTML.push('<div class="pad0 ui top attached tabular tab-nav menu" style="">');
        // tmpNavHTML.push('<a appuse="tablinks" group="workspace-outline" item="workspace" action="selectMe" class="item black"><i class="icon hdd black"></i> </a>');
        // tmpNavHTML = tmpNavHTML.concat(tmpHTML);
        // tmpNavHTML.push('</div>');
        ThisPage.loadSpot('nav-tabs', tmpHTML.join(''));

        return []
    }

    ThisPage.getNavTabs = getNavTabs
    function getNavTabs() {

        var tmpHTML = [];
        tmpHTML.push('<div class="pad0 ui top attached tabular tab-nav menu" style="">');
        tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="workspace" action="selectMe" class="item black"><i class="icon hdd black"></i> </a>');
        var tmpAppsIndex = {};
        var tmpCatsIndex = {};

        var tmpForCatName = '';

 

        for (var iPos in loadedCats) {
            var tmpCat = loadedCats[iPos]
            var tmpCatName = '';
            if (tmpCat.details && tmpCat.details.catname) {
                tmpCatName = tmpCat.details.catname;
                var tmpCatTitle = tmpCat.details.title ||  tmpCat.details.catname;
                tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpCatName + '" catname="' + tmpCatName + '" pageaction="showCatalogConsole" class="item   "><i class="icon archive teal"></i> ' + tmpCatTitle + '</a>');
                tmpCatsIndex[tmpCatName] = true;
            }
        }
        
        for (var iPos in loadedApps) {
            var tmpApp = loadedApps[iPos]
            var tmpAppName = '';
            if (tmpApp.details && tmpApp.details.appname) {
                tmpAppName = tmpApp.details.appname;
                var tmpAppTitle = tmpApp.details.title || tmpAppName;
                tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '" appname="' + tmpAppName + '" pageaction="showAppConsole" class="item   "><i class="icon globe blue"></i> ' + tmpAppTitle + '</a>');
                tmpAppsIndex[tmpAppName] = true;
            }
        }
        for (var iPos in loadedPages) {
            var tmpPage = loadedPages[iPos]
            var tmpAppName = '';
            if (tmpPage.details && tmpPage.details.appname) {
                tmpAppName = tmpPage.details.appname;
                if (!(tmpAppsIndex[tmpAppName])) {
                    tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '" appname="' + tmpAppName + '" pageaction="showAppConsole" class="item black  "><i class="icon globe blue"></i> ' + tmpAppName + '</a>');
                    tmpAppsIndex[tmpAppName] = true;
                }
            }
        }
        for (var iPos in loadedResources) {
            var tmpRes = loadedResources[iPos]
            var tmpAppName = '';
            if (tmpRes.details && tmpRes.details.appname) {
                tmpAppName = tmpRes.details.appname;
                if (!(tmpAppsIndex[tmpAppName])) {
                    tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '" appname="' + tmpAppName + '" pageaction="showAppConsole" class="item black  "><i class="icon globe blue"></i> ' + tmpAppName + '</a>');
                    tmpAppsIndex[tmpAppName] = true;
                }
            }
        }

        tmpHTML.push('</div><div class="ui divider fitted black"></div>')


        return tmpHTML
    }

})(ActionAppCore, $);

