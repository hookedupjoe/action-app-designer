(function (ActionAppCore, $) {
    var ExtendMod = ActionAppCore.module("SvgControls:extension");
    var SvgMod = ActionAppCore.module("SvgControls:catalog");

    var thisControlName = 'btn-round-glossy';
    var thisControlTitle = "Button - Round and Glossy";
    var thisControlClass = 'BtnRoundGlossy';
    var me = ThisControl.prototype;
    //--- Base class for application pages

    function ThisControl(theOptions) {

        this.options = theOptions || {};
        this.translateX = this.options.translateX || 0;
        this.translateY = this.options.translateY || 0;
        this.scale = this.options.scale || 1;
        //this.boxSize = 4 / this.scale;
        //this.iconTypeAt = 0;
        this.switchStatus = true;
        return this;
    }


    $.extend(me, ExtendMod.SvgControl);

    // me.iconType = '';
    // me.iconTypes = ['', 'client', 'local', 'cloud'];

    me.setState = setState;
    function setState(theState, theValue) {
        if (!theState) {
            return false;
        }
        
        if (theState == 'switchStatus') {
            this.setSwitchStatus(theValue);                        
        } else if (theState == 'switchColor') {            
            this.setSwitchColor(theValue);            
        } else {
            this.states[theState] = theValue;
        }
        return true;
    }

    me.setSwitchColor = setSwitchColor;
    function setSwitchColor(theValue){
        this.colorBack.style('fill',theValue )
        this.switchColor = theValue;
        this.states["switchColor"] = theValue;        
    }

    me.setSwitchStatus = setSwitchStatus;
    function setSwitchStatus(theStatus){
        this.switchStatus = theStatus;
        if( theStatus ){
            this.colorBack.style('opacity', 1)
        } else {
            this.colorBack.style('opacity', 0)
        }
        this.states["switchStatus"] = theStatus;
    }
    
    me.init = init;

    me.onClick = function (e) {
        if (e && e.detail && e.ctrlKey !== true) {
            this.setSwitchStatus(!this.switchStatus);
        }
    }

    function init(theParentSVG, theOptions) {
        var dfd = jQuery.Deferred();
        var tmpOptions = theOptions || {};
        tmpOptions.controlName = thisControlName;
        tmpOptions.controlTitle = thisControlTitle;
        tmpOptions.onClick = this.onClick.bind(this);

        this.oid = theOptions.oid || '';
        this.svg = theParentSVG;

        this.svgEl = this.svg;
        
        //--- Call default parent functionality to initialize a control
        var tmpThisControl = this;
        var tmpPromise = this.initControl(theParentSVG, tmpOptions).then(
            function (theControl) {
                tmpThisControl.frame = theControl.svgNode.select("#frame");
                tmpThisControl.colorBack = theControl.svgNode.select("#btn-round-glossy-colorback");
                //tmpThisControl.$colorStop = $(tmpThisControl.colorStop.node());
                //console.log("tmpThisControl.colorBack",tmpThisControl.getAsObject());
                
                dfd.resolve(tmpThisControl);
            }
        );
        return dfd.promise();
    }

    //--- Add This control to the SVG module as available
    SvgMod[thisControlName] = ThisControl;


})(ActionAppCore, $);

