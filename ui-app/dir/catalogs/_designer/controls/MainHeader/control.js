(function (ActionAppCore, $) {

  var ControlSpecs = {
    "options": {
      "padding": false
    },
    "content": [{
      "ctl": "spot",
      "name": "body"
    }]
  }

  var ControlCode = {};

  ControlCode.setup = setup;
  function setup(theOptions) {
    var tmpOptions = theOptions || {};
  }

  ControlCode._onInit = _onInit;
  function _onInit() {
    var tmpHTML = [];
    tmpHTML.push('<div class="fluid ui input"><input readonly="" ctluse="headertext" class="title" type="text" value="&nbsp;" name="title" "=""><div controls="" fieldnote="" name="title" class="ui message fluid " style="display:none;"></div>');
    tmpHTML.push('<span mySpot="buttons">');
    tmpHTML.push('</span>');
    tmpHTML.push('</div>');

    this.loadSpot('body', tmpHTML.join('\n'));
    this.headerField = this.getByAttr$({
      ctluse: "headertext"
    });
    this.buttonsSpot = this.getSpot('buttons');

    //--- Examples
    // this.setHeader('Header Control');
    // this.addSideContent('<div class="ui label green basic right pointing">If you can</div>');
    // this.addSideContent('<div type="button" name="btn-test" class="ui button  blue icon">Do Something</div>');
  }


  ControlCode.setText = setContent;
  ControlCode.setHeader = setContent;
  ControlCode.setContent = setContent;
  function setContent(theContent) {
    this.headerField.val(theContent);
  }

  ControlCode.addSideContent = addSideContent;
  function addSideContent(theContent) {
    this.addToSpot('buttons', theContent);
  }
  ControlCode.setSideContent = setSideContent;
  function setSideContent(theContent) {
    this.loadSpot('buttons', theContent);
  }

  var ThisControl = {
    specs: ControlSpecs,
    options: {
      proto: ControlCode,
      parent: ThisApp
    }};
  return ThisControl;
})(ActionAppCore, $);