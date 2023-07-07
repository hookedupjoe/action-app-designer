(function (ActionAppCore, $) {

  var ControlSpecs = {
    options: {
      padding: false
    },
    content: [{
      ctl: 'div',
      classes: 'hidden',
      content: [{
        "ctl": "control",
        "catalog": "_samples",
        "controlname": "FieldsTestForm",
        "name": "mainform"
      }]
    },
      {
        "ctl": "layout",
        "attr": {
          "rem-template": "customDemo1"
        },
        "name": "lo",
        "north": [{
          ctl: 'div',
          name: 'toolbar',
          content: [{
            "ctl": "ui",
            "name": "search-toolbar",
            "classes": "labeled icon compact pad5",
            hidden: false,
            "content": [ {
              "ctl": "button",
              "toLeft": true,
              "color": "blue",
              "icon": "plus",
              compact: true,
              "name": "btn-page-tb-new",
              "label": "Add",
              "onClick": {
                "run": "action",
                "action": "newDoc"

              }
            },
              {
                "ctl": "button",
                "toLeft": true,
                "color": "blue",
                "icon": "pencil",
                compact: true,
                "name": "btn-page-tb-edit",
                "label": "Edit",  
                "onClick": {
                  "run": "action",
                  "action": "editDoc"
                }
              },
              {
                "ctl": "button",
                "toLeft": true,
                "color": "blue",
                "icon": "trash",
                compact: true,
                "name": "btn-page-tb-recycle",
                "label": "Recycle",
                "onClick": {
                  "run": "action",
                  "action": "recycleSelected"
                }
              }]
          },
            {
              ctl: 'divider',
              fitted: true,
              clearing: true
            }]
        }],
        "center": [{
          ctl: "control",
          name: "report",
          catalog: "_designer",
          controlname: "ReportViewerFrame"
        }]

      }]
  };

  var ControlCode = {};

  function onTableBuilt() {
    var tmpAdminH = $('#wpadminbar');
    var tmpAH = 0;
    if (tmpAdminH && tmpAdminH.length > 0) {
      tmpAH = tmpAdminH.height();
    }
    var tmpSH = $('[spot="viewer"]');
    if (tmpSH && tmpSH.length > 0) {
      tmpSH = tmpSH.offset().top;
      $(window).scrollTop(tmpSH-tmpAH-10);
    }
  }
  ControlCode.getControlInfo = function(){
      return {
        name: 'FieldsTestDocs',
        usage: 'To manage fieldstest doctype using the FieldsTestForm control.'
      }  
  }
  ControlCode._onInit = function() {
    //--- TEMP DEBUG
    window.activeControl = this;
    window.activeReport = this.parts.report;
    
    //this.currentAccount = '_home';
    //this.currentAppName = this.getAppName();
    this.currentDocType = 'fieldstest';
    

    var tmpBaseURL = ActionAppCore.ActAppData.rootPath;

    var tmpViewer = this.getViewControl();
    tmpViewer.setReportURL(tmpBaseURL + 'appdata/api/get-appdocs.json?open', {
      doctype: this.currentDocType
    });
    tmpViewer.subscribe('selectionChange', refreshSelection.bind(this));
    tmpViewer.subscribe('tableBuilt', onTableBuilt.bind(this));



    this.parts.mainform.refreshUI();

    //window.reportViewer = this;
    this.lastScrollH = 0;
    this.lastScrollV = 0;

    this.getViewControl().initSearch();
    if (this.initRan === true) {
      return;
    }
    this.initRan = true;
    this.dataVersion = 0;

    this.thisReportSetup();
  };

  ControlCode.getViewControl = getViewControl;
  function getViewControl() {
    return this.parts.report;
  }

  var cellContextMenu = [
      {
          label:"Reset Value",
          action:function(e, cell){
              cell.setValue("");
          }
      }
  ]

  ControlCode.getMainForm = function() {
      return this.parts.mainform;
  }
  
  ControlCode.thisReportSetup = function() {

    // Define columns based on Tabulator column documentation
    var tmpTableCols = [{
      "title": "Text Field",
      "field": "textfield",
      "frozen": true
    },
      {
        "title": "Number Field",
        "field": "numberfield"
      },
      {
        "title": "Date and Time",
        "field": "datetimefield",
        contextMenu: cellContextMenu,
        formatter: "datetime",
        formatterParams: ActionAppCore.ActAppData.formatters.datetime.formatterParams
      },
      {
        "title": "Date",
        "field": "datefield",
        formatter: "datetime",
        formatterParams: ActionAppCore.ActAppData.formatters.date.formatterParams
      },
      {
        "title": "Time",
        "field": "timefield",
        formatter: "datetime",
        formatterParams: ActionAppCore.ActAppData.formatters.time.formatterParams
      },
      {
        "title": "Drop Down",
        "field": "status"
      },
      {
        "title": "Multi-Select",
        headerSort: false,
        formatter: ActionAppCore.ActAppData.formatters.multivaluenewline,
        "field": "dropdownmultifield"
      },
      {
        "title": "Select one option",
        "field": "radiolistfield"
      },
      {
        "title": "Select any of these",
        headerSort: false,
        width:'100',
        "field": "radiolistfield-other"
      },
      {
        "title": "Text Area",
        formatter: ActionAppCore.ActAppData.formatters.textarea,
        "field": "textareafield"
      },
      {
        "title": "Country",
        "field": "country"
      },
      {
        "title": "City",
        "field": "city"
      },
      {
        "title": "State",
        "field": "state"
      },
      {
        "title": "State Other",
        "field": "state-other"
      },
      {
        "title": "Zip Code",
        "field": "zipcode"
      }];


    //--- Use tableConfig to include any Tabulator config options
    //    ... used with new Tabulator({...});
    this.getViewControl().setup( {

      tableConfig: {
         movableColumns: true,
        initialSort: [ {
          column: "textfield",
          dir: "asc"
        }]
      },
      columns: tmpTableCols
    });
  };


  ControlCode.submitForm = function(theData) {


    var tmpData = {
      data: theData
    };
    var tmpDocTitle = tmpData.title;

    var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
    var tmpDocType = this.currentDocType;
    // tmpData.accountid = this.currentAccount; //ToDo: dyno
    // tmpData.dbname = 'DemoDataApp1';
    //tmpData.appid = this.currentAppName;

    //ToDo: Move this up
    // var tmpCollName = 'actapp-' + (theData.__doctype || 'default');
    // tmpData.collection = tmpCollName;
    tmpData.doctype = theData.__doctype;
    var tmpPostOptions = {
      formSubmit: false,
      dataContext: this,
      data: tmpData,
      url: tmpBaseURL + 'appdata/api/save-doc.json'
    };

    return ThisApp.apiCall(tmpPostOptions);
  }


  ControlCode.newDoc = function() {
    var self = this;

    var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
    var tmpViewer = this.getViewControl();
    self.parts.mainform.prompt({
      title: 'Add Test Doc', submitLabel: 'Save New Doc'
    }).then(function(theSubmit, theData) {
      if (!theSubmit) {
        return;
      }
      console.log('theData back', theData)
      self.submitForm(theData).then(function() {
        tmpViewer.showReport();
      });
      //console.log('theData',theData);
      // self.parts.mainform.submitForm().then(function() {
      //   tmpViewer.showReport();
      // });
      //-- move this into here


    });



  };

  ControlCode.editDoc = function() {
    var tmpViewer = this.getViewControl();
    var tmpSelected = tmpViewer.getSelectedKeys();
    var tmpRow = tmpViewer.mainTable.getRow(tmpSelected[0]);
    var self = this;

    self.parts.mainform.prompt({
      title: 'Edit Test Doc',
      submitLabel: 'Save Changes',
      doc: tmpRow._row.data
    }).then(function(theSubmit,
      theData) {
      if (!theSubmit) {
        return;
      }
      console.log('theData', theData);
      self.submitForm(theData).then(function() {
        tmpViewer.showReport();
      });

    });

  };



  ControlCode.recycleSelected = function() {
    var self = this;
    var tmpViewer = this.getViewControl();
    ThisApp.confirm('Recycle the selected documents?',
      'Recycle?').then(function(theIsYes) {
        if (theIsYes) {
          self.recycleSelectedRun();
        }
      });
  };

  ControlCode.recycleSelectedRun = function(theContext) {
    var tmpViewer = this.getViewControl();
    var tmpSelected = tmpViewer.getSelectedKeys();
    var self = this;
    var tmpData = {
      ids: tmpSelected
    };

    //tmpData.appid = this.currentAppName;
    tmpData.doctype = this.currentDocType;

    var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
    var tmpPostOptions = {
      formSubmit: false,
      data: tmpData,
      dataContext: this,
      url: tmpBaseURL + 'appdata/api/recycle-docs.json?open'
    };

    ThisApp.apiCall(tmpPostOptions).then(function() {
      tmpViewer.showReport();
    });


  };

  ControlCode.refreshSelection = refreshSelection;
  function refreshSelection() {
    var tmpViewer = this.getViewControl();

    var tmpSelDisabled = (tmpViewer.counts.filtered === 0);
    this.setItemDisabled('btn-select-filtered-footer',
      tmpSelDisabled);
    this.setItemDisabled('btn-select-filtered',
      tmpSelDisabled);

    var tmpNoneDisabled = (tmpViewer.counts.selected === 0);
    this.setItemDisabled('btn-page-tb-recycle',
      tmpNoneDisabled);

    var tmpNotOneDisabled = (tmpViewer.counts.selected !== 1);
    this.setItemDisabled('btn-page-tb-edit',
      tmpNotOneDisabled);

    this.publish('selectionChanged',
      [this,
        tmpViewer,
        tmpViewer.mainTable]);
  }

  var ThisControl = {
    specs: ControlSpecs,
    options: {
      proto: ControlCode,
      parent: ThisApp
    }};
  return ThisControl;
})(ActionAppCore, $);