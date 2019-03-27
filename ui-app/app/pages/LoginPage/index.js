/*
Author: Joseph Francis
License: MIT
*/

//---  Logs Page module --- --- --- --- --- --- --- --- --- --- --- --- 
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisPageSpecs = {
        pageName:"LoginPage", 
        pageTitle: "Log In", 
        pageNamespace: 'login',
        navOptions: {
            icon: 'login',
            topLink:false,
            sideLink:true
        },
        appModule:AppModule
    };

   

    thisPageSpecs.layoutOptions = {
        baseURL: 'app/pages/LoginPage/',
        html: {
            "center": "page-body"
        },  
        spotPrefix: thisPageSpecs.pageNamespace,
        north: false,
        south: false,
        west:false,
        east: false
    }

    //--- Start with a ase SitePage component
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    ThisPage.templates = {};

    //===== Hook into the application lifecycle for this page =====
    // .. they happen in this order

    //=== On Application Load ===
    /*
    * This happens when the page is loaded, try to push activity back to when the tab is used
    *    If your component need to do stuff to be availale in the background, do it here
    */
    ThisPage._onPreInit = function(theApp){
        ThisPage.om = theApp.om;
        
    }
    ThisPage._onInit = function() {
    }

    //=== On Page Activation ===
    /*
    * This happens the first time the page is activated and happens only one time
    *    Do the lazy loaded stuff in the initial activation, then do any checks needed when page is active
    *    Do stuff that needs to be available from this component, such as services, 
    *     that are needed even if the page was not activated yet
    */
    ThisPage._onFirstActivate = function(theApp){

        ThisPage._om = theApp.om;
        ThisPage.inBuffer = 40;
        ThisPage.outBuffer = 12;
        ThisPage.minHeight = 50;

        ThisPage.aboutThisPage = function(){
            ThisApp.showCommonDialog({ header: "About this application", content: {data:'', template:'app:about-this-app'} });
        }
        ThisPage.doLogin = function(){
            var tmpUser = ThisPage.getByAttr$({appuse:'login:username'});
            var tmpPassword = ThisPage.getByAttr$({appuse:'login:password'});
            return ThisApp.doLogin(tmpUser.val(), tmpPassword.val())
            .done(
                function(theResponse){
                    {
                        window.location = window.location;
                    }
                }
            ).fail(
                function(){
                    tmpUser.focus();
                    alert("Could not log in");
                }
            );
        }

        ThisPage.initOnFirstLoad().then(
            function(){
                
                
                ThisPage._onActivate();
            }
        );        
    }
    
    ThisPage._onActivate = function(){
       
    }
    //--- End lifecycle hooks

    //--- Layout related lifecycle hooks
    ThisPage._onResizeLayout = function(){
        ThisPage.refreshMainGrid();
    }
    //--- End Layout related lifecycle hooks



        
})(ActionAppCore, $);
