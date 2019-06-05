(function () {

  ThisApp = null;

  var tmpPageNames = ["HomePage","LogsPage"];

  var tmpPluginNames = [];

  setup(tmpPageNames, tmpPluginNames);

  //---- ACTUAL CODE ==    
  ActionAppCore = ActionAppCore || window.ActionAppCore;

  function setup(thePages, thePlugins) {
    try {
      var siteMod = ActionAppCore.module('site');
      ThisApp = new siteMod.CoreApp();

      //--- Items to load when the application loads
      var tmpRequired = {}

      //--- Use tmpRequiredSpecs to preload more using that example
      ThisApp.init({ pages: thePages, plugins: thePlugins, required: tmpRequired }).then(function (theReply) {
        ThisApp.getByAttr$({ appuse: "app-loader" }).remove();

        //--- Extend common with your app specific stuff
        $.extend(ThisApp.common, {})
        
      });
    } catch (ex) {
      console.error("Unexpected Error " + ex);
    }
  }




})();
