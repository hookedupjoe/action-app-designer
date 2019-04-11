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
  buildApp: buildApp,
  updateAppSetup: updateAppSetup,
  getBuildConfigJson: getBuildConfigJson,
  restartServer: restartServer,
  replaceAll: replaceAll,
  replaceFromMap: replaceFromMap,
  replaceFile: replaceFile,
  getIndexFromArray: getIndexFromArray
};

module.exports = utils;
   
function restartServer(){
   var {spawn} = require('child_process');


   var logfile = 'restart.log';
   var out = $.fs.openSync(logfile, 'a');
   var err = $.fs.openSync(logfile, 'a');
   var subprocess = spawn('restart.bat', [], {detached: true, stdio: ['ignore', out, err]});

    subprocess.unref();
    
    process.exit();
  }

function updateAppSetup(theAppName, theSetupDetails) {
 // console.log( 'updateAppSetup', theAppName, theSetupDetails);
  var self = this;
  return new Promise($.async(function (resolve, reject) {
      try {
          var scope = process.scope;

          var bld = $.bld;
          var tmpAppName = theAppName || '';
          if(!(tmpAppName) ){
              throw "Application name not provided"
          }

          var tmpWSDir = scope.locals.path.workspace + 'apps/';
          
          var tmpAppBase = tmpWSDir + tmpAppName + '/';
          // console.log( 'Saving to ', tmpAppBase, theSetupDetails);
          $.await(utils.saveJsonFile(tmpAppBase + 'app-info.json',theSetupDetails))
          $.await(buildApp(tmpAppName));

          var tmpRet = {
              status: true,
              refresh: true
          }

          resolve(tmpRet);

      }
      catch (error) {
          console.log('Err : ' + error);
          reject(error);
      }

  }));



}

