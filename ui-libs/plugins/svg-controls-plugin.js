/*
Author: Joseph Francis
License: MIT

SVG controls Plugin:
 - SVG Control: (n) an interactive controllable object
 
   - SVG Controls have ...
     - Strings that control simple behaviors 
     - Actions to trigger options
     - States to describe / show the situation a control is in
        - Active, Selected, On/Off, Etc.
     - An instruction manual (specs) that provide details on what the control can do
        - Built-in specs make interacting with new controls easy      
*/



(function (ActionAppCore, $) {
    //--- SVG Plugin Add-On Modules --- --- --- --- --- --- --- --- --- --- --- --- 
    ActionAppCore.createModule("SvgControls:catalog");
    ActionAppCore.createModule("SvgControls:extension");

    //--- Modules this plugin will use --- --- --- --- --- --- --- --- --- --- --- --- 
    var MyMod = ActionAppCore.module("plugin");
    var SvgCatalogMod = ActionAppCore.module("SvgControls:catalog");
    var SvgExtendMod = ActionAppCore.module("SvgControls:extension");

    var thisCompName = 'SvgControls';
    var thisCompActionPrefix = '_svg';

    //--- This this component to the Plugin Module
    MyMod[thisCompName] = ThisPageController;


    var ThisApp = null;

    var thisComponentID = "plugin:" + thisCompName;

    //--- Base class for application pages
    function ThisPageController(theOptions) {
        this.options = theOptions || {};
        this.actions = this.options.actions || {};
        var defaults = {};
        if (typeof (this.options.app) == 'object') {
            ThisApp = this.options.app;
            if (ThisApp && ThisApp.registerComponent) {
                ThisApp.registerComponent(thisComponentID, this);
            }
        }
    }
    var me = ThisPageController.prototype;
    //---ToDo: Duplicate, pull from somewhere unified?
    me.controlsBaseURL = "./svg-catalog/controls/";

    me.svgDefsTemplateName = thisCompActionPrefix + ":defs";

    me.init = init;
    function init(theApp) {
        //--- Register this components action delegate prefix
        //- plugins that start with _ are plugins only.
        //- ** Do not use _ for non-plugin delegates
        ThisApp.registerActionDelegate(thisCompActionPrefix, runAction);
        //--- Create Global ID container for SVGs that use IDs, needed to load more than one
        me.initSvgDefsContainer();

        return this;
    }

    me.getNewPanel = function (theOptions) {
        return new SvgExtendMod.SvgCtlPanel(theOptions);
    }

    function runAction(theAction, theSourceObject) {
        if (typeof (me[theAction]) == 'function') {
            me[theAction](theAction, theSourceObject);
        }
    }

    me.svgDefsTemplateName = thisCompActionPrefix + ":defs";

    //---ToDo: Duplicate, pull from somewhere unified?
    me.controlsBaseURL = "./svg-catalog/controls/";
    me.defsId = 'control-manager-defs-svg';
    //var controlCreateFunctions = {};
    var controlPromises = {};

    me.initSvgDefsContainer = function () {
        //--- Creating this on the fly was an issue in cordova/win
        //     when using position:absolute; top:10000; (removed that part)
        //--- Create Global Defs Area for commonly referenced DEFs from SVGs
        //    ** this is to allow multiple instances of an SVG that references IDs **        
        var tmpNewDiv = $('<div />').appendTo('body');
        tmpNewDiv.html('<svg id="control-manager-defs-svg"></svg>');
        me.svgDefsContainerNode = d3.select('#' + me.defsId).node();
    }
    me.addDefs = function (theDefsNode) {
        me.svgDefsContainerNode.appendChild(theDefsNode)
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
            //    Once a control is registered in the SvgCatalogMod module, 
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
        var tmpNew = new SvgCatalogMod[theControlName];
        return tmpNew;
    }

    me.hasControl = function (theControlName) {
        return SvgCatalogMod.hasOwnProperty(theControlName);
    }

    me.resolveWhenLoaded = function (theControlName, thePromise) {
        me.controlPromises(theControlName) = thePromise;
    }

})(ActionAppCore, $);

