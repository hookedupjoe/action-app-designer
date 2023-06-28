(function (ActionAppCore, $) {

  var ControlSpecs = {
    options: {
      padding: true
    },
    content: [
      {
        "ctl": "control",
        "controlname": "SearchBar",
        "name": "searchbar",
        "catalog": "common"
      },
      {
        ctl: "spot",
        name: "body",
        text: ""
      },
      {
        "ctl": "control",
        "controlname": "PersonForm",
        "name": "personform",
        "catalog": "wordpress"
      }
    ]
  }

  var ControlCode = {};

  ControlCode.setup = setup;
  function setup() {
    console.log("Ran setup");
  }
  ControlCode._onInit = function () {
    console.log('_onInit');
    this.parts.searchbar.subscribe('search', onSearch.bind(this))
    this.parts.searchbar.subscribe('clear', onClear.bind(this))
    window.lastCreatedControl = this;
  };

  function onSearch(theEvent, theControl, theSearch) {
    this.loadSpot('body', 'Search for ' + theSearch);
  }
  function onClear() {
    this.loadSpot('body', '');
  }

  var ThisControl = { specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp } };
  return ThisControl;
})(ActionAppCore, $);