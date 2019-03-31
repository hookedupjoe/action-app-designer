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
                "type": "text"
            },
            {
                "name": "access",
                "label": "Access Level",
                "type": "dropdown",
                "list": ["API Key|api", "Full Admin Access|admin"]
            },
            {
                "name": "account",
                "label": "Account",
                "type": "text",
                "note": "Need either an Account or a URL but not both"
            },
            {
                "name": "url",
                "label": "URL",
                "type": "text"
            },
            {
                "name": "key",
                "label": "API Key",
                "type": "text"
            },
            {
                "name": "password",
                "label": "Password",
                "type": "text"
            }]
    }

    var ControlCode = {
        helloCounter: 0,
        sayHello: sayHello
    }

    function sayHello(theOptionalName) {
        var tmpMsg = '';
        if (theOptionalName) {
            tmpMsg = "Howdy " + theOptionalName;
        } else {
            this.helloCounter++;
            var tmpColor = "blue";
            if (this.helloCounter % 2 == 0) {
                tmpColor = "orange";
            }
            tmpMsg = 'Tester - Hello ' + this.helloCounter + ' times.'
        }


        this.setFieldValue('title', tmpMsg);
        this.setFieldMessage('title', 'I was set', { color: tmpColor });
        ThisApp.refreshLayouts();
        var tmpThis = this;
        ThisApp.delay(1000).then(function () {
            tmpThis.setFieldMessage('title', '');
            ThisApp.refreshLayouts();
        })
    }



    var ThisControl = ThisApp.controls.newControl(ControlSpecs, { proto: ControlCode, parent: ThisApp })

    return ThisControl;

})(ActionAppCore, $);
