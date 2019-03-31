/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var ControlSpecs = {
        "options": {
            "prompt": {
                "submitLabel": "Save Account Changes",
                "title": "Edit Account",
                "submitLabelNew": "Save New Account",
                "titleNew": "New Account"
            }
        },
        "content": [
            {
                "name": "name",
                "label": "Unique Account Name",
                "ctl": "field",
                "req": true
            },
            {
                "name": "access",
                "label": "Access Level",
                "ctl": "dropdown",
                "list": ["API Key|api", "Full Admin Access|admin"],
                "req": true
            },
            {
                "name": "account",
                "label": "Account",
                "ctl": "field",
                "note": "Need either an Account or a URL but not both"
            },
            {
                "name": "url",
                "label": "URL",
                "ctl": "field"
            },
            {
                "name": "key",
                "label": "API Key",
                "ctl": "field",
                "req": true
            },
            {
                "name": "password",
                "label": "Password",
                "ctl": "field",
                "req": true
            }]
    }

    var ControlCode = {
        onValidate : function (theControl) {
            var tmpURL = theControl.getFieldValue('url');
            var tmpAccount = theControl.getFieldValue('account');
            if (tmpURL && tmpAccount) {
                return ("You can not have both a URL and an account, one or the other only");
            }
            return true;
        }
    }

    var ThisControl = ThisApp.controls.newControl(ControlSpecs, { proto: ControlCode, parent: ThisApp })

    return ThisControl;

})(ActionAppCore, $);
