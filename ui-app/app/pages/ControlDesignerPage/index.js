/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisPageSpecs = {
        pageName: "ControlDesignerPage",
        pageTitle: "Designer",
        pageNamespace: 'ctldesign',
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
                "controls/FormShowFor": "FormShowFor"
            }
        }
    }

    thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        panels: {
            "center": { partname: "body", control: "center" },
            "north": { partname: "north", control: "header" },
            "east": { partname: "east", control: "east" },
            "west": { partname: "west", control: "west" }
        },
        // controls: {
        //   "south": { partname: "south", control: "TesterControl" }
        // },
        templates: {
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
        west__size: "20%"
        , east__size: "40%"
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
                ThisPage.loadPageSpot('header-area', 'Welcome');

                

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
    
  
    var tests = {
        "hello": function(theParams){
            alert("Hello World Again")
        }
        ,"test2": test2
        ,"test3": test3
        ,"test4": test4
        ,"test5": test5
        ,"helloFromName": helloFromName
        ,"spots": playWithSpots
    }
    
    
    actions.helloFromName = helloFromName;
    function helloFromName(){
        var tmpName = ThisPage.parts.west.getFieldValue('yourname');
        ThisPage.parts.body.parts.control1.sayHello(tmpName)
    };

    function test5(theParams){
        demoPullingNewResources()
    }

    function getControlAndCreateInstanceInASpot(theParams){
        var tmpTargetItem = ThisPage.parts.body.getItem('control1');
        var tmpEl = tmpTargetItem.el;
        
        var tmp = ThisPage.res.controls['tester'];

        var tmpPart = tmpCtl.create('body-control1');

        tmpPart.loadToElement(tmpEl);
        tmpPart.sayHello('Dynamic Dan')

    }

    //---- DEMOs
    function demoPullingNewResources(theParams){
        
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
        tmpLocation = ThisApp.common.samplesBaseURL

        ThisApp.om.getObjects('[html]:' + tmpLocation, tmpDocsList).then(function (theDocs) {
            var tmpDoc = theDocs[tmpFN];
            if (!(tmpDoc)) {
                alert("Not found " + tmpFN);
               return false
            } else {
                delete (tmpDoc._key);
                var tmpCtl = eval(tmpDoc);
                console.log( 'tmpCtl', tmpCtl);
                tmpCtl.prompt()
            }
        });

    };


    function test4(theParams){
        var tester = ThisPage.getControl('TesterControl');
        tester.prompt()
        
    }
    function test3(theParams){
        alert("This space intentionally left blank")
    }
    
    var tmpTest2Counter = 0;
    function test2(theName){
        tmpTest2Counter++;
        var tmpArea = ThisPage.parts.body;
        var tmpArea2 = ThisPage.parts.east;
        var tmpArea3 = ThisPage.parts.body.parts.panel1;

        tmpArea.getSpot("body").css('color','blue');
        tmpArea.loadSpot("body", "Hello Center Spot " + tmpTest2Counter);
        tmpArea.gotoItem('body');

        var tmpNewText = '';
        if( (tmpTest2Counter % 2) == 1 ){
            tmpNewText = 'New Top Header';
        }
        tmpArea.runItemAction('card-full-matt', 'setTopHeader', {text:tmpNewText})
        // tmpArea2.getSpot("body").append("Hello East Spot");
        tmpArea2.loadSpot("body", "Hello East Spot " + tmpTest2Counter);
        tmpArea2.gotoItem('body');

        tmpArea3.loadSpot("body", "Hello Panel 1 in body spot " + tmpTest2Counter);
        tmpArea3.gotoItem('body');

        //ThisPage.part.east.addToSpot("body", "Hello East Spot");
    }

    function playWithSpots(theName){
        var tmpPreviewArea = ThisPage.parts.east;
        
        ThisPage.loadSpot("hello-area", "Hello Area");
        ThisPage.loadSpot("preview-details", "Hello World Again");
        tmpPreviewArea.gotoItem('preview-details');
        
        var tmpIsVis = tmpPreviewArea.getItemDisplay('preview-details');
        tmpPreviewArea.setItemDisplay('preview-details', !tmpIsVis, ['slow']);

        ThisPage.parts.body.parts.panel1.loadSpot('body', "Hello Panel One Spot");
        ThisPage.parts.body.parts.panel1.gotoItem('body')

    }

    actions.runTest = runTest;
    function runTest(theParams, theTarget){
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['testname','param1','param2'])
        var tmpName = tmpParams.testname || '';
        if( !(tmpName) ){
            alert('Test ran, add testname param to run a specific test');
            return;
        }
        var tmpTestFunc = tests[tmpName];
        if( !(tmpTestFunc) ){
            alert('Test ' + tmpName + ', add testname param to run a specific test');
            return;
        }
        tmpTestFunc(theParams);

    };
    

})(ActionAppCore, $);
