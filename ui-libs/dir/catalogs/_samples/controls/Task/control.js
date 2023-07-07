(function (ActionAppCore, $) {

  var ControlSpecs = {
    "options": {
      padding: true
    },
    "content": [{
      "ctl": "header",
      "name": "title",
      "text": "Task",
      "color": "blue",
      "size": "large",
      "subtext": "This is a test",
      "attached": "attached top",
      "alignment": "center aligned",
      "dividing": true,
      "inverted": false,
      "block": true
    },
      {
        "ctl": "message",
        "color": "blue",
        "size": "large",
        "name": "welcome",
        "hidden": false,
        "text": "Provide details about this task below."
      },
      {
        "ctl": "fieldrow",
        "name": "info-row",
        "items": [{
          "label": "Task Name",
          "ctl": "field",
          "name": "name",
          "note": "Should be short and unique is good",
          "req": true
        },
          {
            "label": "Task Description",
            "ctl": "field",
            "name": "desc",
            "note": "A short description of this task",
            "req": false
          }]
      },
      {
        "ctl": "fieldrow",
        "label": "Task Dates",
        "name": "dates-row",
        "req": false,
        "items": [{
          "ctl": "datetime",
          canbe_readonly: true,
          "placeholder": "Created on",
          "name": "createdon",
          "req": false
        },
          {
            "ctl": "datetime",
            "placeholder": "When completed",
            "name": "doneon",
            "req": false
          }]
      },
      {
        "ctl": "fieldrow",
        "name": "task-status-row",
        "items": [{
          "label": "Task Status",
          "ctl": "dropdown",
          "name": "status",
          "list": "New,Pending,Done,Cancelled",
          "note": "Set to Pending if you can't complete for a while.",
          "default": "New",
          "req": true
        },
          {
            "label": "Assigned To",
            "ctl": "field",
            "name": "assigned",
            "note": "The name or names of who will deal with this one",
            "req": false
          }]
      },
      {
        name: 'details',
        label: 'Task Details',
        ctl: 'textarea',
        rows: 3
      },
      {
        "name": "_id",
        "ctl": "hidden"
      },
      {
        "name": "__doctype",
        "ctl": "hidden",
        "value": "task"
      },
      {
        "name": "__doctitle",
        "ctl": "hidden"
      },
      {
        "ctl": "segment",
        "raised": true,
        "clearing": true,
        "name": 'submit-bar',
        "hidden": false,
        "content": [{
          "ctl": "button",
          "name": "btn-submit",
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
          "text": "Create Task"
        }]
      }]

  }


  function submitForm() {
    var tmpData = this.getData();
    var tmpDocTitle = tmpData.title;

    var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
    var tmpDocType = 'app';

    console.log('tmpData', tmpData);
    var tmpPostOptions = {
      formSubmit: false,
      data: tmpData,
      url: tmpBaseURL + 'appdata/api/create-appdoc.json'
    };

    return ThisApp.apiCall(tmpPostOptions);
  }

  var ControlCode = {
    submitForm: submitForm,
  };

  ControlCode.setup = setup;
  function setup() {
    console.log("Ran setup")
  }

  ControlCode._onInit = _onInit;
  function _onInit() {
    //console.log("Ran _onInit")
  }

  var ThisControl = {
    specs: ControlSpecs, options: {
      proto: ControlCode, parent: ThisApp
    }};
  return ThisControl;
})(ActionAppCore, $);