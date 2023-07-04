/*
Author: Joseph Francis
License: LGPL
*/
(function (ActionAppCore, $) {

  var ControlSpecs = {
    "options": {
      padding: true,
      readonly: false,
      demodoc: {
        "user_login": "Editor1",
        "user_pass": "test1user",
        "user_email": "editor1@hookedup.com",
        "first_name": "Editor",
        "last_name": "One",
        "capabilities": ['actappapps']
      }
    },
    "content": [{
      "ctl": "title",
      "size": "Large",
      "color": "blue",
      "name": "title",
      "text": "WordPress User"
    },
      {
        "ctl": "message",
        "color": "blue",
        "size": "large",
        "name": "welcome",
        "hidden": true,
        "text": "Enter details below and submit"
      },
      {
        "ctl": "fieldrow",
        "items": [{
          "label": "Username",
          "ctl": "field",
          "name": "user_login",
          "req": true
        },
          {
            "label": "Password",
            "ctl": "field",
            "name": "user_pass",
            "req": true
          }]
      },
      {
        "ctl": "fieldrow",
        "items": [{
          "label": "First Name",
          "ctl": "field",
          "name": "first_name",
          "req": true
        },
          {
            "label": "Last Name",
            "ctl": "field",
            "name": "last_name",
            "req": true
          }]
      },
      {
        "ctl": "fieldrow",
        "items": [{
          "ctl": "dropdown",
          "name": "role",
          "label": "User Role",
          "default": "author",
          "list": "Administrator|administrator,Editor|editor,Author|author,Contributor|contributor,Subscriber|subscriber",
          "req": true
        },
          {
            "label": "Email",
            "ctl": "field",
            "name": "user_email",
            "req": true
          }]
      },
      {
        "ctl": "fieldrow",
        "items": [{
          "ctl": "checkboxlist",
          "type": "check",
          "name": "admin_options",
          "label": "Admin Options",
          "default": "adminbar",
          "list": "Show the admin bar in front when logged in|adminbar,Always require SSL on the admin bar|ssl",
          "req": false
        },
        {
          "ctl": "checkboxlist",
          "name": "capabilities",
          "type": "check",
          "label": "ActApp Capabilities",
          "list": "Applications Access|actappapps,Developer Access|actappdesign",
          "req": false
        },{
          "ctl": "hidden",
          "name": "allcapabilities",
          "value": "actappapps,actappdesign"
        }]
      },
      {
        "name": "description",
        "label": "Description",
        "ctl": "field",
        "rows": 2
      },
      {
        "name": "id",
        "ctl": "hidden"
      },
      {
        "name": "tag",
        "ctl": "hidden"
      },
      {
        "ctl": "segment",
        "raised": true,
        "clearing": true,
        "name": 'submit-bar',
        "content": [{
          "ctl": "button",
          "color": "blue",
          "size": "large",
          "onClick": {
            "run": "action",
            "action": "submitForm",
            "validate": true
          },
          "labeled": true,
          "right": true,
          "toright": true,
          "icon": "arrow right",
          "name": "btn-submit",
          "text": "Submit Form"
        }]
      }]

  }


  var ControlCode = {
    setup: setup,
    submitForm: submitForm,
    _onInit: _onInit
  };

  function setup() {

    
  }

  function _onInit() {
    var tmpThis = this;
    ThisApp.delay(1).then(function() {
      tmpThis.setup();
    })
    
  }

  function submitForm() {
    var tmpData = this.getData();
    var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
    var tmpPostOptions = {
      formSubmit: false,
      data: tmpData,
      url: tmpBaseURL + '/wp-json/actappdesigner/saveuser?open'
    }
    return ThisApp.apiCall(tmpPostOptions);
  }

  //=== End
  var ThisControl = {
    specs: ControlSpecs, options: {
      proto: ControlCode, parent: ThisApp
    }
  };

  return ThisControl;
})(ActionAppCore, $);