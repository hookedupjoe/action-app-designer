(function () {

  ThisApp = null;

  var tmpPageNames = "PAGES-ARRAY";

  var tmpPluginNames = "PLUGINS-ARRAY";

  setup(tmpPageNames, tmpPluginNames);

  //---- ACTUAL CODE ==    
  ActionAppCore = ActionAppCore || window.ActionAppCore;

  function setup(thePages, thePlugins) {
    try {
      var siteMod = ActionAppCore.module('site');
      ThisApp = new siteMod.CoreApp();

      //--- Items to load when the application loads
      var tmpRequired = "REQUIRED-OBJECT"

      //--- Use tmpRequiredSpecs to preload more using that example
      ThisApp.init({ pages: thePages, plugins: thePlugins, required: tmpRequired }).then(function (theReply) {
        ThisApp.getByAttr$({ appuse: "app-loader" }).remove();

        //--- Extend common with your app specific stuff
        $.extend(ThisApp.common, "EXTEND-OBJECT")
        
      });
    } catch (ex) {
      console.error("Unexpected Error " + ex);
    }
  }




})();
