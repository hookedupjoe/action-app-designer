/*
Author: Joseph Francis
License: MIT

Web controls Plugin:
 - Web Control: (n) an interactive controllable object
 
   - Web  Controls have ...
     - Actions to trigger options
     - States to describe / show the situation a control is in
        - Active, Selected, On/Off, Etc.
     - An instruction manual (specs) that provide details on what the control can do
        - Built-in specs make interacting with new controls easy      
*/


(function (ActionAppCore, $) {
    //--- Web Controls Plugin Add-On Modules --- --- --- --- --- --- --- --- --- --- --- --- 
    ActionAppCore.createModule("WebControls:catalog");
    ActionAppCore.createModule("WebControls:extension");

    //--- Modules this plugin will use --- --- --- --- --- --- --- --- --- --- --- --- 
    var MyMod = ActionAppCore.module("plugin");
    var WebCtlCatalogMod = ActionAppCore.module("WebControls:catalog");
    var WebCtlExtendMod = ActionAppCore.module("WebControls:extension");

    var thisCompName = 'WebControls';
    var thisCompActionPrefix = '_webctl';

    //--- This this component to the Plugin Module
    MyMod[thisCompName] = ThisPageController;

    var ThisApp = null;

    var thisComponentID = "plugin:" + thisCompName;

    //--- Base class for application pages
    function ThisPageController(theOptions) {
        this.options = theOptions || {};
        if (typeof (this.options.app) == 'object') {
            ThisApp = this.options.app;
            if (ThisApp && ThisApp.registerComponent) {
                ThisApp.registerComponent(thisComponentID, this);
            }
        }
    }

    var me = ThisPageController.prototype;
    //---ToDo: Duplicate, pull from somewhere unified?
    me.controlsBaseURL = "./webctl-catalog/controls/";

    me.init = init;
    function init(theApp) {
        //--- Register this components action delegate prefix
        //- plugins that start with _ are plugins only.
        //- ** Do not use _ for non-plugin delegates
        ThisApp.registerActionDelegate(thisCompActionPrefix, runAction);
        return this;
    }

    function runAction(theAction, theSourceObject) {
        if (typeof (me[theAction]) == 'function') {
            me[theAction](theAction, theSourceObject);
        }
    }

    me.getNewPanel = getNewPanel;
    function getNewPanel(theOptions) {
        return new WebCtlExtendMod.WebCtlPanel(theOptions);
    }


    me.newWorkspace = function (theOptions) {
        var tmpOptions = theOptions || {};
        var tmpEl = tmpOptions.el$;
        if( !(tmpEl) ){
            if( tmpOptions.spot ){
                tmpEl = ThisApp.getByAttr$({'spot':tmpOptions.spot});
            }
        }
        if( !(tmpEl) ){
            throw "Nothing to load WS into";
        }
        var tmpNewWS = getNewPanel();
        tmpNewWS.init({ mom: tmpEl[0]});
        return tmpNewWS;
    }
    
    /*
    *
    * Function: getControl
    *  - gets a control from cache if avail, else pulls via ajax
    * 
    *  **** This is a way to dynamically load script, 
    *       which can then dynamically load content.
    */
    me.getControl = function (theControlName) {
        var dfd = jQuery.Deferred();
        if (me.hasControl(theControlName)) {
            var tmpNew = me._getNewControl(theControlName);
            dfd.resolve(tmpNew);
        } else {
            var tmpBaseURL = me.controlsBaseURL + theControlName + "/";
            //--- Get the control, when the control loads - it registers itself
            //    Once a control is registered in the WebCtlCatalogMod module, 
            //      it can be created using the me._getNewControl function
            jQuery.getScript(tmpBaseURL + "control.js")
                .done(function () {
                    dfd.resolve(me._getNewControl(theControlName));
                })
                .fail(function (theError) {
                    console.error("Error loading script " + theError);
                    dfd.reject(theError);
                });
        }

        return dfd.promise();
    }

    me._getNewControl = function (theControlName) {
        var tmpNew = new WebCtlCatalogMod[theControlName];
        return tmpNew;
    }

    me.hasControl = function (theControlName) {
        return WebCtlCatalogMod.hasOwnProperty(theControlName);
    }

})(ActionAppCore, $);

///--- End of the plugin



