(function (ActionAppCore, $) {

  var ControlSpecs = {
    options: {
      padding: false,
      css: ['.table-footer {clear:right;line-height:30px;padding-left:10px;border:none;color: #2185d0;}']
    },
    content: [
      {
        ctl: 'div',
        name: 'layout',
        content: [
          
          {
            "ctl": "control",
            "controlname": "SearchBar",
            "catalog": "_designer",
            "name": "searchbar"
          },
          {
            ctl: 'div',
            classes: 'ui message small mar0 pad4',
            attr: {'myspot':'filtered-count'},
            name: 'filtered-count'
          },
          {
            ctl: 'spot',
            name: 'report-area'
          }
          ,

          {
            "ctl": "ui",
            "name": "footer-toolbar",
            "classes": "labeled icon compact pad0",
            "content": [{
              "ctl": "button",
              "color": "blue",
              "icon": "outline square check blue",
              "toLeft": true,
              compact: true,
              basic: true,
              "name": "btn-fb-all",
              "onClick": {
                "run": "action",
                "action": "selectAll"
              }
            },
            {
              "ctl": "button",
              "toLeft": true,
              "color": "blue",
              "icon": "outline times square blue",
              compact: true,
              basic: true,
              "name": "btn-fb-none",
              "onClick": {
                "run": "action",
                "action": "selectNone"
              }
            },
            {
              "ctl": "button",
              "toLeft": true,
              compact: true,
              basic: true,
              "color": "blue",
              "icon": "recycle",
              "name": "btn-tb-refresh",
              "onClick": {
                "run": "action",
                "action": "refresh"
              }
            },
            {
              "ctl": "button",
              "toLeft": true,
              "color": "blue",
              "icon": "table",
              compact: true,
              basic: true,
              "name": "btn-fb-export",
              "onClick": {
                "run": "action",
                "action": "exportTable"
              }
            },
            {
              ctl: "div",
              classes: "item",
              text: '<span class="table-footer one-liner" myspot="selected-count"></span>'
            }, {
              ctl: "divider",
              fitted: true,
              clearing: true
            }]
          },
          {
            ctl: 'div',
            classes: 'hidden',
            content: [{
              "ctl": "control",
              "controlname": "WPUserForm",
              "catalog": "_designer",
              "name": "mainform"
            }]
          },

        ]

      }]
  };

  var ControlCode = {};

  ControlCode.refresh = function (theOptions) {
    this.showReport(theOptions);
  };

  ControlCode.postProcessData = function () {
    this.publish('dataChange', [this.tableData, this]);
  };

  ControlCode.refreshData = function (theData, theOptions) {
    var tmpThis = this;
    var tmpSelectedRows = this.mainTable.getSelectedRows();
    this.mainTable.replaceData(theData).then(function () {
      var tmpRows = [];
      for (let iPos = 0; iPos < tmpSelectedRows.length; iPos++) {
        var tmpItem = tmpSelectedRows[iPos];
        var tmpID = '';
        var tmpData = tmpItem.getData() || {};
        if (tmpData) {
          tmpID = tmpData.id || '';
          tmpRows.push(tmpID);
        }
      }
      if (tmpRows.length > 0) {
        tmpThis.mainTable.selectRow(tmpRows);
        tmpThis.refreshSelection();
      }
    }).catch(function () {
      console.error('The table did not update for some reason', arguments);
    });
    this.tableData = theData;
    var tmpOptions = theOptions || {};

    if (tmpOptions.select) {
      this.selectByUNID(tmpOptions.select);
    }
    this.postProcessData();
    this.refreshTableUI();
  };

  ControlCode.refreshSize = function () {
    ThisApp.resizeToLayout(this.mainTableEl);
    if (this.mainTable) {
      this.mainTable.redraw();
    }
  };

  ControlCode.refreshTableUI = function () {
    this.refreshSize();
    this.refreshSelection();
  };

  ControlCode._onParentResize = function () {
    var tmpThis = this;
    ThisApp.delay(200).then(function () {
      tmpThis.refreshSize();
    });
  };

  function onDoubleClick(e,row){
    this.publish('doubleClick',[row]);
    window.getSelection().removeAllRanges();
  }

  ControlCode.initTable = function (theDetails) {
    var tmpDetails = theDetails || {};

    var tmpData = tmpDetails.data || [];
    var tmpCols = tmpDetails.columns || this.columnSpecs || false;
    var tmpHeight = tmpDetails.height || 300;
    if (!(tmpCols)) {
      console.error("No column details passed, can not initialize empty table.");
      return false;
    }

    this.tableData = [];
    this.columnSpecs = tmpCols;

    try {
      if (!(this.mainTable)) {
        this.mainTableEl = this.getSpot('report-area');

        this.tableData = tmpData;

        var tmpRowSelected = ActionAppCore.debounce(function (theEvent, row) {
          if (this.batchSelect) {
            return;
          }
          this.refreshSelection();
          this.publish('data-selected', [this]);
        }, 200);

        this.tableConfig = $.extend({
          rowDblClick: onDoubleClick.bind(this),
          height: tmpHeight,
          selectableRangeMode: "click",
          selectable: true,
          persistence: false,
          reactiveData: true,
          data: this.tableData,
          columns: this.columnSpecs,
          rowSelected: tmpRowSelected.bind(this),
          rowClick: tmpRowSelected.bind(this),
          rowDeselected: rowDeselected.bind(this)
        }, this.tableConfig);

        this.mainTable = new Tabulator(this.mainTableEl.get(0), this.tableConfig);
      }

      this.postProcessData();
      this.refreshTableUI();

    } catch (ex) {
      console.error("Error setting up Tabulator", ex);
    }

  };


  function matchAny(data, filterParams) {
    var checkVal = filterParams.value.toLowerCase();
    var tmpIsCols = Array.isArray(filterParams.columns);
    var tmpKeyList = data;
    if (tmpIsCols) {
      tmpKeyList = {};
      for (var iPos in filterParams.columns) {
        var tmpCol = filterParams.columns[iPos];
        var tmpKey = tmpCol.field;
        if (tmpKey) {
          tmpKeyList[tmpKey] = true;
        }
      }
    }

    var match = false;
    var key = '';
    if (filterParams.startsWith === true) {
      for (key in tmpKeyList) {
        if ((data[key]) && (data[key]).toLowerCase) {
          if (data[key].toLowerCase().indexOf(checkVal) === 0) {
            match = true;
            break;
          }
        }
      }
    } else {
      for (key in tmpKeyList) {
        if (data[key] && (data[key]).toLowerCase) {
          if (data[key].toLowerCase().indexOf(checkVal) > -1) {
            match = true;
            break;
          }
        }
      }
    }
    return match;
  }

  ControlCode.rowSelected = rowSelected;
  function rowSelected(row) {
    if (this.batchSelect) {
      return;
    }
    this.refreshSelection();
    this.publish('data-selected', [this, row.getData()]);
    //console.log('pub data');
    //this.context.page.controller.previewDoc({docs:[row.getData()]});
  }

  function rowDeselected(row) {
    if (this.batchSelect) {
      return;
    }
    this.refreshSelection();
  }

  ControlCode._onDestroy = function() {
    if(this.mainTable && this.mainTable.destroy){
      this.mainTable.destroy();
    }
  }
  
  ControlCode._onInit = function () {
    //ToDo: Why do we need this?
    if (this.initRan === true) {
      this.initSearch();
      return;
    }
    this.initRan = true;
    this.initSearch();

  };

  ControlCode.setup = function (theOptions) {
    var tmpOptions = theOptions || {};
    var tmpOptConfig = tmpOptions.tableConfig || {};
    this.endpoint = tmpOptions.endpoint || '';

    var tmpViewName = tmpOptions.viewname || tmpOptions.viewName || '';
    this.viewName = tmpViewName;
    this.selectedIndex = {};

    this.selectIcon = function (cell, formatterParams) {
      return "<i class='ui icon square outline blue select'></i>";
    };

    this.reportCols = tmpOptions.columns || [{
      "title": "ID",
      "field": "id"
    }];

    var tmpCheckBoxIcon = {
      formatter: this.selectIcon,
      headerSort: false,
      hozAlign: "center",
      frozen: true
    };
    this.reportCols.unshift(tmpCheckBoxIcon);


    this.tableConfig = $.extend({}, tmpOptConfig)
    this.tableConfig.columns = this.reportCols;

    var tmpToRun = this.showReport.bind(this);
    this.refreshUI().then(tmpToRun);

  }

  

  ControlCode.showReport = function (theOptions) {
    var dfd = jQuery.Deferred();
    var tmpOptions = theOptions || {};
    var tmpThis = this;

    var tmpURL = tmpOptions.endpoint || this.endpoint || '';
    if( tmpOptions.endpoint && !(this.endpoint)){
      this.endpoint = tmpOptions.endpoint;
    }

    if( !tmpURL ){
      console.error("No Report URL Provided In Setup");
      return;
    }

    ThisApp.apiCall({
      loading: this.getEl(),
      cache: true,
      url: tmpURL
    }).then(function (theReply) {
      tmpThis.reloadedNeeded = false;
      var tmpData = theReply;
      if (typeof (tmpData) === 'string') {
        tmpData = JSON.parse(tmpData);
      }

      tmpData = tmpData.data || tmpData.docs || tmpData || [];

      //console.log("tmpData",ThisApp.json(tmpData));

      if (tmpThis.viewerLoaded !== true) {
        tmpThis.viewerLoaded = true;
        tmpThis.initTable({
          data: tmpData,
          columns: tmpThis.reportCols
        }, theOptions);
      } else {
        tmpThis.refreshData(tmpData, tmpOptions);
      }
      dfd.resolve(true)

    })

    return dfd.promise();
  }


  ControlCode.refreshSelection = function () {

    var tmpLastCounts = this.counts || {
      all: 0,
      filtered: 0,
      selected: 0
    };

    var tmpDocCount = this.tableData.length;

    var tmpSelected = this.mainTable.getSelectedRows();
    // --- replace old counts
    this.counts = {
      all: tmpDocCount,
      filtered: this.mainTable.getDataCount('active'),
      selected: tmpSelected.length
    };
    if (this.counts.all == this.counts.filtered) {
      this.counts.filtered = 0;
    }
    var tmpCountChanged = true;
    if (tmpLastCounts.all == this.counts.all && tmpLastCounts.filtered == this.counts.filtered && tmpLastCounts.selected == this.counts.selected) {
      tmpCountChanged = false;
    }

    this.refreshSearchUI();

    var tmpTotalCount = " " + (this.counts.all || "none") + " records.";
    var tmpSelCount = " (" + (this.counts.selected || "none")
      + " selected)";
    var tmpFilterCount = "Search found " + (this.counts.filtered || "none");
    if( this.counts.filtered == 0){
      this.getItemEl('filtered-count').removeClass('green');
      tmpFilterCount = ''
    } else {
      this.getItemEl('filtered-count').addClass('green');
    }
    this.loadSpot('selected-count', tmpTotalCount + " " + tmpSelCount)
    this.loadSpot('filtered-count', tmpFilterCount);
    this.publish('selectionChange', [tmpCountChanged, this.counts, this]);

  };

  ControlCode.initSearch = function () {
    this.parts.searchbar.subscribe('search', this.quickSearch.bind(this));
    this.parts.searchbar.subscribe('clear', this.clearSearch.bind(this));
  }

  ControlCode.refreshSearchUI = function () {
    var tmpClearDisabled = !(this.parts.searchbar.getFieldValue('search').trim());
    this.setItemDisabled('btn-clear-search', tmpClearDisabled)
  };

  ControlCode.quickSearch = function () {
    var tmpSS = this.parts.searchbar.getFieldValue('search');
    this.mainTable.clearFilter();
    this.mainTable.addFilter(matchAny, {
      columns: this.columnSpecs,
      value: tmpSS,
      startsWith: false
    });
    this.refreshSelection();
  };

  ControlCode.clearSearch = function () {
    this.mainTable.clearFilter();
    this.setFieldValue('search', '');
    this.refreshSelection();
  };

  ControlCode.selectByUNID = function (theUNID) {

    var tmpID = theUNID;
    this.mainTable.deselectRow();

    // --- ToDo: Better way?
    var tmpRows = this.mainTable.getRows();
    for (var iPos in tmpRows) {
      var tmpRow = tmpRows[iPos];
      var tmpDoc = tmpRow.getData();
      if (tmpDoc.id == tmpID) {
        tmpRow.select();
        break;
      }
    }

    this.refreshSelection();
  };

  ControlCode.selectAll = function () {
    this.mainTable.deselectRow();
    this.selectFiltered();
  };

  ControlCode.selectAllRows = function () {
    this.mainTable.deselectRow();
    var selectedRows = this.mainTable.getRows();
    this.batchSelect = true;
    for (var iPos in selectedRows) {
      var tmpRow = selectedRows[iPos];
      var tmpData = tmpRow.getData();
      if (tmpData._deleted != "1") {
        this.mainTable.selectRow(tmpRow);
      }
    }
    this.batchSelect = false;
    this.refreshSelection();
  };

  ControlCode.selectNone = function () {
    this.mainTable.deselectRow();
    this.refreshSelection();
  };

  ControlCode.selectFiltered = function () {
    this.mainTable.deselectRow();
    var selectedRows = this.mainTable.getRows('active');
    this.batchSelect = true;
    for (var iPos in selectedRows) {
      this.mainTable.selectRow(selectedRows[iPos]);
    }
    this.batchSelect = false;

    this.refreshSelection();
  };

  ControlCode.getSelectedKeys = function () {
    var tmpRet = [];

    var tmpSelected = this.mainTable.getSelectedRows();
    if (tmpSelected && tmpSelected.length) {
      for (var iPos in tmpSelected) {
        var tmpSel = tmpSelected[iPos];
        var tmpSelDoc = tmpSel.getData();
        if (tmpSelDoc && tmpSelDoc.id) {
          tmpRet.push(tmpSelDoc.id);
        } else {
          console.warn("Document did not have a UNID.", tmpSelDoc);
        }
      }
    }
    return tmpRet;
  };


  ControlCode.exportTable = function () {
    this.mainTable.download("xlsx", "myview.xlsx", {
      sheetName: "Exported Data"
    });
  }

  var ThisControl = {
    specs: ControlSpecs,
    options: {
      proto: ControlCode,
      parent: ThisApp
    }
  };
  return ThisControl;
})(ActionAppCore, $);