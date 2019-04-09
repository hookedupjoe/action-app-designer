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
        north: { control: "north" },
        east: false,
        west: { partname: "west", control: "west" },
        center:  { html: "mock-workspace-page" },
        south: false
    }

    //center:  { html: "layout-demo-1" },
    //center: { control: "center" },

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


    actions.runTest2 = runTest2;
    function runTest2(theParams, theTarget){
        alert("Page Test 2");
    };

    
    actions.runTest1 = runTest1;
    function runTest1(theParams, theTarget) {
       
        var defaultLayoutOptions = {
            spacing_closed: 8,
            spacing_open: 6,
            resizable: true,
            togglerLength_open: 100,
            togglerLength_closed: 100,
            south__resizable: false,
            south__closable: false,
            south__slidable: false,
            south__togglerLength_open: 0,
            south__spacing_open: 0,
            north__resizable: false,
            north__closable: false,
            north__slidable: false,
            north__togglerLength_open: 0,
            north__spacing_open: 0
        };
    
// alert("Test One Ran")
        
       ThisPage.getSpot('layout').layout(defaultLayoutOptions);
       

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

  actions.showPrompter = showPrompter;
  function showPrompter(theParams, theTarget){
       var tmpEl = $(theTarget);
       var tmpPageEl = tmpEl.closest('[group="app:pages"]');
       var tmpPromptEl = ThisApp.getByAttr$({ appuse: 'prompter' });

       
        //--- Move the flyover mast and related flyover to the page
        //    ... so that pageaction works naturally
        tmpPromptEl.detach().appendTo(tmpPageEl);

       var tmpHTML = [];
tmpHTML.push('<div class="ui dimmer modals page transition visible active" style="display: flex !important;">')
tmpHTML.push('  <div class="ui modal transition visible active" style="display: block !important;">')
tmpHTML.push('    <div spot="prompter-dlg-content" >')

tmpHTML.push('<div style="padding:5px;border:solid 5px transparent;" appcomp="layout">')
tmpHTML.push('    <div class="ui-layout-center">Center</div>')
tmpHTML.push('    <div class="ui-layout-north">North</div>')
tmpHTML.push('    <div class="ui-layout-south">South</div>')
tmpHTML.push('    <div class="ui-layout-east">East</div>')
tmpHTML.push('    <div class="ui-layout-west">West</div>')
tmpHTML.push('</div>')


tmpHTML.push('    </div>')
tmpHTML.push('  </div>')
tmpHTML.push('</div>')

       ThisApp.loadSpot('prompter-content', tmpHTML.join(''));

       tmpPromptEl.removeClass('hidden');
       ThisApp.initAppComponents(ThisApp.getSpot('prompter-content'))


       ThisApp.refreshLayouts();

  };
  
    
    actions.addApp = addApp;
    function addApp(theParams, theTarget) {
        ThisPage.getPanel('frmNewApp').prompt(
            {
                isNew: true,
                doc: { template: 'default' }
            }
        ).then(function (theSubmitted, theData) {
            if (!theSubmitted) {
                return;
            }
            
            ThisApp.common.apiCall({
                url: '/design/ws/new-app',
                data: theData
            })
            console.log('theData', theData);
        })
    };


})(ActionAppCore, $);
