/*
 *  Send bulk data from CSV to NoSQL Database
 */
'use strict';

const THIS_MODULE_NAME = 'test-button';
const THIS_MODULE_TITLE = 'Demo - get button from JSON Template';

module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;

    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }
    var base = Route.prototype;
    //==== End of common setup - add special stuff below
    //--- must have a "run" method *** 
    
    var $ = config.locals.$;

    //--- Load the prototype
    base.run = function (req, res, next) {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {
                var tmpHTML = [];
                tmpHTML.push('<h2>Hello World</h3><p>');
                var tmpBtnObj = {
                    "ctl": "button",
                    "toright": true,
                    "color": "blue",
                    "size": "large",
                    "onClick": {
                        "run": "publish",
                        "event": "submit",
                        "validate": true
                    },
                    "labeled": true,
                    "right": true,
                    "icon": "arrow right",
                    "name": "btn-submit",
                    "text": "Submit Form"
                };
                var tmpBtnHTML = ControlButton.getHTML('button', tmpBtnObj, {});
                tmpHTML.push(tmpBtnHTML);
                tmpHTML.push('</p>');
                resolve(tmpHTML.join(''));
            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }

        }));



    }



    
    //----   COMMON ITEM CONTROLS =================================

    var ControlButton = {
        getInfo: function (theControlName) {

            var tmpProps = getCommonControlProperties(['color', 'size', 'icon', 'hidden', 'compact']);
            var tmpRet = {
                name: theControlName,
                title: "Semantic Message Control",
                category: "Common Items",
                properties: tmpProps
            };


            return tmpRet;
        },
        getHTML: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};

            var tmpHTML = [];
            var tmpLevel = 3;
            if (theObject.level) {
                tmpLevel = theObject.level
            }
            var tmpHidden = '';
            if (tmpObject.hidden === true) {
                tmpHidden = 'display:none;';
            }
            var tmpStyle = tmpObject.style || tmpObject.styles || tmpObject.css || '';
            if (tmpHidden) {
                tmpStyle += tmpHidden;
            }
            if (tmpStyle) {
                tmpStyle = ' style="' + tmpStyle + '" '
            }

            var tmpClasses = ''
            tmpClasses += getValueIfTrue(theObject, ['basic', 'compact', 'fluid', 'right', 'labeled', 'circular']);
            tmpClasses += getValueIfThere(theObject, ['color', 'size', 'floated']);

            if (tmpObject.toright === true) {
                tmpClasses += ' right floated'
            } else if (tmpObject.toleft === true) {
                tmpClasses += ' left floated'
            }


            if (tmpObject.icon || tmpObject.labeled) {
                tmpClasses += ' icon ';
            }

            var tmpAction = '';
            if (tmpObject.action) {
                if (isStr(tmpObject.action)) {
                    tmpAction = ' action="' + tmpObject.action.trim() + '" ';
                } else {
                    //--- If function, run it
                }
            } else if (isStr(tmpObject.pageaction)) {
                tmpAction = ' pageaction="' + tmpObject.pageaction.trim() + '" ';
            }
            tmpHTML.push('<button ' + tmpAction + getItemAttrString(theObject) + ' class="ui button ' + tmpClasses + ' " ' + tmpStyle + '>')

            if (tmpObject.icon && !(tmpObject.right)) {
                tmpHTML.push('<i class="' + tmpObject.icon + ' icon"></i> ');
            }

            tmpHTML.push(tmpObject.text || tmpObject.label  || tmpObject.title || '')

            if (tmpObject.icon && tmpObject.right) {
                tmpHTML.push(' <i class="' + tmpObject.icon + ' icon"></i>');
            }

            var tmpItems = tmpObject.items || tmpObject.content || [];
            tmpHTML.push(getContentHTML(theControlName, tmpItems, theControlObj))

            tmpHTML.push('</button>')
            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false
    }


    function getValueIfTrue(theObject, theParamName) {
        var tmpParams = theParamName;
        var tmpRet = '';
        if (isStr(tmpParams)) {
            tmpParams = [tmpParams];
        }
        for (var iPos = 0; iPos < tmpParams.length; iPos++) {
            var tmpParamName = tmpParams[iPos];
            if (theObject[tmpParamName] === true) {
                var tmpClassName = tmpParamName;
                tmpRet += (' ' + tmpClassName + '')
            }
        }
        return tmpRet
    }

    function getValueIfThere(theObject, theParamName) {

        var tmpParams = theParamName;
        var tmpRet = '';
        if (isStr(tmpParams)) {
            tmpParams = [tmpParams];
        }
        for (var iPos = 0; iPos < tmpParams.length; iPos++) {
            var tmpParamName = tmpParams[iPos];
            if (isStr(theObject[tmpParamName])) {
                tmpRet += (' ' + theObject[tmpParamName] + '').toLowerCase();
            }
        }
        return tmpRet
    }



    function getNumName(theNumber) {
        if (theNumber > 0 || theNumber < 9) {
            return numLookup[theNumber];
        }
        return ""
    }
    function isStr(theItem) {
        return (typeof (theItem) == 'string')
    }
    function isFunc(theItem) {
        return (typeof (theItem) == 'function')
    }
    function isObj(theItem) {
        return (typeof (theItem) == 'object')
    }

    //--- Returns 'controls item and name="youritemname" ' if your item has a name
    //---   this is so you can get any item that has a name in the contorl, 
    //...   but not include markup when not needed
    //---   This also gets any attr values and includes them since that is common to items
    function getItemAttrString(theObject) {
        var tmpRet = '';
        if (!(theObject)) { return '' };
        var tmpName = theObject.name || '';

        var tmpAttr = '';
        if (isObj(theObject.attr)) {
            for (var aName in theObject.attr) {
                var tmpAttrVal = theObject.attr[aName];
                tmpAttr += ' ' + aName + '="' + tmpAttrVal + '"';
            }
        } else if (isStr(theObject.attr)) {
            tmpAttr += ' ' + theObject.attr + ' ';
        }

        tmpAttr = tmpAttr + ' controls item ';
        if (tmpName) {
            tmpName = ' name="' + tmpName + '" ';
        }
        tmpRet += tmpAttr + tmpName;

        return tmpRet

    }

    function getListAsObjects(theList) {
        var tmpList = getListAsArrays(theList);
        var tmpRet = []

        if (tmpList && tmpList.length > 0) {
            for (var index = 0; index < tmpList.length; index++) {
                var tmpEntry = tmpList[index] || '';
                if (tmpEntry) {
                    var tmpText = tmpEntry;
                    var tmpVal = tmpEntry;
                    if (!isStr(tmpEntry) && tmpEntry.length == 2) {
                        //--- This is an array, get values
                        tmpText = tmpEntry[0]
                        tmpVal = tmpEntry[1]
                    }
                    tmpRet.push(
                        {
                            name: tmpText,
                            value: tmpVal,
                            text: tmpText
                        }
                    )

                }
            }
        }
        return tmpRet;

    }
    function getListAsArrays(theList) {
        var tmpList = theList;
        if (isStr(tmpList)) {
            tmpList = tmpList.split(",");
        }
        if (tmpList && tmpList.length > 0) {
            for (var index = 0; index < tmpList.length; index++) {
                var tmpEntry = tmpList[index] || '';
                if (tmpEntry) {
                    if (isStr(tmpEntry)) {
                        var tmpVals = tmpEntry.split("|");
                        //--- If we have alias values, add them as an array
                        //--    if not, leave the string value there as is
                        if (tmpVals.length > 1) {
                            tmpList[index] = tmpVals
                        }
                    }
                }
            }
        }
        return tmpList;

    }

    function getContentHTML(theControlName, theItems, theControlObj) {
        var tmpHTML = [];
        var tmpItems = theItems || [];
        if (!(tmpItems && tmpItems.length)) {
            return '';
        }

        for (var iPos = 0; iPos < tmpItems.length; iPos++) {
            var tmpItem = tmpItems[iPos];
            var tmpCtl = tmpItem.ctl || 'field'
            if (tmpCtl == 'tabs') {
                var tmpTabs = [];
                var tmpTabName = tmpItem.name || 'tabs';
                tmpTabName = theControlName + "-" + tmpTabName;
                var tmpTabsHTML = [];
                var tmpColor = 'blue';
                if (tmpItem.color) {
                    tmpColor = tmpItem.color;
                }

                tmpTabsHTML.push('<div class=" ui bottom attached slim ' + tmpColor + ' segment " >');
                for (var iTab = 0; iTab < tmpItem.tabs.length; iTab++) {
                    var tmpTab = tmpItem.tabs[iTab];
                    var tmpHidden = '';
                    var tmpActive = '';
                    if (iTab > 0) {
                        tmpHidden = ' hidden ';
                    } else {
                        tmpActive = ' active ';
                    }
                    tmpTabsHTML.push('<div controls tab appuse="cards" group="' + tmpTabName + '" item="' + tmpTab.name + '" class="' + tmpHidden + '">');
                    tmpTabsHTML.push(getContentHTML(theControlName, tmpTab.content, theControlObj))
                    tmpTabsHTML.push('</div>');

                    tmpTabs.push('<a appuse="tablinks" group="' + tmpTabName + '" item="' + tmpTab.name + '" action="_app:showSubPage" class="item ' + tmpColor + tmpActive + '">' + tmpTab.label + '</a>')

                }
                tmpTabsHTML.push('</div>');


                tmpTabs = tmpTabs.join('');
                if (tmpTabs) {
                    tmpTabs = '<div controls tabs class="ui top attached tabular menu" style="">' + tmpTabs + '</div>';
                }
                tmpHTML.push(tmpTabs);
                tmpHTML.push(tmpTabsHTML.join(''));

            } else {
                tmpHTML.push(getHTMLForControl(tmpCtl, tmpItem, theControlObj))
            }

        }

        tmpHTML = tmpHTML.join('');
        return tmpHTML;
    }


    function getHTMLForControl(theControlName, theObject, theControlObj) {
        var tmpHTML = [];
        tmpHTML.push('')
        if (!(theControlName)) {
            return '';
        }

        //var tmpControl = webControls.get(theControlName);
        var tmpControl = ControlButton;
        // if( isFunc(tmpControl) ){

        // }
        if (!(tmpControl && tmpControl.getHTML)) {
            console.warn("No HTML for " + theControlName)
            return '';
        }
        tmpHTML.push(tmpControl.getHTML(theControlName, theObject, theControlObj))

        return tmpHTML.join('');
    }



    //====== IMPORTANT --- --- --- --- --- --- --- --- --- --- 
    //====== End of Module / setup ==== Nothing new below this
    return $.async(function processReq(req, res, next) {
        res.set('Content-Type', 'text/html');
        try {
            var tmpRoute = new Route();
            var tmpResults = $.await(tmpRoute.run(req, res, next));

            res.send(tmpResults)

        } catch (ex) {
            res.status(404).end();
        }
    })
};