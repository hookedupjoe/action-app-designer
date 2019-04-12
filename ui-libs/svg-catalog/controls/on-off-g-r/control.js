(function (ActionAppCore, $) {
    var ExtendMod = ActionAppCore.module("SvgControls:extension");
    var SvgMod = ActionAppCore.module("SvgControls:catalog");

    var thisControlName = 'on-off-g-r';
    var thisControlTitle = "On Off - Green Red";
    var thisControlClass = 'SwitchOnOffGreenRed';
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
        } else {
            //console.info("Adding state with no action: " + theState);
            this.states[theState] = theValue;
        }
        return true;
    }


    me.setSwitchStatus = setSwitchStatus;
    function setSwitchStatus(theStatus){
        this.switchStatus = theStatus;
        this.states["switchStatus"] = theStatus;
        me.setDisplay(this.sliderWhenOff, !theStatus);
        me.setDisplay(this.sliderWhenOn, theStatus);
    }
    
    me.init = init;

    me.onClick = function (e) {
        //console.log("click", e);
        if (e && e.detail && e.ctrlKey !== true) {
            this.setSwitchStatus(!this.switchStatus);
        }
    }

    me.onContextMenu = function (e) {
        var tmpEl = e.target;
        //e.preventDefault();
        // console.log("onContextMenu", e, tmpEl);
        var tmpParentEl = $(tmpEl).closest('[oid]');
        var tmpOID = tmpParentEl.attr('oid');
        
       
        $.contextMenu({
            selector:'[oid="' + tmpOID + '"]',
            items: {
                
                toggle: {
                    
                    icon: function(opt, $itemElement, itemKey, item){
                        // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                        $itemElement.html('<button class="ui icon button blue basic context">Toggle</button>');
                        // Add the context-menu-icon-updated class to the item
                        return '';
                    },                   
                    name: "toggle",
                    
                    callback: (function (key, opt) {
                        this.setSwitchStatus(!this.switchStatus);
                        //var tmpItem = opt.$trigger[0];
                        //var tmpElOID = $(tmpItem).attr('oid');
                        //console.log("Clicked on " + key + " for oid: " + tmpElOID, tmpItem);
                    }).bind(this)
                },
                turnon: {
                    
                    icon: function(opt, $itemElement, itemKey, item){
                        // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                        $itemElement.html('<button class="ui icon button green basic context">On</button>');
                        // Add the context-menu-icon-updated class to the item
                        return '';
                    },                   
                    name: "turnon",
                    
                    callback: (function (key, opt) {
                        this.setSwitchStatus(true);
                        //var tmpItem = opt.$trigger[0];
                        //var tmpElOID = $(tmpItem).attr('oid');
                        //console.log("Clicked on " + key + " for oid: " + tmpElOID, tmpItem);
                    }).bind(this)
                },
                turnoff: {
                   
                    icon: function(opt, $itemElement, itemKey, item){
                        // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                        $itemElement.html('<button class="ui icon button red basic context">Off</button>');
                        // Add the context-menu-icon-updated class to the item
                        return '';
                    },                   
                    name: "turnoff",
                    
                    callback: (function (key, opt) {
                        this.setSwitchStatus(false);
                        // var tmpItem = opt.$trigger[0];
                        // var tmpElOID = $(tmpItem).attr('oid');
                        // console.log("Clicked on " + key + " for oid: " + tmpElOID, tmpItem);
                    }).bind(this)
                }
            }
        });


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
        var tmpPromise = this.initControl(theParentSVG, tmpOptions).then(
            function (theControl) {
                tmpThisControl.frame = theControl.svgNode.select("#frame");
                tmpThisControl.objBody = theControl.svgNode.select("#obj-body");
                tmpThisControl.sliderWhenOff = theControl.svgNode.select("#slide-top-when-off");
                tmpThisControl.sliderWhenOn = theControl.svgNode.select("#slide-top-when-on");
                tmpThisControl.setDisplay(tmpThisControl.sliderWhenOff, false);
                dfd.resolve(tmpThisControl);
            }
        );
        return dfd.promise();
    }

    //--- Add This control to the SVG module as available
    SvgMod[thisControlName] = ThisControl;


})(ActionAppCore, $);

