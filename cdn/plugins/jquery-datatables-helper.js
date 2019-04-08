$.fn.DataTablesHelper = (function ($) {

    function DataTablesHelper(theOptions) { };
    var me = DataTablesHelper.prototype;
    
    me.tableTemplateHTML = '<table appuse="datatable" class=" row-border compact" cellspacing="0" width="100%"><thead></table>';
    me.addTable = function (theEl) {
        //--- Loads HTML with html for a table
        //     ... this returns the the table element
        theEl.html(me.tableTemplateHTML);
        return theEl.find('table');
    }

    me.runForIndexMatches = function(theTable, theIndexes, theFunction, theExtraParams){
        if(typeof(theFunction) !== 'function'){
            console.error("No function passed to run");
            return false;
        }
        var rowData = theTable.rows(theIndexes).data().toArray();
        var tmpRow = theTable.rows(theIndexes).columns(1);
        if (rowData && rowData.length > 0) {
            for (var i = 0; i < rowData.length; i++) {
                var tmpData = rowData[i];
                if( tmpData ){
                    theFunction(tmpData,i,theExtraParams)
                }
            }
        }
    }
    me.onSelectCheckboxCommand = function (e, dt, type, indexes, theTable, theTableEl, theCommand, theKeyField) {
        var tmpKeyField = theKeyField || 'id';
        me.runForIndexMatches(theTable,indexes, function(theData, thePos){
            var tmpID = theData[tmpKeyField];
            if( tmpID ){
                var tmpEl = theTableEl.find('[dtuse="select-row"][dtid="' + tmpID + '"]');
                $(tmpEl).checkbox(theCommand);
            }
        })       
    }
    me.onCheckboxSelect = function (e, dt, type, indexes, theTable, theTableEl, theKeyField) {
        me.onSelectCheckboxCommand(e, dt, type, indexes, theTable, theTableEl, 'set checked', theKeyField)
    }
    me.onCheckboxDeselect = function (e, dt, type, indexes, theTable, theTableEl, theKeyField) {
        me.onSelectCheckboxCommand(e, dt, type, indexes, theTable, theTableEl, 'set unchecked', theKeyField)
    }
    me.checkboxDataCallback = function (data, type, row, meta) {
        return me.getCheckboxColumn(data.id);
    }
    me.getCheckboxColumn = function (theId){
        return '<div dtuse="select-row" dtid="' + theId + '" class="ui checkbox"><input type="checkbox"><label></label></div>'
    }

    me.checkboxTitle = '<div class="ui checkbox"><input type="checkbox"><label></label></div>';


    //--- Public Implementation === === === === === === === === === === === === === === === === === === === === === === 
    /*
  
    
     */


    me.init = init;
    function init() {
        return me;
    }

    return me;

})($);
