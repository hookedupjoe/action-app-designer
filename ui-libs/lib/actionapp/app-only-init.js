(function ($) {


  var tmpBody = $('body');     
  if( tmpBody.length == 0 ){
      //console.log('App Only Init - No Body Found - Aborting Init');
      return;
  } 
  var tmpPluginNames = [];
  setup(false, tmpPluginNames, false);

  ActionAppCore = ActionAppCore || window.ActionAppCore;

  function setup(thePages, thePlugins, theUseLayout) {
    try {
      var siteMod = ActionAppCore.module('site');
      ThisApp = new siteMod.CoreApp();
      if( theUseLayout !== false ){
          theUseLayout = true;
      }

      var tmpSetAlert = true;
      var tmpAlertEl = $('body');
      //--- See if we have full semantic loaded with modal function
      //   if not, do not replace the standard alert
      //console.log("typeof(tmpAlertEl.modal)",typeof(tmpAlertEl.modal))
      if( typeof(tmpAlertEl.modal) != 'function'){
//        console.log("no set")
        tmpSetAlert = false;
      }

      //--- Items to load when the application loads
      var tmpRequired = {}
      var tmp
      //--- Use tmpRequiredSpecs to preload more using that example
      ThisApp.init({ setAlert: tmpSetAlert, layout: false, pages: thePages, plugins: thePlugins, required: tmpRequired }).then(function (theReply) {
        ThisApp.getByAttr$({ appuse: "app-loader" }).remove();

        //--- Extend common with your app specific stuff
        $.extend(ThisApp.common, {
          
        })
        
      });
    } catch (ex) {
      console.error("Unexpected Error " + ex);
    }
  }





})(jQuery);