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
          "catalog": "_designer",
          "controlname": "DataViewDefinition",
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
                },
                {
                  "ctl": "button",
                  "toLeft": true,
                  "color": "blue",
                  "icon": "right chevron",
                  compact: true,
                  "name": "btn-page-tb-open",
                  "label": "Open",
                  "onClick": {
                    "run": "action",
                    "action": "openSelected"
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
     //--- Anything when initially created the table
    }
  
    ControlCode._onInit = function() {
      var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
      var tmpViewer = this.getViewControl();
      tmpViewer.setReportURL(tmpBaseURL + '/wp-json/actappdesigner/alldocs/?dataview=dataviews');
      tmpViewer.subscribe('selectionChange', refreshSelection.bind(this));
      tmpViewer.subscribe('tableBuilt', onTableBuilt.bind(this));
  
      //--- Update the internal configuration to hide stuff we don't need for our use / in dialog
      var tmpToHide = ['submit-bar',
        'headertitle',
        'welcome'];
      var tmpItems = this.parts.mainform.controlConfig.index.all;
      for (var iPos in tmpToHide) {
        var tmpKey = tmpToHide[iPos];
        if( tmpItems[tmpKey] ){
          tmpItems[tmpKey].classes = 'hidden';
          tmpItems[tmpKey].hidden = true;
        }
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
      // ThisApp.delay(1000).then(function(){
  
      // })
    };
  
    ControlCode.getViewControl = getViewControl;
    function getViewControl() {
      return this.parts.report;
    }
  
    ControlCode.thisReportSetup = function() {
      // Define columns based on Tabulator column documentation
      var tmpTableCols = [ {
        "title": "Data View Name",
        "field": "name",
        frozen: true
      },
        {
          "title": "Title",
          "field": "title",
          frozen: true
        },
        {
          "title": "Post Type",
          "field": "sourceposttype"
        },
        {
          "title": "Doc Type",
          "field": "sourcedoctype"
        },
        {
          "title": "Write Caps",
          "field": "writecaps"
        },
        {
          "title": "Read Caps",
          "field": "readcaps"
        }];
  
  
      //--- Use tableConfig to include any Tabulator config options
      //    ... used with new Tabulator({...});
      this.getViewControl().setup( {
        
        tableConfig: {
          groupToggleElement:"header",
          groupBy:['sourceposttype'],
          groupHeader:function(value, count, data, group){
            var tmpVal = value;
            if( tmpVal == 'actappdesigndoc'){
              tmpVal = 'Design Documents';
            }
            if( tmpVal == 'actappdoc'){
              tmpVal = 'Application Documents';
            }
            return tmpVal + '<span class="ui label blue small basic"> ' + count + ' </span>';
          },
  
          initialSort: [ {
            column: "name",
            dir: "asc"
          }]
        },
        columns: tmpTableCols
      });
    };
  
    ControlCode.newDoc = function() {
      var self = this;
  
      var tmpThis = this;
      var tmpViewer = this.getViewControl();
  
      self.parts.mainform.prompt({
        title: 'Add Data View', submitLabel: 'Save Data View'
      }).then(function(theSubmit, theData) {
        if (!theSubmit) {
          return;
        }
  
        self.parts.mainform.submitForm().then(function() {
          console.log('submitted', arguments);
          tmpViewer.showReport();
        });
  
      });
  
  
  
    };

    
    ControlCode.editDoc = function() {
      var tmpDoc = this.getViewControl().getFirstSelectedDoc();
      var self = this;
      self.parts.mainform.prompt({
        title: 'Edit Data View Definition',
        submitLabel: 'Save Changes',
        doc: tmpDoc
      }).then(function(theSubmit,
        theData) {
        if (!theSubmit) {
          return;
        }
  
        self.parts.mainform.submitForm().then(function() {
          tmpViewer.showReport();
        });
  
      });
  
    };
  
  
  
    
    ControlCode.openSelected = function() {
      var tmpRowData = this.getViewControl().getFirstSelectedDoc();
      ThisApp.actions.selectListItem({itemname: tmpRowData.name, itemtitle: tmpRowData.title, dataview:'y', viewname:tmpRowData.name })
    };

    ControlCode.recycleSelected = function() {
      var self = this;
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
      var tmpData = {
        ids: tmpSelected
      };
  
      var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
      var tmpPostOptions = {
        formSubmit: false,
        data: tmpData,
        url: tmpBaseURL + '/wp-json/actappdesigner/recycle?open'
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
    }
  
    var ThisControl = {
      specs: ControlSpecs,
      options: {
        proto: ControlCode,
        parent: ThisApp
      }};
    return ThisControl;
  })(ActionAppCore, $);