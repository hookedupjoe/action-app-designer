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
            ThisPage.aceEditorEl = ThisPage.getSpot("ace-editor");
            console.log( 'ThisPage.aceEditorEl', ThisPage.aceEditorEl);   
            ThisPage.aceEditor = ace.edit(ThisPage.aceEditorEl.get(0));
            ThisPage.aceEditor.setTheme("ace/theme/vibrant_ink");
            ThisPage.aceEditor.setFontSize(16);
            ThisPage.aceEditor.session.setMode("ace/mode/javascript");
            ThisPage.aceEditor.session.setTabSize(2);

            resizeEditor();
            loadJson({});

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
    try {
        var tmpEval = eval('ThisPage.__jsonConverter =' + tmpJSON)
        loadJson(tmpEval);    
    } catch (ex) {
        try {
            console.log( 'try to with tmpJSON string', tmpJSON);
            if( tmpJSON.startsWith('var ')){
                tmpJSON = tmpJSON.replace("var ", "window._tmp__");
            }
            var tmpEval = eval(tmpJSON)
            loadJson(tmpEval);    
        } catch (ex) {
            console.error("formatJson err",ex)
            alert("Could not load", "Format Error", "e");
        }
        
    }
    
};

actions.loadJson = loadJson;
function loadJson(theObj){
    ThisPage.aceEditor.setValue(ThisApp.json(theObj, true));
    ThisPage.aceEditor.clearSelection();
};


//~YourPageCode~//~

})(ActionAppCore, $);
