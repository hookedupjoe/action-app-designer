
(function () {
  window.ThisApp = null;
  var tmpHasLaunched = false;

  try {


    var tmpPageNames = ["ContentSite"];
    var tmpPluginNames = [];

    if (typeof (window.cordova) == 'undefined') {
      window.isWeb = true;
      
      if( getUrlParameter('app') == 'true' ){
        ActionAppCore.isMobileApp = true;
        $('body').addClass('cordova-app');
      }
      
      setup();
      return;
    }

    //---- ACTUAL CODE ==    
    ActionAppCore = ActionAppCore || window.ActionAppCore;

    var app = {
      initialize: function () {
        //document.write('<br />INIT CALLED')
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
      },
      onBackButton: function () {
        ThisApp.publish("onBackButton");
        //console.log("mobileBackPress");
        /*
        ThisApp.hideSidebar();
        ThisApp.closeCommonDialog();
        if (ThisApp.activePopup) {
          ThisApp.clearActivePopup();
        }
        */
        return false;
      },
      onVolUpButton: function () {
        //alert('onVolUpButton');
        ThisApp.publish("onVolUpButton");
        return false;
      },
      onVolDownButton: function () {
        //alert('onVolDownButton');
        ThisApp.publish("onVolDownButton");
        return false;
      },
      onMenuButton: function () {
        //ThisApp.showSidebar();
        ThisApp.publish("onMenuButton");
        return false;
      },
      onDeviceReady: function () {
        this.receivedEvent('deviceready');

       

        document.addEventListener('backbutton', this.onBackButton.bind(this), false);
        if (typeof (navigator) != 'undefined' && typeof (navigator.app) != 'undefined' && typeof (navigator.app.overrideButton) === 'function') {
          navigator.app.overrideButton("menubutton", true); 
        }
        document.addEventListener("menubutton", this.onMenuButton, false);

         //--- This version of app.js only runs on mobile apps
        ActionAppCore.isMobileApp = true;
        $('body').addClass('cordova-app');

        //--- This flag is for native only apps
        ActionAppCore.isNativeApp = true;
        $('body').addClass('native-app');
     
        //--- Do stuff before setup if needed
        setup();

      },
      receivedEvent: function (id) {

      }
    };
    app.initialize();

  
  } catch (ex) {

  }


  function setup() {
    try {
      var siteMod = ActionAppCore.module('site');
      ThisApp = new siteMod.CoreApp();

      var tmpRequired = {}

      ThisApp.init({ customHeader: true,  pages: tmpPageNames, plugins: tmpPluginNames, required: tmpRequired }).then(function (theReply) {
        ThisApp.getByAttr$({ appuse: "app-loader" }).remove();

        $.extend(ThisApp.common, {})

      });
    } catch (ex) {

      console.error("Unexpected Error " + ex);
    }
  }



})();
