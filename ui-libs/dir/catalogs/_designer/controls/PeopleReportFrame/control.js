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
          "controlname": "PersonForm",
          "name": "personform"
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
      //console.log('onTableBuilt');
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
      var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
      var tmpViewer = this.getViewControl();
      tmpViewer.setReportURL(tmpBaseURL + '/wp-json/actappdesigner/dataview?dataview=people');
      tmpViewer.subscribe('selectionChange', refreshSelection.bind(this));
      tmpViewer.subscribe('tableBuilt', onTableBuilt.bind(this));
  
      //--- Update the internal configuration to hide stuff we don't need for our use / in dialog
      var tmpToHide = ['submit-bar',
        'title',
        'welcome'];
      for (var iPos in tmpToHide) {
        this.parts.personform.controlConfig.index.all[tmpToHide[iPos]].classes = 'hidden';
        this.parts.personform.controlConfig.index.all[tmpToHide[iPos]].hidden = true;
      }
  
      this.parts.personform.refreshUI();
  
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
        "title": "Last Name",
        "field": "lastname",
        frozen: true
      },
        {
          "title": "First Name",
          "field": "firstname",
          frozen: true
        },
        {
          "title": "E-Mail",
          "field": "email"
        },
        {
          "title": "Phone Number",
          "field": "phone"
        },
        {
          "title": "Address",
          "field": "address"
        },
        {
          "title": "Address 2",
          "field": "address2"
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
          "title": "State (other)",
          "field": "state-text"
        },
        {
          "title": "Country",
          "field": "country"
        },
        {
          "title": "Zipcode",
          "field": "zipcode"
        },
        {
          "title": "Comments",
          "field": "comments"
        }];
  
  
      //--- Use tableConfig to include any Tabulator config options
      //    ... used with new Tabulator({...});
      this.getViewControl().setup( {
  
        tableConfig: {
          initialSort: [ {
            column: "lastname",
            dir: "asc"
          }]
        },
        columns: tmpTableCols
      });
    };
  
    ControlCode.newDoc = function() {
      var self = this;
  
      var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
      var tmpURL = tmpBaseURL + '/wp-json/actappdesigner/json_from_csv?run&pos=auto';
      var tmpThis = this;
      var tmpViewer = this.getViewControl();
      ThisApp.apiCall(tmpURL).then(function(theReply) {
        if (theReply && theReply.data && theReply.data.length) {
          var tmpDoc = theReply.data[0];
          self.parts.personform.prompt({
            title: 'Add Person', submitLabel: 'Save New Person', doc: tmpDoc
          }).then(function(theSubmit, theData) {
            if (!theSubmit) {
              return;
            }
            self.parts.personform.submitForm().then(function() {
              console.log('submitted', arguments);
              tmpViewer.showReport();
            });
  
          });
        } else {
          self.parts.personform.prompt({
            title: 'Add Person', submitLabel: 'Save New Person'
          }).then(function(theSubmit, theData) {
            if (!theSubmit) {
              return;
            }
            console.log('data', theData);
  
            self.parts.personform.submitForm().then(function() {
              console.log('submitted', arguments);
              tmpViewer.showReport();
            });
  
          });
        }
      });
  
  
    };
  
    ControlCode.editDoc = function() {
      var tmpViewer = this.getViewControl();
      var tmpSelected = tmpViewer.getSelectedKeys();
      var tmpRow = tmpViewer.mainTable.getRow(tmpSelected[0]);
      var self = this;
  
      self.parts.personform.prompt({
        title: 'Edit Person',
        submitLabel: 'Save Changes',
        doc: tmpRow._row.data
      }).then(function(theSubmit,
        theData) {
        if (!theSubmit) {
          return;
        }
  
        self.parts.personform.submitForm().then(function() {
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
  
    ControlCode.recycleSelectedRun = function() {
      var tmpViewer = this.getViewControl();
      var tmpSelected = tmpViewer.getSelectedKeys();
      var self = this;
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