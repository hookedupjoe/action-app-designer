/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var ControlSpecs = {
        "content": [
            {
                "ctl": "title",
                "size": "Large",
                "color": "blue",
                "name": "title",
                "text": "Form Control"
            },
            {
                "ctl": "button",
                "toright": true,
                "color": "blue",
                "size": "large",
                "onClick": {
                    "run":"publish",
                    "event": "submit",
                    "validate":true
                },
                "labeled": true,
                "right": true,
                "icon": "arrow right",
                "name": "btn-submit",
                "text": "Submit Form"
            },
            {
                "ctl": "button",
                "size": "large",
                "onClick": {
                    "run":"publish",
                    "event": "cancel"
                },
                "basic": true,
                "icon": "close",
                "name": "btn-clear",
                "text": "Clear"
            },
            {
                "ctl": "divider",
                "color": "blue",
                "size": "medium", 
                "text": "Welcome",
                "clearing": true
            },
            {
                "row": true,
                "ctl": "radiolist",
                "name": "showmore",
                "onChange": {
                    "run": "showfor",				
                    "values": {
                        "": "welcome-info",
                        "Yes": [
                            "name-info",
                            "yes-info",
                            "options-row",
                            "selections-row",
                            "comments"
                        ],
                        "No": "no-info",
                        "Maybe": [
                            "comments",
                            "maybe-info"
                        ]
                    }
                },
                "label": "Show More?",
                "list": "Yes,No,Maybe",
                "req": true
            },
            {
                "ctl": "message",
                "size": "large",
                "color": "blue",
                "name": "maybe-info",
                "text": "Just say anything, no need to say who you are",
                "hidden": true
            },
            
            {
                "ctl": "message",
                "color": "violet",
                "size": "large",
                "icon": "help",
                "attached": "bottom attached",
                "name": "welcome-info",
                "text": "Welcome, will you tell us more? <br /><br />Already answered this? <a class='ui link' href=\"#\">Login here</a> instead."
            },
            
            {
                "ctl": "message",
                "size": "large",
                "name": "no-info",
                "text": "Aw shucks!",
                "hidden": true
            },
            {
                "ctl": "message",
                "size": "large",
                "color": "green",
                "name": "yes-info",
                "text": "Great, tell us more",
                "hidden": true
            },
            {
                "ctl": "fieldrow",
                "label": "Your Name",
                "name": "name-info",
                "req": true,
                "items": [
                    {
                        "placeholder": "First Name",
                        "name": "first",
                        "onValidate": {
                            "run": "minlen",
                            "min": 5
                        },
                        "req": true
                    },
                    {
                        "placeholder": "Last Name",
                        "name": "last",
                        "onValidate": {
                            "run": "minlen",
                            "min": 5
                        }
                    }
                ]
            },
            {
                "ctl": "fieldrow",
                "label": "More Options",
                "name": "options-row",
                "items": [
                    {
                        "ctl": "radiolist",
                        "name": "one",
                        "label": "Select one option",
                        "onChange": {
                            "run": "showif",
                            "field": "one-other",
                            "value": "other"
                        },
                        "list": "This Option|this,That Option|that,The Other Option|other",
                        "note": "Other option shows more stuff",
                        "req": true
                    },
                    {
                        "ctl": "checkboxlist",
                        "name": "one-other",
                        "label": "Select any of these",
                        "list": "One,Two,Three,Four,Five",
                        "req": true
                    }
                ]
            },
            {
                "ctl": "fieldrow",
                "name": "selections-row",
                "items": [
                    {
                        "ctl": "dropdown",
                        "name": "track",
                        "label": "Track",
                        "list": "Business,Technical",
                        "req": true
                    },
                    {
                        "ctl": "dropdown",
                        "multi": true,
                        "name": "topic",
                        "label": "Select Topic(s)",
                        "list": "Work,Play,Meetup,Other",
                        "req": true
                    }
                ]
            },
            {
                "name": "comments",
                "label": "Comments",
                "note": "Thanks for taking the time!",
                "noteColor": "green",
                "placeholder": "Enter a bunch of details",
                "ctl": "textarea",
                "rows": 2
            }
        ]
    }

    var ControlCode = {
        helloCounter: 0,
        sayHello: sayHello
    }
    
    function sayHello(theOptionalName){
        var tmpMsg = '';
        if( theOptionalName ){
            tmpMsg = "Howdy " + theOptionalName;
        } else {
            this.helloCounter++;
            var tmpColor = "blue";
            if (this.helloCounter % 2 == 0){
                tmpColor = "orange";    
            }
            tmpMsg = 'Tester - Hello ' + this.helloCounter + ' times.'
        }
        

        this.setFieldValue('title',tmpMsg);
        this.setFieldMessage('title','I was set',{color: tmpColor});
        ThisApp.refreshLayouts();
        var tmpThis = this;
        ThisApp.delay(1000).then(function(){
            tmpThis.setFieldMessage('title', '');
            ThisApp.refreshLayouts();
        })
    }

    

    var ThisControl = ThisApp.controls.newControl(ControlSpecs, { proto: ControlCode, parent: ThisApp } )

    return ThisControl;

})(ActionAppCore, $);
