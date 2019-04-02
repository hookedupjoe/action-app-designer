(function (ActionAppCore, $) {

  var ControlSpecs = {
      "content": [
          {
              "ctl": "field",
              "label": "Hello, tell me your name please",
              "size": "huge",
              "placeholder": "",
              "default": "Bob",
              "name": "title",
              "text": "Hello World"
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

  

  var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};

  
  return ThisControl;


})(ActionAppCore, $);
