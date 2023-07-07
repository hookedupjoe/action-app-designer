(function (ActionAppCore, $) {

  var ControlSpecs = {
    "options": {
      padding: true
    },
    "content": [{
      "ctl": "header",
      "name": "formtitle",
      "text": "Field Test Form",
      "color": "blue",
      "size": "large",
      "alignment": "center aligned",
      "dividing": true,
      "block": false
    },
      {
        "ctl": "message",
        "color": "blue",
        "size": "large",
        "name": "welcome",
        "hidden": false,
        "text": "This form has all kinds of fields for testing."
      },
      {
        "ctl": "fieldrow",
        "name": "info-row",
        "items": [{
          "label": "Text Field",
          "ctl": "field",
          "name": "textfield",
          "note": "Fields can have notes with colors",
          "noteColor": "orange",
          "req": true
        },
          {
            "label": "Number Field",
            "ctl": "number",
            "name": "numberfield",
            "note": "Only numbers",
            "noteColor": "blue",
            "req": false
          }]
      },
      {
        "ctl": "fieldrow",
        "name": "date-and-time",
        "items": [{
          "ctl": "date",
          "label": "Date",
          "name": "datefield",
          "req": false
        },
          {
            "ctl": "time",
            "label": "Time",
            "name": "timefield",
            "req": false
          }]
      },

      {
        "ctl": "fieldrow",
        "name": "task-status-row",
        "items": [{
          "label": "Drop Down",
          "ctl": "dropdown",
          "name": "status",
          "list": "New,Pending,Done,Cancelled",
          "default": "New",
          "req": false
        },
          {
            "ctl": "dropdown",
            "multi": true,
            "name": "dropdownmultifield",
            "label": "Multi-Select",
            "list": "Work,Play,Meetup,Other",
            "req": false
          }]
      },
      {
        "ctl": "fieldrow",
        "label": "More Options",
        "name": "options-row",
        "items": [{
          "ctl": "radiolist",
          "name": "radiolistfield",
          "label": "Select one option",
          "onChange": {
            "run": "showif",
            "field": "radiolistfield-other",
            "value": "other"
          },
          "list": "This Option|this,That Option|that,The Other Option|other",
          "note": "Other option shows more stuff",
          "req": false
        },
          {
            "ctl": "checkboxlist",
            "name": "radiolistfield-other",
            "label": "Select any of these",
            "list": "One,Two,Three,Four,Five",
            "req": true
          }]
      },

      {
        ctl: 'textarea',
        name: 'textareafield',
        label: 'Text Area',
        rows: 3
      },
      {
        "ctl": "divider",
        "color": "blue",
        "size": "medium",
        "text": "Source Examples"
      },
      {
        "label": "Country",
        "ctl": "dropdown",
        "name": "country",
        "list": {
          source: 'countries'
        },
        "req": false,
        "size": 16,
        "default": "US",
        "onChange": {
          "run": "showfor",
          "values": {
            "": "state-other",
            "US": [
              "state"
            ],
            "*": "state-other"
          }
        }
      },
      {
        "ctl": "fieldrow",
        "name": "city-state-zip-info",
        "items": [{
          "label": "City",
          "ctl": "field",
          "name": "city",
          "size": 7,
          "req": false
        },
          {
            "label": "State",
            "ctl": "dropdown",
            "list": {
              source: 'states'
            },
            "name": "state",
            "size": 6,
            "req": false
          },
          {
            "label": "State",
            "ctl": "field",
            "name": "state-other",
            "size": 6,
            "req": false
          },
          {
            "label": "Zip Code",
            "ctl": "field",
            "name": "zipcode",
            "size": 5
          }]
      },
      {
        "name": "_id",
        "ctl": "hidden"
      },
      {
        "name": "__doctype",
        "ctl": "hidden",
        "value": "fieldstest"
      },
      {
        "name": "__doctitle",
        "ctl": "hidden"
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

  ControlCode.getColumnsFromIndex = function() {
    //console.log('getColumnsFromIndex');
    var tmpIndex = this.getIndex();
    var tmpCols = [];
    for (var iPos in tmpIndex.fieldsList) {
      var tmpFieldName = tmpIndex.fieldsList[iPos];
      var tmpFieldSpecs = tmpIndex.all[tmpFieldName];
      tmpCols.push({
        "title": tmpFieldSpecs.label || tmpFieldName,
        "field": tmpFieldName
      })

      //console.log('tmpFieldSpecs',tmpFieldSpecs)
    }
    return tmpCols;
  }

  ControlCode._onInit = _onInit;
  function _onInit() {
    //console.log("Ran _onInit")
  }

  var ThisControl = {
    specs: ControlSpecs,
    options: {
      proto: ControlCode,
      parent: ThisApp
    }};
  return ThisControl;
})(ActionAppCore, $);