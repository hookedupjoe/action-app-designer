//--- WebControl 
(function (ActionAppCore, $) {
    var WebCtlExtendMod = ActionAppCore.module("WebControls:extension");
    var WebCtlMod = ActionAppCore.module("WebControls:catalog");

    var thisControlName = 'sui-icon';
    var thisControlTitle = "Semantic UI Icon";
    var me = ThisControl.prototype;
    
    me.specs = {
        name: thisControlName
        ,title: thisControlTitle
        ,states: {
            icon: {
                title: "Icon"
                ,control: "text"
                ,type: "string"
                ,default: 'user'
            },
            bordered: {
                title: "Bordered"
                ,control: "checkbox"
                ,type: "boolean"
                ,default: true
            },
            inverted: {
                title: "Inverted"
                ,control: "checkbox"
                ,type: "boolean"
                ,default: false
            },
            size: {
                title: "Size"
                ,control: "select"
                ,values: {
                    "mini": "Mini",
                    "tiny": "Tiny",
                    "small": "Small",
                    " ": "Default",
                    "large": "Large",
                    "big": "Big",
                    "huge": "Huge",
                    "massive": "Massive"
                }
            },
            color: {
                title: 'Color'
                ,control: 'select'
                ,values: {
                    "red": "Red",
                    "orange": "Orange",
                    "yellow": "Yellow",
                    "olive": "Olive",
                    "green": "Green",
                    "teal": "Teal",
                    "blue": "Blue",
                    "violet": "Violet",
                    "purple": "Purple",
                    "pink": "Pink",
                    "brown": "Brown",
                    "grey": "Grey",
                    "black": "Black"
                }
            }
        }
    }

    //--- Base class for application pages
    function ThisControl(theOptions) {
       
    }
    
    $.extend(me, WebCtlExtendMod.WebControl);
    
    me.refreshUI = refreshUI;
    function refreshUI(){
        var tmpHTML = 'icon ';
        if( this.states.size ){
            tmpHTML+= ' ' + this.states.size;
        }
        if( this.states.icon ){
            tmpHTML+= ' ' + this.states.icon;
        }
        if( this.states.color ){
            tmpHTML+= ' ' + this.states.color;
        }
        if( this.states.bordered ){
            tmpHTML+= ' bordered';
        }
        if( this.states.inverted === true ){
            tmpHTML+= ' inverted';
        }

        tmpHTML = '<i class="' + tmpHTML + '"></i>';
        console.log("render",tmpHTML)
        
        
        if( this.designMode ){
            if( this.designSelected ){
                tmpHTML = '<div style="border:solid 3px red;float:left;">' + tmpHTML + '</div>';
            } else {
                tmpHTML = '<div style="border:solid 3px darkgray;float:left;">' + tmpHTML + '</div>';
            }
        }

        this.el.html(tmpHTML);

        console.log("this.designMode",this.designMode)
        //console.log("parentWS",this.parentWS,this);
        
    }


    me.init = init;

    

    me.setState = setState;
    function setState(theState, theValue, theOptionalAutoRefresh) {
        if (!theState) {
            return false;
        }
        // if (theState == 'something') {
        //     this.dosomethingwith(theValue);
        // }
        //--- Always saves in states
        this.states[theState] = theValue;
        if( theOptionalAutoRefresh === true){
            this.refreshUI();
        }
        
        return true;
    }

    me.onClick = function (e) {
        
        if (e && e.detail && e.ctrlKey !== true && e.altKey !== true) {
            //this.publish('onClick',[this]);

//--- To trigger context menu ...
            //this.onContextMenu({trigger:'left'});

//--- To effect yourself ...
            // if( this.states.size == 'large'){
            //     this.states.size = 'huge';
            // } else {
            //     this.states.size = 'large';
            // }
            // this.refreshUI();
        }
    }

    me.onContextMenu = onContextMenu;
    function onContextMenu(theOptions) {
        var tmpParentEl = this.el;
        var tmpOID = tmpParentEl.attr('oid');
        this.publish('onContextMenu',[this,tmpOID]);
    }

    function init(theParentContainer, theOptions, theParentWS) {
        var dfd = jQuery.Deferred();
        var tmpOptions = theOptions || {};
        this.parentWS = theParentWS;
        tmpOptions.controlName = thisControlName;
        tmpOptions.controlTitle = thisControlTitle;

        //--- Here we can optionally hook into the click and context menus
        tmpOptions.onClick = this.onClick.bind(this);
        tmpOptions.onContextMenu = this.onContextMenu.bind(this);

        this.options = theOptions || {};
     
        
        this.oid = theOptions.oid || '';
        this.container = theParentContainer;
        this.container$ = $(this.container);
        //--- Call default parent functionality to initialize a control
        var tmpThisControl = this;
        this.initControl(theParentContainer, tmpOptions).then(
            function (theControl) {
                //theControl.el is the base jQuery element
                //theControl._el is the base raw element, same as .el.get();
                //tmpThisControl.demoSomethings = theControl.el.find("div");
                
                //--- Set all states and then call refreshUI for best performance
                if( tmpOptions.states ){
                    $.extend(tmpThisControl.states, tmpOptions.states);
                }
                tmpThisControl.refreshUI();
                
                // for( var aSN in tmpOptions ){
                //     tmpThisControl.setState(aSN, tmpOptions[aSN])
                // }

                dfd.resolve(tmpThisControl);
            }
        );
        return dfd.promise();
    }
   //--- Add This control to the Web Control module as available
   WebCtlMod[thisControlName] = ThisControl;

})(ActionAppCore, $);

