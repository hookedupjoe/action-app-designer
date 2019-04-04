/*
  Action Application Build Assistance

  Author: Joseph Francis
  License: MIT  
*/
'use strict';

let $ = require("./globalUtilities").$;

let utils = {
  getDirFiles: getDirFiles,
  getJsonFile: getJsonFile
};

module.exports = utils;


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

