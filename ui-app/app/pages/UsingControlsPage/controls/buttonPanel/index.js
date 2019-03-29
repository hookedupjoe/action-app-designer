/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"content": [
			{
				"pagectl": "hello",
				"yourname": "Bob"
			},
			{
				"ctl": "pagespot",
				"name": "test-buttons-spot"
			},
			{
				"ctl": "button",
				"size": "large",
				"pageaction": "runTest",
				"basic": true,
				"fluid": true,
				"attr": {
					"testname": "Test 1"
				},
				"icon": "arrow right","right":true,"labeled": true,
				"name": "btn-test-01",
				"text": "Run Test"
			},
			{
				"ctl": "button",
				"size": "large",
				"pageaction": "runTest",
				"basic": true,
				"attr": {
					"testname": "Test 2"
				},
				"fluid": true,
				"icon": "arrow right","right":true,"labeled": true,
				"name": "btn-test-02",
				"text": "Run Test 2"
			},
			{
				"ctl": "button",
				"size": "large",
				"pageaction": "runTest",
				"fluid": true,
				"basic": true,
				"attr": {
					"testname": "Test 3"
				},
				"icon": "arrow right","right":true,"labeled": true,
				"name": "btn-test-03",
				"text": "Run Test 3"
			},
			{
				"ctl": "button",
				"size": "large",
				"pageaction": "runTest",
				"attr": {
					"testname": "Test 4"
				},
				"text": "Run Test 4"
			}
		]
	}

	var ThisControl = ThisApp.controls.newControl(ControlSpecs, {parent: ThisApp} )

	return ThisControl;

})(ActionAppCore, $);

