/*
ActionAppCore Core Library
Author: Joseph Francis, 2017 - 2023
License: LGPL
*/

/**  
 *   About ActionAppCore
 *   


 *** See updated documentation at related sites by running repos / going to sites

*/


//--- Global Entry Point / Always available functionality
var ActionAppCore = {
    //--- Directory of where stuff is located

    //--- ToDo: Move the _designer and _data to designer app
    //-    ** How to deploy / if we should deploy catalog resources ?
    dir: {
        catalogs: {
            common: '/dir/catalogs/_designer/',
            _designer: '/dir/catalogs/_designer/',
            _data: '/dir/catalogs/_data/',
            _samples: '/dir/catalogs/_samples/',
            getResourceCatalogURL: function(theCatName, theResType, theResName){
                var tmpBaseURL = '/';
                var tmpResType = ThisApp.controls.getUnifiedPluralName(theResType);
                //--- Directory is tpl not templates
                if( tmpResType == 'templates' ){
                    tmpResType = 'tpl';
                }
                var tmpCatDir = tmpBaseURL + "catalogs/" + theCatName + '/';
                if( theCatName == '__app'){
                    if( ActionAppCore.inDesigner ){
                        var tmpAppName = ThisApp.common.designerResApp
                        tmpCatDir = '/' + tmpAppName + '/catalog/'
                    } else {
                        tmpCatDir = './catalog/'
                    }
                }
                var tmpURL = tmpCatDir + tmpResType + '/' + theResName;
                return tmpURL
            }
        }
    },
    sources: {
        yesno: 'Yes,No',
        states: 'Alabama|AL,Alaska|AK,Arizona|AZ,Arkansas|AR,California|CA,Colorado|CO,Connecticut|CT,Delaware|DE,District Of Columbia|DC,Florida|FL,Georgia|GA,Hawaii|HI,Idaho|ID,Illinois|IL,Indiana|IN,Iowa|IA,Kansas|KS,Kentucky|KY,Louisiana|LA,Maine|ME,Maryland|MD,Massachusetts|MA,Michigan|MI,Minnesota|MN,Mississippi|MS,Missouri|MO,Montana|MT,Nebraska|NE,Nevada|NV,New Hampshire|NH,New Jersey|NJ,New Mexico|NM,New York|NY,North Carolina|NC,North Dakota|ND,Ohio|OH,Oklahoma|OK,Oregon|OR,Pennsylvania|PA,Rhode Island|RI,South Carolina|SC,South Dakota|SD,Tennessee|TN,Texas|TX,Utah|UT,Vermont|VT,Virginia|VA,Washington|WA,West Virginia|WV,Wisconsin|WI,Wyoming|WY',
        countries: 'Afghanistan|AF,Åland Islands|AX,Albania|AL,Algeria|DZ,American Samoa|AS,Andorra|AD,Angola|AO,Anguilla|AI,Antarctica|AQ,Antigua and Barbuda|AG,Argentina|AR,Armenia|AM,Aruba|AW,Australia|AU,Austria|AT,Azerbaijan|AZ,Bahamas|BS,Bahrain|BH,Bangladesh|BD,Barbados|BB,Belarus|BY,Belgium|BE,Belize|BZ,Benin|BJ,Bermuda|BM,Bhutan|BT,Bolivia, Plurinational State of|BO,Bonaire, Sint Eustatius and Saba|BQ,Bosnia and Herzegovina|BA,Botswana|BW,Bouvet Island|BV,Brazil|BR,British Indian Ocean Territory|IO,Brunei Darussalam|BN,Bulgaria|BG,Burkina Faso|BF,Burundi|BI,Cambodia|KH,Cameroon|CM,Canada|CA,Cape Verde|CV,Cayman Islands|KY,Central African Republic|CF,Chad|TD,Chile|CL,China|CN,Christmas Island|CX,Cocos (Keeling) Islands|CC,Colombia|CO,Comoros|KM,Congo|CG,Congo, the Democratic Republic of the|CD,Cook Islands|CK,Costa Rica|CR,Côte d\'Ivoire|CI,Croatia|HR,Cuba|CU,Curaçao|CW,Cyprus|CY,Czech Republic|CZ,Denmark|DK,Djibouti|DJ,Dominica|DM,Dominican Republic|DO,Ecuador|EC,Egypt|EG,El Salvador|SV,Equatorial Guinea|GQ,Eritrea|ER,Estonia|EE,Ethiopia|ET,Falkland Islands (Malvinas|FK,Faroe Islands|FO,Fiji|FJ,Finland|FI,France|FR,French Guiana|GF,French Polynesia|PF,French Southern Territories|TF,Gabon|GA,Gambia|GM,Georgia|GE,Germany|DE,Ghana|GH,Gibraltar|GI,Greece|GR,Greenland|GL,Grenada|GD,Guadeloupe|GP,Guam|GU,Guatemala|GT,Guernsey|GG,Guinea|GN,Guinea-Bissau|GW,Guyana|GY,Haiti|HT,Heard Island and McDonald Islands|HM,Holy See (Vatican City State|VA,Honduras|HN,Hong Kong|HK,Hungary|HU,Iceland|IS,India|IN,Indonesia|ID,Iran, Islamic Republic of|IR,Iraq|IQ,Ireland|IE,Isle of Man|IM,Israel|IL,Italy|IT,Jamaica|JM,Japan|JP,Jersey|JE,Jordan|JO,Kazakhstan|KZ,Kenya|KE,Kiribati|KI,Korea, Democratic People\'s Republic of|KP,Korea, Republic of|KR,Kuwait|KW,Kyrgyzstan|KG,Lao People\'s Democratic Republic|LA,Latvia|LV,Lebanon|LB,Lesotho|LS,Liberia|LR,Libya|LY,Liechtenstein|LI,Lithuania|LT,Luxembourg|LU,Macao|MO,Macedonia, the former Yugoslav Republic of|MK,Madagascar|MG,Malawi|MW,Malaysia|MY,Maldives|MV,Mali|ML,Malta|MT,Marshall Islands|MH,Martinique|MQ,Mauritania|MR,Mauritius|MU,Mayotte|YT,Mexico|MX,Micronesia, Federated States of|FM,Moldova, Republic of|MD,Monaco|MC,Mongolia|MN,Montenegro|ME,Montserrat|MS,Morocco|MA,Mozambique|MZ,Myanmar|MM,Namibia|NA,Nauru|NR,Nepal|NP,Netherlands|NL,New Caledonia|NC,New Zealand|NZ,Nicaragua|NI,Niger|NE,Nigeria|NG,Niue|NU,Norfolk Island|NF,Northern Mariana Islands|MP,Norway|NO,Oman|OM,Pakistan|PK,Palau|PW,Palestinian Territory, Occupied|PS,Panama|PA,Papua New Guinea|PG,Paraguay|PY,Peru|PE,Philippines|PH,Pitcairn|PN,Poland|PL,Portugal|PT,Puerto Rico|PR,Qatar|QA,Réunion|RE,Romania|RO,Russian Federation|RU,Rwanda|RW,Saint Barthélemy|BL,Saint Helena, Ascension and Tristan da Cunha|SH,Saint Kitts and Nevis|KN,Saint Lucia|LC,Saint Martin (French part|MF,Saint Pierre and Miquelon|PM,Saint Vincent and the Grenadines|VC,Samoa|WS,San Marino|SM,Sao Tome and Principe|ST,Saudi Arabia|SA,Senegal|SN,Serbia|RS,Seychelles|SC,Sierra Leone|SL,Singapore|SG,Sint Maarten (Dutch part|SX,Slovakia|SK,Slovenia|SI,Solomon Islands|SB,Somalia|SO,South Africa|ZA,South Georgia and the South Sandwich Islands|GS,South Sudan|SS,Spain|ES,Sri Lanka|LK,Sudan|SD,Suriname|SR,Svalbard and Jan Mayen|SJ,Swaziland|SZ,Sweden|SE,Switzerland|CH,Syrian Arab Republic|SY,Taiwan, Province of China|TW,Tajikistan|TJ,Tanzania, United Republic of|TZ,Thailand|TH,Timor-Leste|TL,Togo|TG,Tokelau|TK,Tonga|TO,Trinidad and Tobago|TT,Tunisia|TN,Turkey|TR,Turkmenistan|TM,Turks and Caicos Islands|TC,Tuvalu|TV,Uganda|UG,Ukraine|UA,United Arab Emirates|AE,United Kingdom|GB,United States|US,United States Minor Outlying Islands|UM,Uruguay|UY,Uzbekistan|UZ,Vanuatu|VU,Venezuela, Bolivarian Republic of|VE,Viet Nam|VN,Virgin Islands, British|VG,Virgin Islands, U.S|VI,Wallis and Futuna|WF,Western Sahara|EH,Yemen|YE,Zambia|ZM,Zimbabwe|ZW'
    },
        /**
     * getListSource
    *  - Returns a source list use for dropdown and other like controls
    * 
    * Example: 
    * ThisApp.controls.getListSource('states'); //Returns array of arrays [["Alabama", "AL"],...]
    * ThisApp.controls.getListSource('states','objects'); //Returns array of objects [{name: "Alabama", value: "AL", text: "Alabama"},...]
    * 
    * @param  {String} theName   [The name of the source to return]
    * @param  {String} theReturnType   [<blank>,objects] Default: <blank>
    *  "array" or <blank> 
    *  "object" or "objects"
    * @return Array
    * 
    */    
    getListSource: function(theName, theReturnType){
        if(!this.sources.hasOwnProperty(theName)){
            return '';
        }
        var tmpSource = this.sources[theName];
        if( theReturnType == 'string' ){
            return tmpSource;
        }
        if( theReturnType == 'objects'|| theReturnType == 'object' ){
            return ActionAppCore.getListAsObjects(tmpSource);
        }
        return ActionAppCore.getListAsArrays(tmpSource);
    },
    
    el: function(theSpecs){
        var tmpSpecs = theSpecs || {};
        var tmpType = tmpSpecs.type || 'div';
        var tmpRet = document.createElement(tmpType)
        var tmpContent = tmpSpecs.content || '';
        if( tmpSpecs.className ){
            var tmpClasses = tmpSpecs.className;
            var tmpClassText = tmpClasses;
            if( Array.isArray(tmpClasses)){
                tmpClassText = '';
                tmpClassTextHit = false;
                for( var iPos in tmpClasses ){
                    var tmpClassName = tmpClasses[iPos];
                    if( tmpClassName ){
                        if(!tmpClassTextHit){
                            tmpClassTextHit = true;
                        } else {
                            tmpClassText += " ";                             
                        }
                        tmpClassText += tmpClassName.trim();
                    }
                }
                tmpStyles = this.util.getStylesAsObject(tmpStyles);
            }
            tmpRet.className = tmpClassText;
        }
        var tmpStyles = tmpSpecs.style || tmpSpecs.styles;
        if( tmpStyles){
            if( typeof(tmpStyles) == 'string'){
                tmpStyles = this.util.getStylesAsObject(tmpStyles);
            }
            if( typeof(tmpStyles) == 'object'){
                for( var iName in tmpStyles){
                    tmpRet.style[iName] = tmpStyles[iName];
                }
            }
        }
        var tmpAttrs = tmpSpecs.attr;
        if( typeof(tmpAttrs) == 'object'){
            for( var iName in tmpAttrs ){
                var tmpAttrVal = tmpAttrs[iName];
                if( (iName) && typeof(tmpAttrVal) == 'string' ){
                    tmpRet.setAttribute(iName,tmpAttrVal);
                } else if( (iName) && typeof(tmpAttrVal) == 'function' ){
                    //--- For onchange type events
                    //ToDo: Another way
                    tmpRet[iName.toLowerCase()] = tmpAttrVal;                    
                }
            }
        }
        var tmpTextContent = tmpSpecs.text || tmpSpecs.html;
        var tmpContent = tmpSpecs.children || tmpSpecs.content;
        if( tmpTextContent ){
            tmpRet.innerHTML = tmpTextContent;
        }
        if( tmpContent ){
            if( Array.isArray(tmpContent)){
                for( var iPos in tmpContent ){
                    var tmpChild = tmpContent[iPos];
                    if(typeof(tmpChild) == 'object'){
                        var tmpCE = this.el(tmpChild);
                        tmpRet.appendChild(tmpCE);
                    }
                }
            } else {
            //--- children/content will override incorrectly duplicate text value in text/html
            tmpRet.innerHTML = tmpContent;
            }
        }
        return tmpRet;
    },    
    util: {
        
        getStylesAsObject(theString){
            var regex = /([\w-]*)\s*:\s*([^;]*)/g;
            var match, properties={};
            while(match=regex.exec(theString)) properties[match[1]] = match[2].trim();
            return properties;
        },
        getAttrAsObject(theString){
            var tmpEntries = theString.split(' ');
            var tmpRet = {};
            for( var iPos in tmpEntries){
                var tmpEntry = tmpEntries[iPos];
                tmpEntry = tmpEntry.trim();
                if( tmpEntry ){
                    var tmpParts = tmpEntry.split('=');
                    var tmpVal = tmpParts[1];
                    if( !(tmpVal)){
                        tmpRet[tmpParts[0]] = '';
                    } else {
                        if( tmpVal.substring(0,1) == '"'){
                            tmpVal = tmpVal.substring(1);
                            tmpVal = tmpVal.slice(0, -1);
                        }
                        tmpRet[tmpParts[0]] = tmpVal;
                    }
                    
                }
            }
            return tmpRet;
        },
        isStr: function(theItem) {
            return (typeof (theItem) == 'string')
        },
        isFunc: function(theItem) {
            return (typeof (theItem) == 'function')
        },
        isObj:  function(theItem) {
            return (typeof (theItem) == 'object')
        },
        getObjectAsEncodedForm: function (theObject) {
            //--- for 'application/x-www-form-urlencoded' submit
            var tmpObject = theObject;
            if (typeof (tmpObject) == 'string') {
                tmpObject = JSON.parse(tmpObject);
            }
            var tmpEncoded = "";
            var tmpEncodedPairs = [];
            for (var aName in tmpObject) {
                tmpEncodedPairs.push(encodeURIComponent(aName) + '=' + encodeURIComponent(tmpObject[aName]));
            }
            tmpEncoded = tmpEncodedPairs.join('&').replace(/%20/g, '+');
            return tmpEncoded;
        }
    },
    controlScope:{},
    addSources: function(theSourcesObject){
        for (var iName in theSourcesObject) {
            this.sources[iName] = theSourcesObject[iName];
        }
    },
    //--- Debounce resize / rapid firing events
    debounce: function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    apiCall: function(theOptions) {
        //--- For use on initial load only, use ThisApp.apiCall for normal application operations
        //--- This excludes loader and automatic resolution features
        var dfd = $.Deferred();

        if (!theOptions) {
            dfd.reject("No api call details provided");
            return dfd.promise();
        }

        var tmpOptions = theOptions || '';
        if (typeof (tmpOptions) == 'string') {
            tmpOptions = { url: tmpOptions };
        }
        if( ActionAppCore.apiCallOptions && typeof(ActionAppCore.apiCallOptions.filterOptions) == 'function'){
            ActionAppCore.apiCallOptions.filterOptions(tmpOptions);
        }

        var tmpAsForm = (tmpOptions.formSubmit === true);

        var tmpURL = tmpOptions.url;
        if (!tmpURL) {
            throw "No URL provided"
        }
        tmpOptions.cache = false;
        tmpSuccess = function (theResponse) {
            //ThisApp.hideLoading(tmpLoaderOptions);
            dfd.resolve(theResponse);
        }
        tmpError = function (theError) {
            //ThisApp.hideLoading(tmpLoaderOptions);
            dfd.reject(theError)
        }


        //--- Auto Detect data, convert data and use POST
        if (tmpOptions.data) {
            tmpOptions.method = 'POST';

            if (tmpAsForm) {
                if (typeof (tmpOptions.data) == 'object') {
                    tmpOptions.data = ActionAppCore.util.getObjectAsEncodedForm(tmpOptions.data);
                }
                tmpOptions.contentType = 'application/x-www-form-urlencoded';
            } else {
                if (typeof (tmpOptions.data) == 'object') {
                    tmpOptions.data = JSON.stringify(tmpOptions.data);    
                }
                tmpOptions.contentType = 'application/json';
            }
            
        }
        $.ajax(tmpOptions).then(tmpSuccess, tmpError);
        return dfd.promise();
    },
    getListAsObjects: function (theList) {
        var tmpList = this.getListAsArrays(theList);
        var tmpRet = []

        if (tmpList && tmpList.length > 0) {
            for (var index = 0; index < tmpList.length; index++) {
                var tmpEntry = tmpList[index] || '';
                if (tmpEntry) {
                    var tmpText = tmpEntry;
                    var tmpVal = tmpEntry;
                    if ( (typeof(tmpEntry) != 'string') && tmpEntry.length == 2) {
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

    },
    getListAsArrays: function(theList) {
        var tmpList = theList;
        if( this.util.isObj(tmpList) ){
            var tmpSource = false;
            if( ActionAppCore.sources && ActionAppCore.sources.hasOwnProperty(tmpList.source) ){
                tmpSource = ActionAppCore.sources[tmpList.source];
                tmpList = tmpSource;
            }

            if( !(tmpSource) ){
                console.error("Passed invalid object for list type, no valid source provided.  Source: " + tmpList.source);
                tmpList = '';
            }
        }
        if (this.util.isStr(tmpList)) {
            tmpList = tmpList.split(",");
        }
        if (tmpList && tmpList.length > 0) {
            for (var index = 0; index < tmpList.length; index++) {
                var tmpEntry = tmpList[index] || '';
                if (tmpEntry) {
                    if (this.util.isStr(tmpEntry)) {
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
};

ActionAppCore.ActAppData = {
    rootPath: '/',
    formatters: {
        "multivaluenewline": function(cell){
            var value = cell.getValue();
            value = value.join('<br />');
            return value;
        },
        "textarea": function(cell){
            var value = cell.getValue();
            value = value.replace(/\n/g,'<br />');
            return value;
        },
        "datetime": {
            formatterParams: {
                inputFormat: "YYYY-MM-DD hh:mm:ss",
                outputFormat: "MMM D, Y hh:mm a",
                invalidPlaceholder: ""
            }
        },
        "date": {
            formatterParams: {
                inputFormat: "YYYY-MM-DD",
                outputFormat: "MMM D, Y",
                invalidPlaceholder: ""
            }
        },
        "time": {
            formatterParams: {
                inputFormat: "hh:mm:ss",
                outputFormat: "hh:mm a",
                invalidPlaceholder: ""
            }
        }
    }
}

//--- Global Spot
window.ActionAppCore = window.ActionAppCore || ActionAppCore;

//--- Base module and simple module system --- --- --- --- --- --- --- --- --- --- --- --- 
(function (ActionAppCore, $) {
    var modules = {};

    //--- Create module
    ActionAppCore.createModule = function (theModName, theOptionalModuleContent) {
        if (modules.hasOwnProperty(theModName)) {
            throw { error: "Module already exists", module: theModName };
        }
        modules[theModName] = theOptionalModuleContent || {};
        return modules[theModName];
    };
    //--- get / use module
    ActionAppCore.module = function (theModName) {
        if (!modules.hasOwnProperty(theModName)) {
            throw { error: "Module does not exists", module: theModName };
        }
        return modules[theModName];
    };

})(ActionAppCore, $);


//--- Common Modules --- --- --- --- --- --- --- --- --- --- --- --- 
(function (ActionAppCore, $) {
    ActionAppCore.createModule("site");
    ActionAppCore.createModule("plugin");
    ActionAppCore.createModule("extension");
})(ActionAppCore, $);

//--- jQuery utility additions --- --- --- --- --- --- --- --- --- --- --- --- 
(function (ActionAppCore, $) {

    //--- Creates two overlays, 
    // - one to cover the content to protect and make semitransparent
    // - the other over that to hold conent that should not be semi-transparent
    $.fn.overlayMask = function (action) {
        if( this.selector == ""){
            return;
        }
        if(this && this.length){
            if( this.length > 1 ){
                console.error( 'Do not call overlay mask on more than one element at a time', this);
                return;
            }
        }
        var mask = this.data('maskel');
        var maskContent = this.data('maskcontent');
      if (!mask) {
        this.css({position: 'relative'});
        var tmpNewMask = $('<div class="actapp-overlay-mask"></div>');
        tmpNewMask = tmpNewMask.css({
            position: 'absolute',width: '100%',height: '100%',
            top: '0px',left: '0px',zIndex: 99
          }).appendTo(this);
        this.data('maskel',tmpNewMask);
        mask = tmpNewMask;

        var tmpNewMaskContent = $('<div class="actapp-overlay-content"></div>');
        tmpNewMaskContent = tmpNewMaskContent.css({
            position: 'absolute',width: '100%',height: '100%',
            top: '0px',left: '0px',zIndex: 100
          }).appendTo(this);
        this.data('maskcontent',tmpNewMaskContent);
        maskContent = tmpNewMaskContent;
      }
  
      if (!action || action === 'show') {
        mask.show();
        maskContent.show();
      } else if (action === 'hide') {
        mask.hide();
        maskContent.hide();
      } else if (action === 'remove') {
        mask.remove();
        maskContent.remove();
      }
  
      return this;
    };

})(ActionAppCore, $);
//--- PolyFill
(function (ActionAppCore, $) {
    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }
    if (typeof String.prototype.startsWith !== 'function') {
        String.prototype.startsWith = function (suffix) {
            return this.indexOf(suffix) === 0;
        };
    }

    
    if( !String.prototype.escapeHTML ){
        String.prototype.escapeHTML = function() {
            var tagsToReplace = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;'
            };
            return this.replace(/[&<>]/g, function(tag) {
                return tagsToReplace[tag] || tag;
            });
        };
    }
    
    
    if( !String.prototype.unescapeHTML ){
        String.prototype.unescapeHTML = function() {
            var tagsToReplace = {
                '&amp;': '&',
                '&lt;': '<',
                '&gt;': '>'
            };
            return this.replace(/(&amp;|&lt;|&gt;)/g, function(tag) {
                return tagsToReplace[tag] || tag;
            });
        };
    }

    //--- Fix mobile scrolling issue
    EventTarget.prototype['addEventListenerBase'] = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener){
        try {
            if(this !== document.querySelector('body') || type !== 'touchmove'){
                this.addEventListenerBase(type, listener);
            }
        } catch (error) {
            //--ok            
        }
    };

    
    

})(ActionAppCore, $);

//--- Common Functionality Extensions

/**
     * subscribe / unsubscribe / publish
    *     - Standard Pub / Sub functionality
    * @return void
    * 
    */
//--- PubSub Functionality
(function (ActionAppCore, $) {

    var ExtendMod = ActionAppCore.module("extension");

    //--- Base class for application pages
    function ThisExtention() {

    }
    var me = ThisExtention;

    //--- Global counter for this module
    var subCounter = 0;
    function getNextCounter(){
        subCounter++;
        return subCounter;
    }

    me.subscribe = function (theEvent, theHandler) {
        var tmpID = getNextCounter();
        var tmpEvent = theEvent + '.' + tmpID;
        this.__events.on.apply(this.__events, [tmpEvent, theHandler]);
        return tmpEvent;
    };
    
    me.unsubscribe = function (theEvent, theHandler) {
        this.__events.off.apply(this.__events, arguments);
    };

    me.publish = function () {
        this.__events.trigger.apply(this.__events, arguments);
    };

    me.initPubSub = function () {
        this.__events = $({});
    };

    //--- return the prototype to be marged with prototype of target object
    ExtendMod.PubSub = me;

    $.extend(ActionAppCore, ExtendMod.PubSub);
    ActionAppCore.initPubSub();

})(ActionAppCore, $);




//--- UsePubSub Functionality, designed to automatically track subscribe calls to unsubscribe
(function (ActionAppCore, $) {
    var ExtendMod = ActionAppCore.module("extension");

    //--- Base class for application pages
    function ThisExtention() {

    }
    var me = ThisExtention;

    me.subscribeEvent = function (theTarget, theEvent, theHandler) {
        var tmpEventKey = theTarget.subscribe(theEvent, theHandler);
        this.__subcriptions[tmpEventKey] = theTarget;
        return tmpEventKey;
    };
    
    me.unsubscribeEvent = function (theEventKey) {
        var tmpTarget = this.__subcriptions[theEventKey];
        if( tmpTarget && tmpTarget.unsubscribe ){
            tmpTarget.unsubscribe(theEventKey);
        }
        delete this.__subcriptions[theEventKey];
    };
    me.unsubscribeAllEvents = function () {
        for( var iKey in this.__subcriptions){
            this.unsubscribeEvent(iKey)
        }
    };

    me.initUsePubSub = function () {
        this.__subcriptions = {};
    };

    ExtendMod.UsePubSub = me;

})(ActionAppCore, $);


/**
  * setDisplay
  *    - sets the attribute to hidden or not hidden
  * 
  * To Use: <any variable>.setDisplay(anyEl,anyBooleanValue);
  *
  * @param  {Object} theEl   [target object with details about the page to open]
  * @param  {Boolean} theIsVis   [true to show, false to hide]
  * @return void
  */
(function (ActionAppCore, $) {

    var ExtendMod = ActionAppCore.module("extension");

    //--- Base class for application pages
    function ThisExtention() {

    }
    var me = ThisExtention.prototype;

    me.setDisplay = function (theEl, theIsVis) {
        var tmpEl = null;
        if (!theEl) {
            console.error("Can not set diplay for element, none provided");
            return;
        }
        if (theEl.node) {
            tmpEl = $(theEl.node());
        } else {
            tmpEl = $(theEl);
        }
        if (theIsVis) {
            tmpEl.removeClass('hidden');
        } else {
            tmpEl.addClass('hidden');
        }
    };
    me.show = function (theEl) {
        me.setDisplay(theEl, true);
    };
    me.hide = function (theEl) {
        me.setDisplay(theEl, false);
    };

    ExtendMod.SetDisplay = me;

})(ActionAppCore, $);


//--- CoreApp Standard App Component ---- ---- ---- ---- ---- ---- ---- 
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    SiteMod.CoreApp = CoreApp;

    var ExtendMod = ActionAppCore.module("extension");

    //--- Note: Everything references me not this as this is a singleton with no instances
    var me = CoreApp.prototype;

    //--- Singleton for currently running application
    function CoreApp(theOptions) {

        //--- set currently loaded application as globally available object from global entrypoint
        ActionAppCore.app = me;

        me.isDom = function (element) {
            return element instanceof Element;
        };

        me.options = theOptions || {};
        me.actions = me.options.actions || {};
        me.actionsDelegates = me.options.actionsDelegates || {};

        me.components = {};

        me.context = {
            controller: me,
            data: {}
        };

        me.resCacheFlags = {
            'catalog': true
        };
        //--- Full Path Index
        me.resCache = {
            "panels": {},
            "controls": {},
            "html": {}
        };

        me.res = {
            "panels": {},
            "controls": {},
            "html": {}
        };

        me.events = $({});
        me.$window = $(window);
        me.$document = $(document);

        me.pagesGroup = "app:pages";

        me.messages = [];
        me.messagesAt = 0;
        me.navConfig = {};

        me.getNavConfig = function (theName) {
            return me.navConfig[theName];
        };


        me.registerNavLink = function (theNavObject) {
            if (!(theNavObject)) { return false }
            var tmpName = theNavObject.name || '';
            me.navConfig[tmpName] = theNavObject;
            var tmpOpts = theNavObject.options || {};
            theNavObject.isSideLink = (tmpOpts.sideLink);
            theNavObject.isTopLink = (tmpOpts.topLink);
            theNavObject.iconHTML = tmpOpts.iconHTML || '';
            if (tmpOpts.icon) {
                theNavObject.iconHTML = '<i class="' + tmpOpts.icon + ' icon"></i>';
            }
            me.config.navlinks.push(theNavObject);
            return true;
        };

        me._messageOptions = {
            show: true
        };
        me.setMessagesOption = function (theOption, theValue) {
            ThisApp._messageOptions[theOption] = theValue;
        };
        me.setMessagesOptions = function (theOptions) {
            $.extend(ThisApp._messageOptions, theOptions);
        };
        me.getMessages = function () {
            return me.messages;
        };
        me.getMessageCount = function () {
            return me.messagesAt;
        };
        me.clearMessages = function () {
            me.messages = [];
            me.messagesAt = 0;
        };

        /**
         * appMessage
        *  - Send an message and saves in messages array, optionall with related saved data
        * 
        * Example: 

        * ThisApp.appMessage("Just some info");
        * ThisApp.appMessage("Successful message here.", true, "It was updated", { what: "nothing" });
        * ThisApp.appMessage("Warning, Warning, Warning!", "w", "This is just a warning", { reason: "testing" });
        * ThisApp.appMessage("There was an error, in case you want to take action.", false, false, { reason: "testing" });
        *    Also see: ThisApp.setMessagesOption(theOption,theValue)
        * 
        * @param  {String} theMsg   [The name of the spot to load]
        * @param  {String} theOptionalType   [info, warning, error, success] Default: info
        *  "info" or <blank> 
        *  "warning" or "w"
        *  "error" or "e" or false
        *  "success" or "s" or true
        * @param  {String} theOptions
        *    .title =   [The optional title, no title if excluded]
        *    .data =   [The optional data to be stored with the message log]
        *    .show =   [show as toastr or just log it] (can set option for default and override here)
        * @return void
        * 
        */
        me.appMessage = function (theMsg, theOptionalType, theOptions) {
            var tmpType = "info";
            var tmpOptions = theOptions || {};
            var tmpOptionalData = tmpOptions.data || false;


            if (typeof (theOptionalType) == 'string') {
                theOptionalType = theOptionalType.toLowerCase();
                if (theOptionalType == "warning" || theOptionalType == "error" || theOptionalType == "success") {
                    tmpType = theOptionalType;
                } else if (theOptionalType == "w") {
                    tmpType = "warning";
                } else if (theOptionalType == "e") {
                    tmpType = "error";
                } else if (theOptionalType == "s") {
                    tmpType = "success";
                }
            } else if (typeof (theOptionalType) == 'boolean') {
                if (theOptionalType == true) {
                    tmpType = "success";
                }
            }
            var tmpMsgPos = (me.messagesAt++);
            var tmpMsgObj = {
                text: theMsg,
                type: tmpType,
                title: tmpOptions.title || '',
                pos: tmpMsgPos,
                data: tmpOptionalData
            };

            me.messages.push(tmpMsgObj);
            var tmpIsShow = me._messageOptions.show;
            if (typeof (tmpOptions.show) == 'boolean') {
                tmpIsShow = tmpOptions.show;
            }
            if (tmpIsShow) {
                if (typeof (tmpOptions.title) == 'string') {
                    toastr[tmpType](theMsg, tmpOptions.title);
                } else {
                    toastr[tmpType](theMsg);
                }
            }

            me.publish("message:sent", tmpMsgObj);
        };

        // /**
        //   * subscribe / unsubscribe / publish
        //   *     - Standard Pub / Sub functionality
        //  * 
        //  * 
        //  * @return void
        //  * 
        //  */
        // me.subscribe = function () {
        //     ThisApp.events.on.apply(ThisApp.events, arguments);
        // };

        // me.unsubscribe = function () {
        //     ThisApp.events.off.apply(ThisApp.events, arguments);
        // };

        // me.publish = function () {
        //     ThisApp.events.trigger.apply(ThisApp.events, arguments);
        // };

    }


    $.extend(me, ExtendMod.SetDisplay);
    $.extend(me, ExtendMod.PubSub);
    me.initPubSub();

    //--- Know if we have initialized a control by site URI
    me.resourceInitFlags = {};

    //--- Delay and then resolve promise
    me.delay = function (theMS) {
        var tmpMS = theMS || 1000;
        var dfd = jQuery.Deferred();
        ThisApp.delayTimerPending = setTimeout(function () {
            dfd.resolve(true);
            ThisApp.delayTimerPending = false;
        }, tmpMS);
        return dfd.promise();
    };
    me.delayEnd = function(){
        if( ThisApp.delayTimerPending ){
            clearTimeout(ThisApp.delayTimerPending);
            ThisApp.delayTimerPending = false;
        }
    }

    me.layoutComponentResized = function () {

    }

    me.onDropDownNavChange = function (theValue, theText, theChoice) {
        if (theChoice.get(0) && theChoice.get(0).tagName) {
            var tmpURL = theChoice.attr('href');
            if (tmpURL) {
                window.location = tmpURL;
            }
        }
    }

    me.initAppComponents = function (theOptionalTarget) {
        var tmpDDs = me.getByAttr$({ appcomp: 'dropdown' }, theOptionalTarget);
        if (tmpDDs && tmpDDs.length) {
            tmpDDs.attr('appcomp', '')
                .dropdown({
                    showOnFocus: false
                });
        }
        tmpDDs = me.getByAttr$({ appcomp: 'dropdownnav' }, theOptionalTarget);
        if (tmpDDs && tmpDDs.length) {
            tmpDDs.attr('appcomp', '');
            tmpDDs.dropdown({
                allowCategorySelection: true,
                on: 'click',
                onChange: me.onDropDownNavChange,
                selectOnKeydown: false,
                allowTab: true,
                showOnFocus: true
            });
        }

        var tmpCBs = me.getByAttr$({ appcomp: 'checkbox' }, theOptionalTarget);
        if (tmpCBs && tmpCBs.length) {
            tmpCBs.attr('appcomp', '')
                .checkbox();
        }

        var tmpCBs = me.getByAttr$({ appcomp: 'date' }, theOptionalTarget);

        if (tmpCBs && tmpCBs.length) {
            
            for( var iPos = 0 ; iPos < tmpCBs.length ; iPos++ ){
                var tmpCB = $(tmpCBs.get(iPos));
                var tmpDateFormat = tmpCB.attr('dateformat') || '';
            
                var tmpOptions = {
                    "show_icon": false,
                    navigation: ['<i class="left arrow icon"></i>', '<i class="right arrow icon"></i>', '<i class="up arrow icon"></i>', '<i class="down arrow icon"></i>']
                }
                if( tmpDateFormat == 'time' ){
                 tmpOptions.format = 'h:i a';
                } else if (tmpDateFormat == 'datetime') {
                    tmpOptions.format = 'm/d/Y h:i a';
                } else {
                    tmpOptions.format = 'm/d/Y';
                }

                var tmpPicker = tmpCB.attr('appcomp', '').Zebra_DatePicker(tmpOptions)
            }
        }



        var tmpLayouts = me.getByAttr$({ appcomp: 'layout' }, theOptionalTarget);

        if (tmpLayouts) {


            if (tmpLayouts.length) {
                tmpLayouts
                    .addClass('ctl-layout-frame')
                    .css('min-height', '200px')
                    .css('height', '100%')
                    .attr('appcomporig', 'layout')
                    .attr('appcomp', '')
                    // .layout()
                    ;
                //--- Assure all the elements to the next pane are 100%
                ThisApp.util.resizeToParent(tmpLayouts);

                //--- Assure layouts index is in there
                this.liveIndex = this.liveIndex || {};
                this.liveIndex.layouts = this.liveIndex.layouts || {};
                //--- Loop to create each one, getting details if needed from el
                for (var iLayout = 0; iLayout < tmpLayouts.length; iLayout++) {
                    var tmpLayoutEntry = $(tmpLayouts.get(iLayout));
                    var tmpOptions = {};
                    var tmpLayoutTemplateName = tmpLayoutEntry.attr('template') || '';
                    var tmpLayoutOptions = tmpOptions;
                    if (tmpLayoutTemplateName && ThisApp.layoutTemplates[tmpLayoutTemplateName]) {
                        //--- Using custom template
                        tmpLayoutOptions = ThisApp.layoutTemplates[tmpLayoutTemplateName];
                    }
                    tmpLayoutOptions = tmpLayoutOptions || {};

                    //comeback
                    //ToDo: Implement app level layout control from markup
                    //ToDo: Create / test more than one app comp and assure both resize
                    /*
                    var appCtlLayoutChanged = ActionAppCore.debounce(function () {
                        this.publish('resized', {});
                    }, 200).bind(this);

                    var tmpRet = tmpLayoutEntry.layout(tmpLayoutOptions);
                    tmpLayoutOptions.onresize_end = appCtlLayoutChanged;
                    */
                }


                // //--- Enable layouts and save the handles
                //this.liveIndex.layouts = tmpLayouts.layout();
                //--- Tell the app to resize it's layouts
                ThisApp.resizeLayouts();
            }

        }
    }

    me.getPanel = function (theName) {
        return this.getResourceForType('panels', theName);
    }

    me.getResourceForType = function (theType, theName) {
        var tmpType = theType || 'controls';
        var tmpResource = this.res[tmpType][theName];
        if (!(tmpResource)) {
            if (this.parentControl && isFunc(this.parentControl.getResourceForType)) {
                tmpResource = this.parentControl.getResourceForType(theType, theName)
            }
            if (!(tmpResource)) {
                tmpResource = ThisApp.resCache[tmpType][theName];
            }
        }
        return tmpResource;
    }

    me.getResourceFromSource = function(theType, theName, theSource, theSourceResName){
        var dfd = jQuery.Deferred();
        var tmpName = theName;
        var tmpSourceName = theSourceResName || tmpName;
        var tmpType = ThisApp.controls.getUnifiedPluralName(theType);
        var tmpReq = {};
        var tmpMapEntry = {name:tmpName}
        if( theSource ){
            tmpMapEntry.source = theSource;            
        }
        var tmpMap = {};
        tmpMap[tmpSourceName] = tmpMapEntry;
        tmpReq[tmpType] = {map:tmpMap};
        var tmpThis = this;
        this.loadResources(tmpReq).then(function(){
            //-- Return resource object
            dfd.resolve(tmpThis.getResourceForType(tmpType, theName))
        })
        return dfd.promise();
    }

    me.getControl = function (theName) {
        return this.getResourceForType('controls', theName);
    }


    me.getExtnForType = function (theType) {
        var tmpType = theType.toLowerCase();
        if (tmpType == 'panels' || tmpType == 'panel') {
            return '.json?open';
        }
        if (tmpType == 'controls' || tmpType == 'control') {
            return '/control.js?open';
        }
        return '.html?open';
    }

    me.loadResources = function (theSpecs, theOptions) {
        var dfd = jQuery.Deferred();
        var tmpThis = this;
        var tmpURIs = [];

        var tmpIndex = {};
        var tmpDefs = [];
        for (var aName in theSpecs) {
            var tmpType = aName;

            var tmpTypeSpecs = theSpecs[aName];
            var tmpNewURIs = this.getResourceURIsForType(tmpType, tmpTypeSpecs, theOptions);

            tmpURIs = tmpURIs.concat(tmpNewURIs)
        }

        var tmpRequests = [];
        for (var iURI = 0; iURI < tmpURIs.length; iURI++) {
            var tmpURI = tmpURIs[iURI];

            if (tmpURI.type == 'panel' || tmpURI.type == 'control') {
                tmpURI.type += 's';
            }

            var tmpExists = false;
            var tmpExisting = false;
            var tmpLocalExists = tmpThis.res[tmpURI.type] && tmpThis.res[tmpURI.type][(tmpURI.name)];
            if (tmpLocalExists || ThisApp.resCache[tmpURI.type] && ThisApp.resCache[tmpURI.type][tmpURI.uri]) {
                tmpExists = true;
                tmpExisting = ThisApp.resCache[tmpURI.type][tmpURI.uri];
                //--- If existing in cache, also load reference as resource name
                //     ** so a page can alias the control and use a cached version
                tmpThis.res[tmpURI.type] = tmpThis.res[tmpURI.type] || {};
                tmpThis.res[tmpURI.type][(tmpURI.name || tmpURI.uri)] = tmpExisting;
            }
            
            if( typeof(tmpURI.uri) == 'object' ){
                //--- Special case, process computed URI values when loading resources
                var tmpToProc = {uri:tmpURI.uri};
                var tmpReply = ThisApp.controls.processDynamicContent("",tmpToProc,this);
                tmpURI.uri = tmpReply.uri;
            }
            //--- ToDo: Implement App Caching Rules            
            if (tmpURI.uri.startsWith('design/')) {
                tmpExists = false;
            }
            //--- Allow global / temporary disabling of the cache system for dev
            if( ThisApp.resCacheFlags.disabled === true){
                tmpExists = false;
            }
            
            
            //--- ToDo: Revisit cachine / using cache versions

            if (!(tmpExists)) {

                var tmpURL = tmpURI.uri;
                if (!(tmpURI.uri.endsWith('/') || (tmpURI.uri.indexOf('?') > -1) || tmpURI.uri.endsWith('.xsp'))) {
                    //--- Do not add extn to flat items
                    tmpURL += me.getExtnForType(tmpURI.type);
                }
                if (!(tmpURI.uri.startsWith('http:') || tmpURI.uri.startsWith('https:'))) {
                    tmpURL = assureRelative(tmpURL);
                }

                tmpRequests.push(tmpURI);
                tmpDefs.push(
                    ThisApp.apiCall({
                        url: tmpURL,
                        method: 'GET',
                        datatype: 'text'
                    })
                );
            }
        }

        $.whenAll(tmpDefs).then(function (theResults) {
            for (var iRequest = 0; iRequest < tmpRequests.length; iRequest++) {
                var tmpRequest = tmpRequests[iRequest];
                var tmpResponse = theResults[iRequest];

                if (isObj(tmpResponse) && tmpResponse.length) {
                    tmpResponse = tmpResponse[0];
                }

                if (tmpRequest.type == 'panels') {
                    if (isStr(tmpResponse)) {
                        try {
                            tmpResponse = ThisApp.json(tmpResponse, true);
                        } catch (ex) {
                            console.warn("Could not convert panel object ", tmpRequest.uri)
                        }
                    }

                }

                tmpThis.addResourceFromContent(tmpRequest.type, (tmpRequest.name || tmpRequest.uri), tmpResponse, tmpRequest.uri, theOptions);
            }
            dfd.resolve(true);
        })
        return dfd.promise();

    }

    // function assureRelative(theURL) {
    //     var tmpURL = theURL;

    //     if (!tmpURL.startsWith('.')) {
    //         if (!tmpURL.startsWith('/')) {
    //             tmpURL = './' + tmpURL;
    //         } else {
    //             tmpURL = '.' + tmpURL
    //         }
    //     }

    //     return tmpURL;
    // }
    //--- Updated to allow hard coded root as usual
    function assureRelative(theURL) {
        var tmpURL = theURL;
        if (!tmpURL.startsWith('.') && !tmpURL.startsWith('/')) {
            tmpURL = './' + tmpURL;
        }
        return tmpURL;
    }

    var resourceAlias = {
        "control": "controls",
        "panel": "panels"
    }


    me.loadWebResouces = function (theControl, thePath, theFullPath) {
        var tmpResourceData = theControl;
        var tmpCheckPath = thePath;
        //--- If the base element (with no params) is not loaded, get the CSS and load it
        // if (!(tmpCheckPath) || (me.resourceInitFlags[tmpCheckPath] !== true)) {
        //     if (tmpCheckPath) {
        //         me.resourceInitFlags[tmpCheckPath] = true;
        //         if (tmpResourceData.controlConfig) {
        //             tmpResourceData.controlConfig.uri = theFullPath;
        //         }
        //     }
        //     if (tmpResourceData.controlConfig && tmpResourceData.controlConfig.options && tmpResourceData.controlConfig.options.css) {
        //         var tmpCSS = tmpResourceData.controlConfig.options.css || '';
        //         if (tmpCSS) {
        //             me.addCSS({ css: tmpCSS, path: tmpCheckPath })
        //         }
        //     }
        // }
        //TODO: The caching cause issues - need to include params for backend dynamic, not do dynamic
        //         ** also review above change for accessive redundant activity on load **
        if (tmpResourceData.controlConfig && tmpResourceData.controlConfig.options && tmpResourceData.controlConfig.options.css) {
            var tmpCSS = tmpResourceData.controlConfig.options.css || '';
            if (tmpCSS) {
                me.addCSS({ css: tmpCSS, path: tmpCheckPath })
            }
        }

    }
    me.addCSS = function (theOptions) {
        var tmpOptions = theOptions || {};
        var tmpCSS = tmpOptions.css || '';
        var tmpPath = tmpOptions.path || '';
        if (Array.isArray(tmpCSS)) {
            tmpCSS = tmpCSS.join('\n');
        }
        if ((tmpCSS)) {
            $('head').append('<style>' + tmpCSS + '</style>');
        }
    }

    me.addResourceFromContent = function (theType, theName, theContent, theFullPath, theOptions) {
        var tmpOptions = theOptions || {};
        var tmpThis = this;
        var tmpResourceData = theContent;
        var tmpName = theName;
        theType = resourceAlias[theType] || theType;
        var tmpNS = tmpOptions.ns || tmpOptions.pageNamespace || tmpOptions.pageName || '';
        if (!tmpNS) {
            //--- Auto sense a namespace function, use it if present
            if (ThisApp.util.isFunc(tmpThis.ns)) {
                tmpNS = tmpThis.ns().replace(":", "");
            }
        }
        if (tmpNS) {
            if (theType == 'panels' && typeof (tmpResourceData) == 'object') {
                tmpResourceData = ThisApp.json(tmpResourceData, true);
            }
            if (typeof (tmpResourceData) == 'string') {
                tmpResourceData = ThisApp.getUpdatedMarkupForNS(tmpResourceData, tmpNS)
            }
            if (theType == 'panels' && typeof (tmpResourceData) == 'string') {
                tmpResourceData = ThisApp.json(tmpResourceData, true);
            }
        }
        if (theType == 'controls') {
            try {
                tmpResourceData = eval(tmpResourceData);
                tmpResourceData = ThisApp.controls.newControl(tmpResourceData.specs, tmpResourceData.options || {})
                tmpResourceData.parent = tmpThis;
            } catch (ex) {
                console.warn("Could not convert control to object", tmpResourceData);
            }
        } else if (theType == 'panels') {
            try {
                tmpResourceData = ThisApp.controls.newControl(tmpResourceData, {});
                tmpResourceData.parent = tmpThis;
            } catch (ex) {
                console.warn("Could not convert panel to object");
            }
        }
        tmpResourceData.baseURI = theFullPath;
        var tmpCheckPath = theFullPath;
        var tmpCheckPos = tmpCheckPath.indexOf("?");
        if (tmpCheckPos > -1) {
            tmpCheckPath = tmpCheckPath.substr(0, tmpCheckPos);
        }

        //ToDo: Where to do this?  In control on create - check it?
        if (isObj(tmpResourceData) && isObj(tmpResourceData.parent)) {
            ThisApp.loadWebResouces(tmpResourceData, tmpCheckPath, theFullPath);
        }

        tmpThis.addResource(theType, tmpName, theFullPath, tmpResourceData);
    }

    //--- theType: (controls, panels, html or templates)
    me.getResourceURIsForType = function (theType, theSpecs) {
        var tmpRet = [];
        var tmpSpecs = theSpecs;
        if (!(Array.isArray(tmpSpecs))) {
            tmpSpecs = [tmpSpecs];
        }


        //--- start with an array, even if single item passed
        for (var iSpec = 0; iSpec < tmpSpecs.length; iSpec++) {
            var tmpSpec = tmpSpecs[iSpec];

            //=== if a string, just add it as is, no name
            if (isStr(tmpSpec)) {
                tmpRet.push({ type: theType, uri: tmpSpec, name: tmpSpec })
            } else if (isObj(tmpSpec)) {
                var tmpBaseURL = tmpSpec.baseURL || '';
                if (tmpBaseURL && !tmpBaseURL.endsWith('/')) {
                    tmpBaseURL += '/';
                }
                if (Array.isArray(tmpSpec.list)) {
                    var tmpSpecItems = tmpSpec.list;
                    for (var iSpecItem = 0; iSpecItem < tmpSpecItems.length; iSpecItem++) {
                        var tmpSpecItem = tmpSpecItems[iSpecItem];
                        if (tmpBaseURL) {
                            tmpSpecItem = tmpBaseURL + tmpSpecItem;
                        }
                        tmpRet.push({ type: theType, uri: tmpSpecItem, name: tmpSpecItem })
                    }

                }
                
                if (isObj(tmpSpec.map)) {
                    for (var aURI in tmpSpec.map) {
                        var tmpEntryName = tmpSpec.map[aURI];
                        var tmpBaseMapURL = tmpBaseURL;

                        if (isObj(tmpEntryName)) {
                            
                            var tmpSource = tmpEntryName.source || tmpEntryName.catalog;
                            
                            var tmpEntrySpecs = tmpEntryName;
                            tmpEntryName = tmpEntryName.name;
                            if( tmpSource ){
                                if( ActionAppCore.dir.catalogs[tmpSource]){
                                    tmpBaseMapURL = ActionAppCore.dir.catalogs[tmpSource] + theType + '/';
                                } else {
                                    var tmpControlType = ThisApp.controls.getUnifiedName(theType);
                                    var tmpControlURL = '';
                                    var tmpControlName = tmpEntryName; 
                                    if( ActionAppCore.dir.catalogs.getResourceURL ){
                                        tmpControlURL = ActionAppCore.dir.catalogs.getResourceURL(tmpSource,tmpControlType,tmpControlName)
                                    } else if(ActionAppCore.dir.catalogs.getResourceCatalogURL) {
                                        tmpControlURL = ActionAppCore.dir.catalogs.getResourceCatalogURL(tmpSource,tmpControlType,tmpControlName)
                                    }
                                    if (tmpControlURL){
                                        aURI = tmpControlURL;
                                    } else {
                                        console.error("Developer error - no control found.",tmpEntrySpecs);
                                        aURI = false;
                                    }
                                }
                            }
                        }
                        if (aURI && tmpBaseMapURL) {
                            if (!(tmpBaseMapURL.endsWith('/'))) {
                                tmpBaseMapURL += '/';
                            }
                            aURI = tmpBaseMapURL + aURI;
                        }
                        if( aURI ){
                            tmpRet.push({ type: theType, uri: aURI, name: tmpEntryName })
                        }
                    }
                }
            }
        }
        return tmpRet;
    }

    me.addResource = function (theType, theName, theFullPath, theResourceData) {
        if (theType == 'templates') {
            //--- Always asssure templates are added at the application level
            ThisApp.addTemplate(theName, theResourceData);
        }
        this.res[theType] = this.res[theType] || {};
        ThisApp.resCache[theType] = ThisApp.resCache[theType] || {};
        ThisApp.resCache[theType][theFullPath] = theResourceData;
        this.res[theType][theName] = theResourceData;
    }

    CoreApp.layoutTemplates = {
        default: {
            spacing_closed: 8,
            spacing_open: 6,
            resizable: true,
            togglerLength_open: 100,
            togglerLength_closed: 100,
            center__maskContents:	true,
            south__resizable: false,
            south__closable: false,
            south__slidable: false,
            south__togglerLength_open: 0,
            south__spacing_open: 0,
            north__resizable: false,
            north__closable: false,
            north__slidable: false,
            north__togglerLength_open: 0,
            north__spacing_open: 0,
            enableCursorHotkey: false
        },
        defaultPage: {
            spacing_closed: 8,
            spacing_open: 6,
            resizable: true,
            togglerLength_open: 100,
            togglerLength_closed: 100,
            center__maskContents:	true,
            south__resizable: false,
            south__closable: false,
            south__slidable: false,
            south__togglerLength_open: 0,
            south__spacing_open: 0,
            north__resizable: false,
            north__closable: false,
            north__slidable: false,
            north__togglerLength_open: 0,
            north__spacing_open: 0,
            center__maskContents:	true,
            center__paneSelector: ".middle-center",
            north__paneSelector: ".middle-north",
            south__paneSelector: ".middle-south",
            west__paneSelector: ".middle-west",
            east: {
                paneSelector: ".middle-east",
                resizable: true,
                resizeWhileDragging: true,
                slidable: true
            },
            enableCursorHotkey: false
        },
        defaultControl: {
            spacing_closed: 8,
            spacing_open: 6,
            resizable: true,
            togglerLength_open: 100,
            togglerLength_closed: 100,
            center__maskContents:	true,
            south__resizable: false,
            south__closable: false,
            south__slidable: false,
            south__togglerLength_open: 0,
            south__spacing_open: 0,
            north__resizable: false,
            north__closable: false,
            north__slidable: false,
            north__togglerLength_open: 0,
            north__spacing_open: 0,
            east__size: "50%",
            west__size: "300",
            enableCursorHotkey: false
        },
        bigWest: {
            spacing_closed: 8,
            spacing_open: 6,
            resizable: true,
            togglerLength_open: 100,
            togglerLength_closed: 100,
            center__maskContents:	true,
            south__resizable: false,
            south__closable: false,
            south__slidable: false,
            south__togglerLength_open: 0,
            south__spacing_open: 0,
            north__resizable: false,
            north__closable: false,
            north__slidable: false,
            north__togglerLength_open: 0,
            north__spacing_open: 0,
            east__size: "15%",
            west__size: "40%",
            enableCursorHotkey: false
        },
        customDemo1: {
            spacing_closed: 8,
            spacing_open: 6,
            resizable: true,
            togglerLength_open: 100,
            togglerLength_closed: 100,
            center__maskContents:	true,
            south__resizable: false,
            south__closable: false,
            south__slidable: false,
            south__togglerLength_open: 0,
            south__spacing_open: 0,
            north__resizable: true,
            north__closable: true,
            north__slidable: true,
            enableCursorHotkey: false
        }
    }

    me.layoutTemplates = CoreApp.layoutTemplates;
    //--- Added for backward compatibility
    me.waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "shouldUseID";
            }
            if (timers[uniqueId]) {
                clearTimeout(timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();

    /**
       * getUpdatedMarkupForNS
       *  - Returns HTML content that has the been prefixed with "namespace:"
       * 
       * @param  {String} theHTML   [The HTML markup to be converted]
       * @return {String} [The Transformed HTML]
       * 
       * 
       */
    me.getUpdatedMarkupForNS = getUpdatedMarkupForNS;
    function getUpdatedMarkupForNS(theHTML, theNS) {
        try {
            return theHTML.replace(/_page_:/g, theNS + ":")
                // .replace(/pagespot="/g, 'spot="' + theNS + ":")
                // .replace(/pageaction="/g, 'action="' + theNS + ":")
                .replace(/\"pagectl\": \"/g, '"ctl": "' + theNS + ":")
            // .replace(/\"pagespot\": \"/g, '"spot": "' + theNS + ":")
            // .replace(/\"pageaction\": \"/g, '"action": "' + theNS + ":")
        } catch (ex) {
            console.error("Error getting updated markup " + ex);
            return theHTML;
        }
    }

    /**
       * loadSpot
       *  - Load HTML content or renders a jsRender template into a known spot name
       * 
       * Example: ThisApp.loadSpot('myarea:out', '', 'tpl-some-registered-template');
       *   - This loads the spot <div spot="myarea:out" ... with a rendered template 'tpl-some-registered-template'
       * 
       * Note:  theContent is usually HTML if no template name passed
       *        theContent can be blank, a string value or an objet to be passed into the template for rendering
       *        if there is a string value for theRenderer, 
       *         ... theRenderer is used to render the content and theContent passed as the input
       *        if there is an object value for theRenderer, 
       *         ... theRenderer is expected to be a React component to render using the data as props
       *        if there is an function value for theRenderer, 
       *         ... theRenderer function is run, passing in theName and theContent and uses the return value
       * 
       * 
       * @param  {String} theName   [The name of the spot to load]
       * @param  {String} theContent   [The content to load or object to use when rendering the template]
       * @param  {String} theRenderer   [The rendering agent for this content if applicable]
       * @param  {String} theOptionalParent$   [The jQuery element to use instead of global]
       * @param  {String} theOptionalTagName   [The tag name to use (i.e. pagespot)]
       * 
       * @return void
       * 
       * 
       */
    me.loadSpot = function (theName, theContent, theRenderer, theOptionalParent$, theOptionalTagName) {
        var tmpContent = theContent || '';
        if (theRenderer) {
            if( typeof(theRenderer) == 'string'){
                tmpContent = me.getTemplatedContent(theRenderer, tmpContent);
            } else if( this.util.isReactClass(theRenderer) ){
                tmpContent = ThisApp.react.createElement(theRenderer, theContent);
            } else if( typeof(theRenderer) == 'function'){
                tmpContent = theRenderer(theName, theContent);
            } else {
                console.error('ActionApp loadSpot: Unknown content type',typeof(theContent), theContent);
                return false;
            }
        }
        var tmpSpot = me.getSpot$(theName, theOptionalParent$, theOptionalTagName)
        if (tmpSpot) {
            try {
                if( typeof(tmpContent) == 'object'){
                    for( var iPos = 0 ; iPos < tmpSpot.length ; iPos++){
                        var tmpSpotEl = tmpSpot[iPos];
                        var tmpData = $(tmpSpotEl).data();
                        if( tmpData && tmpData._reel ){
                            ThisApp.react.unmountComponentAtNode(tmpSpotEl);
                            delete tmpData._reel;
                        }
                        var tmpReelObj = ThisApp.react.render(tmpContent, tmpSpotEl);
                        $(tmpSpotEl).data({_reel:true, _reobj: tmpReelObj});
                    }
                } else {
                    tmpSpot.html(tmpContent);
                }
            } catch (ex) {
                console.error("loadSpot error",ex);
                return false;
                //--- ToDo: Global error handling
            }
        }
        return tmpSpot;
    }

    /**
       * addToSpot
       *  - Appends or Prepends to existing spot content
       * 
       * Example: See loadSpot for more details
       * 
       * 
       * @param  {String} theName   [The name of the spot to append/prepend to]
       * @param  {String} theContent   [The content to load or object to use when rendering the template]
       * @param  {String} theRenderer   [The rendering agent for this content if applicable (React not allowed for append operation)]
       * @param  {String} thePrepend   [true to prepend, blank or false to append (default)]
       * @param  {String} theOptionalParent$   [The jQuery element to use instead of global]
       * @param  {String} theOptionalTagName   [The tag name to use (i.e. pagespot)]
       * @return void
       * 
       * 
       */

    me.addToSpot = function (theName, theContent, theRenderer, thePrepend, theOptionalParent$, theOptionalTagName) {
        var tmpContent = theContent || '';
        if (theRenderer) {
            if(typeof(theRenderer) == 'string'){
                tmpContent = me.getTemplatedContent(theRenderer, tmpContent);
            } else if( typeof(theRenderer) == 'function'){
                tmpContent = theRenderer(theName, theContent);
            } else {
                tmpContent = $R.createElement(theRenderer, theContent);
            }
        }
        var tmpSpot = me.getSpot$(theName, theOptionalParent$, theOptionalTagName)
        if( typeof(tmpContent) == 'object'){
            //ToDo: Allow this?
            console.error("Can not append to spot using React controls, one per spot");
        } else {
            if (thePrepend === true) {
                tmpSpot.prepend(tmpContent);
            } else {
                tmpSpot.append(tmpContent);
            }
        }

        return tmpSpot;
    }

    /**
  * asEl
  *  - Returns jQuery element ...
  *    -  jQuery element passed, returns object
  *    -  if string passed, returns object from selector
  *    -  if base element passed, converts to DOM
  */
    me.asEl = function (theEl) {
        if (theEl instanceof jQuery) {
            return theEl;
        }
        return $(theEl);
    }
    /**
   * asSpot$
   *  - Returns jQuery element ...
   *    -  jQuery element passed, returns object
   *    -  if string passed, returns spot from ThisApp
   *    -  if base element passed, converts to DOM
   */
    me.asSpot$ = function (theEl) {
        if (theEl instanceof jQuery) {
            return theEl;
        }
        if (isStr(theEl)) {
            return ThisApp.getSpot$(theEl);
        }
        return $(theEl);
    }
    me.asSpot = me.asSpot$

    /**
   * getSpot$
   *  - Returns jQuery element for the spot name provided
   *  - Optionally pass a parent element as the DOM to look in
   *  - If a jQuery element is passed as the name, it returns it
   *    .. this is so you can hot swap any jQuery element for spot use
   * 
   * Example: 
   *   var tmpEl = ThisApp.getSpot('main:out')
   *   var tmpEl = ThisApp.getSpot('main:out',parentEl)
   * 
   * @param  {String} theName   [The name of the spot to append/prepend to]
   * @param  {jQuery Element} theOptionalParent$   [The parent to find in, uses global search if not provided]
   * @param  {String} theOptionalTagName   [The tag name to use (i.e. pagespot)]
   * @return {jQuery Element} [The spot element]
   * 
   */
    me.getSpot$ = function (theName, theOptionalParent$, theOptionalTagName) {
        if (ThisApp.util.isjQuery(theName)) {
            return theName;
        }
        var tmpTagName = theOptionalTagName || 'spot';
        var tmpSelector = '[' + tmpTagName + '="' + theName + '"]';
        var tmpSpot = false;
        if (theOptionalParent$) {
            tmpSpot = $(tmpSelector, theOptionalParent$.get(0));
        } else {
            tmpSpot = $(tmpSelector);
        }

        return tmpSpot;
    }
    me.spot$ = me.getSpot$; //shortcuts
    me.spot = me.getSpot$; //shortcuts
    me.getSpot = me.getSpot$; //shortcuts


    me.getPage = getPage;
    function getPage(thePageName) {
        var appModule = ActionAppCore.module('app');
        var tmpPage = appModule[thePageName];
        return tmpPage;
    }
    /**
       * openPage Action
       * Assures a page is loaded and opens it either way
       *
       * @param  {String} thePageName   [The unique page name to open]
       * @return this
       */
    me.openPage = openPage;
    function openPage(theParams, theTarget) {
        var dfd = jQuery.Deferred();
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['page', 'name', 'pagename', 'item']);
        var tmpPageName = tmpParams.pagename || tmpParams.page || tmpParams.name || tmpParams.item || '';

        var appModule = ActionAppCore.module('app');
        var tmpPage = appModule[tmpPageName];

        if (tmpPage) {
            me.gotoPage(tmpPageName);
            dfd.resolve(true)
        } else {
            //--- load it up then ... 
            var tmpURL = './app/pages/' + tmpPageName + '/index.js?open'
            ThisApp.apiCall({
                url: tmpURL,
                dataType: "script"
            }).then(function () {
                //--- ToDo: Move this functionality up / see if correct place
                //--- Init Module to register
                ThisApp.initModuleComponents(ThisApp, 'app', [tmpPageName]);
                //--- Get controller and init it
                var tmpController = ThisApp.getComponent("app:" + tmpPageName);
                if (tmpController && typeof (tmpController.init) == 'function') {
                    tmpController.init(ThisApp);
                }

                //--- just in case, 100 ms to say hello
                ThisApp.delay(100).then(function (theReply) {
                    ThisApp.gotoPage(tmpPageName);
                    dfd.resolve(true)
                })
            })
        }

        return dfd.promise();
    }

    /**
       * gotoPage
       * Goes to a page on the site
       *
       * @param  {String} thePageName   [The unique page name to open]
       * @return this
       */
    me.gotoPage = function (thePageName) {
        me.gotoTab({ group: 'app:pages', item: thePageName, animation: 'fade in', duration: 100 });
        var tmpActionObj = ThisApp.getNavConfig(thePageName);
        if (tmpActionObj && typeof (tmpActionObj.onActivate) == 'function') {
            tmpActionObj.onActivate();
        }
        me.hideSidebar();

        ThisApp.refreshLayouts();
        return me;
    }


    /**
     * Show / hide the sidebar
     *
     * @param  {Boolean} theIsVis   [true to show, false to hide]
     * @return this
     */


    me.sidebarSetDisplay = function (theIsVis) {
        $('[appuse="side-menu"]').sidebar((theIsVis !== false) ? 'show' : 'hide');
        return me;
    }
    me.hideSidebar = function () {
        return me.sidebarSetDisplay(false);
    }
    me.showSidebar = function () {
        return me.sidebarSetDisplay(true);
    }

    me.getHTMLForTabs = function (theGroup, theItem, theTabText) {
        var tmpGroup = theGroup || '';
        var tmpItem = theItem || '';
        if (!(tmpItem && tmpGroup)) {
            return ''
        }

        var tmpCardHTML = '<div appuse="cards" group="' + tmpGroup + '" item="' + tmpItem + '" class="hidden"></div>';
        var tmpTabHTML = '<div action="selectMe" class="item active" appuse="tablinks" group="' + tmpGroup + '" item="' + tmpItem + '" >' + theTabText + '</div>';

        var tmpRet = {
            card: tmpCardHTML,
            tab: tmpTabHTML
        }

        return tmpRet;

    }

    /**
     * gotoTab
     * 
     * To Use:  
     * 
     *  Go to a top level page
     *      ThisApp.gotoTab({page:'mainpage'})
     *  Go to a sub tab (assuming on current main page)
     *      ThisApp.gotoTab({group:'some:group', item:'some:item"})
     *  Go to a top level page and a sub tab on that page
     *      ThisApp.gotoTab({page:'mainpage', group:'some:group', item:'some:item"})
     *
     * Options:
     *  - group = Name of the group, usually namespaced like main:tabs
     *  - item = Name of the item to show within the group, like 'main'
     *  - page = Optional primary page to open in case on a different page
     * 
     * Example: 
     *          var tmpInitialSpot = {
     *            page:'logs',
     *            group:'logs:tabs',
     *            item: 'jobs'
     *          };
     *          ThisApp.gotoTab(tmpInitialSpot);
     *
     *
     * @param  {Object} theOptions   [object with details that control what tab and/or page to open]
     * @return this
     */
    me.gotoTab = function (theOptions, theOptionalItemName, theOptionalPageName) {
        var tmpOptions = theOptions || {};
        if (typeof (theOptions) == 'string' && theOptionalItemName) {
            var tmpNewOptions = {
                group: theOptions,
                item: theOptionalItemName
            }
            if (theOptionalPageName) {
                tmpNewOptions.page = theOptionalPageName;
            }
            return me.gotoTab(tmpNewOptions)
        }

        var tmpHadPage = false;
        if (tmpOptions.hasOwnProperty('page')) {
            me.gotoPage(tmpOptions.page);
            tmpHadPage = true;
        }
        if ((tmpOptions.group && tmpOptions.item)) {
            me.gotoTabLink(tmpOptions);
            me.gotoCard(tmpOptions);
        } else {
            if (!tmpHadPage) {
                console.error("Can not go to tab, group and item are required.")
            }
        }
        ThisApp.publish('gotoTab', { group: tmpOptions.group, item: tmpOptions.item })

        return me;
    }

    /**
     * gotoCard
     *   - Hides all the related cards and show the card within a card group
     * 
     * Options:
     *  - group = Name of the group, usually namespaced like main:tabs
     *  - item = Name of the card to show within the group, like 'main'
     *  - parent = Optional parent jQuery element to look inside
     *  
     * To Use:  
     * 
     *  Show the specific card in the group, assuming to look at the entire page 
     *      ThisApp.gotoCard({group:'some:group', item:'some:item'})
     *  Show the specific card in the group, within the parent element passed
     *      ThisApp.gotoCard({group:'some:group', item:'some:item', parent: someEl})
     *
     * @param  {Object} theOptions   [object with details that control what tab and/or page to open]
     * @return this
     */

    me.gotoCard = function (theOptions) {
        var tmpOptions = theOptions || {};
        var tmpGroupName = tmpOptions.group || '';
        var tmpItemId = tmpOptions.item || '';
        var tmpParent = theOptions.parent || undefined;
        var tmpAnimation = tmpOptions.animation || 'silent';
        var tmpAnimDuration = tmpOptions.duration || 250;
        var tmpSelector = {
            appuse: 'cards',
            group: tmpGroupName
        }

        me.getByAttr$(tmpSelector, tmpParent).addClass('hidden').transition('hide', 1);
        tmpSelector.item = tmpItemId;
        me.getByAttr$(tmpSelector, tmpParent).removeClass('hidden').transition('show', 1);
        if (ThisApp.refreshLayouts) {
            ThisApp.refreshLayouts();
        }
        return me;
    }


    /**
     * gotoTabLink
     *   - Hides all the related cards and show the card within a card group
     * 
     * Options:
     *  - group = Name of the group, usually namespaced like main:tabs
     *  - item = Name of the card to show within the group, like 'main'
     *  - parent = Optional parent jQuery element to look inside
     *  
     * To Use:  
     * 
     *  Show the specific card in the group, assuming to look at the entire page 
     *      ThisApp.gotoCard({group:'some:group', item:'some:item'})
     *  Show the specific card in the group, within the parent element passed
     *      ThisApp.gotoCard({group:'some:group', item:'some:item', parent: someEl})
     *
     *
     * @param  {Object} theOptions   [object with details about the page / tab to open]
     * @return void
     */
    me.gotoTabLink = function (theOptions) {
        var tmpOptions = theOptions || {};
        var tmpGroupName = tmpOptions.group || '';
        var tmpItemId = tmpOptions.item || '';
        var tmpParent = theOptions.parent || undefined;
        var tmpAnimation = tmpOptions.tabAnimation || 'fade';
        var tmpAnimDuration = tmpOptions.duration || 1000;

        //--- Create a list of attributes to look for
        //  * appuse is tablink and the group is this group
        var tmpSelector = {
            // appuse: 'tablinks',
            group: tmpGroupName
        }
        //--- Remove the 'active' class from all matching items for this group that are tablinks
        //--- Note: The getByAttr$ returns the elements, jQuery's removeClass 
        //          returns the elements being effected for chaining
        me.getByAttr$(tmpSelector, tmpParent)
            .removeClass('active');


        //--- Add the item selector to update the search to find just the one that is active
        tmpSelector.item = tmpItemId;
        //--- Add the 'active' class to the one item we have
        //--- Note: This calls me.getByAttr$ not ThisApp.getByAttr$, which by default only searches this tab page content
        me.getByAttr$(tmpSelector, tmpParent).addClass('active');
    }


    //--- Public ================ ================= ===================== ================

    me.getData = function(theKey){
        return this.context.data[theKey];
    }
    me.setData = function(theKey, theData){
        this.context.data[theKey] = theData;
        return this;
    }
    me.hasData = function(theKey, theData){
        return this.context.data.hasOwnProperty(theKey);
    }
    me.getDataObject = function(theKey){
        if( !this.hasData(theKey)){
            this.setData(theKey,{});
        }
        return this.getData(theKey);
    }
    me.setDataObject = function(theKey, theObject, theMergeWithExisting){
        var tmpToAdd = ThisApp.clone(theObject || {});
        if( !this.hasData(theKey)){
            this.setData(theKey,tmpToAdd);
        } else {
            if( theMergeWithExisting === true ){
                //ToDo: merge with existing
            }
            this.setData(tmpToAdd);
        }
        return this;
    }
    

    /**
     * getAttrs
     *    - returns an object with the attribute values matching the array of names passed
     * 
     * To Use: var tmpAttribs = ThisApp.getAttrs(anyEl,['item','group']);
     *    - returns an object with {item:"val",group:"val"}
     *
     */
    me.getAttrs = function (theEl, theAttrList) {
        var tmpRet = {};
        if (!theEl) {
            return tmpRet;
        }
        var tmpAttrList = theAttrList || [];
        if (typeof (tmpAttrList) == 'string') {
            tmpAttrList = [tmpAttrList];
        }
        if (isObj(tmpAttrList) && !Array.isArray(tmpAttrList)) {
            var tmpNewList = [];
            for (var aName in tmpAttrList) {
                tmpNewList.push(aName);
            }
            tmpAttrList = tmpNewList;
        }
        var tmpEl = $(theEl);
        for (aAttrPos in tmpAttrList) {
            var tmpAName = tmpAttrList[aAttrPos];
            if (tmpAName) {
                tmpRet[tmpAName] = tmpEl.attr(tmpAName);
            }
        }
        return tmpRet;
    }

    /**
     * getByAttr$
     *    - returns a jQuery element collection (which may be one) that matches the attributes passed
     *    - the same as using [ATTRIBUTENAME="SOMEVALUE"][ATTRIBUTENAME2="SOMEVALUE2"]
     * 
     * To Use: var tmpEls = ThisApp.getByAttr$({ group: "THEGROUPNAME", "item": "THEITEMNAME" })
     *    - returns jQuery elements, use as usual  -  i.e. tmpEls.html(tmpContentHTML); or tmpEls.removeClass('active');
     * 
     * Note: If a blank value is passed
     * 
     *
     * @param  {Object} theItems   [object where the name is the attibute and the value is the value to look for]
     * @param  {Object} theParent   [parent object to search in, if not provided, a global search is done]
     * @param  {Boolean} theExcludeBlanks   [set to true to ignore blank values]
     *         * Important: By default if an attribute that has no value to find is passed (present but blank)
     *                then ALL items that contain the attribute will be included.
     *                 the same as using [ATTRIBUTENAME="SOMEVALUE"][ATTRIBUTENAME2]
     *           Setting theExcludeBlanks to true will use [ATTRIBUTENAME="SOMEVALUE"] (leaving the item out)
     * 
     * @return {$el} [jQuery element collection (which may be one)]
     */
    me.getByAttr = me.getByAttr$;
    me.getByAttr$ = function (theItems, theParent, theExcludeBlanks) {
        if (!theItems) {
            return false;
        }
        var tmpFoundItems = false;
        var tmpSS = '';
        for (aItemName in theItems) {
            if ((aItemName)) {
                var tmpVal = theItems[aItemName];
                tmpFoundItems = true;
                var tmpSSItem = '';
                if (tmpVal) {
                    tmpSSItem = '[' + aItemName + '="' + tmpVal + '"]'
                } else {
                    if (theExcludeBlanks !== true) {
                        tmpSSItem = '[' + aItemName + ']'
                    }
                };
                tmpSS += tmpSSItem;
            }
        }

        if (!tmpFoundItems) {
            return false;
        }

        var tmpParent = false;
        if (theParent) {
            //--- Convert if there is a parent and it is not a jQuery element already
            if (typeof (theParent) != 'string' && theParent.hasOwnProperty('nodeType')) {
                tmpParent = $(theParent);
            } else {
                tmpParent = theParent;
            }
        }
        if (tmpParent) {
            return tmpParent.find(tmpSS);
        } else {
            return $(tmpSS);
        }

    }

    /**
     * getActionParams
     *    - returns an object with name / value pairs for all params
     * 
     * To Use: var tmpParams = ThisApp.getActionParams(theAction, theTarget, ['param1','param2','param3'])
     *    - returns an object with {your:'params' ...}
     * 
     *
     * @param  {Object} theAction   Object if caller is passing array of params, simpy gets passed back
     * @param  {Object} theTarget   The DOM Element that was clicked, param attributes pulled from this if passed
     *                              .. if blank then the assumption is that theAction is an object with the params needed
     * @param  {String Array} theParamList   [list of param names to look for]
     * 
     * @return {Object} [name = param, value = param value]
     */
    me.getActionParams = function (theParams, theTarget, theParamList) {
        if (!theTarget) {
            if (isStr(theParams)) {
                return { default: theParams }
            } else {
                return theParams || {};
            }
        }
        var tmpRet = {};
        tmpEl = $(theTarget);
        for (var iPos = 0; iPos < theParamList.length; iPos++) {
            var tmpParamName = theParamList[iPos];
            var tmpParamVal = tmpEl.attr(tmpParamName);
            if (typeof (tmpParamVal) != 'undefined') {
                tmpRet[tmpParamName] = tmpParamVal;
            }
        }
        return tmpRet;
    }

    me.initModuleComponents = initModuleComponents;
    function initModuleComponents(theApp, theModuleName, theComponents) {
        var appModule = ActionAppCore.module(theModuleName);
        for (var aPos in theComponents) {
            var tmpComp = theComponents[aPos];
            try {
                var tmpCompName = theComponents[aPos];
                var tmpComp = appModule[tmpCompName];
                theApp.registerComponent(theModuleName + ":" + tmpComp.pageName, tmpComp);
            } catch (ex) {
                console.error("Error in init component: " + theModuleName, ex);
            }
        }
    }


    /**
     * useModuleComponentsuseModuleComponents
     *    - Initializes application components from the modules they live in
     * 
     * To Use: 
     *   var tmpAppComponents = ['DataTablesPage', 'PouchPage', 'LogsPage'];
     *   var tmpPluginComponents = ['DataTables'];
     *   ThisApp.useModuleComponents('app', tmpAppComponents)
     *   ThisApp.useModuleComponents('plugin', tmpPluginComponents)
     *
     *  Note: Order matters, they load in the order provided, 
     *        ... if components add their own navigational items, the navigation items show in that order
     *
     * @param  {String} theModuleName   [the name of the module (i.e. app or plugin or any custom module)]
     * @param  {Array<String/Object>} theComponents   [List of components to load form this module, in the order they should initialize.  Pass string for just plugin  or {name:yourname,options:optionalOptions}]
     * @return void
     */
    me.useModuleComponents = useModuleComponents;
    function useModuleComponents(theModuleName, theComponents) {
        if (!theModuleName && theComponents) {
            console.error("Need both theComponents and theModuleName");
            return false;
        }
        var tmpComponents = theComponents || [];

        var tmpModule = ActionAppCore.module(theModuleName);
        if (!(tmpModule)) {
            console.error("Module not found: " + tmpModule);
            return false;
        }
        for (var aPos in tmpComponents) {
            var tmpComp = tmpComponents[aPos];
            if (typeof (tmpComp) == 'string') {
                tmpComp = { name: tmpComp };
            }
            var tmpName = tmpComp.name || '';
            if (tmpName) {
                try {
                    var tmpOptions = tmpComp.options || {};
                    $.extend(tmpOptions, { app: ThisApp });
                    var tmpNew = new tmpModule[tmpName](tmpOptions);
                } catch (ex) {
                    console.error("Error loading component: " + tmpName);
                }
            } else {
                console.error("Attempting to load plugin, but no name provided.", tmpComp);
            }

        }
        return true;
    }


    /**
     * getComponent
     *    - Returns any registered component by full name
     * 
     * To Use: 
     *   me.dt = ThisApp.getComponent("plugin:DataTables");
     *    - or - 
     *   me.logs = ThisApp.getComponent("app:Logs");
     *
     *  Note: You can then call the related component functions
     *        There is no need to get the component to use the related registered actions (i.e. <div action="logs:doSomeAction")
     *
     * @param  {String} theName   [the full name of the component to load including module name]
     * @return void
     */
    me.getComponent = getComponent;
    function getComponent(theName) {
        return me.components[theName];
    }

    /**
     * registerComponent
     *    - Register a component that can be received using getComponent
     * 
     * To Use: Implement your controller as shown below and register with the full module:ComponentName
     * 
     * 
     * Example: 
     * 
     * function ThisPageController(theOptions) {
     *   me.options = theOptions || {};
     *   me.actions = me.options.actions || {};
     *   var defaults = {};
     *   if (typeof (me.options.app) == 'object') {
     *       var tmpApp = me.options.app;
     *       if (tmpApp && tmpApp.registerComponent) {
     *           tmpApp.registerComponent("app:PouchPage", this);
     *       }
     *   }
     * }
     *
     * @param  {String} theName   [the full name of the component to register including module name]
     * @param  {Object} theController   [The base object for the component being registered, usually "me"]
     * @return void
     */

    me.registerComponent = registerComponent;
    function registerComponent(theName, theController) {
        me.components[theName] = theController;
    }

    /**
     * registerAction
     *    - Register an action
     * 
     * Note: Usually components register a single action delegate function for all in the registered namespace
     *       ... see "registerActionDelegate" for details.
     * 
     * Example: 
     *   ThisApp.registerAction("doSomethingSpecial", me.doSomethingSpecial);
     * 
     *
     * @param  {String} theActionName   [the name of the action, do NOT include any module name prefix (:) here]
     * @param  {Object} theFunction   [The standard "Action" function to handle the action pass (action name, target object)]
     * @return void
     */
    me.registerAction = registerAction;
    function registerAction(theActionName, theFunction) {
        ThisCoreApp.actions[theActionName] = theFunction;
    }

    me.unRegisterAction = unRegisterAction;
    function unRegisterAction(theActionName) {
        if (typeof (ThisCoreApp.actions[theActionName]) != 'undefined') {
            delete ThisCoreApp.actions[theActionName];
        }
    }

    /**
     * registerActionDelegate
     *    - Register an delegate for all actions with a prefix using (:)
     * 
     * 
     * Example: 
     *   ThisApp.registerActionDelegate("previews", runAction);
     *    - this makes any <div action="previews:doSomething" .. 
     *     ...   go be routed to the callback "runAction" delegate function
     *
     * @param  {String} theActionDelegateName   [the prefix to use (do not iclude the ":")]
     * @param  {Function} theDelegate   [The standard "Action" function to handle the action pass (action name, target object)]
     * @return void
     */
    me.registerActionDelegate = registerActionDelegate;
    function registerActionDelegate(theActionDelegateName, theDelegate) {
        ThisCoreApp.actionsDelegates[theActionDelegateName] = theDelegate;
    }





    /**
     * runAppAction
     *    - Manually run an action passing the name and target object (jQuery element)
     * 
     * Example: 
     *   ThisApp.runAppAction("doSomethingSpecial", someEl);
     * 
     *
     * @param  {String} theAction   [the name of the action, you can include a module name prefix (:) here]
     * @param  {Object} theObject   [The object that contains the attributes that provide the target action parameters]
     * @return void
     */
    me.runAppAction = runAppAction;
    function runAppAction(theAction, theObject) {
        var tmpAction = theAction || '';
        var tmpASPos = tmpAction.indexOf(":");
        var tmpActionSpace = '';
        var tmpRan = false;

        var tmpObject = theObject;

        if (tmpASPos > -1) {
            tmpActionSpace = tmpAction.substr(0, tmpASPos);
            if (tmpActionSpace && ThisApp.actionsDelegates.hasOwnProperty(tmpActionSpace)) {
                var tmpAD = ThisApp.actionsDelegates[tmpActionSpace];
                if (typeof (tmpAD) == 'function') {
                    tmpAction = tmpAction.replace((tmpActionSpace + ":"), "");
                    tmpRan = true;
                    tmpAD(tmpAction, tmpObject);
                }
            }
        }

        if (!tmpRan) {
            var tmpAction = ThisCoreApp.actions[theAction] || ThisCoreApp[theAction];
            if (tmpAction) {
                return tmpAction(theAction, tmpObject);
            } else {
                console.error("No registered action for " + theAction);
                return null
            }
        }
    }

    /**
     * hideCommonDialog
     *    - Hidex the common dialog box if open
    */
    me.hideCommonDialog = hideCommonDialog;
    function hideCommonDialog() {
        getCommonDialog().modal('hide');
    }

    me.clearCommonDialog = clearCommonDialog
    function clearCommonDialog() {
        ThisApp.loadSpot('site:dialog-header', '');
        ThisApp.loadSpot('site:dialog-content', '');
        ThisApp.loadSpot('site:dialog-footer', '');
    }
    /**
     * showCommonDialog
     *    - Shows the common dialog box with content provided
     * 
     * 
     * Example: 
     *   ThisApp.showCommonDialog();
     *
     * @param  {Object} theOptions   [The options object with header and content and optional actions]
     * 
     * theOptions ...
     * 
     * Dialog content:
     *   header: String for HTML or Object with content and data
     *   content: String for HTML or Object with content and data
     *   footer: String for HTML or Object with content and data
     *     Note: Footer usually used for actions
     * 
     * Callback Functions: 
     *   onBeforeClose = function that is called before the dialog closes
     *    Note: When used, ESC and clicking off the dialog do NOT close the dialog
     *        When used - return false to not allow the dialog to close (i.e. validation)
     *        This is used for forms and advanced dialogs
     * 
     *   onClose = function that is called AFTER the dialog closes
     *   onShow = function that is called when the dialog loads
     * 
     * @return this
     */
    me.showCommonDialog = showCommonDialog;

    var commonDialogCallbackOnShow = false;
    var commonDialogCallbackOnHide = false;
    var commonDialogCallbackOnHidden = false;

    function showCommonDialog(theOptions) {
        var tmpHeader = theOptions.header || '';
        var tmpContent = theOptions.content || '';
        var tmpFooter = theOptions.footer || '';

        var tmpOnClose = theOptions.onClose || '';
        var tmpOnBeforeClose = theOptions.onBeforeClose || '';
        var tmpOnOpen = theOptions.onOpen || '';

        var tmpCloseText = theOptions.closeText || 'Close';
        ThisApp.getSpot$('site:dialog-close-text').html(tmpCloseText);

        var tmpDialog = getCommonDialog();

        if (typeof (tmpOnBeforeClose) == 'function') {
            commonDialogCallbackOnHide = tmpOnBeforeClose;
            //--- If we are going to allow a stop of close, this is needed
            tmpDialog.modal('setting', { allowMultiple: true, closable: false });
        } else {
            //--- This is a normal dialog, allow esc and off-click to close
            tmpDialog.modal('setting', { allowMultiple: true, closable: true });
        }
        if (typeof (tmpOnClose) == 'function') {
            commonDialogCallbackOnHidden = tmpOnClose;
        }
        if (typeof (tmpOnOpen) == 'function') {
            commonDialogCallbackOnShow = tmpOnOpen;
        }
        if (typeof (tmpContent) == 'object') {
            tmpContent = me.getTemplatedContent(tmpContent);
        }
        if (tmpHeader === '') {
            tmpHeader = '&nbsp;';
        } else if (typeof (tmpHeader) == 'object') {
            tmpHeader = me.getTemplatedContent(tmpHeader);
        }
        if (tmpFooter === '') {
            //ThisApp.getSpot$('site:dialog-footer').css('display','none')

            ThisApp.getSpot$('site:dialog-footer').removeClass('actions');
        } else if (typeof (tmpFooter) == 'object') {
            tmpFooter = me.getTemplatedContent(tmpFooter);
            ThisApp.getSpot$('site:dialog-footer').addClass('actions');
            //ThisApp.getSpot$('site:dialog-footer').css('display','')
        }



        ThisApp.loadSpot('site:dialog-header', tmpHeader);
        ThisApp.loadSpot('site:dialog-content', tmpContent);
        ThisApp.loadSpot('site:dialog-footer', tmpFooter);

        tmpDialog.modal('show');

        setTimeout(resetDialogBodyArea, 10)

        return me;
    }

    function resetDialogBodyArea() {
        var tmpHeader = ThisApp.getSpot$('site:dialog-header');
        var tmpBody = ThisApp.getSpot$('site:dialog-content');
        var tmpFooter = ThisApp.getSpot$('site:dialog-footer');

        var tmpOutHeight = tmpHeader.get(0).clientHeight + tmpFooter.get(0).clientHeight;
        tmpOutHeight = tmpOutHeight + 80;
        var tmpWiHeight = $(window).height();
        var tmpBodyNewH = (tmpWiHeight - tmpOutHeight) + 'px';
        tmpBody.css({ "height": tmpBodyNewH, "overflow": "auto" });
    }

    me.closeCommonDialog = closeCommonDialog;
    function closeCommonDialog() {
        getCommonDialog().modal('hide');
    }

    /**
     * Template Manager Functionality 
     * 
     *    Common method of getting templated HTML
     *
     */

    /**
     * getTemplatedContent
     * 
     *    Common method of getting templated content by name
     *
     * @param  {String} theTemplateName   [The name of the template to pull]
     * @param  {Object} theData   Optional, needed if template expects one
     * @param  {Object} theOptions   Optional, any options supported by this or calling methods
     * @return void
     */
    me.getTemplatedContent = function (theOptionsOrTemplateName, theDataIfNotObject, theOptions) {
        var tmpTemplateName = theOptionsOrTemplateName;
        var tmpData = theDataIfNotObject;
        if (typeof (theOptionsOrTemplateName) == 'object') {
            tmpTemplateName = theOptionsOrTemplateName.template;
            tmpData = theOptionsOrTemplateName.data || theDataIfNotObject || '';
        }
        tmpData = tmpData || '';
        if (!(tmpTemplateName)) {
            console.error("Need to pass template name as a string or an object with a .template")
            return;
        }

        return me.renderTemplate(tmpTemplateName, tmpData, theOptions);
    }
    me.tplIndex = {};



    /**
     * compileTemplates
     *    - Looks for <pre> or <script> objects that contain template markup
     *    - Get the name of the attribute and the content, add the content to the templates with the attribute name
     *
     * @param  {String} theOptionalAttrName  Pass in the attribute name to look for templats inside
     * @param  {Object} theOptionalAttrName  Pass in the parent jQuery element to start with, uses default for getByAttr if not provided
     * @return void
     */
    me.compileTemplates = function (theOptionalAttrName, theOptionalTarget) {
        var tmpAttrName = theOptionalAttrName || "data-htpl";
        var tmpSelector = {};
        //--- Init what to look for, anything with this attribute
        tmpSelector[tmpAttrName] = "";
        //--- Get all elements with this attribute
        ThisApp.getByAttr$(tmpSelector, theOptionalTarget).each(function (theIndex) {
            var tmpEl$ = $(this);
            var tmpKey = "" + tmpEl$.attr(tmpAttrName);
            me._templates[tmpKey] = Handlebars.compile(this.innerHTML);
            this.innerHTML = '';
        });
    }
    /**
        * addTemplate
        *    - Adds / compiles Handlebars template
        *
        * @param  {String} theKey  The unique name for this template
        * @param  {Object} theHTML  The HTML to include
        * @return void
        */
    me.addTemplate = function (theKey, theHTML) {
        me._templates[theKey] = Handlebars.compile(theHTML);
    }

    me._templates = {};
    me.renderTemplate = function (theName, theContext) {
        try {
            var tmpFn = (ThisApp._templates[theName]);
            return tmpFn(theContext);
        } catch (theError) {
            console.error("Error rendering template " + theError, "Name was " + theName);
        }
    }


    me.resizeToLayout = function (theEl) {
        if (!isjQuery(theEl)) {
            theEl = $(theEl);
        }
        var tmpH = theEl.closest('.ui-layout-pane').height();
        theEl.css('height', '' + tmpH + 'px');
    }

    /**
    * getContext
    *    - Returns the application level context
    *
    * @param  {Object} theOptions  The details on the page and control the context should be created in
    * @return void
    */
    me.getContext = function () {
        var tmpRet = {}
        tmpRet.app = ThisApp.context
        return tmpRet;
    }


    //======================================
    //======================================
    //======================================


    //--- App Actions ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== 
    //--- ========  ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== 



    /**
     * AppAction: showPage
     * 
     * To Use:  <div action="showPage" item="THEPAGENAME">...
     *
     * @param  {String} theAction   [name of the action (showPage)]
     * @param  {Object} theTargetObj   [target object with details about the page to open]
     * @return this
     */
    var showPage = function (theAction, theTargetObj) {
        if (!theTargetObj) {
            theTargetObj = theAction;
        }
        var tmpEl = $(theTargetObj);
        var tmpPage = tmpEl.attr("pagename") || tmpEl.attr("name") || tmpEl.attr("item") || '';
        if (tmpPage) {
            me.gotoPage(tmpPage);
        } else {
            console.error("No item provided");
        }
        return me;
    }

    /**
     * AppAction: showSubPage
     * 
     * To Use:  <div action="showPage" group="THEGROUPNAME" item="THEPAGENAME" >...
     *
     * @param  {String} theAction   [name of the action (showSubPage)]
     * @param  {Object} theTargetObj   [target object with details about the page to open]
     * @return this
     */
    var showSubPage = function (theAction, theTargetObj, theOptionalParent) {
        if (!theTargetObj) {
            theTargetObj = theAction;
        }
        var tmpPage = $(theTargetObj, theOptionalParent).attr("item") || '';
        var tmpGroupName = $(theTargetObj, theOptionalParent).attr("group") || '';
        if (tmpPage && tmpGroupName) {
            me.gotoTab({ group: tmpGroupName, item: tmpPage, parent: theOptionalParent });
        } else {
            console.error("No pagename provided");
        }
    }

    //--- Internal Functionality ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== 
    //--- ========  ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== 
    function isFunc(theItem) {
        return (typeof (theItem) == 'function')
    }


    /**
    * me.commonDialog - globally used dialog, private variable used to assure proper usage
   */
    var commonDialog = null,
        commonDialogTemplate = 'tpl-common-global-dialog',
        commonDialogSpot = 'site:global-dialog';

    me.commonDialogIsOpen = false;
    me.commonDialogWindowsBind = false;

    function commonDialogOnWindowResize() {
        if (ThisApp.commonDialogIsOpen) {
            resetDialogBodyArea();
        };
    }

    var $window = $(window), previousScrollTop = 0, scrollLock = false;
    $window.scroll(function (event) {
        if (scrollLock) {
            $window.scrollTop(previousScrollTop);
        }
        previousScrollTop = $window.scrollTop();
    });

    function onCommonDialogShow() {
        if (!ThisApp.commonDialogWindowsBind) {
            //--- Lazy init one resize handler / move to even more common? Do this everytime and remove?  Reasons?
            ThisApp.commonDialogWindowsBind = true;
            window.addEventListener('resize', commonDialogOnWindowResize.bind(ThisApp));
            //window.onresize = commonDialogOnWindowResize.bind(ThisApp);
        }
        ThisApp.commonDialogIsOpen = true;
        scrollLock = true;
        if (typeof (commonDialogCallbackOnShow) == 'function') {
            commonDialogCallbackOnShow();
        }
    }

    function onCommonDialogHidden(theEl) {
        ThisApp.commonDialogIsOpen = true;
        scrollLock = false;
        if (typeof (commonDialogCallbackOnHidden) == 'function') {
            commonDialogCallbackOnHidden();
        }
        commonDialogCallbackOnShow = false;
        commonDialogCallbackOnHide = false;
        commonDialogCallbackOnHidden = false;
        clearCommonDialog();
    }

    /*
    Used to keep the same function from running a buch of times in a row 
    due to multiple hits or types of events all being called at once.
    */
    me.debounce = ActionAppCore.debounce;


    function onCommonDialogHide(theEl) {
        if (typeof (commonDialogCallbackOnHide) == 'function') {
            tmpResults = commonDialogCallbackOnHide(theEl);
            if (tmpResults === false) {
                return false;
            }
        }
        return true;
    }

    function getCommonDialog() {
        if (!commonDialog) {
            commonDialog = ThisApp.getByAttr$({ appuse: 'global-dialog' })
            if (commonDialog && commonDialog.model) {
                commonDialog.modal('setting', {
                    detachable: false,
                    allowMultiple: true,
                    centered: false,
                    closable: true,
                    dimmerSettings: {
                        opacity: 1
                    },
                    onShow: onCommonDialogShow,
                    onHide: onCommonDialogHide,
                    onHidden: onCommonDialogHidden
                });
            }


            ThisApp.commonDialog = commonDialog;
        }
        return commonDialog;
    }

    me.apiCall = apiCall;
    function apiCall(theOptions) {
        var dfd = $.Deferred();

        
        if( !(theOptions) ){
            dfd.reject("No options provided");
            return dfd.promise();
        }
        if( theOptions._retryCounter && theOptions._retryCounter > 1){
            dfd.reject("Too many failures");
            return dfd.promise();
        }

        var tmpOptions = theOptions || '';
        if (typeof (tmpOptions) == 'string') {
            tmpOptions = { url: tmpOptions };
        }
        
        var tmpAppID = '';
        //--- If there is a dataContext, add related details to header
        if( tmpOptions.dataContext ){
            console.log('tmpOptions.dataContext ',tmpOptions.dataContext );
            if( tmpOptions.dataContext && tmpOptions.dataContext.getAppName){
                tmpAppID = tmpOptions.dataContext.getAppName();
                console.log('tmpAppID',tmpAppID);
                if(tmpAppID){
                    var tmpHeaders = tmpOptions.headers || {};
                    $.extend(tmpHeaders, {'act-app-id':tmpAppID});
                    tmpOptions.headers = tmpHeaders;
                }
            }
        }
        

        //--- Start with no pre-action needed
        var tmpDoPreActionPromise = true;
        if( ActionAppCore.apiCallOptions && typeof(ActionAppCore.apiCallOptions.onBeforeRun) == 'function'){
            tmpDoPreActionPromise = ActionAppCore.apiCallOptions.onBeforeRun();
        }
        $.when(tmpDoPreActionPromise).then(function () {
            //--- This may change the filter options, so do this after the onBeforeRun
            if( ActionAppCore.apiCallOptions && typeof(ActionAppCore.apiCallOptions.filterOptions) == 'function'){
                ActionAppCore.apiCallOptions.filterOptions(tmpOptions);
            }

            //--- Done with onBeforeLoad if called .. do the api call now
            var tmpAsForm = (tmpOptions.formSubmit === true);

            var tmpURL = tmpOptions.url;
            if (!tmpURL) {
                throw "No URL provided"
            }
    
            tmpOptions.cache = false;
            var tmpLoadingEl = false;
            if (tmpOptions.loading !== false) {
                if (ThisApp.util.isjQuery(tmpOptions.loading))
                    tmpLoadingEl = tmpOptions.loading;
            }
            var tmpLoaderOptions = { el: tmpLoadingEl };
            tmpSuccess = function (theResponse) {
                ThisApp.hideLoading(tmpLoaderOptions);
                ThisApp._apiCallFailCount = 0;
                dfd.resolve(theResponse);
            }
            tmpError = function (theError) {
                ThisApp.hideLoading(tmpLoaderOptions);
                if(!(ThisApp._apiCallFailCount)){
                    ThisApp._apiCallFailCount = 1;
                } else {
                    ThisApp._apiCallFailCount++;
                }
                if( theError.status == 403 || theError.status == 401 ){
                    
                    //--- Do not keep running fail action
                    if( ThisApp._apiCallFailCount < 2 && ActionAppCore.apiFailAction ){
                        var tmpPromise = ActionAppCore.apiFailAction();
                        if( tmpPromise && tmpPromise.then ){
                            tmpPromise.then(function(){
                                if( theOptions._retryCounter ){
                                    theOptions._retryCounter++
                                } else {
                                    theOptions._retryCounter = 1;
                                }
                                ThisApp.apiCall(theOptions).then(function(theRetryResp){
                                    //--- ToDo: Check for second failure?
                                    ThisApp.hideLoading(tmpLoaderOptions);
                                    dfd.resolve(theRetryResp);
                                })
                            })
                        } else {
                            //--- ToDo: If function does not know to wait, do what?
    
                        }
                    }
                } else {
                    console.error('error in api call',theError);                
                    dfd.reject(theError)
                }
                
            }
    
    
            //--- Auto Detect data, convert data and use POST
            if (tmpOptions.data) {
                tmpOptions.method = 'POST';
                if (tmpAsForm) {
                    if (typeof (tmpOptions.data) == 'object') {
                        tmpOptions.data = ThisApp.util.getObjectAsEncodedForm(tmpOptions.data);
                    }
                    tmpOptions.contentType = 'application/x-www-form-urlencoded';
                } else {
                    if (typeof (tmpOptions.data) == 'object') {
                        tmpOptions.data = JSON.stringify(tmpOptions.data);
                    }
                    tmpOptions.contentType = 'application/json';
                }
            }
            if ((tmpOptions.loading !== false)) {
                ThisApp.showLoading(tmpLoaderOptions);
            }
    
            $.ajax(tmpOptions).then(tmpSuccess, tmpError);
        }, function(theError){
            dfd.reject(theError);
        })
        
        return dfd.promise();
    }


    me.hasSidebar = false;

    function initMenus() {
        //--- ToDo: Review semaction name / use ****
        var tmpSBSelector = '[semaction="showsidebar"]';
        if ($(tmpSBSelector).length > 0) {
            me.hasSidebar = true;
            $('[appuse="side-menu"]')
                .sidebar('setting', 'duration', 20)
                .sidebar('setting', 'mobileTransition', 'fade')
                .sidebar('attach events', tmpSBSelector);
        }
    }

    function initGlobalDialog() {
        //--- ToDo: Why not just add the HTML directly to body in this case?

        //--- Dynamically create the common dialog spot
        var tmpNewDiv = $('<div spot="site:global-dialog" class="hidden"></div>').appendTo('body');
        //--- Populate with common dialog (ToDo: Allow override?)
        var tmpHTML = '<div appuse="global-dialog" class="ui modal longer inverted"><button style="float:right;margin-top:5px;margin-right:5px;" class="icon ui basic blue button circle" action="closeCommonDialog" ><i class="close icon"></i> <span spot="site:dialog-close-text">Close</span></button><div spot="site:dialog-header" class="header"></div>  <div spot="site:dialog-content" class="content common-dialog-content"> </div> <div spot="site:dialog-footer" class="common-dialog-footer"></div> </div> ';
        me.loadSpot(commonDialogSpot, tmpHTML)
    }

    me.initAppActions = initAppActions;
    function initAppActions() {




        var tmpBody = $('body');
        if (tmpBody.length > 0) {
            var tmpBodyDom = tmpBody.get(0);
            tmpBody.on("click", itemClicked);
            //--- Add ability to trigger action on item change
            tmpBody.on("change", itemClicked);
            tmpBodyDom.ontouchend = itemTouchEnd;
            tmpBodyDom.ontouchstart = ThisApp.util.itemTouchStart.bind(this);
        }
    }

    //---- Internal: Gets the action or action from the current element or the first parent element with such an entry,
    //               ... this is needed so when a child element is clicked, the proper parent action element is used.
    me.getActionFromObj = function (theObj, theOptionalTag) {
        var tmpTagName = theOptionalTag || 'action';
        var tmpObj = theObj;
        var tmpAction = $(tmpObj).attr(tmpTagName) || "";

        if (!tmpAction) {
            var tmpParent = $(tmpObj).closest('[' + tmpTagName + ']');
            if (tmpParent.length == 1) {
                tmpObj = tmpParent.get(0);
                tmpAction = $(tmpObj).attr(tmpTagName) || "";
            } else {
                tmpParent = $(tmpObj).closest('[' + tmpTagName + ']');
                if (tmpParent.length == 1) {
                    tmpObj = tmpParent.get(0);
                    tmpAction = $(tmpObj).attr(tmpTagName) || "";
                    $(tmpObj).attr(tmpTagName, tmpAction)
                } else {
                    return false; //not an action
                }
            }
        }
        //--- Update to not read the action of a form as an Action App action
        //JF - 10-28-20
        if (tmpObj && tmpObj.tagName && tmpObj.tagName.toUpperCase() == 'FORM') {
            return false;
        }
        return { action: tmpAction, el: tmpObj };
    }

    // function inRect(theRect, theX, theY) {
    //     var tmpFarX = theRect.x - theX;
    //     var tmpFarY = theRect.y - theY;
    //     if( tmpFarX > MIN_TOUCH_DISTANCE || tmpFarY > MIN_TOUCH_DISTANCE){
    //         return false;
    //     }
    //     return theRect.x <= theX && theX <= theRect.x + theRect.width &&
    //     theRect.y <= theY && theY <= theRect.y + theRect.height;
    // }
    function itemTouchEnd(theEvent) {
        var tmpTarget = theEvent.target || theEvent.currentTarget || theEvent.delegetTarget || {};
        var tmpBounds = tmpTarget.getBoundingClientRect();
        if (theEvent.changedTouches && theEvent.changedTouches.length > 0) {
            var tmpTouchInfo = theEvent.changedTouches[0];
            var tmpStart = ThisApp.util._start;
            var tmpXDiff = Math.abs(tmpStart.x - tmpTouchInfo.screenX)
            var tmpYDiff = Math.abs(tmpStart.y - tmpTouchInfo.screenY)
            if (tmpXDiff > ThisApp.util.MIN_TOUCH_DISTANCE || tmpYDiff > ThisApp.util.MIN_TOUCH_DISTANCE) {
                return;
            }
            if (ThisApp.util.touchIsClick(tmpBounds, tmpTouchInfo.clientX, tmpTouchInfo.clientY)) {
                itemClicked(theEvent);
            }
        }
    }
    //---- Internal: Catch a click item to look for the action
    itemClicked = ActionAppCore.debounce(onItemClicked, 50);
    // itemChanged = ActionAppCore.debounce(onItemChanged, 50);

    // function onItemChanged(theEvent) {
    //     var tmpObj = theEvent.target || theEvent.currentTarget || theEvent.delegetTarget || {};
    //     var tmpActionDetails = me.getActionFromObj(tmpObj);
    //     if (!((tmpActionDetails.hasOwnProperty('action') || tmpActionDetails.hasOwnProperty('action')) && tmpActionDetails.hasOwnProperty('el'))) {
    //         //--- OK, just clicked somewhere with nothing to catch it, but not an action
    //         return;
    //     }
    //     var tmpAction = tmpActionDetails.action;
    //     tmpObj = tmpActionDetails.el;

    //     if (tmpAction) {
    //         ThisApp.runAppAction(tmpAction, tmpObj);
    //         theEvent.preventDefault();
    //         theEvent.stopPropagation();
    //     }
    //     return false;
    // }
    function onItemClicked(theEvent) {
        var tmpObj = theEvent.target || theEvent.currentTarget || theEvent.delegetTarget || {};
        var tmpActionDetails = me.getActionFromObj(tmpObj);
        if (!((tmpActionDetails.hasOwnProperty('action') || tmpActionDetails.hasOwnProperty('action')) && tmpActionDetails.hasOwnProperty('el'))) {
            //--- OK, just clicked somewhere with nothing to catch it, but not an action
            return;
        }
        var tmpAction = tmpActionDetails.action;
        tmpObj = tmpActionDetails.el;

        if (tmpAction) {
            ThisApp.runAppAction(tmpAction, tmpObj);
            theEvent.preventDefault();
            theEvent.stopPropagation();
        }
        return false;
    }

    //--- ToDo - Implement better message center with toastr as UI option or toastless
    function initMessageCenter() {
        toastr.options.closeButton = true;
        toastr.options.timeOut = 4000;
        /*
        //--- Some other available options
        toastr.options.timeOut = 2000;
        toastr.options.extendedTimeOut = 6000;
         */
    }

    me.siteLayout = null;


    me.refreshLayouts = ActionAppCore.debounce(function (theTargetEl) {
        if (ThisApp.siteLayout) {
            ThisApp.siteLayout.resizeAll();
        }
        ThisApp.publish('resize');
    }, 200);

    me.resizeLayouts = function (name, $pane, paneState) {
        try {
            if (isFunc(ThisApp._onResizeLayouts)) {
                ThisApp._onResizeLayouts(name, $pane, paneState);
            }
            var tmpH = $pane.get(0).clientHeight - $pane.get(0).offsetTop - 1;
            me.getByAttr$({ appuse: "cards", group: "app:pages", item: '' }).css("height", tmpH + "px");
        } catch (ex) {

        }
    }

    //=== NOT SO GREAT - POPUP FUNCTIONALITY -- REMOVE IT???
    me.clearActivePopup = clearActivePopup;
    function clearActivePopup() {
        if (!ThisApp.activePopup) {
            return;
        }
        ThisApp.activePopup.popup('destroy');
        ThisApp.activePopup = false;
    }
    //=== Pass title and content, optionally an onClose event (not normal part of sui popup)
    //--- This creates the popup, then destroys when closed and does a callback if there
    me.showPopup = showPopup;
    function showPopup(theDetails, theTargetEl) {
        var tmpDetails = theDetails || '';
        var tmpTargetEl = false;
        if (ThisApp.activePopup) {
            ThisApp.activePopup.popup('destroy');
            ThisApp.activePopup = false;
        }
        if (typeof (tmpDetails) == 'string') {
            //This is from an action, convert it
            tmpTargetEl = $(theTargetEl);
            tmpDetails = {};
            var tmpTitle = tmpTargetEl.attr('title') || tmpTargetEl.attr('popup-title' || '');
            var tmpContent = tmpTargetEl.attr('content') || tmpTargetEl.attr('popup-content' || '');
            if (tmpTitle) {
                tmpDetails.title = tmpTitle;
            }
            if (tmpContent) {
                tmpDetails.content = tmpContent;
            }

        } else {
            tmpTargetEl = theTargetEl || tmpDetails.el || false;
            //--- Make sure we are dealing with a jQuery element on the one passed
            if (!tmpTargetEl) {
                tmpTargetEl = document.body;
            }
            if (tmpTargetEl && typeof (tmpTargetEl.get) !== 'function') {
                tmpTargetEl = $(tmpTargetEl);
            }
        }

        var tmpPopup;
        var tmpFn = false;
        if (typeof (tmpDetails.onClose) == 'function') {
            tmpFn = tmpDetails.onClose;
        }

        var tmpPopSpecs = {
            on: 'click',
            //hideOnScroll:true,
            exclusive: true,
            lastResort: 'bottom left',
            onHidden: function () {
                if (tmpFn) {
                    tmpFn();
                }
                tmpPopup.popup('destroy');
                ThisApp.activePopup = false;
            }
        }

        $.extend(tmpPopSpecs, tmpDetails);
        tmpPopup = tmpTargetEl.popup(tmpPopSpecs).popup('show');
        ThisApp.activePopup = tmpPopup;
    }

    //--- Run _app function, commonly used application wide functions
    me.runAction = runAction;
    function runAction(theAction, theSourceObject) {
        var tmpAction = theAction || '';
        var tmpActionName = tmpAction;
        if (ThisApp.util.isObj(tmpActionName)) {
            tmpActionName = tmpActionName.action;
        }

        if (typeof (this[tmpActionName]) == 'function') {
            (this[tmpActionName]).call(this, tmpAction, theSourceObject);
        } else if (typeof (me[tmpActionName]) == 'function') {
            (me[tmpActionName]).call(this, tmpAction, theSourceObject);
        }
    }

    me.setup = function (theAppConfig) {
        var dfd = jQuery.Deferred();

        if (me.isSetup) {
            dfd.resolve(true)
            return dfd.promise();
        };

        me.isSetup = true;
        //--- Init Required Plugins
        me.useModuleComponents('plugin', ['ObjectManager', 'Prompter', 'Controls', 'React']);
        me.om = me.getComponent("plugin:ObjectManager");
        me.prompter = me.getComponent("plugin:Prompter");
        //--- General Util Functions
        me.util = utilFunctions;
        //--- Converts string to obj or obj to string based on what is passed
        me.json = me.util.json;
        me.clone = me.util.clone;



        //--- Add controls plugin at the app level
        // ..... as global entrypoint for controls module
        me.controls = me.getComponent("plugin:Controls");        
        me.react = me.getComponent("plugin:React");        

        var tmpPromRequired = true;
        var tmpPromConfigReqired = true;
        if (theAppConfig && theAppConfig.required) {
            tmpPromRequired = me.loadResources(theAppConfig.required);
        };
        if (ActionAppCore.config && ActionAppCore.config.required) {
            tmpPromConfigReqired = me.loadResources(ActionAppCore.config.required);
        };

        $.when(tmpPromRequired, tmpPromConfigReqired).then(function () {
            //--- do the rest of the app load
            dfd.resolve(true);
        })


        return dfd.promise();

    }

    me.init = init;
    var ThisCoreApp = this;
    function init(theAppConfig) {
        var dfd = jQuery.Deferred();

        ThisCoreApp = this;
        var tmpBody = $('body');
        if (tmpBody.length == 0) {
            dfd.resolve(false);
            return dfd.promise();
        }
        initAppMarkup();


        window.addEventListener('resize', ThisApp.refreshLayouts.bind(ThisApp));


        var tmpDefs = [];
        var tmpThis = this;

        me.headerPanel = $('.site-layout-north');
        me.centerPanel = $('.site-layout-center');
        me.headerPanel.addClass('ui segment nopad');
        me.centerPanel.addClass('ui segment nopad');


        if (theAppConfig.pages && theAppConfig.pages.length) {
            var tmpPageNames = theAppConfig.pages;
            for (var iPageName = 0; iPageName < tmpPageNames.length; iPageName++) {
                var tmpPageName = tmpPageNames[iPageName];
                var tmpPage = ThisApp.getPage(tmpPageName);
                if (!(tmpPage)) {
                    var tmpPageBase = theAppConfig.pageBaseURL || './app/pages/';
                    var tmpURL = tmpPageBase + tmpPageName + '/index.js?open'
                    //--- For initial load only, allows for additional hooks on app load
                    //  - vs just using $.ajax
                    tmpDefs.push(ActionAppCore.apiCall({
                        url: tmpURL,
                        dataType: "script"
                    }));
                }

            }
        }

        var tmpInfoLoader = function(){
            var dfd = jQuery.Deferred();
            ActionAppCore.apiCall('./app-info.json').then(function(theReply){
                ActionAppCore.appInfo = theReply;
                dfd.resolve(true);
            })
            return dfd.promise();
        }
        
        if( !(ActionAppCore.inDesigner)){
            var tmpPromiseLoader = tmpInfoLoader();
            tmpDefs.push(tmpPromiseLoader);
        }
        
        
        $.whenAll(tmpDefs).then(function (theReply) {
            me.setup(theAppConfig).then(function (theReply) {
                if (!(theReply)) {
                    alert("Could not setup application, contact support")
                    dfd.resolve(false)
                } else {
                    ThisApp.hideLoading();
                    tmpThis.postInit(theAppConfig);
                    dfd.resolve(true);
                }
            });
        });




        return dfd.promise();
    }
    me.outlineDisplay = outlineDisplay;
    function outlineDisplay(theParams, theTarget) {
        var tmpEl = $(theTarget);
        var tmpSelect = tmpEl.attr('select') || '';

        if (tmpSelect) {
            var tmpShow = tmpSelect == 'true';
            var tmpContainer = tmpEl.closest('tr').next();
            if (tmpContainer && tmpContainer.length) {
                var tmpToggles = $('[oluse="collapsable"]', tmpContainer);

                for (var iToggle = 0; iToggle < tmpToggles.length; iToggle++) {
                    var tmpToggle = $(tmpToggles[iToggle]);
                    var tmpToggleNode = tmpToggle.find('[action="toggleMe"]');
                    var tmpIcon = tmpToggleNode.find('i');

                    tmpToggle = tmpToggle.next();
                    var tmpIsVis = tmpToggle.is(":visible");
                    if (!(tmpShow)) {
                        tmpToggle.hide();
                        tmpIcon.removeClass('minus')
                            .addClass('plus');
                    } else {
                        tmpToggle.show();
                        tmpIcon.removeClass('plus')
                            .addClass('minus');
                    }
                }
            }

        } else {

        }

    };

    me.dropMenuOpen = dropMenuOpen;
    function dropMenuOpen(theParams, theTarget) {
        // var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['menuname'])
        var tmpEl = $(theTarget);
        var tmpPageEl = tmpEl.closest('[group="app:pages"]');

        var tmpOffset = tmpEl.offset();
        var tmpPageOffset = tmpPageEl.offset();

        var tmpFO = ThisApp.getByAttr$({ appuse: 'flyover' });
        var tmpFOMask = ThisApp.getByAttr$({ appuse: 'flyovermask' });

        //--- Move the flyover mast and related flyover to the page
        //    ... so that pageaction works naturally
        tmpFOMask.detach().appendTo(tmpPageEl);
        //var tmpMenuHTML = tmpEl.parent().html();

        //--- ToDo, Show this after created
        var tmpMenuHTML = tmpEl.get(0).outerHTML;
        tmpMenuHTML = tmpMenuHTML
            // .replace('hidden', '')
            .replace('action="dropmenuopen"', '');

        ThisApp.loadSpot('flyover-menu', tmpMenuHTML);

        var tmpDropMenu = $('[dropmenu="menu"]', ThisApp.getSpot('flyover-menu'))
        tmpDropMenu.show();
        tmpFO.css('width', tmpEl.css('width'));
        tmpFO.css('top', (tmpOffset.top - tmpPageOffset.top) + 'px');
        tmpFO.css('left', (tmpOffset.left - tmpPageOffset.left) + 'px');

        tmpFOMask.removeClass('hidden');
        tmpFO.removeClass('hidden');
        ThisApp.refreshLayouts();
    };

    me.closeFlyover = clearFlyover;
    me.clearFlyover = clearFlyover;
    function clearFlyover(theParams, theTarget, theOptionalParent) {
        var tmpMask = ThisApp.getByAttr$({ appuse: 'flyovermask' });
        var tmpFOFade = ThisApp.getByAttr$({ appuse: 'flyoverfade' });
        tmpMask.animate({ scrollTop: 0 }, 2, function () {
            tmpMask.addClass('hidden');
            tmpFOFade.addClass('hidden');
            ThisApp.getByAttr$({ appuse: 'flyover' }).addClass('hidden');
        });
        if( typeof(me.fullScreenFlyoverCallback) == 'function'){
            var tmpFunc = me.fullScreenFlyoverCallback;
            delete me.fullScreenFlyoverCallback;
            tmpFunc();
        }
        tmpMask.css('background-color','transparent');
        ThisApp.flyoverOpen = false;
    }

    me.fullScreenFlyover = fullScreenFlyover;
    function fullScreenFlyover(theHTML, theOptions){

        var tmpOptions = theOptions || {};
        if( typeof(tmpOptions.onClose) == 'function'){
            me.fullScreenFlyoverCallback = tmpOptions.onClose;
        }
        if( theHTML ){
            ThisApp.loadSpot('flyover-menu', theHTML);
        }
        var tmpBG = 'white';
        if( tmpOptions.backgroundColor ){
            tmpBG = tmpOptions.backgroundColor;
        }
        var tmpMask = ThisApp.getByAttr$({ appuse: 'flyovermask' });
        var tmpFOFade = ThisApp.getByAttr$({ appuse: 'flyoverfade' });
        var tmpBody = ThisApp.getByAttr$({ appuse: 'flyover' });
        tmpMask.css('background-color',tmpBG);
        tmpBody.css('background-color',tmpBG);
        tmpMask.animate({ scrollTop: 0 }, 2, function () {
          tmpMask.removeClass('hidden');
          tmpFOFade.removeClass('hidden');
          tmpBody.removeClass('hidden');
        });
        ThisApp.flyoverOpen = true;
    }

    me.toggleMe = toggleMe;
    function toggleMe(theParams, theTarget, theOptionalParent) {
        var tmpEl = $(theTarget);
        var tmpTR = tmpEl.parent();
        if (theTarget.tagName.toLowerCase() == 'tr') {
            tmpTR = tmpEl;
        }
        var tmpNext = tmpTR.next(['group="' + tmpEl.attr('group') + '"']);
        var tmpIcon = tmpTR.find('td:last > i');
        //var tmpIsVis = tmpNext.is(":visible");
        var tmpIsVis = (tmpNext.css('display') != 'none');

        if (tmpIsVis) {
            tmpNext.hide();
            tmpIcon.removeClass('minus')
                .addClass('plus');
        } else {
            tmpNext.show();
            tmpIcon.removeClass('plus')
                .addClass('minus');
        }

    };

    me.showLoading = function (theOptions) {
        var tmpOptions = theOptions || {};
        if (tmpOptions.el) {
            if( !tmpOptions.el.hasClass('loading') ){
                tmpOptions.el.addClass('loading');
            }
            
        } else {
            if( !me.headerPanel.hasClass('loading') ){
                me.headerPanel.addClass('loading');
            }
            if( !me.centerPanel.hasClass('loading') ){
                me.centerPanel.addClass('loading');
            }
        }
    }

    me.hideLoading = function (theOptions) {
        var tmpOptions = theOptions || {};
        if (tmpOptions.el) {
            tmpOptions.el.removeClass('loading');
        } else {
            me.headerPanel.removeClass('loading');
            me.centerPanel.removeClass('loading');
        }
    }

    me.grid16 = {
        onResize: ActionAppCore.debounce(function () {
            ThisApp.grid16.resizeLayoutProcess();
            ThisApp.publish('grid16-resized');
        }, 200),

        minCardSizeSm: 245,
        minCardSize: 350,
        maxCardSizeSm: 365,
        maxCardSize: 999,
        currentCardCount: 0,
        cutOffSmall: 668,
        cutOffLarge: 9999,

        resizeLayoutProcess: function (theForce) {
            try {
                //--- On layout resize ...
                this.resizeGrid();
                var tmpCardCount = 4;
                var tmpCards = ThisApp.getByAttr$({ "auto-adapt": "cards" });

                if (tmpCards && tmpCards.length) {

                    var tmpCardsLen = tmpCards.length;

                    if (tmpCards && tmpCardsLen > 0) {

                        for (var iPos = 0; iPos < tmpCardsLen; iPos++) {
                            var tmpCardsEl = $(tmpCards[iPos]);
                            var tmpIW = tmpCardsEl.innerWidth();
                            var tmpMin = this.minCardSizeSm;
                            //ToDo: Set cut off for small card sizing (xs?)
                            // if (this.mode != "S") {
                            //   tmpMin = this.minCardSize;
                            // }
                            //var tmpMax = this.maxCardSizeSm;
                            // if (this.mode != "S") {
                            //   tmpMax = this.maxCardSize;
                            // }

                            //--- ToDo: Move to element data if used
                            //this.lastIW = tmpIW;

                            var tmpEach = parseInt(tmpIW / tmpMin);
                            tmpCardCount = tmpEach;
                            if (tmpCardCount > 10) {
                                tmpCardCount = 10;
                            }




                            if (tmpCardsEl && tmpCardsEl.is(":visible")) {
                                var tmpCardEntryEls = tmpCardsEl.find('.card');

                                //ToDo: Implement with cut off value
                                // if (this.mode == 'S') {
                                //   tmpCardEntryEls.css('max-width', this.maxCardSizeSm + 'px');
                                // } else {
                                //   tmpCardEntryEls.css('max-width', this.maxCardSize + 'px');
                                // }
                                //tmpCardEntryEls.css('max-width', this.maxCardSize + 'px');
                                //end ToDo

                                var tmpCurrCards = tmpCardEntryEls.length;

                                var tmpMaxCards = tmpCurrCards;
                                if (tmpCardCount > tmpMaxCards) {
                                    tmpCardCount = tmpMaxCards;
                                }

                                //=== Example of a way to help with dangling single value
                                //   if (tmpCurrCards == 4 && tmpCardCount == 3) {
                                //     if (tmpIW < 800) {
                                //       tmpCardCount = 2;
                                //     } else {
                                //       tmpCardCount = 4;
                                //     }
                                //   }

                                var tmpToRemove = '';
                                var tmpAttrVal = tmpCardsEl.attr('grid16-ccc');
                                if (tmpAttrVal) {
                                    tmpToRemove = tmpAttrVal;
                                }
                                //tmpCardsEl.data.currentCardCount = tmpCardCount;
                                var tmpToAdd = this.numLookup[tmpCardCount];
                                tmpCardsEl.attr('grid16-ccc', tmpToAdd);

                                if (theForce || (tmpToRemove != tmpToAdd)) {
                                    if (tmpToRemove) {
                                        tmpCardsEl.removeClass(tmpToRemove);
                                    }
                                    if (tmpToAdd) {
                                        tmpCardsEl.addClass(tmpToAdd);
                                    }
                                }
                            }
                        }
                    }

                }
                //--- end layout resize
            } catch (ex) {
                console.error("Error on refresh ", ex);
            }
        },

        sep_cards: "-----------------------------",

        numLookup: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen"],
        paramDefaults: {
            "gs-s-at": 330,
            "gs-m-at": 770,
            "gs-s": 16,
            "gs-m": 8,
            "gs-l": 4
        },

        resizeGrid: function (theOptions) {
            try {
                var tmpOptions = theOptions || {};
                // var tmpParent = tmpOptions.parent || false;
                // was !!(tmpParent) ? tmpParent : 
                var tmpGrids = ThisApp.getByAttr$({ appuse: "grid-16" });

                var tmpGridsLen = tmpGrids.length;
                if (tmpGrids && tmpGridsLen > 0) {
                    for (var iPos = 0; iPos < tmpGridsLen; iPos++) {
                        var tmpGridsEl = $(tmpGrids[iPos]);
                        if (tmpGridsEl && (tmpOptions.force || tmpGridsEl.is(":visible"))) {

                            var tmpPaneEl = tmpGridsEl.first('.ui-layout-pane');
                            var tmpIW = tmpPaneEl.innerWidth();
                            var tmpGridParams = ThisApp.getAttrs(tmpGridsEl, ["gs-s-at", "gs-m-at", "gs-s", "gs-m", "gs-l"])
                            for (var aName in tmpGridParams) {
                                try {
                                    tmpGridParams[aName] = parseInt(tmpGridParams[aName]);
                                } catch (ex) {

                                }
                            }
                            tmpGridParams = $.extend({}, this.paramDefaults, tmpGridParams);

                            var tmpGridSize = tmpGridParams["gs-l"];
                            if (tmpIW <= tmpGridParams["gs-s-at"]) {
                                tmpGridSize = tmpGridParams["gs-s"];
                            } else if (tmpIW <= tmpGridParams["gs-m-at"]) {
                                tmpGridSize = tmpGridParams["gs-m"];
                            }


                            var tmpGridCols = tmpGridsEl.find('[gscol]');
                            //todo: Make generic
                            var tmpXHead = tmpGridsEl.find('[griduse="extra-header"]');

                            if (tmpGridSize < 16) {
                                tmpXHead.show();
                            } else {
                                tmpXHead.hide();
                            }

                            var tmpToRemove = '';
                            tmpGridsEl.data = tmpGridsEl.data || {};

                            if (tmpGridsEl.data.currentCardCount) {
                                tmpToRemove = this.numLookup[tmpGridsEl.data.currentCardCount] + " wide";
                            }
                            tmpGridsEl.data.currentCardCount = tmpGridSize;
                            var tmpToAdd = this.numLookup[tmpGridsEl.data.currentCardCount] + " wide";

                            if (tmpToRemove) {
                                tmpGridCols.removeClass(tmpToRemove);
                            }
                            if (tmpToAdd) {
                                tmpGridCols.addClass(tmpToAdd);
                            }

                        }
                    }
                }
            } catch (ex) {
                console.warn("Error during resize ", ex.toString(), ex)
            }
        }


    }



    me.postInit = postInit;
    function postInit(theAppConfig) {

        if (theAppConfig.plugins) {
            ThisApp.useModuleComponents('plugin', theAppConfig.plugins);
        }

        if (theAppConfig.pages) {
            ThisApp.initModuleComponents(ThisApp, 'app', theAppConfig.pages);
        }

        //--- Register app level action handler
        this.registerActionDelegate("_app", this.runAction.bind(this));




        //--- Put your stuff here
        this.common = {};


        var tmpLOSpecs = {
            center__maskContents:	true,
            center__paneSelector: ".site-layout-center"
            , north__spacing_open: 0
            , north__spacing_closed: 0
            , north__resizable: false
            , spacing_open: 6 // ALL panes
            , spacing_closed: 8 // ALL panes
            , onready: ThisApp.resizeLayouts
            , onresize: ThisApp.resizeLayouts
            , enableCursorHotkey: false
        }
        if (theAppConfig.customHeader !== true) {
            tmpLOSpecs.north__paneSelector = ".site-layout-north";
        }

        var tmpBodyEl = $('body');
        if (!(theAppConfig && theAppConfig.layout === false) && tmpBodyEl.length > 0) {
            me.siteLayout = tmpBodyEl.layout(tmpLOSpecs);
        }

        if (theAppConfig && theAppConfig.hideHeader == true) {
            if (me.siteLayout) {
                me.siteLayout.toggle('north');
            }
        }
        if (theAppConfig && theAppConfig.hidePagesMenu == true) {
            me.getByAttr$({ semaction: "showsidebar" }).hide();
        }

        me.config = me.config || {};
        if (theAppConfig) {
            $.extend(me.config, theAppConfig)
        }
        me.config.navbuttons = me.config.navbuttons || [];
        me.config.navlinks = me.config.navlinks || [];

        me.showPage = showPage;
        me.showSubPage = showSubPage;
        me.selectMe = showSubPage

        //--- Add action="clickMyInput" to any icon next to a field to click that field.  
        //--- For read only fields with icon.
        me.clickMyInput = function(theParams, theTarget){
            $($(theTarget).siblings('input')).trigger('click');
        }

        //--- Allows a div to work like a link
        me.openhref = function (theParams, theTarget) {
            var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['href']);
            var tmpURL = tmpParams.href;
            if (tmpURL) {
                window.location = tmpURL;
            }
        }

        me.$appPageContainer = $(me.config.container || '[appuse="main-page-container"]');
        if (me.$appPageContainer.length == 0) {
            me.$appPageContainer = false;
        }


        for (var aName in me.components) {
            var tmpController = me.components[aName];
            //--- Call any plug in component init functions on init, if it has one
            if (tmpController && typeof (tmpController.init) == 'function') {
                tmpController.init(this);
            }
        }

        var tmpNavHTML = '{{#each navlinks}} {{#if isTopLink}}<a appuse="tablinks" group="app:pages" item="{{name}}" action="showPage" class="item blue">{{title}}</a>{{/if}} {{/each}}';
        var tmpSideLinksHTML = '{{#each navlinks}} {{#if isSideLink}}<a appuse="tablinks" group="app:pages" item="{{name}}" action="showPage" class="item">{{{iconHTML}}}{{title}}</a>{{/if}} {{/each}}';
        ThisApp.addTemplate('tpl-side-menu-item', tmpSideLinksHTML)
        ThisApp.addTemplate('tpl-nav-menu-item', tmpNavHTML)
        $('[appuse="side-menu"]').html(ThisApp.renderTemplate('tpl-side-menu-item', me.config));
        $('[appuse="nav-menu"]').html(ThisApp.renderTemplate('tpl-nav-menu-item', me.config));

        //--- Default Spinner, can override
        ThisApp.addTemplate('app:page-loading-spinner', '<div><i class="huge icons"><i class="big loading circle notch icon"></i></i></div>')

        //--- To Do, make this an option, low priority
        ThisApp.setMessagesOptions({ show: false })

        initMenus();
        initAppActions();
        initMessageCenter();
        initGlobalDialog();

        me.prompt = me.prompter.prompt;
        me.hidePrompt = me.prompter.hidePrompt;

        me.confirm = me.prompter.confirm;
        me.alert = me.prompter.alert;
        //-- Input defined below, not part of prompter library, just uses it

        if (!(theAppConfig && theAppConfig.setAlert === false)) {
            try {
                window.winAlert = window.alert;
                window.alert = me.alert;
            } catch (ex) {
                //ok, will use normal alert
            }
        }

        //---- Setup forms used on this page, only one time when page first open
        var tmpInputSpecs = {
            "content": [{
                "name": "text",
                "ctl": "spot"
            },
            {
                "ctl": "field",
                "name": "value",
                "type": "text",
                "req": true
            }]
        }

        //ToDo: Modify to be always avail and include selecting a choice as option
        //      This is to keep from buliding and destroying for each
        //      Note: IF we add "cache" option to prompt, may work as well
        ThisApp.inputForm = ThisApp.controls.newControl(tmpInputSpecs);

        ThisApp.input = function (theText, theTitle, theButtonCaption, theDefaultValue) {
            var dfd = jQuery.Deferred();
            var tmpDefaultValue = theDefaultValue || '';
            var tmpParams = {
                promptOptions: {
                    onBeforePrompt: function (theControl) {
                        theControl.loadSpot('text', theText);
                        theControl.setFieldValue('value', tmpDefaultValue || '')
                    }
                },
                title: theTitle,
                submitLabel: theButtonCaption
            }
            ThisApp.inputForm.prompt(tmpParams).then(function (theWasSubmitted, theData) {
                var tmpValue = '';
                if (theWasSubmitted) {
                    var tmpValue = theData.value || '';
                }
                dfd.resolve(tmpValue);
            })
            return dfd.promise();
        }


        if (me.config['navlinks']) {
            var tmpFirstNavLink = me.config['navlinks'][0];
            if (tmpFirstNavLink && tmpFirstNavLink.name) {
                ThisApp.gotoPage(tmpFirstNavLink.name);
            }
        }

        ActionAppCore.publish('app-loaded', [ThisApp]);

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

    //--- Loop up until the next layout pane and set height to 100%
    function resizeToParent(theEl) {
        if (!isjQuery(theEl)) {
            theEl = $(theEl);
        }
        var tmpMax = 20;
        var tmpAtEl = theEl.parent();

        for (var iPos = 0; iPos < tmpMax; iPos++) {
            if (tmpAtEl.hasClass('ui-layout-pane') || tmpAtEl.hasClass('app-layout-pane')) {
                return true;
            }
            tmpAtEl.css('height', '100%');
            tmpAtEl = tmpAtEl.parent();
        }
        console.warn("Hit 20 times trying to find parent and never did in resizeToParent", theEl)
        return false;
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };




    function initAppMarkup() {
        initFlyoverMarkup();
        initPromptMarkup();
    }

    function initFlyoverMarkup() {
        var tmpHTML = [];
        tmpHTML.push('<div appuse="flyovermask" class="pagemask hidden">');
        tmpHTML.push('	<div appuse="flyover" class="flyover hidden">');
        tmpHTML.push('		<div class="ui content form">');
        tmpHTML.push('			<div class="ui field" spot="flyover-menu">');
        tmpHTML.push('			</div>');
        tmpHTML.push('		</div>');
        tmpHTML.push('		<div style="clear:both"></div>');
        tmpHTML.push('	</div>');
        tmpHTML.push('</div>');
        $('body').append(tmpHTML.join(''))
    }


    function initPromptMarkup() {
        var tmpHTML = [];
        tmpHTML.push('		<div class="prompter-content" spot="prompter-content">');
        tmpHTML.push('		</div>');
        $('body').append(tmpHTML.join(''));
    }

    var myConvertLiveLoops = 0;
    var convertToJsonLive = function (theObject) {
        myConvertLiveLoops = 0;
        return myConvertToJsonLive(theObject);
    }

    var myConvertToJsonLive = function (theObject) {
        myConvertLiveLoops++;
        if (myConvertLiveLoops > 1000) {
            console.warn("Too many loops, stopping json conversion");
            return {};
        }
        var tmpIsArray = Array.isArray(theObject);
        var tmpRet = {};
        if (tmpIsArray) {
            tmpRet = [];
        }

        function processEntry(theEntry) {
            var tmpEntry = theEntry;
            if (isElement(tmpEntry)) {
                //--- Do not add or convert
            } else if (isjQuery(tmpEntry)) {
                //--- Do not add or convert
            } else if (isFunc(tmpEntry)) {
                //--- Convert to string to save
                tmpRet[aName] = tmpEntry;
            } else if (isPage(tmpEntry)) {
                //--- Ignore if page in object    
            } else if (isObj(tmpEntry)) {

                if (tmpIsArray) {
                    tmpRet.push(myConvertFromJsonLive(tmpEntry));
                } else {
                    if (tmpEntry['[function]']) {
                        tmpRet[aName] = stringToFunction(tmpEntry['[function]']);
                    } else {
                        tmpRet[aName] = tmpEntry;
                    }
                }


            } else {
                tmpRet[aName] = tmpEntry;
            }
        }
        try {
            if (tmpIsArray) {
                for (var iArray = 0; iArray < theObject.length; iArray++) {
                    var tmpArrayEntry = theObject[iArray];
                    processEntry(tmpArrayEntry);
                }
            } else {
                for (var aName in theObject) {
                    var tmpEntry = theObject[aName];
                    processEntry(tmpEntry);
                }
            }

        }
        catch (e) {
            throw e;
        }
        return tmpRet;
    }

    var convertFromJsonLive = function (theObject) {
        myConvertLiveLoops = 0;
        return myConvertFromJsonLive(theObject);
    }

    var myConvertFromJsonLive = function (theObject) {
        if (isStr(theObject)) {
            theObject = JSON.parse(theObject);
        }
        myConvertLiveLoops++;
        if (myConvertLiveLoops > 1000) {
            console.warn("Too many loops, stopping json conversion");
            return {};
        }
        var tmpIsArray = Array.isArray(theObject);
        var tmpRet = {};
        if (tmpIsArray) {
            tmpRet = [];
        }

        function processEntry(theEntry) {
            var tmpEntry = theEntry;
            if (isElement(tmpEntry)) {
                //--- Do not add or convert
            } else if (isjQuery(tmpEntry)) {
                //--- Do not add or convert
            } else if (isFunc(tmpEntry)) {
                //--- Convert to string to save
                tmpRet[aName] = tmpEntry;
            } else if (isPage(tmpEntry)) {
                //--- Ignore if page in object    
            } else if (isObj(tmpEntry)) {

                if (tmpIsArray) {
                    tmpRet.push(myConvertFromJsonLive(tmpEntry));
                } else {
                    //tmpEntry.isStoredFunction && 
                    if (tmpEntry['[function]']) {
                        tmpRet[aName] = stringToFunction(tmpEntry['[function]']);
                    } else {
                        tmpRet[aName] = tmpEntry;
                    }
                }


            } else {
                tmpRet[aName] = tmpEntry;
            }
        }
        try {
            if (tmpIsArray) {
                for (var iArray = 0; iArray < theObject.length; iArray++) {
                    var tmpArrayEntry = theObject[iArray];
                    processEntry(tmpArrayEntry);
                }
            } else {
                for (var aName in theObject) {
                    var tmpEntry = theObject[aName];
                    processEntry(tmpEntry);
                }
            }

        }
        catch (e) {
            throw e;
        }
        return tmpRet;
    }


    function isPage(theObject) {
        return (theObject instanceof SiteMod.SitePage)
    }
    function isElement(theObject) {
        return (theObject instanceof Element);
    }
    function isjQuery(theObject) {
        return (theObject && theObject.jquery) ? true : false;
    }
    function isArray(theObject) {
        return Array.isArray(theObject);
    }
    function functionToString(theFunction) {
        return theFunction.toString();
    }
    function stringToFunction(theString) {
        try {
            return eval("window._FunctionConverter = " + theString);
        } catch (ex) {
            return false;
        }
    }

    

    function itemTouchStart(theEvent) {
        //var tmpTarget = theEvent.target || theEvent.currentTarget || theEvent.delegetTarget || {};
        if (theEvent.targetTouches && theEvent.targetTouches.length > 0) {
            var tmpTouchInfo = theEvent.targetTouches[0];
            ThisApp.util._start = {
                x: tmpTouchInfo.screenX,
                y: tmpTouchInfo.screenY
            }
        }
    }
    function touchIsClick(theRect, theX, theY) {

        // var tmpFarX = Math.abs(theRect.x + theRect.width - theX);
        // var tmpFarY = Math.abs(theRect.y - theY);
        // if( tmpFarX > this.MIN_TOUCH_DISTANCE || tmpFarY > this.MIN_TOUCH_DISTANCE){
        //     return false;
        // }        
        return theRect.x <= theX && theX <= theRect.x + theRect.width &&
            theRect.y <= theY && theY <= theRect.y + theRect.height;
    }

    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
      }
      
      function removeItemAll(arr, value) {
        var i = 0;
        while (i < arr.length) {
          if (arr[i] === value) {
            arr.splice(i, 1);
          } else {
            ++i;
          }
        }
        return arr;
      }

      function isReactClass(component){
        if(typeof(component) === 'function' && component.prototype && !!(component.prototype.isReactComponent)){
            return true;
        }
        //--ToDo: Do not assume every object is React
        if(typeof(component) === 'object'){
            if( typeof(component.$$typeof) == 'sympbol'){
                //This is a ref?
            }
            return true;
        }
        return false;
      }
      
    //ThisApp.util...
    var utilFunctions = {
        MIN_TOUCH_DISTANCE: 20,
        isReactClass: isReactClass,
        removeItemOnce: removeItemOnce,
        removeItemAll: removeItemAll,
        itemTouchStart: itemTouchStart,
        touchIsClick: touchIsClick,
        isPage: isPage,
        isStr: isStr,
        isFunc: isFunc,
        isObj: isObj,
        isElement: isElement,
        isjQuery: isjQuery,
        isArray: isArray,
        resizeToParent: resizeToParent,
        getUrlParameter: getUrlParameter,
        stringToFunction: stringToFunction,
        functionToString: functionToString,
        getObjectAsEncodedForm: ActionAppCore.util.getObjectAsEncodedForm,
        convertToJsonLive: convertToJsonLive,
        convertFromJsonLive: convertFromJsonLive,
        clone: function (theObj) {
            if (typeof (theObj) !== 'object') {
                throw ("Objects can only be cloned");
            }
            //--- Convert to JSON and back to create a copy
            var tmpClone = theObj;
            try {
                tmpClone = this.json(this.json(theObj));
            } catch (ex) {
                console.warn("Could not clone, error " + ex);
            }
            return tmpClone
        },
        json: function (theItem, theAutoCleanIfNeeded) {
            if (typeof (theItem) == 'string') {
                return JSON.parse(theItem);
            } else if (typeof (theItem) == 'object') {
                // try {
                //     return JSON.stringify(theItem, null, '\t')
                // } catch (ex) {

                // }
                if (theAutoCleanIfNeeded) {
                    var tmpClean = convertToJsonLive(theItem);
                    try {
                        return JSON.stringify(tmpClean, null, '\t');
                    } catch (ex2) {
                        throw ("Could not convert object " + ex2);
                    }
                } else {
                    try {
                        return JSON.stringify(theItem, null, '\t');
                    } catch (ex) {
                        throw ("Error processing json convert " + ex);
                    }

                }
            } else {
                throw ("Need a string or object")
            }
        }
    }

})(ActionAppCore, $);




/*
Author: Joseph Francis
License: LGPL
*/
//---  SitePage - Base for all application pages --- --- --- --- --- --- --- --- --- --- --- --- 
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    SiteMod.SitePage = SitePage;
    var StaticApp = SiteMod.CoreApp;
    var defaultLayoutOptions = StaticApp.layoutTemplates.defaultPage;

    var ExtendMod = ActionAppCore.module("extension");
    $.extend(SitePage.prototype, ExtendMod.PubSub)

    //--- Base class for application pages
    function SitePage(theOptions) {
        this.options = theOptions || {};
        this.pageName = this.options.pageName || '';
        this.pageNamespace = this.options.pageNamespace || this.pageName || '';
        this.part = {}; //--- Control instances by name
        this.parts = this.part //longcut - keep typing it wrong, can use either :)
        this.pageActions = {}; //--- A place for actions
        this.pageTitle = this.options.pageTitle || '';

        this.initPubSub();

        this.res = {
            "panels": {},
            "controls": {},
            "html": {}
        };

        this.common = {};

        this.layoutTemplates = this.options.layoutTemplates || false;

        this.navOptions = this.navOptions || this.options.navOptions || {};
        this._activatedFlag = false;
        this.layoutOptions = this.options.layoutOptions || false;

        if (this.layoutOptions) {

            //this.layoutOptions = preProcessLayoutRegions(this.layoutOptions);
            preProcessLayoutRegions(this.layoutOptions);

            this.layoutOptions = this.layoutOptions || {};
            this.layoutConfig = $.extend({}, defaultLayoutOptions, (this.options.layoutConfig || {}));

            //--- Use standard border layout template if none provided
            this.layoutOptions.spotPrefix = this.layoutOptions.spotPrefix || this.pageName;

            // this.layoutConfig.onresize_end = (
            //                 function (thePane, theElement, theState, theOptions, theName) {
            //                     if (typeof (this._onResizeLayout) == 'function') {
            //                         if (thePane == 'center') {
            //                             this._onResizeLayout(thePane, theElement, theState, theOptions, theName);
            //                         }
            //                     }

            //                     try {
            //                         if (this.publish) {
            //                             if (thePane == 'center') {
            //                                 this.publish('resizeLayout', [this, thePane, theElement, theState, theOptions, theName]);
            //                             }
            //                         }
            //                     } catch (ex) {
            //                         console.error('error on resize', ex);
            //                     }
            //                     return true;
            //                 }
            //             ).bind(this);

            //--- Extend with new layout related spot functions
            this.addToRegion = function (theRegion, theContent, theRenderer, thePrepend) {
                var tmpRegionSpotName = this.layoutOptions.spotPrefix + ":" + theRegion;
                ThisApp.addToSpot(tmpRegionSpotName, theContent, theRenderer, thePrepend, this.getParent$())
            }

            this.createInstance = function (theControl, theInstanceName) {
                if (!(theControl)) {
                    console.error('the control is not there to create ', theInstanceName);
                    throw ("Control now found to create " + theInstanceName)
                }
                this.parts[theInstanceName] = theControl.create(theInstanceName, {parent:this});
                return this.parts[theInstanceName];
            }

            //--- In this case we can just load the element control because it was required in the layout / required area
            this.loadLayoutControl = function (theRegion, theControl, theInstanceName) {
                var tmpRegionSpotName = this.layoutOptions.spotPrefix + ":" + theRegion;
                var tmpInstance = this.createInstance(theControl, (theInstanceName || theRegion));
                tmpInstance.loadToElement(tmpRegionSpotName);
            }
            this.loadRegion = function (theRegion, theContent, theRenderer) {
                var tmpRegionSpotName = this.layoutOptions.spotPrefix + ":" + theRegion;
                ThisApp.loadSpot(tmpRegionSpotName, theContent, theRenderer, this.getParent$())
            }
        }

        var appModule = ActionAppCore.module('app');
        appModule[this.pageName] = this;

    }

    var me = SitePage.prototype;

    me.getAppName = function(){
        //--- If running the app, use app info
        if( ActionAppCore.appInfo && ActionAppCore.appInfo.name ){
            return ActionAppCore.appInfo.name;
        }
        return '';
    }

    me.addPageWebControl = function (theControlName, theControl) {
        ThisApp.controls.addWebControl(this.ns(theControlName), theControl);
    }

    me.regionNames = ['center', 'north', 'south', 'east', 'west'];

    me.hideLoading = function (theOptions) {
        this.showLoading(false, theOptions);
    }

    me.showLoading = function (theDisplayFlag, theOptions) {
        var tmpOptions = theOptions || {};
        //-- Todo: Add regions option, string or array of regions to use
        //-- only use regions used on page when automatic?
        for (var iPos in me.regionNames) {
            var tmpRN = me.regionNames[iPos];
            if (theDisplayFlag === false) {
                ThisApp.getSpot(this.pageName + ':' + tmpRN).removeClass('loading');
            } else {
                ThisApp.getSpot(this.pageName + ':' + tmpRN).addClass('loading');
            }
        }
    }

    function preProcessLayoutRegions(theLayoutOptions) {
        //--- By reference so will update original
        //     .. to match desired layout to get by res type
        var tmpOpts = theLayoutOptions;

        var tmpType = '';
        if (tmpOpts.useControls === true) {
            tmpType = 'controls';
        } else if (tmpOpts.usePanels === true) {
            tmpType = 'panels'
        } else if (tmpOpts.useHTML === true) {
            tmpType = 'html'
        }

        for (var iPos in me.regionNames) {
            var tmpRegionType = tmpType;
            var tmpRegion = me.regionNames[iPos];
            var tmpRegionInfo = tmpOpts[tmpRegion];

            if (tmpRegionInfo) {

                if (typeof (tmpRegionInfo) == 'boolean' && tmpRegionType) {

                    tmpOpts[tmpRegionType] = tmpOpts[tmpRegionType] || {};
                    tmpOpts[tmpRegionType][tmpRegion] = {
                        partname: tmpRegion,
                        value: tmpRegion
                    }
                } else if (typeof (tmpRegionInfo) == 'string') {
                    tmpOpts[tmpRegionType] = tmpOpts[tmpRegionType] || {};

                    tmpOpts[tmpRegionType][tmpRegion] = {
                        partname: tmpRegion,
                        value: tmpRegionInfo
                    }
                } else if (typeof (tmpRegionInfo) == 'object') {

                    if (tmpRegionInfo.control) {
                        tmpRegionType = 'controls';
                        tmpRegionInfo.value = tmpRegionInfo.control;
                    } else if (tmpRegionInfo.panel) {
                        tmpRegionType = 'panels';
                        tmpRegionInfo.value = tmpRegionInfo.panel;
                    } else if (tmpRegionInfo.html) {
                        tmpRegionType = 'html';
                        tmpRegionInfo = tmpRegionInfo.html;
                    }
                    tmpOpts[tmpRegionType] = tmpOpts[tmpRegionType] || {};
                    tmpOpts[tmpRegionType][tmpRegion] = tmpRegionInfo
                }


                tmpOpts[tmpRegion] = true;
            }
        }
        return theLayoutOptions;
    }

    me.pubResize = function () {
        if (typeof (this._onResizeLayout) == 'function') {
            this._onResizeLayout();
        }
        if (this.parts) {
            for (aName in this.parts) {
                var tmpPart = this.parts[aName];
                if (tmpPart && tmpPart.refreshSubLayouts) {
                    tmpPart.refreshSubLayouts();
                }
            }
        }
    };
    me.initOnFirstLoad = function () {
        var dfd = jQuery.Deferred();
        var tmpThis = this;
        this.options = this.options || {};
        me.controls = {};

        //--- Deprecated - backward compat functionality until apps are upgraded
        if (this.options.pageTemplates) {
            this.options.required = this.options.required || {};
            //--- backward compat - deprecated
            this.options.required.templates = this.options.pageTemplates;
            if (!(this.options.required.templates.map) && (this.options.required.templates.templateMap)) {
                this.options.required.templates.map = this.options.required.templates.templateMap;
            }
        };

        if (this.options.pagePanels) {
            this.options.required = this.options.required || {};
            //--- backward compat - deprecated
            this.options.required.panels = this.options.pagePanels;
            if (!(this.options.required.panels.map) && (this.options.required.panels.panelMap)) {
                this.options.required.panels.map = this.options.required.panels.panelMap;
            }
        };
        //--- EMD ====> Deprecated - backward compat functionality until apps are upgraded

        var tmpPromRequired = true;
        var tmpPromLayoutReq = true;

        var tmpLayoutReq = this.getLayoutRequired();
        
        var tmpInitReq = ThisApp.loadResources.bind(this);

        if (this.options.required) {
            tmpPromRequired = tmpInitReq(this.options.required, { nsParent: this })
        }
        if (tmpLayoutReq) {
            tmpPromLayoutReq = tmpInitReq(tmpLayoutReq, { nsParent: this })
        }

        $.when(tmpPromRequired, tmpPromLayoutReq).then(function (theReply) {
            tmpThis.initLayout();
            tmpThis.initAppComponents();
            ThisApp.delay(100).then(function (theReply) {
                tmpThis.publish('resized', {});
                ThisApp.refreshLayouts();
                dfd.resolve(true);
            })
            
        })

        return dfd.promise();
    }


    //--- Usage: <div appuse="template" name="yourns:yourname">Template for {{titie}}</div>
    me.loadTemplatesFromMarkup = function () {

        var tmpNS = '';
        var tmpOptions = this.options || {};
        if (tmpOptions && tmpOptions.pageNamespace) {
            tmpNS = tmpOptions.pageNamespace + ":";
        }

        var tmpEls = ThisApp.getByAttr$({ page: this.pageName, appuse: "template" })

        if (tmpEls && tmpEls.length > 0) {
            for (var i = 0; i < tmpEls.length; i++) {
                var tmpEl = $(tmpEls[i]);
                var tmpName = tmpEl.attr('name') || '';
                var tmpHTML = tmpEl.html();
                if (tmpNS) {
                    tmpHTML = ThisApp.getUpdatedMarkupForNS(tmpHTML, tmpNS)
                }
                ThisApp.addTemplate(tmpName, tmpHTML);
            }
        }
    }

    //--- Usage: <div appuse="content" region="north">North Content</div>
    me.loadLayoutFromMarkup = function () {
        var tmpRegions = ['north', 'south', 'east', 'west'];
        var tmpOptions = this.options || {};
        var tmpEls = ThisApp.getByAttr$({ page: this.pageName, region: "center", appuse: "content" })

        if (tmpEls && tmpEls.length > 0) {
            var tmpCenterHTML = tmpEls.html();
            if (tmpOptions && tmpOptions.pageNamespace) {
                tmpCenterHTML = ThisApp.getUpdatedMarkupForNS(tmpCenterHTML, tmpOptions.pageNamespace)
            }
            this.loadRegion('center', tmpCenterHTML);
            tmpEls.remove();
        }

        for (var i = 0; i < tmpRegions.length; i++) {
            var tmpRegion = tmpRegions[i];
            //--- Is this region turned on?
            if (this.layoutOptions[tmpRegion]) {
                //--- Find related element and use it
                var tmpEls = ThisApp.getByAttr$({ page: this.pageName, region: tmpRegion, appuse: "content" })
                if (tmpEls && tmpEls.length > 0) {
                    var tmpHTML = tmpEls.html();
                    if (tmpOptions && tmpOptions.pageNamespace) {
                        tmpHTML = ThisApp.getUpdatedMarkupForNS(tmpHTML, tmpOptions.pageNamespace)
                    }
                    this.loadRegion(tmpRegion, tmpHTML);
                    tmpEls.remove();
                }

            }
        }
    }

    //--- Page level call to init app components on this page
    me.initAppComponents = function () {
        ThisApp.initAppComponents(this.getParent$())
    }
    me.getUpdatedMarkupForNS = function (theHTML) {
        return ThisApp.getUpdatedMarkupForNS(this.ns());
    }

    me.getResource = function (theType, theName) {
        var tmpRes = this.res[theType];
        if (!(tmpRes)) {
            return false;
        }
        tmpRes = tmpRes[theName];
        if (!(tmpRes)) {
            return false;
        }
        return tmpRes
    }

    me.getLayoutRequired = function () {
        if (!(this.layoutOptions.baseURL)) {
            return false;
        }
        var tmpRet = {};
        var tmpAnyFound = false;
        var tmpBaseURL = this.layoutOptions.baseURL || '';

        if (this.layoutOptions && this.layoutOptions.html) {
            var tmpHTMLNode = {
                baseURL: tmpBaseURL + 'html',
                map: {}
            };

            tmpLTs = this.layoutOptions.html
            for (var aName in tmpLTs) {
                tmpLTFound = true;
                tmpAnyFound = true;

                var tmpLT = tmpLTs[aName];
                var tmpLTName = '';
                if (typeof (tmpLT) == 'string') {
                    tmpLTName = tmpLT;
                } else {
                    tmpLTName = tmpLT.control || tmpLT.value || tmpLT.panel || tmpLT.html;
                }
                tmpHTMLNode.map[tmpLTName] = tmpLTName;
            }

            if (tmpLTFound) {
                tmpRet.html = tmpHTMLNode;
            }

        }

        if (this.layoutOptions && this.layoutOptions.panels) {
            var tmpLTs = this.layoutOptions.panels;
            var tmpLTFound = false;


            var tmpPanelsNode = {
                baseURL: tmpBaseURL + 'panels',
                map: {}
            };
            for (var aName in tmpLTs) {
                tmpLTFound = true;
                tmpAnyFound = true;

                var tmpLT = tmpLTs[aName];

                var tmpLTName = '';
                if (typeof (tmpLT) == 'string') {
                    tmpLTName = tmpLT;
                } else {
                    tmpLTName = tmpLT.control || tmpLT.value || tmpLT.panel || tmpLT.html;
                }

                var tmpCatalog = tmpLT.source || tmpLT.catalog;
                if (tmpCatalog) {
                    tmpPanelsNode.map[tmpLTName] = {
                        source: tmpCatalog,
                        name: tmpLTName
                    };
                    delete tmpPanelsNode.baseURL;
                } else {
                    tmpPanelsNode.map[tmpLTName] = tmpLTName;
                }

            }

            if (tmpLTFound) {
                tmpRet.panels = tmpPanelsNode;
            }
        }


        if (this.layoutOptions && this.layoutOptions.controls) {
            var tmpLTs = this.layoutOptions.controls;
            var tmpLTFound = false;

            var tmpBaseURL = this.layoutOptions.baseURL || '';
            var tmpControlsNode = {
                baseURL: tmpBaseURL + 'controls',
                map: {}
            };
            for (var aName in tmpLTs) {
                tmpLTFound = true;
                tmpAnyFound = true;

                var tmpLT = tmpLTs[aName];
                var tmpLTName = '';
                if (typeof (tmpLT) == 'string') {
                    tmpLTName = tmpLT;
                } else {
                    tmpLTName = tmpLT.control || tmpLT.value || tmpLT.panel || tmpLT.html;
                }

                var tmpCatalog = tmpLT.source || tmpLT.catalog;
                if (tmpCatalog) {
                    tmpControlsNode.map[tmpLTName] = {
                        source: tmpCatalog,
                        name: tmpLTName
                    };
                    delete tmpControlsNode.baseURL;
                } else {
                    tmpControlsNode.map[tmpLTName] = tmpLTName;
                }

            }

            if (tmpLTFound) {
                tmpRet.controls = tmpControlsNode;
            }
        }


        if (!(tmpAnyFound)) {
            return false;
        }
        return tmpRet;

    }


    me.initLayout = function () {

        if (this.layoutOptions && this.layoutOptions.content) {
            var tmpContentItems = this.layoutOptions.content;
            for (var aName in tmpContentItems) {
                var tmpContent = tmpContentItems[aName];
                this.loadRegion(aName, tmpContent);
            }
        }
        if (this.layoutOptions && this.layoutOptions.markedupLayout === true) {
            this.loadLayoutFromMarkup();
        }
        if (this.layoutOptions && this.layoutOptions.markedupTemplates === true) {
            this.loadTemplatesFromMarkup();
        }

        if (this.layoutOptions && this.layoutOptions.html) {
            var tmpContentItems = this.layoutOptions.html;
            for (var aName in tmpContentItems) {
                var tmpContentName = tmpContentItems[aName];
                var tmpHTML = this.res.html[tmpContentName];
                this.loadRegion(aName, tmpHTML || '');
            }
        }

        if (this.layoutOptions && this.layoutOptions.templates) {
            var tmpLTs = this.layoutOptions.templates;
            var tmpContext = {}
            for (var aName in tmpLTs) {
                var tmpLT = tmpLTs[aName];
                var tmpLTName = '';
                if (typeof (tmpLT) == 'string') {
                    tmpLTName = tmpLT;
                } else {
                    tmpLTName = tmpLT.name;
                }
                this.loadRegion(aName, ThisApp.renderTemplate(tmpLTName, tmpContext));
            }
        }

        if (this.layoutOptions && this.layoutOptions.panels) {
            var tmpLTs = this.layoutOptions.panels;
            var tmpContext = {}

            for (var aName in tmpLTs) {
                var tmpInstanceName = aName;
                var tmpLT = tmpLTs[aName];
                var tmpLTName = '';
                if (typeof (tmpLT) == 'string') {
                    tmpLTName = tmpLT;
                } else {
                    tmpLTName = tmpLT.control || tmpLT.value || tmpLT.panel || tmpLT.html;
                    tmpInstanceName = tmpLT.partname || tmpLT.name;
                }
                var tmpCtl = this.res.panels[tmpLTName];

                if (!(tmpCtl) && tmpLT.source) {
                    tmpCtl = ThisApp.getPanel(tmpLT.source + "/" + tmpLTName)
                }
                if (!(tmpCtl)) {
                    console.error('Panel Missing', tmpLTName);
                    alert("There was an issues showing this page, contact support")
                } else {
                    this.loadLayoutControl(aName, tmpCtl, tmpInstanceName);
                }
            }
        }

        if (this.layoutOptions && this.layoutOptions.controls) {
            var tmpLTs = this.layoutOptions.controls;
            var tmpContext = {}

            for (var aName in tmpLTs) {
                var tmpInstanceName = aName;
                var tmpLT = tmpLTs[aName];
                var tmpLTName = '';
                if (typeof (tmpLT) == 'string') {
                    tmpLTName = tmpLT;
                } else {
                    tmpLTName = tmpLT.control || tmpLT.value || tmpLT.panel || tmpLT.html;;
                    tmpInstanceName = tmpLT.partname || tmpLT.name;
                }
                var tmpCtl = this.res.controls[tmpLTName];
                if (!(tmpCtl) && tmpLT.source) {
                    tmpCtl = ThisApp.getControl(tmpLT.source + "/" + tmpLTName)
                }
                if (!(tmpCtl)) {
                    console.error('Control Missing', tmpLTName);
                    alert("There was an issues showing this page, contact support")
                } else {
                    this.loadLayoutControl(aName, tmpCtl, tmpInstanceName);
                }
            }
        }

        //--- This resizes the layouts with the new content loaded from templates
        if (typeof (ThisApp.refreshLayouts) == 'function') {
            ThisApp.refreshLayouts();
        }
    }

    //--- Used to add this pages namespace to a string
    // returns pageNamespace:theString
    // returns pageNamespace: if nothing passed, to get the NS of the page
    me.prefixString = function (theString) {
        return this.pageNamespace + ":" + (theString || '');
    }
    //-- Shortcut
    me.ns = me.prefixString;

    me.open = function (theOptions) {
        return ThisApp.gotoPage(this.pageName);
    }
    me.focus = me.open;

    //--- Will prefix with this.pageName as needed
    me.loadLayoutSpot = function (theRegionName, theContent, theRenderer) {
        var tmpName = theRegionName || 'center';
        tmpName = this.pageName + ":" + tmpName;
        return this.loadSpot(tmpName, theContent, theRenderer);
    }

    //--- Calls parent loadSpot within this page DOM and refreshes layouts
    me.loadSpot = function (theName, theContent, theRenderer) {
        ThisApp.loadSpot(theName, theContent, theRenderer, this.getParent$(), 'pagespot');
        try {
            this.refreshLayouts();
        } catch (error) {

        }
    }

    //--- Calls parent loadSpot within this page DOM and refreshes layouts
    me.addToSpot = function (theName, theContent, theRenderer, thePrepend) {
        ThisApp.addToSpot(theName, theContent, theRenderer, thePrepend, this.getParent$(), 'pagespot');
        try {
            this.refreshLayouts();
        } catch (error) {

        }

    }

    //--- Deprecated, use ThisPage.loadSpot and addToSpot ***
    me.loadPageSpot = me.loadSpot;
    me.addToPageSpot = me.addSpot;

    me.toTab = function (theGroupName, theItemName) {
        if (!(theGroupName && theItemName)) { return };
        ThisApp.gotoTab(this.ns(theGroupName), theItemName)
    }

    //--- Returns jQuery element for the spot name on this page
    me.getSpot$ = function (theName) {
        return ThisApp.getSpot$(theName, this.getParent$(), 'pagespot');
    }
    me.spot$ = me.getSpot$; //shortcuts
    me.spot = me.getSpot$; //shortcuts
    me.getSpot = me.getSpot$; //shortcuts

    //--- Set display (true/false) for the spot name on this page
    me.spotDisplay = function (theName, theIsVis) {
        tmpEl = this.getSpot$(theName);
        if (theIsVis) {
            tmpEl.show();
        } else {
            tmpEl.hide();
        }
    }

    me.getData = function(theKey){
        return this.contextData[theKey];
    }
    me.setData = function(theKey, theData){
        this.contextData[theKey] = theData;
        return this;
    }
    me.hasData = function(theKey, theData){
        return this.contextData.hasOwnProperty(theKey);
    }
    //--> me.getDataObject and me.setDataObject also available
    

    me.getByAttr$ = function (theItems, theExcludeBlanks) {
        return ThisApp.getByAttr$(theItems, this.getParent$(), theExcludeBlanks);
    }
    me.getParent$ = function () {
        var tmpAttribs = {
            group: "app:pages",
            item: this.pageName
        }
        this.parent$ = this.parent$ || $(this._el)
        return this.parent$;
    }
    me.refreshLayouts = function () {
        if (this.layout) {
            this.layout.resizeAll();
        }
    }

    //======================================
    //======================================
    //======================================





    me.init = init;
    function init(theApp) {

        if (theApp) {
            this.app = theApp;
        }

        
        var tmpStuffToPullIn = [
            , 'getDataObject'
            , 'setDataObject'
        ];

        for (var iStuff = 0; iStuff < tmpStuffToPullIn.length; iStuff++) {
            var tmpFuncName = tmpStuffToPullIn[iStuff];
            var tmpFunc = this.app[tmpFuncName];
            if (ThisApp.util.isFunc(tmpFunc)) {
                this[tmpFuncName] = tmpFunc.bind(this);
            }
        }
        

        this.context = {
            app: ThisApp.context,
            page: {
                controller: this,
                data: this.options.contextData || {}
            }
        };
        //--- Quick access to context data
        this.contextData = this.context.page.data;

        //--- Grab some common functionality from app ...
        var tmpStuffToPullIn = [
            , 'getResourceURIsForType'
            , 'addResourceFromContent',
            , 'loadResources',
            , 'addResource'
            , 'getPanel'
            , 'getControl'
            , 'getResourceForType'
        ];

        for (var iStuff = 0; iStuff < tmpStuffToPullIn.length; iStuff++) {
            var tmpFuncName = tmpStuffToPullIn[iStuff];
            var tmpFunc = ThisApp[tmpFuncName];
            if (ThisApp.util.isFunc(tmpFunc)) {
                this[tmpFuncName] = tmpFunc.bind(this);
            }
        }


        if (typeof (this._onPreInit) == 'function') {
            this._onPreInit(this.app)
        }

        if (this.app && this.pageNamespace && this.pageNamespace != '') {
            this.app.registerActionDelegate(this.pageNamespace, runAction.bind(this));
        }

        //--- Add dynamic link on init from plugin module
        if (this.app && this.app.$appPageContainer) {
            this.app.$appPageContainer.append('<div appuse="cards" group="app:pages" item="' + this.pageName + '" class="hidden">' + this.pageTitle + '</div>');
            this._el = this.app.$appPageContainer.find('[group="app:pages"][item="' + this.pageName + '"]')

            this.app.registerNavLink({
                "name": this.pageName,
                "title": this.pageTitle,
                "options": this.navOptions || {},
                "onActivate": onActivateThisPage.bind(this)
            });
            this.getLayoutHTML = function () {
                var tmpRet = "";
                var tmpAll = ['north', 'south', 'center', 'east', 'west'];
                var tmpPre = this.layoutOptions.spotPrefix;
                for (var i = 0; i < tmpAll.length; i++) {
                    var tmpArea = tmpAll[i];
                    if (this.layoutOptions[tmpArea] !== false) {
                        tmpRet += '<div spot="' + tmpPre + ':' + tmpArea + '" class="ui segment nopad middle-' + tmpArea + '"></div>';
                    }
                }
                return tmpRet;
            };

            this.parentEl = this.app.getByAttr$({ group: "app:pages", item: this.pageName });
            this.parentEl.html(this.getLayoutHTML());
            this.parentEl.on("click", itemClicked.bind(this));
            var tmpParentDomEl = this.parentEl.get(0);
            if (tmpParentDomEl) {
                tmpParentDomEl.ontouchend = itemTouchEnd.bind(this);
                tmpParentDomEl.ontouchstart = ThisApp.util.itemTouchStart.bind(this);
            }

            if (typeof (this._onInit) == 'function') {
                this.parentEl.removeClass('loading');
                this._onInit(this.app)
            };

            this.layoutConfig = this.layoutConfig || {};
            //if( !(this.layoutConfig.onresize_end)){
            this.pageLayoutChanged = ActionAppCore.debounce(function () {
                this.publish('resized', {});;
            }, 200).bind(this);


            this.layoutConfig.onresize_end = this.pageLayoutChanged;

            //}
            if (this.layoutOptions && this.layoutConfig) {
                this.layoutSpot = ThisApp.getByAttr$({ group: ThisApp.pagesGroup, "item": this.pageName });
                this.layout = this.layoutSpot.layout(this.layoutConfig);
            };

            this.pubResize = me.pubResize.bind(this);
            this.subscribe('resized', me.pubResize.bind(this));

        }
    }

    // function inRect(theRect, theX, theY) {
    //     return theRect.x <= theX && theX <= theRect.x + theRect.width &&
    //     theRect.y <= theY && theY <= theRect.y + theRect.height;
    // }

    // function itemTouchStart(theEvent) {
    //     var tmpTarget = theEvent.target || theEvent.currentTarget || theEvent.delegetTarget || {};
    //     if( theEvent.targetTouches && theEvent.targetTouches.length > 0){
    //         var tmpTouchInfo = theEvent.targetTouches[0];
    //         tmpTarget._start = {
    //             x:tmpTouchInfo.screenX, 
    //             y: tmpTouchInfo.screenY
    //         }
    //     }
    // }

    function itemTouchEnd(theEvent) {
        var tmpTarget = theEvent.target || theEvent.currentTarget || theEvent.delegetTarget || {};
        var tmpBounds = tmpTarget.getBoundingClientRect();
        if (theEvent.changedTouches && theEvent.changedTouches.length > 0) {
            var tmpTouchInfo = theEvent.changedTouches[0];
            var tmpStart = ThisApp.util._start;
            var tmpXDiff = Math.abs(tmpStart.x - tmpTouchInfo.screenX)
            var tmpYDiff = Math.abs(tmpStart.y - tmpTouchInfo.screenY)
            if (tmpXDiff > ThisApp.util.MIN_TOUCH_DISTANCE || tmpYDiff > ThisApp.util.MIN_TOUCH_DISTANCE) {
                return;
            }

            if (ThisApp.util.touchIsClick(tmpBounds, tmpTouchInfo.clientX, tmpTouchInfo.clientY)) {
                itemClicked.bind(this)(theEvent);
            }
        }
    }

    function itemClicked(theEvent) {
        var tmpObj = theEvent.target || theEvent.currentTarget || theEvent.delegetTarget || {};
        var tmpActionDetails = ThisApp.getActionFromObj(tmpObj, 'pageaction');
        if (!(tmpActionDetails.hasOwnProperty('action') && tmpActionDetails.hasOwnProperty('el'))) {
            //--- OK, just clicked somewhere with nothing to catch it, but not an action
            //--- but check to see if we have a regularlaction
            var tmpAppActionDetails = ThisApp.getActionFromObj(tmpObj, 'action');
            if ((tmpAppActionDetails.hasOwnProperty('action') && tmpAppActionDetails.hasOwnProperty('el'))) {
                if (tmpAppActionDetails.action == 'selectMe') {
                    //--- ToDo: Revisit how this works, make generic, etc
                    this.publish('selectMe', [this, tmpAppActionDetails.el])
                }
            }
            return;
        }
        var tmpAction = tmpActionDetails.action;
        tmpObj = tmpActionDetails.el;

        //--- ToDo: May want fly-over to stay open for multi-click options
        ThisApp.clearFlyover();


        if (tmpAction) {
            this.runAction(tmpAction, tmpObj);
            if (tmpAction == 'selectMe') {
                this.publish('selectMe', [this, tmpObj])
            }
            theEvent.preventDefault();
            theEvent.stopPropagation();
        }
        return false;

    }
    me.runAction = runAction;
    function runAction(theAction, theSourceObject) {
        var tmpAction = theAction || '';
        var tmpActionName = tmpAction;
        if (ThisApp.util.isObj(tmpActionName)) {
            tmpActionName = tmpActionName.action;
        }
        var tmpMyActions = this.pageActions || {};
        if (typeof (tmpMyActions[tmpActionName]) == 'function') {
            (tmpMyActions[tmpActionName]).call(this, tmpAction, theSourceObject);
        } else if (typeof (this[tmpActionName]) == 'function') {
            (this[tmpActionName]).call(this, tmpAction, theSourceObject);
        } else if (typeof (me[tmpActionName]) == 'function') {
            (me[tmpActionName]).call(this, tmpAction, theSourceObject);
        } else {
            console.warn('Page Action Not Found', tmpActionName);
            ThisApp.runAction(theAction, theSourceObject);
        }
    }

    function onActivateThisPage() {
        //-- Runs _onFirstActivate one time, 
        //    ... then calls _onActivate sucessive times
        //  _onActivate NOT CALLED the first time, 
        //   ... call manually if needed from _onFirstActivate
        if (!this._activatedFlag) {
            this._activatedFlag = true;
            if (typeof (this._onFirstActivate) == 'function') {
                this._onFirstActivate(this.app);
            }
        } else if (typeof (this._onActivate) == 'function') {
            this._onActivate(this.app);
        }
    }

    return me;

})(ActionAppCore, $);






































//==== BUILT IN PLUGINS - PART OF STANDARD BASE


/*
Author: Joseph Francis
License: LGPL
*/

(function (ActionAppCore, $) {
    var pluginConfig = {
        name: "Prompter",
        ns: "_prompter"
    }

    var MyMod = ActionAppCore.module("plugin");
    MyMod[pluginConfig.name] = ThisPageController;

    //var ThisApp = null;


    var thisComponentID = "plugin:" + pluginConfig.name;

    //--- Base class for application pages
    function ThisPageController(theOptions) {
        this.options = theOptions || {};
        this.actions = this.options.actions || {};
        var defaults = {};
        if (typeof (this.options.app) == 'object') {
            var tmpApp = this.options.app;
            if (tmpApp && tmpApp.registerComponent) {
                tmpApp.registerComponent(thisComponentID, this);
            }
        }
    }

    var me = ThisPageController.prototype;

    //--- Private Actions
    var act = {};

    function runAction(theAction, theSourceObject) {
        if (typeof (act[theAction]) == 'function') {
            (act[theAction]).call(this, theAction, theSourceObject);
        }
        if (typeof (me[theAction]) == 'function') {
            (me[theAction]).call(this, theAction, theSourceObject);
        }
    }

    me.init = init;
    function init(theApp) {
        tmpHTML = [];

        tmpHTML.push('<div appuse="_prompter:prompt-dialog" class="ui modal">');
        tmpHTML.push('	<div appuse="_prompter:prompt-dialog-title" class="header"></div>');
        //ToDo: remove scrolling content class for cordova apps (bug in scrolling)
        tmpHTML.push('	<div appuse="_prompter:prompt-dialog-scroller" class="scrolling content">');
        tmpHTML.push('	<div appuse="_prompter:prompt-dialog-text-top" class="forms-top-content"></div>');
        tmpHTML.push('	<div appuse="_prompter:prompt-dialog-text" class="app-layout-pane">');
        tmpHTML.push('  </div>');
        tmpHTML.push('  </div>');
        tmpHTML.push('	<div class="actions">');
        tmpHTML.push('	  <div appuse="_prompter:prompt-dialog-yes" action="_prompter:submitPrompt" class="ui button blue">');
        tmpHTML.push('		Yes');
        tmpHTML.push('	  </div>');
        tmpHTML.push('	  <div appuse="_prompter:prompt-dialog-no" action="_prompter:hidePrompt" class="ui gray button">');
        tmpHTML.push('		No');
        tmpHTML.push('	  </div>');
        tmpHTML.push('	  <div appuse="_prompter:prompt-dialog-cancel" action="_prompter:hidePrompt" class="ui button" style="display:none">');
        tmpHTML.push('		Cancel');
        tmpHTML.push('	  </div>');
        tmpHTML.push('	</div>');
        tmpHTML.push('</div>');
        tmpHTML.push('');

        tmpHTML.push('<div appuse="_prompter:ask-dialog" class="ui tiny modal">');
        tmpHTML.push('	<div appuse="_prompter:ask-dialog-title" class="header"></div>');
        tmpHTML.push('	<div class="content" style="font-size:larger;font-weight:bolder;">');
        tmpHTML.push('<div style="float:left;"><div style="margin-bottom:10px;"><i class="icon huge question circle blue" /></div></div>');
        tmpHTML.push('    <div appuse="_prompter:ask-dialog-text" class="description">');
        tmpHTML.push('    </div>');
        tmpHTML.push('	</div>');
        tmpHTML.push('	<div class="actions" style="clear:both;">');
        tmpHTML.push('	  <div action="_prompter:hideConfirmNo" class="ui red button">');
        tmpHTML.push('		No');
        tmpHTML.push('	  </div>');
        tmpHTML.push('	  <div action="_prompter:hideConfirmYes" class="ui right green labeled icon button">');
        tmpHTML.push('		Yes');
        tmpHTML.push('		<i class="checkmark icon"></i>');
        tmpHTML.push('	  </div>');
        tmpHTML.push('	</div>');
        tmpHTML.push('</div>');

        tmpHTML.push('<div appuse="_prompter:alert-dialog" class="ui tiny modal">');
        tmpHTML.push('	<div appuse="_prompter:alert-dialog-title" class="header"></div>');
        tmpHTML.push('	<div class="content" style="font-size:larger;font-weight:bolder;">');
        tmpHTML.push('<div style="float:left;"><div style="margin-bottom:10px;"><i appuse="_prompter:alert-dialog-icon" class="" /></div></div>');
        tmpHTML.push('    <div appuse="_prompter:alert-dialog-text" class="description">');
        tmpHTML.push('    </div>');

        tmpHTML.push('	</div>');
        tmpHTML.push('	<div class="actions" style="clear:both;">');
        tmpHTML.push('	  <div action="_prompter:hideAlert" class="ui right blue button" style="min-width:200px">');
        tmpHTML.push('		OK');
        tmpHTML.push('	  </div><div style="clear:both;"></div>');
        tmpHTML.push('	</div>');
        tmpHTML.push('</div>');


        $('body').append(tmpHTML.join(''));


        //--- Semantic UI Modal code needs time to complete before next modal
        me.modalDelay = 50; //ms

        //===== Alert Prompt =================================================
        var alertDialogPromises = [];
        alertDialogPromiseCount = 0;
        var alertDialogPromise = false;

        //none, info, question, confirmation, warning
        me.promptIconClasses = {
            "": ""
            , "i": "icon huge info circle blue"
            , "q": "icon huge question circle blue"
            , "c": "icon huge check circle green"
            , "w": "icon huge exclamation triangle orange"
            , "e": "icon huge exclamation circle red"
        };

        me.hideAlert = function () {
            me.alertDialog.modal("hide");
        }

        me.alert = function (theText, theTitle, theType) {
            var tmpText = theText || '';
            var tmpTitle = theTitle || '';
            var tmpType = theType || '';
            var tmpIconClasses = '';

            if (tmpType) {
                tmpType = tmpType.substr(0, 1).toLowerCase();
                tmpIconClasses = me.promptIconClasses[tmpType] || ''
            }

            me.alertDialogText.html(tmpText);
            me.alertDialogTitle.html(tmpTitle);
            me.alertDialogIcon.removeClass();
            me.alertDialogIcon.addClass(tmpIconClasses)
            alertDialogPromise = jQuery.Deferred();

            ThisApp.delay(100).then(function () {
                me.alertDialog.modal('hide');
                ThisApp.delay(100).then(function () {
                    me.alertDialog.modal('show');
                    ThisApp.prompter.alertDialog[0].scrollIntoView();
                })

            })
            //return alertDialogPromises[alertDialogPromiseCount];
            return alertDialogPromise;

        }
        me.alertTimes = 0;
        me.alertDialogTitle = ThisApp.getByAttr$({ appuse: "_prompter:alert-dialog-title" });
        me.alertDialogText = ThisApp.getByAttr$({ appuse: "_prompter:alert-dialog-text" });
        me.alertDialogIcon = ThisApp.getByAttr$({ appuse: "_prompter:alert-dialog-icon" });
        me.alertDialog = ThisApp.getByAttr$({ appuse: "_prompter:alert-dialog" });
        if (me.alertDialog && me.alertDialog.modal) {
            me.alertDialog = me.alertDialog.modal(
                {
                    onHidden: function () {
                        if (alertDialogPromise) {
                            var tmpP = alertDialogPromise
                            delete alertDialogPromise;
                            tmpP.resolve(true);
                        }
                    },
                    allowMultiple: true,
                    closable: true
                }

            );
        }





        //===== Ask Prompt =================================================
        var askDialogPromise = false

        me.ask = function (theText, theTitle) {
            var tmpText = theText || 'Are you sure?';
            var tmpTitle = theTitle || 'Question?';
            me.askDialogText.html(tmpText);
            me.askDialogTitle.html(tmpTitle);
            me.confirmStatus = null;
            me.askDialog.modal('show');
            askDialogPromise = jQuery.Deferred();
            return askDialogPromise;
        }
        //--- Alias as confirm also
        me.confirm = me.ask;
        me.confirmStatus = null;
        me.hideConfirmYes = function () {
            me.confirmStatus = true;
            me.askDialog.modal('hide');
        }
        me.hideConfirmNo = function () {
            me.confirmStatus = false;
            me.askDialog.modal('hide');
        }

        me.askDialogTitle = ThisApp.getByAttr$({ appuse: "_prompter:ask-dialog-title" });
        me.askDialogText = ThisApp.getByAttr$({ appuse: "_prompter:ask-dialog-text" });

        me.askDialog = ThisApp.getByAttr$({ appuse: "_prompter:ask-dialog" });
        if (me.askDialog && me.askDialog.modal) {
            me.askDialog = me.askDialog.modal(
                {
                    closable: false,
                    allowMultiple: true,
                    onHidden: function () {
                        if (askDialogPromise) {
                            var tmpP = askDialogPromise;
                            ThisApp.delay(me.modalDelay).then(function () {
                                tmpP.resolve(me.confirmStatus);
                            })
                            askDialogPromise = false;
                            me.askDialogText.html('');
                            me.askDialogTitle.html('')
                        }
                    }
                }

            );
        }







        //===== Full Prompt =================================================
        //--- Attach to Dialogs
        me.onHiddenPrompt = function () {
            if (typeof (me.callback) == 'function') {
                var tmpFN = me.callback;
                tmpFN(false, me.promptDialog);
                me.callback = false;
            }
            if (typeof (me.promise) == 'object') {
                var tmpPromise = me.promise;
                me.promise = false;
                //-- Resolve false if cancel pressed or closed any other way
                ThisApp.delay(me.modalDelay).then(function () {
                    tmpPromise.resolve(false)
                })

            }


        }
        me.hidePrompt = function () {

            me.promptDialog.modal('hide');
        }
        me.submitPrompt = function () {
            var tmpCloseFlag = true;
            if (typeof (me.callback) == 'function') {
                var tmpFN = me.callback;

                var tmpFNReply = tmpFN(true, me.promptDialog);
                if (typeof (tmpFNReply) == 'boolean') {
                    tmpCloseFlag = tmpFNReply;
                }
            }
            if (tmpCloseFlag) {

                me.callback = false;
                if (typeof (me.promise) == 'object') {
                    var tmpPromise = me.promise;
                    me.promise = false;
                    ThisApp.delay(me.modalDelay).then(function () {
                        tmpPromise.resolve(true, me.promptControl)
                    })


                }

                me.promptDialog.modal('hide');
            }
        }



        me.promptDialog = ThisApp.getByAttr$({ appuse: "_prompter:prompt-dialog" });
        if (me.promptDialog && me.promptDialog.modal) {
            me.promptDialog = me.promptDialog.modal(
                {
                    closable: false,
                    allowMultiple: true,
                    onHidden: me.onHiddenPrompt.bind(me)
                }
            );
        }


        me.promptDialogScroller = ThisApp.getByAttr$({ appuse: "_prompter:prompt-dialog-scroller" });
        me.promptDialogBody = ThisApp.getByAttr$({ appuse: "_prompter:prompt-dialog" });
        me.promptDialogTitle = ThisApp.getByAttr$({ appuse: "_prompter:prompt-dialog-title" });
        me.promptDialogTextTop = ThisApp.getByAttr$({ appuse: "_prompter:prompt-dialog-text-top" });
        me.promptDialogText = ThisApp.getByAttr$({ appuse: "_prompter:prompt-dialog-text" });
        me.promptDialogYes = ThisApp.getByAttr$({ appuse: "_prompter:prompt-dialog-yes" });
        me.promptDialogNo = ThisApp.getByAttr$({ appuse: "_prompter:prompt-dialog-no" });
        me.promptDialogCancel = ThisApp.getByAttr$({ appuse: "_prompter:prompt-dialog-cancel" });

        me.promise = false;
        me.callback = false;

        //--- Supported?
        me.promptSize = function (theNewSize) {
            me.promptDialog
                .removeClass('tiny')
                .removeClass('small')
                .removeClass('medium')
                .removeClass('large')
                .removeClass('fullscreen')
                .addClass(theNewSize)
        }

        function promptControlCommonCallback(thePromptStatus) {
            if (thePromptStatus === false) {
                return true;
            }
            //-- Pass true to run validation
            var tmpFormObj = this.getWebControlDetails();
            //See if valid,if so - save the data to resolve when done
            var tmpValidation = this.validate();
            var tmpIsValid = tmpValidation && tmpValidation.isValid === true;
            if (tmpIsValid) {
                promptControlCurrentObject = tmpFormObj.data
            }
            return tmpIsValid;
        }

        me.promptControl = false;
        me.prompt = function (theOptions) {
            var tmpOptions = theOptions || {};
            var tmpPromptText = tmpOptions.text || tmpOptions.content || tmpOptions.html || ''
                , tmpButtons = tmpOptions.buttons || ''
                , tmpTopText = tmpOptions.topText || ''
                , tmpTitle = tmpOptions.title || ''
                , tmpControl = tmpOptions.control || tmpOptions.panel || tmpOptions.html || tmpOptions.value || false
                , tmpSize = tmpOptions.size || 'small'
                , tmpAction = tmpOptions.action || '';


            me.promptSize(tmpSize);

            me.callback = false;
            if (typeof (tmpOptions.callback) == 'function') {
                me.callback = tmpOptions.callback
            }
            if (!(tmpPromptText) & !(tmpControl)) {
                throw ("No prompt provided");
            }
            me.promptDialogTitle.html(tmpTitle);
            me.promptDialogTextTop.html(tmpTopText)

            //--- Special stuff to do when prompting a control
            if ((tmpControl)) {

                var tmpControlObject = tmpControl;
                if (tmpControl.create) {
                    tmpControlObject = tmpControl.create("prompt-form");
                }
                me.callback = promptControlCommonCallback.bind(tmpControlObject)
                me.promptControl = tmpControlObject;

                if (tmpControlObject && ThisApp.util.isFunc(tmpOptions.onBeforeLoad)) {
                    var tmpFunc = tmpOptions.onBeforeLoad.bind(tmpControlObject);
                    tmpFunc(tmpControlObject, this);
                }
                if (typeof (tmpOptions.readonly) == 'boolean') {
                    var tmpConfig = tmpControlObject.getConfig();
                    tmpConfig.options = tmpConfig.options || {};
                    tmpConfig.options.readonly = tmpOptions.readonly;
                }
                tmpControlObject.loadToElement(me.promptDialogText.get(0))

                if (ThisApp.util.isObj(tmpOptions.doc)) {
                    tmpControlObject.loadData(tmpOptions.doc);
                }

                if (tmpControlObject && ThisApp.util.isFunc(tmpOptions.onBeforePrompt)) {
                    var tmpFunc = tmpOptions.onBeforePrompt.bind(tmpControlObject);
                    tmpFunc(tmpControlObject, this);
                }

            } else {
                me.promptDialogText.html(tmpPromptText);
            }

            ThisApp.initAppComponents(me.promptDialogText);

            var tmpCancel = false;
            var tmpYes = "OK";
            var tmpNo = "Cancel";

            var tmpYesAction = "_prompter:submitPrompt";
            var tmpCustomAction = false;
            if (tmpAction) {
                tmpCustomAction = true;
                tmpYesAction = tmpAction;
            }
            me.promptDialogYes.attr("action", tmpYesAction);

            if (typeof (tmpButtons) == 'string' && tmpButtons.indexOf("yn") == 0) {
                tmpYes = "Yes";
                tmpNo = "No";
                tmpCancel = (tmpButtons == 'ync');
            } else if (typeof (tmpButtons) == 'object') {
                tmpYes = "Yes";
                tmpNo = "No";
                if (tmpButtons.yes) {
                    tmpYes = tmpButtons.yes;
                } else if( tmpButtons.yes === false){
                    tmpYes = false;
                }
                if (tmpButtons.no) {
                    tmpNo = tmpButtons.no;
                } else if( tmpButtons.no === false){
                    tmpNo = false;
                }
                if (typeof (tmpButtons.cancel) === 'boolean') {
                    tmpCancel = tmpButtons.cancel;
                }
            }

            if( tmpYes == false ){
                me.promptDialogYes.hide();
            } else {
                me.promptDialogYes.html(tmpYes);
                me.promptDialogYes.show();
            }
            if( tmpNo == false ){
                me.promptDialogNo.hide();
            } else {
                me.promptDialogNo.html(tmpNo);
                me.promptDialogNo.show();
            }
            
            if (tmpCancel) {
                me.promptDialogCancel.show();
            } else {
                me.promptDialogCancel.hide();
            }

            var tmpClosable = (tmpOptions.closable === true);
            me.promptDialog.modal('setting', 'closable', tmpClosable);

            me.promptDialog.modal('show');
            if (!(tmpCustomAction)) {
                me.promise = jQuery.Deferred();
                return me.promise;
            }

        }



        theApp.registerActionDelegate(pluginConfig.ns, runAction);
        return this;
    }



})(ActionAppCore, $);


//=========     Controls Plugin
/*
Author: Joseph Francis
License: LGPL
*/

(function (ActionAppCore, $) {
    var pluginConfig = {
        name: "Controls",
        ns: "_controls"
    }

    var SiteMod = ActionAppCore.module("site");
    var StaticApp = SiteMod.CoreApp;
    var defaultLayoutOptions = StaticApp.layoutTemplates.defaultControl;

    var MyMod = ActionAppCore.module("plugin");
    MyMod[pluginConfig.name] = ThisPageController;

    var ExtendMod = ActionAppCore.module("extension");

    //var ThisApp = null;

    var thisComponentID = "plugin:" + pluginConfig.name;

    //--- Base class for application pages
    function ThisPageController(theOptions) {
        this.options = theOptions || {};
        this.actions = this.options.actions || {};
        var defaults = {};
        if (typeof (this.options.app) == 'object') {
            var tmpApp = this.options.app;
            if (tmpApp && tmpApp.registerComponent) {
                tmpApp.registerComponent(thisComponentID, this);
            }
        }
    }

    var me = ThisPageController.prototype;

    me.detailsIndex = {
        "getDetails": function (theName) {
            return this[getUnifiedName(theName)];
        },
        "Control": { name: "Control", category: 'Controls', dir: "controls", icon: 'newspaper', lang: 'javascript' },
        "Panel": { name: "Panel", category: 'Panels', dir: "panels", icon: 'newspaper outline', lang: 'javascript', type: 'json' },
        "HTML": { name: "HTML", category: 'HTML', dir: "html", icon: 'code', lang: 'html' },
        "Template": { name: "Template", category: 'Templates', dir: "tpl", icon: 'object group outline', lang: 'html' }
    }

    me.layoutCounter = 0;
    me.getNextLayoutName = function () {
        me.layoutCounter++;
        return 'layout-' + me.layoutCounter;
    }

    var generalCounter = 0;
    me.getGlobalCounter = function () {
        generalCounter++;
        return generalCounter;
    }

    me.getUnifiedPluralName = getUnifiedPluralName;
    function getUnifiedPluralName(theName){
        if (!isStr(theName)) {
            return "";
        }
        
        var tmpNameCheck = getUnifiedName(theName);
        if (tmpNameCheck == 'Control') {
            return 'controls';
        }
        if (tmpNameCheck == 'Panel') {
            return 'panels';
        }
        if (tmpNameCheck == 'HTML') {
            return 'html';
        }
        if (tmpNameCheck == 'Template' || tmpNameCheck == 'templates') {
            return 'templates';
        }

        
        
    }
    me.getUnifiedName = getUnifiedName;
    function getUnifiedName(theName) {
        if (!isStr(theName)) {
            return "";
        }
        var tmpNameCheck = theName.toLowerCase();
        if (tmpNameCheck == 'control' || tmpNameCheck == 'controls') {
            return 'Control';
        }
        if (tmpNameCheck == 'panel' || tmpNameCheck == 'panels') {
            return 'Panel';
        }
        if (tmpNameCheck == 'html') {
            return 'HTML';
        }
        if (tmpNameCheck == 'template' || tmpNameCheck == 'templates') {
            return 'Template';
        }

    }

    me.genericCounter = 0;
    me.getNextCounter = function () {
        me.genericCounter++;
        return me.genericCounter;
    }

    //--- Private Actions
    var act = {};

    function runAction(theAction, theSourceObject) {
        if (typeof (act[theAction]) == 'function') {
            (act[theAction]).call(this, theAction, theSourceObject);
        }
        if (typeof (me[theAction]) == 'function') {
            (me[theAction]).call(this, theAction, theSourceObject);
        }
    }


    me.init = init;
    function init(theApp) {
        theApp.registerActionDelegate(pluginConfig.ns, runAction);
        return this;
    }


    //=== === === === === === === === === === === === === === === === 
    //--- Global controls functions
    //=== === === === === === === === === === === === === === === === 
    // ThisApp.controls.defaults.prompt.title to get/update default title
    me.defaults = {
        prompt: {
            title: "",
            submitLabel: "Submit",
            cancelLabel: "Cancel"
        }
    }
    //--- Create and return a new control instance based on config
    me.newControl = function (theConfig, theOptions) {
        if (!(theConfig)) {
            return false;
        }
        if (isObj(theOptions)) {
            $.extend(theConfig, theOptions);
        }

        var tmpNew = new Control(theConfig);

        return tmpNew
    }

    //--- Get field elements from a control element or control name
    me.getControlFields = getControlFields
    function getControlFields(theControlEl, theFieldName) {
        var tmpControlEl = theControlEl;
        if (!tmpControlEl) {
            throw ("Did not provide a control name or element")
        }
        if (typeof (tmpControlEl) == 'string') {
            //controls: '', control: '', 
            tmpControlEl = ThisApp.getByAttr$({ controls: '', control: '', name: tmpControlEl });
        }
        var tmpFields = ThisApp.getByAttr$({ controls: '', field: '', name: (theFieldName || '') }, theControlEl);
        return tmpFields;
    }

    //--- Get non-field item elements with a name from a control element or control name
    me.getControlItems = getControlItems
    function getControlItems(theControlEl) {
        var tmpControlEl = theControlEl;
        if (!tmpControlEl) {
            throw ("Did not provide a control name or element")
        }
        if (typeof (tmpControlEl) == 'string') {
            //controls: '', control: '', 
            tmpControlEl = ThisApp.getByAttr$({ controls: '', control: '', name: tmpControlEl });
        }
        return ThisApp.getByAttr$({ controls: '', item: '', name: '' }, theControlEl);
    }



    me.getWebControlEl$ = getWebControlEl$;
    function getWebControlEl$(theControlName) {
        return ThisApp.getByAttr$({ controls: '', control: '', name: theControlName })
    }

    //--- True if element is hidden anywhere util a tab or control element found
    function isControlElAvailable(theEl) {
        var tmpMax = 20;
        var tmpSelector = '[controls]';
        var tmpAtEl = theEl.parent();

        for (var iPos = 0; iPos < tmpMax; iPos++) {
            tmpAtEl = tmpAtEl.closest(tmpSelector);
            if (!(tmpAtEl && tmpAtEl.length)) {
                break;
            }
            var tmpCheck = isStr(tmpAtEl.attr("control"));
            if (tmpCheck) {
                break;
            }
            tmpCheck = isStr(tmpAtEl.attr("tab"));
            if (tmpCheck) {
                break;
            }
            var tmpIsHidden = tmpAtEl.css('display') == 'none';
            if (tmpIsHidden) {
                return false;
            }
            tmpAtEl = tmpAtEl.parent();
        }
        return true;
    }

    //--- Returns the tab panes if found, through until control found
    me.getTabPanes = getTabPanes;
    function getTabPanes(theEl) {

        var tmpMax = 20;
        var tmpSelector = '[controls]';
        var tmpAtEl = theEl.parent();
        var tmpRet = [];
        for (var iPos = 0; iPos < tmpMax; iPos++) {
            tmpAtEl = tmpAtEl.closest(tmpSelector);
            if (!(tmpAtEl && tmpAtEl.length)) {
                break;
            }
            var tmpCheck = isStr(tmpAtEl.attr("control"));
            if (tmpCheck) {
                break;
            }
            tmpCheck = isStr(tmpAtEl.attr("tab"));
            if (tmpCheck) {
                var tmpTabInfo = {
                    group: tmpAtEl.attr('group'),
                    item: tmpAtEl.attr('item'),
                }
                if (tmpTabInfo.group && tmpTabInfo.item) {
                    tmpRet.push(tmpTabInfo);
                }

            }
            tmpAtEl = tmpAtEl.parent();
        }

        return tmpRet;
    }

    //--- if theVisibleFlag it will return false if the field is hidden in any way (i.e. in tab on control).
    me.getDisplayFor = function (theControlNameOrEl, theName, theType, theVisibleFlag) {
        var tmpType = theType || 'field';
        var tmpAttr = {
            controls: '',
            name: theName
        }
        tmpAttr[tmpType] = '';

        var tmpControlEl = theControlNameOrEl;
        if (isStr(tmpControlEl)) {
            tmpControlEl = getWebControlEl$(theControlNameOrEl);
        }

        var tmpEl = ThisApp.getByAttr$(tmpAttr, tmpControlEl);

        if (tmpEl && tmpType == 'field') {
            var tmpWrap = tmpEl.closest('[fieldwrap]')
            if (tmpWrap && tmpWrap.length == 1) {
                tmpEl = tmpWrap;
            }
        }
        if ((!theVisibleFlag)) {
            return tmpEl.css('display') != 'none';
        }

        //--- Is this an avalable field, if in hidden tab on this control, is active
        if (theVisibleFlag == 2) {
            //--- Check to see if available as a field to enter
            var tmpIsVis = (tmpEl.css('display') != 'none');
            if (!tmpIsVis) {
                return false;
            }
            tmpIsVis = isControlElAvailable(tmpEl)
            if (!tmpIsVis) {
                return false;
            }
            return true;

        } else {
            return tmpEl.is(":visible")
        }
    }
    me.getItemDisplay = function (theControlNameOrEl, theName) {
        return me.getDisplayFor(theControlNameOrEl, theName, 'item')
    }
    me.getFieldDisplay = function (theControlNameOrEl, theName) {
        return me.getDisplayFor(theControlNameOrEl, theName, 'field', 2);
    }
    //--- Can you currently see the field, not based on hidden or not, may be in a tab
    me.getFieldVisibility = function (theControlNameOrEl, theName) {
        return me.getDisplayFor(theControlNameOrEl, theName, 'field', 1);
    }

    //--- Get Control element(s) by name (some fields are mutiple like checkboxes)
    me.getElByName$ = function (theControlNameOrEl, theName, theType) {
        var tmpType = theType || 'field';
        var tmpAttr = {
            controls: '',
            name: theName
        }
        tmpAttr[tmpType] = '';

        var tmpControlEl = isStr(theControlNameOrEl) ? getWebControlEl$(theControlNameOrEl) : theControlNameOrEl;
        return ThisApp.getByAttr$(tmpAttr, tmpControlEl);
    }

    me.setDisplayFor = function (theControlNameOrEl, theName, theIsVis, theType, theAnimOptions) {
        var tmpType = theType || 'field';
        var tmpEl = me.getElByName$(theControlNameOrEl, theName, theType)
        if (tmpEl && tmpType == 'field') {
            var tmpWrap = tmpEl.closest('[fieldwrap]')
            if (tmpWrap && tmpWrap.length == 1) {
                tmpEl = tmpWrap;
            }
        }

        if (theAnimOptions) {
            if (theIsVis) {
                tmpEl.show.apply(tmpEl, theAnimOptions);
            } else {
                tmpEl.hide.apply(tmpEl, theAnimOptions);
            }
        } else {
            if (theIsVis) {
                tmpEl.show();
            } else {
                tmpEl.hide();
            }
        }

    }
    me.setItemDisplay = function (theControlNameOrEl, theName, theIsVis, theAnimOptions) {
        return me.setDisplayFor(theControlNameOrEl, theName, theIsVis, 'item', theAnimOptions)
    }
    me.setFieldDisplay = function (theControlNameOrEl, theName, theIsVis, theAnimOptions) {
        var tmpRet = me.setDisplayFor(theControlNameOrEl, theName, theIsVis, 'field', theAnimOptions)
        return tmpRet;
    }

    me.openFieldTab = function (theControlNameOrEl, theName, theType) {
        var tmpType = theType || 'field';
        var tmpFieldEl = me.getElByName$(theControlNameOrEl, theName, tmpType)
        var tmpTabPanes = getTabPanes(tmpFieldEl);
        if (!(tmpTabPanes && tmpTabPanes.length)) {
            return;
        }
        for (var iPane = 0; iPane < tmpTabPanes.length; iPane++) {
            var tmpPane = tmpTabPanes[iPane];
            ThisApp.gotoTab(tmpPane);
        }
    }


    me.openItemTab = function (theControlNameOrEl, theName) {
        return me.openFieldTab(theControlNameOrEl, theName, 'item');
    }


    me.gotoItem = function (theControlNameOrEl, theName) {
        me.openItemTab(theControlNameOrEl, theName)
    }

    me.gotoField = function (theControlNameOrEl, theName) {
        var tmpIsAvail = me.getFieldDisplay(theControlNameOrEl, theName);
        var tmpIsVis = me.getFieldVisibility(theControlNameOrEl, theName);
        if (!tmpIsAvail) {
            return false;
        }
        if (!(tmpIsVis)) {
            me.openFieldTab(theControlNameOrEl, theName)
        }
        var tmpEls = me.getElByName$(theControlNameOrEl, theName, 'field');

        if (tmpEls.length > 0) {
            var tmpEl = $(tmpEls[0]);
            if (tmpEl.attr('type') == 'hidden') {
                //--- Dropdown control
                var tmpControl = tmpEl.closest('[ctlcomp]');
                if (tmpControl && tmpControl.dropdown) {
                    tmpControl.dropdown('show');
                }
            } else {
                ThisApp.delay(50).then(function () {
                    tmpEl.focus();
                })
            }


        }


    }

    me._getWebControlDetails = function (theControlNameOrEl) {
        var tmpFieldsIndex = {};
        var tmpItemsIndex = {};

        var tmpControl = theControlNameOrEl;
        if (typeof (tmpControl) == 'string') {
            tmpControl = getWebControlEl$(theControlNameOrEl);
        }

        if (tmpControl && tmpControl.length == 1) {
            var tmpItems = getControlItems(tmpControl);
            if (tmpItems && tmpItems.length > 0) {
                for (var index = 0; index < tmpItems.length; index++) {
                    var tmpItem = $(tmpItems[index]);
                    var tmpName = tmpItem.attr('name') || '';
                    if (tmpName) {
                        tmpItemsIndex[tmpName] = tmpItem;
                    }
                }
            }

            var tmpFields = getControlFields(tmpControl);
            if (tmpFields && tmpFields.length > 0) {
                for (var index = 0; index < tmpFields.length; index++) {
                    var tmpField = $(tmpFields[index]);
                    var tmpFT = tmpField.attr('type');
                    var tmpFN = tmpField.attr("name");

                    if (tmpFN) {
                        if (tmpFT == 'radio' || tmpFT == 'checkbox') {
                            //--- Add array of these fields to the fields index
                            if (!(tmpFieldsIndex[tmpFN])) {
                                tmpFieldsIndex[tmpFN] = [];
                            }
                            tmpFieldsIndex[tmpFN].push(tmpField);
                        } else {
                            tmpFieldsIndex[tmpFN] = tmpField;
                        }
                    }
                }
            }
        }
        var tmpReturnDetails = {
            control: tmpControl,
            items: tmpItemsIndex,
            fields: tmpFieldsIndex
        }

        return tmpReturnDetails
    }



    //--- Internal use to return control data of field values
    me._getControlData = function (theControlEl, theOptionalFieldName) {

        var tmpData = {};
        var tmpControl = theControlEl;
        var tmpIsMultiValue = false;

        if (tmpControl && tmpControl.length == 1) {
            var tmpFields = getControlFields(tmpControl, theOptionalFieldName);
            if (tmpFields && tmpFields.length > 0) {
                for (var index = 0; index < tmpFields.length; index++) {
                    var tmpField = $(tmpFields[index]);
                    var tmpFT = tmpField.attr('type');
                    var tmpFN = tmpField.attr("name");
                    if (tmpFN) {
                        if (tmpFT == 'radio' || tmpFT == 'checkbox') {
                            if (tmpFT == 'checkbox') {
                                tmpIsMultiValue = true;
                            }
                            var tmpIsChecked = tmpField[0].checked;
                            var tmpVal = '';
                            if (tmpIsChecked) {
                                tmpVal = tmpField.attr('data-value') || '';
                            }
                            tmpData[tmpFN] = tmpData[tmpFN] || '';
                            var tmpExistingVal = tmpData[tmpFN];
                            if (Array.isArray(tmpExistingVal)) {
                                tmpExistingVal = tmpExistingVal.join(",");
                            }
                            if (tmpVal) {
                                if (tmpExistingVal) {
                                    tmpExistingVal += ","
                                }
                                tmpExistingVal += tmpVal;
                            }
                            if (tmpIsMultiValue) {
                                if ((typeof (tmpExistingVal) == 'string')) {
                                    if (tmpExistingVal) {
                                        tmpExistingVal = tmpExistingVal.split(',');
                                    } else {
                                        tmpExistingVal = [];
                                    }

                                }
                            }
                            
                            tmpData[tmpFN] = tmpExistingVal;
                        } else {
                            var tmpDataValue = tmpField.data('datavalue');
                            if( tmpDataValue == undefined){
                                var tmpFldValue = tmpField.val();

                                //ToDo: Review the need for this after default fix
                                if( tmpFldValue === undefined || tmpFldValue === 'undefined'){
                                    tmpFldValue = '';  
                                }

                                //--- Use datatype?
                                if( tmpFT == 'number' ){
                                    try {
                                        tmpFldValue = parseFloat(tmpFldValue);  
                                    } catch (theError) {
                                        console.error("Field: " + tmpFN + " had invalid numeric value, returning 0 instead of " + tmpFldValue);
                                        tmpFldValue = 0;
                                    }
                                } 
                                tmpData[tmpFN] = tmpFldValue;
                            } else {
                                tmpData[tmpFN] = tmpDataValue; 
                                
                            }
                        }
                    }
                }
            }
        }
        if (theOptionalFieldName) {
            return tmpData[theOptionalFieldName] || '';
        } else {
            return tmpData
        }

    }


    //==== Catalog, Actions and Index Classes
    function Index() {
        this.index = {};
    }
    var meIndex = Index.prototype
    meIndex.get = function (theName) {
        return this.index[theName]
    }
    meIndex.add = function (theName, theControl) {
        this.index[theName] = theControl;
        return true;
    }
    //--- Store controls used by this plugin
    me.webControls = new Index();

    //--- Store actions used by controls in this plugin
    me.actions = new Index();
    me.validations = new Index();

    //=== === === === === === === === === === === === === === === === 
    //--- Control Functions
    //=== === === === === === === === === === === === === === === === 
    me.Control = Control;
    function Control(theConfig) {
        this.controlConfig = false;

        this.actions = {}; //--- A place for actions

        this.res = {
            "panels": {},
            "controls": {},
            "html": {}
        };


        var tmpStuffToPullIn = [
            , 'getResourceURIsForType'
            , 'addResourceFromContent',
            , 'loadResources',
            , 'addResource'
            , 'getPanel'
            , 'getControl'
            , 'getResourceForType'
        ];

        for (var iStuff = 0; iStuff < tmpStuffToPullIn.length; iStuff++) {
            var tmpFuncName = tmpStuffToPullIn[iStuff];
            var tmpFunc = ThisApp[tmpFuncName];
            if (ThisApp.util.isFunc(tmpFunc)) {
                this[tmpFuncName] = tmpFunc.bind(this);
            }
        }

        ///--- Move parent from config into base
        if (theConfig.parent) {
            this.parent = theConfig.parent
            delete theConfig.parent;
        }
        this.loadConfig(theConfig);
    }

    var meControl = Control.prototype;
    meControl.create = function (theControlName, theOptions) {
        var tmpOptions = theOptions || {};
        tmpOptions.parent = tmpOptions.parent || this.parent; //|| this.controlConfig.parent
        tmpOptions.proto = tmpOptions.proto || this.controlConfig.proto || false;
        var tmpObj = new ControlInstance(this, theControlName, tmpOptions);
        if (tmpOptions.proto) {
            tmpObj.extend(tmpOptions.proto);
        }
        return tmpObj
    }



    /*  
    Prompt options: 
       doc: the object that contains the data

       title: the title to use by default
       titleNew: the title when isNew

       submitLabel: the label to put on the submit button, 
       submitLabelNew: the submit label when isNew

       cancelLabel: the label to put on the cancel button, 
       cancelLabelNew: the cancel label when isNew

    Note: Uses controls default if not provuded
        ThisApp.controls.defaults
            .title .titleNew / etc

    */
    meControl.prompt = function (theOptions) {
        var dfd = jQuery.Deferred();

        var tmpOptions = theOptions || {};
        var tmpConfig = this.controlConfig;
        var tmpDefaults = ThisApp.controls.defaults.prompt || {};

        var tmpPromptOptions = {};
        if (ThisApp.util.isObj(tmpOptions.promptOptions)) {
            $.extend(tmpPromptOptions, tmpOptions.promptOptions);
        }

        //--- Does the control have options.prompt {...} setup?
        var tmpControlPromptOptions = {};
        if (tmpConfig.options && ThisApp.util.isObj(tmpConfig.options.prompt)) {
            tmpControlPromptOptions = tmpConfig.options.prompt;
        }

        function tmpGetFrom(theParam) {
            return tmpOptions[theParam] || tmpControlPromptOptions[theParam] || tmpDefaults[theParam] || '';
        }
        var tmpTitle = tmpGetFrom('title');
        var tmpSubmitLabel = tmpGetFrom('submitLabel');
        var tmpCancelLabel = tmpGetFrom('cancelLabel');
        var tmpIsNew = tmpOptions.isNew === true;
        //--- Use new values if present
        if (tmpIsNew) {
            var tmpTitleNew = tmpGetFrom('titleNew');
            var tmpSubmitLabelNew = tmpGetFrom('submitLabelNew');
            var tmpCancelLabelNew = tmpGetFrom('cancelLabelNew');

            tmpTitle = tmpTitleNew || tmpTitle;
            tmpSubmitLabel = tmpSubmitLabelNew || tmpSubmitLabel;
            tmpCancelLabel = tmpCancelLabelNew || tmpCancelLabel;
        }

        if( tmpOptions.submitLabel === false){
            tmpSubmitLabel = false;
        }
        if( tmpOptions.cancelLabel === false){
            tmpCancelLabel = false;
        }

        var tmpDoc = tmpOptions.doc || {};

        var tmpExtraOptions = tmpOptions.promptOptions || false;

        var tmpPromptOptions = {
            title: tmpTitle,
            control: this,
            doc: tmpDoc,
            buttons: {
                yes: tmpSubmitLabel,
                no: tmpCancelLabel
            }
        }

        var tmpCustomSize = tmpExtraOptions.size || '';
        if (tmpOptions) {
            $.extend(tmpPromptOptions, tmpExtraOptions); // not a typo
        }

        //-- Default to large if not specified when prompting forms
        if (!(tmpCustomSize)) {
            tmpPromptOptions.size = 'large';
        }


        ThisApp.prompter.prompt(tmpPromptOptions).then(function (theReply, theControl) {
            var tmpData = {};
            if (theReply && theControl && isFunc(theControl.getData)) {
                tmpData = theControl.getData();
            }
            if (theControl && theControl.destroy) {
                theControl.destroy();
                delete theControl;
            }
            dfd.resolve(theReply, tmpData)
        })



        return dfd.promise();
    }



    meControl.loadConfig = function (theConfig) {
        if (!theConfig) {
            throw "Config not provided"
        }

        this.controlConfig = theConfig;
        this.setupConfig()
    };
    meControl.setupConfig = function () {
        if (!(this.controlConfig)) {
            return;
        }
        if (!(this.controlConfig.content)) {
            return;
        }
        this.controlConfig.index = me._loadContentIndex(this.controlConfig.content)
    }


    meControl.getControlName = function () {
        if (this.controlConfig && this.controlConfig.controlname) {
            return this.controlConfig.controlname;
        }
        return '';
    }

    meControl.getWebControlEl$ = function () {
        return getWebControlEl$(this.getControlName())
    }

    meControl.getHTML = function (theControlName, theInstance) {

        var tmpHTML = getControlHTML(theControlName, (theInstance.controlConfig || this.controlConfig), theInstance);

        //--- If parent control is avail and has a ns implemented, use it
        //    ... to convert _page_: and pagespot, etc as usual
        if (theInstance && theInstance.parentControl && theInstance.parentControl.ns) {
            var tmpNS = theInstance.parentControl.ns();
            tmpNS = tmpNS.replace(":", "");
            tmpHTML = ThisApp.getUpdatedMarkupForNS(tmpHTML, tmpNS)
        }


        return tmpHTML;
    }




    //=== === === === === === === === === === === === === === === === 
    //--- Control Instance Functions
    //=== === === === === === === === === === === === === === === === 
    me.ControlInstance = ControlInstance;
    function ControlInstance(theControlSpec, theControlName, theOptions) {
        var tmpOptions = theOptions || {};
        this.initPubSub();
        this.initUsePubSub();

        this.controlSpec = theControlSpec;
        var tmpConfig = this.controlSpec.controlConfig;
        tmpConfig.options = tmpConfig.options || {};
        var tmpMyConfig = {
            options: {},
            content: []
        };
        if (tmpConfig) {
            tmpMyConfig.options = ThisApp.clone(tmpConfig.options);
            tmpMyConfig.content = ThisApp.clone(tmpConfig.content);
        }

        if (tmpMyConfig.options.hasOwnProperty('mobileAt')) {
            this.mobileAt = tmpMyConfig.options.mobileAt;
        }

        this.parent = theOptions.parent || theControlSpec.parent;
        //--- ToDo: Review need for two of these
        this.parentControl = this.parent;

        this.loadConfig(tmpMyConfig);

        this.controlName = theControlName;
        this.actions = new Index();

        this.liveIndex = {};
        this.parts = {};

        this.context = {
            app: ThisApp.context,
            this: {
                controller: this,
                data: {}
            }
        };

        if (tmpMyConfig && tmpMyConfig.options && isObj(tmpMyConfig.options.contextData)) {
            this.context.this.data = tmpMyConfig.options.contextData;
        }
        //--- Pull in references for easy access to context items
        if (this.parent && this.parent.context) {
            if (isObj(this.parent.context.page)) {
                this.context.page = this.parent.context.page;
                if (this.context.page.controller) {
                    if (this.context.page.controller.subscribe) {
                        var tmpOnResize = (function () {
                            var tmpEl = this.parentEl;
                            if (isFunc(this._onParentResize)) {
                                this._onParentResize.call(this)
                            }

                            //--ToDo: Check mobile class add / remove process
                            var tmpDoMobileCheck = false;
                            if (tmpDoMobileCheck && tmpEl) {
                                var tmpWidth = tmpEl.width();
                                if (this.mobileAt !== false) {
                                    if (tmpWidth < (this.mobileAt || 450)) {
                                        tmpEl.addClass('mobile');

                                    } else {
                                        tmpEl.removeClass('mobile');
                                    }
                                }
                            }

                        }).bind(this);
                        //no longer publish this --> this.context.page.controller.subscribe('resizeLayout', tmpOnResize);
                        //--- On page resize would work, but what about controls not on a page?
                        //this.context.page.controller.subscribe('resized', tmpOnResize);
                    } else {
                        console.warn('this.context.page.controller no subscribe');
                    }
                }
            }
            if (!(ThisApp.util.isPage(this.parent))) {
                this.context.control = { context: this.parent.context };
            }
        }

        this.res = {
            "panels": {},
            "controls": {},
            "html": {}
        };



        //--- Grab some common functionality from app ...
        var tmpStuffToPullIn = [
            , 'getResourceURIsForType'
            , 'addResourceFromContent',
            , 'loadResources',
            , 'addResource'
            , 'getPanel'
            , 'getControl'
            , 'getResourceForType'
        ];

        for (var iStuff = 0; iStuff < tmpStuffToPullIn.length; iStuff++) {
            var tmpFuncName = tmpStuffToPullIn[iStuff];
            var tmpFunc = ThisApp[tmpFuncName];
            if (ThisApp.util.isFunc(tmpFunc)) {
                this[tmpFuncName] = tmpFunc.bind(this);
            }
        }

    }

    var meInstance = ControlInstance.prototype;

    $.extend(meInstance, ExtendMod.PubSub)
    $.extend(meInstance, ExtendMod.UsePubSub);
    


    meInstance.extend = function (theNewFunctionality) {
        $.extend(this, theNewFunctionality)
    }
    meInstance.getAppName = function(){
        //--- If running the app, use app info
        if( ActionAppCore.appInfo && ActionAppCore.appInfo.name ){
            return ActionAppCore.appInfo.name;
        }
        //--- See if we are in the designer, if so - what app?
        var tmpDesigner = this.getDesignerEditor();
        if( tmpDesigner ){
            window.tmpDesigner = tmpDesigner;
            if( tmpDesigner.details){
                var tmpAppName = tmpDesigner.details.appname || tmpDesigner.details.catname;
                if( tmpAppName ){
                    return tmpDesigner.details.appname;
                }
            }
        }
        return '';
    }

    meInstance.getDesignerEditor = function () {
        try {
            var tmpCtl = this.getParentControl();
            var tmpFoundControl = false;
            for (var i = 0; i < 20; i++) {
                if (tmpCtl.isDesignerEditor) {
                    tmpFoundControl = tmpCtl;
                    break
                }
                if (tmpCtl.getParentControl) {
                    tmpCtl = tmpCtl.getParentControl();
                } else {
                    break;
                }
            }
            return tmpFoundControl;
        } catch (error) {
            console.error('getDesignerEditor error:', error)
            return false;

        }
    },


    meInstance.refreshIndex = function () {
        this.setupConfig();
    }

    meInstance.getContentRequired = function () {
        var tmpRet = {}
        this.refreshIndex();
        var tmpReq = this.controlConfig.index.required;
        if (tmpReq) {
            return tmpReq;
        }
        return tmpRet;
    }

    meInstance.getParentControl = function () {
        if( this.context.control ){
            return this.context.control.context.this.controller;
        }
        return false;
    }

    //ToDo: 
    //--- Can pass the url, method, etc in options
    //--- Can call with {ajax: true} to use the form action, method, etc to post via ajax
    //---   Note: When calling ajax, it returns the promise
    meInstance.submitForm = function (theOptions) {
        var tmpForm = this.getEl().find('form');
        if (tmpForm.length == 0) {
            console.error('sumitForm - no form found')
            return false;
        }
        tmpForm.submit();
        return true;
    }


    meInstance.assureRequired = function () {
        var dfd = jQuery.Deferred();
        this.options = this.options || {};
        var tmpPromRequired = true;
        var tmpPromLayoutReq = true;
        var tmpLayoutReq = this.getContentRequired();
        var tmpInitReq = ThisApp.loadResources.bind(this);
        
        if( this.controlConfig && this.controlConfig.options && this.controlConfig.options.required){
            var tmpSpecs = this.controlConfig.options.required;
            tmpPromRequired = tmpInitReq(tmpSpecs)
        }

        //--- Do not cache controls that have ? as they are dynamic calls
        //--- ToDo: Move this to the ignore process?
        if( tmpLayoutReq && tmpLayoutReq.panel && tmpLayoutReq.panel.list ){
            for( var iPos in tmpLayoutReq.panel.list ){
                var tmpControlName = tmpLayoutReq.panel.list[iPos];
                if( tmpControlName && tmpControlName.includes && tmpControlName.includes('?') ){
                    if( ThisApp.resCache.panels && ThisApp.resCache.panels[tmpControlName]){
                        delete ThisApp.resCache.panels[tmpControlName];
                    }                
                }
            }
        }
        if( tmpLayoutReq && tmpLayoutReq.control && tmpLayoutReq.control.list ){
            for( var iPos in tmpLayoutReq.control.list ){
                var tmpControlName = tmpLayoutReq.control.list[iPos];
                if( tmpControlName && tmpControlName.includes && tmpControlName.includes('?') ){
                    if( ThisApp.resCache.controls && ThisApp.resCache.controls[tmpControlName]){
                        delete ThisApp.resCache.controls[tmpControlName];
                    }                
                }
            }
        }
        if (tmpLayoutReq) {
            tmpPromLayoutReq = tmpInitReq(tmpLayoutReq, { nsParent: this.parentControl })
        }

        $.when(tmpPromRequired, tmpPromLayoutReq).then(function (theReply) {
            dfd.resolve(true);
        })

        return dfd.promise();
    }



    meInstance.loadConfig = function (theConfig) {
        if (!theConfig) {
            throw "Config not provided"
        }

        this.controlConfig = theConfig;
        this.setupConfig()
    };
    meInstance.setupConfig = function () {
        if (!(this.controlConfig)) {
            return;
        }
        if (!(this.controlConfig.content)) {
            return;
        }
        
        this.controlConfig.index = me._loadContentIndex(this.controlConfig.content)
    }

    meInstance.prompt = meControl.prompt;


    //--- Return cached control element
    meInstance.getEl = function () {
        return this.parentEl
    }
    meInstance.showAll = function(){
        for( var iName in this.getIndex().all ){
            this.setEntryDisplay(iName, true);
        }
    }
    meInstance.setItemDisabled = function (theEntryName, theIsDisabled) {
        var tmpEl = this.getItemEl(theEntryName) || this.getFieldEl(theEntryName);
        var tmpHasClass = tmpEl.hasClass('disabled');
        if (!tmpHasClass && theIsDisabled) {
            tmpEl.addClass('disabled');
        } else if (tmpHasClass && !theIsDisabled) {
            tmpEl.removeClass('disabled');
        }
    }
    meInstance.setFieldDisabled = meInstance.setItemDisabled;

    meInstance.refreshUI = function (theOptions) {
        var tmpOptions = theOptions || {};
        var tmpThis = this;
        var tmpConfig = this.controlConfig;

        tmpThis.clearEvents();
        tmpConfig.options = tmpConfig.options || {};
        if (typeof (tmpOptions.readonly) === 'boolean') {
            tmpConfig.options.readonly = tmpOptions.readonly;
        }
        if (tmpOptions.doc) {
            tmpConfig.options.doc = tmpOptions.doc;
        }
        return this.loadToElement(this.parentEl, tmpOptions);
    }

    meInstance.refreshFromURI = function (theOptionalURI, theOptions) {
        var dfd = jQuery.Deferred();
        var tmpOptions = theOptions || {};

        var tmpThisEl = this.getEl();
        var tmpURI = theOptionalURI || this.controlSpec.baseURI || '';
        if (!(tmpURI)) {
            console.warn("Could not refresh - no URL provided or known");
            dfd.resolve(false)
            return;
        }

        var tmpThis = this;
        ThisApp.apiCall({ cache: false, url: tmpURI }).then(function (theReply) {
            if (theReply && Array.isArray(theReply.content)) {
                //--- Update internal content of this instnce only
                tmpThis.loadConfig(theReply);
                // this.controlConfig.options = (theReply.options || {});
                // tmpConfig.content = theReply.content;
                var tmpRefreshOptions = $.extend({}, tmpOptions);
                if (theReply && theReply.options && typeof (theReply.options.doc) == 'object') {
                    tmpRefreshOptions.doc = theReply.options.doc;
                }
                tmpThis.refreshUI(tmpRefreshOptions);
                dfd.resolve(true)
            } else {
                dfd.resolve(false)
            }

        })


        return dfd.promise();
    }


    //--- Spot for spot related stuff





    //--- Calls parent loadSpot with this instance DOM and refreshes layouts
    meInstance.loadSpot = function (theName, theContent, theRenderer) {
        ThisApp.loadSpot(theName, theContent, theRenderer, this.getParent$(), 'myspot');
        try {
            this.refreshLayouts();
        } catch (error) {

        }
    }
    //--- Calls parent loadSpot with this instance DOM and refreshes layouts
    meInstance.addToSpot = addToSpot = function (theName, theContent, theRenderer, thePrepend) {
        ThisApp.addToSpot(theName, theContent, theRenderer, thePrepend, this.getParent$(), 'myspot');
        try {
            this.refreshLayouts();
        } catch (error) {

        }

    }

    //--- Deprecated, use ThisPage.loadSpot and addToSpot ***
    meInstance.loadPageSpot = meInstance.loadSpot;
    meInstance.addToPageSpot = meInstance.addSpot;

    meInstance.toTab = function (theGroupName, theItemName) {
        //--- ToDo: Implement?   gotoItem and gotoField do this already
    }

    //--- Returns jQuery element for the spot name on this page
    meInstance.getSpot$ = function (theName) {
        return ThisApp.getSpot$(theName, this.getParent$(), 'myspot');
    }
    meInstance.spot$ = meInstance.getSpot$; //shortcuts
    meInstance.spot = meInstance.getSpot$; //shortcuts
    meInstance.getSpot = meInstance.getSpot$; //shortcuts

    //--- Set display (true/false) for the spot name on this page
    meInstance.spotDisplay = function (theName, theIsVis) {
        tmpEl = this.getSpot$(theName);
        if (theIsVis) {
            tmpEl.show();
        } else {
            tmpEl.hide();
        }
    }

    meInstance.getByAttr$ = function (theItems, theExcludeBlanks) {
        return ThisApp.getByAttr$(theItems, this.getParent$(), theExcludeBlanks);
    }
    meInstance.getParent$ = function () {
        return this.getEl();
    }
    meInstance.refreshLayouts = function () {
        if (this.layout) {
            this.layout.resizeAll();
        }
        //ToDo: Only do this if we have a layout?
        ThisApp.refreshLayouts();
    }

    meInstance.getParentPage = function () {
        if( this.context && this.context.page && this.context.page.controller){
            return this.context.page.controller;    
        }
        return false;
    }

    meInstance.getIndex = function () {
        return this.controlConfig.index;
    }

    meInstance.getItem = function (theItemName) {
        var tmpEl = this.getElByName$(theItemName, 'item')
        if (!(tmpEl)) { return false }
        var tmpSpecs = this.getItemSpecs(theItemName);

        return {
            el: tmpEl,
            specs: tmpSpecs
        }
    }

    meInstance.getItemEl = function (theItemName) {
        var tmpEl = this.getElByName$(theItemName, 'item')
        if (!(tmpEl)) { return false }
        return tmpEl;
    }
    meInstance.getFieldEl = function (theFieldName) {
        var tmpEl = this.getElByName$(theFieldName, 'field')
        if (!(tmpEl)) { return false }
        return tmpEl;
    }

    //--- end spots

    meInstance.getFieldSpecs = function (theFieldName) {
        try {
            var tmpConfig = this.getConfig();
            return tmpConfig.index.all[theFieldName];
        } catch (ex) {
            console.error("Error getting field, not found " + theFieldName);
            return {}
        }
    }

    meInstance.setFieldList = function (theFieldName, theList, theOptions) {
        var tmpOptions = theOptions || {};

        var tmpFieldEl = this.getElByName$(theFieldName, 'field')
        if (!(tmpFieldEl)) { return ''; }

        // var tmpSetOnly = ( tmpOptions.setOnly === true );
        var tmpFieldSpecs = this.getFieldSpecs(theFieldName);
        if (tmpFieldSpecs) {
            var tmpCtl = tmpFieldSpecs.ctl || 'field';
            var tmpControl = me.webControls.get(tmpCtl);
            if (!(tmpControl.setFieldList)) {
                //  tmpRet = me._setControlList(this.getEl(), theFieldName, theList);
            } else {
                tmpControl.setFieldList(tmpFieldEl, theList, tmpOptions);
            }
        } else {
            //  tmpRet = me._getControlData(this.getEl(), theFieldName);
        }

    }

    meInstance.setFieldValue = function (theFieldName, theValue, theOptions) {
        var tmpOptions = theOptions || {};
        var tmpSetOnly = (tmpOptions.setOnly === true);

        var tmpFieldEl = this.getElByName$(theFieldName, 'field')
        if (!(tmpFieldEl)) { return ''; }

        var tmpFieldSpecs = this.getFieldSpecs(theFieldName);
        if (tmpFieldSpecs) {
            var tmpCtl = tmpFieldSpecs.ctl || 'field';

            if (tmpCtl == 'textarea') {
                if (ThisApp.util.isArray(theValue)) {
                    theValue = theValue.join('\n');
                }
            }


            var tmpControl = me.webControls.get(tmpCtl);
            if (!(tmpControl.setFieldValue)) {
                tmpFieldEl.val(theValue);
                if( tmpCtl == 'hidden'){
                    if( Array.isArray(theValue) ){
                        tmpFieldEl.data('datavalue',theValue)
                    } else if( typeof(theValue) == 'number' ){
                        tmpFieldEl.data('datavalue',theValue)
                    } else {
                        tmpFieldEl.data('datavalue',undefined);
                    }    
                }
                
                if (!tmpSetOnly) {
                    tmpFieldEl.trigger('change');
                }
                return true;
            } else {
                var tmpThisOptions = this.getConfig().options || {};
                var tmpIsReadOnly = tmpFieldSpecs.readonly || tmpThisOptions.readonly || false;
                tmpControl.setFieldValue.bind(this);
                if (tmpControl.setFieldValue(tmpFieldEl, theValue, tmpFieldSpecs, tmpIsReadOnly)) {
                    if (!tmpSetOnly) {
                        tmpFieldEl.trigger('change');
                    }
                };
            }
        } else {
            tmpFieldEl.val(theValue);
            if (!tmpSetOnly) {
                tmpFieldEl.trigger('change');
            }
        }
        return this;
    }

    meInstance.setFieldNote = function (theFieldName, theValue, theOptions) {
        var tmpFieldEl = this.getElByName$(theFieldName, 'field')
        if (!(tmpFieldEl)) { return ''; }

        var tmpFieldSpecs = this.getFieldSpecs(theFieldName);
        if (tmpFieldSpecs) {
            var tmpCtl = tmpFieldSpecs.ctl || 'field';
            var tmpControl = me.webControls.get(tmpCtl);
            if (!(tmpControl.setFieldNote)) {
                return true;
            } else {
                if (tmpControl.setFieldNote(tmpFieldEl, theValue, theOptions, tmpFieldSpecs)) {
                    return true;
                };
            }
        } else {
            return true;
        }
        return this;
    }

    meInstance.setFieldMessage = function (theFieldName, theValue, theOptions) {
        var tmpFieldEl = this.getElByName$(theFieldName, 'field')
        if (!(tmpFieldEl)) { return ''; }

        var tmpFieldSpecs = this.getFieldSpecs(theFieldName);
        if (tmpFieldSpecs) {
            var tmpCtl = tmpFieldSpecs.ctl || 'field';
            var tmpControl = me.webControls.get(tmpCtl);
            if (!(tmpControl.setFieldNote)) {
                return true;
            } else {
                if (tmpControl.setFieldMessage(tmpFieldEl, theValue, theOptions, tmpFieldSpecs)) {
                    return true;
                };
            }
        } else {
            return true;
        }
        return this;
    }

    meInstance.getDefaultValue = function (theFieldName, theOptionalSpecs) {
        var tmpI = this.getIndex();
        var tmpFieldSpecs = this.getFieldSpecs(theFieldName);
        if( tmpFieldSpecs && tmpFieldSpecs.hasOwnProperty('default') ){
            return tmpFieldSpecs.default;
        }
        var tmpDT = tmpFieldSpecs.datatype;
        if( tmpFieldSpecs.ctl == 'checkbox'){
            tmpDT = 'boolean';
        }
        if( tmpFieldSpecs.ctl == 'number'){
            tmpDT = 'object';
        }        
        if( tmpDT ){
            if( 'boolean' == tmpDT){return false;}
            if( 'number' == tmpDT){return 0;}
            if( 'object' == tmpDT){return {};}
        }
        return '';
    }

    meInstance.getFieldValue = function (theFieldName) {
        var tmpRet = '';
        var tmpFieldEls = me.getControlFields(this.getEl());

        if (!(tmpFieldEls)) { return ''; }

        var tmpFieldSpecs = this.getFieldSpecs(theFieldName);
        if( !(tmpFieldSpecs)){
            console.warn( 'getFieldValue found no specs, scope issue?', theFieldName);
            return me._getControlData(this.getEl(), theFieldName);
        }
        if (this.getFieldDisplay(theFieldName) === false) {
            //--- Do not return values of unavailable fields (hidden via programming)
            return this.getDefaultValue(theFieldName, tmpFieldSpecs);
        }

        var tmpCtl = tmpFieldSpecs.ctl || 'field';
        var tmpControl = me.webControls.get(tmpCtl);

        if( typeof(tmpFieldSpecs.value) == 'object' ){
            
            var tmpCompKey = '[computed]';
            var tmpObj = tmpFieldSpecs.value;
            
            if (isObj(tmpObj) && tmpObj.hasOwnProperty(tmpCompKey)) {
                var tmpComputed = tmpObj[tmpCompKey];
                
                if (isStr(tmpComputed)) {
                    tmpComputed = {
                        "context": tmpComputed
                    }
                }

                if (isObj(tmpComputed)) {
                    var tmpCompValue = '';
                    var tmpCompContext = tmpComputed.context || '';
                    if (tmpCompContext) {
                        try {
                            //--- Variables used in the eval statement, do not remove
                            var context = this.context;
                            var thisControl = this;
                            tmpCompValue = eval(tmpCompContext)
                        } catch (ex) {
                            console.warn("Attempt to us computed context value failed ", ex)
                        }
                    } else {
                        console.warn("No context passed for computed value, see documentation for details.")
                    }
                    tmpRet = tmpCompValue;
                }
            }
        } else if (!(tmpControl.getFieldValue)) {
            tmpRet = me._getControlData(this.getEl(), theFieldName);
        } else {
            tmpRet = tmpControl.getFieldValue(this.getEl(), tmpFieldSpecs);
        }
        //--- Account for value and default on hidden fields
        //--- ToDo: What if default is not blank and we want blank value?
        if( typeof(tmpRet) !== 'boolean' && !(tmpRet) && tmpFieldSpecs && tmpFieldSpecs.ctl == 'hidden' && (tmpFieldSpecs.value || tmpFieldSpecs.default)){
            tmpRet = tmpFieldSpecs.value || tmpFieldSpecs.default;                
        }
        return tmpRet;
    }

    meInstance.gotoField = function (theFieldName) {
        return me.gotoField(this.getEl(), theFieldName)
    }
    meInstance.gotoItem = function (theName) {
        return me.gotoItem(this.getEl(), theName)
    }
    meInstance.getHTML = function () {
        return this.controlSpec.getHTML(this.controlName, this);
    }
    meInstance.getConfig = function () {
        return this.controlConfig || {};
    }

    meInstance.runItemAction = function (theName, theActionName, theOptionalParams) {
        var tmpItem = this.getItem(theName);
        var tmpEl = tmpItem.el;
        var tmpSpecs = tmpItem.specs;

        if (tmpSpecs) {
            var tmpCtl = tmpSpecs.ctl || 'field';
            var tmpControl = me.webControls.get(tmpCtl);
            if (tmpControl && tmpControl.actions && tmpControl.actions[theActionName]) {
                var tmpFunc = tmpControl.actions[theActionName];
                if (isFunc(tmpFunc)) {
                    tmpFunc = tmpFunc.bind(this);
                    if (theOptionalParams) {
                        tmpFunc(theOptionalParams);
                    } else {
                        tmpFunc('', tmpEl);
                    }

                }
            }
        } else {
            console.warn("No item found for ", theName)
        }


    }

    meInstance.getItemDisplay = function (theName) {
        return me.getItemDisplay(this.getEl(), theName)
    }
    meInstance.getFieldDisplay = function (theName) {
        return me.getFieldDisplay(this.getEl(), theName)
    }
    meInstance.getFieldVisibility = function (theName) {
        return me.getFieldVisibility(this.getEl(), theName)
    }
    meInstance.getElByName$ = function (theName, theType) {
        return me.getElByName$(this.getEl(), theName, theType)
    }
    meInstance.setItemDisplay = function (theName, theIsVis, theAnimOptions) {
        return me.setItemDisplay(this.getEl(), theName, theIsVis, theAnimOptions)
    }
    meInstance.setFieldDisplay = function (theName, theIsVis, theAnimOptions) {
        var tmpRet = me.setFieldDisplay(this.getEl(), theName, theIsVis, theAnimOptions);
        this.refreshForField(theName);
        return tmpRet;
    }
    
    meInstance.setEntryDisplay = function (theName, theIsVis, theAnimOptions) {
        if( this.hasField(theName)){
            me.setFieldDisplay(this.getEl(), theName, theIsVis, theAnimOptions)
        } else {
            me.setItemDisplay(this.getEl(), theName, theIsVis, theAnimOptions)
        }
        return true;
    }

    meInstance.gotoTab = function (theAttrObj) {
        var tmpDetails = theAttrObj;
        if( typeof(tmpDetails) !== 'object'){
            return false;
        }
        tmpDetails = ThisApp.clone(tmpDetails);
        tmpDetails.parent = this.getEl();
        return ThisApp.gotoTab(tmpDetails);
    }

    meInstance.setState = function (theStateObject) {
        if( !(theStateObject) ){
            return;
        }
        var tmpTabs = theStateObject.tabs;
        if( tmpTabs ){
            for( var iPos in tmpTabs ){
                var tmpEntry = tmpTabs[iPos];
                this.gotoTab(tmpEntry);
            }
        }
        if( this._onSetState ){this._onSetState(theStateObject)};
    }

    meInstance.getState = function (theOptions) {
        var tmpRet = {};
        var tmpActiveTabs = $('[appuse="tablinks"][item][group].active', this.getEl());
        var tmpTabs = [];
        if( tmpActiveTabs && tmpActiveTabs.length > 0 ){
            tmpActiveTabs.each(function(){
                var tmpEl = $(this);
                tmpTabs.push({item:tmpEl.attr('item'),group:tmpEl.attr('group')})
            })
        }
        tmpRet.tabs = tmpTabs;
        if( this._onGetState ){this._onGetState(tmpRet)};
        return tmpRet;
    }


    meInstance.getData = function (theOptions) {
        try {
            var tmpOptions = theOptions || {};
            var tmpNoHidden = (tmpOptions.excludeHidden === true);
            var tmpNoDefaults = (tmpOptions.excludeDefaults === true);
            var tmpData = {};
            var tmpList = this.getConfig().index.fieldsList;
            for (var iPos = 0; iPos < tmpList.length; iPos++) {
                var tmpFN = tmpList[iPos];
                if (!(tmpNoHidden && this.getFieldDisplay(tmpFN) === false)) {
                    var tmpFV = this.getFieldValue(tmpFN);;
                    if( tmpNoDefaults ){
                        var tmpDefault = this.getDefaultValue(tmpFN);
                        if( tmpDefault != tmpFV){tmpData[tmpFN] = tmpFV;}
                    } else {
                        tmpData[tmpFN] = tmpFV;
                    }
                }
            }
        } catch (ex) {
            console.error("Error getting data ", ex)
        }

        return tmpData;
    }
    meInstance.getWebControlDetails = function () {
        var tmpDetails = me._getWebControlDetails(this.getEl());
        tmpDetails.data = this.getData();
        return tmpDetails;
    }


    //ToDo: Add clear / set field UI with {quiet:true} the theOptions
    meInstance.validateField = function (theFN) {
        var tmpFN = theFN;
        var tmpSpecs = this.getFieldSpecs(tmpFN);

        if (tmpSpecs) {
            var tmpOnValidate = tmpSpecs._onValidate || tmpSpecs.onValidate || false;

            if (tmpOnValidate) {
                if (isObj(tmpOnValidate)) {
                    var tmpName = tmpOnValidate.run;
                    var tmpToRun = me.validations.get(tmpName)
                    if (isFunc(tmpToRun)) {
                        //--- Run it
                        return tmpToRun(tmpFN, this.getFieldValue(tmpFN), this, tmpOnValidate)
                    } else {
                        console.warn("Validation not found for " + tmpFN + ": " + tmpName)
                    }
                }
            }
        }
        //--- If no special validation, return true
        return true;
    }

    meInstance.validate = function (theOptions) {
        var tmpOptions = theOptions || {};
        var tmpDetails = this.getWebControlDetails();
        var tmpControl = this.getEl();
        var tmpConfig = this.getConfig();
        tmpControl.find('.error').removeClass('error');

        var tmpIsValid = true;
        var tmpFirstInvalid = '';
        var tmpIsQuiet = (tmpOptions.isQuiet === true);

        var tmpRetFields = [];

        var tmpInvalidControlMessage = '';


        for (var index = 0; index < tmpConfig.index.fieldsList.length; index++) {
            var tmpFN = tmpConfig.index.fieldsList[index];
            this.setFieldMessage(tmpFN, '');
            var tmpField = tmpDetails.fields[tmpFN]
            var tmpIsAvail = this.getFieldDisplay(tmpFN);
            var tmpFieldIsValid = true;
            var tmpReasonText = '';
            if (tmpIsAvail) {
                var tmpFieldSpec = tmpConfig.index.all[tmpFN];
                if (tmpFieldSpec.req === true) {
                    var tmpFieldData = tmpDetails.data[tmpFN];
                    if (!(tmpFieldData)) {
                        tmpFieldIsValid = false;
                        //--- ToDo: Add required field message option
                        tmpRetFields.push({ name: tmpFN, text: '' })
                    } else {
                        if (Array.isArray(tmpFieldData)) {
                            if (tmpFieldData.length == 0) {
                                tmpFieldIsValid = false;
                            }
                        }
                    }
                }
                if (tmpFieldIsValid) {
                    //--- Run field level validation
                    var tmpFieldValid = this.validateField(tmpFN);
                    if (tmpFieldValid !== true) {
                        tmpFieldIsValid = false;

                        if (isStr(tmpFieldValid)) {
                            tmpReasonText = tmpFieldValid;
                        }
                        tmpRetFields.push({ name: tmpFN, text: tmpReasonText })
                    }
                }
            }


            if (!tmpFieldIsValid && !tmpIsQuiet) {
                if (!(tmpField.closest)) {
                    tmpField = $(tmpField)
                }
                if (tmpField.length > 0) {
                    tmpField = $(tmpField.get(0))
                }
                var tmpType = tmpField.attr('type')

                var tmpFieldWrap = tmpField.closest('.required');
                if (tmpType == 'radio' || tmpType == 'checkbox') {
                    tmpFieldWrap = tmpField.parent();
                    tmpFieldWrap = tmpFieldWrap.closest('[fieldwrap]');
                }

                if (tmpFieldWrap) {
                    tmpFieldWrap.addClass('error')
                }

                if (isStr(tmpReasonText)) {
                    this.setFieldMessage(tmpFN, tmpReasonText, { color: 'red' })
                    tmpRetFields.push({ name: '_control', text: tmpReasonText })
                } else {
                    this.setFieldMessage(tmpFN, '', { color: 'red' })
                }
            }

            if (!tmpFieldIsValid) {
                if (!(tmpFirstInvalid)) {
                    tmpFirstInvalid = tmpFN;
                }
                tmpIsValid = false;
            }

        }


        if (tmpIsValid) {
            var tmpConfigOptions = tmpConfig.options || {};
            var tmpOnValidate = this._onValidate || this.onValidate || tmpConfigOptions._onValidate || tmpConfigOptions.onValidate;

            if (isObj(tmpOnValidate)) {
                //tmpOnValidate.isStoredFunction && 
                if (tmpOnValidate['[function]']) {
                    tmpOnValidate = ThisApp.util.stringToFunction(tmpOnValidate['[function]']);
                } else {
                    var tmpName = tmpOnValidate.run;
                    var tmpToRun = me.validations.get(tmpName)
                    if (isFunc(tmpToRun)) {
                        //--- Run it, validations shouild look for _control to see control level validation
                        var tmpControlValid = tmpToRun('_control', false, this, false)
                        if (tmpControlValid !== true) {
                            tmpIsValid = false;
                            var tmpReasonText = '';
                            if (isStr(tmpControlValid)) {
                                tmpReasonText = tmpControlValid;
                                tmpInvalidControlMessage = tmpReasonText;
                            } else if (isArray(tmpControlValid)) {
                                //--- Allow validation to return field level details
                                //ToDo: Highlight later so we can auto message these too
                                tmpRetFields.concat(tmpControlValid);
                            }
                        }
                    } else {
                        console.warn("Validation not found: " + tmpName)
                    }
                }

            }

            if (isFunc(tmpOnValidate)) {
                //--- If we have a control level validation function, run it. padding in the current control object status
                var tmpControlValid = tmpOnValidate(this);
                if (tmpControlValid !== true) {
                    tmpIsValid = false;
                    var tmpReasonText = '';

                    if (isStr(tmpControlValid)) {
                        tmpReasonText = tmpControlValid;
                        tmpInvalidControlMessage = tmpReasonText;
                    } else if (isArray(tmpControlValid)) {
                        //--- Allow validation to return field level details
                        //ToDo: Highlight later so we can auto message these too
                        tmpRetFields.concat(tmpControlValid);
                    }

                }

            }
        }
        if (!tmpIsValid) {
            if (tmpFirstInvalid && isStr(tmpFirstInvalid)) {
                me.gotoField(tmpControl, tmpFirstInvalid)
            }
            var tmpIsInPrompt = ThisApp.prompter.promptDialog.hasClass('visible');
            if(tmpIsInPrompt){
                ThisApp.prompter.promptDialog.css('display','none')
                ThisApp.prompter.promptDialog.removeClass('visible');
            }
            alert(tmpInvalidControlMessage || tmpOptions.requiredMessage || "Please complete all required fields").then(function(){
                if( tmpIsInPrompt ){
                    ThisApp.prompter.promptDialog.css('display','block')
                    ThisApp.prompter.promptDialog.addClass('visible');
                    me.gotoField(tmpControl, tmpFirstInvalid);
                }
                
            });
        }

        return { isValid: tmpIsValid, fields: tmpRetFields };
    }

    meInstance.clear = function () {
        var tmpList = this.getConfig().index.fieldsList;
        for (var iPos = 0; iPos < tmpList.length; iPos++) {
            var tmpFN = tmpList[iPos];
            //--- ToDo: Set to default field value from specs or value based on data type of know by control
            var tmpFS = this.getFieldSpecs(tmpFN);
            if( tmpFS && tmpFS.default ){
                this.setFieldValue(tmpFN, tmpFS.default);
            } else {
                this.setFieldValue(tmpFN, '');
            }
            

        }
    }

    meInstance.loadData = function (theData, theClearFirstFlag) {
        if( theClearFirstFlag !== false){
            this.clear();
        }
        var tmpList = this.getConfig().index.fieldsList;
        var tmpData = theData || {};
        for (var iPos = 0; iPos < tmpList.length; iPos++) {
            var tmpFN = tmpList[iPos];
            if (tmpData.hasOwnProperty(tmpFN)) {
                this.setFieldValue(tmpFN, tmpData[tmpFN], { setOnly: true });
            }
        }
        this.refreshControl();
        this.publish('data-loaded');
    }

    meInstance.getIndex = function () {
        try {
            return this.getConfig().index;
        } catch (ex) {
            return false;
        }
    }

    meInstance.getWebControlSpecs = function (theFN) {
        try {
            if( this.hasField(theFN) ){
                return this.getFieldSpecs(theFN);
            }
            if( this.hasItem(theFN) ){
                return this.getItemSpecs(theFN);
            }
        } catch (ex) {
            return false;
        }
        return false;
    }

    meInstance.getFieldSpecs = function (theFN) {
        try {
            return this.getConfig().index.all[theFN];
        } catch (ex) {
            return false;
        }
    }
    meInstance.getItemSpecs = function (theFN) {
        try {
            return this.getConfig().index.all[theFN];
        } catch (ex) {
            return false;
        }
    }
    meInstance.hasField = function (theName) {
        try {
            var tmpPos = this.getIndex().fieldsList.indexOf(theName);
            return (tmpPos > -1);
        } catch (ex) {
            return false;
        }
    }
    meInstance.hasItem = function (theName) {
        try {
            var tmpPos = this.getIndex().itemsList.indexOf(theName);
            return (tmpPos > -1);
        } catch (ex) {
            return false;
        }
    }
    meInstance.hasAny = function (theName) {
        if (this.hasField(theName)) {
            return true;
        }
        if (this.hasItem(theName)) {
            return true;
        }
        return false;
    }

    meInstance.moveModeEnd = function(){
        //-- ToDo: Just update styling (add/remove classes?)
        this.setDesignMode(false);
        this.setDesignMode(true);

        //---ToDo: DO this another way
        this.getByAttr$({controls:'',fieldwrap:''}).removeClass('hidden');
    }

    meInstance.moveModeStart = function(){
        //ToDo: Use classes to add/remove instead?
        var tmpOverlayStyles = {'background-color':'black','color': 'white', 'opacity':.1};
        var tmpOverlayHTML = '<div appuse="actapp-design-wrap-target" class="ui message green right aligned" style="height:100%;margin:auto;background-color:transparent;border-width:2px;"><div class="ui header right aligned green medium" style="height:auto;"><div class="ui button icon green" ><i class="icon  target"</div></div></div>';
        var tmpEl = this.getEl();
        var tmpAppWraps = ThisApp.getByAttr$({appuse:"actapp-design-wrap"},tmpEl);

        //---ToDo: DO this another way
        this.getByAttr$({controls:'',fieldwrap:''}).addClass('hidden');

        function tmpDropIt(theIndex){
            var tmpWrap = $(this);
            var tmpName = tmpWrap.attr('name');
            if( ''+tmpName !== 'undefined' ){
                //var tmpTitle = tmpWrap.find('[appuse="actapp-design-wrap-titlebar"],[name="' + tmpName + '"]')
                var tmpTitle = ThisApp.getByAttr$({appuse:"actapp-design-wrap-titlebar",name:tmpName},tmpWrap);
                var tmpToOverlay = $(tmpTitle);
                tmpToOverlay.overlayMask().css({margin:'2px'})
                var tmpME = tmpToOverlay.data('maskel');
                var tmpMC = tmpToOverlay.data('maskcontent');
                tmpME.css(tmpOverlayStyles);
                tmpMC.html(tmpOverlayHTML)
                tmpMC.css('margin','-10px','-10px');
                tmpMC.css('height','calc(100% + 20px)');
                tmpMC.css('width','calc(100% + 20px)');
            } else {
                console.error("Developer: Could not wrap element, make sure field wrap has name attribute.",tmpEl)
            }
        }
        
        tmpAppWraps.css({margin:'15px'})
        tmpAppWraps.each(tmpDropIt);
    }

    meInstance.getOutterEls = function (theName) {
        var tmpAll = []
        if (this.hasField(theName)) {
            var tmpEl = this.getFieldEl(theName);
            if( tmpEl ){
                var tmpWrapEl = $(tmpEl).closest('[fieldwrap]');
                if( tmpWrapEl ){
                    tmpEl = tmpWrapEl;
                }
                tmpAll.push(tmpEl)
            }
        }
        if (this.hasItem(theName)) {
            tmpAll.push(this.getItemEl(theName))
        }
        return tmpAll;
    }

    meInstance.getOutterEl = function (theName) {
        var tmpAll = this.getOutterEls(theName);
        if( tmpAll && tmpAll.length == 1){
            return $(tmpAll[0]);
        }
        return true;
    }

    meInstance.entrySelection = function (theOptions) {
        var tmpIndex = this.getIndex();
        var tmpOnOff = false;
        if( typeof(theOptions) == 'boolean'){
            tmpOnOff = theOptions;
        }
        for( var iPos in tmpIndex.entryList ){
            var tmpName = tmpIndex.entryList[iPos]
            this.setEntrySelected(tmpName,tmpOnOff);
        }
    }
    
    meInstance.setEntrySelected = function (theName, theIsOn, theOptions) {
        if( !(theName) || 'string' != typeof(theName) ){
            console.error("no name provided");
            return;
        }
        var tmpDesEl = this.getDesignerEl(theName);
        var tmpIsSel = tmpDesEl.data('selected');
        if( typeof(theIsOn) !== 'boolean'){
            if( tmpIsSel == undefined ){
                theIsOn = true;
            } else {
                theIsOn = !tmpIsSel;
            }
        }
        tmpDesEl.data('selected',theIsOn);

        var tmpIsOn = (theIsOn !== false);
        if( tmpIsOn ){
            //--- Show Selected UI Changes
            tmpDesEl.css('border','dotted 4px orange');
        } else {
            //--- Show Deselected UI Changes
            tmpDesEl.css('border','none');
        }
    }

    meInstance.refreshDesignerUI = function (theName, theIsOn, theOptions) {
        //ToDo: Refresh UI selections, etc - based on status 
        //         for redraw.
    }

    meInstance.setControlMoveMode = function (theName, theIsOn, theOptions) {
        if( !(theName) || 'string' != typeof(theName) ){
            console.error("no name provided");
            return;
        }
        var tmpDesEl = this.getDesignerEl(theName);
        var tmpIsSel = tmpDesEl.data('movemode');
        if( typeof(theIsOn) !== 'boolean'){
            if( tmpIsSel == undefined ){
                theIsOn = true;
            } else {
                theIsOn = !tmpIsSel;
            }
        }
        tmpDesEl.data('movemode',theIsOn);

        var tmpIsOn = (theIsOn !== false);
        if( tmpIsOn ){
            //--- Show Selected UI Changes
            tmpDesEl.css('margin','10px');
        } else {
            //--- Show Deselected UI Changes
            tmpDesEl.css('margin','0px');
        }
    }

    meInstance.setControlDesignMode = function (theName, theIsOn, theOptions) {
        if( !(theName) || 'string' != typeof(theName) ){
            console.error("no name provided");
            return;
        }
        var tmpIsOn = (theIsOn !== false);
        if( tmpIsOn ){
            this._designSelected = false;
            this.wrapControl(theName, theOptions);
        } else {
            delete this._designSelected;
            this.unWrapControl(theName, theOptions);
        }
    }

    meInstance.setDesignMode = function (theIsOn, theOptions) {
        var tmpIndex = this.getIndex();
        this._designModeFlag = theIsOn;
        for( var iName in tmpIndex.all){
            this.setControlDesignMode(iName,theIsOn, theOptions)
        }
        if( theIsOn ){
            //=== Show all fields for editing
            //= *onChange events disabled in design mode
            this.showAll();
            //--- clearSelections

        } else {
            //=== Refresh onChange Events
            this.refreshControl()
        }
        
    }

    //meInstance.defaultDesignAction = 'actappControlSelected';
    // meInstance.getControlConfigLocation = function(theName, theStartParent){
    //     var tmpName = theName;
    //     var tmpParent = theStartParent || this.getConfig()
    //     var tmpParentArray = tmpParent.content || tmpParent.items || tmpParent.tabs;
    //     var tmpRet = {};
    //     for( var iPos in tmpParentArray ){
    //         var tmpEntry = tmpParentArray[iPos];
    //         if( tmpEntry && tmpEntry.name && tmpEntry.name == tmpName ){
    //             return {
    //                 pos: iPos,
    //                 array: tmpParentArray,
    //                 parent: tmpParent
    //             }
                
    //         }
    //         var tmpSubParent = tmpEntry.content || tmpEntry.items || tmpEntry.tabs;
    //         if( tmpSubParent ){
    //             tmpRet = this.getControlConfigLocation(theName, tmpEntry);
    //             if (tmpRet){
    //                 return tmpRet;
    //             }
    //         }
    //     }
        

    // }

    
    meInstance.wrapControl = function (theName, theOptions) {
        var tmpOptions = theOptions || {};
        var tmpAddOverlay = false;
        var tmpStylesDef = tmpOptions.maskstyles;
        var tmpMaskContent = tmpOptions.maskcontent;
        var tmpStylesDefContent = tmpOptions.maskcontentstyles;
        var tmpStylesDefWrap = tmpOptions.wrapstyles;
        var tmpAction = false;
        var tmpActionAdd = '';

        if( (tmpOptions.myaction) ){
            tmpAction = tmpOptions.myaction;
            tmpActionAdd = ' myaction="' + tmpAction + '" ';
        } else if( (tmpOptions.action) ){
            tmpAction = tmpOptions.action;
            tmpActionAdd = ' action="' + tmpAction + '" ';
        }

        //--- If not turned off and an object is not supplied, set default styling
        if( tmpStylesDef !== false ){
            if(typeof(tmpStylesDef) !== 'object'){
                tmpStylesDef = {'background-color':'grey','color': 'black', 'opacity':.05};
            }
        }

        if( tmpStylesDefContent !== false ){
            if(typeof(tmpStylesDefContent) !== 'object'){
                tmpStylesDefContent = {border:'dashed 3px #b08298',margin:'2px',padding:'2px'};
            }
        }
        if( tmpStylesDefWrap !== false ){
            if(typeof(tmpStylesDefWrap) !== 'object'){
                tmpStylesDefWrap = {margin:'2px', padding:'7px',border:'dashed 2px black'};
            }
        }

        tmpAddOverlay = false;
        var tmpAll = this.getOutterEls(theName);
        var tmpUpdated = 0;
        var tmpWrapper = tmpOptions.wrapper || 'designmode';
        var tmpThisControl = this;

        $(tmpAll).each(function( theIndex ) {
            var thisEl = $(this);
            var tmpName = thisEl.attr('name');
            var tmpThisSpec = tmpThisControl.getWebControlSpecs(tmpName);
            

            var tmpControlDisp = tmpThisSpec.ctl;
            
            var tmpFieldHolder = '<div name="' + tmpName + '" appuse="actapp-design-body-wrap"></div>';
            
            if( (tmpWrapper == 'designmode')){
                tmpWrapper = '<div ' + tmpActionAdd + ' class="ui field" name="' + tmpName + '" appuse="actapp-design-wrap"></div>';
            }
            if( !(this.data('actappdesignWrap'))){
                this.wrap(tmpWrapper)
                    .wrap(tmpFieldHolder)
                    .data('actappdesignWrap',true);                

                this.closest('[appuse="actapp-design-wrap"]')
                    .prepend('<div appuse="actapp-design-details"></div>')
                    .prepend('<div name="' + theName + '" appuse="actapp-design-wrap-titlebar" class="ui message black mar2 pad5 fluid" style="border:ridge 3px white;"><div class="ui black basic circular horizontal label">' + tmpControlDisp + '</div><b>' + theName + '</b></div>')

                tmpUpdated++;
            }
        });
        

        if( tmpOptions.overlay === true || tmpOptions.mask === true ){
            tmpAddOverlay = true;
        }
        
        var tmpWrapperEl = this.getWrapperEl(theName);
        if( tmpWrapperEl ){
            tmpWrapperEl.data('name',theName);
            tmpWrapperEl.data('specs',this.getWebControlSpecs(theName));
            tmpWrapperEl.data('control',this);

            if(tmpAddOverlay){
                tmpWrapperEl.overlayMask();
                tmpMaskEl = tmpWrapperEl.data('maskel');
                tmpMaskContentEl = tmpWrapperEl.data('maskcontent');
                
                if(tmpStylesDef){
                    tmpMaskEl.css(tmpStylesDef)
                }
                // if( !(tmpMaskContent) ){
                //     tmpMaskContent = '&nbsp;';
                // }
                if(tmpMaskContent){
                    tmpMaskContentEl.html(tmpMaskContent);
                }
                if(tmpStylesDefContent){
                    tmpMaskContentEl.css(tmpStylesDefContent);
                }
                
                // this.overlayMaskEl = tmpWrapperEl.data('maskel');
                // this.overlayMaskContent = tmpWrapperEl.data('maskcontent');
                
                // if(tmpStylesDef){
                //     this.overlayMaskEl.css(tmpStylesDef)
                // }
                // if( !(tmpMaskContent) ){
                //     tmpMaskContent = '&nbsp;';
                // }
                // if(tmpMaskContent){
                //     this.overlayMaskContent.html(tmpMaskContent);
                // }
                // if(tmpStylesDefContent){
                //     this.overlayMaskContent.css(tmpStylesDefContent);
                // }
                
                // if( tmpAction ){
                //     this.overlayMaskContent.attr('action',tmpAction);
                // }
                
                
                tmpWrapperEl.data('mask',true);
            }
        }
        var tmpNewEl = this.getWrapperEl(theName);
        if( tmpStylesDefWrap ){
            tmpNewEl.css(tmpStylesDefWrap);
        }

        //tmpNewEl.append('<div appuse="actapp-design-wrap-part" style="clear:both;padding:4px;"></div>')
        //tmpNewEl.prepend('<div name="' + theName + '" appuse="actapp-design-wrap-titlebar" class="ui message black mar2 pad5">Name: <b>' + theName + '</b></div>');


        return tmpNewEl;

    }
    meInstance.unWrapControl = function (theName) {
        var tmpAll = this.getOutterEls(theName);
        var tmpUpdated = 0;
        var tmpEl = this.getEl();
        var tmpWrapperEl = this.getWrapperEl(theName);        
        if( tmpWrapperEl ){
            tmpWrapperEl.overlayMask('remove');
        }
        $(tmpAll).each(function( theIndex ) {
            if( (this.data('actappdesignWrap') === true)){
                this.unwrap()
                .unwrap()
                .data('actappdesignWrap',false);
                tmpUpdated++;
            }
        });
        //--- ToDo: Reduce scope and refactor
        //--- Note: When left, good start for drop points for insertion
        ThisApp.getByAttr$({appuse:"actapp-design-wrap-titlebar"},tmpEl).remove();
        ThisApp.getByAttr$({appuse:"actapp-design-wrap-part"},tmpEl).remove();
        ThisApp.getByAttr$({appuse:"actapp-design-wrap-target"},tmpEl).remove();
        return tmpUpdated;
    }
    meInstance.getDesignerEl = function (theName) {
        var tmpEl = $(this.getOutterEl(theName).parent());
        var tmpDesWrap = tmpEl.closest('[appuse=actapp-design-wrap]')
        tmpDesWrap.data('wrapel',tmpEl);
        return $(tmpDesWrap);
    }
    meInstance.getWrapperEl = function (theName) {
        return $(this.getOutterEl(theName).parent());
    }
    meInstance.getDesignerFieldEl = function (theName) {
        var tmpEl = $(this.getOutterEl(theName).parent());
        var tmpDesWrap = tmpEl.closest('[appuse=actapp-design-body-wrap]')
        return $(tmpDesWrap);
    }
    meInstance.getWebControlEls = function (theName) {
        var tmpAll = []
        if (this.hasField(theName)) {
            tmpAll.push(this.getFieldEl(theName))
        }
        if (this.hasItem(theName)) {
            tmpAll.push(this.getItemEl(theName))
        }
        return tmpAll;
    }

    //--- Returns only one el if exists, else array (should be one per, validate that)
    meInstance.getWebControlEl = function (theName) {
        var tmpAll = this.getWebControlEls(theName);
        if( tmpAll && tmpAll.length == 1){
            return $(tmpAll[0]);
        }
        return tmpAll;
    }

    meInstance.inDesignMode = function(){
        return (this._designModeFlag === true);
    }

    meInstance.refreshForField = function(theFN){
        if( this.inDesignMode() ){
            return;
        }
        
        var tmpFN = theFN;
        var tmpSpecs = this.getFieldSpecs(tmpFN);
        if (tmpSpecs) {
            var tmpOnChange = tmpSpecs.onChange || false;
            if (tmpOnChange) {
                if (isObj(tmpOnChange)) {
                    var tmpActionName = tmpOnChange.run;
                    var tmpAction = me.actions.get(tmpActionName) || me[tmpActionName];
                    var tmpToBind = false;
                    if( !tmpAction ){
                        var tmpToRun = false;
                        var tmpPCtr = 0;
                        var tmpParent = this;
                        while ((tmpParent && !isFunc(tmpToRun))) {
                            tmpPCtr++;
                            tmpToRun = tmpParent.actions[tmpActionName] || tmpParent[tmpActionName] ;
                            if( isFunc(tmpToRun) ){
                                tmpToBind = tmpParent;
                                break;
                            }
                            tmpParent = this.parentControl || false;
                            if(tmpPCtr > 50){
                                console.error('too many attempts to find parent');
                                return;
                            }
                        }
                        if( isFunc(tmpToRun) ){
                            tmpAction = tmpToRun;
                        }
                    }
                    if(tmpToBind){
                        tmpAction = tmpAction.bind(tmpToBind);
                    }
                    if (isFunc(tmpAction)) {
                        //--- Run it
                        var tmpVal = this.getFieldValue(tmpFN);
                        tmpAction(tmpFN, tmpVal, this, tmpOnChange)
                    }
                }
            }
            this.publish('field-change', [this, tmpFN, this.getFieldValue(tmpFN)])
        }
    }

    meInstance.refreshControl = function () {
        var tmpIndex = this.getIndex();
        if (tmpIndex && tmpIndex.fieldsList && tmpIndex.fieldsList.length) {
            for (var iPos = 0; iPos < tmpIndex.fieldsList.length; iPos++) {
                var tmpFN = tmpIndex.fieldsList[iPos];
                this.refreshForField(tmpFN);

            }
        }

    }
    meInstance.onControlResize = onControlResize;
    function onControlResize(theEvent) {
        var tmpEl = this.getEl();
        var tmpWidth = tmpEl.width();
        if (tmpWidth < 450) {
            tmpEl.addClass('mobile');
        } else {
            tmpEl.removeClass('mobile');
        }
    }

    function itemTouchEnd(theEvent) {
        var tmpTarget = theEvent.target || theEvent.currentTarget || theEvent.delegetTarget || {};
        var tmpBounds = tmpTarget.getBoundingClientRect();
        if (theEvent.changedTouches && theEvent.changedTouches.length > 0) {
            var tmpTouchInfo = theEvent.changedTouches[0];
            var tmpStart = ThisApp.util._start;
            var tmpXDiff = Math.abs(tmpStart.x - tmpTouchInfo.screenX)
            var tmpYDiff = Math.abs(tmpStart.y - tmpTouchInfo.screenY)
            if (tmpXDiff > ThisApp.util.MIN_TOUCH_DISTANCE || tmpYDiff > ThisApp.util.MIN_TOUCH_DISTANCE) {
                return;
            }

            if (ThisApp.util.touchIsClick(tmpBounds, tmpTouchInfo.clientX, tmpTouchInfo.clientY)) {
                this.onItemClick(theEvent);
            }
        }
    }
    meInstance.onItemClick = function (theEvent) {
        var tmpObj = theEvent.target || theEvent.currentTarget || theEvent.delegetTarget || {};
        var tmpActionDetails = ThisApp.getActionFromObj(tmpObj, 'myaction');
        var tmpTargetHit = theEvent.target || theEvent.currentTarget || theEvent.delegetTarget || {};
        tmpTargetHit = $(tmpTargetHit);
        //--- Get the acdtual control, not sub item like icon
        var tmpTarget = $(tmpTargetHit).closest('[name][controls]')
        var tmpParams = ThisApp.getAttrs(tmpTarget, ['name', 'controls']);

        var tmpAppActionDetails = ThisApp.getActionFromObj(tmpObj, 'action');

        if ((tmpAppActionDetails.hasOwnProperty('action') && tmpAppActionDetails.hasOwnProperty('el'))) {
            if (tmpAppActionDetails.action == 'selectMe') {
                this.publish('selectMe', [this, tmpAppActionDetails.el])
            }
        }

        if (!(tmpActionDetails.hasOwnProperty('action') && tmpActionDetails.hasOwnProperty('el'))) {
            //--- Look for object spec based actions (specific to controls)
            if (tmpParams.controls && tmpParams.name) {
                var tmpName = tmpParams.name;
                tmpTarget = $(tmpTarget);
                var tmpItem = tmpTarget.attr('item');
                if (!isStr(tmpItem)) { return true };
                var tmpSpecs = this.getItemSpecs(tmpName);
                if (!(tmpSpecs)) { return true };
                var tmpOnClick = tmpSpecs.onClick || false;

                if (isObj(tmpOnClick)) {

                    var tmpToRun = tmpOnClick.run;
                    if (tmpToRun == 'publish') {
                        var tmpEvent = tmpOnClick.event || 'click';
                        var tmpIsValid = true;
                        var tmpPubParams = tmpOnClick.params || '';

                        if (tmpOnClick.validate === true) {
                            var tmpValidation = this.validate();
                            tmpIsValid = tmpValidation.isValid;
                            if (tmpIsValid) {
                                this.publish(tmpEvent, [this, tmpPubParams, tmpTarget, theEvent])
                            }
                        } else {
                            this.publish(tmpEvent, [this, tmpPubParams, tmpTarget, theEvent])
                        }

                    } else if (tmpToRun == 'action' || tmpToRun == 'pageaction') {
                        if (tmpOnClick.validate === true) {
                            var tmpValidation = this.validate();
                            tmpIsValid = tmpValidation.isValid;
                            if (!(tmpIsValid)) {
                                return false;
                            }
                        }


                        var tmpAction = tmpOnClick.action || '';
                        var tmpPageAction = tmpOnClick.pageaction || '';
                        var tmpAppAction = tmpOnClick.appaction || '';

                        var tmpSource = tmpOnClick.source || "control";
                        if (tmpPageAction) {
                            tmpSource = 'page'
                        };
                        if (tmpSource == 'app' && !tmpAppAction) {
                            tmpAppAction = tmpAction;
                        }

                        //Note: Can use tmpOnClick.source, "page","app", "control"
                        //       default is "control" if not provided

                        //ToDo: Page and App Actions
                        if (tmpSource == "page") {
                            tmpOnClick.action = tmpPageAction || tmpAction;
                            this.context.page.controller.runAction(ThisApp.clone(tmpOnClick));
                        } else if (tmpSource == "app") {
                            tmpOnClick.action = tmpAction;
                            ThisApp.runAppAction(tmpAction, ThisApp.clone(tmpOnClick));
                        } else if (tmpSource == "control") {
                            var tmpActions = this.actions || {};
                            var tmpToRun = tmpActions[tmpAction] || this[tmpAction];

                            if (isFunc(tmpToRun)) {
                                var tmpActParams = ThisApp.clone(tmpOnClick);
                                //--- Run action with only the params object, not target
                                //---  run in a way that it binds to this control when run
                                return tmpToRun.apply(this, [tmpActParams]);
                            } else {
                                //--- Automatically run up the chain to find action
                                console.warn("Action not found for " + tmpAction)
                            }
                        } else {
                            console.warn("Not yet implemented for source " + tmpSource)
                        }
                    }
                    //--- Not a known internal action
                }
            }
            return;
        }

        //--- We have a control level action to run, run it
        var tmpAction = tmpActionDetails.action;
        tmpObj = tmpActionDetails.el;

        if (tmpAction) {
            this.runAction(tmpAction, tmpObj);
            if (tmpAction == 'selectMe') {
                this.publish('selectMe', [this, tmpObj])
            }
            theEvent.preventDefault();
            theEvent.stopPropagation();
            return;
        }
        return;
    }

    meInstance.runAction = function (theAction, theTarget) {
        var tmpAction = theAction || '';
        if (!(tmpAction)) {
            console.warn("Action not provided for target el" + theTarget)
            return;
        }
        var tmpToRun = this.actions[tmpAction] || this[tmpAction] || ThisApp[tmpAction];
        var tmpToBind = false;
        if( !isFunc(tmpToRun) ){
            if( this.parentControl ){
                var tmpPCtr = 0;
                var tmpParent = this.parentControl;
                while ((tmpParent && !isFunc(tmpToRun))) {
                    tmpPCtr++;
                    tmpToRun = tmpParent.actions[tmpAction] || tmpParent[tmpAction] ;
                    if( isFunc(tmpToRun) ){
                        tmpToBind = tmpParent;
                        break;
                    }
                    tmpParent = this.parentControl || false;
                    if(tmpPCtr > 50){
                        console.error('too many attempts to find parent');
                        return;
                    }
                }
            }
        }
        if (isFunc(tmpToRun)) {
            //---  run in a way that it binds to this control when run
            //       and run with this control as the optional parent item
            if(tmpToBind){
                tmpToRun = tmpToRun.bind(tmpToBind);
            }
            
            //return tmpToRun.call(theAction, theTarget, this.getEl());
            return tmpToRun.apply(this, [theAction, theTarget, this.getEl()]);
        } else {
            console.warn("Action not found for " + tmpAction)
            return;
        }

    }

    meInstance.onFieldChange = function (theEvent) {
        //--- A field changed in this control
        var tmpTarget = theEvent.target || theEvent.currentTarget || theEvent.delegetTarget || {};
        var tmpParams = ThisApp.getAttrs(tmpTarget, ['name', 'controls']);
        if (tmpParams.controls && tmpParams.name) {
            var tmpFN = tmpParams.name;
            this.refreshForField(tmpFN);
            this.publish('field-changed', [this, tmpFN]);
        }
    }

    meInstance.destroy = function () {
        try {
            if (this.parentEl) {
                this.parentEl.off('change');
                this.parentEl.off('click');
            }
            
            if (this.liveIndex) {
                if (this.liveIndex.dropdown) {
                    this.liveIndex.dropdown.dropdown('destroy');
                }
                if (this.liveIndex.checkbox) {
                    this.liveIndex.checkbox.checkbox('destroy');
                }
            }

            if( this.parts ){
                for( var aPart in this.parts ){
                    var tmpPart = this.parts[aPart]
                    if( tmpPart && tmpPart.destroy ){
                        tmpPart.destroy();
                    }
                }
            }

            if( this._onDestroy ){
                this._onDestroy();
            }
            if( this.unsubscribeAllEvents ){
                this.unsubscribeAllEvents();
            }
        } catch (ex) {

        }

    }
    meInstance.clearEvents = meInstance.destroy;

    meInstance.refreshSubLayouts = function () {
        if (this.liveIndex && this.liveIndex.layouts) {
            for (aName in this.liveIndex.layouts) {
                var tmpLayout = this.liveIndex.layouts[aName];
                tmpLayout.resizeAll();
            }
        }
        if (this.parts) {
            for (aName in this.parts) {
                var tmpPart = this.parts[aName];
                if (tmpPart && tmpPart.refreshSubLayouts) {
                    tmpPart.refreshSubLayouts();
                }
            }
        }
    }

    meInstance.initControlComponents = function (theOptionalEl) {
        var dfd = jQuery.Deferred();
        var tmpEl = theOptionalEl || this.parentEl;
        var tmpDefs = [];
        try {
            ThisApp.initAppComponents(tmpEl);
            var tmpControls = ThisApp.getByAttr$({ ctlcomp: 'control' }, tmpEl);
            if (tmpControls.length) {
                for (var iControl = 0; iControl < tmpControls.length; iControl++) {
                    var tmpControlEl = $(tmpControls[iControl]);
                    var tmpControlName = tmpControlEl.attr('controlname');
                    var tmpPartName = tmpControlEl.attr('partname') || tmpControlEl.attr('name') || tmpControlName;
                    if (tmpControlName && tmpPartName) {

                        var tmpCtl = false;
                        if(this.parentControl && this.parentControl.getControl){
                            tmpCtl = this.parentControl.getControl(tmpControlName);
                        }
                        if (!(tmpCtl)) {
                            //var tmpCached = ThisApp.resCache['controls'][tmpControlName];
                            console.warn("initControlComponents Could not find parent control " + tmpControlName)
                        } else {
                            var tmpPart = tmpCtl.create(tmpPartName, {parent:this});
                            this.parts[tmpPartName] = tmpPart;
                            tmpDefs.push(tmpPart.loadToElement(tmpControlEl));
                        }
                    }
                }
            }
            var tmpPanels = ThisApp.getByAttr$({ ctlcomp: 'panel' }, tmpEl);
            if (tmpPanels.length) {
                for (var iControl = 0; iControl < tmpPanels.length; iControl++) {
                    var tmpControlEl = $(tmpPanels[iControl]);
                    var tmpControlName = tmpControlEl.attr('controlname');

                    var tmpPartName = tmpControlEl.attr('partname') || tmpControlEl.attr('name') || tmpControlName;
                    if (tmpControlName && tmpPartName) {

                        var tmpCtl = this.parentControl.getPanel(tmpControlName);
                        if (!(tmpCtl)) {
                            console.warn("Could not find parent control " + tmpControlName)
                            
                        } else {
                            var tmpPart = tmpCtl.create(tmpPartName, {parent:this});
                            this.parts[tmpPartName] = tmpPart;
                            tmpDefs.push(tmpPart.loadToElement(tmpControlEl));
                        }
                    }

                }
            }

            var tmpTplCtls = ThisApp.getByAttr$({ ctlcomp: 'template' }, tmpEl);
            if (tmpTplCtls.length) {
                for (var iControl = 0; iControl < tmpTplCtls.length; iControl++) {
                    var tmpControlEl = $(tmpTplCtls[iControl]);
                    var tmpControlName = tmpControlEl.attr('controlname');
                    var tmpTplName = tmpControlEl.attr('templatename') || '';
                    tmpDefs.push(this.loadTemplate(tmpControlName, tmpTplName, tmpControlEl));
                }
            }

            var tmpHTMLs = ThisApp.getByAttr$({ ctlcomp: 'html' }, tmpEl);
            if (tmpHTMLs.length) {
                for (var iControl = 0; iControl < tmpHTMLs.length; iControl++) {
                    var tmpControlEl = $(tmpHTMLs[iControl]);
                    var tmpControlName = tmpControlEl.attr('controlname');
                    if (tmpControlName) {
                        this.parts[tmpPartName] = tmpPart;                    
                        tmpDefs.push(this.loadHTML(tmpControlName, tmpControlEl));
                    }
                }
            }

            var tmpDDs = ThisApp.getByAttr$({ ctlcomp: 'dropdown' }, tmpEl);

            if (tmpDDs.length) {
                this.liveIndex.dropdown = tmpDDs;
                tmpDDs.dropdown({
                    showOnFocus: false
                })
                    .attr('ctlcomp', '')
                    .attr('appcomp', '');
            }

            var tmpCBs = ThisApp.getByAttr$({ ctlcomp: 'checkbox' }, tmpEl);

            if (tmpCBs.length) {
                this.liveIndex.checkbox = tmpCBs;
                tmpCBs.checkbox()
                    .attr('ctlcomp', '')
                    .attr('appcomp', '');
            }

            var tmpLayouts = ThisApp.getByAttr$({ ctlcomp: 'layout' }, tmpEl);

            if (tmpLayouts.length) {
                this.layoutElements = tmpLayouts;
                tmpLayouts
                    .addClass('ctl-layout-frame')
                    .css('min-height', '200px')
                    .attr('ctlcomporig', 'layout')
                    .attr('ctlcomp', '')
                    ;
                //--- Assure all the elements to the next pane are 100%
                //ToDo: Verify still needed ***
                ThisApp.util.resizeToParent(this.layoutElements);
                //--- Assure layouts index is in there
                this.liveIndex.layouts = this.liveIndex.layouts || {};
                //--- Loop to create each one, getting details if needed from el
                for (var iLayout = 0; iLayout < tmpLayouts.length; iLayout++) {
                    var tmpLayoutEntry = $(tmpLayouts.get(iLayout));
                    var tmpLayoutTemplateName = tmpLayoutEntry.attr('template') || '';
                    var tmpLayoutOptions = defaultLayoutOptions;
                    if (tmpLayoutTemplateName && StaticApp.layoutTemplates[tmpLayoutTemplateName]) {
                        //--- Using custom template
                        tmpLayoutOptions = StaticApp.layoutTemplates[tmpLayoutTemplateName];
                    }
                    this.controlLayoutChanged = ActionAppCore.debounce(function () {
                        this.publish('resized', this);
                    }, 200).bind(this);

                    tmpLayoutOptions.onresize_end = this.controlLayoutChanged;
                    this.layoutCount = this.layoutCount || 0;
                    this.layoutCount++;
                    var tmpControlLayout = tmpLayoutEntry.layout(tmpLayoutOptions);
                    this.liveIndex.layouts['layout-' + this.layoutCount] = tmpControlLayout;
                }
            }
        } catch (theError) {
            console.error('error in control init',theError);
        }
        $.whenAll(tmpDefs).then(function (theReply) {
            //--- Tell the app to resize it's layouts
            ThisApp.resizeLayouts();
            dfd.resolve(true);
        })
        return dfd.promise();
    }

    meInstance.loadTemplate = function(theControlName, theTplName, theControlEl){
        var dfd = jQuery.Deferred();        
        ThisApp.apiCall(theControlName).then(function(theReply){
            if( theTplName ){
                ThisApp.addTemplate(theTplName, theReply);
            } else {
                $(theControlEl).html(theReply);
            }
            dfd.resolve(true);
        })
        return dfd.promise();
    }

    meInstance.loadHTML = function(theControlName, theControlEl){
        var dfd = jQuery.Deferred();
        ThisApp.apiCall(theControlName).then(function(theReply){
            $(theControlEl).html(theReply);
            dfd.resolve(true);
        })
        return dfd.promise();
    }

    meInstance._onParentResizeEvent = function(){
        if( this.refreshSubLayouts){
            this.refreshSubLayouts();
        }
    }
    
    meInstance.loadToElement = function (theEl, theOptions) {
        
        var dfd = jQuery.Deferred();
        var tmpOptions = theOptions || {};
        var tmpThis = this;
        tmpThis.parentEl = ThisApp.asSpot(theEl);

        if (isFunc(tmpThis._onPreInit)) {
            tmpThis._onPreInit();
        }
        var tmpHTML = tmpThis.getHTML();
        tmpThis.parentEl.html(tmpHTML);
        var tmpControl = tmpThis.parentEl.find('[control]');
        tmpControl = tmpControl || tmpThis.parentEl;
        tmpControl.on('change', tmpThis.onFieldChange.bind(this));
        tmpControl.on('click', tmpThis.onItemClick.bind(this));
        var tmpDom = tmpControl.get(0);
        if (tmpDom) {
            tmpDom.ontouchend = itemTouchEnd.bind(this);
            tmpDom.ontouchstart = ThisApp.util.itemTouchStart.bind(this);
        }

        
        tmpThis.getConfig().options = tmpThis.getConfig().options || {};

        this.assureRequired().then(function () {
        
            var tmpProm = tmpThis.initControlComponents();
           
            tmpProm.then(function (theReply) {

                if (isFunc(tmpThis._onInit)) {
                    tmpThis._onInit();
                }
                
                if( tmpThis.parentControl && tmpThis.parentControl.subscribe){
                    tmpThis.subscribeEvent(tmpThis.parentControl, 'resized', tmpThis._onParentResizeEvent.bind(tmpThis) );
                } else if( tmpThis.context && tmpThis.context.page && tmpThis.context.page.controller ){
                    tmpThis.subscribeEvent(tmpThis.context.page.controller, 'resized', tmpThis._onParentResizeEvent.bind(tmpThis) );
                }

                tmpThis.refreshControl();
                var tmpDoc = tmpOptions.doc || tmpThis.getConfig().options.doc || false;
                if (tmpDoc) {
                    tmpThis.loadData(tmpDoc);
                }
                if (isFunc(tmpThis._onLoad)) {
                    tmpThis._onLoad();
                }


                dfd.resolve(true);
            });
        });
        return dfd.promise();
    };

    //==== HTML Control Builder ======  ======  ======  ======  ======  ======  ======  ======  ======  ======     

    me.getControlHTML = getControlHTML;
    function getControlHTML(theControlName, theSpecs, theControlObj) {
        var tmpHTML = [];
        var tmpSpecs = theSpecs || {};
        var tmpSpecOptions = tmpSpecs.options || {};
        var tmpItems = tmpSpecs.content || [];
        var tmpControlName = theControlName || 'default';
        if (!(tmpItems && tmpItems.length)) {
            return '';
        }

        tmpHTML.push(getContentHTML(theControlName, tmpItems, theControlObj));
        var tmpAttr = ' segment ';
        if (tmpSpecOptions.padding === false) {
            tmpAttr = ' ';
        } else if (tmpSpecOptions.padding === 'slim') {
            tmpAttr += '  slim ';
        }
        if (tmpSpecOptions.basic == true) {
            tmpAttr += ' basic '
        }

        if (tmpSpecOptions.segment === false) {
            tmpAttr = ''
        }
        var tmpForm = 'form';
        if (tmpSpecOptions.formClass === false) {
            tmpForm = ''
        }
        if (tmpSpecOptions.initLoading === true) {
            tmpAttr += ' loading ';
        }

        var tmpTag = 'div';
        var tmpFormAction = '';
        var tmpFormMethod = '';
        var tmpFormAttr = '';

        if (typeof (tmpSpecOptions.form) == 'object') {
            tmpFormAction = tmpSpecOptions.form.action || '';
            tmpFormMethod = tmpSpecOptions.form.method || '';

            tmpFormAttr = ' action="' + tmpFormAction + '"';
            if (tmpFormMethod) {
                tmpFormAttr += ' method="' + tmpFormMethod + '"';
            }

            tmpTag = 'form';
        }

        tmpHTML = tmpHTML.join('');
        if (tmpHTML) {
            tmpHTML = '<' + tmpTag + ' ' + tmpFormAttr + ' class="ui ' + tmpAttr + ' ' + tmpForm + '" controls control name="' + tmpControlName + '">' + tmpHTML + '</' + tmpTag + '>';
        }
        return tmpHTML;
    }

    
    me.getContentDomSpecs = getContentDomSpecs;
    function getContentDomSpecs(theControlName, theItems, theControlObj) {
        var tmpRet = {}
        return tmpRet;
    }
    me.getContentHTML = getContentHTML;
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
                tmpTabCtlName = tmpTabName;
                if( theControlName ){
                    tmpTabName = theControlName + "-" + tmpTabName;
                }
                var tmpTabsHTML = [];
                var tmpColor = 'blue';
                if (tmpItem.color) {
                    tmpColor = tmpItem.color;
                }
                var tmpUseLayout = (tmpItem.layout === true);
                var tmpTabClasses = ' bottom attached slim ' + tmpColor + ' segment ';

                if (tmpUseLayout) {
                    tmpTabClasses = tmpColor;
                }

                var tmpSlim = '';
                if (tmpItem.slim === true) {
                    tmpSlim = 'slim'
                }

                tmpTabsHTML.push('<div class=" ui ' + tmpTabClasses + '  " >');
                for (var iTab = 0; iTab < tmpItem.tabs.length; iTab++) {
                    var tmpTab = tmpItem.tabs[iTab];
                    var tmpHidden = '';
                    var tmpActive = '';
                    if (iTab > 0) {
                        tmpHidden = ' hidden ';
                    } else {
                        tmpActive = ' active ';
                    }
                    tmpTabsHTML.push('<div controls tab appuse="cards" group="' + tmpTabName + '" item="' + tmpTab.name + '" class="pad0 ' + tmpHidden + '">');
                    tmpTabsHTML.push(getContentHTML(theControlName, tmpTab.content, theControlObj))
                    tmpTabsHTML.push('</div>');
                    tmpTabs.push('<a appuse="tablinks" group="' + tmpTabName + '" item="' + tmpTab.name + '" myaction="showSubPage" class="item ' + tmpColor + tmpActive + '">' + tmpTab.label + '</a>')
                }
                tmpTabsHTML.push('</div>');
                tmpTabs = tmpTabs.join('');
                
                if (tmpTabs) {
                    tmpTabs = '<div name="' + tmpTabName + '" item="' + tmpTabCtlName + '" controls tabs class="mar0 pad0 ui top attached tabular menu ' + tmpSlim + '" style="">' + tmpTabs + '</div>';
                    if (tmpUseLayout) {
                        tmpTabs = '<div ctlcomp="layout"><div class="ui-layout-north">' + tmpTabs + '</div>';
                    }
                }
                tmpHTML.push(tmpTabs);
                tmpTabsHTML = tmpTabsHTML.join('');
                if (tmpUseLayout) {
                    tmpTabsHTML = '<div class="ui-layout-center">' + tmpTabsHTML + '</div>';
                    tmpTabsHTML += '</div>';
                }
                tmpHTML.push(tmpTabsHTML);
            } else {
                tmpHTML.push(getHTMLForControl(tmpCtl, tmpItem, theControlObj))
            }
        }
        tmpHTML = tmpHTML.join('');
        return tmpHTML;
    }

    var ctlCounter = 0;
    function getNextCounter(){
        ctlCounter++;
        return ctlCounter;
    }
    me.getNextCounter = getNextCounter;

    
    //--- Internal use - creates index of all fields and items with a name;
    me._loadContentIndex = function (theItems, theOptionalIndex, theOptionalOutline) {

        var tmpIndex = theOptionalIndex || {
            fieldsList: [],
            itemsList: [],
            controls: {},
            required: {},
            outline: []
        }
        tmpIndex.errors = tmpIndex.errors || [];
        tmpIndex.locs = tmpIndex.locs || {};
        tmpIndex.all = tmpIndex.all || {};
        tmpIndex.entryList = tmpIndex.entryList || [];
        var tmpOL = theOptionalOutline || tmpIndex.outline;
        var tmpItems = theItems || [];
        if (!(tmpItems && tmpItems.length)) {
            return tmpIndex;
        }
        for (var iPos = 0; iPos < tmpItems.length; iPos++) {
            var tmpItem = tmpItems[iPos];
            if( !(tmpItem.name) ){
                var tmpItemName = 'untitled-' + getNextCounter();
                //tmpItem.tagname = tmpItemName;
                //--- Autoset missing name
                tmpItem.name = tmpItemName;
                tmpIndex.errors.push({errnum:1, text: 'All fields and items require a unique name for control.',tagname:'' + tmpItem.tagname, specs:tmpItem});
            }
            if( !(tmpItem.ctl) ){
                tmpItem.ctl = 'field';
                //tmpItem.tagname = tmpItem.name || tmpItem.tagname;
                tmpIndex.errors.push({errnum:2, text: 'All fields and items require a web control name (ctl).',tabname:'' + tmpItem.tagname});
            }
            var tmpCtl = tmpItem.ctl || 'field';
            var tmpThisObj = {
                ctl: tmpCtl,
                name: tmpItem.name || ''
            }
            tmpOL.push(tmpThisObj)
            var tmpControl = me.getWebControl(tmpCtl)
            var tmpType = me.getControlType(tmpCtl)
            tmpType = tmpType + 's';
            

            if (tmpItem.name) {
                var tmpName = tmpItem.name;

                tmpIndex.locs[tmpItem.name] = {in:theItems,pos:iPos};

                if (tmpCtl == 'control' || tmpCtl == 'panel') {
                    var tmpAppComp = tmpCtl;
                    tmpIndex.controls[tmpName] = tmpItem;
                    if (tmpControl && tmpItem.controlname && (!(tmpItem.source === 'parent'))) {
                        var tmpControlName = tmpItem.controlname;
                        var tmpCatalog = tmpItem.catalog || tmpItem.source || '';
                        if( tmpCatalog ){
                            if( ActionAppCore.dir.catalogs[tmpCatalog] ){
                                tmpCatalog = ActionAppCore.dir.catalogs[tmpCatalog];
                                tmpCatalog += tmpAppComp + 's/';
                                tmpControlName = tmpCatalog + tmpControlName;
                            } else {
                                var tmpControlType = "Control";
                                if( tmpAppComp == 'panel'){
                                    tmpControlType = "Panel";
                                }
                                
                                if( ActionAppCore.dir.catalogs.getResourceURL ){
                                    tmpControlName = ActionAppCore.dir.catalogs.getResourceURL(tmpCatalog,tmpControlType,tmpControlName)
                                } else {
                                    tmpControlName = ActionAppCore.dir.catalogs.getResourceCatalogURL(tmpCatalog,tmpControlType,tmpControlName)
                                }
                            }
                        }
                        tmpIndex.required[tmpCtl] = tmpIndex.required[tmpCtl] || {};
                        tmpIndex.required[tmpCtl].list = tmpIndex.required[tmpCtl].list || [];
                        tmpIndex.required[tmpCtl].list.push(tmpControlName)
                    }
                }
                var tmpToAdd = tmpItem;
                if (tmpIndex.all[tmpName]) {
                    tmpIndex.all[tmpName] = [tmpIndex.all[tmpName]];
                    console.error("Control content has the same name more than once for " + tmpName);
                    tmpIndex.errors.push({text: 'All fields and items require a control name (ctl).',name:'' + tmpItem.name});
                    tmpIndex.all[tmpName].push(tmpToAdd);
                } else {
                    tmpIndex.all[tmpName] = tmpToAdd;
                    tmpIndex[tmpType + 'List'].push(tmpName)
                    tmpIndex.entryList.push(tmpName)
                }
            }
            
            var tmpContentItems = ['items', 'tabs', 'content', 'center', 'north', 'south', 'east', 'west'];
            for (var aIndex in tmpContentItems) {
                var tmpContentItem = tmpContentItems[aIndex];
                if (tmpItem[tmpContentItem]) {
                    tmpThisObj.children = [];
                    me._loadContentIndex(tmpItem[tmpContentItem], tmpIndex, tmpThisObj.children);
                }
            }
        }
        tmpIndex.fields = tmpIndex.all;
        tmpIndex.items = tmpIndex.all;
        return tmpIndex;
    }

    var checkBoxAt = 0;
    var numLookup = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen"]

    me.getNumName = getNumName
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
    me.getItemAttrString = getItemAttrString
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
        return tmpRet;
    }
    me.getItemAttrObj = getItemAttrObj
    function getItemAttrObj(theObject) {
        if (!(theObject)) { return {} };
        return ActionAppCore.util.getAttrAsObject(getItemAttrString(theObject));
    }

    me.sources = ActionAppCore.sources;
    ActionAppCore.addSources({sys_grid_sizes: 'Default|,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16',
    sys_sizes_header: 'Default|,Tiny|tiny,Small|small,Medium|medium,Large|large,Huge|huge',
    sys_sizes: 'Default|,Mini|mini,Tiny|tiny,Small|small,Medium|medium,Large|large,Big|big,Huge|huge,Massive|massive',
    sys_colors: 'Default|,Red|red,Orange|orange,Yellow|yellow,Olive|olive,Green|green,Teal|teal,Blue|blue,Violet|violet,Purple|purple,Pink|pink,Brown|brown,Black|black',
    sys_alignment: 'Default|,Center|center aligned,Left|left aligned,Right|right aligned',
    sys_lralignment: 'Default|,Left|left aligned,Right|right aligned',
    sys_valignment: 'Default|,Top|top aligned,Middle|middle aligned,Bottom|bottom aligned',
    sys_float: 'Default|,Floated Left|floated left,Floated Right|floated right',
    sys_tofloat: 'Default|,Float Left|toleft,Float Right|toright',
    sys_attached: 'Default|,Top|top attached,Middle|attached,Bottom|bottom attached'
    });
    
    /**
     * addListSource
    *  - Returns a source list use for dropdown and other like controls
    * 
    * Example: 
    * ThisApp.controls.addListSource('tests','Test One|test1,Test Two|test2'); 
    * 
    * @param  {String} theName   [The name of the source to return]
    * @param  {String} theSourceString   String (see rules on how to supply this list)
    * @return void
    * 
    */    
    me.addListSource = function(theName, theSourceString ){
        me.sources[theName] = theSourceString;
    }
    me.getListSource = ActionAppCore.getListSource;

    me.processDynamicContent = processDynamicContent
    function processDynamicContent(theControlName, theObject, theControlObj) {
        var tmpRet = ThisApp.clone(theObject);
        var tmpContext = theControlObj.context || ThisApp.getContext();        
        for (var aFN in tmpRet) {
            var tmpObj = tmpRet[aFN];
            var tmpCompKey = '[computed]';
            
            if (isObj(tmpObj) && tmpObj.hasOwnProperty(tmpCompKey)) {
                var tmpComputed = tmpObj[tmpCompKey];
                if (isStr(tmpComputed)) {
                    tmpComputed = {
                        "context": tmpComputed
                    }
                }

                if (isObj(tmpComputed)) {
                    var tmpCompValue = '';
                    var tmpCompContext = tmpComputed.context || '';
                    if (tmpCompContext) {
                        try {
                            //--- Variables used in the eval statement, do not remove
                            var context = tmpContext;
                            var thisControl = theControlObj;
                            tmpCompValue = eval(tmpCompContext)
                        } catch (ex) {
                            console.warn("Attempt to us computed context value failed ", ex)
                        }
                    } else {
                        console.warn("No context passed for computed value, see documentation for details.")
                    }
                    tmpRet[aFN] = tmpCompValue;
                }

            }

        }
        return tmpRet
    }

    me.getDomSpecsForControl = getDomSpecsForControl
    function getDomSpecsForControl(theControlName, theObject, theControlObj) {
        var tmpDataObject = me.processDynamicContent(theControlName, theObject, theControlObj);
        var tmpControl = me.webControls.get(theControlName);
        if (!(tmpControl && tmpControl.getDomSpecs)) {
            console.error("No getDomSpecs for " + theControlName)
            return '';
        }
        return tmpControl.getDomSpecs(theControlName, tmpDataObject, theControlObj);
    }

    me.getHTMLForControl = getHTMLForControl
    function getHTMLForControl(theControlName, theObject, theControlObj) {
        var tmpHTML = [];
        tmpHTML.push('')
        if (!(theControlName)) {
            return '';
        }

        //---ToDo: Use index to determine of dynamic is needed
        //  also consider a type of dynamic that runs between preinit and init ???
        var tmpDataObject = me.processDynamicContent(theControlName, theObject, theControlObj);

        var tmpControl = me.webControls.get(theControlName);
        if (!(tmpControl && tmpControl.getHTML)) {
            console.error("No HTML for " + theControlName)
            return '';
        }

        tmpHTML.push(tmpControl.getHTML(theControlName, tmpDataObject, theControlObj))

        return tmpHTML.join('');
    }

    //--- Common Controls =========== =========== =========== =========== =========== ===========
    //--- =========== =========== =========== =========== =========== ===========

    // //----   COMMON ITEM CONTROLS - INFORMATION =================================
    //    **** No longer using this method for self docs

    me.catalogInfo = new Index();
    me.catalogInfo.add('color', {
        name: "color",
        label: "Select Color",
        datatype: "string",
        ctl: "dropdown",
        list: {source: 'sys_colors'},
        note: "No other options are valid for colors"
    })
    // me.catalogInfo.add('hidden', {
    //     name: "hidden",
    //     label: "Hidden",
    //     type: "boolean",
    //     notes: "Set to true to start initially hidden"
    // })
    // me.catalogInfo.add('icon', {
    //     name: "icon",
    //     label: "Icon Name",
    //     type: "string",
    //     notes: "Name of icon to use"
    // })
    // me.catalogInfo.add('size', {
    //     name: "size",
    //     label: "Semantic Size List",
    //     type: "string",
    //     ctl: "dropdown",
    //     list: ["mini", "tiny", "small", "large", "big", "huge", "massive"],
    //     notes: "No other options are valid for colors"
    // })

    // me.catalogInfo.add('compact', {
    //     name: "compact",
    //     label: "Compact mode",
    //     type: "boolean",
    //     notes: "Trim the space around it, making it more compact"
    // })

    // me.catalogInfo.add('floating', {
    //     name: "floating",
    //     label: "Floating look",
    //     type: "boolean",
    //     notes: "Adds a border to make it look higher than others"
    // })


    // //--- Field related ...
    // me.catalogInfo.add('fieldlabel', {
    //     name: "label",
    //     label: "Field Label",
    //     type: "string",
    //     notes: "Label to show"
    // })
    // me.catalogInfo.add('fieldlist', {
    //     name: "list",
    //     label: "List of values to select from",
    //     type: "string",
    //     notes: "String or array really, 'One|one,Two|two' can be used. "
    // })

    // me.catalogInfo.add('fieldsize', {
    //     name: "size",
    //     label: "Semantic Field Size Value",
    //     type: "number",
    //     notes: "From 1 to 16 using Fields / Form grid"
    // })

    // me.getCommonControlProperties = getCommonControlProperties;
    // function getCommonControlProperties(theCommonList) {
    //     var tmpCommonList = theCommonList || ['hidden'];
    //     var tmpRet = {}
    //     for (var iPos = 0; iPos < tmpCommonList.length; iPos++) {
    //         var tmpPropName = tmpCommonList[iPos];
    //         var tmpDetails = me.catalogInfo.get(tmpPropName);
    //         if (tmpPropName && tmpDetails) {
    //             tmpRet[tmpPropName] = tmpDetails;
    //         }
    //     }

    //     return tmpRet;
    // }


    //----   COMMON ITEM CONTROLS =================================
    me.getLayoutHTML = function(theSpecs, theSpotPrefix){
        var tmpObject = theSpecs || {};
        
        var tmpHTML = [];
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
        tmpHTML.push('<div ctlcomp="layout" ' + getItemAttrString(tmpObject) + ' class="' + tmpClasses + ' " ' + tmpStyle + '>')
    
        var tmpRegions = ['center', 'north', 'south', 'east', 'west'];
        for (var i = 0; i < tmpRegions.length; i++) {
            var tmpRegion = tmpRegions[i];
            var tmpRegionConfig = tmpObject[tmpRegion] || '';
            var tmpUseDefault = false;
            if (tmpRegionConfig === true) {
                tmpUseDefault = true;
            } else if ((!(tmpRegionConfig)) && tmpRegion == 'center') {
                //--- Always use a center
                tmpUseDefault = true;
            }
    
            if (tmpUseDefault) {
                tmpHTML.push('<div spot="' + theSpotPrefix + '-' + tmpRegion + '" class="ui-layout-' + tmpRegion + '"></div>')
            } else if (tmpRegionConfig) {
                if (!Array.isArray(tmpRegionConfig)) {
                    tmpRegionConfig = [tmpRegionConfig]
                }
                tmpHTML.push('<div class="ui-layout-' + tmpRegion + '">')
                tmpHTML.push('<div spot="' + theSpotPrefix + '-' + tmpRegion + '"></div>')
                tmpHTML.push('</div>')
            }
        }
    
        tmpHTML.push('</div>')
    
        tmpHTML = tmpHTML.join('');
        return tmpHTML;
    }

    me.ControlLayout = {
        getHTML: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};

            var tmpHTML = [];
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
            tmpHTML.push('<div ctlcomp="layout" ' + getItemAttrString(theObject) + ' class="' + tmpClasses + ' " ' + tmpStyle + '>')

            var tmpRegions = ['center', 'north', 'south', 'east', 'west'];
            for (var i = 0; i < tmpRegions.length; i++) {
                var tmpRegion = tmpRegions[i];
                var tmpRegionConfig = theObject[tmpRegion] || '';
                var tmpUseDefault = false;
                if (tmpRegionConfig === true) {
                    tmpUseDefault = true;
                } else if ((!(tmpRegionConfig)) && tmpRegion == 'center') {
                    //--- Always use a center
                    tmpUseDefault = true;
                }

                if (tmpUseDefault) {
                    tmpHTML.push('<div myspot="' + tmpRegion + '" class="ui-layout-' + tmpRegion + '"></div>')
                } else if (tmpRegionConfig) {
                    if (!Array.isArray(tmpRegionConfig)) {
                        tmpRegionConfig = [tmpRegionConfig]
                    }
                    tmpHTML.push('<div class="ui-layout-' + tmpRegion + '">')
                    tmpHTML.push(getContentHTML(theControlName, tmpRegionConfig, theControlObj))
                    tmpHTML.push('</div>')
                }
            }

            tmpHTML.push('</div>')

            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false
    }


    me.ControlDropMenu = {
        getHTML: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};

            var tmpHTML = [];
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

            var tmpIcon = 'dropdown';
            if (isStr(tmpObject.icon)) {
                tmpIcon = tmpObject.icon;
            }
            var tmpClasses = ''

            //tmpClasses += getValueIfTrue(theObject, ['compact', 'floating']);
            tmpClasses += getValueIfThere(theObject, ['color', 'size']);

            tmpHTML.push('<div dropmenu action="dropmenuopen" ' + getItemAttrString(theObject) + ' class="ui dropdown selection ' + tmpClasses + ' " ' + tmpStyle + '>')
            tmpHTML.push(tmpObject.text || tmpObject.html || tmpObject.title || '')

            if (tmpIcon) {
                tmpHTML.push(' <i class="' + tmpIcon + ' icon"></i>')
            }

            tmpHTML.push('	<div dropmenu="menu" style="display:none"><div class="menu fluid" tabindex="-1" style="display: block !important;">')
            var tmpItems = tmpObject.items || tmpObject.content || [];
            tmpHTML.push(getContentHTML(theControlName, tmpItems, theControlObj))
            tmpHTML.push('	</div></div>')

            tmpHTML.push('</div>')

            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false
    }

    me.ControlImage = {
        getHTML: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};

            var tmpHTML = [];

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

            tmpHTML.push('<div ' + getItemAttrString(theObject) + ' class="image ' + tmpClasses + ' " ' + tmpStyle + '>')
            if (tmpObject.src) {
                tmpHTML.push('<img src="' + tmpObject.src + '" />')
            }
            tmpHTML.push('</div>')

            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false
    }

    me.ControlMessage = {
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

            tmpClasses += getValueIfTrue(theObject, ['compact', 'floating']);
            tmpClasses += getValueIfThere(theObject, ['color', 'attached', 'size']);

            tmpHTML.push('<div ' + getItemAttrString(theObject) + ' class="ui message ' + tmpClasses + ' " ' + tmpStyle + '>')
            if (tmpObject.icon) {
                tmpHTML.push('<i class="' + tmpObject.icon + ' icon"></i>')
            }
            tmpHTML.push(tmpObject.text || tmpObject.html || tmpObject.title || '')

            tmpHTML.push('</div>')

            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false
    }

    me.ControlButton = {
        getDesignSpecs: function(theControlName, theOptions, theControlObj){ 
            var tmpPropList = ['name','ctl','classes','styles','hidden','text','color', 'size', 'basic']; 
			return tmpPropList
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

            var tmpClasses = '';
            tmpClasses += getValueIfTrue(theObject, ['basic', 'compact', 'fluid', 'right', 'labeled', 'circular', 'disabled']);
            tmpClasses += getValueIfThere(theObject, ['color', 'size', 'floated']);
            if ((tmpObject.toright || tmpObject.toRight) === true) {
                tmpClasses += ' right floated'
            } else if ((tmpObject.toleft || tmpObject.toLeft) === true) {
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
            } else if (isStr(tmpObject.myaction)) {
                tmpAction = ' myaction="' + tmpObject.myaction.trim() + '" ';
            }

            tmpHTML.push('<button desuse="disable" type="button" ' + tmpAction + getItemAttrString(theObject) + ' class="ui button ' + tmpClasses + ' " ' + tmpStyle + '>')

            if (tmpObject.icon && !(tmpObject.right)) {
                tmpHTML.push('<i class="' + tmpObject.icon + ' icon"></i> ');
            }

            tmpHTML.push(tmpObject.text || tmpObject.label || tmpObject.title || '')

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

    me.ControlDivider = {
        getDesignSpecs: function(theControlName, theOptions, theControlObj){ 
            var tmpPropList = ['name','ctl','classes','styles','hidden','text','color', 'size', 'alignment']; 
			return tmpPropList
		},
        getHTML: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};
            var tmpLevel = '';
            if (theObject.level) {
                tmpLevel = theObject.level
            }

            var tmpHTML = [];

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

            var tmpDivider = '';
            if (theControlName !== 'title') {
                tmpDivider = ' divider'
            }

            var tmpText = tmpObject.text || tmpObject.html || tmpObject.title || '';

            var tmpClasses = tmpObject.classes || '';
            tmpClasses += getValueIfTrue(theObject, ['inverted', 'fitted', 'hidden', 'section', 'clearing']);
            tmpClasses += getValueIfThere(theObject, ['color', 'attached', 'size','aligned']);

            var tmpStarter = 'h' + tmpLevel;
            var tmpHoriz = '';
            //-- If plain, use plainer markup
            if (!tmpLevel && !tmpObject.icon && !tmpText) {
                tmpStarter = "div"
            } else {
                tmpLevel = tmpLevel || '3';

                tmpHoriz = ' horizontal';
            }
            if (tmpLevel) {
                tmpClasses += ' header '
            }

            tmpClasses += tmpDivider;

            tmpHTML = [];
            tmpHTML.push('<' + tmpStarter + tmpLevel + getItemAttrString(theObject) + ' class="ui' + tmpHoriz + '  ' + tmpClasses + '" ' + tmpStyle + '>')
            if (tmpObject.icon) {
                tmpHTML.push('<i class="' + tmpObject.icon + ' icon"></i>&nbsp;&nbsp;')
            }

            tmpHTML.push(tmpText)
            tmpHTML.push('</' + tmpStarter + tmpLevel + '>')

            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false
    }

    
    me.ControlPanel = {
        getHTML: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};
            var tmpHTML = [];
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

            var tmpClass = tmpObject.class || '';
            var tmpControlClass = tmpClass || theControlName;
            var tmpClasses = tmpObject.classes || '';
            if (tmpObject.centered) {
                tmpClasses += 'center aligned';
            }
            tmpClasses += getValueIfTrue(theObject, ['link', 'fluid', 'placeholder', 'raised', 'tall', 'stacked', 'piled', 'vertical', 'loading', 'inverted', 'bottom', 'top', 'attached', 'padded', 'slim', 'compact', 'secondary', 'tertiary', 'circular', 'clearing', 'right', 'left', 'center', 'aligned', 'basic']);
            tmpClasses += getValueIfThere(theObject, ['color', 'icon', 'size']);

            tmpHTML = [];
            tmpHTML.push('<div ' + getItemAttrString(theObject) + ' class="ui ' + tmpControlClass + ' ' + tmpClasses + '" ' + tmpStyle + '>')

            var tmpItems = tmpObject.items || tmpObject.content || [];
            tmpHTML.push(getContentHTML(theControlName, tmpItems, theControlObj))

            tmpHTML.push('</div>')

            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false
    }

    me.ControlDOM = {
        getHTML: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};
            var tmpHTML = [];
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

            var tmpControlElem = theControlName || 'div';
            var tmpClasses = tmpObject.classes || '';

            var tmpStyle = tmpObject.style || tmpObject.styles || tmpObject.css || '';
            if (tmpHidden) {
                tmpStyle += tmpHidden;
            }
            if (tmpStyle) {
                tmpStyle = ' style="' + tmpStyle + '" '
            }

            tmpHTML = [];
            tmpHTML.push('<' + tmpControlElem + ' ' + getItemAttrString(theObject) + ' class=" ' + tmpClasses + '" ' + tmpStyle + '>')

            tmpHTML.push(tmpObject.text || tmpObject.html || '')

            var tmpItems = tmpObject.items || tmpObject.content || [];
            if (tmpItems) {
                tmpHTML.push(getContentHTML(theControlName, tmpItems, theControlObj))
            }

            tmpHTML.push('</' + tmpControlElem + '>')
            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false
    }


    me.SemanticElement = {
        getDesignSpecs: function(theControlName, theOptions, theControlObj){ 
			//var tmpPropList = ['name','ctl','classes','styles','hidden','text','color', 'icon', 'size', 'alignment', 'attached', 'clearing','floating', 'dividing', 'block', 'link', 'fluid', 'placeholder', 'raised', 'tall', 'stacked', 'piled', 'vertical', 'loading', 'inverted', 'bottom', 'top', 'attached', 'padded', 'slim', 'compact', 'secondary', 'tertiary', 'circular', 'clearing', 'right', 'left', 'center', 'aligned', 'basic']; 
            var tmpPropList = ['name','ctl','classes','styles','hidden','text','color', 'size', 'alignment']; 
			return tmpPropList
		},
        //--- Concept of returning details to use in the designer
        //  --- for stuff that can't be gleaned from the specs
        // ----** Maybe add to the specs instead to save a call?
        getDesignerDetails: function (theControlName, theObject, theControlObj, theIsUI){
            return {}
        },
        getHTMLForDesign: function (theControlName, theObject, theControlObj, theIsUI){
            return "DEIGN"
        },
        getDomSpecs: function (theControlName, theObject, theControlObj, theIsUI) {
            var tmpObject = theObject || {};
            var tmpRet = {};
            var tmpStyles = {};
            var tmpHidden = '';
            if (tmpObject.hidden === true) {
                tmpStyles.display = 'none';
            }
            var tmpStyle = tmpObject.style || tmpObject.styles || tmpObject.css || '';
            if (tmpHidden) {
                tmpStyle += tmpHidden;
            }
            if (tmpStyle) {
                tmpRet.style = tmpStyle;
            }

            var tmpControlClass = theControlName;
            var tmpClasses = tmpObject.classes || '';
            tmpClasses += getValueIfTrue(theObject, ['floating', 'dividing', 'block', 'link', 'fluid', 'placeholder', 'raised', 'tall', 'stacked', 'piled', 'vertical', 'loading', 'inverted', 'bottom', 'top', 'attached', 'padded', 'slim', 'compact', 'secondary', 'tertiary', 'circular', 'clearing', 'right', 'left', 'center', 'aligned', 'basic']);
            tmpClasses += getValueIfThere(theObject, ['color', 'icon', 'size', 'alignment', 'attached']);
            if( theIsUI!==false ){
                tmpClasses += ' ui';
            }
            tmpClasses += ' ' + tmpControlClass;
            tmpRet.className = tmpClasses.trim(); //string ok

            var tmpType = 'div';
            var tmpAttrs = getItemAttrObj(theObject);
            if( tmpAttrs ){
                tmpRet.attr = tmpAttrs;
            }
            var tmpTextContent = tmpObject.text || tmpObject.html || '';
            var tmpContentArray = tmpObject.items || tmpObject.content;
            var tmpContentSpecs = false;
            if (tmpContentArray) {
                tmpContentSpecs = getContentDomSpecs(theControlName, tmpContentArray, theControlObj);
                tmpRet.children = tmpContentSpecs;
            }
            tmpRet.text = tmpTextContent;
            return tmpRet;
        },
        getHTML: function (theControlName, theObject, theControlObj, theIsUI) {
            //--> Concept of having the control send alternate output for designer
            // if( theControlObj.__inDesignMode ){
            //     return this.getHTMLForDesign(theControlName, theObject, theControlObj, theIsUI)
            // }
            var tmpDomSpecs = this.getDomSpecs(theControlName, theObject, theControlObj, theIsUI);
            return ActionAppCore.el(tmpDomSpecs).outerHTML
            // var tmpObject = theObject || {};
            // var tmpHTML = [];
            // var tmpHidden = '';
            // if (tmpObject.hidden === true) {
            //     tmpHidden = 'display:none;';
            // }
            // var tmpStyle = tmpObject.style || tmpObject.styles || tmpObject.css || '';
            // if (tmpHidden) {
            //     tmpStyle += tmpHidden;
            // }
            // if (tmpStyle) {
            //     tmpStyle = ' style="' + tmpStyle + '" '
            // }

            // var tmpClass = tmpObject.class || '';
            // var tmpControlClass = theControlName;
            // var tmpClasses = tmpObject.classes || '';
            // tmpClasses += getValueIfTrue(theObject, ['floating', 'dividing', 'block', 'link', 'fluid', 'placeholder', 'raised', 'tall', 'stacked', 'piled', 'vertical', 'loading', 'inverted', 'bottom', 'top', 'attached', 'padded', 'slim', 'compact', 'secondary', 'tertiary', 'circular', 'clearing', 'right', 'left', 'center', 'aligned', 'basic']);
            // tmpClasses += getValueIfThere(theObject, ['color', 'icon', 'size', 'alignment', 'attached']);

            // var tmpUI = (theIsUI!==false) ? 'ui ' : '';

            // tmpHTML = [];
            // tmpHTML.push('<div ' + getItemAttrString(theObject) + ' class="' + tmpUI + ' ' + tmpControlClass + ' ' + tmpClasses + '" ' + tmpStyle + '>')

            // tmpHTML.push(tmpObject.text || tmpObject.html || '')

            // var tmpItems = tmpObject.items || tmpObject.content || [];
            // if (tmpItems) {
            //     tmpHTML.push(getContentHTML(theControlName, tmpItems, theControlObj))
            // }

            // tmpHTML.push('</div>')
            // tmpHTML = tmpHTML.join('');
            // return tmpHTML;

        },
        isField: false
    }

    me.ControlElement = {
        getHTML: function (theControlName, theObject, theControlObj, theIsUI) {
            var tmpObject = theObject || {};
            var tmpHTML = [];
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

            var tmpClass = tmpObject.class || '';
            var tmpControlClass = tmpClass || theControlName;
            var tmpClasses = tmpObject.classes || '';

            var tmpUI = (theIsUI!==false) ? 'ui ' : '';

            tmpHTML = [];
            tmpHTML.push('<div ' + getItemAttrString(theObject) + ' class="' + tmpUI + ' ' + tmpControlClass + ' ' + tmpClasses + '" ' + tmpStyle + '>')

            tmpHTML.push(tmpObject.text || tmpObject.html || '')

            var tmpItems = tmpObject.items || tmpObject.content || [];
            if (tmpItems) {
                tmpHTML.push(getContentHTML(theControlName, tmpItems, theControlObj))
            }

            tmpHTML.push('</div>')
            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false
    }

    // //--- UI Elements
    // me.ControlElementUI = {
    //     getHTML: function (theControlName, theObject, theControlObj) {
    //         return me.ControlElement.getHTML(theControlName, theObject, theControlObj, true)
    //     },
    //     isField: false
    // }


    me.ControlFieldRow = {
        getHTML: function (theControlName, theObject, theControlObj) {

            var tmpObject = theObject || {};
            var tmpHTML = [];
            var tmpFieldCount = 0;
            var tmpType = '';
            if (isStr(theObject.type)) {
                tmpType = theObject.type;
            }
            var tmpReq = '';
            if (tmpObject.req === true) {
                tmpReq = ' required ';
            }
            if (tmpObject.inline === true) {
                tmpType = 'inline';
            }
            if (tmpObject && tmpObject.items && tmpObject.items.length) {
                tmpFieldCount = tmpObject.items.length

            }


            tmpHTML.push('<div ' + getItemAttrString(theObject) + ' class="field ' + tmpReq + tmpType + '">')

            if (isStr(theObject.label)) {
                tmpHTML.push('<label>')
                tmpHTML.push(theObject.label || '')
                tmpHTML.push('</label>')
            }

            //
            tmpHTML.push('  <div class="' + getNumName(tmpFieldCount) + ' ' + tmpType + ' fields">');
            for (var iPos = 0; iPos < tmpObject.items.length; iPos++) {
                var tmpItem = tmpObject.items[iPos];
                var tmpCtl = tmpItem.ctl || 'field'
                tmpItem = ThisApp.clone(tmpItem);
                tmpHTML.push(getHTMLForControl(tmpCtl, tmpItem, theControlObj))
            }

            tmpHTML.push('  </div>')
            tmpHTML.push('</div>')

            return tmpHTML.join('');

        },
        isField: false
    }



    //--- Create a spot for this live element
    me.ControlPanelAndControl = {
        getHTML: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};
            var tmpName = tmpObject.name || tmpObject.controlname || ('control-res-' + me.getGlobalCounter());
            var tmpControlName = tmpObject.controlname || tmpObject.resourcename || tmpObject.name || '';

            if (!(tmpControlName)) {
                console.warn("Could not create control, no control name or name. ", theControlName, theObject)
                return '';
            }
            var tmpClasses = tmpObject.class || tmpObject.classes || '';
            var tmpStyles = tmpObject.style || tmpObject.styles || '';
            
            var tmpHTML = [];

            if (tmpObject.hidden === true) {
                tmpClasses += ' hidden ';
            }

            var tmpAppComp = theControlName;
            var tmpControlType = ThisApp.controls.getUnifiedName(tmpAppComp);
            var tmpItem = tmpObject;

            var tmpCatalog = tmpItem.catalog || tmpItem.source || '';
            if( tmpCatalog ){
                if( ActionAppCore.dir.catalogs[tmpCatalog] ){
                    tmpCatalog = ActionAppCore.dir.catalogs[tmpCatalog];
                    tmpCatalog += tmpAppComp + 's/';
                    tmpControlName = tmpCatalog + tmpControlName;
                } else {
                    if( ActionAppCore.dir.catalogs.getResourceURL ){
                        tmpControlName = ActionAppCore.dir.catalogs.getResourceURL(tmpCatalog,tmpControlType,tmpControlName)
                    } else {
                        tmpControlName = ActionAppCore.dir.catalogs.getResourceCatalogURL(tmpCatalog,tmpControlType,tmpControlName)
                    }
                }
            }
            var tmpMyAttr = ' name="' + tmpName + '" ctlcomp="' + tmpAppComp + '" ' + 'controlname="' + tmpControlName + '" '
            if( tmpItem.templatename ){
                tmpMyAttr += ' templatename="' + tmpItem.templatename + '"'
            }
            tmpHTML.push('<div desuse="hide" ' + getItemAttrString(theObject) + ' class="' + tmpClasses + '" style="' + tmpStyles + '" ' + tmpMyAttr + '></div>')
            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false
    }

    me.ControlSpot = {
        getHTML: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};
            var tmpName = tmpObject.spotname || tmpObject.name || 'default-spot';
            var tmpClasses = tmpObject.class || tmpObject.classes || '';
            var tmpStyles = tmpObject.style || tmpObject.styles || '';
            var tmpHTML = [];

            var tmpSpotAttr = 'myspot'
            if (theControlName == 'pagespot') {
                tmpSpotAttr = 'pagespot'
            }
            tmpHTML.push('<div desuse="hide" ' + getItemAttrString(theObject) + ' class="' + tmpClasses + '" style="' + tmpStyles + '" ' + tmpSpotAttr + '="' + tmpName + '">')

            tmpHTML.push(tmpObject.text || tmpObject.html || '')

            var tmpItems = tmpObject.items || tmpObject.content || [];
            if (tmpItems) {
                tmpHTML.push(getContentHTML(theControlName, tmpItems, theControlObj))
            }

            tmpHTML.push('</div>')
            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false
    }


    //--- Tabs are handled in code at a higher level ***
    me.ControlTabs = {
        getHTML: function (theControlName, theObject, theControlObj) {
            return '';
        },
        isField: false
    };

    me.ControlTab = {
        getHTML: function (theControlName, theObject, theControlObj) {
            return '';
        },
        isField: false
    };

    //----   COMMON FIELD CONTROLS =================================
    me.ControlField = {
        getDesignSpecs: function(theControlName, theOptions, theControlObj){ 
            if( theControlName == 'hidden'){
                return ['name','ctl','default'];
            }
			var tmpPropList = ['name','ctl','label','req','classes','styles','hidden','note','noteColor','placeholder']; 
			return tmpPropList
		},
        setFieldNote: commonSetFieldNote, setFieldMessage: commonSetFieldMessage,
        getHTML: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};
            var tmpHTML = [];
            //---> ToDo: Add value and default value to other fields *****
            var tmpAutoIcon = '';
            var tmpAppComp = '';
            var tmpIsDate = false;
            
            var tmpDateType = '';

            if( theControlName == 'date'){
                tmpDateType = 'date';
            } else if( theControlName == 'time'){
                tmpDateType = 'time';
            } else if( theControlName == 'datetime'){
                tmpDateType = 'datetime-local';
            }
            if( tmpAutoIcon ){
                tmpIsDate = true;
                tmpAppComp = 'date';
            } else if( tmpDateType ){
                tmpIsDate = true;
            }
            var tmpValue = tmpObject.default || '';
            //ToDo: Only do this to tmpObject.default ??
            if( tmpValue === undefined || tmpValue === 'undefined'){
                tmpValue = '';
            }
            tmpValue = tmpObject.value || tmpValue;

            var tmpIcon = tmpObject.icon || tmpAutoIcon || '';

            var tmpSizeName = '';
            if (tmpObject.size && tmpObject.size > 0 && tmpObject.size < 17) {
                tmpSizeName = getNumName(tmpObject.size)
                tmpSizeName = ' ' + tmpSizeName + ' wide ';
            }
            var tmpReq = '';
            if (tmpObject.req === true) {
                tmpReq = ' required ';
            }
            var tmpItems = tmpObject.items || tmpObject.content || [];
            if (tmpValue) {
                tmpValue = ' value="' + tmpValue + '" ';
            }
            var tmpFieldOrInput = 'field';
            if (theObject.input === true) {
                tmpFieldOrInput = 'input';
            }
            //--- All input fields with content (buttons) are input style
            if (tmpItems && tmpItems.length > 0) {
                tmpFieldOrInput = 'input';
            }
            var tmpInputClasses = tmpObject.inputClasses || '';
            tmpInputClasses += getValueIfTrue(theObject, ['fit']);
            if( tmpIsDate ){
                tmpInputClasses += ' showborder';
            }
            
            if (tmpInputClasses) {
                tmpInputClasses = ' class="' + tmpInputClasses + '" '
            }
            var tmpClasses = ''
            tmpClasses += getValueIfTrue(theObject, ['compact', 'fluid']);
            tmpClasses += getValueIfThere(theObject, ['color', 'size']);

            var tmpHidden = '';
            if (tmpObject.hidden === true || theControlName == 'hidden') {
                tmpHidden = ' display:none; ';
            }
            var tmpStyle = tmpObject.style || tmpObject.styles || tmpObject.css || '';
            if (tmpHidden) {
                tmpStyle += tmpHidden;
            }
            if (tmpStyle) {
                tmpStyle = ' style="' + tmpStyle + '" '
            }

            // theControlObj.readonly = true;
            var tmpDispOnly = (tmpObject.readonly === true);
            var tmpSpecs = theControlObj.getConfig();
            if (tmpSpecs && tmpSpecs.options && tmpSpecs.options.readonly === true) {
                tmpDispOnly = true;
            }
            if (theControlObj.readonly === true) {
                tmpDispOnly = true;
            }
            var tmpReadOnly = '';
            var tmpFieldType = 'text';
            if (tmpDispOnly) {
                tmpReq = '';
                tmpReadOnly = ' readonly ';
            }
            if (theControlName == 'hidden') {
                tmpFieldType = 'hidden';
                tmpStyle = "";
            } else if (theControlName == 'number') {
                tmpFieldType = 'number';
            } else if (theControlName == 'color') {
                tmpFieldType = 'color';
            }

            var tmpIsMultiFlag = '';
            if (tmpObject.multiple === true) {
                tmpIsMultiFlag = ' multiple="multiple" ';
            }

            if (tmpIcon || (tmpItems && tmpItems.length > 0)) {
                tmpHTML.push('<div class="ui field">');
            }

            var tmpInnerClasses = '';
            if( tmpIcon ){
                tmpInnerClasses += ' input icon';
            }

            var tmpAttrs = '';
            if( tmpObject.attrs && typeof(tmpObject.attrs) == 'string' ){
                tmpAttrs = tmpAttrs;
            }
            if( tmpAppComp ){
                tmpAttrs += ' appcomp="' + tmpAppComp + '"';
                if( tmpIsDate ){
                    tmpAttrs += ' dateformat="' + tmpDateFormat + '"';
                    
                }
            }


            tmpAttrs += ' desuse="disable" ';

            tmpHTML.push('<div controls fieldwrap name="' + theObject.name + '" class="' + tmpClasses + tmpSizeName + tmpReq + ' ui ' + tmpFieldOrInput + '" ' + tmpStyle + '>');
            if (theObject.label) {
                tmpHTML.push('<label>');
                tmpHTML.push(theObject.label || '');
                tmpHTML.push('</label>');
            }
            
            if (tmpIcon){
                tmpHTML.push('<div class="ui ' + tmpInnerClasses + ' field">');
            }
            var tmpPH = '';
            if ((!tmpDispOnly) && theObject.placeholder !== false) {
                if (typeof (theObject.placeholder) == 'string') {
                    tmpPH = theObject.placeholder;
                }
                tmpPH = ' placeholder="' + tmpPH + ' ';
            }
            if( tmpIsDate && tmpDateType ){
                tmpFieldType = tmpDateType;
            }
            tmpHTML.push('<input ' + tmpAttrs + tmpReadOnly + tmpInputClasses + ' type="' + tmpFieldType + '" controls field ' + tmpValue + ' name="' + theObject.name + '" ' + tmpIsMultiFlag + tmpPH + '">')
            tmpHTML.push('</input>')
            if( tmpIcon ){
                tmpHTML.push('<i class="' + tmpIcon + ' icon"></i>');
            }
            if (theControlName !== 'hidden') {
                tmpHTML.push(getNoteMarkup(theObject));
                tmpHTML.push(getContentHTML(theControlName, tmpItems, theControlObj));
            }
            tmpHTML.push('</div>');
            if (tmpIcon || (tmpItems && tmpItems.length > 0)) {
                tmpHTML.push('</div>');
            }
            if (tmpIcon){
                tmpHTML.push('</div>');
            }

            tmpHTML = tmpHTML.join('');
            return tmpHTML;
        },
        setFieldValue: function (theFieldEl, theValue, theFieldSpecs) {
			if( typeof(theValue) == 'object') {
				theValue = JSON.stringify(theValue);
			}
			theFieldEl.val(theValue);
        },
        getFieldValue: function (theControlEl, theFieldSpecs) {
            //ToDo: Check DataType
            tmpRet = me._getControlData(theControlEl, theFieldSpecs.name);
            if( typeof(tmpRet) == 'string'){
                if( tmpRet.substr(0,1) == '{'){
                    try {
                        tmpRet = JSON.parse(tmpRet);
                    } catch (error) {}
                }
            }
            return tmpRet;
        },
        isField: true
    }


    me.ControlDropDown = {
        getDesignSpecs: function(theControlName, theOptions, theControlObj){ 
			var tmpPropList = ['name','ctl','label','req','classes','styles','hidden','note','noteColor','placeholder','list','multi']; 
			return tmpPropList
		},
        setFieldNote: commonSetFieldNote, setFieldMessage: commonSetFieldMessage,
        getHTML: function (theControlName, theObject, theControlObj) {

            var tmpObject = theObject || {};
            var tmpHTML = [];

            var tmpReq = '';
            if (tmpObject.req === true) {
                tmpReq = ' required ';
            }

            var tmpMulti = '';
            if (tmpObject.multi === true) {
                tmpMulti = 'multiple';
            }

            var tmpDispOnly = (tmpObject.readonly === true);
            var tmpSpecs = theControlObj.getConfig();
            if (tmpSpecs && tmpSpecs.options && tmpSpecs.options.readonly === true) {
                tmpDispOnly = true;
            }
            if (theControlObj.readonly === true) {
                tmpDispOnly = true;
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

            var tmpDDAttr = '';

            if (tmpDispOnly) {
                tmpDDAttr += ' disabled full ';
                tmpReq = '';
            }
            var tmpSizeName = '';
            if (tmpObject.size && tmpObject.size > 0 && tmpObject.size < 17) {
                tmpSizeName = getNumName(tmpObject.size)
                tmpSizeName = ' ' + tmpSizeName + ' wide ';
            }
            tmpHTML.push('<div controls fieldwrap name="' + theObject.name + '" class="' + tmpSizeName + tmpReq + ' field" ' + tmpStyle + '>')
            if (theObject.label) {
                tmpHTML.push('<label>')
                tmpHTML.push(theObject.label || '')
                tmpHTML.push('</label>')
            }
            var tmpPH = '';
            if (theObject.placeholder !== false) {
                tmpPH = theObject.label || ''

                if (typeof (theObject.placeholder) == 'string') {
                    tmpPH = theObject.placeholder;
                }
                tmpPH = ' placeholder="' + tmpPH + ' ';
            }
            //--- Add field specific content here
            var tmpDefaultValHTML = '';
            if (tmpObject.default != '' && tmpObject.default !== undefined && tmpObject.default !== 'undefined') {
                tmpDefaultValHTML = ' value="' + tmpObject.default + '" ';
            }
            tmpHTML.push('\n            <div ctlcomp="dropdown" class="ui selection ' + tmpDDAttr + tmpMulti + ' dropdown">')
            tmpHTML.push('\n                <div class="default text">Select</div>')
            tmpHTML.push('\n                <i class="dropdown icon"></i>')
            tmpHTML.push('\n                <input ' + tmpDefaultValHTML + ' controls field type="hidden" name="' + theObject.name + '" >')
            tmpHTML.push('\n                <div class="menu">')
            var tmpList = ActionAppCore.getListAsArrays(theObject.list);

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

                        tmpHTML.push('\n                  <div class="item" data-value="' + tmpVal + '">' + tmpText + '</div>')
                    }
                }
            }

            tmpHTML.push('\n                </div>')
            tmpHTML.push('\n              </div>')

            tmpHTML.push(getNoteMarkup(theObject));
            tmpHTML.push('</div>')

            tmpHTML = tmpHTML.join('');
            return tmpHTML;
        },
        getFieldValue: function (theControlEl, theFieldSpecs) {
            //ToDo: Check DataType

            //--- Really this can be left out and it will use this by default
            //--   adding this to show how to return values for custom fields that are not based on simple / standard form logic
            if (theControlEl && theFieldSpecs) {
                var tmpData = me._getControlData(theControlEl, theFieldSpecs.name);
                if (theFieldSpecs.multi === true && isStr(tmpData)) {
                    if (tmpData) {
                        tmpData = tmpData.split(',');
                    } else {
                        tmpData = [];
                    }

                }
                return tmpData;
            }
            return '';
        },
        setFieldList: function (theFieldEl, theList, theFieldSpecs) {
            var tmpCtlEl = theFieldEl.closest('[ctlcomp]');
            var tmpList = getListAsObjects(theList || '');
            var tmpVal = '';
            if( tmpCtlEl && tmpCtlEl.dropdown ){
                tmpVal = tmpCtlEl.dropdown('get value');
            }
            tmpCtlEl.dropdown('change values', tmpList);
            tmpCtlEl.dropdown('set selected',tmpVal);
        },
        setFieldValue: function (theFieldEl, theValue, theFieldSpecs) {
            var tmpCtlEl = theFieldEl.closest('[ctlcomp]');
            if( theValue === ''){
                tmpCtlEl.dropdown('clear');
            } else {
                if (theFieldSpecs.multi === true) {
                    var tmpValues = theValue || '';
                    if (isStr(tmpValues)) {
                        tmpValues = tmpValues.split(",")
                    }
                    tmpCtlEl.dropdown('set exactly', tmpValues);
                } else {
                    tmpCtlEl.dropdown('set selected', theValue);
                }
            }
            
        },
        isField: true
    }



    me.ControlCheckboxList = {
        getDesignSpecs: function(theControlName, theOptions, theControlObj){ 
			var tmpPropList = ['name','ctl','label','req','classes','styles','hidden','note','noteColor','placeholder','list','row']; 
			return tmpPropList
		},
        getHTML: getHTMLforCheckboxList,
        setFieldValue: function (theFieldEl, theValue, theFieldSpecs, theIsReadOnly) {
            var tmpValues = theValue || '';
            if (theIsReadOnly) {
                theFieldEl.val(theValue);
                return;
            }
            if( theFieldSpecs.ctl == 'checkbox'){
                //ToDo: Change to the only list choice
                if( tmpValues ){
                    tmpValues = 'yes';
                } else {
                    tmpValues = '';
                }
            }
            if (isStr(tmpValues)) {
                tmpValues = tmpValues.split(",")
            }
            if (theFieldEl.length) {
                for (var iPos = 0; iPos < theFieldEl.length; iPos++) {
                    var tmpEl = (theFieldEl[iPos]);

                    var tmpCheckValue = $(tmpEl).attr('data-value');
                    tmpEl.checked = (tmpValues.indexOf(tmpCheckValue) > -1)
                }

            }
            return true;
        },
        getFieldValue: function (theControlEl, theFieldSpecs) {
            //ToDo: Check DataType
            tmpRet = me._getControlData(theControlEl, theFieldSpecs.name);
            if( theFieldSpecs.ctl == 'checkbox'){
                var tmpCheckVal = tmpRet;
                if( Array.isArray(tmpCheckVal) ){
                    tmpCheckVal = tmpCheckVal[0];
                }
                if( (tmpCheckVal) ){
                  return true;  
                }
                return false;
            }
            return tmpRet;
        },
        isField: true
    }


    me.ControlRadioList = {
        getDesignSpecs: function(theControlName, theOptions, theControlObj){ 
			var tmpPropList = ['name','ctl','label','req','classes','styles','hidden','note','noteColor','placeholder','list','row']; 
			return tmpPropList
		},
        getHTML: getHTMLforCheckboxList,
        setFieldValue: function (theFieldEl, theValue, theFieldSpecs, theIsReadOnly) {
            if (theIsReadOnly) {
                theFieldEl.val(theValue);
                return;
            }
            if (theFieldEl.length) {
                for (var iPos = 0; iPos < theFieldEl.length; iPos++) {
                    var tmpEl = (theFieldEl[iPos]);
                    var tmpCheckValue = $(tmpEl).attr('data-value');
                    tmpEl.checked = (theValue == tmpCheckValue);
                }
            }
            return true;
        },
        getFieldValue: function (theControlEl, theFieldSpecs) {
            //ToDo: Check DataType
            tmpRet = me._getControlData(theControlEl, theFieldSpecs.name);
            if( theFieldSpecs.datatype && theFieldSpecs.datatype == 'boolean' ){
                var tmpChk = (''+tmpRet);
                if( tmpChk == '' ){
                    if( typeof(theFieldSpecs.default) == 'boolean'){
                        tmpChk = theFieldSpecs.default;
                    }
                    return false;
                }
                if( tmpChk == 'true' || tmpChk == 'True' || tmpChk == 'yes' || tmpChk == 'Yes' || tmpChk == '1'){
                    return true;
                }
                if( tmpChk == 'false' || tmpChk == 'False' || tmpChk == 'no' || tmpChk == 'No' || tmpChk == '0'){
                    return false;
                }
            }
            return tmpRet;
        },
        isField: true
    }

    function getHTMLforCheckboxList(theControlName, theObject, theControlObj) {
        var tmpObject = theObject || {};
        var tmpHTML = [];
        var tmpRorC = 'checkbox';
        var tmpRadioStr = '';

        var tmpDefaultValue = '';
        if (tmpObject.default != '' && tmpObject.default !== undefined && tmpObject.default !== 'undefined') {
            tmpDefaultValue = tmpObject.default;
        }

        var tmpGorI = 'grouped';
        if (tmpObject.row === true || tmpObject.inline === true) {
            tmpGorI = 'inline';
        }

        var tmpReq = '';
        if (tmpObject.req === true) {
            tmpReq = ' required ';
        }

        //--- Starts with radio
        if (theControlName.indexOf('radio') == 0) {
            tmpRorC = 'radio';
            tmpRadioStr = ' radio ';
        }
        var tmpType = '';
        if (tmpObject.type && isStr(tmpObject.type)) {
            tmpType = tmpObject.type;
            if (tmpType == 'standard') {
                tmpType = '';
            }
        } else {
            tmpType = "default";
        }

        if (tmpType == "default") {
            if (tmpRorC == 'radio') {
                tmpType = 'toggle';
            } else {
                tmpType = 'slider';
            }
        }
        if ((tmpType) && tmpRadioStr) {
            tmpRadioStr = '';
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

        var tmpDispOnly = false;
        var tmpSpecs = theControlObj.getConfig();
        if (tmpSpecs && tmpSpecs.options && tmpSpecs.options.readonly === true) {
            tmpDispOnly = true;
        }


        tmpHTML = [];
        tmpHTML.push('<div controls="" fieldwrap="" name="' + tmpObject.name + '" class="fields grouped" ' + tmpStyle + '>')

        if (tmpDispOnly) {
            tmpReq = '';
        }
        if (tmpObject.label) {
            tmpHTML.push('<div class="field ' + tmpReq + '"><label>')
            tmpHTML.push(tmpObject.label || '')
            tmpHTML.push('</label></div>')
        }

        if (tmpDispOnly) {

            tmpHTML.push('	<div class="field">')

            var tmpValue = theControlObj.getFieldValue(tmpObject.name);
            tmpHTML.push('<input readonly type="text" controls field value="' + tmpValue + '" name="' + tmpObject.name + '">')
            tmpHTML.push('</input>')

            tmpHTML.push('	</div>')
        } else {
            tmpHTML.push('  <div class="fields ' + tmpGorI + '">')

            var tmpList = ActionAppCore.getListAsArrays(tmpObject.list || '');

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
                        var tmpFieldID = 'fld-cb-auto-' + (checkBoxAt++);
                        var tmpChecked = '';
                        //ToDo: Support multiple value default for checkbox (and multi dropdown);
                        if( tmpVal == tmpDefaultValue ){
                            tmpChecked = ' checked="true" ';
                        }

                        tmpHTML.push('	<div class="field">')
                        tmpHTML.push('	  <div class="ui ' + tmpRadioStr + tmpType + ' checkbox">')
                        tmpHTML.push('		<input controls field id="' + tmpFieldID + '" type="' + tmpRorC + '" ' + tmpChecked + ' data-value="' + tmpVal + '" name="' + tmpObject.name + '" >')
                        tmpHTML.push('		<label for="' + tmpFieldID + '">' + tmpText + '&nbsp;&nbsp;&nbsp;</label>')
                        tmpHTML.push('	  </div>')
                        tmpHTML.push('	</div>')
                    }
                }
            }
            tmpHTML.push('  </div>')
            tmpHTML.push(getNoteMarkup(theObject, { isRow: (tmpGorI == 'inline') }));
        }

        tmpHTML.push('</div>')

        tmpHTML = tmpHTML.join('');
        return tmpHTML;
    }


    me.ControlTextArea = {
        getDesignSpecs: function(theControlName, theOptions, theControlObj){ 
			var tmpPropList = ['name','ctl','label','req','classes','styles','hidden','note','noteColor','placeholder','rows']; 
			return tmpPropList
		},
        setFieldNote: commonSetFieldNote, setFieldMessage: commonSetFieldMessage,
        getHTML: function (theControlName, theObject, theControlObj) {

            var tmpObject = theObject || {};
            var tmpHTML = [];
            var tmpReq = '';
            if (tmpObject.req === true) {
                tmpReq = ' required ';
            }


            var tmpHidden = '';
            if (tmpObject.hidden === true || theControlName == 'hidden') {
                tmpHidden = 'display:none;';
            }
            var tmpStyle = tmpObject.style || tmpObject.styles || tmpObject.css || '';
            if (tmpHidden) {
                tmpStyle += tmpHidden;
            }
            if (tmpStyle) {
                tmpStyle = ' style="' + tmpStyle + '" '
            }

            var tmpDispOnly = false;
            var tmpSpecs = theControlObj.getConfig();
            if (tmpSpecs && tmpSpecs.options && tmpSpecs.options.readonly === true) {
                tmpDispOnly = true;
            }

            var tmpInputClasses = tmpObject.inputClasses || '';
            tmpInputClasses += getValueIfTrue(theObject, ['fit']);
            if (tmpInputClasses) {
                tmpInputClasses = ' class="' + tmpInputClasses + '" '
            }
            var tmpClasses = ''
            tmpClasses += getValueIfTrue(theObject, ['compact', 'fluid']);
            tmpClasses += getValueIfThere(theObject, ['color', 'size']);


            var tmpSizeName = '';
            if (tmpObject.size && tmpObject.size > 0 && tmpObject.size < 17) {
                tmpSizeName = getNumName(tmpObject.size)
                tmpSizeName = ' ' + tmpSizeName + ' wide ';
            }


            tmpHTML.push('<div controls fieldwrap name="' + tmpObject.name + '" class="' + tmpClasses + tmpSizeName + tmpReq + ' field" ' + tmpStyle + '>')
            if (tmpObject.label) {
                tmpHTML.push('<label>')
                tmpHTML.push(tmpObject.label || '')
                tmpHTML.push('</label>')
            }
            if (tmpDispOnly) {
                tmpHTML.push('<field disabled readonly class="ui field">')
                var tmpValue = theControlObj.getFieldValue(tmpObject.name);
                tmpHTML.push('<input readonly type="text" controls field value="' + tmpValue + '" name="' + tmpObject.name + '">')
                tmpHTML.push('</input>')
                tmpHTML.push('</field>')
            } else {
                var tmpPH = '';
                if (tmpObject.placeholder !== false) {
                    //tmpPH = tmpObject.label || ''

                    if (typeof (tmpObject.placeholder) == 'string') {
                        tmpPH = tmpObject.placeholder;
                    }
                    tmpPH = ' placeholder="' + tmpPH + ' ';
                }


                var tmpRows = '';
                if (tmpObject.rows) {
                    tmpRows = 'rows=' + tmpObject.rows + ' ';
                }
                tmpHTML.push('<textarea desuse="disable" ' + tmpRows + 'controls field name="' + tmpObject.name + '" ' + tmpPH + '" ></textarea>')

                tmpHTML.push(getNoteMarkup(theObject));

            }

            tmpHTML.push('</div>')

            tmpHTML = tmpHTML.join('');
            return tmpHTML;
        },
        isField: true
    }



    //----   ================================= ================================= =================================
    //----   COMMON CUSTOM CONTROLS =================================
    //----   ================================= ================================= =================================


    me.ControlFullCard = {
        actions: {
            setTopHeader: function (theParams, theTarget) {
                var tmpValue = theParams.text || '';
                var tmpHide = !(tmpValue);
                var tmpItem = this.getItem('topHeader');
                if (tmpItem && tmpItem.el) {
                    tmpItem.el.html(tmpValue)
                    this.setItemDisplay('topHeaderArea', !tmpHide)
                }
            }
        },
        getCustomContent: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};
            var tmpNewContent = [];
            var tmpCentered = '';
            if (tmpObject.centered === true) {
                tmpCentered = ' center aligned '
            }

            var tmpClasses = '';
            if (tmpCentered) {
                tmpClasses += tmpCentered;
            }

            var tmpTopHeaderText = '';
            var tmpTopHeaderVis = false;

            if (tmpObject.topHeader && isStr(tmpObject.topHeader)) {
                tmpTopHeaderText = tmpObject.topHeader || '';
                tmpTopHeaderVis = true;
            }
            tmpNewContent.push({
                "ctl": "content",
                "hidden": !tmpTopHeaderVis,
                "name": "topHeaderArea",
                "content": [
                    {
                        "ctl": "title",
                        "name": "topHeader",
                        classes: tmpClasses,
                        "text": tmpTopHeaderText

                    }
                ]
            })

            if (tmpObject.imageSrc && isStr(tmpObject.imageSrc)) {
                tmpNewContent.push({
                    "ctl": "image",
                    "src": tmpObject.imageSrc
                })
            }
            var tmpHasFields = tmpObject.header || tmpObject.meta || tmpObject.description;
            if (tmpHasFields) {
                var tmpContent = {
                    "ctl": "content",
                    classes: tmpClasses,
                    "content": []
                }

                if (tmpObject.header) {
                    tmpContent.content.push({
                        "ctl": "header",
                        classes: tmpClasses,
                        "text": tmpObject.header
                    })
                }
                if (tmpObject.meta) {
                    tmpContent.content.push({
                        "ctl": "meta",
                        classes: tmpClasses,
                        "text": tmpObject.meta
                    })
                }
                if (tmpObject.description) {
                    tmpContent.content.push({
                        "ctl": "description",
                        classes: tmpClasses,
                        "text": tmpObject.description
                    })
                }
                tmpNewContent.push(tmpContent);

            }

            tmpHasFields = tmpObject.extraText || tmpObject.extraTextRight;
            if (tmpHasFields) {
                var tmpContent = {
                    "ctl": "extra",
                    "content": []
                }

                if (tmpObject.extraTextRight) {
                    tmpContent.content.push({
                        "ctl": "span",
                        "classes": "right floated",
                        "text": tmpObject.extraTextRight
                    })
                }
                if (tmpObject.extraText) {
                    tmpContent.content.push({
                        "ctl": "span",
                        "text": tmpObject.extraText
                    })
                }

                tmpNewContent.push(tmpContent);

            }

            var tmpBottomContent = tmpObject.bottomContent || false;
            if (tmpBottomContent) {
                if (Array.isArray(tmpBottomContent)) {
                    tmpNewContent.push({
                        "ctl": "div",
                        "content": tmpBottomContent
                    })
                } else if (typeof (tmpBottomContent) == 'string') {
                    tmpNewContent.push({
                        "ctl": "div",
                        "text": tmpBottomContent
                    })
                }

            }

            return tmpNewContent;
        },
        getHTML: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};
            var tmpHTML = [];
            var tmpNewContent = this.getCustomContent(theControlName, theObject, theControlObj);

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

            var tmpControlClass = 'card'; //tmpClass || theControlName;
            var tmpClasses = tmpObject.classes || '';
            tmpHTML = [];
            tmpHTML.push('<div ' + getItemAttrString(tmpObject) + ' class="ui ' + tmpControlClass + ' ' + tmpClasses + '" ' + tmpStyle + '>')

            //--- Create the proper content and index needed for this
            // theControlObj.initCustomSpec(tmpNewContent);
            tmpHTML.push(getContentHTML(theControlName, tmpNewContent, theControlObj))

            tmpHTML.push('</div>')

            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false

    }


    me.ControlTableOutlineNode = {
        getCustomContent: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};
            var tmpNewContent = [];
            var tmpFuncGetHeaderAndContent = function (theType, theDetails, theMeta, theContent, theLevel, theGroup, theItem, theIcon, theColor) {
                var tmpIconNode = false;
                var tmpColSpanDetails = "3";
                var tmpHasContent = true;
                if (!(theContent && theContent.length > 0)) {
                    tmpHasContent = false;
                }

                var tmpOLUse = 'select';

                if (theLevel == 2) {
                    tmpColSpanDetails = "4";

                    //tmpRowAttr.oluse = "collapsable";
                    tmpOLUse = "collapsable";
                    tmpIconNode = {
                        ctl: "td",
                        classes: "tbl-icon",
                        attr: {
                            action: "toggleMe"
                        },
                        content: [
                            {
                                ctl: "i",
                                classes: "icon square minus large toright"
                            }
                        ]
                    }
                } else if (theLevel == 3) {
                    tmpColSpanDetails = "4";
                    tmpPMIconCls = "tbl-icon2";
                    tmpIconNode = {
                        ctl: "td",
                        classes: "tbl-icon2",
                        content: [
                            {
                                ctl: "i",
                                attr: {
                                    action: "outlineDisplay",
                                    select: "false"
                                },
                                classes: "icon square minus large toright"
                            },
                            {
                                ctl: "i",
                                attr: {
                                    action: "outlineDisplay",
                                    select: "true"
                                },
                                classes: "icon square plus large toright"
                            }
                        ]
                    }
                }

                var tmpIconHidden = '';
                if (!(theIcon)) {
                    tmpIconHidden = ' hidden ';
                }
                var tmpBodyCols = [
                    {
                        ctl: "td",
                        classes: "tbl-icon " + tmpIconHidden,
                        content: [
                            {
                                ctl: "i",
                                classes: "large " + theIcon + " " + theColor + " icon"
                            }
                        ]
                    },
                    {
                        ctl: "td",
                        classes: "tbl-details",
                        text: theDetails
                    }

                ];

                if ((theMeta) && !((theLevel > 1) && !(theItem))) {

                    tmpBodyCols.push({
                        ctl: "td",
                        classes: "tbl-label",
                        text: theMeta
                    });
                }
                if (tmpIconNode) {
                    tmpBodyCols.push(tmpIconNode);
                }


                var tmpFinalNode = {
                    ctl: "tr",
                    attr: {
                        type: theType,
                        oluse: "container"
                    },
                    content: [
                        {
                            ctl: "td",
                            attr: {
                                colspan: tmpColSpanDetails,
                            },
                            content: theContent
                        }
                    ]

                }

                var tmpAttrAction = 'selectMe';
                if (!theItem) {
                    tmpAttrAction = 'toggleMe';
                    if (theLevel == 3) {
                        tmpAttrAction = 'outlineDisplay';
                    }
                }

                var tmpTRClasses = '';
                if (theLevel > 1 && !(theItem)) {
                    tmpTRClasses = "ui message fluid blue";
                }
                var tmpFinalContent = [
                    {
                        ctl: "tr",
                        classes: tmpTRClasses,
                        attr: $.extend({
                            action: tmpAttrAction,
                            select: "false",
                            group: theGroup,
                            item: theItem,
                            type: theType,
                            oluse: tmpOLUse
                        }, (tmpObject.attr || {})),
                        content: tmpBodyCols
                    }
                ]

                if (tmpHasContent) {
                    tmpFinalContent.push(tmpFinalNode)
                }

                var tmpSelectable = '';
                if (theDetails.selectable === true) {
                    tmpSelectable = ' selectable '
                }
                var tmpHeaderAndContent = {
                    ctl: "table",
                    classes: "ui very compact table " + tmpSelectable + " outline unstackable",
                    content: [
                        {
                            ctl: "tbody",
                            content: tmpFinalContent
                        }
                    ]
                }

                return tmpHeaderAndContent;
            }



            tmpNewContent.push(tmpFuncGetHeaderAndContent(
                tmpObject.type, tmpObject.details, tmpObject.meta, tmpObject.content, tmpObject.level, tmpObject.group, tmpObject.item, tmpObject.icon, tmpObject.color
            ))

            return tmpNewContent;
        },
        getHTML: function (theControlName, theObject, theControlObj) {
            var tmpObject = theObject || {};
            var tmpHTML = [];
            var tmpNewContent = this.getCustomContent(theControlName, theObject, theControlObj);

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

            var tmpControlClass = '';
            var tmpClasses = tmpObject.classes || '';
            tmpHTML = [];
            tmpHTML.push('<div ' + getItemAttrString(tmpObject) + ' class="ui ' + tmpControlClass + ' ' + tmpClasses + '" ' + tmpStyle + '>')

            tmpHTML.push(getContentHTML(theControlName, tmpNewContent, theControlObj))

            tmpHTML.push('</div>')

            tmpHTML = tmpHTML.join('');
            return tmpHTML;

        },
        isField: false

    }


    me.getControlType = function (theControlName) {
        var tmpControl = me.getWebControl(theControlName)
        if (tmpControl && tmpControl.isField === true) {
            return 'field'
        }
        return 'item'
    }
    me.getWebControl = function (theControlName) {
        var tmpControl = me.webControls.get(theControlName)
        if (tmpControl) {
            return tmpControl
        }
        return false;
    }

    //---- Control Helpers
    me.getNoteMarkup = getNoteMarkup;
    function getNoteMarkup(theObject, theOptions) {
        var tmpOptions = theOptions || {};
        var tmpHTML = [];

        var tmpNote = '';
        var tmpNoteHidden = '';
        if (theObject.note) {
            tmpNote = (theObject.note)
        } else {
            tmpNoteHidden = 'display:none;'
        }
        var tmpColor = '';
        if (isStr(theObject.noteColor)) {
            tmpColor = theObject.noteColor;
        }
        tmpHTML.push('<div controls fieldnote name="' + theObject.name + '" ' + ' class="ui message fluid ' + tmpColor + '" style="' + tmpNoteHidden + '">')
        tmpHTML.push(tmpNote);
        tmpHTML.push('</div>')
        //--- For programatic messages
        tmpHTML.push('<div controls fieldmsg name="' + theObject.name + '" ' + ' class="ui message fluid" style="display:none;">')
        tmpHTML.push('</div>')

        return tmpHTML.join('');;
    }

    me.getValueIfTrue = getValueIfTrue;
    function getValueIfTrue(theObject, theParamName, theReturnArray) {
        var tmpParams = theParamName;
        var tmpRet = [];
        if (isStr(tmpParams)) {
            tmpParams = [tmpParams];
        }
        for (var iPos = 0; iPos < tmpParams.length; iPos++) {
            var tmpParamName = tmpParams[iPos];
            if (theObject[tmpParamName] === true) {
                var tmpClassName = tmpParamName;
                tmpRet.push(tmpClassName)
            }
        }
        if(theReturnArray){return tmpRet};
        return ' ' + tmpRet.join(' ') + ' ';
    }

    me.getValueIfThere = getValueIfThere
    function getValueIfThere(theObject, theParamName, theReturnArray) {

        var tmpParams = theParamName;
        var tmpRet = [];
        if (isStr(tmpParams)) {
            tmpParams = [tmpParams];
        }
        for (var iPos = 0; iPos < tmpParams.length; iPos++) {
            var tmpParamName = tmpParams[iPos];
            if (isStr(theObject[tmpParamName])) {
                tmpRet.push((theObject[tmpParamName] + '').toLowerCase());
            }
        }
        if(theReturnArray){return tmpRet};
        return ' ' + tmpRet.join(' ');
    }

    //---- Functions to extend global pallet
    me.addWebControl = function (theName, theWebControl) {
        me.webControls.add(theName, theWebControl);
    }
    me.addAction = function (theName, theAction) {
        me.actions.add(theName, theAction);
    }
    me.addValidation = function (theName, theValidation) {
        me.validations.add(theName, theValidation);
    }

    //---- Add Common Controls to Catalog


    //=== Root Common Web Controls ..
    me.webControls.add('message', me.SemanticElement);
    me.webControls.add('header', me.SemanticElement);

    //=== Root Common Web Controls ..
    me.webControls.add('control', me.ControlPanelAndControl);
    me.webControls.add('panel', me.ControlPanelAndControl);
    me.webControls.add('template', me.ControlPanelAndControl);
    me.webControls.add('html', me.ControlPanelAndControl);

    me.webControls.add('pagespot', me.ControlSpot);
    me.webControls.add('spot', me.ControlSpot);

    me.webControls.add('fieldrow', me.ControlFieldRow);
    me.webControls.add('field', me.ControlField);
    me.webControls.add('hidden', me.ControlField);
    me.webControls.add('number', me.ControlField);

    me.webControls.add('date', me.ControlField);
    me.webControls.add('datetime', me.ControlField);
    me.webControls.add('time', me.ControlField);
    // me.webControls.add('datectl', me.ControlField);
    // me.webControls.add('datetimectl', me.ControlField);
    // me.webControls.add('timectl', me.ControlField);
    
    me.webControls.add('color', me.ControlField);

    me.webControls.add('dropdown', me.ControlDropDown);
    me.webControls.add('checkboxlist', me.ControlCheckboxList);
    me.webControls.add('radiolist', me.ControlRadioList);
    me.webControls.add('textarea', me.ControlTextArea);
    me.webControls.add('checkbox', me.ControlCheckboxList);

    me.webControls.add('tabs', me.ControlTabs);
    me.webControls.add('tab', me.ControlTab);

    me.webControls.add('title', me.ControlDivider);
    me.webControls.add('sep', me.ControlDivider);
    me.webControls.add('divider', me.ControlDivider);
    me.webControls.add('button', me.ControlButton);
    me.webControls.add('segment', me.ControlPanel);
    me.webControls.add('segments', me.ControlPanel);
    me.webControls.add('image', me.ControlImage);
    me.webControls.add('element', me.ControlElement);
    me.webControls.add('card', me.ControlElement);
    me.webControls.add('cards', me.ControlPanel);
    me.webControls.add('content', me.ControlElement);
    me.webControls.add('meta', me.ControlElement);
    me.webControls.add('description', me.ControlElement);
    me.webControls.add('extra', me.ControlElement);
    me.webControls.add('item', me.ControlElement);
    me.webControls.add('ui', me.ControlElement);

    me.webControls.add('i', me.ControlDOM);
    me.webControls.add('span', me.ControlDOM);
    me.webControls.add('div', me.ControlDOM);
    me.webControls.add('ul', me.ControlDOM);
    me.webControls.add('li', me.ControlDOM);
    me.webControls.add('a', me.ControlDOM);
    me.webControls.add('table', me.ControlDOM);
    me.webControls.add('tbody', me.ControlDOM);
    me.webControls.add('tr', me.ControlDOM);
    me.webControls.add('td', me.ControlDOM);

    me.webControls.add('dropmenu', me.ControlDropMenu);
    me.webControls.add('layout', me.ControlLayout);

    //=== Special UI Controls
    // me.webControls.add('uisegment', me.UIControlPanel);

    //=== Common Custom Web Controls ..
    me.webControls.add('cardfull', me.ControlFullCard);
    me.webControls.add('tbl-ol-node', me.ControlTableOutlineNode);

    //==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== 
    //--- Common Actions
    //==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== 

    me.commonSetFieldNote = commonSetFieldNote;
    function commonSetFieldNote(tmpFieldEl, theValue, theOptions, tmpFieldSpecs) {
        var tmpOptions = theOptions || {};

        var tmpNoteEl = tmpFieldEl.siblings('[fieldnote]');
        if (!tmpNoteEl) {
            tmpNoteEl = tmpFieldEl.closest('[fieldnote]');
        }
        if (!tmpNoteEl) {
            console.warn("no field note found ")
            return;
        }
        if (theValue === false) {
            //=== reset to defaults
        } else {
            tmpNoteEl.html(theValue);
            if (theValue) {
                tmpNoteEl.show();
            } else {
                tmpNoteEl.hide();
            }
            var tmpColor = '';
            if (tmpOptions.error) {
                tmpColor = 'red';
            } else if (isStr(tmpOptions.color)) {
                tmpColor = tmpOptions.color;
            }
            //ToDo: clear / set colors
        }
    }
    me.commonSetFieldMessage = commonSetFieldMessage;
    function commonSetFieldMessage(tmpFieldEl, theValue, theOptions, tmpFieldSpecs) {
        var tmpOptions = theOptions || {};

        var tmpNoteEl = tmpFieldEl.siblings('[fieldmsg]');
        if (!tmpNoteEl) {
            tmpNoteEl = tmpFieldEl.closest('[fieldmsg]');
        }
        var tmpClasses = 'ui message fluid';
        tmpClasses += getValueIfThere(tmpOptions, 'color');
        tmpClasses += getValueIfThere(tmpOptions, 'size');

        if (!tmpNoteEl) {
            console.warm("no field msg found ")
            return;
        }
        if (theValue === false) {
            //=== reset to defaults
            tmpNoteEl.removeClass();
            tmpNoteEl.addClass('ui message fluid');
        } else {
            tmpNoteEl.removeClass();
            tmpNoteEl.addClass(tmpClasses);

            tmpNoteEl.html(theValue);
            if (theValue) {
                tmpNoteEl.show();
            } else {
                tmpNoteEl.hide();
            }
            var tmpColor = '';
            if (tmpOptions.error) {
                tmpColor = 'red';
            } else if (isStr(tmpOptions.color)) {
                tmpColor = tmpOptions.color;
            }
            //ToDo: clear / set colors
        }
    }

    function actionShowFor(theFieldName, theFieldValue, theControlObj, theParams) {
        var tmpParams = theParams || {};
        var tmpNames = [];
        var tmpValues = {};
        var tmpFieldValue = theFieldValue || '';
        var tmpValueInList = false;

        var tmpValueFields = tmpParams.values || [];
        var tmpAt = 0;
        for (var aVal in tmpValueFields) {
            tmpNames.push(tmpValueFields[aVal])
            tmpValues[aVal] = tmpAt;
            if (aVal == tmpFieldValue) {
                tmpValueInList = true
            }
            tmpAt++;
        }
        //--- Update to allow for any other value
        if (!tmpValueInList && (tmpFieldValue)) {
            tmpFieldValue = '*'
        }
        var tmpValuePos = tmpValues[tmpFieldValue]
        var tmpShowIndex = {};

        //--- Get list of fields that should be displayed
        for (var iPos = 0; iPos < tmpNames.length; iPos++) {
            var tmpNameList = tmpNames[iPos];
            if (isStr(tmpNameList)) {
                tmpNameList = [tmpNameList]
            }
            for (var iName = 0; iName < tmpNameList.length; iName++) {
                var tmpEntryName = tmpNameList[iName];
                if (tmpValuePos == iPos) {

                    tmpShowIndex[tmpEntryName] = true;
                } else {
                    //--- Add field to the list, so we can make it hide
                    if (!(tmpShowIndex[tmpEntryName])) {
                        tmpShowIndex[tmpEntryName] = false;
                    }
                }
            }
        }
        //--- Set display on / off based on show list status
        for (var aFieldName in tmpShowIndex) {
            var tmpShowFlag = tmpShowIndex[aFieldName];
            if (theControlObj.hasItem(aFieldName)) {
                theControlObj.setItemDisplay(aFieldName, tmpShowFlag);
            }
            if (theControlObj.hasField(aFieldName)) {
                theControlObj.setFieldDisplay(aFieldName, tmpShowFlag);
            }
        }
    }

    function actionShowOrHideIf(theFieldName, theFieldValue, theControlObj, theParams) {
        var tmpValue = theParams.value || 'other';
        var tmpShowFlag = (theFieldValue == tmpValue)
        if (theParams.action == 'hideif') {
            tmpShowFlag = !tmpShowFlag;
        }
        var tmpItem = theParams.item || theParams.items || '';
        var tmpField = theParams.field || theParams.fields || '';

        if (tmpItem) {
            tmpItem = tmpItem.split(",");
            for (var iPos = 0; iPos < tmpItem.length; iPos++) {
                var tmpEntryName = tmpItem[iPos];
                theControlObj.setItemDisplay(tmpEntryName, tmpShowFlag)
            }
        }
        if (tmpField) {
            tmpField = tmpField.split(",");
            for (var iPos = 0; iPos < tmpField.length; iPos++) {
                var tmpEntryName = tmpField[iPos];
                theControlObj.setFieldDisplay(tmpEntryName, tmpShowFlag)
            }
        }
    }
    me.actions.add('showif', actionShowOrHideIf);
    me.actions.add('hideif', actionShowOrHideIf);
    me.actions.add('showfor', actionShowFor);

    //==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== 
    //--- Common Validations
    //==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== 
    function minLen(theFieldName, theFieldValue, theControlObj, theParams) {
        var tmpValue = theFieldValue || '';
        var tmpMinLen = theParams.min || 3;
        if (isStr(tmpMinLen)) {
            tmpMinLen = parseInt(tmpMinLen);
        }
        if (tmpValue.length < tmpMinLen) {
            return 'Value must be at least ' + tmpMinLen + " characters";
        }
        return true;
    }
    me.validations.add('minlen', minLen);

    function exactLen(theFieldName, theFieldValue, theControlObj, theParams) {
        var tmpValue = theFieldValue || '';
        var tmpMinLen = theParams.len || 3;
        if (isStr(tmpMinLen)) {
            tmpMinLen = parseInt(tmpMinLen);
        }
        if (tmpValue.length != tmpMinLen) {
            return 'Value must be exactly ' + tmpMinLen + " characters";
        }
        return true;
    }
    me.validations.add('exactlen', exactLen);

    //--- =========== =========== =========== =========== =========== ===========
    //---- End Common Controls
    //--- =========== =========== =========== =========== =========== ===========

    //--- =========== =========== =========== =========== =========== ===========
    //---- Start Designer Helpers
    //--- =========== =========== =========== =========== =========== ===========

    //--- Create element spec object (domspec)
    function elSpec(theTag, theOptions, theContent){
        var tmpRet = {type:theTag};
        var tmpOptions = theOptions || {};
        
        for( var iName in tmpOptions ){
            var tmpChkName = iName.toLowerCase();
            var tmpVal = tmpOptions[iName];
            if( tmpChkName == 'classname'){
                tmpRet.className = tmpVal;
            } else if( tmpChkName == 'style' || tmpChkName == 'styles'){
                tmpRet.style = tmpVal;
            } else if( tmpChkName == 'children'){
                tmpRet.children = elSpec(tmpVal)
            } else {
                //--- if nothing else, must be an attribute
                tmpRet.attr = tmpRet.attr || {};
                tmpRet.attr[iName] = tmpVal;
            }
        }
        if( theContent ){
            tmpRet.children = theContent;
        }
        return tmpRet;
    }

   var gSelLookup = {
        _ex: {},
        'attached': ActionAppCore.sources.sys_attached,
        'sizeheader': ActionAppCore.sources.sys_sizes_header,
        'size': ActionAppCore.sources.sys_sizes,
        'color': ActionAppCore.sources.sys_colors,
        'alignment': ActionAppCore.sources.sys_alignment,
        'lralignment': ActionAppCore.sources.sys_lralignment,
        'valignment': ActionAppCore.sources.sys_valignment,
        'float': ActionAppCore.sources.sys_float,
        'tofloat': ActionAppCore.sources.sys_tofloat,
    };

    me.getSelListFor = getSelListFor;
    function getSelListFor(thePropName){
        if( !gSelLookup._ex[thePropName] ){
            gSelLookup._ex[thePropName] = ActionAppCore.getListAsObjects(gSelLookup[thePropName])
        }
        return gSelLookup._ex[thePropName];
    }

    me.getSelectionFor = function(thePropName, theCurrentValue, theOnChangeEvent){
        var tmpSelection = getSelListFor(thePropName);
        if( !(tmpSelection) ){
            console.error("Unknown property name passed", thePropName);
            return;
        }
        return me.getSelectControl(theCurrentValue,theOnChangeEvent,tmpSelection);
    }

    me.getSelectControl = function(theValue,theOnChange, theDropDownValues, theOptionalClassName){
        var tmpRet = {type:'select'};

        tmpRet.attr = tmpRet.attr || {};
        if( theOptionalClassName ){
            tmpRet.className = theOptionalClassName;
        } else {
            //--- ToDo: Move this to wp blocks only
            tmpRet.className = 'fluid-field';
            tmpRet.attr.value = theValue;
        }
        if( theOnChange ){
            //ToDo: Function?
            tmpRet.attr.onChange = theOnChange;
        }
        var tmpKids = [];
        for( var iPos in theDropDownValues ){
            var tmpEntry = theDropDownValues[iPos];
            var tmpOption = {type:'option', text: tmpEntry.text, attr:{value:tmpEntry.value}};
            if( tmpEntry.value == theValue ){
                tmpOption.attr.selected = '';
            }
            tmpKids.push(tmpOption);
        }
        tmpRet.children = tmpKids;
        return tmpRet;
        //return elSpec("select", {className:'fluid-field', value:theValue, onChange: theOnChange},theDropDownValues)
    }
    me.getTextControl = function(theValue,theOnChange){
        return elSpec("input", {className:'fluid-field', value:theValue, onChange: theOnChange})
    }


    //==== END ===== HTML Control Builder ======  ======  ======  ======  ======  ======  ======  ======  ======  ======     


})(ActionAppCore, $);



//=========     React Plugin
(function (ActionAppCore, $) {
    var pluginConfig = {
        name: "React",
        ns: "_react"
    }
    var MyMod = ActionAppCore.module("plugin");
    MyMod[pluginConfig.name] = ThisModuleController;
    var thisComponentID = "plugin:" + pluginConfig.name;

    function render(){
        if( (this.renderCall) ){
            return this.renderCall.apply(this, arguments);
        }
        return $RD.render.apply(this, arguments);
    }
    function createElement(){
        if( (this.createElementCall) ){
            return this.createElementCall.apply(this, arguments);
        }
        return $R.createElement.apply(this, arguments);
    }
    function unmountComponentAtNode(){
        if( (this.unmountComponentAtNodeCall) ){
            return this.unmountComponentAtNodeCall.apply(this, arguments);
        }
        return $RD.unmountComponentAtNode.apply(this, arguments);

    }

    function setupReact(theOptions){
        if(!theOptions){return;}
        if( theOptions.render ){
            this.renderCall = theOptions.render
        }
        if( theOptions.createElement ){
            this.createElementCall = theOptions.createElement
        }
        if( theOptions.unmountComponentAtNode ){
            this.unmountComponentAtNodeCall = theOptions.unmountComponentAtNode
        }
    }

    function ThisModuleController(theOptions) {
        this.options = theOptions || {};
        this.catalog = catalog;
        this.setupReact = setupReact.bind(this);
        this.render = render.bind(this);
        this.createElement = createElement.bind(this);
        this.unmountComponentAtNode = unmountComponentAtNode.bind(this);

        if (typeof (this.options.app) == 'object') {
            var tmpApp = this.options.app;
            if (tmpApp && tmpApp.registerComponent) {
                tmpApp.registerComponent(thisComponentID, this);
            }
        }
    }

    var me = ThisModuleController.prototype;

    function Message(props) {
        if (!props.warn) {
            return null;
        }
        return $R.createElement("div", { className: "ui message " + props.color }, props.msg || 'Warning');
    }

    
    var catalog = {
        "sys_common": {
            Message:Message
        }
    }
    //--- Demo controls


})(ActionAppCore, $);


