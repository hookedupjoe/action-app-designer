(function (ActionAppCore, $) {
    var ExtendMod = ActionAppCore.module("SvgControls:extension");
    var SvgMod = ActionAppCore.module("SvgControls:catalog");

    var thisControlName = 'color-wheel';
    var thisControlTitle = "Color Wheel";
    var thisControlClass = 'ColorWheel';
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
            //console.info("Adding state with no action: " + theState);
            this.states[theState] = theValue;
        }
        return true;
    }

    me.setSwitchColor = setSwitchColor;
    function setSwitchColor(theValue){
        //this.colorBack.style('fill',theValue )
        this.switchColor = theValue;
        this.states["switchColor"] = theValue;        
    }
    me.setSwitchStatus = setSwitchStatus;
    function setSwitchStatus(theStatus){
        this.switchStatus = theStatus;

        if( theStatus ){
            //this.colorBack.style('opacity', 1)
        } else {
            //this.colorBack.style('opacity', 0)
        }
        
        this.states["switchStatus"] = theStatus;
    }
    
    me.init = init;

    me.onClick = function (e) {
        console.log("click", e);
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
                        $itemElement.html('<button class="ui icon button blue basic context">Change Color</button>');
                        // Add the context-menu-icon-updated class to the item
                        return '';
                    },                   
                    name: "toggle",
                    
                    callback: (function (key, opt) {
                        //this.setSwitchStatus(!this.switchStatus);
                        var tmpNew = '';
                        if( this.switchColor == '#ff0000'){
                            tmpNew = '#0000ff'
                        } else {
                            tmpNew = '#ff0000'
                        }
                        this.setSwitchColor(tmpNew);
                        // var tmpItem = opt.$trigger[0];
                        // console.log('tmpItem',tmpItem)
                        // var tmpEl = $('#btn-round-glossy-color-stop');
                        // var tmpE2 = $('#btn-round-glossy-maincircle');
                        // var tmpE2El = document.getElementById('btn-round-glossy-maincircle');
                        // console.log("tmpE2El",tmpE2El);
                        // var tmpNewHR = "#btn-round-glossy-mainColorGradient-002";
                        // tmpE2.attr("xlink:href",'');
                        // console.log("tmpEl",tmpEl.attr('style'));
                        // //tmpEl.attr('style','stop-color:#d4005b;stop-opacity:1');
                        // //console.log("tmpEl",tmpEl.attr('style'));
                        // this.setSwitchColor('#0000ff');
                        
                        // //var tmpItem = opt.$trigger[0];
                        // //var tmpElOID = $(tmpItem).attr('oid');
                        // //console.log("Clicked on " + key + " for oid: " + tmpElOID, tmpItem);
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
                        //this.setSwitchColor('#00ff00');
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
                        //this.setSwitchColor('#aaaaaa');
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
                tmpThisControl.colorBack = theControl.svgNode.select("#result");
                tmpThisControl.wheel = theControl.svgNode.select("#wheel");
                
                dfd.resolve(tmpThisControl);
            }
        );
        return dfd.promise();
    }

    //--- Add This control to the SVG module as available
    SvgMod[thisControlName] = ThisControl;


})(ActionAppCore, $);

