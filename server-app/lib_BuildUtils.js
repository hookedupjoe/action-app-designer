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
  saveJsonFile: saveJsonFile,
  writeJsonFile: saveJsonFile,
  settingsHome: settingsHome,
  getBuildConfigJson: getBuildConfigJson,
  replaceAll: replaceAll,
  replaceFromMap: replaceFromMap,
  replaceFile: replaceFile,
  getIndexFromArray: getIndexFromArray
};

module.exports = utils;


function replaceAll(str,replaceWhat,replaceTo){
  var re = new RegExp(replaceWhat, 'g');
  return str.replace(re,replaceTo);
}

function getIndexFromArray(theArray,theKeyField){
  var tmpRet = {};
  for( var aIndex in theArray){
    var tmpEntry = theArray[aIndex];
    var tmpKey = tmpEntry[(theKeyField || 'id')];
    tmpRet[tmpKey] = tmpEntry;
  }
  return tmpRet;
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


function settingsHome() {
  const tmpHomeDir = $.os.homedir();
  return tmpHomeDir + '/.actapp/';
}

function getBuildConfigJson(theScope){
  return utils.getJsonFile(theScope.locals.path.designer + '/build/app-build-config.json');
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


//--- Like readJson but returns {} if not there
function saveJsonFile(theFilename, theObject){
  return $.fs.writeJson(theFilename, theObject)
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



