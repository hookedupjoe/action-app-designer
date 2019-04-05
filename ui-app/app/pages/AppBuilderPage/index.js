/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

    var thisPageSpecs = {
        pageName: "AppBuilderPage",
        pageTitle: "App Builder",
        navOptions: {
            topLink: true,
            sideLink: true
        }
    };

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';


    thisPageSpecs.required = {
        panels: {
            map: {
                "design/ws/frmNewApp": "frmNewApp"
            }
        }
    }

    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        north: { html: "north" },
        east: false,
        west: { partname: "west", control: "west" },
        center: { html: "body" },
        south: false
    }


    //--- Customize default layout configuration
    //--- See http://layout.jquery-dev.com/documentation.cfm for details
    thisPageSpecs.layoutConfig = {
        west__size: "500"
        , east__size: "250"
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
    var appSetupConfig = false;

    ThisPage._onPreInit = function (theApp) {
        ThisPage._om = theApp.om;

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

        //--- This tells the page to layout the page, load templates and controls, et
        ThisPage.initOnFirstLoad().then(
            function () {
                //--- Now your done - READY to do stuff the first time on your page
                //ThisPage.loadPageSpot('header-area', 'Welcome');


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

    //---- DEMOs
    function demoPullingNewResources(theParams) {

        var tmpRequiredSpecs = {
            "controls": {
                baseURL: 'app/controls/special',
                list: [
                    'NewTestControl',
                    'more/NewTestControl2'
                ],
                map: {
                    "NewTestControl": "MainControl"
                    // ,"forms/TesterFormControl": "TesterFormControl"
                }
            }
        }
        var tmpThis = this;

        ThisPage.loadResources(tmpRequiredSpecs).then(function () {
            console.log('PAGE loadResources done', ThisPage.res);
            // console.log( 'tmpThis', tmpThis);
        })

    }

    //---- DEMO - See how to pull text content and eval into a live object
    function testJSPull() {

        var tmpFN = 'test.js';
        var tmpDocsList = [tmpFN];
        var tmpLocation = '/app/controls';
        tmpLocation = ThisApp.common.index.res.panels

        ThisApp.om.getObjects('[html]:' + tmpLocation, tmpDocsList).then(function (theDocs) {
            var tmpDoc = theDocs[tmpFN];
            if (!(tmpDoc)) {
                alert("Not found " + tmpFN);
                return false
            } else {
                delete (tmpDoc._key);
                var tmpCtl = eval(tmpDoc);
                console.log('tmpCtl', tmpCtl);
                tmpCtl.prompt()
            }
        });

    };

    function loadJsonFileDemo(theControlName) {
        var dfd = jQuery.Deferred();
        if (appSetupConfig) {
            dfd.resolve(true)

            return dfd.promise();
        }

        var tmpFN = 'somefile.json';
        var tmpDocsList = [tmpFN];
        var tmpLocation = 'SOMELOCATION';
        ThisApp.om.getObjects('[get]:' + tmpLocation, tmpDocsList).then(function (theDocs) {
            var tmpDoc = theDocs[tmpFN];
            if (!(tmpDoc)) {
                dfd.resolve(false);
            } else {
                dfd.resolve(tmpDoc);
            }
        });

        return dfd.promise();
    };


    actions.runTest = runTest;
    function runTest(theParams, theTarget) {
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['testname', 'param1', 'param2'])


    };



    ThisPage.runTest1 = runTest1;
    function runTest1(theParams, theTarget) {
        ThisPage.loadSpot('body', 'Test');

    };


    function demoLoadIFrame(theParams, theTarget) {
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['testname']);
        var tmpFrame = ThisPage.getByAttr$({ appuse: 'bodyframe' });
        console.log('tmpFrame', tmpFrame);
        tmpFrame.get(0).src = '/catalog/testing/subdemo.html';
    };


    actions.outlineDisplay = outlineDisplay;
    function outlineDisplay(theParams, theTarget) {
        var tmpEl = $(theTarget);
        //var tmpNext = tmpEl.parent().next(['group="' + tmpEl.attr('group') + '"']);
        var tmpSelect = tmpEl.attr('select') || '';
        var tmpScope = tmpEl.attr('scope') || '';

        if (tmpScope == 'children' && tmpSelect) {
            var tmpShow = tmpSelect == 'true';
            console.log('tmpShow', tmpShow);
            var tmpContainer = tmpEl.closest('tr').next();
            if (tmpContainer && tmpContainer.length) {
                var tmpToggles = $('[oluse="collapsable"]', tmpContainer);

                for (var iToggle = 0; iToggle < tmpToggles.length; iToggle++) {
                    var tmpToggle = $(tmpToggles[iToggle]);
                    console.log('tmpToggle', tmpToggle);

                    var tmpToggleNode = tmpToggle.find('[action="toggleMe"]');
                    var tmpIcon = tmpToggleNode.find('i');

                    tmpToggle = tmpToggle.next();

                    console.log('tmpToggleNode', tmpToggleNode);
                    var tmpIsVis = tmpToggle.is(":visible");
                    if (!(tmpShow)) {
                        tmpToggle.hide();
                        tmpIcon.removeClass('minus')
                            .addClass('plus');
                    } else {
                        tmpToggle.show();
                        tmpIcon.removeClass('plus')
                            .addClass('minus');
                    }
                }

                console.log('tmpToggles', tmpToggles);
            }
            // console.log( 'tmpContainer', tmpContainer);

        } else {

        }

    };

    actions.toggleMe = toggleMe;
    function toggleMe(theParams, theTarget) {
        console.log('toggleMe', theTarget);
        var tmpEl = $(theTarget);
        var tmpNext = tmpEl.parent().next(['group="' + tmpEl.attr('group') + '"']);
        var tmpIcon = tmpEl.find('i');
        var tmpIsVis = tmpNext.is(":visible");
        if (tmpIsVis) {
            tmpNext.hide();
            tmpIcon.removeClass('minus')
                .addClass('plus');
        } else {
            tmpNext.show();
            tmpIcon.removeClass('plus')
                .addClass('minus');
        }

    };

    ThisPage.addApp = addApp;
    function addApp(theParams, theTarget) {
        ThisPage.getPanel('frmNewApp').prompt(
            {
                isNew: true,
                doc: { cdn: 'local', pages: 'HomePage' }
            }
        ).then(function (theSubmitted, theData) {
            if (!theSubmitted) {
                return;
            }
            console.log('theData', theData);
        })
    };




})(ActionAppCore, $);
