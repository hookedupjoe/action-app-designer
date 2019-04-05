/*
  Action Application Build Assistance

  Author: Joseph Francis
  License: MIT  
*/
'use strict';

let $ = require("./globalUtilities").$;

let utils = {
  getDirFiles: getDirFiles,
  getTextFile: getTextFile,
  getJsonFile: getJsonFile,
  replaceAll: replaceAll,
  replaceFromMap: replaceFromMap,
  replaceFile: replaceFile
};

module.exports = utils;


function replaceAll(str,replaceWhat,replaceTo){
  var re = new RegExp(replaceWhat, 'g');
  return str.replace(re,replaceTo);
}

function replaceFromMap(theString, theMap){
  var tmpRet = '' + theString;
  for( var aName in theMap ){
    var tmpValue = theMap[aName];
    if( typeof(tmpValue) == 'function' ){
      tmpValue = tmpValue(aName);
    }
    tmpRet = replaceAll(tmpRet,aName,tmpValue)
  }
  return tmpRet;
}


//--- Replace File
function replaceFile(theFilename, theValue){
  return new Promise($.async(function (resolve, reject) {
    try {
        $.fs.writeFile(theFilename, theValue, 'utf8', function (err, theContent) {
            if (err) {
              resolve(false)
            } else {
              resolve(true);
            }
        });
    }
    catch (error) {
        resolve(false)
    }
  
  }));
}

//--- Like readFile but returns "" if not there
function getTextFile(theFilename){
  return new Promise($.async(function (resolve, reject) {
    try {
        $.fs.readFile(theFilename, 'utf8', function (err, theContent) {
            if (err) {
              resolve("")
            } else {
              resolve(theContent);
            }
        });
    }
    catch (error) {
        resolve("")
    }
  
  }));
}

//--- Like readJson but returns {} if not there
function getJsonFile(theFilename){
  return new Promise($.async(function (resolve, reject) {
    try {
        $.fs.readJson(theFilename, function (err, theObj) {
            if (err) {
              resolve({})
            } else {
              resolve(theObj);
            }
        });
    }
    catch (error) {
        resolve({})
    }
  
  }));
}

//--- Like readJson but returns [] if not there
function getDirFiles(theDirectory){
  return new Promise($.async(function (resolve, reject) {
    try {
        $.fs.readdir(theDirectory, function (err, files) {
            if (err) {
                resolve([])
            }
            resolve(files);
        });
    }
    catch (error) {
      resolve([])
    }
  }));

  
}

