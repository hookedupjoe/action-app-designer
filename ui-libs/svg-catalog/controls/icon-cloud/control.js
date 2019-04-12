//--- SvgControl Base Object - Functionality for all SvgControls
(function (ActionAppCore, $) {
    var SvgExtendMod = ActionAppCore.module("SvgControls:extension");
    var SvgMod = ActionAppCore.module("SvgControls:catalog");

    var thisControlName = 'icon-cloud';
    var thisControlTitle = "Cloud Icon";
    var thisControlClass = 'IconCloud';

    //--- Base class for application pages
    function ThisControl(theOptions) {
        this.options = theOptions || {};
        this.translateX = this.options.translateX || 0;
        this.translateY = this.options.translateY || 0;
        this.scale = this.options.scale || 1;
        return this;
    }
    var me = ThisControl.prototype;
    //console.log("SvgExtendMod.SvgControl",SvgExtendMod.SvgControl);
    $.extend(me, SvgExtendMod.SvgControl);

    me.init = init;
    
    function init(theParentSVG, theOptions) {
        var dfd = jQuery.Deferred();
        var tmpOptions = theOptions || {};
        tmpOptions.controlName = thisControlName;
        tmpOptions.controlTitle = thisControlTitle;

        var tmpThisControl = this;
        this.oid = theOptions.oid || '';
        this.svg = theParentSVG;

        //--- Call default parent functionality to initialize a control
        var tmpPromise = this.initControl(theParentSVG, tmpOptions).then(
            function (theControl) {
                tmpThisControl.frame = theControl.svgNode.select("#frame");
                dfd.resolve(tmpThisControl);
            }
        );
        //do other stuff if needed
        return dfd.promise();

    }
    //--- Add This control to the SVG module as available
    SvgMod[thisControlName] = ThisControl;
    //SvgMod[thisControlClass] = ThisControl;

    // SvgControlsManager.registerControl(thisControlName, function () {
    //     return new SvgMod[thisControlClass];
    // })


})(ActionAppCore, $);

