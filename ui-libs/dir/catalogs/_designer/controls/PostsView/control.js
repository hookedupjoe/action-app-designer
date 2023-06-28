(function (ActionAppCore, $) {

    var ControlSpecs = {
      options: {
        padding: false
      },
      content: [
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
                "icon": "wordpress simple",
                compact: true,
                "name": "btn-page-tb-open",
                "label": "Open",
                "onClick": {
                  "run": "action",
                  "action": "openURL"
  
                }
              },{
                "ctl": "button",
                "toLeft": true,
                "color": "blue",
                "icon": "eye",
                compact: true,
                "name": "btn-page-tb-open-details",
                "label": "Show Details",
                "onClick": {
                  "run": "action",
                  "action": "openDetails"
  
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
                "color": "green",
                "icon": "undo",
                compact: true,
                hidden: true,
                "name": "btn-page-tb-untrash",
                "label": "Restore",
                "onClick": {
                  "run": "action",
                  "isTrash": true,
                  "action": "restoreSelected"
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
    var isTrashView = false;

    function onTableBuilt() {
     //--- Anything when initially created the table
    }
  
    ControlCode._onInit = function() {
      var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
      var tmpViewer = this.getViewControl();
      var tmpPostType = 'actappdoc';
      //tmpViewer.setReportURL(ActionAppCore.ActAppData.rootPath + '/wp-json/actappdesigner/alldocs?fields=(none)&doctype=&posttype=' + tmpPostType + '');
      tmpViewer.subscribe('selectionChange', refreshSelection.bind(this));
      tmpViewer.subscribe('tableBuilt', onTableBuilt.bind(this));
      
  
      //window.reportViewer = this;
      this.lastScrollH = 0;
      this.lastScrollV = 0;
  
      this.getViewControl().initSearch();
      if (this.initRan === true) {
        return;
      }
      this.initRan = true;
      this.dataVersion = 0;
  
      //this.thisReportSetup();
      // ThisApp.delay(1000).then(function(){
  
      // })
    };
  
    ControlCode.getViewControl = getViewControl;
    function getViewControl() {
      return this.parts.report;
    }

    // ControlCode._onDestroy = function() {
    //   for( var aPart in this.parts ){
    //     var tmpPart = this.parts[aPart]
    //     if( tmpPart && tmpPart.destroy ){
    //       tmpPart.destroy();
    //       console.log('aPart destroyed',aPart);
    //     }
    //   }
    // }

    ControlCode.setup = function(theOptions) {
      var tmpPostType = theOptions.itemname || theOptions.name;
      var tmpIsTrash = theOptions.isTrash || false;
      var tmpIsDataView = theOptions.isDataView || false;
      var tmpDataViewName = '';

      if( tmpIsDataView ){
        tmpDataViewName = theOptions.viewname || '';
      }

      isTrashView = tmpIsTrash;
      //console.log('tmpIsDataView',tmpIsDataView,tmpDataViewName);
      this.posttype = tmpPostType;
      window.tmpView = this;
      this.setItemDisplay('btn-page-tb-untrash', isTrashView)
      if( isTrashView ){
        $(this.getItem('btn-page-tb-recycle').el).html('<i class="trash icon"></i> Trash It!')
      } else {
        $(this.getItem('btn-page-tb-recycle').el).html('<i class="trash icon"></i> Recycle')
      }

      if( tmpIsTrash ){
        this.getViewControl().setReportURL(ActionAppCore.ActAppData.rootPath + '/wp-json/actappdesigner/alldocs?fields=(none)&doctype=&posttype=any&status=trash');
      } else {
        if( tmpIsDataView ){
          this.getViewControl().setReportURL(ActionAppCore.ActAppData.rootPath + '/wp-json/actappdesigner/alldocs?fields=(none)&dataview=' + tmpDataViewName + '');
        } else {
          this.getViewControl().setReportURL(ActionAppCore.ActAppData.rootPath + '/wp-json/actappdesigner/alldocs?fields=(none)&doctype=&posttype=' + tmpPostType + '');
        }

      }
      this.thisReportSetup();
    }

    ControlCode.thisReportSetup = function() {
      // Define columns based on Tabulator column documentation
      var tmpTableCols = [ {
        "title": "Title",
        "field": "__doctitle",
        frozen: true
      },
        {
          "title": "Date",
          "field": "__postdate",
          sorter:"date", 
          sorterParams:{format:"MM/DD/YYYY"}
        },
        {
          "title": "Post ID",
          "field": "id"
        },
        {
          "title": "Doc Type",
          "field": "__doctype"
        }];
  
  
      //--- Use tableConfig to include any Tabulator config options
      //    ... used with new Tabulator({...});
      this.getViewControl().setup( {
  
        tableConfig: {
          groupBy:'__doctype',
          initialSort: [ {
            column: "__doctitle",
            dir: "asc"
          }]
        },
        columns: tmpTableCols
      });
    };
  
    
    
    ControlCode.openDetails = function() {
      return this.openURL(true)
    };

    ControlCode.openURL = function(theShowDetails) {
      var tmpViewer = this.getViewControl();
      var tmpData = tmpViewer.mainTable.getSelectedData();
      if( !(tmpData && tmpData.length == 1) ){
        alert('Select one document to open');
        return;
      }
      var tmpDoc = tmpData[0];
      var tmpURL = tmpDoc['__url'];
      var tmpID = tmpDoc['id'];
      if( !tmpURL ){
        alert('No URL found');
        return;
      }

      var tmpTitle = tmpDoc['__doctitle'] || tmpURL;
      var tmpIcon = 'wordpress simple';
      var tmpTabName = 'doc-' + tmpID;

      if( theShowDetails === true ){
        tmpIcon = 'eye'
        tmpTabName += '-details';
        var tmpToAdd = 'devonlyview=fields';
        if( tmpURL.indexOf('?') == -1){
          tmpToAdd = '?' + tmpToAdd;
        } else {
          tmpToAdd = '&' + tmpToAdd;
        }
        tmpURL += tmpToAdd;
      }
      //window.open(tmpURL,'_blank');
      this.publish('urlOpenRequest', [this,tmpURL,{name: tmpTabName, title:tmpTitle, icon: tmpIcon}]);
    };

    ControlCode.restoreSelected = function() {
      var self = this;
      var tmpViewer = this.getViewControl();
      ThisApp.confirm('Restore the selected documents?',
        'Restore?').then(function(theIsYes) {
          if (theIsYes) {
            self.restoreSelectedRun();
          }
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
  
    

    ControlCode.restoreSelectedRun = function() {
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
        url: tmpBaseURL + '/wp-json/actappdesigner/restore?open'
      };
  
      ThisApp.apiCall(tmpPostOptions).then(function() {
        tmpViewer.showReport();
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
        this.setItemDisabled('btn-page-tb-untrash',
        tmpNoneDisabled);
  
      var tmpNotOneDisabled = (tmpViewer.counts.selected !== 1);
      this.setItemDisabled('btn-page-tb-open',
        tmpNotOneDisabled);
        this.setItemDisabled('btn-page-tb-open-details',
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
  