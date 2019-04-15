(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

//~thisPageSpecs//~

var thisPageSpecs = {
	"pageName": "JsonHelperPage",
	"pageTitle": "JSON",
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
        east: false,
        west: { partname: "controls", control: "ControlPanel"},
        north: { partname: "north", control: "north"},
        south: false
    }
//~layoutOptions~//~

//~layoutConfig//~
    thisPageSpecs.layoutConfig = {
        west__size: "300"
        , east__size: "250"
    }
//~layoutConfig~//~

//~required//~
thisPageSpecs.required = {
    
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
    //--- Before the controls are loaded in initOnFirstLoad ..
    //      we want to update the source of the computed content
    ThisPage.contextData.jsonClipboardIndex = {}
    ThisPage.contextData.jsonClipboardList = '';
    
    loadClipboardList();
    
    //~_onFirstActivate~//~
        ThisPage.initOnFirstLoad().then(
            function () {
            //~_onFirstLoad//~
            ThisPage.aceEditorEl = ThisPage.getSpot("ace-editor");
            ThisPage.aceEditor = ace.edit(ThisPage.aceEditorEl.get(0));
            ThisPage.aceEditor.setTheme("ace/theme/vibrant_ink");
            ThisPage.aceEditor.setFontSize(16);
            ThisPage.aceEditor.session.setMode("ace/mode/javascript");
            ThisPage.aceEditor.session.setTabSize(2);

            resizeEditor();
            loadJson({});

            ThisPage.parts.controls.subscribe('field-change', controlFieldChanged);
            
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
    resizeEditor();
    //~_onResizeLayout~//~
    }

    //------- --------  --------  --------  --------  --------  --------  -------- 
//~YourPageCode//~

var dsNameJsonClipboard ='json-helper-page-json-clipboard';

function resizeEditor() {
    if(ThisPage.aceEditorEl && ThisPage.aceEditor){
        var tmpH = ThisPage.layout.panes.center.height()
        ThisPage.aceEditorEl
        .css('height','' + tmpH + 'px')
        .css('position','relative')
        ThisPage.aceEditor.resize(true);
    }
}

actions.clearJson = clearJson;
function clearJson(){
    ThisPage.aceEditor.setValue('');
}

actions.formatJson = formatJson;
function formatJson(){
    var tmpJSON = ThisPage.aceEditor.getValue();
    var tmpConverter = {};
    try {
        
        var tmpEval = eval('tmpConverter =' + tmpJSON)
        loadJson(tmpEval);    
    } catch (ex) {
        try {
            if( tmpJSON.startsWith('var ')){
                tmpJSON = tmpJSON.replace("var ", "tmpConverter.");
            }
            var tmpEval = eval(tmpJSON)
            loadJson(tmpEval);    
        } catch (ex) {
            console.error("formatJson err",ex)
            alert("Invalid JSON", "Format Error", "e");
        }
        
    }
    
};

actions.loadJson = loadJson;
function loadJson(theObj){
    ThisPage.aceEditor.setValue(ThisApp.json(theObj, true));
    ThisPage.aceEditor.clearSelection();
};

actions.saveJson = saveJson;
function saveJson(){
    var tmpJson = ThisPage.aceEditor.getValue();
    try {
        if( ThisApp.util.isObj(tmpJson) ){
            tmpJson = ThisApp.json(tmpJson,true);
        }
        
        if( ThisApp.util.isStr(tmpJson) ){
            //--- If this errors out, it is not valid and will show as such below
            ThisApp.json(tmpJson,true);
        }

        ThisApp.input("Name of this clipboard item", "Save Clipboard").then(function(theReply){
            if(!(theReply)){
                return
            };
            //--- Clean up name for db save use?
            //theReply = theReply.replace(/-/g, '');

            var tmpDoc = {title: theReply, data: tmpJson};

            ThisApp.om.putObject(dsNameJsonClipboard,theReply,tmpDoc).then(function(theReply){
                ThisPage.contextData.jsonClipboardIndex[theReply] = ThisApp.json(tmpJson,true);
                loadClipboardList()
            })
            
        })
        
    } catch (ex) {
        console.error("Error saving",ex);
        alert("Could not save. Try to reformat and try again.", "Not Saved", "e");
    }

};


actions.loadJsonClipboardSelected = loadJsonClipboardSelected;
function loadJsonClipboardSelected(theParams, theTarget){
    var tmpSelected = ThisPage.parts.controls.getFieldValue('json-clipboard');
    var tmpData = ThisPage.contextData.jsonClipboardIndex[tmpSelected];
    if(!ThisApp.util.isObj(tmpData)){
        alert("Not found, refresh the page and try again");
        return;
    }
    loadJson(tmpData);
};


function controlFieldChanged(theEvent, theControl, theFieldName, theFieldValue){
    if( theFieldName == 'json-clipboard'){
        var tmpEl = theControl.getItemEl('btn-load-selected');
        theFieldValue = theFieldValue.trim();
        var tmpHasClass = tmpEl.hasClass('disabled');
        if( theFieldValue ){
            if( tmpHasClass ){
                tmpEl.removeClass('disabled')
            }
        } else {
            if( !tmpHasClass ){
                tmpEl.addClass('disabled')
            }
            
        }
    }
}

actions.clearClipboardList = clearClipboardList;
function clearClipboardList(){
    ThisApp.confirm("Are you sure? They will be fone forever", "Remove All Saved JSON?")
  .then(function (theIsYes) {
      if (!theIsYes){
          return;
      }
      new PouchDB(dsNameJsonClipboard).destroy().then(function () {
        // database destroyed
        loadClipboardList();
      }).catch(function (err) {
        // error occurred
      })
  })

}

function loadClipboardList() {
    ThisPage.contextData.jsonClipboardIndex = {};
    
    ThisApp.om.getObjects(dsNameJsonClipboard).then(function(theReply){
        var tmpAll = false;
        
        if( theReply && theReply.docs ){
            tmpAll = theReply.docs;
        }
        if( tmpAll.length ){
            for( var aIndex in tmpAll){
                var tmpDoc = tmpAll[aIndex];
                var tmpID = tmpDoc._id;
                var tmpJson = {};

                try {
                    if( tmpDoc.data ){
                        if( ThisApp.util.isStr(tmpDoc.data) ){
                            tmpJson = ThisApp.json(tmpDoc.data);
                        } else {
                            tmpJson = tmpDoc.data
                        }
                    }
                    ThisPage.contextData.jsonClipboardIndex[tmpID] = tmpJson;
                } catch (ex) {
                    console.warn("Error loading saved object, did not load. " + tmpID);
                }
               
            }            
        }
        refreshClipboardList();    

        var tmpEl = ThisPage.parts.controls.getItemEl('btn-delete-all-saved');

        var tmpHasClass = tmpEl.hasClass('disabled');
        if( tmpAll.length ){
            if( tmpHasClass ){
                tmpEl.removeClass('disabled')
            }
        } else {
            if( !tmpHasClass ){
                tmpEl.addClass('disabled')
            }
            
        }

    });
}

function refreshClipboardList() {
    var tmpList = [];
    if(!(ThisPage.contextData.jsonClipboardIndex)){
        //ToDo: Show message about nothin gin index
        return;
    }

    var tmpIndex = ThisPage.contextData.jsonClipboardIndex;
    for( var aName in tmpIndex){
        var tmpEntry = tmpIndex[aName];
        tmpList.push(aName);        
    }

    tmpList.sort();
    ThisPage.contextData.jsonClipboardList = tmpList;
    if( ThisPage.parts && ThisPage.parts.controls ){
        ThisPage.parts.controls.refreshUI();
    }

}

//~YourPageCode~//~

})(ActionAppCore, $);
