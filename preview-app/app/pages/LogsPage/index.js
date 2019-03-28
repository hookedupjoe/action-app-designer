/*
Author: Joseph Francis
License: MIT
*/

//---  Logs Page module --- --- --- --- --- --- --- --- --- --- --- --- 
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");
    
    var thisPageSpecs = {
        pageName:"LogsPage", 
        pageTitle: "Logs", 
        pageNamespace: 'logs',
        navOptions:{
            topLink:false,
            sideLink:true
        },
        appModule:AppModule
    };
    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';

    thisPageSpecs.required = {
        templates: {
            baseURL: pageBaseURL + 'tpl',
            map:{
                "msg-ctr-item": thisPageSpecs.pageNamespace + ":msg-ctr-item"
            }
        }
    }

    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        html: {
            "north":"page-header",
            "center":"page-body",
            "south":"page-footer"
        },  
        spotPrefix: thisPageSpecs.pageNamespace,
        north: true,
        west:false,
        east: false
    }

    //--- Start with a ase SitePage component
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    ThisPage.templates = {};

    //===== Hook into the application lifecycle for this page =====
    // .. they happen in this order

    //=== On Application Load ===
    /*
    * This happens when the page is loaded, try to push activity back to when the tab is used
    *    If your component need to do stuff to be availale in the background, do it here
    */
    ThisPage._onPreInit = function(theApp){
        ThisPage.om = theApp.om;
        //console.log("Log Page: _onPreInit ");
    }
    ThisPage._onInit = function() {
        //console.log("Log Page: _onInit");
    }

    //=== On Page Activation ===
    /*
    * This happens the first time the page is activated and happens only one time
    *    Do the lazy loaded stuff in the initial activation, then do any checks needed when page is active
    *    Do stuff that needs to be available from this component, such as services, 
    *     that are needed even if the page was not activated yet
    */
    ThisPage._onFirstActivate = function(){
        //console.log("Log Page: _onFirstActivate");
        ThisPage.initOnFirstLoad().then(
            function(){
                ThisPage._onActivate();
            }
        );        
    }
    
    ThisPage._onActivate = function(){
        //console.log("Log Page: _onActivate");
        ThisPage.refreshMessageCenter();
    }
    //--- End lifecycle hooks
    
    ThisPage.jobLogs = {};
    ThisPage.jobLogsAt = 0;

    ThisPage.getJobLogBody = function () {
        return ThisPage.$jobLogs || $('[spot="logs-jobs"]');
    }
    ThisPage.getJobLogTabs = function () {
        return ThisPage.$jobLogs || $('[spot="logs:job-tabs"]');
    }
    //<div action="logs:clearJobLogs" class="ui primary basic button">Added</div>

    ThisPage.addJobLog = function () {
        var tmpBody = ThisPage.getJobLogBody();
        var tmpTabs = ThisPage.getJobLogTabs();

        ThisPage.jobLogsAt++;
        var tmpNewJobID = "job-" + ThisPage.jobLogsAt;

        var tmpNew = {
            name: tmpNewJobID,
            title: "Test Job " + ThisPage.jobLogsAt
        }
        

        var tmpBodyHTML = '<div appuse="cards" group="logs:job-tabs" item="' + tmpNewJobID + '" style="border:solid 1px red;">' + tmpNew.title + '</div>';
        ThisApp.addToSpot('logs-jobs', tmpBodyHTML);
        var tmpTabHTML = '<div group="logs:job-tabs" item="' + tmpNewJobID + '" class="ui item selected nopad noshadow" action="logs:selectTabLink" appuse="tablinks" group="logs:job-tabs" item="' + tmpNewJobID + '" ><a class="ui site-tab-link-body basic button">Tab long long long long long long long long' + ThisPage.jobLogsAt + '</a><a action="logs:closeSelectedTab" class="" style="padding-left:4px;"><i class="delete icon"></i></a></div>';
        //--- Prepend the tab so new is first (param 3 / true)
        ThisApp.addToSpot('logs:job-tabs', tmpTabHTML, false, true);
        ThisPage.openJobLink(tmpNewJobID);
       
    }



    //--- Custom tab links with common card layout for content
    ThisPage.closeSelectedTab = function (theAction, theTarget) {
        var tmpBtn = ($(theTarget).closest('[item]'));
        var tmpAs = ThisApp.getAttrs(tmpBtn, ['group', 'item']);
        var tmpParent = $('[spot="logs:job-tabs"]');
        var tmpSelectedItem = tmpParent.find('[appuse="tablinks"].primary');
        var tmpID = $(tmpSelectedItem.get(0)).attr('item');
        
        ThisApp.getByAttr$(tmpAs).remove();
        var tmpTabItems = tmpParent.find('[item="' + tmpID + '"]');

        if( tmpTabItems.length == 0){            
            //--- The current tab is gone, get the first item and show it
            //--- To Do, find next and then previous from selected before removing????
            tmpTabItems = tmpParent.find('[item]');  
            if( tmpTabItems.length > 0){            
                var tmpFirstAs = ThisApp.getAttrs(tmpTabItems.get(0), ['group', 'item']);
                ThisPage.openJobLinkTab(tmpFirstAs);
            }
        }
    }
    ThisPage.selectTabLink = function (theAction, theTarget) {
        var tmpAs = ThisApp.getAttrs(theTarget, ['group', 'item']);
        ThisPage.openJobLinkTab(tmpAs);    
    }
    ThisPage.openJobLinkTab = function (theLinkDetails) {
        var tmpAs = theLinkDetails;
        //--- Get selected item
        var tmpItemID = tmpAs.item || '';
        //--- Clear selected item to get all like this one, but assure only elems with item
        //    ** do this, if delete was used, would not look for item and pull the group body, etc
        tmpAs.item = '';
        //--- Get all matching elements for these elements
        var tmpAll = ThisApp.getByAttr$(tmpAs);
        //--- Alter items to show they are not selected
        tmpAll.removeClass('primary');
        //--- Add single item back to selector
        tmpAs.item = tmpItemID;
        //--- Get single matching element for this item
        var tmpItem = ThisApp.getByAttr$(tmpAs);
        //--- Alter single item to show it is selected
        tmpItem.addClass('primary');

        //--- related tab content
        //--- Create standard card selection

        var tmpCard = {
            group: tmpAs.group,
            item: tmpItemID
        }
        //--- Run standard card open and pass parent element 
        //     ... to reduce the items the selector has to look through
        ThisApp.gotoCard(tmpCard, ThisPage.getParent$());
    }

    ThisPage.openJobLink = function (theJobId) {
        var tmpSpecs = {
            group: 'logs:job-tabs',
            item: theJobId
        };
        ThisPage.openJobLinkTab(tmpSpecs);
    }



    ThisPage.clearJobLogs = function (theAction, theTarget) {
        ThisPage.jobLogsAt = 0;
        var tmpAs = ThisApp.getAttrs(theTarget, ['group']);

        //--- Add the fact that we only want elems with an item tag to not get body items, etc
        tmpAs.item = '';
        var tmpAll = ThisPage.getByAttr$(tmpAs);
        tmpAll.remove();
    }



    ThisPage.clearMessageCenter = clearMessageCenter;
    function clearMessageCenter() {
        ThisApp.clearMessages();
        refreshMessageCenter();
    }
    ThisPage.sendTestMessages = sendTestMessages;
    function sendTestMessages() {
        ThisApp.appMessage("Just some info");
        ThisApp.appMessage("Successful message here.", true, {title:"It was updated", data:{ what: "nothing" }});
        ThisApp.appMessage("Warning, Warning, Warning!", "w", {title:"This is just a warning", data:{ reason: "It is important" }});
        ThisApp.appMessage("There was an error, in case you want to take action, see the data.", "e", {data:{ reason: "It is important" }});
        ThisApp.appMessage("Just some info to log in messages, but now show in the UI","i",{noshow:true});
        refreshMessageCenter();
    }

    ThisPage.refreshMessageCenter = refreshMessageCenter;
    function refreshMessageCenter() {
        var tmpMessages = ThisApp.getMessages();
        console.log( 'refreshMessageCenter tmpMessages', tmpMessages);
        $.each(tmpMessages, function(thePos){
            var tmpObj = tmpMessages[thePos]
            var tmpMore = '';
            if( tmpObj && tmpObj.data ){
                tmpMore = tmpObj.data
                if(typeof(tmpMore) == 'object'){
                    tmpMore = JSON.stringify(tmpMore);
                }
            }
            tmpObj.more = tmpMore
        })
        
        var tmpContext = {messages:tmpMessages}
        var tmpTemplateName = ThisPage.ns('msg-ctr-item');
        ThisPage.loadSpot('logs-messages', tmpContext, tmpTemplateName )
    }

        
})(ActionAppCore, $);
