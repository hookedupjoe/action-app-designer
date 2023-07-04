(function (ActionAppCore, $) {

	var ControlSpecs = {
	"content": [
		{
			"ctl": "title",
			"size": "Large",
			"color": "blue",
			"name": "title",
			"text": "User"
		},
		{
			"ctl": "message",
			"color": "blue",
			"size": "large",
			"name": "welcome-info",
			"text": "Enter user information."
		},
		{
			"ctl": "fieldrow",
			"items": [
				{
					"label": "Username",
					"type":"password",
					"ctl": "field",
					"name": "username",
					"req": true
				},
				{
					"label": "Password",
					"ctl": "field",
					"name": "password",
					"req": true
				}
			],
			"name": "user-row"
		},
		{
			"ctl": "fieldrow",
			"items": [
				{
					"label": "First Name",
					"ctl": "field",
					"name": "firstname",
					"req": true
				},
				{
					"label": "Last Name",
					"ctl": "field",
					"name": "lastname",
					"req": true
				}
			],
			"name": "name-row"
		},
		{
					"label": "Email",
					"ctl": "field",
					"name": "email",
					"req": true
				},
			{
				"name": "__doctype",
				"ctl": "hidden",
				"value": "user"
			},
			{
				"name": "_id",
				"ctl": "hidden"
			},
			
			{
				"name": "__title",
				"ctl": "hidden"
			}
		
	],
	"options": {}
}

	var ControlCode = {};

    ControlCode.setup = setup;
    function setup(){
        console.log("Ran setup")
    }

    ControlCode._onInit = _onInit;
    function _onInit(){
        //console.log("Ran _onInit")
    }

	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};
	return ThisControl;
})(ActionAppCore, $);