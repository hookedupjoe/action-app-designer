/*
Author: Joseph Francis
License: MIT
*/
//---  NoSQLSetupPage module --- --- --- --- --- --- --- --- --- --- --- --- 
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisPageSpecs = {
        pageName: "NoSQLSetupPage",
        pageTitle: "NoSQL Setup",
        pageNamespace: 'NoSQLSetupPage',
        navOptions: {
            topLink: true,
            sideLink: true
        },
        //linkDisplayOption:'both',
        appModule: AppModule
    };

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';


    //--- Define page templates that should load when the page is activated
    thisPageSpecs.required = {
        templates: {
            baseURL: pageBaseURL + 'tpl',
            map: {
                "setup-info": thisPageSpecs.pageNamespace + ":setup-info",
                "account-info": thisPageSpecs.pageNamespace + ":account-info",
                "account-list": thisPageSpecs.pageNamespace + ":account-list"
            }
        }

    }
    //"page-east.html": thisPageSpecs.pageNamespace + ":page-east",

    //--- Define this applications layouts
    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        html: {
            "west": "page-west",
            "north": "page-header",
            "east": "page-east",
            "center": "page-body",
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
        east__size: "60%"
        , west__size: "10%"
        , west__togglerTip_open: "Close West Pane"
        , west__togglerTip_closed: "Open West Pane"
        , west__resizerTip_open: "Resize West Pane"
        , west__slideTrigger_open: "click" 	// default
        , west__initClosed: false
    }

    //--- Start with a ase SitePage component
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    //--- Private variable to use for prompting
    ThisPage._onInit = function (theApp) {

    }

    ThisPage._onFirstActivate = function (theApp) {
        var tmpThis = this;
        ThisPage.dt = theApp.getComponent("plugin:DataTables");
        ThisPage.forms = theApp.getComponent("plugin:Forms");
        ThisPage._om = theApp.om;

        ThisPage.initOnFirstLoad().then(
            function () {

                //---- Setup forms used on this page, only one time when page first open
                var tmpAccountFormSpecs = {
                    "formname": thisPageSpecs.pageNamespace + ":account",
                    "requiredFieldList": ["name", "access", "account|url", "key", "password"],
                    "defaultCaption": "Save Account Changes",
                    "defaultTitle": "Edit Account",
                    "newCaption": "Save New Account",
                    "newTitle": "New Account",
                    "items": [{
                        "name": "name",
                        "label": "Unique Account Name",
                        "type": "text"
                    },
                    {
                        "name": "access",
                        "label": "Access Level",
                        "type": "dropdown",
                        "list": ["API Key|api", "Full Admin Access|admin"]
                    },
                    {
                        "name": "account",
                        "label": "Account",
                        "type": "text",
                        "note": "Need either an Account or a URL but not both"
                    },
                    {
                        "name": "url",
                        "label": "URL",
                        "type": "text"
                    },
                    {
                        "name": "key",
                        "label": "API Key",
                        "type": "text"
                    },
                    {
                        "name": "password",
                        "label": "Password",
                        "type": "text"
                    }]
                    ,
                    validation: function (theFormObject) {
                        //--- Do form level validation here
                        var tmpFormDetails = theFormObject || false;
                        if (!tmpFormDetails) {
                            console.warn("No form details passed, can not run form validation")
                            return true;
                        }
                        if (theFormObject.data.url && theFormObject.data.account) {
                            var tmpFF = theFormObject.fields.account;
                            tmpFF.focus();
                            var tmpFieldWrap = tmpFF.closest('.field');
                            if (tmpFieldWrap) {
                                tmpFieldWrap.addClass('error')
                            }
                            alert("You can not have both a URL and an account, one or the other only");
                            //--- Return false to not close the dialog
                            return false;
                        }
                        return true;
                    }
                }

                ThisPage.accountForm = ThisPage.forms.newForm(tmpAccountFormSpecs);
                ThisPage.accountForm.loadTemplate();

                setTimeout(function () {
                    ThisPage.loadPageDetails();
                }, 100);
            }
        );

    }

    ThisPage.showWestSidebar = function () {
        ThisPage.layout.toggle('west');
    }

    ThisPage.accountList = [];
    ThisPage.loadPageDetails = loadPageDetails;
    function loadPageDetails() {
        refreshSetupDetails()

    }

    ThisPage.showSetupInfo = showSetupInfo;
    function showSetupInfo() {
        ThisPage.loadSpot('east', ThisPage.pageDetails, ThisPage.ns('setup-info'))
    }
    ThisPage.submitAccountForm = submitAccountForm;
    function submitAccountForm(thePromptStatus) {
        if (thePromptStatus === false) {
            return true;
        }

        var tmpFormObj = ThisPage.accountForm.getFormDetails();
        var tmpIsValid = ThisPage.accountForm.isValid(tmpFormObj);

        if (tmpIsValid) {
            sendSetupUpdate({ process: 'accountPut', data: tmpFormObj.data })
        }
        return tmpIsValid;
    };

    function sendSetupUpdate(theDetails) {
        ThisApp.apiCall({
            url: '/app/action?name=db-setup-update',
            method: 'POST',
            data: JSON.stringify(theDetails),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).then(
            function (theReply) {

                var tmpSetupDoc;
                if (theReply && theReply.status == true) {
                    var tmpData = theReply.results;
                    //--- If the API returns a setup doc, use it
                    if (tmpData && tmpData.setupDoc) {
                        tmpSetupDoc = tmpData.setupDoc;
                        refreshFromSetupDoc({ setup: tmpSetupDoc });
                    } else {
                        refreshSetupDetails();
                    }

                } else {
                    alert("Did not save correctly, try again")
                }


            }
        )


    }

    function refreshUI() {
        ThisPage.loadSpot('center', { items: ThisPage.accountList }, ThisPage.ns('account-list'))
        showSetupInfo();
    }
    ThisPage.showLoading = showLoading;
    function showLoading() {
        ThisPage.loadSpot('center', '', 'app:page-loading-spinner');
    }

    ThisPage.promptAccountForm = promptAccountForm;
    function promptAccountForm(theAccount, theTarget) {

        var tmpAccount = false;
        var tmpIsNew = false;
        //--- If we get an account object as the first param
        //Note: If called from action, the first param will be a string, the name of the action
        if (typeof (theAccount) == 'object') {
            tmpAccount = theAccount;
        } else {
            tmpIsNew = true;
            //--- Setup default values
            tmpAccount = {
                access: "api"
            }
        }

        ThisPage.accountForm.prompt({
            isNew: tmpIsNew,
            doc: tmpAccount,
            promptOptions: {
                callback: ThisPage.submitAccountForm.bind(ThisPage)
            }
        })
        /*
        
                var tmpHTML = ThisApp.renderTemplate(ThisPage.accountForm.getFormName(), tmpAccount);
        
                var tmpCaption = "Save Account Changes";
                var tmpTitle = "Edit Account";
                if (tmpIsNew) {
                    tmpCaption = "Save New Account";
                    tmpTitle = "New Account";
                }
        
                ThisApp.prompt({
                    title: tmpTitle,
                    text: tmpHTML,
                    callback: ThisPage.submitAccountForm.bind(ThisPage),
                    //process: ThisPage.ns('submitAccountForm'),
                    buttons: {
                        yes: tmpCaption,
                        no: "Cancel"
                    }
                })
                // //returns a promise if no action used
                // //returns even if with callback used and is called when callback does not return false
                // .then(
                //     function (theResults) {
                //         alert("closed " + theResults)
                //     }
                // )
                
        
        
        */
    };

    ThisPage.removeAccount = removeAccount;
    function removeAccount(theAction, theTarget) {
        var tmpName = ''
        if (theTarget) {
            var tmpEl = $(theTarget)
            var tmpName = tmpEl.attr('name');
        }

        ThisApp.confirm("Remove account: " + tmpName, "Remove Account?").then(
            function (theConfirmed) {
                if (!theConfirmed) {
                    return;
                }
                var tmpDetails = {
                    process: 'accountRemove',
                    name: tmpName
                }
                sendSetupUpdate(tmpDetails)
            }
        )

    };



    ThisPage.editAccount = editAccount;
    function editAccount(theAction, theTarget) {
        var tmpName = ''
        if (theTarget) {
            var tmpEl = $(theTarget)
            var tmpName = tmpEl.attr('name');
        }

        var tmpAccount = ThisPage.accountIndex[tmpName] || false;
        promptAccountForm(tmpAccount);
    };


    ThisPage.refreshFromSetupDoc = refreshFromSetupDoc;
    function refreshFromSetupDoc(theSetupDoc) {
        var tmpData = theSetupDoc;
        ThisPage.accountList = [];
        ThisPage.accountIndex = {};
        if (tmpData && tmpData.setup && tmpData.setup.dataMap) {
            ThisPage.pageDetails = tmpData.setup.dataMap;
            if (ThisPage.pageDetails.databases) {
                var tmpDBList = [];
                for (var aName in ThisPage.pageDetails.databases) {
                    var tmpDBName = ThisPage.pageDetails.databases[aName];
                    tmpDBList.push({
                        "name": aName,
                        "dbname": tmpDBName
                    })

                }
                ThisPage.pageDetails.dblist = tmpDBList;
            }
            if (ThisPage.pageDetails.accounts) {
                var tmpAccounts = ThisPage.pageDetails.accounts;
                ThisPage.accountIndex = tmpAccounts;
                for (var aName in tmpAccounts) {
                    var tmpAcctInfo = tmpAccounts[aName];
                    tmpAcctInfo.name = aName;
                    ThisPage.accountList.push(tmpAcctInfo);
                }
            }
        }

        refreshUI()
    };



    ThisPage.refreshSetupDetails = refreshSetupDetails;
    function refreshSetupDetails() {

        //if theOptionalSetupDoc use it, else look it up
        ThisPage.showLoading();
        var tmpURL = "/app/action?name=directory-setup-doc";

        ThisApp.apiCall({
            timeout: 3000,
            url: tmpURL
        }).then(
            function (theResponse) {
                var tmpData = [];
                if (theResponse && theResponse.status && theResponse.results) {
                    tmpData = theResponse.results;
                }
                refreshFromSetupDoc(tmpData)
            },
            function (theError) {
                var tmpMessage = "Error getting database list"
                if (theError && theError.status == 0) {
                    tmpMessage = "Network error, assure app running."
                }
                ThisPage.loadSpot('center', tmpMessage);
            }
        )
    }

    ThisPage.openThisAccount = openThisAccount;
    function openThisAccount(theAction, theTarget) {
        var tmpName = $(theTarget).attr('name');
        var tmpData = ThisPage.accountIndex[tmpName];
        if (!(tmpData)) {
            ThisPage.loadSpot('east', "Account not found: " + tmpName);
        }
        ThisPage.loadSpot('east', tmpData, ThisPage.ns('account-info'));
    }


    ThisPage.name = name;
    function name(theAction, theTarget) {
        var tmpEl = false;
        if (theTarget) {
            tmpEl = $(theTarget)
        }
    };

    ThisPage.editDatabaseMap = editDatabaseMap;
    function editDatabaseMap(theAction, theTarget){
        var tmpEl = false;
        var tmpName = '';
        var tmpDBName = '';
        if( theTarget ){
            tmpEl = $(theTarget);
            tmpName = tmpEl.attr('name');
            tmpDBName = tmpEl.attr('dbname');

        }
        //todo:

        var tmpTitle = "New Actual Database for [" + tmpName + "]";
        var tmpButtonCaption = "Save Database Mapping";
        var tmpDefault = tmpDBName;

        ThisApp.input("Update actual database name of " + tmpName + " to  ...", tmpTitle, tmpButtonCaption, tmpDefault).then(function(theValue){
            if(!(theValue)){return};
            if (theValue) {
                var tmpDetails = {
                    process:'dbMapPut',
                    data: {
                        dbname: theValue,
                        name: tmpName
                    }
                }
                sendSetupUpdate(tmpDetails);
            }
        })
       

    };
    
    
    ThisPage.removeDatabaseMap = removeDatabaseMap;
    function removeDatabaseMap(theAction, theTarget){
        var tmpEl = false;
        var tmpName = '';
        if( theTarget ){
            tmpEl = $(theTarget);
            tmpName = tmpEl.attr('name');

        }

        ThisApp.confirm('Remove <b style="font-size:bolder">' + tmpName + '</b> from db mapping?','Remove DB Mapping').then(function(theIsYes){;
            if( !(theIsYes) ){return};
            var tmpDetails = {
                process:'dbMapRemove',
                data: {
                    name: tmpName
                }
            }
            sendSetupUpdate(tmpDetails);
        });
        
        
    };
    
    
    ThisPage.createDatabaseMap = createDatabaseMap;
    function createDatabaseMap(theAction, theTarget) {
        var tmpEl = false;
        if (theTarget) {
            tmpEl = $(theTarget)
        }
        if (tmpEl) {

        }

        var tmpFormName = ThisPage.ns("new-db-map")
        var tmpValidation = {
            requiredFieldList: ['name','dbname'],
            requiredMessage: "Fill in the virtual and actual database name fields before adding a mapping"
        }

        //--- How to validate
        //** if form has <div class="field"> around it, it will show red on error, else not */
        var tmpFormDetails = ThisApp.forms.getFormDetails(tmpFormName);
        var tmpIsValid = ThisApp.forms.validateForm(tmpFormDetails, tmpValidation)
        
        
        if( tmpIsValid ){
            
            
            var tmpDetails = { process: 'dbMapPut', data: tmpFormDetails.data }
            if (!(tmpDetails)){
                throw("No document to add")
            }
            
            
            sendSetupUpdate(tmpDetails);
        }
       

    };




})(ActionAppCore, $);
