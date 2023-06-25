(function (ActionAppCore, $) {

  var ControlSpecs = {
		"options": {padding: true},
		"content": [
			{
				"ctl": "title",
				"size": "Large",
				"color": "blue",
				"name": "apptitle",
				"text": "Mongo Account"
			},
			{
				"ctl": "message",
				"color": "blue",
				"size": "large",
				"name": "welcome",
				"hidden": false,
				"text": "Enter details needed to connect to a Mongo database.  Use a simple one word, all lowercase account id."
			},
			{
				"ctl": "fieldrow",
				"items": [
					{
						"label": "Account ID",
						"ctl": "field",
						"name": "id",
						"req": true
					},
					{
						"label": "IP Address",
						"ctl": "field",
						"name": "address",
						"default": "127.0.0.1",
						"req": true
					},
					{
						"label": "Port",
						"ctl": "field",
						"name": "port",
						"default": "27017",
						"req": true
					}
				]
			},
			{
				"ctl": "fieldrow",
				"items": [
					{
						"label": "Username",
						"ctl": "field",
						"name": "username",
						"req": false
					},
					{
						"label": "Password",
						"ctl": "field",
						"name": "password",
						"req": false
					}
				]
			},
			{
				"name": "__doctype",
				"ctl": "hidden",
				"value": "mongoaccount"
			},
			{
				"name": "__title",
				"ctl": "hidden"
			},
			{
				"name": "tag",
				"ctl": "hidden"
			}
			
	
		]
		
	}


	function submitForm() {
		var tmpData = this.getData();
		var tmpDocTitle = tmpData.id;
		
		var tmpBaseURL = ActionAppCore.ActAppData.rootPath;
		var tmpBaseURL = ActionAppCore.ActAppData.appDataEndpoint;
		
		var tmpDocType = 'app';
		
		var tmpPostOptions = {
			formSubmit: false,
			data: tmpData,
			url: tmpBaseURL + 'mongo-create-account?open'
		};
		console.log('tmpPostOptions',tmpPostOptions);
		return ThisApp.apiCall(tmpPostOptions).then(function(theReply){
		  console.log(theReply);
		});
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