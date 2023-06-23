(function (ActionAppCore, $) {

    var ControlSpecs = {
        options: {
            padding: false
        },
        content: [{
            "ctl": "layout",
            "attr": {
                "rem-template": "none"
            },
            "name": "lo",
            "north": [
                {
                    ctl: 'control',
                    controlname: 'MainHeader',
                    name: 'appheader',
                    catalog: '_designer'
                },
                {
                    ctl: 'divider',
                    name: 'headdiv',
                    fitted: true
                },
                {
                    ctl: 'div',
                    name: 'toolbar',
                    classes: 'pad5',
                    content: [{ ctl: 'button', color: 'blue', text: 'Testing' }]
                }],
            "disabled_east": [{
                "ctl": "segment",
                "basic": true,
                "slim": true,
                "content": [{
                    "ctl": "segment",
                    "color": "blue",
                    content: [{
                        "ctl": "spot",
                        "name": "preview"
                    }]
                }]
            }],
            "center": [{
                ctl: 'spot',
                name: 'designer'
            }],
            "west": [{
                ctl: 'spot',
                name: 'resources'
            }],
            "south": [{
                "ctl": "ui",
                "name": "footer-toolbar",
                "classes": "labeled icon compact pad0",
                "content": [
                    {
                        ctl: "div",
                        classes: "item",
                        text: '<span class="table-footer one-liner" myspot="selected-count">Status Bar here</span>'
                    }]
            }]
        }]
    }

    var ControlCode = {};
    //--- Do not edit or place code above this area (only JSON ControlSpecs Edit)
    //--- ActAppDesigner ---: No Edit

    ControlCode.setup = setup;
    function setup(theOptions) {
        var tmpOptions = theOptions || {};
        this.options = tmpOptions;
        this.parts.appheader.setText(this.options.title);
        var tmpCloseHTML = '<div class="ui button basic black compact icon" tab="' + this.options.name + '" myaction="closeTabRequest" ><i class="icon window close large"></i></div>';
        this.parts.appheader.addSideContent(tmpCloseHTML)
    }

    
    ControlCode.closeTabRequest = closeTabRequest;
    function closeTabRequest() {
        this.publish('tabAction', [this, 'close'])
    }    

    ControlCode._onInit = _onInit;
    function _onInit() {
        //console.log("Ran _onInit");



    }

    //--- ActAppDesigner ---: No Edit
    //--- Do not edit or place code below this area
    var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };
    return ThisControl;
})(ActionAppCore, $);