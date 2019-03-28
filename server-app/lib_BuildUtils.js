/*
  Standard NoSQL Access Library
*/
'use strict';

let $ = require("./globalUtilities").$;

//==== NoSqlAccount === === === === === === === === === === 
function BuildUtils() {
    copyDirectory: copyDirectory
}
module.exports.BuildUtils = BuildUtils;

function copyDirectory(theSource, theDestination){
    return new Promise(function (resolve, reject) {

        try {
            $.fs.emptyDir(theDestination).then(function(){
                $.fs.copy(theSource, theDestination).then(function(){
                    resolve(true);
                })
            })

        } catch (error) {
            resolve(error);
        }
    });
}

