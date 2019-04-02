(function () {

  ThisApp = null;

  var tmpPageNames = [   
    'AppBuilderPage',
    'ProjectDashboardPage',
    'ControlBuilderPage',
    'NoSQLSetupPage',
    'ControlsPage',
    'MyCouchPage',
    'CatalogPage',
    'LogsPage'
  ];

  var tmpPluginNames = [
    'DataTables'
  ];

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
        $.extend(ThisApp.common, {
          index: appIndex,
          apiCall: apiCall
        })
        
      });
    } catch (ex) {
      console.error("Unexpected Error " + ex);
    }
  }





  //---- Application Level Code

  var appIndex = {
    res: {
      panels: 'catalog/panels/common'
    }
  }

  //--- Common apiCall interface allows for stuff like
  //     adding headers, etc as needed to all calls
  //    Also allows for error handing, such as log in routing
  //     then recall the same API.
  function apiCall(theOptions) {
    var dfd = $.Deferred();

    if (!theOptions) {
      dfd.reject("No api call details provided");
      return;
    }

    var tmpOptions = theOptions || '';
    if (typeof (tmpOptions) == 'string') {
      tmpOptions = { url: tmpOptions };
    }

    var tmpURL = theOptions.url;
    if (!tmpURL) {
      throw "No URL provided"
    }

    var tmpRequest = {
      method: 'GET',
      success: function (theResponse) {
        dfd.resolve(theResponse);
      },
      error: function (theError) {
        dfd.reject(theError)
      }
    };
    $.extend(tmpRequest, theOptions);
    $.ajax(tmpRequest);
    return dfd.promise();
  }


})();








            //================