function buildApp(theAppName) {
  var self = this;
  return new Promise($.async(function (resolve, reject) {
      try {
          var scope = process.scope;

          var bld = $.bld;
          var tmpAppName = theAppName || '';
          if(!(tmpAppName) ){
              throw "Application name not provided"
          }

          var tmpWSDir = scope.locals.path.workspace + 'apps/';
          
          var tmpAppBase = tmpWSDir + tmpAppName + '/';
          var tmpAppDetails = $.await(utils.getJsonFile(tmpAppBase + 'app-info.json'))

          var tmpBuildCfg = $.await(utils.getBuildConfigJson());

          var tmpPartsLoc = scope.locals.path.designer + '/build/tpl-parts/';
          var tmpIndex = $.await(utils.getTextFile(tmpPartsLoc + 'tpl-index.html'))
          var tmpApp = $.await(utils.getTextFile(tmpPartsLoc + 'tpl-app-js.txt'))

          var tmpLibLocs = utils.getIndexFromArray(tmpBuildCfg.libraryLocations, 'name');
          var tmpLibLoc = tmpLibLocs[tmpAppDetails.cdn] || 'local';
          var tmpOptLibCSS = '';
          var tmpOptLibJS = '';
          var tmpPluginsText = '';

          var tmpPIConfig = tmpAppDetails.plugins || false;
          if( tmpPIConfig && tmpPIConfig.length ){
              var tmpPIs = utils.getIndexFromArray(tmpBuildCfg.plugins, 'name');
              for( var aIndex in tmpPIConfig){
                  var tmpPIDetails = tmpPIConfig[aIndex];
                  tmpPIDetails = tmpPIs[tmpPIDetails];
                  if( tmpPIDetails && tmpPIDetails.css){
                      var tmpCSSs = tmpPIDetails.css;
                      if( typeof(tmpCSSs) == 'string' ){
                          tmpCSSs = [tmpCSSs];
                      }
                      for( var iCSS in tmpCSSs ){
                          var tmpCSS = tmpCSSs[iCSS];
                          if (tmpPICSS){
                              tmpPICSS += '\n\t'
                          }
                          tmpPICSS += tmpCSS;
                      }
                      
                  }
                  if( tmpPIDetails && tmpPIDetails.js){
                      var tmpJSs = tmpPIDetails.js;
                      if( typeof(tmpJSs) == 'string' ){
                          tmpJSs = [tmpJSs];
                      }
                      for( var iJS in tmpJSs ){
                          var tmpJS = tmpJSs[iJS];
                          if (tmpPluginsText){
                              tmpPluginsText += '\n\t'
                          }
                          tmpPluginsText += tmpJS;
                      }
                      
                  }
              }
          }

          var tmpOptCSS = '';
          if (tmpAppDetails && tmpAppDetails.hasAppCSS){
              tmpOptCSS = "<link rel=\"stylesheet\" href=\"/app/css/app.css\">"
          }
          var tmpLibsConfig = tmpAppDetails.libraries || false;
          if( tmpLibsConfig && tmpLibsConfig.length ){
              var tmpLibs = utils.getIndexFromArray(tmpBuildCfg.libraries, 'name');
              for( var aIndex in tmpLibsConfig){
                  var tmpLibDetails = tmpLibsConfig[aIndex];
                  tmpLibDetails = tmpLibs[tmpLibDetails];
                  if( tmpLibDetails && tmpLibDetails.css){
                      var tmpCSSs = tmpLibDetails.css;
                      if( typeof(tmpCSSs) == 'string' ){
                          tmpCSSs = [tmpCSSs];
                      }
                      for( var iCSS in tmpCSSs ){
                          var tmpCSS = tmpCSSs[iCSS];
                          if (tmpOptLibCSS){
                              tmpOptLibCSS += '\n\t'
                          }
                          tmpOptLibCSS += tmpCSS;
                      }
                      
                  }
                  if( tmpLibDetails && tmpLibDetails.js){
                      var tmpJSs = tmpLibDetails.js;
                      if( typeof(tmpJSs) == 'string' ){
                          tmpJSs = [tmpJSs];
                      }
                      for( var iJS in tmpJSs ){
                          var tmpJS = tmpJSs[iJS];
                          if (tmpOptLibJS){
                              tmpOptLibJS += '\n\t'
                          }
                          tmpOptLibJS += tmpJS;
                      }
                      
                  }
              }
          }

          var tmpTitle = tmpAppDetails.title || 'Action App';

          var tmpPagesText = '[]';
          if( tmpAppDetails.pages ){
              if( typeof(tmpAppDetails.pages) == 'string'){
                  tmpPagesText = tmpAppDetails.pages;
              } else {
                  tmpPagesText = JSON.stringify(tmpAppDetails.pages);
              }
          }
         

          var tmpPagesText = '[]';
          if( tmpAppDetails.pages ){
              if( typeof(tmpAppDetails.pages) == 'string'){
                  tmpPagesText = tmpAppDetails.pages;
              } else {
                  tmpPagesText = JSON.stringify(tmpAppDetails.pages);
              }
          }
         
          var tmpPluginsAppText = '[]';
          if( tmpAppDetails.plugins ){
              if( typeof(tmpAppDetails.plugins) == 'string'){
                  tmpPluginsAppText = tmpAppDetails.plugins;
              } else {
                  tmpPluginsAppText = JSON.stringify(tmpAppDetails.plugins);
              }
          }

          
          var tmpReqAppText = '{}';
          if( tmpAppDetails.required ){
              if( typeof(tmpAppDetails.required) == 'string'){
                  tmpReqAppText = tmpAppDetails.required;
              } else {
                  tmpReqAppText = JSON.stringify(tmpAppDetails.required);
              }
          }

          var tmpExtendAppText = '{}';
          if( tmpAppDetails.extend ){
              if( typeof(tmpAppDetails.extend) == 'string'){
                  tmpExtendAppText = tmpAppDetails.extend;
              } else {
                  tmpExtendAppText = JSON.stringify(tmpAppDetails.extend);
              }
          }
          tmpOptCSS = bld.replaceAll(tmpOptCSS, "{{LIBRARY-LOCATION}}", (tmpLibLoc.prefix || ''));
          tmpOptLibJS = bld.replaceAll(tmpOptLibJS, "{{LIBRARY-LOCATION}}", (tmpLibLoc.prefix || ''));
          tmpOptLibCSS = bld.replaceAll(tmpOptLibCSS, "{{LIBRARY-LOCATION}}", (tmpLibLoc.prefix || ''));
          tmpPluginsText = bld.replaceAll(tmpPluginsText, "{{LIBRARY-LOCATION}}", (tmpLibLoc.prefix || ''));
          
          var tmpIndexMap = {
              "{{LIBRARY-LOCATION}}": tmpLibLoc.prefix || '',
              "{{OPTIONAL-LIB-CSS}}": tmpOptLibCSS,
              "{{OPTIONAL-CSS}}": tmpOptCSS,
              "{{PAGE-TITLE}}": tmpTitle,
              "{{APP-TITLE}}": tmpTitle,
              "{{OPTIONAL-PLUGINS}}": tmpPluginsText,
              "{{OPTIONAL-LIB-JS}}": tmpOptLibJS
          }

          var tmpAppMap = {
              "{{PAGES-ARRAY}}": tmpPagesText,
              "{{PLUGINS-ARRAY}}": tmpPluginsAppText,
              "{{REQUIRED-OBJECT}}": tmpReqAppText,
              "{{EXTEND-OBJECT}}": tmpExtendAppText,
              "{{OPTIONAL-APP-CODE}}": ""
          }

         tmpIndex = utils.replaceFromMap(tmpIndex,tmpIndexMap);
         $.await(utils.replaceFile(tmpAppBase + 'index.html', tmpIndex))

         tmpApp = utils.replaceFromMap(tmpApp,tmpAppMap);
         $.await(utils.replaceFile(tmpAppBase + 'app/app.js', tmpApp))

          var tmpRet = {
              status: true,
              refresh: true
          }

          resolve(tmpRet);

      }
      catch (error) {
          console.log('Err : ' + error);
          reject(error);
      }

  }));



}


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

function getBuildConfigJson(){
  return utils.getJsonFile(process.scope.locals.path.designer + '/build/app-build-config.json');
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
  
  var tmpObject = theObject || {};
  if( typeof(tmpObject) == 'string'){
    tmpObject = JSON.parse(tmpObject);
  }
  return $.fs.writeJson(theFilename, tmpObject)
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



