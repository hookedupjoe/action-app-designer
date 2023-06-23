(function (ActionAppCore, $) {

  var ControlSpecs = {
    options: {
      padding: false,
      css: ['.table-footer {clear:right;line-height:30px;padding-left:10px;border:none;color: #2185d0;}']
    },
    content: [
      {
        "ctl": "ui",
        "name": "search-toolbar",
        "classes": "labeled icon compact",
        "content": [{
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
        }, {
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
        }, {
          "ctl": "button",
          "toLeft": true,
          "color": "blue",
          "icon": "trash",
          hidden: true,
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
        ctl: 'div',
        classes: 'clearboth pad2'
      },
      {
        ctl: 'div',
        name: 'layout',
        content: [
          
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
          {
            "ctl": "control",
            "controlname": "ReportViewer",
            "catalog": "_designer",
            "name": "viewer"
          }
        ]

      }]
  };

  var ControlCode = {};
 

  ControlCode._onInit = function () {
    this.viewer = this.parts.viewer;
    //--- Update the internal configuration to hide stuff we don't need for our use / in dialog
    var tmpToHide = ['submit-bar', 'title', 'welcome'];
    for (var iPos in tmpToHide) {
      this.parts.mainform.controlConfig.index.all[tmpToHide[iPos]].classes = 'hidden';
      this.parts.mainform.controlConfig.index.all[tmpToHide[iPos]].hidden = true;
    }
    this.viewer.subscribe('selectionChange', this.onSelectionChange.bind(this))
    this.viewer.subscribe('doubleClick', this.editDoc.bind(this))

    this.thisReportSetup();
  };

  
  

  ControlCode.onSelectionChange = function (theEvent,theChangeFlag,theCounts,theTable) {
    var tmpSelDisabled = (theCounts.filtered === 0);
    this.setItemDisabled('btn-select-filtered-footer', tmpSelDisabled);
    this.setItemDisabled('btn-select-filtered', tmpSelDisabled);

    var tmpNoneDisabled = (theCounts.selected === 0);
    this.setItemDisabled('btn-page-tb-recycle', tmpNoneDisabled);

    var tmpNotOneDisabled = (theCounts.selected !== 1);
    this.setItemDisabled('btn-page-tb-edit', tmpNotOneDisabled);

  };

  

  ControlCode.recycleSelected = function () {
    var self = this;
    ThisApp.confirm('Recycle the selected documents?', 'Recycle?').then(function (theIsYes) {
      if (theIsYes) {
        self.recycleSelectedRun()
      }
    });
  }
  ControlCode.recycleSelectedRun = function () {

    var tmpSelected = this.viewer.getSelectedKeys();
    var tmpData = {
      ids: tmpSelected
    }

    var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
    var tmpPostOptions = {
      formSubmit: false,
      data: tmpData,
      url: tmpBaseURL + '/wp-json/actappdesigner/recycle?open'
    }

    var self = this;
    ThisApp.apiCall(tmpPostOptions).then(function () {
      self.viewer.showReport();
    });


  }

  ControlCode.editDoc = function (theParams,theOptionalRow) {
    //--- Account for double click row
    var tmpSelected = theOptionalRow;
    if( tmpSelected ){
      tmpSelected = [theOptionalRow];
    } else {
      tmpSelected = this.viewer.getSelectedKeys()
    }

    if( tmpSelected.length != 1){
      alert('Select only one document to edit', 'Can not edit multiple records', 'e');
      return;
    }
    
    var tmpRow = this.viewer.mainTable.getRow(tmpSelected[0]);
    var self = this;

    // var tmpID = this.getFieldValue('id');
    // var tmpPassField = this.getFieldSpecs('user_pass');
    // var tmpUserIDField = this.getFieldSpecs('user_login');

    // if( tmpID ){
    //   tmpPassField.req = true;
    //   tmpUserIDField.readonly = false;
    // } else {
    //   tmpUserIDField.readonly = true;
    //   tmpPassField.req = false;
    // }

    self.parts.mainform.getFieldSpecs('user_login').readonly = true;
    self.parts.mainform.getFieldSpecs('user_pass').req = false;
    self.parts.mainform.prompt({ title: 'Edit User Information', submitLabel: 'Save Changes', doc: tmpRow._row.data }).then(function (theSubmit, theData) {
      if (!theSubmit) { return; }

      theData.id = tmpRow._row.data.id;
      theData.__id = tmpRow._row.data.id;
      theData.__doctype = tmpRow._row.data.__doctype;
      theData.__doctitle = tmpRow._row.data.__doctitle;

      //console.log('updated data', theData);

      self.parts.mainform.submitForm().then(function () {
        console.log('updated', arguments);
        self.viewer.showReport();
      });

    })

  }

  ControlCode.newDoc = function () {
    var self = this;
    self.parts.mainform.getFieldSpecs('user_login').readonly = false;
    self.parts.mainform.getFieldSpecs('user_pass').req = true;
    self.parts.mainform.prompt({ title: 'Add User', submitLabel: 'Submit'}).then(function (theSubmit, theData) {
      if (!theSubmit) { return; }
      self.parts.mainform.submitForm().then(function () {
        self.viewer.showReport();
      });
    })
  }

  ControlCode.thisReportSetup = function () {

    
    // Define columns based on Tabulator column documentation	 
    var tmpTableCols = [{
      "title": "User ID",
      "field": "user_login",
      frozen: true
    }, {
      "title": "First Name",
      "field": "first_name",
      frozen: false
    }, {
      "title": "Last Name",
      "field": "last_name",
      frozen: false
    }, {
      "title": "E-Mail",
      "field": "user_email"
    }, {
      "title": "Role",
      "field": "role"
    }, {
      "title": "Description",
      "field": "description"
    }, {
      "title": "ID",
      "field": "id"
    }, {
      "title": "Capabilities",
      "field": "capabilities"
    }]


    var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
    var tmpURL = tmpBaseURL + '/wp-json/actappdesigner/users';
console.log('tmpURL',tmpURL);
    //--- Use tableConfig to include any Tabulator config options 
    //    ... used with new Tabulator({...});  
    this.parts.viewer.setup({
      endpoint: tmpURL,
      tableConfig: {
        initialSort: [{
          column: "user_login",
          dir: "asc"
        }]
      },
      columns: tmpTableCols
    })
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