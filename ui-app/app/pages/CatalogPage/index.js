/*
Author: Joseph Francis
License: MIT
*/
//---  CatalogPage module --- --- --- --- --- --- --- --- --- --- --- --- 
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisPageSpecs = {
        pageName: "CatalogPage",
        pageTitle: "Catalog",
        pageNamespace: 'catalog',
        navOptions: {
            topLink: true,
            sideLink: true
        },
        //linkDisplayOption:'both',
        appModule: AppModule
    };

    // //--- Define page templates that should load when the page is activated
    // thisPageSpecs.pageTemplates = {
    //     baseURL: 'app/pages/CatalogPage/tpl',
    //     //-- Page to lookup : name to call it when pulling
    //     //---  Good to "namespace" your templates with the page prefix to avoid name conflicts
    //     templateMap: {
    //         "page-west.html": thisPageSpecs.pageNamespace + ":page-west",
    //         "page-header.html": thisPageSpecs.pageNamespace + ":page-header",
    //         "page-body.html": thisPageSpecs.pageNamespace + ":page-body",
    //         "page-footer.html": thisPageSpecs.pageNamespace + ":page-footer"
    //     }
    // }
    //         //"page-east.html": thisPageSpecs.pageNamespace + ":page-east",

    //--- Define this applications layouts
    thisPageSpecs.layoutOptions = {
        baseURL: 'app/pages/CatalogPage/',
        html: {
            "west": "page-west",
            "north": "page-header",
            "center": "page-body",
            "east": "page-east",
            "south": "page-footer"
        },
        spotPrefix: thisPageSpecs.pageNamespace,
        north: true,
        west: true,
        east: true
    }