//--- WebControl Functionality =========== =========== =========== =========== =========== =========== =========== 
(function (ActionAppCore, $) {

    var ExtendMod = ActionAppCore.module("extension");
    var WebCtlExtendMod = ActionAppCore.module("WebControls:extension");

    //--- Base class for application pages
    function ThisExtention() {

    }
    var me = ThisExtention.prototype;

    //-- Every WebControl has quick access to common setDisplay function
    $.extend(me, ExtendMod.SetDisplay);
    //-- Every WebControl has built-in pub-sub functionality
    $.extend(me, ExtendMod.PubSub);

    me.createdCount = 0;

    me.setDesignMode = function(theMode){
        this.designMode = theMode;
    }

    me.getAsObject = getAsObject;
    function getAsObject() {
        var tmpRet = {};
        tmpRet.oid = this.oid;
        tmpRet.cid = this.cid;

        tmpRet.states = this.states || {};
        return tmpRet;
    }

    me.loadStates = loadStates;
    function loadStates(theStates) {
        var tmpStates = theStates || {};
        for (var aStateName in tmpStates) {
            if (aStateName) {
                var tmpStateValue = tmpStates[aStateName];
                this.setState(aStateName, tmpStateValue);
            }
        }
    }

    //--- This is the parent / default setState function
    me._setState = setState;
    //--- This may be overridden, if so, the this._setState can be called to call the parent version
    me.setState = setState;
    function setState(theState, theValue) {
        this.states[theState] = theValue;
        return true;
    }
    me.getState = getState;
    function getState(theState) {
        if (!theState) {
            return undefined;
        }
        return this.states[theState]
    }    


    me.objectClicked = objectClicked;
    function objectClicked(theEvent) {
        if (this.parentWS && this.parentWS.objectClicked) {
            this.parentWS.objectClicked(theEvent, this);
        }
        this.publish('onClick',[this,theEvent])
    }

    me.clean = clean;
    function clean() {
        this.el.unbind("click");
        this.el.unbind("contextmenu");
    }

    me.initControl = initControl;
    function initControl(theParentContainer, theOptions) {
        this.initPubSub();
        var dfd = jQuery.Deferred();
        var tmpThisControl = this;

        var tmpOptions = theOptions || {};
        //-- Every control name and title is the same, add to prototype
        this.controlName = tmpOptions.controlName;
        this.controlTitle = tmpOptions.controlTitle;
        

        //-- Each object has shorthand cid that has the id of the control this object is based on
        tmpThisControl.cid = this.controlName;

        //-- Each object has states that track params that control the object
        //tmpThisControl.states = $.extend({}, tmpOptions.states || {});

        //-- Each object should have access to the WebControls plugin
        me._webctl = ActionAppCore.app.getComponent("plugin:WebControls");
        me.baseURL = me._webctl.controlsBaseURL + tmpThisControl.controlName + "/";

        var tmpSpotName = $(theParentContainer).attr("spot");
        tmpThisControl.mom = $('[spot="' + tmpSpotName + '"]').get(0);

        var tmpOID = theOptions.oid || (tmpThisControl.cid + "-" + me.createdCount++);

        if (tmpThisControl.mom) {
            //--- ToDo: Cleanup of events when removed?
            var tmpNewEl = document.createElement("webctl");
            tmpThisControl.mom.appendChild(tmpNewEl);
            var tmpAddedEl = tmpNewEl; //$(tmpThisControl.mom).find('webctl').get(0);
            //tmpAddedEl.setAttribute('id', tmpOID);
            tmpAddedEl.setAttribute('oid',tmpOID);
            tmpThisControl._el = tmpAddedEl;
            tmpThisControl.el = $(tmpThisControl._el);

            //--- ToDo: Move this, do not want events by default *****
            if (typeof (tmpOptions.onClick) == 'function') {
                $(tmpThisControl._el).on("click", tmpOptions.onClick);
            }
            //--- always also catch the click event
            $(tmpThisControl._el).on("click", tmpThisControl.objectClicked.bind(tmpThisControl));
          
            if (typeof (tmpOptions.onContextMenu) == 'function') {
                var tmpFN = tmpOptions.onContextMenu.bind(tmpThisControl);
                $(tmpThisControl._el).contextmenu(function(e){
                    if( !e.isDefaultPrevented() ){
                        e.preventDefault();
                        tmpFN(e);    
                    }
                });
            }
        }

        
        tmpThisControl.states = {};

        dfd.resolve(tmpThisControl);
        
        return dfd.promise();

    }

    //--- return the prototype to be marged with prototype of target object
    //ExtendMod.WebControl = me;
    WebCtlExtendMod.WebControl = me;

})(ActionAppCore, $);








//--- WebCtlPanel Functionality =========== =========== =========== =========== =========== =========== =========== 

