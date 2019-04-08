//--- SvgControl Base Object - Functionality for all SvgControls
(function (ActionAppCore, $) {
    var SvgExtendMod = ActionAppCore.module("SvgControls:extension");
    var SvgMod = ActionAppCore.module("SvgControls:catalog");

    var thisControlName = 'horiz-slider';
    var thisControlTitle = "Horizontal Slider";
    var thisControlClass = 'HorizSlider';
    var me = ThisControl.prototype;
    //--- Base class for application pages

    function ThisControl(theOptions) {

    }

    $.extend(me, SvgExtendMod.SvgControl);
    
    me.refreshUI = refreshUI;
    function refreshUI(){
        var tmpEl = this.knob;
        if( typeof(tmpEl.node) == 'function'){
            tmpEl = tmpEl.node();            
        }
        var tmpBB = tmpEl.getBBox();

        var tmpW = tmpBB.width;
        var tmpH = tmpBB.height;

        var tmpElBack = this.sliderBack;
        if( typeof(tmpElBack.node) == 'function'){
            tmpElBack = tmpElBack.node();            
        }
        var tmpBBBack = tmpElBack.getBBox();
        var tmpW2 = tmpBBBack.width;
        var tmpH2 = tmpBBBack.height;

        var tmpPerc = this.sliderValue / (this.sliderEnd - this.sliderStart);
        var tmpVal = tmpPerc * (tmpW2);
        tmpVal = tmpVal - ((tmpW/2));
        tmpVal = parseInt(''+tmpVal);
        this.knob.attr('transform','translate(' + tmpVal + ',' + 0 + ')');
    }

    me.setSliderValue = setSliderValue;
    function setSliderValue(theValue) {
        this.sliderValue = theValue;
        this.refreshUI();
        this.states.sliderValue = theValue;
        //console.log("setSliderValue",theValue);
    }

    me.getSliderValue = getSliderValue;
    function getSliderValue() {
        return this.sliderValue;
    }
    
    //-- ToDo: Review this, change to expose states and state specs?
    me.actionSpecs = {
        "setSliderValue": { name: "setSliderValue", params: { "theValue": { name: "theValue" } } }
    };
    me.init = init;

    me.setState = setState;
    function setState(theState, theValue) {
        if (!theState) {
            return false;
        }
        if (theState == 'sliderValue') {
            this.setSliderValue(theValue);
        } else {
            //console.info("Adding state with no action: " + theState);
            this.states[theState] = theValue;
        }
        return true;
    }
    me.onClick = function (e) {
       // console.log("click", e);
       var tmpRelativeWidth = 300;
       var tmpControlWidth = tmpRelativeWidth * this.scale;

       //--- Get mouse position relative to the control, not the parent SVG
       var tmpRelativePos = this.getMousePos({x:e.clientX,y:e.clientY});
       
      // console.log("tmpRelativePos",tmpRelativePos);
       var tmpX = tmpRelativePos.x;
        var tmpEl = this.sliderBack;
        if( typeof(tmpEl.node) == 'function'){
            tmpEl = tmpEl.node();            
        }
      
        var tmpPerc = (tmpX/tmpControlWidth);
       
        
        var tmpVal = (this.sliderEnd - this.sliderStart) * tmpPerc;
        tmpVal += this.sliderStart;
        if( tmpVal < 0){
            tmpVal = 0
        } else if( tmpVal > this.sliderEnd){
            tmpVal = this.sliderEnd;
        }
       

        if (e && e.detail && e.ctrlKey !== true && e.altKey !== true) {
            this.setSliderValue(parseInt(''+tmpVal));
            this.publish('valueChanged',[this.getSliderValue(), this]);
        }
    }

    me.onContextMenu = function (e) {
        return true;
    }

    function init(theParentSVG, theOptions) {
        var dfd = jQuery.Deferred();
        var tmpOptions = theOptions || {};



        tmpOptions.controlName = thisControlName;
        tmpOptions.controlTitle = thisControlTitle;
        tmpOptions.onClick = this.onClick.bind(this);
        tmpOptions.onContextMenu = this.onContextMenu.bind(this);

        this.options = theOptions || {};
        
        this.sliderValue = tmpOptions.sliderValue || 0;        
        this.sliderStart = tmpOptions.sliderStart || 0;
        this.sliderEnd = tmpOptions.sliderEnd || 100;
        this.sliderIncr = tmpOptions.sliderIncr || 5;
        
        this.oid = theOptions.oid || '';
        this.svg = theParentSVG;
        this.svg$ = $(this.svg);
        //--- Call default parent functionality to initialize a control
        var tmpThisControl = this;
        var tmpPromise = this.initControl(theParentSVG, tmpOptions).then(
            function (theControl) {
                tmpThisControl.frame = theControl.svgNode.select("#frame");
                tmpThisControl.knob = theControl.svgNode.select("#knob");
                tmpThisControl.sliderBack = theControl.svgNode.select("#slider-back");
                for( var aSN in tmpOptions ){
                    tmpThisControl.setState(aSN, tmpOptions[aSN])
                }
                dfd.resolve(tmpThisControl);
            }
        );
        return dfd.promise();
    }
   //--- Add This control to the SVG module as available
    SvgMod[thisControlName] = ThisControl;

})(ActionAppCore, $);

