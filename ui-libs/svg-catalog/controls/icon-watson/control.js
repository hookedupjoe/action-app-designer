//--- SvgControl Base Object - Functionality for all SvgControls
(function (ActionAppCore, $) {
    var SvgExtendMod = ActionAppCore.module("SvgControls:extension");
    var SvgMod = ActionAppCore.module("SvgControls:catalog");

    var thisControlName = 'icon-watson';
    var thisControlTitle = "Watson Icon";
    var thisControlClass = 'IconWatson';
    var me = ThisControl.prototype;
    //--- Base class for application pages

    function ThisControl() {
        return this;
    }


    $.extend(me, SvgExtendMod.SvgControl);

    me.setSliderValue = setSliderValue;
    function setSliderValue(theValue) {
        var tmpPos = theValue;
        try {
            if (typeof (tmpPos) == 'string') {
                tmpPos = parseInt(tmpPos);
            }
        } catch (ex) {
            console.error("Error setting slider pos to " + theValue);
            return false;
        }
        this.sliderValue = tmpPos
        for (var i = 1; i <= 5; i++) {
            var tmpRay = this['ray' + i];
            if (i > this.sliderValue) {
                tmpRay.attr('fill', this.defaultColor);
            } else {
                tmpRay.attr('fill', this.highlightColor);
            }
        }
        this.states.sliderValue = this.sliderValue;
    }

    me.actionSpecs = {
        "setSliderValue": { name: "setSliderValue", params: { "theValue": { name: "theValue" } } }
    };
    me.init = init;

    //@Override
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

        if (e && e.detail && e.ctrlKey !== true && e.altKey !== true) {

            //console.log("Click");
            var tmpNewValue = this.sliderValue + 1;
            if (tmpNewValue > 5) {
                tmpNewValue = 0;
            }
            this.setSliderValue(tmpNewValue);
        }

    }

    me.onContextMenu = function (e) {
        var tmpEl = e.target;
        //e.preventDefault();
        // console.log("onContextMenu", e, tmpEl);
        var tmpParentEl = $(tmpEl).closest('[oid]');
        var tmpOID = tmpParentEl.attr('oid');


        $.contextMenu({
            selector: '[oid="' + tmpOID + '"]',
            items: {

                totop: {

                    icon: function (opt, $itemElement, itemKey, item) {
                        // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                        $itemElement.html('<button class="ui icon button purple basic context">Bring to top</button>');
                        // Add the context-menu-icon-updated class to the item
                        return '';
                    },
                    name: "totop",

                    callback: function (key, opt) {
                        var tmpItem = opt.$trigger[0];
                        var tmpElOID = $(tmpItem).attr('oid');
                        var tmpParentEl = $(tmpItem).closest('svg');

                        this.svgEl.appendChild(tmpParentEl[0]);

                        //svg.appendChild(e.target); xxx
                        console.log("Clicked on " + key + " for oid: " + tmpElOID, tmpParentEl);
                    }.bind(this)
                },
                reset: {

                    icon: function (opt, $itemElement, itemKey, item) {
                        // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                        $itemElement.html('<button class="icon ui button blue basic context">Reset</button>');
                        // Add the context-menu-icon-updated class to the item
                        return '';
                    },
                    name: "reset",

                    callback: function (key, opt) {
                        this.loadStates({sliderValue:0});
                    }.bind(this)
                }, pause: {

                    icon: function (opt, $itemElement, itemKey, item) {
                        // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                        $itemElement.html('<button class="icon ui button red basic context"><i class="delete icon"></i>&#160;Remove Me</button>');
                        // Add the context-menu-icon-updated class to the item
                        return '';
                    },
                    name: "pause",

                    callback: function (key, opt) {
                        var tmpItem = opt.$trigger[0];
                        var tmpElOID = $(tmpItem).attr('oid');
                        this.parentWS.removeControl(tmpElOID);
                        console.log("Clicked on " + key + " for oid: " + tmpElOID, this.parentWS);

                        //$(tmpItem).remove();
                    }.bind(this)
                }
            }
        });


    }

    function init(theParentSVG, theOptions) {
        var dfd = jQuery.Deferred();
        var tmpOptions = theOptions || {};
        this.options = tmpOptions;

        tmpOptions.controlName = thisControlName;
        tmpOptions.controlTitle = thisControlTitle;
        tmpOptions.onClick = this.onClick.bind(this);
        tmpOptions.onContextMenu = this.onContextMenu.bind(this);

        this.oid = theOptions.oid || '';
        this.svg = theParentSVG;
        this.svgEl = this.svg;
        this.svg$ = $(this.svgEl);

        this.translateX = this.options.translateX || 0;
        this.translateY = this.options.translateY || 0;
        this.scale = this.options.scale || .35;
        this.boxSize = 4 / this.scale;
        this.sliderValue = 0;
        this.defaultColor = 'black';
        this.highlightColor = 'red';

        tmpOptions.translateX = this.translateX;
        tmpOptions.translateY = this.translateY;
        tmpOptions.scale = this.scale;

        //--- Call default parent functionality to initialize a control
        var tmpThisControl = this;
        var tmpPromise = this.initControl(theParentSVG, tmpOptions).then(
            function (theControl) {
                tmpThisControl.globe = theControl.svgNode.select("#globe");
                tmpThisControl.ray1 = theControl.svgNode.select("#ray1");
                tmpThisControl.ray2 = theControl.svgNode.select("#ray2");
                tmpThisControl.ray3 = theControl.svgNode.select("#ray3");
                tmpThisControl.ray4 = theControl.svgNode.select("#ray4");
                tmpThisControl.ray5 = theControl.svgNode.select("#ray5");

                dfd.resolve(tmpThisControl);
            }
        );
        return dfd.promise();
    }

    //--- Add This control to the SVG module as available
    //console.log("registered control " + thisControlClass)
    SvgMod[thisControlName] = ThisControl;

    // SvgControlsManager.registerControl(thisControlName, function () {
    //     return new SvgMod[thisControlClass];
    // })


})(ActionAppCore, $);

