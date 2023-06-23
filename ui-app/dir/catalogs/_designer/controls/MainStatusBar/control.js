(function (ActionAppCore, $) {

  var ControlSpecs = {
    "options": {
      "padding": false
    },
    "content": [{
        "ctl": "spot",
        "styles": "border:solid 2px black;margin:0;padding:3px;",
        "name": "body"
      }]
  };

  var ControlCode = {};

  ControlCode.setup = setup;
  function setup(theOptions) {
    var tmpOptions = theOptions || {};

  }

  ControlCode.setContent = setContent;
  function setContent(theContent, theExcludeHistory) {
    this.loadSpot('body',theContent);
    if( theExcludeHistory !== true ){
      this.statusHistory.push(this.getSpot('body').html());
    }
  }

  ControlCode._onInit = _onInit;
  function _onInit() {
    this.config = {
      
    };

    this.pageIndex = {};
    this.statusHistory = [];

    this.setContent('&nbsp;', true);

  }


  ControlCode.sayHello = sayHello;
  function sayHello() {
    this.loadSpot('body',"hello");
  }

  var ThisControl = {
    specs: ControlSpecs,
    options: {
      proto: ControlCode,
      parent: ThisApp
    }};
  return ThisControl;
})(ActionAppCore, $);