//            "east": "page-east",

    //--- Customize default layout configuration
    //--- See http://layout.jquery-dev.com/documentation.cfm for details
    thisPageSpecs.layoutConfig = {
        east__size: "30%",
        west__size: "10%",
        west__size: "10%"
        ,	west__togglerTip_open:		"Close West Pane"
		,	west__togglerTip_closed:		"Open West Pane"
		,	west__resizerTip_open:		"Resize West Pane"
		,	west__slideTrigger_open:		"click" 	// default
		,	west__initClosed:				false
    }

    //--- Start with a ase SitePage component
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    ThisPage.lastAudit = { status: false, results: { title: "No Audit Run" } };

    ThisPage.showOutLoading = showOutLoading;
    function showOutLoading() {
        ThisPage.loadSpot('home-output', '', 'app:page-loading-spinner');
    }

    ThisPage.showPreviewLoading = showPreviewLoading;    
    function showPreviewLoading() {
       //-- Disabled --- ThisPage.loadSpot('preview-area', '', 'app:page-loading-spinner');
       ThisPage.jsEditor.setValue('');
    }
    ThisPage.showLoading = showLoading;
    function showLoading() {
        showPreviewLoading();
        showOutLoading();
    }

    ThisPage.showPreview = showPreview;
    function showPreview(theContent, theOptionalTemplateName) {
       //-- Disabled --- ThisPage.loadSpot('preview-area', theContent, theOptionalTemplateName);
    }

    ThisPage.showOut = showOut;
    function showOut(theContent, theOptionalTemplateName) {
        ThisPage.loadSpot('home-output', theContent, theOptionalTemplateName);
    }

    ThisPage.showSelectionDetails = showSelectionDetails;
    function showSelectionDetails(theContent, theOptionalTemplateName) {
        ThisPage.loadSpot('selection-details', theContent, theOptionalTemplateName);
    }


    ThisPage.refreshSelectionDetails = refreshSelectionDetails;
    function refreshSelectionDetails() {
        if (!ThisPage.currentDataTable) {
            showSelectionDetails('No Report Run');
            return;
        }
        ThisPage.loadSpot('total-count', ThisPage.currentData.length);

        var tmpSelCount = ThisPage.currentDataTable.rows({ search: 'applied' }).count();
        if( ThisPage.searchField.val() ){
            ThisPage.loadSpot("search-count",tmpSelCount);
            ThisPage.btnSelectSearch.removeClass('disabled');
        } else {
            ThisPage.loadSpot("search-count",'');
            ThisPage.btnSelectSearch.addClass('disabled');
        }

        var tmpCount = ThisPage.currentDataTable.rows({ selected: true }).count();
        if (tmpCount == 0) {
            showSelectionDetails('0');
            ThisPage.loadSpot("selection-actions", "");
            return;
        }

    
        showSelectionDetails('' + tmpCount + '');
        var tmpActions = '<a pageaction="promptRecycleSelected" class="item ui button basic blue"><i class="circle remove icon" /> &#160;Recycle [' + tmpCount + ']</a>';
        if (tmpCount == 1) {
            tmpActions += '<a pageaction="openSelected" class="item"><i class="circle arrow up icon" /> &#160;Open</a>';
        }
        ThisPage.loadSpot("selection-actions", tmpActions)
    }

    ThisPage.rowSelected = function (theTable, theIndexes) {
        refreshSelectionDetails();
    }

    ThisPage.rowDeselected = function (theTable, theIndexes) {
        refreshSelectionDetails();
    }

    ThisPage.openSelected = function () {
        alert("not implemented")
    }

    function getSelectedKeys() {
        var tmpKeys = [];
        ThisPage.currentDataTable.rows({ selected: true }).every(
            function (index, element) {
                var tmpData = this.data();
                if (tmpData && tmpData._id) {
                    tmpKeys.push(tmpData._id);
                }
            });
        return tmpKeys.join(",");
    }

    ThisPage.runRecycleSelected = function () {
        ThisPage.promptDialog.modal("hide");
        var tmpKeys = getSelectedKeys();
        var tmpURL = '/app/action?name=recycle&keys=' + tmpKeys;

        ThisPage.processingDialogShow();
        ThisApp.common.apiCall({
            url: tmpURL
        }).then(
            function (theResponse) {
                ThisPage.processingDialogHide();
                console.log("theResponse", theResponse);
                ThisPage.refreshReport();
            },
            function (theError) {
                ThisPage.processingDialogHide();
                showPreview("Error running recycle<br/>" + theError.toString());
            }
        )
    }

    ThisPage.promptRecycleSelected = function (theNoPromptFlag) {
        var tmpKeys = getSelectedKeys();
        if (!(tmpKeys)) {
            alert("no keys")
            return;
        }
        tmpKeys = tmpKeys.split(",");

        ThisPage.promptDialogShow('Do you want to remove the selected ' + tmpKeys.length + ' document(s)?', "Recycle Selected", "catalog:runRecycleSelected")

    }


    ThisPage.tableSelectNone = function () {
        if (!ThisPage.currentDataTable) {
            alert("Run report first");
            return
        }
        ThisPage.currentDataTable.rows().deselect();
    }

    ThisPage.tableSelectAll = function () {
        if (!ThisPage.currentDataTable) {
            alert("Run report first");
            return
        }
        ThisPage.currentDataTable.rows().deselect();
        ThisPage.currentDataTable.rows().select();
    }
    ThisPage.tableSelectSearchResults = function () {
        if (!ThisPage.currentDataTable) {
            alert("Run report first");
            return
        }
        if( !ThisPage.searchField.val() ){
            return;
        }
        ThisPage.currentDataTable.rows().deselect();
        ThisPage.currentDataTable.rows({ search: 'applied' }).select();
    }

    ThisPage.previewDocument = previewDocument;
    function previewDocument(theActionOrID, theTarget) {
        if (theTarget) {
            var tmpID = ($(theTarget).attr('data-id'));
            if (tmpID) {
                runPreviewDocument(tmpID)
            } else {
                console.error("Could not find data-id in target element");
            }

        } else {
            runPreviewDocument(theActionOrID)
        }

    }

    ThisPage.runReport = runReport;
    function runReport(theActionOrName, theTarget){
        var tmpViewName = theActionOrName;
        if(theTarget){
            tmpViewName = $(theTarget).attr('viewname');
        }
        if(!(tmpViewName)){
            throw "No view name provided"
        }
        ThisPage.currentViewName = tmpViewName;
        ThisPage.loadReport();
    }

    function runPreviewDocument(theID) {
        var tmpURL = "/app/view?name=" + ThisPage.currentViewName + "&key=" + theID;
        ThisPage.showPreviewLoading();
        ThisApp.common.apiCall({
            url: tmpURL
        }).then(
            function (theResponse) {
                var tmpData = [];
                if (theResponse && theResponse.status && theResponse.results && theResponse.results.data) {
                    tmpData = theResponse.results.data;
                }
                ThisPage.showPreviewJson({ data: tmpData });
            },
            function (theError) {
                showPreview("Error loading preview<br/>" + theError.toString());
            }
        )

    }

    ThisPage.quickSearch = quickSearch;
    function quickSearch() {
        var tmpSearchVal = ThisPage.searchField.val();
        ThisPage.currentDataTable.search(tmpSearchVal).draw();
        refreshSelectionDetails();
    }

    ThisPage.clearSearch = clearSearch;
    function clearSearch() {
        ThisPage.searchField.val('');
        ThisPage.currentDataTable.search('').draw();
        refreshSelectionDetails();
    }

    ThisPage.selectReport = function(){
       
        console.log("click")
        // ThisApp.aboutThisApp();
        var tmpHTML = '';
        tmpHTML += "Add selection of which report to run here<br />"
        var tmpFooterHTML = '';
        tmpFooterHTML += '<button class="ui button basic green">More Options</button>';
        //Right Align if desired?
        //tmpFooterHTML += '<div style="float:right;padding-right:5px;margin-bottom:5px;"><button class="ui button basic green">Testing</button></div>';
 
        ThisApp.showCommonDialog({ 
            header: "Select Report",
            content: tmpHTML,         
            onClose: function(){alert('See the results');},
            footer: tmpFooterHTML
         });
  
         
    }
    ThisPage.currentViewName = 'databases-all';
    
    function createDataTable(theOptions) {
        var tmpOptions = theOptions || {};

        var tmpTableEl = ThisPage.dt.addTable(ThisPage.spot('home-output'));

        var tmpNewTable = tmpTableEl.DataTable({
            data: ThisPage.currentData,
            select: {
                'style': 'multi',
                'selector': '[app-use="table-row-selector"]'
            },
            order: [[1, 'dec']],
            paging: false,
            buttons: [],
            dom: 'Bfrtip',
            columnDefs: [{
                "aTargets": [0],
                "width": 100,
                "sortable": false,
                "mRender": function (data, type, full) {
                    if (type == 'sort') {
                        return data;
                    } else {
                        var tmpToShow = '';
                        tmpToShow += '<div class="ui compact icon menu">';
                        tmpToShow += '<a app-use="table-row-selector" class="item"><i class="circle check icon blue"></i></a>';
                        tmpToShow += '<a data-id="' + data + '" pageaction="previewDocument" class="item"><i class="black eye icon"></i></a>';
                        tmpToShow += '</div>';
                        return tmpToShow;
                    }
                }
            }
            ],
            "columns": [
                { "title": "", "data": "_id" },
                { "title": "Name", "data": "name" },
                { "title": "Title", "data": "title" },
            ]
        });



        tmpNewTable
            .on('select', function (e, dt, type, indexes) {
                ThisPage.rowSelected(tmpNewTable, indexes);
            })
            .on('deselect', function (e, dt, type, indexes) {
                ThisPage.rowDeselected(tmpNewTable, indexes);
            });

        ThisPage.currentDataTable = tmpNewTable;
        $('.dataTables_filter input').hide();
        $('.dataTables_filter label').hide();

        refreshSelectionDetails();
        ThisPage.quickSearch();
    }
    ThisPage.loadRecycled = function () {

    }
    function transformData(theData){
        var tmpRet = [];
        for (var index = 0; index < theData.length; index++) {
            var tmpDoc = theData[index];
            //--ToDo: change this to common method to assure expected values are there or blank like server side does
            
            tmpDoc.name = tmpDoc.name || false;
            if( !tmpDoc.name ){
                if( tmpDoc.first_name && tmpDoc.last_name){
                    tmpDoc.name = tmpDoc.first_name + ' ' + tmpDoc.last_name
                } else {
                    tmpDoc.name = tmpDoc._id || '(unknown)'
                }
            }
            tmpDoc.title = tmpDoc.title || tmpDoc.animal || '';
            tmpRet.push(tmpDoc);
        }
        return tmpRet;
    }
    ThisPage.refreshReport = function () {
        ThisPage.showPreviewLoading();
        var tmpURL = "/app/view?name=" + ThisPage.currentViewName;
        ThisPage.currentDataTable.clear();
        ThisPage.currentDataTable.draw();
        ThisApp.common.apiCall({
            url: tmpURL
        }).then(
            function (theResponse) {
                
                var tmpData = [];
                if (theResponse && theResponse.status && theResponse.results && theResponse.results.data) {
                    tmpData = theResponse.results.data;
                }
                tmpData = transformData(tmpData)
                ThisPage.currentData = tmpData;
                ThisPage.currentDataTable.rows.add(tmpData);
                ThisPage.currentDataTable.draw();

                $('.dataTables_filter input').hide();
                $('.dataTables_filter label').hide();

                refreshSelectionDetails();
                ThisPage.quickSearch();

            },
            function (theError) {
                showOut("Error loading report<br/>" + theError.toString());
                showPreview("");

            }
        )
    }
    ThisPage.loadReport = function () {
        ThisPage.showLoading();
        
        var tmpURL = "/app/view?name=" + ThisPage.currentViewName;

      

        ThisApp.common.apiCall({
            url: tmpURL
        }).then(
            function (theResponse) {
                
                var tmpData = [];
                if (theResponse && theResponse.status && theResponse.results && theResponse.results.data) {
                    tmpData = theResponse.results.data;
                }

                tmpData = transformData(tmpData)
                //console.log("tmpData.data",tmpData.data)
                ThisPage.currentData = tmpData;
  
                createDataTable();


            },
            function (theError) {
                showOut("Error loading report<br/>" + theError.toString());
                showPreview("");

            }
        );


    }

    ThisPage.savePreviewDoc = function(){
        var tmpContent = ThisPage.jsEditor.getValue();
        var tmpOptions = {
            url: '/app/action?name=update-docs',
            method: 'POST',
            data: tmpContent,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        };
        ThisApp.common.apiCall(tmpOptions).then(
            function (theResults) {
                ThisApp.appMessage("Document Saved", true, {show:true, data:theResults});
                ThisPage.refreshReport();
            }
        )

    }
    ThisPage.showWestSidebar = function(){
        ThisPage.layout.toggle('west');
    }
    ThisPage._onInit = function (theApp) {
        ThisPage._om = theApp.om;
        ThisPage.dt = theApp.getComponent("plugin:DataTables");
    }

    ThisPage._onFirstActivate = function (theApp) {
        var tmpThis = this;


        ThisPage.initOnFirstLoad().then(
            function () {
                var me = ThisPage;
//                ThisPage.loadLayoutSpot('east', '<div class="ace-editor" appuse="catalog:ace-json-editor"></div>')
                var tmpAceEl = ThisPage.getByAttr$({appuse:"catalog:ace-json-editor"});

                ThisPage.jsEditor = ace.edit(tmpAceEl.get(0));
                ThisPage.jsEditor.setTheme("ace/theme/vibrant_ink");
                ThisPage.jsEditor.setFontSize(16);
                ThisPage.jsEditor.session.setMode("ace/mode/json");
                ThisPage.jsEditor.session.setTabSize(2);
        
                ThisPage.searchField = $('[appuse="table-search"]');
                ThisPage.searchField.keyup(function (e) {
                    if (e.keyCode == 13) {
                        ThisPage.quickSearch();
                    } else if (e.keyCode == 27) {
                        ThisPage.clearSearch();
                    } else {
                        var tmpVal = ThisPage.searchField.val();

                        if (tmpVal === '' || (tmpVal && tmpVal.length == 1 && e.keyCode == 8)) {
                            ThisPage.clearSearch();
                        } else if (tmpVal) {
                            ThisPage.quickSearch();
                        }
                    }
                });

                ThisPage.processingDialog = ThisPage.getByAttr$({ appuse: "catalog:processing-dialog" }).modal('setting', 'closable', false);
                ThisPage.processingDialogShow = function () {
                    ThisPage.processingDialog.modal('show');
                }
                ThisPage.processingDialogHide = function () {
                    ThisPage.processingDialog.modal('hide');
                }
                ThisPage.promptDialog = ThisPage.getByAttr$({ appuse: "catalog:prompt-dialog" }).modal();

                ThisPage.promptDialogTitle = ThisPage.getByAttr$({ appuse: "catalog:prompt-dialog-title" });
                ThisPage.promptDialogText = ThisPage.getByAttr$({ appuse: "catalog:prompt-dialog-text" });
                ThisPage.promptDialogOK = ThisPage.getByAttr$({ appuse: "catalog:prompt-dialog-yes" });

                ThisPage.promptDialogShow = function (thePromptText, theTitle, theAction) {
                    ThisPage.promptDialogTitle.html(theTitle);
                    ThisPage.promptDialogText.html(thePromptText);
                    ThisPage.promptDialogOK.attr("action", theAction);
                    ThisPage.promptDialog.modal('show');
                }
                
                ThisPage.btnSelectSearch = ThisPage.getByAttr$({appuse:"catalog:select-search"})
                setTimeout(function () {
                    ThisPage.loadReport();
                }, 100);

                //ThisApp.refreshLayouts();

            }
        );

    }



    ThisPage.showPreviewJson = showPreviewJson;
    function showPreviewJson(theObject) {
        showJson(theObject, 'preview-area')
    }

    function showJson(theObject, theSpotName) {
        var tmpOptions = {
            collapsed: false,
            withQuotes: true
        };
        ThisPage.jsEditor.setValue(JSON.stringify(theObject,null,'\t'));
        ThisPage.jsEditor.clearSelection();
        //$('[spot="' + theSpotName + '"]').jsonViewer(theObject, tmpOptions);
    }

})(ActionAppCore, $);
