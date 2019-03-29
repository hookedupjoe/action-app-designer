/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisPageSpecs = {
        pageName: "UsingControlsPage",
        pageTitle: "Using Controls",
        pageNamespace: 'ctluse',
        navOptions: {
            topLink: true,
            sideLink: true
        },
        appModule: AppModule
    };

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';

    thisPageSpecs.required = {
        controls: {
            baseURL: pageBaseURL,
            map: {
                "controls/TesterControl": "TesterControl",
                "controls/FormShowFor": "demoFormCtl"
            }
        }
    }

    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        controls: {
            "west": { partname: "buttonPanel", control: "buttonPanel" },
            "east": { partname: "previewPanel", control: "east" },
            "north": { partname: "north", control: "north" }
        },
        html: {
            "center": "page-body"
        },
        facetPrefix: thisPageSpecs.pageNamespace,
        north: true,
        south: false,
        west: true,
        east: true
    }

    //--- Customize default layout configuration
    //--- See http://layout.jquery-dev.com/documentation.cfm for details
    thisPageSpecs.layoutConfig = {
        west__size: "250"
        , east__size: "500"
    }

    //--- Start with a ase SitePage component
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    // .. they happen in this order

    //=== On Application Load ===
    /*
    * This happens when the page is loaded, try to push activity back to when the tab is used
    *    If your component need to do stuff to be availale in the background, do it here
    */
    var actions = ThisPage.pageActions;
    ThisPage._onPreInit = function (theApp) {
        ThisPage._om = theApp.om;
        ThisPage.pageActions
    }
    ThisPage._onInit = function () {

    }

    //=== On Page Activation ===
    /*
    * This happens the first time the page is activated and happens only one time
    *    Do the lazy loaded stuff in the initial activation, then do any checks needed when page is active
    *    Do stuff that needs to be available from this component, such as services, 
    *     that are needed even if the page was not activated yet
    */
    ThisPage._onFirstActivate = function (theApp) {



        //--- Create Custom Web Controls to use in control JSON at "ctl"
        //     - Namespace it - one global web controls, similar to one templating engine
        var ControlHelloWorld = {
            getHTML: function (theControlName, theObject, theControlObj, isSigner) {
                var tmpObject = theObject || {};
                var tmpName = tmpObject.yourname || 'World';

                var tmpHTML = [];

                tmpHTML.push('<h1>Hello ' + tmpName + '!</h1><hr /><div pagespot="hello-area">Hello Area Here</div>')

                tmpHTML = tmpHTML.join('');
                return tmpHTML;

            },
            isField: false
        }
        //--- Add Custom Web Control BEFORE doign the initOnFirstLoad so your controls are
        //    ... available to be loaded when controls are loaded

        //--- Add new page specific HTML generator        
        ThisPage.addPageWebControl("hello", ControlHelloWorld);

        ThisPage.initOnFirstLoad().then(
            function () {

                //--- Extend loaded controls as well ...
                var myStuff = {
                    helloCounter: 0,
                    sayHello: function (theOptionalName) {
                        var tmpMsg = '';
                        if (theOptionalName) {
                            tmpMsg = "Howdy " + theOptionalName;
                        } else {
                            this.helloCounter++;
                            var tmpColor = "blue";
                            if (this.helloCounter % 2 == 0) {
                                tmpColor = "orange";
                            }
                            tmpMsg = 'Hello World ' + this.helloCounter + ' times.'
                        }


                        this.setFieldValue('title', tmpMsg);
                        this.setFieldMessage('title', 'I was set', { color: tmpColor });
                        ThisApp.refreshLayouts();
                        var tmpThis = this;
                        ThisApp.delay(1000).then(function () {
                            tmpThis.setFieldMessage('title', '');
                            ThisApp.refreshLayouts();
                        })
                    }
                }
                //--- Extend the page header with new exciting funtionality
                ThisPage.parts.north.extend(myStuff);

                //--- Do special stuff on page load here
                //--- Then optionally call the stuff that will happen every time 
                //      the page is activated if not already called by above code
                ThisPage._onActivate();
            }
        );
    }

    ThisPage._onActivate = function () {
        //-- Do refresh / checks here to update when page is activated

    }
    //--- End lifecycle hooks

    //=== Page Setup


    //--- Layout related lifecycle hooks
    ThisPage._onResizeLayout = function (thePane, theElement, theState, theOptions, theName) {


        if (thePane == 'center') {


        } else if (thePane == 'east') {

        }
    }

    //=== Page Stuff


    //--- Add an action to this page ...
    actions.runTest = runTest;
    function runTest(theParams, theTarget) {
        //--- Get params if passed as an object or from attr's on theTarget
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['testname']);
        //--- Use the variables
        var tmpTestName = tmpParams.testname || tmpParams.default || '';
        if (tmpTestName == "Test 1") {
            ThisPage.loadPageSpot('hello-area', 'We are having fun now.')
        } else if (tmpTestName == "Test 2") {
            ThisPage.part.north.sayHello();
        } else if (tmpTestName == "Test 3") {
            ThisPage.getControl('demoFormCtl').prompt().then(function (theReply, theData) {
                if (theReply == false) {
                    return false;
                }
                if (theData) {
                    console.log("theData", theData);
                    alert("See console for form data", "Form Submitted");
                } else {
                    console.warn("No data returned, expected some")
                }
            })

        } else if (tmpTestName == "Test 4") {

        } else {
            tmpTestName = 'Just the test'
        }
    };


    ThisPage.sayHello = sayHello;
    function sayHello(theParams, theTarget) {
        //--- Get params if passed as an object or from attr's on theTarget
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['myname']);
        //--- Use the variables
        var tmpName = tmpParams.myname || tmpParams.default || '';

        ThisPage.part.north.sayHello(tmpName);
    };
    ThisPage.jumpToHobbies = jumpToHobbies;
    function jumpToHobbies() {
        ThisPage.part.previewPanel.gotoField('hobbies');
    };

    ThisPage.promptDemoForm = promptDemoForm;
    function promptDemoForm() {
        ThisPage.getControl('demoFormCtl').prompt().then(function (theReply, theData) {
            if (theReply == false) {
                alert("Form was not submitted", "Not Submitted", "i")
                return false;
            }
            if (theData) {
                console.log("theData", theData);
                alert("See console for the data submitted", "Form Submitted", "c");
            }
        })
    };


    ThisPage.gotoControlsPage = gotoControlsPage;
    function gotoControlsPage() {
        ThisApp.gotoPage('ControlsPage');
    };
})(ActionAppCore, $);
