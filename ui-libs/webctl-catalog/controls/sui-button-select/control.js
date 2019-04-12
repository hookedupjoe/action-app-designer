//--- WebControl 
(function (ActionAppCore, $) {
    var WebCtlExtendMod = ActionAppCore.module("WebControls:extension");
    var WebCtlMod = ActionAppCore.module("WebControls:catalog");

    var thisControlName = 'sui-button-select';
    var thisControlTitle = "Semantic Button Select";
    var me = ThisControl.prototype;

    me.specs = {
        name: thisControlName
        , title: thisControlTitle
        , states: {
            appuse: { title: "appuse" },
            floatDirection: { title: "floatDirection" },
            list: { title: "list" },
            action: { title: "action" },
            attribs: { title: "attribs" },
            inverted: {
                title: "Inverted"
                , control: "checkbox"
                , type: "boolean"
                , default: false
            },
            size: {
                title: "Size"
                , control: "select"
                , values: {
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
                , control: 'select'
                , values: {
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
    function refreshUI() {


        var tmpRet = "";

        try {


            var tmpColor = "black";
            var tmpStates = this.states;

            if (tmpStates.color && tmpStates.color !== null) {
                tmpColor = tmpStates.color;
            }

            var tmpStyle = "";
            var tmpFloat = '';
            if (tmpStates.floatDirection && tmpStates.floatDirection !== null) {
                tmpFloat = 'float:' + tmpStates.floatDirection + ';'
            }

            if (tmpFloat) {
                tmpStyle = tmpFloat;
            }

            if (this.designMode) {
                //-- Clear float setting in design mode?
                var tmpBorderColor = "darkgray";
                if (this.designSelected) {
                    tmpBorderColor = "red";
                }
                tmpStyle += ' border:dotted 3px ' + tmpBorderColor;
            }

            if (tmpStyle) {
                tmpStyle = ' style="margin-left:10px;margin-right:10px;' + tmpStyle + '" ';
            }

            var tmpAction = '';
            //--- If not in design mode, add actions
            if (!this.designMode && tmpStates.action && tmpStates.action !== null) {
                tmpAction = ' action="' + tmpStates.action + '" '
            }
            //--- ToDo: Add designer actions?
            //----- Add designer plugins to work with designer action for this control
            //-----  Add WS level general designer plugin stuff

            var tmpAppUse = 'btn-selector';
            if (tmpStates.appuse && tmpStates.appuse !== null) {
                tmpAppUse = tmpStates.appuse;
            }
            var tmpGroupAttr = ' appuse="' + tmpAppUse + '" ';

            var tmpSize = 'medium';
            if (tmpStates.size && tmpStates.size !== null) {
                tmpSize = tmpStates.size;
            }

            //i.e. 'All,Tue,Wed,Thu,Fri';
            var tmpList = '';
            if (tmpStates.list && tmpStates.list !== null) {
                tmpList = tmpStates.list;
            } else {
                console.log("tmpStates", tmpStates);
                this.el.html('<div class="ui message orange">Setup a List selection, comma delim</div>');
                return;
            }

            var tmpListArray = tmpList.split(',');

            var tmpDefaultActive = 0;

            tmpRet += '<div ' + tmpStyle + tmpGroupAttr + ' class="ui ">';
            for (var i = 0; i < tmpListArray.length; i++) {
                var tmpEntry = tmpListArray[i];

                var tmpText = tmpEntry;
                var tmpVal = tmpEntry;

                var tmpVals = tmpEntry.split("|");

                if (tmpVals.length > 1) {
                    tmpText = tmpVals[0].trim();
                    tmpVal = tmpVals[1].trim();
                }

                var tmpBasic = '';
                if (i != tmpDefaultActive) {
                    tmpBasic = ' basic ';
                }
                tmpRet += '<button style="margin:0px;" data-value="' + tmpVal + '" ' + tmpAction + ' class="ui ' + tmpColor + tmpBasic + ' ' + tmpSize + ' button">' + tmpText + '</button>';
            }

            tmpRet += '';
            tmpRet += '';
            tmpRet += '';
            tmpRet += '</div>';

        } catch (ex) {
            tmpRet = "Error " + ex.toString();
        }

        var tmpHTML = tmpRet;

        this.el.html(tmpHTML);
        return;


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
        if (theOptionalAutoRefresh === true) {
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
        this.publish('onContextMenu', [this, tmpOID]);
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
                if (tmpOptions.states) {
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

