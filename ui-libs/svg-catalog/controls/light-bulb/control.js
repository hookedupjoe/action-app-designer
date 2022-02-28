(function (ActionAppCore, $) {
    var ExtendMod = ActionAppCore.module("SvgControls:extension");
    var SvgMod = ActionAppCore.module("SvgControls:catalog");

    var thisControlName = 'light-bulb';
    var thisControlTitle = "Light Bulb Icon";
    //var thisControlClass = '';
    var me = ThisControl.prototype;
    //--- Base class for application pages

    function ThisControl(theOptions) {

        this.options = theOptions || {color:'blue'};
        this.translateX = this.options.translateX || 0;
        this.translateY = this.options.translateY || 0;
        this.scale = this.options.scale || 1;
        this.states = this.states || {};
        this.states.brt = 1;
        this.states.color = 'white';

        //this.boxSize = 4 / this.scale;
        //this.iconTypeAt = 0;
        this.switchStatus = true;
        this.text = 'Text Label';
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
        } else {
            //console.info("Adding state with no action: " + theState);
            this.states[theState] = theValue;
        }
        this.refreshUI();
        return true;
    }

    me.refreshUI = refreshUI; 
    function refreshUI(){
        var tmpPerc = this.states.brt || 1;
        this.brtMain.style('opacity', tmpPerc);
        var tmpColor = this.states.color || 'yellow';
        this.brtMain.style('fill', tmpColor);
        this.outMain.style('stroke', tmpColor);
        
        
    }

    me.setSwitchStatus = setSwitchStatus;
    function setSwitchStatus(theStatus){
        this.switchStatus = theStatus;
        this.states["switchStatus"] = theStatus;
        // me.setDisplay(this.sliderWhenOff, !theStatus);
        // me.setDisplay(this.sliderWhenOn, theStatus);
        
    }
    
    me.init = init;

    me.onClick = function (e) {
        console.log("click", e,this);
        ThisApp.common.activeControl = this;
        
        // if (e && e.detail && e.ctrlKey !== true) {
        //     this.setSwitchStatus(!this.switchStatus);
        // }
    }

    me.onContextMenu = function (e) {
        var tmpEl = e.target;
        e.preventDefault();
        this.publish('context',[this]);
       // console.log("onContextMenu", e, tmpEl);
    }

    function init(theParentSVG, theOptions) {
        var dfd = jQuery.Deferred();
        var tmpOptions = theOptions || {};
        tmpOptions.controlName = thisControlName;
        tmpOptions.controlTitle = thisControlTitle;
        tmpOptions.onClick = this.onClick.bind(this);
        tmpOptions.onContextMenu = this.onContextMenu.bind(this);

        this.oid = theOptions.oid || '';
        this.svg = theParentSVG;

        this.svgEl = this.svg;
        
        //--- Call default parent functionality to initialize a control
        var tmpThisControl = this;
        this.initControl(theParentSVG, tmpOptions).then(
            function (theControl) {
                tmpThisControl.frame = theControl.svgNode.select("#frame");
                tmpThisControl.objBody = theControl.svgNode.select("#obj-body");
                // tmpThisControl.labelTitle = theControl.svgNode.select('#labelTitle');
                // tmpThisControl.labelText = theControl.svgNode.select('#labelText');
                                
                tmpThisControl.brtMain = theControl.svgNode.select('#brtMain');
                tmpThisControl.outMain = theControl.svgNode.select('#outMain');
                
                window.tmpCtl = tmpThisControl;
                //tmpThisControl.sliderWhenOn = theControl.svgNode.select("#slide-top-when-on");
                //tmpThisControl.setDisplay(tmpThisControl.sliderWhenOff, false);
                
                dfd.resolve(tmpThisControl);
            }
        );
        return dfd.promise();
    }

    //--- Add This control to the SVG module as available
    SvgMod[thisControlName] = ThisControl;


})(ActionAppCore, $);

