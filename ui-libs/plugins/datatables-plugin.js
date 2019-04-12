/*
Author: Joseph Francis
License: MIT
*/

(function (ActionAppCore, $) {
    var MyMod = ActionAppCore.module("plugin");
    MyMod.DataTables = ThisPageController;
    
    var ThisApp = null;

    var thisComponentID = "plugin:DataTables";

    //--- Base class for application pages
    function ThisPageController(theOptions) {
        this.options = theOptions || {};
        this.actions = this.options.actions || {};
        var defaults = {};
        if (typeof (this.options.app) == 'object') {
            ThisApp = this.options.app;
            if (ThisApp && ThisApp.registerComponent) {
                ThisApp.registerComponent(thisComponentID, this);
            }
        }
    }

    var me = ThisPageController.prototype;
    

    function runAction(theAction, theSourceObject) {
        if (typeof (me[theAction]) == 'function') {
            me[theAction](theAction, theSourceObject);
        }
    }

    me.init = init;
    function init(theApp) {
        ThisApp.registerActionDelegate("_dt", runAction);        
        //-- Note: Can also just use getAppData directly from component in the application, no need to register.
        //    just showing global actions can be registered by components
        return this;
    }



    me.dth = $.fn.DataTablesHelper;
    //--- Impl ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== 
    //--- Impl ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== 
    //--- Impl ========== ========== ========== ========== ========== ========== ========== ========== ========== ========== 

    me.addTable = function (theElOrSpotName) {
        var tmpEl = ThisApp.asSpot$(theElOrSpotName);
        //--- Load spot with table htmo=l
        //     ... then returns the table element
        return me.dth.addTable(tmpEl);
    }

    me.runForIndexMatches =  me.dth.runForIndexMatches
    me.onSelectCheckboxCommand =  me.dth.onSelectCheckboxCommand
    me.onCheckboxSelect =  me.dth.onCheckboxSelect
    me.onCheckboxDeselect =  me.dth.onCheckboxDeselect
    me.checkboxDataCallback =  me.dth.checkboxDataCallback
    me.getCheckboxColumn =  me.dth.getCheckboxColumn
    me.checkboxTitle =  me.dth.checkboxTitle
    
    // me.onSelectCheckboxCommand = function (e, dt, type, indexes, theTable, theTableEl, theCommand, theKeyField) {
    //     var tmpKeyField = theKeyField || 'id';
    //     me.runForIndexMatches(theTable,indexes, function(theData, thePos){
    //         var tmpID = theData[tmpKeyField];
    //         if( tmpID ){
    //             var tmpEl = theTableEl.find('[dtuse="select-row"][dtid="' + tmpID + '"]');
    //             $(tmpEl).checkbox(theCommand);
    //         }
    //     })       
    // }
    // me.onCheckboxSelect = function (e, dt, type, indexes, theTable, theTableEl, theKeyField) {
    //     me.onSelectCheckboxCommand(e, dt, type, indexes, theTable, theTableEl, 'set checked', theKeyField)
    // }
    // me.onCheckboxDeselect = function (e, dt, type, indexes, theTable, theTableEl, theKeyField) {
    //     me.onSelectCheckboxCommand(e, dt, type, indexes, theTable, theTableEl, 'set unchecked', theKeyField)
    // }
    // me.checkboxDataCallback = function (data, type, row, meta) {
    //     return me.getCheckboxColumn(data.id);
    // }
    // me.getCheckboxColumn = function (theId){
    //     return '<div dtuse="select-row" dtid="' + theId + '" class="ui checkbox"><input type="checkbox"><label></label></div>'
    // }

    // me.checkboxTitle = '<div class="ui checkbox"><input type="checkbox"><label></label></div>';




    
})(ActionAppCore, $);



