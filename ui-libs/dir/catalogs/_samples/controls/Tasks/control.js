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
        "controlname": "Task",
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

  ControlCode._onInit = function() {
    //--- TEMP DEBUG
    window.activeControl = this;
    window.activeReport = this.parts.report;
    
    var tmpBaseURL = ActionAppCore.ActAppData.rootPath;

    var tmpViewer = this.getViewControl();
    tmpViewer.setReportURL(tmpBaseURL + 'appdata/api/get-appdocs.json?open',{
      doctype: 'task'
    });
    tmpViewer.subscribe('selectionChange', refreshSelection.bind(this));
    tmpViewer.subscribe('tableBuilt', onTableBuilt.bind(this));

    //--- Update the internal configuration to hide stuff we don't need for our use / in dialog
    var tmpToHide = ['submit-bar',
      'title',
      'welcome'];
    for (var iPos in tmpToHide) {
      this.parts.mainform.controlConfig.index.items[tmpToHide[iPos]].classes = 'hidden';
      this.parts.mainform.controlConfig.index.items[tmpToHide[iPos]].hidden = true;
    }

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

  ControlCode.thisReportSetup = function() {

    // Define columns based on Tabulator column documentation
    var tmpTableCols = [ {
      "title": "Task Name",
      "field": "name",
      frozen: true
    },
      {
        "title": "Task Description",
        "field": "desc",
        frozen: true
      },
      {
        "title": "Task Status",
        "field": "status"
      },
      {
        "title": "Assigned To",
        "field": "assigned"
      },
      {
        "title": "Created On",
        "field": "createdon",
        sorter:"datetime", 
        sorterParams:{format:"MM/DD/YYYY hh:mm a"}
      },
      {
        "title": "Completed At",
        "field": "doneon",
        sorter:"datetime", 
        sorterParams:{format:"MM/DD/YYYY hh:mm a"}
      },
      {
        "title": "Task Details",
        "field": "details"
      }];


    //--- Use tableConfig to include any Tabulator config options
    //    ... used with new Tabulator({...});
    this.getViewControl().setup( {

      tableConfig: {
        initialSort: [ {
          column: "name",
          dir: "asc"
        }]
      },
      columns: tmpTableCols
    });
  };

  ControlCode.submitForm = function(theData) {
    var tmpData = {data:theData};
    var tmpDocTitle = tmpData.title;

    var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
    var tmpDocType = 'task';

    //ToDo: Move this up
    // var tmpCollName = 'actapp-' + (theData.__doctype || 'default');
    // tmpData.collection = tmpCollName;
    tmpData.doctype = theData.__doctype;

    var tmpPostOptions = {
      formSubmit: false,
      data: tmpData,
      dataContext: this,
      url: tmpBaseURL + 'appdata/api/save-doc.json'
    };

    return ThisApp.apiCall(tmpPostOptions);
  }
  
  
  ControlCode.newDoc = function() {
    var self = this;

    var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
    var tmpViewer = this.getViewControl();
    self.parts.mainform.prompt({
      title: 'Add Task', submitLabel: 'Save New Task'
    }).then(function(theSubmit, theData) {
      if (!theSubmit) {
        return;
      }
      console.log('theData back',theData)
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
      title: 'Edit Task',
      submitLabel: 'Save Changes',
      doc: tmpRow._row.data
    }).then(function(theSubmit,
      theData) {
      if (!theSubmit) {
        return;
      }
      console.log('theData',theData);
      self.submitForm(theData).then(function() {
        tmpViewer.showReport();
      });
      // self.parts.mainform.submitForm().then(function() {
      //   tmpViewer.showReport();
      // });

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

  ControlCode.recycleSelectedRun = function() {
    var tmpViewer = this.getViewControl();
    var tmpSelected = tmpViewer.getSelectedKeys();
    var self = this;
    var tmpData = {
      ids: tmpSelected
    };
    console.log('tmpSelected',tmpSelected)
    tmpData.doctype = 'task';

    var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
    var tmpPostOptions = {
      formSubmit: false,
      dataContext: this,
      data: tmpData,
      url: tmpBaseURL + 'appdata/api/recycle-docs.json?open'
    };

    ThisApp.apiCall(tmpPostOptions).then(function() {
      console.log('recycle complete', arguments);
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
    
    this.publish('selectionChanged', [this,tmpViewer,tmpViewer.mainTable]);
  }

  var ThisControl = {
    specs: ControlSpecs,
    options: {
      proto: ControlCode,
      parent: ThisApp
    }};
  return ThisControl;
})(ActionAppCore, $);