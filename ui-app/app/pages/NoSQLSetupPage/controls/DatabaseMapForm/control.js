/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var ControlSpecs = {
        "options": {
            "prompt": {
                "title": "Database Mapping",
                "submitLabel": "Save Mapping",
                "submitLabelNew": "Save New Mapping"
            }
        },
        "content": [
            {
                "name": "name",
                "label": "Unique Mapping Name",
                "type": "text",
                "req": true
            },
            {
                "name": "dbname",
                "label": "Database Name",
                "type": "text",
                "req": true
            }]
    }

    var ControlCode = {}

    var ThisControl = ThisApp.controls.newControl(ControlSpecs, { proto: ControlCode, parent: ThisApp })

    return ThisControl;

})(ActionAppCore, $);