(function (ActionAppCore, $) {

    var ExtendMod = ActionAppCore.module("extension");
    var WebCtlExtendMod = ActionAppCore.module("WebControls:extension");

    //--- Base class for this
    function ThisExtention() {

    }

    var me = ThisExtention.prototype;

    //-- Every WebCtlPanel has built-in pub-sub functionality
    $.extend(me, ExtendMod.PubSub)
    //-- Every WebCtlPanel has quick access to common setDisplay function
    $.extend(me, ExtendMod.SetDisplay)

    me.removeControl = function (theObjectOrID) {
        var tmpID = theObjectOrID;
        if (typeof (theObjectOrID) == 'object' && theObjectOrID.oid) {
            tmpID = theObjectOrID.oid;
        }
        this.workspaceControls[tmpID] = undefined;
        delete this.workspaceControls[tmpID];
        $(this.mom).find('[oid="' + tmpID + '"]').remove();
    }

    //--- Called by objects when they are clicked
    me.objectClicked = objectClicked;
    function objectClicked(theEvent, theObj) {
        this.publish('controlClick',[theObj,this,theEvent]);
        if( this.designMode ){
            this.selectedObject = theObj;
            this.refreshUI();
        }
    }

    //--- Do this to assure all controls are ready for addControl
    me.preloadControlsForObjects = preloadControlsForObjects;
    function preloadControlsForObjects(theObjectsArray) {
        var dfd = jQuery.Deferred();
        var tmpDefs = [];
        var tmpCIDs = {index:{},vals:[]};
        for (var index = 0; index < theObjectsArray.length; index++) {
            var tmpObj = theObjectsArray[index];
            if( !tmpCIDs.index.hasOwnProperty(tmpObj.cid) ){
                tmpCIDs.index[tmpObj.cid] = true;
                tmpCIDs.vals.push(tmpObj.cid);
            }
        }
        for (var index = 0; index < tmpCIDs.vals.length; index++) {
            var tmpCID = tmpCIDs.vals[index];
            if( tmpCID ){
                tmpDefs.push(
                    me._webctl.getControl(tmpCID)
                );
            }
        }
        $.whenAll(tmpDefs).then(
            function(){
                dfd.resolve(true);
            }
        )
        return dfd.promise();

    }

    me.getAsObject = getAsObject;
    function getAsObject() {
        var tmpRet = {};

        //--- In order
        tmpRet.objects = [];
        var tmpAllObjects = $(this.mom).find('[oid]');
        var tmpLen = tmpAllObjects.length;
        if (tmpLen > 0) {
            for (var i = 0; i < tmpLen; i++) {
                var tmpO = tmpAllObjects[i];
                var tmpOID = tmpO.getAttribute('oid');
                var tmpObj = this.workspaceControls[tmpOID];
                if (tmpObj && typeof (tmpObj.getAsObject) == 'function') {
                    var tmpObjDetails = tmpObj.getAsObject();
                    if (tmpObjDetails && tmpObjDetails.oid) {
                        tmpRet.objects.push(tmpObjDetails);
                    }
                }
            }
        }
        return tmpRet;
    }

    me.clear = clear;
    function clear() {
        var tmpAllObjects = $(this.mom).find('[oid]');
        var tmpLen = tmpAllObjects.length;
        if (tmpLen > 0) {
            for (var i = 0; i < tmpLen; i++) {
                var tmpO = tmpAllObjects[i];
                var tmpOID = tmpO.getAttribute('oid');
                var tmpObj = this.workspaceControls[tmpOID];

                if( tmpObj && typeof(tmpObj.clean) == 'function' ){
                    tmpObj.clean();
                }
                $(tmpO).remove();
            }
        }
        this.activeControl = null;
        this.workspaceControls = {};
        this.controlsAddedAt = {};
        this.selectedObject = false;
    }

    me.loadFromObject = loadFromObject;
    function loadFromObject(theObject) {
        var dfd = jQuery.Deferred();

        if (typeof (theObject) != 'object') {
            var tmpError = "loadFromObject - Error: No object passed to load.";
            console.error(tmpError)
            dfd.reject(tmpError)
            return dfd.promise();
        }
        var tmpRet = {};

        this.clear();

        var tmpObjects = theObject.objects || [];
        var tmpLen = tmpObjects.length;
        var tmpDefs = [];
        if (tmpLen > 0) {
            var tmpThis = this;
            this.preloadControlsForObjects(tmpObjects).then(
                function(){
                    for (var i = 0; i < tmpLen; i++) {
                        var tmpO = tmpObjects[i];
                        var tmpOID = tmpO.oid;
                        var tmpCID = tmpO.cid;
                        tmpDefs.push(tmpThis.addControl(tmpOID, tmpCID, tmpO));
                    }
                    $.whenAll(tmpDefs).then(
                        function(){
                            dfd.resolve(true)
                        }
                    )
                }
            )
        } else {
            //--- Blank, nothing to load
            dfd.resolve(true);
        }
        
        return dfd.promise();
    }

    
    me.init = init;
    function init(theOptions) {
        this.workspaceControls = {};
        this.mom = null;
        this.designMode = 0;

        this.initPubSub();

        this.activeControl = null;
        me._webctl = me._webctl || ActionAppCore.app.getComponent("plugin:WebControls");
        theOptions = theOptions || {};
        this.mom = theOptions.mom || false;
        if (!this.mom) {
            console.error("A parent element is required to setup a WebCtlPanel")
        }

        this.AttachListeners();

    }

    me.setDesignMode = function(theDesignMode){
        this.designMode = theDesignMode;
        this.refreshUI();
    }
    me.refreshUI = function(){
        var tmpAllObjects = $(this.mom).find('[oid]');
        var tmpLen = tmpAllObjects.length;
        if (tmpLen > 0) {
            for (var i = 0; i < tmpLen; i++) {
                var tmpO = tmpAllObjects[i];
                var tmpOID = tmpO.getAttribute('oid');
                var tmpObj = this.workspaceControls[tmpOID];
                if (tmpObj && typeof (tmpObj.refreshUI) == 'function') {
                    tmpObj.setDesignMode(this.designMode);
                    var tmpIsSel = false
                    if( typeof(this.selectedObject) == 'object'){
                        if( this.selectedObject.oid == tmpOID ){
                            tmpIsSel = true;
                        }
                    }
                    tmpObj.designSelected = tmpIsSel;
                    tmpObj.refreshUI()
                }
            }
        }
    }

    /**
      * addControl
      *    - adds a control to this Workspace
      * 
      * To Use: <any ws>.addControl('', 'some-control-name', {some:options});
      *
      * @param  {String} theObjectID   [A unique id for this conrol]
      *    Note: Use blank to have auto-generated unique id for this conrol
      * @param  {String} theControlName   [The name/id of the control from the control catalog]
      * @param  {Object} theOptions   [standard options object with control options]
      * @return void
      */
    me.addControl = function (theObjectID, theControlName, theOptions) {
        var dfd = jQuery.Deferred();
        theOptions = theOptions || {};
        var tmpThis = this;
        tmpThis.controlsAddedAt = tmpThis.controlsAddedAt || {};

        var tmpAt = tmpThis.controlsAddedAt[theControlName] || 0;
        var tmpObjID = theObjectID || '';
        if (tmpObjID == '') {
            for (var i = tmpAt; i < tmpAt + 10000; i++) {
                ///-- find unused slot for this control, ok if it uses one removed, just has to be unique
                var tmpCheck = theControlName + ":" + i;
                if (!tmpThis.workspaceControls.hasOwnProperty(tmpCheck)) {
                    tmpObjID = tmpCheck;
                    tmpThis.controlsAddedAt[theControlName] = i + 1;
                    break;
                }
            }
        }

        $.when(me._webctl.getControl(theControlName)).then(
            function (theNewControl) {
                var tmpOptions = { scale: 1 }; //onClick: me.controlClick, 
                if (typeof (theOptions) == 'object') {
                    $.extend(tmpOptions, theOptions);
                }
                tmpOptions.oid = tmpObjID;
                theNewControl.init(tmpThis.mom, tmpOptions);
                tmpThis.workspaceControls[tmpObjID] = theNewControl;
                theNewControl.parentWS = tmpThis;
                dfd.resolve(theNewControl);
            }
        );
        return dfd.promise();
    }

    me.AttachListeners = AttachListeners;
    function AttachListeners() {

        //--- Undo to enable context menus
        /*
        var tmpFN = onContextMenu.bind(this);
        $(this.mom).contextmenu(function(e){
            if( !e.isDefaultPrevented() ){
                e.preventDefault();
                tmpFN(e);    
            }
        })
         */
    }
    function onContextMenu(){
       ThisApp.showPopup({
            el: this.mom,
            variation: 'basic',
            html: '<div class="ui middle aligned divided list"><div class="item">Test</div></div>'
        })  
    }

    //--- return the prototype to be marged with prototype of target object

    WebCtlExtendMod.WebCtlPanel = ThisExtention;

})(ActionAppCore, $);



