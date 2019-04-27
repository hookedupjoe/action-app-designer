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
                "app/catalog/designer/controls/app-console": "panelAppConsole",
                "app/catalog/designer/controls/resource-console": "resourceConsole",
                "app/catalog/designer/controls/page-console": "pageConsole"
            }
        },
        panels: {
            map: {
                "design/ws/frmNewApp": "frmNewApp",
                "design/ws/frmNewPage": "frmNewPage"
            }
        }
    }

    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        north: false,
        east: false,
        west: { partname: "west", control: "west" },
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
    var loadedApps = {};
    var loadedPages = {};
    var loadedResources = {};

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
        ThisPage.initOnFirstLoad().then(
            function () {
                //--- For debugging
                window.wsPage = ThisPage;

                ThisPage.subscribe('selectMe', ThisPage.pageTabSelected)

                //--- Now your done - READY to do stuff the first time on your page

                //--- Subscirbe to when item selected in workspace
                ThisPage.parts.west.subscribe('selected', wsItemSelected);
                ThisPage.parts.center.subscribe('selected', wsItemSelected);

                ThisPage.layout.toggle("west");
                ThisPage.refreshNavTabs();
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

    //=== Page Stuff

    /*
        ThisPage.selectedFieldName = '';
        ThisPage.activeControlName = ThisPage.ns("resource-preview");
    
        ThisPage.frmPreview$ = ThisPage.spot$('preview-area')
        ThisPage.frmPreview$.on('change', frmPreviewChange)
        ThisPage.frmPreview$.get(0).addEventListener('focus', frmPreviewFocusChange, true)
    
        function frmPreviewChange(theEvent) {
            var tmpTarget = getTarget(theEvent);
            var tmpFN = tmpTarget.name;
            console.log( 'tmpFN', tmpFN);
            //setSelectedField(tmpFN);
        };
    
        */

    actions.refreshWorkspace = refreshWorkspace;
    function refreshWorkspace() {
        ThisPage.parts.west.parts.workspace.refreshFromURI();
        ThisPage.parts.center.parts.workspace.refreshFromURI();
    };


    actions.showAppConsole = showAppConsole;
    function showAppConsole(theParams, theTarget) {

        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname', 'apptitle', 'name', 'title']);
        var tmpAppName = tmpParams.appname || tmpParams.name || '';
        if (!(tmpAppName)) {
            alert("No app name provided to open");
            return;
        }
        console.log( 'tmpParams', tmpParams);
        var tmpAppTitle = tmpParams.apptitle || tmpParams.title || tmpAppName;

        if (loadedApps[tmpAppName]) {
            var tmpTabAttr = { group: wsOutlineName, item: tmpAppName };
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
            ThisPage.addToSpot('body', '<div appuse="cards" group="' + wsOutlineName + '" item="' + tmpAppName + '"></div>');
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

        var tmpAppName = '';
        var tmpPageName = '';

        var tmpEntryName = tmpResourceName || '';
        if ((tmpParams.appname)) {
            tmpAppName = tmpParams.appname;
        }
        if ((tmpParams.pagename)) {
            tmpPageName = tmpParams.pagename;
        }

        tmpEntryName = tmpAppName + "-" + tmpPageName + "-" + tmpEntryName

        if (loadedResources[tmpEntryName]) {
            var tmpTabAttr = { group: wsOutlineName, item: tmpEntryName };
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
            ThisPage.addToSpot('body', '<div appuse="cards" group="' + wsOutlineName + '" item="' + tmpEntryName + '"></div>');
            var tmpTabAttr = { group: wsOutlineName, item: tmpEntryName };
            //--- Find created cards jQuery element
            var tmpNewGroup = ThisPage.getByAttr$({ group: wsOutlineName, item: tmpEntryName, appuse: 'cards' });
            //--- Load Resource Console into that card

            tmpNewResource.preLoad(tmpParams);
            tmpNewResource.loadToElement(tmpNewGroup).then(function (theReply) {
                tmpNewResource.setup(tmpParams);
            });
            //--- Go to the newly added card (to show it and hide others)
            ThisApp.gotoTab(tmpTabAttr);
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
            ThisPage.addToSpot('body', '<div appuse="cards" group="' + wsOutlineName + '" item="' + tmpEntryName + '"></div>');
            var tmpTabAttr = { group: wsOutlineName, item: tmpEntryName };
            //--- Find created cards jQuery element
            var tmpNewGroup = ThisPage.getByAttr$({ group: wsOutlineName, item: tmpEntryName, appuse: 'cards' });
            //--- Load Page Console into that card

            tmpNewPage.preLoad(tmpParams);
            tmpNewPage.loadToElement(tmpNewGroup).then(function (theReply) {
                tmpNewPage.setup(tmpParams);
            });
            //--- Go to the newly added card (to show it and hide others)
            ThisApp.gotoTab(tmpTabAttr);
        }
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


    var commonParams = ['appname', 'apptitle', 'titie', 'source', 'type', 'pagename', 'resname', 'restype'];

    function wsItemSelected(theEvent, theControl, theTarget) {
        var tmpParams = ThisApp.getActionParams('na', theTarget, commonParams);
        //        var tmpEl = $(theTarget);
        if (tmpParams.type == 'app') {
            showAppConsole(tmpParams);
        } else if (tmpParams.type == 'page') {
            showPageConsole(tmpParams);
        } else if (tmpParams.type == 'resource') {
            showResourceConsole(tmpParams);
        } else {

        }

    }

    actions.addWSResource = addWSResource;
    function addWSResource(theParams, theTarget) {
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['restype'])
        var tmpType = tmpParams.restype || '';
        console.log('tmpType', tmpType);
    };

    actions.closePage = closePage;
    function closePage(theParams, theTarget) {
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['appname', 'pagename']);
        console.log('closePage', tmpParams);
    };


    ThisPage.pageTabSelected = pageTabSelected;
    function pageTabSelected(theEvent, theControl, theTarget) {
        var tmpDetails = ThisApp.getAttrs(theTarget, ['item', 'group']);
        //console.log( 'pageTabSelected', tmpDetails);
        if (tmpDetails.group != 'workspace-outline') {
            return;
        }
        var tmpItem = tmpDetails.item || '';
        if (!tmpItem) {
            return;
        }
        if (tmpItem == 'workspace') {
            refreshNavTabs();
        }
        console.log('tmpItem', tmpItem);

    }

    ThisPage.refreshNavTabs = refreshNavTabs
    function refreshNavTabs(theDetails) {

        var tmpHTML = [];
        tmpHTML.push('<div class="pad0 ui top attached tabular tab-nav menu" style="">');
        tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="workspace" action="selectMe" class="item black"><i class="icon hdd black"></i> </a>');

        if (ThisApp.util.isObj(theDetails)) {
            console.log('theDetails', theDetails);
        } else {
            //---- Show Open Apps as tabs
            console.log('openapps', loadedApps);
            for (var iPos in loadedApps) {
                var tmpApp = loadedApps[iPos]
                console.log('tmpApp', tmpApp);
                var tmpAppName = '';
                if (tmpApp.details && tmpApp.details.appname) {
                    tmpAppName = tmpApp.details.appname;
                    tmpHTML.push('<a appuse="tablinks" group="workspace-outline" item="' + tmpAppName + '" appname="' + tmpAppName + '" pageaction="showAppConsole" class="item black  "><i class="icon globe blue"></i> ' + tmpAppName + '</a>');
                }
            }
        }

        tmpHTML.push('</div><div class="ui divider fitted black"></div>')
        tmpHTML = tmpHTML.join('\n');
        ThisPage.loadSpot('nav-tabs', tmpHTML)
    }


})(ActionAppCore, $);
