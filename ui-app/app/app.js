(function () {

  ThisApp = null;

  ActionAppCore = ActionAppCore || window.ActionAppCore;  
  ActionAppCore.ActAppData.appDataEndpoint = './appdata/api/';
  ActionAppCore.inDesigner = true;

  var tmpHelpers = ['ControlsPage',
  'JsonHelperPage',
  'LogsPage'];

  var tmpDataPages = [
    'AppDataPage',
    'AdminPage'
  ]

  var tmpPageNames = [   
    'WorkspacePage',
  ];
  // if( ActionAppCore.designerDetails && ActionAppCore.designerDetails.config && ActionAppCore.designerDetails.config.isUsingData ){
  //   tmpPageNames = tmpPageNames.concat(tmpDataPages);
  // }
  tmpPageNames = tmpPageNames.concat(tmpHelpers);

  var tmpPluginNames = [
    
  ];

  setup(tmpPageNames, tmpPluginNames);


  function setup(thePages, thePlugins) {
    try {
      var siteMod = ActionAppCore.module('site');
      window.ThisApp = new siteMod.CoreApp();

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
        var tmpDesigner = ThisApp.getDataObject('designer');
        tmpDesigner.endpoints = {
          get_ws_outline: 'design/ws/get-ws-outline'
        }
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


    var tmpURL = tmpOptions.url;
    if (!tmpURL) {
      throw "No URL provided"
    }


    var tmpRequest = {
      success: function (theResponse) {
        dfd.resolve(theResponse);
      },
      error: function (theError) {
        dfd.reject(theError)
      }
    };
    $.extend(tmpRequest, tmpOptions);
    
    //--- Auto Detect data, convert data and use POST
    if( tmpRequest.data ){
      if( typeof(tmpRequest.data) == 'string'){
        tmpRequest.data = JSON.parse(tmpRequest.data);
      }
      tmpRequest.method = 'POST';
      tmpRequest.dataType = "json";
    }
   
    $.ajax(tmpRequest);
    return dfd.promise();
  }


})();








            //================









