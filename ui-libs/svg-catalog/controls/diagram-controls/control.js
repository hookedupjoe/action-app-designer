//--- SvgControl Base Object - Functionality for all SvgControls
(function (ActionAppCore, $) {
    var SvgExtendMod = ActionAppCore.module("SvgControls:extension");
    var SvgMod = ActionAppCore.module("SvgControls:catalog");

    var thisControlName = 'diagram-controls';
    var thisControlTitle = "Diagram Controls";
    var thisControlClass = 'DiagramControls';
    var me = ThisControl.prototype;
    //--- Base class for application pages

    function ThisControl(theOptions) {

        this.options = theOptions || {};
        this.translateX = this.options.translateX || 0;
        this.translateY = this.options.translateY || 0;
        this.scale = this.options.scale || 1;
        this.boxSize = 4 / this.scale;

        return this;
    }


    $.extend(me, SvgExtendMod.SvgControl);

    me.iconType = 'large-box';
    me.iconTypes = ['large-box', 'medium-box', 'small-box', 'full-panel-box', 'button-with-text', 'human-actor', 'plain-box', 'ellipse'];
    me.iconNames = ['controlLargeBox', 'controlMediumBox', 'controlSmallBox', 'controlFullPanelBox', 'controlButtonWithText', 'controlHumanActor', 'controlPlainBox', 'controlEllipse'];


    me.setIconType = setIconType;
    function setIconType(theIconType) {
        //console.log("setIconType", this)
        var tmpLen = me.iconTypes.length;
        for (var i = 0; i < tmpLen; i++) {
            var tmpObj = this.iconObjects[i];
            me.setDisplay(tmpObj, false);
        }

    
        // var tmpNewFullWidth = this.origBox.w;
        // var tmpNewScale2 = 1;
        var tmpPos = me.iconTypes.indexOf(theIconType);
        if (tmpPos >= 0) {
            var tmpEl = this.iconObjects[tmpPos];            
            var tmpData =tmpEl.data;
            if( typeof(tmpEl.node) == 'function' ){
                tmpEl = tmpEl.node();
            }
            
            me.setDisplay(this.iconObjects[tmpPos], true);
        }

      /*  */
        this.iconType = theIconType;

    }
    me.actionSpecs = {
        "setIconType": { name: "setIconType", params: { "theIconType": { name: "theIconType", values: me.iconTypes } } }
    };
    me.init = init;



    me.onContextMenu = function (e) {
        var tmpEl = e.target;
        //e.preventDefault();
        // console.log("onContextMenu", e, tmpEl);
        var tmpParentEl = $(tmpEl).closest('[oid]');
        var tmpOID = tmpParentEl.attr('oid');


        $.contextMenu({
            selector: '[oid="' + tmpOID + '"]',
            items: {

                copy: {

                    icon: function (opt, $itemElement, itemKey, item) {
                        // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                        $itemElement.html('<div class="ui fluid button  purple basic">Copy</div>');
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

                    icon: function (opt, $itemElement, itemKey, item) {
                        // Set the content to the menu trigger selector and add an bootstrap icon to the item.
                        $itemElement.html('<div class="ui basic green vertical labeled icon buttons"><button class="ui button"><i class="pause icon"></i>Pause with a long title</button></div>');
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

        /*
        $(tmpEl).closest('div')
       
            .popup({
                on: 'click',
                closable:true,
                onHide: function(){
                    setTimeout(function(){
                       // console.log('destory',tmpEl);
                        $(tmpEl).closest('div').popup('destroy')  
                    },10);
                },
                html: '<div class="ui vertical menu">  <a class="item">    <h4 class="ui header">Promotions</h4>    <p>Check out our new promotions</p>  </a>  <a class="item">    <h4 class="ui header">Coupons</h4>    <p>Check out our collection of coupons</p>  </a>  <a class="item"><h4 class="ui header">Rebates</h4>    <p>Visit our rebate forum for information on claiming rebates</p></a></div>'
            }).popup('show');
       
            */

    }

    function init(theParentSVG, theOptions) {
        var dfd = jQuery.Deferred();
        var tmpOptions = theOptions || {};

        this.iconTypeAt = 0;
        this.iconObjects = [];

        function tmpOnClick(e) {
           // console.log("click", e);
            if (e && e.detail && e.ctrlKey !== true) {
                if (e.detail > 1) {
                    this.iconTypeAt++;
                    if (this.iconTypeAt >= me.iconTypes.length) {
                        this.iconTypeAt = 0;
                    }
                    var tmpNewIconType = me.iconTypes[this.iconTypeAt];
                    this.setIconType(tmpNewIconType);
                }
            }
        }

        tmpOptions.controlName = thisControlName;
        tmpOptions.controlTitle = thisControlTitle;
        tmpOptions.onClick = tmpOnClick.bind(this);
        tmpOptions.onContextMenu = this.onContextMenu.bind(this);

        this.oid = theOptions.oid || '';
        this.svg = theParentSVG;

        //--- Call default parent functionality to initialize a control
        var tmpThisControl = this;
        var tmpPromise = this.initControl(theParentSVG, tmpOptions).then(
            function (theControl) {
                tmpThisControl.frame = theControl.svgNode.select("#frame");

                var tmpLen = me.iconTypes.length;
                for (var i = 0; i < tmpLen; i++) {
                    var tmpName = me.iconNames[i];
                    var tmpType = me.iconTypes[i];
                    var tmpNewObj = theControl.svgNode.select("#" + tmpType);
                    tmpThisControl[tmpName] = tmpNewObj
                    var tmpBB = tmpNewObj.node().getBBox();
                    tmpNewObj.data = {bb:tmpBB};
                    tmpThisControl.iconObjects.push(tmpNewObj);
                }

                tmpThisControl.setIconType(tmpThisControl.iconType);
                dfd.resolve(tmpThisControl);
            }
        );
        return dfd.promise();
    }

    //--- Add This control to the SVG module as available
    SvgMod[thisControlName] = ThisControl;
    
    // SvgMod[thisControlClass] = ThisControl;

    // SvgControlsManager.registerControl(thisControlName, function () {
    //     return new SvgMod[thisControlClass];
    // })


})(ActionAppCore, $);

