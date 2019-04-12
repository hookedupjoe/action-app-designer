(function(){


var loadedCount = 0;
var createdCount = 0;
var thisControlName = 'data-comp-db';

var SVGControlComponent = function () {
    var me = {};
    me.strings = {};

    me.init = initControl;
    me.defaultTransform = "translate(20,50) scale(.5)";

    me.onClick = function (theEvent) {
        if (me.options && typeof (me.options.onClick) == 'function') {
            me.options.onClick(this);
        }
    }

    me.isActive = false;

    me.setActive = function (theIsActive) {
        me.isActive = theIsActive;
        refreshUI();
    }

    function refreshUI() {
      //--- Set CSS / Styles, etc to show active, and other state details
    }


    me.getControlInfo = getControlInfo;
    function getControlInfo() {
        var tmpInfo = {};
        var tmpStringsInfo = {};
        for (var aStringName in me.strings) {
            var tmpString = me.strings[aStringName];
            var tmpSI = {
                name: aStringName,
                title: tmpString.title || aStringName
            }
            tmpStringsInfo[aStringName] = tmpSI;
        }
        tmpInfo.strings = tmpStringsInfo;
        tmpInfo.name = thisControlName
        tmpInfo.title = 'Database Component'
        tmpInfo.params = {
            "onClick": "Optional callback function to call when this item is clicked",
            "transform": "Optional alternate transformation to apply to this item"
        }
        return tmpInfo;
    }

    me.baseURL = '';
    me.setBaseURL = function (theURL) {
        me.baseURL = theURL;
    }
    me.setDisplay = function(theItem, theIsVis){
        theItem.style('display',(theIsVis?'':'none'));
    }
    
    me.colorOffset = 0;

    function initControl(theParentSVG, theOptions) {
        var dfd = jQuery.Deferred();
        me.colorOffset = 0;

        me.svg = theParentSVG;
        var tmpOptions = theOptions || {};

        if( typeof(tmpOptions.colorOffset) == 'number'){
            me.colorOffset = tmpOptions.colorOffset;
        }
        me.options = tmpOptions;
        var tmpBaseURL = me.baseURL;


        d3.xml(tmpBaseURL + "base-container.svg", function (error, documentFragment) {
            if (error) {
                console.error(error);
                return;
            }

            var tmpSvgNode = documentFragment.getElementsByTagName("svg")[0];

            
            me.cid = thisControlName;
            var tmpOID = theOptions.oid || me.cid + "-" + createdCount++;
            tmpSvgNode.id = tmpOID;
            me.oid = tmpOID;

            me.svgNode = tmpSvgNode;
            me.controlSvg = d3.select(tmpSvgNode);
            me.controlWrap = me.controlSvg.select("#baseLayer");
            me.control = me.controlSvg.select("#layer1");
            me.control.attr("cid", me.cid);
            me.control.attr("oid", tmpSvgNode.id);
            me.control.on("click", me.onClick);

            me.controlWrap.attr("transform", tmpOptions.transform || me.defaultTransform);
            if (me.svg) {
                me.svg.node().appendChild(tmpSvgNode);
            }

            //--- load all the parts we need one at a time 
            //ToDo: Change this to async and load in order when all received
            d3.xml(tmpBaseURL + thisControlName + ".svg", function (error, documentFragment) {
                if (error) {
                    console.error(error);
                    return;
                }
                var tmpSvgNode = documentFragment.getElementsByTagName("svg")[0];
                tmpSvgNode.id = "starsmiley";
                me.control.node().appendChild(tmpSvgNode);
                me.svgNode = d3.select(tmpSvgNode);
                
                var tmpDefsNode = tmpSvgNode.getElementsByTagName("defs")[0];                
                //--- Need to load the defs into a global space
                if( loadedCount == 0){
                    console.log("SvgControlsManager.defsId",SvgControlsManager.defsId)
                    d3.select('#' + SvgControlsManager.defsId).node().appendChild(tmpDefsNode)
                   
                } else {
                    tmpSvgNode.removeChild(tmpDefsNode);
                }
                loadedCount++;

                me.frame = me.svgNode.select("#frame");
                me.iconDB = me.svgNode.select("#icon-database");
                me.iconClientDB = me.svgNode.select("#icon-window");
                me.iconLocalDB = me.svgNode.select("#icon-server");
                me.iconCloudDB = me.svgNode.select("#icon-cloud");
                me.setDisplay(me.iconClientDB,false);
                me.setDisplay(me.iconLocalDB,false);
                me.setDisplay(me.iconCloudDB,false);
                
                me.labelDB = me.svgNode.select("#label-db-name-caption");
                me.labelDB.text("Database Name");


                me.initStrings();
              /*
                if( tmpOptions && tmpOptions.parts && tmpOptions.parts.mouth && tmpOptions.parts.mouth.transform){
                    me.mouth.attr("transform", tmpOptions.parts.mouth.transform);
                }
                if( tmpOptions && tmpOptions.parts && tmpOptions.parts.control && tmpOptions.parts.control.transform){
                    console.log("control TRANSFORM",tmpOptions.parts.control.transform)
                    me.control.attr("transform", tmpOptions.parts.control.transform);
                }
                 */
        
                dfd.resolve(me);


            });
        })
        return dfd.promise();

    }
    //---------- --------- ----------


    //---------------------
  

    var stSizePulse = {
        name: 'sizePulse',
        title: 'Size Pulse',
        pull: pulseSize,
        default: 128
    }

    var stMoveX = {
        name: 'moveX',
        title: 'Move X',
        pull: moveX
    }
    var stMoveY = {
        name: 'moveY',
        title: 'Move Y',
        pull: moveY
    }

    var stLeanPulse = {
        name: 'leanPulse',
        title: 'Lean Pulse',
        pull: pulseLean
    }


    me.strings.moveX = stMoveX;
    me.strings.moveY = stMoveY;
    me.strings.sizePulse = stSizePulse;
    me.strings.leanPulse = stLeanPulse;

    me.initStrings = function () {
        for (aStringName in me.strings) {
            var tmpString = me.strings[aStringName];
            tmpString.default = tmpString.default || 0;
            //console.log("tmpString.default",tmpString.default);
            tmpString.value = tmpString.default;
            me.pullString(aStringName, tmpString.value);
        }
    }

    me.pullString = function (theStringName, theVal) {
        var tmpString = me.strings[theStringName];
        if (tmpString) {
            var tmpVal = Math.min(theVal, 255);
            tmpVal = Math.max(tmpVal, 0);
            tmpString.value = tmpVal;
            //console.log("Set " + theStringName,theVal)
            tmpString.pull(tmpVal);
        }
        return false;
    }

    me.getStringValue = function (theStringName) {
        var tmpString = me.strings[theStringName];
        if (tmpString) {
            return tmpString.value;
        }
    }

    me.getStringValues = function (theStringName) {
        var tmpRet = {};
        for (aStringName in me.strings) {
            var tmpString = me.strings[aStringName];
            tmpRet[aStringName] = tmpString.value || 0;
        }
        return tmpRet;
    }


    me.sizePulseScale = d3.scaleLinear()
        .domain([0, 255])
        .range([1, 1.3])


    me.movePulseScale = d3.scaleLinear()
        .domain([0, 255])
        .range([0, 1000])

    me.leanPulseScale = d3.scaleLinear()
        .domain([0, 255])
        .range([0, -10])



    function pulseSize(theVal) {
        var tmpD3El = me.control;
        me.currentScale = me.sizePulseScale(theVal);
        moveOnStage();
    }

    function moveOnStage() {
        var tmpD3El = me.control;
        //var tmpBB = tmpD3El.node().getBBox();
        var tmpX = me.currentPosX || 0;
        var tmpY = me.currentPosY || 0;
        tmpD3El.attr('transform', "skewX(" + me.currentLeanPos + ") skewY(" + me.currentLeanPos + ")  translate(" + tmpX + "," + tmpY + ") scale(" + me.currentScale + ")");
    }
    function moveX(theVal) {
        //me.currentPosVal = theVal;
        me.currentPosX = me.movePulseScale(theVal);
        moveOnStage()
    }
    function moveY(theVal) {
        //me.currentPosVal = theVal;
        me.currentPosY = me.movePulseScale(theVal);
        moveOnStage();
    }

    function pulseLean(theVal) {
        me.currentLeanVal = theVal;
        me.currentLeanPos = me.leanPulseScale(theVal);
        moveOnStage()
    }

    me.currentScale = 1;
    me.currentPosX = 0;
    me.currentPosY = 0;
    me.currentLeanPos = 0;

    me.setVisibility = function (theShow) {
        var tmpEl = $(me.controlSvg.node())
        if (theShow !== true) {
            tmpEl.addClass("hidden");
        } else {
            tmpEl.removeClass("hidden");
        }
    }

    //--- Interactions


    me.ints = {
        
    }
    me.intsActive = {
        
    }
    me.interact = function (theData, theOptions) {
        for (aIntName in me.intsActive) {
            if( me.intsActive[aIntName] === true){
                me.ints[aIntName].run(theData);
            }
        }
    };

    me.setInteractions = function (theInts) {
        // console.log("setInteractions");
        if (!(theInts)) {
            return;
        }
        for (aIntName in theInts) {
            var tmpIsActive = (theInts[aIntName] !== false);
            if (tmpIsActive) {
                console.log(aIntName + " on");
                me.intsActive[aIntName] = true;
            } else {
                console.log(aIntName + " off");
                me.intsActive[aIntName] = false;
                //delete me.intsActive[aIntName];
            }
        }
    };

    me.hasInteraction = function (theIntName) {
        // console.log("setInteractions");
        if (!(theIntName)) {
            return false;
        }
        return me.ints.hasOwnProperty(theIntName);
    };

    me.isInteractionActive = function (theIntName) {
        // console.log("setInteractions");
        if (!(theIntName)) {
            return false;
        }
        if( !(me.hasInteraction(theIntName)) ){
            return false;
        }
        if( !(me.intsActive.hasOwnProperty(theIntName)) ){
            return false;
        }
        console.log("active?",me.intsActive[theIntName]);
        return (me.intsActive[theIntName] === true);        
    };
    
    
    //--- The End - That's all folks
    return me;
};

SvgMod[thisControlName] = ThisControl;

// SvgControlsManager.registerControl(thisControlName, function () {
//     return new SVGControlComponent();
// })

    
})()
