(function (ActionAppCore, $) {
    var ExtendMod = ActionAppCore.module("SvgControls:extension");
    var SvgMod = ActionAppCore.module("SvgControls:catalog");

    var thisControlName = 'icon-database';
    var thisControlTitle = "Database Icon";
    var thisControlClass = 'IconDatabase';
    var me = ThisControl.prototype;
    //--- Base class for application pages

    function ThisControl(theOptions) {

        this.options = theOptions || {};
        this.translateX = this.options.translateX || 0;
        this.translateY = this.options.translateY || 0;
        this.scale = this.options.scale || 1;
        //this.boxSize = 4 / this.scale;
        this.iconTypeAt = 0;
        return this;
    }


    $.extend(me, ExtendMod.SvgControl);

    me.iconType = '';
    me.iconTypes = ['', 'client', 'local', 'cloud'];

    me.setState = setState;
    function setState(theState, theValue) {
        if (!theState) {
            return false;
        }
        if (theState == 'iconType') {
            this.setIconType(theValue);
        } else {
            //console.info("Adding state with no action: " + theState);
            this.states[theState] = theValue;
        }
        return true;
    }

    me.setIconType = setIconType;
    function setIconType(theIconType) {
        me.setDisplay(this.iconClientDB, false);
        me.setDisplay(this.iconLocalDB, false);
        me.setDisplay(this.iconCloudDB, false);

        var tmpNewFullWidth = 0;
        if (this.controlEl && this.controlEl.getBBox) {
            tmpNewFullWidth = this.controlEl.getBBox().w
        }

        if (theIconType == 'client') {
            me.setDisplay(this.iconClientDB, true);
        } else if (theIconType == 'local') {
            me.setDisplay(this.iconLocalDB, true);
        } else if (theIconType == 'cloud') {
            me.setDisplay(this.iconCloudDB, true);
        }
        this.iconType = theIconType;
        this.states.iconType = theIconType
    }
    me.actionSpecs = {
        "setIconType": { name: "setIconType", params: { "theIconType": { name: "theIconType", values: me.iconTypes } } }
    };
    me.init = init;

    me.onClick = function (e) {
        //console.log("click", e);
        if (e && e.detail && e.ctrlKey !== true) {
           // if (e.detail > 1) {
                this.iconTypeAt++;
                if (this.iconTypeAt >= me.iconTypes.length) {
                    this.iconTypeAt = 0;
                }
                var tmpNewIconType = me.iconTypes[this.iconTypeAt];
                this.setIconType(tmpNewIconType);
           // }
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
                
                copy: {
                    
                    icon: function(opt, $itemElement, itemKey, item){
                        // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                        $itemElement.html('<div class="ui button purple basic context">Copy</div>');
                        // Add the context-menu-icon-updated class to the item
                        return '';
                    },                   
                    name: "copy",
                    
                    callback: function (key, opt) {
                        var tmpItem = opt.$trigger[0];
                        var tmpElOID = $(tmpItem).attr('oid');
                        console.log("Clicked on " + key + " for oid: " + tmpElOID, tmpItem);
                    }
                },
                pause: {
                   
                    icon: function(opt, $itemElement, itemKey, item){
                        // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                        $itemElement.html('<div class="ui button basic blue context"><i class="pause icon"></i>Pause with a long title</div>');
                        // Add the context-menu-icon-updated class to the item
                        return '';
                    },                   
                    name: "pause",
                    
                    callback: function (key, opt) {
                        var tmpItem = opt.$trigger[0];
                        var tmpElOID = $(tmpItem).attr('oid');
                        console.log("Clicked on " + key + " for oid: " + tmpElOID, tmpItem);
                    }
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
                tmpThisControl.iconDB = theControl.svgNode.select("#icon-database");
                tmpThisControl.iconClientDB = theControl.svgNode.select("#icon-window");
                tmpThisControl.iconLocalDB = theControl.svgNode.select("#icon-server");
                tmpThisControl.iconCloudDB = theControl.svgNode.select("#icon-cloud");
                me.setDisplay(tmpThisControl.iconClientDB, false);
                me.setDisplay(tmpThisControl.iconLocalDB, false);
                me.setDisplay(tmpThisControl.iconCloudDB, false);

                dfd.resolve(tmpThisControl);
            }
        );
        return dfd.promise();
    }

    //--- Add This control to the SVG module as available
    SvgMod[thisControlName] = ThisControl;


})(ActionAppCore, $);

