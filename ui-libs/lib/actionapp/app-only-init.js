(function ($) {


    var tmpBody = $('body');     
    if( tmpBody.length == 0 ){
        return;
    } 
    var tmpPluginNames = [];
    
    setup(false, tmpPluginNames, false);
  
    ActionAppCore = ActionAppCore || window.ActionAppCore;
  
    
    function setup(thePages, thePlugins, theUseLayout) {
      try {
        var siteMod = ActionAppCore.module('site');
        window.ThisApp = new siteMod.CoreApp();
        if( theUseLayout !== false ){
            theUseLayout = true;
        }
  
        var tmpSetAlert = true;
        var tmpAlertEl = $('body');
        if( typeof(tmpAlertEl.modal) != 'function'){
          tmpSetAlert = false;
        }
  
        //--- Items to load when the application loads
        var tmpRequired = {}
        
        ActionAppCore.subscribe('app-loaded', function(){
          ThisApp.initAppComponents();
        });
        //--- Use tmpRequiredSpecs to preload more using that example
        ThisApp.init({ setAlert: tmpSetAlert, layout: false, pages: thePages, plugins: thePlugins, required: tmpRequired }).then(function (theReply) {
          ThisApp.getByAttr$({ appuse: "app-loader" }).remove();
  
          
          window.addEventListener('resize', ThisApp.grid16.onResize );
  
  
          ThisApp.grid16.resizeLayoutProcess();
          
  
          //--- Extend common with your app specific stuff
          $.extend(ThisApp.common, {
            
          })
          
        });
      } catch (ex) {
        console.error("Unexpected Error " + ex);
      }
    }
  
  
  
  })(jQuery);