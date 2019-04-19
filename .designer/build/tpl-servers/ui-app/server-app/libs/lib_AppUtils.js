/*
  Application Common Library
*/
'use strict';

let utils = {
  runTest: runTest
};
var scope = false;
var $ = false;
module.exports = function(theScope){
  scope = theScope;
  $ = scope.locals.$;
  return utils;
};
 


function runTest(){
  return new Promise($.async(function (resolve, reject) {
    try {
    
      resolve( true );
   
      
    }
    catch (error) {
      resolve(false)
    }
  }));

  

 

}