///--- End of the plugin





//--- SvgControl Functionality =========== =========== =========== =========== =========== =========== =========== 
(function (ActionAppCore, $) {

    var ExtendMod = ActionAppCore.module("extension");
    var SvgExtendMod = ActionAppCore.module("SvgControls:extension");

    //--- Base class for application pages
    function ThisExtention() {

    }
    var me = ThisExtention.prototype;

    //-- Every SvgControl has quick access to common setDisplay function
    $.extend(me, ExtendMod.SetDisplay)
    //-- Every SvgControl has built-in pub-sub functionality
    $.extend(me, ExtendMod.PubSub)

    me.createdCount = 0;
    me.loadedControls = {};

    me.getAsObject = getAsObject;
    function getAsObject() {
        var tmpRet = {};
        tmpRet.oid = this.oid;
        tmpRet.cid = this.cid;

        tmpRet.translateX = this.translateX;
        tmpRet.translateY = this.translateY;
        tmpRet.scale = this.scale;

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

    me.getTransform = getTransform;
    function getTransform() {
        var tmpRet = '';
        tmpRet += 'translate(' + this.translateX + ',' + this.translateY + ') ';
        tmpRet += 'scale(' + this.scale + ') ';
        return tmpRet;
    }

    me.refreshLocation = function () {
        this.controlWrap.attr("transform", this.getTransform());
    }


    me.getMousePos = function (thePoint) {
        var tmpThisControl = this;
        var tmpSvgBB = tmpThisControl.svgTopEl.getBBox();
        var p = tmpThisControl.svg.node().createSVGPoint();
        p.x = thePoint.x;
        p.y = thePoint.y;
        var matrix = tmpThisControl.svg.node().getScreenCTM();
        p = p.matrixTransform(matrix.inverse());
        var tmpX = p.x - tmpSvgBB.x;
        var tmpY = p.y - tmpSvgBB.y;
        if (tmpX < 0) {
            tmpX = 0;
        }
        if (tmpY < 0) {
            tmpY = 0;
        }
        return {
            x: tmpX,
            y: tmpY
        }
    }

    me.objectClicked = objectClicked;
    function objectClicked(theEvent) {
        if (this.parentWS && this.parentWS.objectClicked) {
            this.parentWS.objectClicked(theEvent, this);
        }
    }

    me.initControl = initControl;
    function initControl(theParentSVG, theOptions) {
        this.initPubSub();
        var dfd = jQuery.Deferred();
        this.colorOffset = 0;
        var tmpThisControl = this;

        var tmpOptions = theOptions || {};
        //-- Every control name and title is the same, add to prototype
        this.controlName = tmpOptions.controlName;
        this.controlTitle = tmpOptions.controlTitle;

        //-- Each object has shorthand cid that has the id of the control this object is based on
        tmpThisControl.cid = this.controlName;

        //-- Each object has states that track params that control the object
        //tmpThisControl.states = $.extend({}, tmpOptions.states || {});

        //-- Each object should have access to the SvgControls plugin
        me._svg = ActionAppCore.app.getComponent("plugin:SvgControls");
        me.baseURL = me._svg.controlsBaseURL + tmpThisControl.controlName + "/";

        //var tmpSpotName = $(theParentSVG).attr("spot");
        tmpThisControl.svg = d3.select(theParentSVG);

        if (typeof (tmpOptions.colorOffset) == 'number') {
            tmpThisControl.colorOffset = tmpOptions.colorOffset;
        }
        var tmpBaseURL = me.baseURL;

        var tmpSvgFrag = document.createDocumentFragment();
        var tmpSvgBase = d3.select(tmpSvgFrag).append("svg");
        tmpSvgBase.attr("xmlns","http://www.w3.org/2000/svg")
            .append("g")
            .attr("id","baseLayer")
            .append("g")
            .attr("id", "layer1");

        var tmpSvgNode = tmpSvgBase.node();

        var tmpOID = theOptions.oid || (tmpThisControl.cid + "-" + me.createdCount++);
        tmpSvgNode.id = tmpOID;
        tmpThisControl.oid = tmpOID;
        tmpThisControl.controlSvg = d3.select(tmpSvgNode);
        tmpThisControl.controlWrap = tmpThisControl.controlSvg.select("#baseLayer");
        tmpThisControl.control = tmpThisControl.controlSvg.select("#layer1");
        tmpThisControl.controlNode = tmpThisControl.control.node();


        if (tmpThisControl.svg) {
            //--- ToDo: Cleanup of events when removed?
            var tmpAddedEl = tmpThisControl.svg.node().appendChild(tmpSvgNode);
            tmpThisControl.svgTopEl = tmpAddedEl;
            if (typeof (tmpOptions.onClick) == 'function') {
                $(tmpThisControl.svgTopEl).on("click", tmpOptions.onClick);
            }
            //--- always also catch the click event
            $(tmpThisControl.svgTopEl).on("click", tmpThisControl.objectClicked.bind(tmpThisControl));
            if (typeof (tmpOptions.onContextMenu) == 'function') {
                $(tmpThisControl.svgTopEl).contextmenu(tmpOptions.onContextMenu);
            }
        }

        //--- load all the parts we need one at a time 
        //ToDo: Change this to async and load in order when all received
        d3.xml(tmpBaseURL + tmpThisControl.controlName + ".svg", function (error, documentFragment) {
            if (error) {
                console.error(error);
                return;
            }
            var tmpSvgNode = documentFragment.getElementsByTagName("svg")[0];
            // tmpThisControl.svgEl = tmpSvgNode;

            //--- was null, had to redo this -- examine further on why???
            tmpThisControl.control = tmpThisControl.controlSvg.select("#layer1");
            tmpThisControl.controlNode = tmpThisControl.control.node();
            //--- had to move this
            tmpThisControl.control.attr("cid", me.cid);
            tmpThisControl.control.attr("oid", tmpOID);
            //tmpThisControl.events = $({});

            // tmpSvgNode.id = tmpThisControl.controlName + "_" + (me.loadedCount + 1);
            ////console.log("tmpThisControl2",tmpThisControl);
            tmpThisControl.controlNode.appendChild(tmpSvgNode);
            tmpThisControl.svgNode = d3.select(tmpSvgNode);

            var tmpDefsNode = tmpSvgNode.getElementsByTagName("defs")[0];
            //--- Need to load the defs into a global space
            if (!tmpThisControl.loadedControls.hasOwnProperty(tmpThisControl.controlName)) {
                me._svg.addDefs(tmpDefsNode);
                me.loadedControls[tmpThisControl.controlName] = true;
            } else {
                tmpSvgNode.removeChild(tmpDefsNode);
            }
            //me.loadedCount++;

            tmpThisControl.frame = tmpThisControl.svgNode.select("#frame");

            tmpThisControl.translateX = tmpOptions.translateX || 0;
            tmpThisControl.translateY = tmpOptions.translateY || 0;
            tmpThisControl.scale = tmpOptions.scale || 1;
            tmpThisControl.states = {};


            //--- To Do, get message / details when fully loaded and do it then
            setTimeout(function () {
                tmpThisControl.loadStates(tmpOptions.states || {});
            }, 10);


            tmpThisControl.refreshLocation();




            dfd.resolve(tmpThisControl);


        });
        
        return dfd.promise();

    }

    //--- return the prototype to be marged with prototype of target object
    //ExtendMod.SvgControl = me;
    SvgExtendMod.SvgControl = me;

})(ActionAppCore, $);








//--- SvgCtlPanel Functionality =========== =========== =========== =========== =========== =========== =========== 

(function (ActionAppCore, $) {

    var ExtendMod = ActionAppCore.module("extension");
    var SvgExtendMod = ActionAppCore.module("SvgControls:extension");

    //--- Base class for application pages
    function ThisExtention() {

    }

    var me = ThisExtention.prototype;

    //-- Every SvgCtlPanel has built-in pub-sub functionality
    //$.extend(me, ExtendMod.PubSub)
    //-- Every SvgCtlPanel has quick access to common setDisplay function
    $.extend(me, ExtendMod.SetDisplay)

    me.removeControl = function (theObjectOrID) {
        var tmpID = theObjectOrID;
        if (typeof (theObjectOrID) == 'object' && theObjectOrID.oid) {
            tmpID = theObjectOrID.oid;
        }
        this.workspaceControls[tmpID] = undefined;
        delete this.workspaceControls[tmpID];
        $(this.svg).find('[oid="' + tmpID + '"]').remove();
    }

    //--- Called by objects when they are clicked
    me.objectClicked = objectClicked;
    function objectClicked(theEvent, theObj) {
        //console.log("object clicked", theEvent, theObj, theDetails)
    }


    me.getAsObject = getAsObject;
    function getAsObject() {
        var tmpRet = {};
        tmpRet.zoomAt = this.zoomAt;
        tmpRet.zoomIncr = this.zoomIncr;

        //--- In order based on svg
        tmpRet.objects = [];
        var tmpAllObjects = $(this.svg).find('[oid]');
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
        var tmpAllObjects = $(this.svg).find('[oid]');
        var tmpLen = tmpAllObjects.length;
        if (tmpLen > 0) {
            for (var i = 0; i < tmpLen; i++) {
                var tmpO = tmpAllObjects[i];
                $(tmpO).remove();
                //ToDo: Remove listeners?
            }
        }
        this.activeControl = null;
        this.workspaceControls = {};
        this.controlsAddedAt = {};
        this.zoomAt = 100;
        this.zoomIncr = 10;
    }

    me.loadFromObject = loadFromObject;
    function loadFromObject(theObject) {
        if (typeof (theObject) != 'object') {
            console.error("loadFromObject - Error: No object passed to load.")
            return false;
        }
        var tmpRet = {};

        this.clear();

        this.zoomAt = theObject.zoomAt || this.zoomAt;
        this.zoomIncr = theObject.zoomIncr || this.zoomIncr;
        this.zoomWorkspaceTo(this.zoomAt);

        var tmpObjects = theObject.objects || [];
        var tmpLen = tmpObjects.length;
        if (tmpLen > 0) {
            for (var i = 0; i < tmpLen; i++) {
                var tmpO = tmpObjects[i];
                var tmpOID = tmpO.oid;
                var tmpCID = tmpO.cid;
                //console.log("tmpO", tmpO);
                this.addControl(tmpOID, tmpCID, tmpO)

            }
        }


        return tmpRet;
    }

    me.init = init;
    function init(theOptions) {
        this.originalViewBox = theOptions.viewBox || { x: 0, y: 0, w: 800, h: 800 };
        this.currentViewBox = $.extend({}, this.originalViewBox);
        this.zoomAt = 100;
        this.zoomIncr = 10;
        this.workspaceControls = {};
        this.drag = null;
        this.svg = null;
        this.dPoint = null;
        this.dragOperation = '';

        this.activeControl = null;
        //console.log("INit",this,theOptions)
        me._svg = me._svg || ActionAppCore.app.getComponent("plugin:SvgControls");
        theOptions = theOptions || {};
        this.svg = theOptions.svg || false;
        if (!this.svg) {
            console.error("A svg entry is required to setup a SvgCtlPanel")
        }
        if (theOptions.viewBox !== false) {
            this.svg.setAttribute('viewBox', this._getViewBoxString(this.originalViewBox));
        }

        this.AttachListeners();

    }

    me._getViewBoxString = function (theObj) {
        return '' + theObj.x + ' ' + theObj.y + ' ' + theObj.w + ' ' + theObj.h;
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
      * @param  {Object} theOptions   [standard options object with control options such as scale, transformX, etc]
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

        $.when(me._svg.getControl(theControlName)).then(
            function (theNewControl) {
                var tmpOptions = { scale: 1 }; //onClick: me.controlClick, 
                if (typeof (theOptions) == 'object') {
                    $.extend(tmpOptions, theOptions);
                }
                tmpOptions.oid = tmpObjID;
                theNewControl.init(tmpThis.svg, tmpOptions);
                tmpThis.workspaceControls[tmpObjID] = theNewControl;
                theNewControl.parentWS = tmpThis;
                dfd.resolve(theNewControl);
            }
        );
        return dfd.promise();
    }

    me.zoomMin = 5;
    me.zoomMax = 400

    me.zoomWorkspace = zoomWorkspace;
    function zoomWorkspace(theZoomIncr) {
        //console.log("theZoomIncr",theZoomIncr)
        var tmpZoomAmt = this.zoomAt + theZoomIncr;
        //console.log("tmpZoomAmt",tmpZoomAmt)
        if (tmpZoomAmt < me.zoomMin) {
            tmpZoomAmt = me.zoomMin;
        }
        if (tmpZoomAmt > me.zoomMax) {
            tmpZoomAmt = me.zoomMax;
        }
       
        //console.log("tmpZoomAmt",tmpZoomAmt)
        this.zoomWorkspaceTo(tmpZoomAmt)
    }
    me.zoomWorkspaceUp = zoomWorkspaceUp;
    function zoomWorkspaceUp(theAmt) {
        this.zoomWorkspace(theAmt || this.zoomIncr)
    }
    me.zoomWorkspaceDown = zoomWorkspaceDown;
    function zoomWorkspaceDown(theAmt) {
        this.zoomWorkspace(0-(theAmt || this.zoomIncr))
    }   

    me.zoomWorkspaceTo = zoomWorkspaceTo;
    function zoomWorkspaceTo(theNewZoomPercent) {
        //        //console.log("zoomWorkspaceTo theNewZoomPercent",theNewZoomPercent);
        var tmpPerc = theNewZoomPercent;
        if (tmpPerc < 1) {
            tmpPerc = tmpPerc * 100;
        }
        //      //console.log("zoomWorkspaceTo tmpPerc",tmpPerc,this.originalViewBox.w);

        this.zoomAt = tmpPerc;
        this.currentViewBox.w = (this.originalViewBox.w / (this.zoomAt / 100));
        this.currentViewBox.h = (this.originalViewBox.h / (this.zoomAt / 100));
        this.svg.setAttribute('viewBox', me._getViewBoxString(this.currentViewBox));

    }

    // me.refreshUI = refreshUI
    // function refreshUI() {
    //     var tmpSelectedControlName = ''
    //     if (this.selectedControl) {
    //         tmpSelectedControlName = this.selectedControl.text;
    //     }
    //     ThisApp.loadSpot('dash:selected-control', tmpSelectedControlName, '', me.getParent$())
    // }

    // var this.drag = null;
    // var svg = null;
    // var this.dPoint = null;

    me.AttachListeners = AttachListeners;
    function AttachListeners() {
        //console.log("AttachListeners",this.svg);
        this.svg.onmousedown = DragProcess.bind(this);
        this.svg.onmousemove = DragProcess.bind(this);
        this.svg.onmouseup = DragProcess.bind(this);
        $(document.body).on('mouseup', DragUp.bind(this));
    }


    me.DragUp = DragUp;
    function DragUp(e) {
        if (this.drag) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.drag = null;
        this.dragOperation = '';
        if (this.activeControl) {
            if (this.dragOperation == 's') {
                this.activeControl.translateX = 0;
                this.activeControl.translateY = 0;

            }
            this.activeControl = false;
        }
    }

    this.DragProcess = DragProcess;
    function DragProcess(e) {

        var t = e.target, id = t.id, et = e.type;
        if (e.ctrlKey == true || e.altKey == true) {
            if (e.ctrlKey == true) {
                this.dragOperation = 'm';
            } else {
                this.dragOperation = 's';
            }
            e.preventDefault();
            e.stopPropagation();
                this.MoveDrag(e);
        }

        // stop drag no matter what
        if ((et == "mouseup")) {
            //console.log("DragUp");
            //this.drag.className.baseVal="draggable";
            this.drag = null;
            this.dragOperation = '';
            if (this.activeControl) {
                if (this.dragOperation == 's') {
                    this.activeControl.translateX = 0;
                    this.activeControl.translateY = 0;

                }
                this.activeControl = false;
            }
        }
    }

    //var this.activeControl = false;

    // Drag function that needs to be modified;//
    me.MoveDrag = MoveDrag;
    function MoveDrag(e) {

        var t = e.target, id = t.id, et = e.type; m = MousePos.bind(this)(e);
        //        //console.log("MoveDrag",et,m)

        if (!this.drag && (et == "mousedown")) {
            var tmpParent$ = ($(t).closest('[oid]'));
            //            //console.log("tmpParent$",tmpParent$);
            if (!tmpParent$ || tmpParent$.length == 0) {
                return;
            }

            var tmpOID = tmpParent$.attr("oid") || '';
            var tmpScale = 1;
            var tmpControl = this.workspaceControls[tmpOID];
            if (tmpControl) {
                this.activeControl = tmpControl;
                tmpScale = this.activeControl.scale;
            }
            var tmpParent = tmpParent$[0].parentNode;
            if (!tmpParent._x) {
                tmpParent._x = tmpControl.translateX;
                tmpParent._y = tmpControl.translateY;

            }

            this.dPoint = m;
            this.dPoint.scale = tmpScale;
            // //console.log("setting drag",tmpParent)
            this.drag = tmpParent;

            //this.drag = tmpControl.controlWrap[0];
        }

        // drag the spawned/copied draggable element now
        if (this.drag && (et == "mousemove")) {

            var tmpScale = 1;
            var tmpX = 0;
            var tmpY = 0;

            if (this.activeControl) {

                if (this.dragOperation == 's') {

                    tmpX = this.activeControl.translateX;
                    tmpY = this.activeControl.translateY;
                    this.dPoint.origX = this.dPoint.origX || this.dPoint.x;
                    var tmpDiff = m.x - this.dPoint.x;
                    this.dPoint.x = m.x;

                    var tmpDiffOrig = m.x - this.dPoint.origX;

                    var tmpDiffPerc = Math.abs(tmpDiffOrig) / 500;
                    var tmpMoveAmt = .02;
                    if (tmpDiffPerc > .4) {
                        tmpMoveAmt *= 5;
                    }
                    if (tmpDiff > 0) {
                        this.activeControl.scale += tmpMoveAmt
                    } else {
                        this.activeControl.scale -= tmpMoveAmt
                    }


                } else {
                    this.drag._x += m.x - this.dPoint.x;
                    this.drag._y += m.y - this.dPoint.y;
                    this.dPoint = m;
                    tmpX = this.drag._x;
                    tmpY = this.drag._y;
                    this.activeControl.translateX = this.drag._x;
                    this.activeControl.translateY = this.drag._y;
                    tmpScale = this.activeControl.scale;
                }
                tmpScale = this.activeControl.scale;


                //this.activeControl.translateX = this.drag._x;
                //this.activeControl.translateY = this.drag._y;


            }

            this.drag.setAttribute("transform", "translate(" + tmpX + "," + tmpY + ") scale(" + (tmpScale) + "," + tmpScale + ") ");
        }

    }


    // adjust mouse position to the matrix of SVG & screen size
    me.MousePos = MousePos;
    function MousePos(event) {
        //  //console.log("MousePos",this)
        return this.getMousePos({ x: event.clientX, y: event.clientY })
    }

    //--- Get Mouse Position relative to the related SVG workspace
    me.getMousePos = function (thePoint) {

        var p = this.svg.createSVGPoint();

        p.x = thePoint.x;
        p.y = thePoint.y;
        var matrix = this.svg.getScreenCTM();
        p = p.matrixTransform(matrix.inverse());
        var tmpX = p.x;
        var tmpY = p.y;
        if (tmpX < 0) {
            tmpX = 0;
        }
        if (tmpY < 0) {
            tmpY = 0;
        }
        return {
            x: tmpX,
            y: tmpY
        }
    }

    //--- return the prototype to be marged with prototype of target object

    SvgExtendMod.SvgCtlPanel = ThisExtention;

})(ActionAppCore, $);



