(function (ActionAppCore, $) {

	var ControlSpecs = {
	"content": [
		{
			"ctl": "title",
			"size": "Large",
			"color": "blue",
			"name": "formtitle",
			"text": "ACL Entry"
		},
		{
			"ctl": "message",
			"color": "blue",
			"size": "large",
			"name": "welcome-info",
			"text": "Controls Application Level Access"
		},
		{
			"ctl": "fieldrow",
			"items": [
				{
					"label": "Name",
					"ctl": "field",
					"name": "entryname",
					"req": true
				},
				{
					"label": "Access Level",
					"ctl": "dropdown",
					"name": "level",
					"list":'Admin|admin,Editor|editor,Author|author,Reader|reader',
					"req": true
				}
			],
			"name": "app-info-row"
		},
		{
			"ctl": "dropdown",
			"name":"type",
			"list":"Person|person,Group|group",
			"default": "person",
			req: true
		},
	
			{
				"name": "__doctype",
				"ctl": "hidden",
				"value": "aclentry"
			},
			{
				"name": "_id",
				"ctl": "hidden"
			}
	],
	"options": {}
}

	var ControlCode = {};

    ControlCode.setup = setup;
    function setup(){
        //console.log("Ran setup")
    }

    ControlCode._onInit = _onInit;
    function _onInit(){
        //console.log("Ran _onInit")
    }

	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};
	return ThisControl;
})(ActionAppCore, $);