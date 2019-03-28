/*
  Standard NoSQL Access Library
*/
'use strict';

let $ = require("./globalUtilities").$;

//==== NoSqlAccount === === === === === === === === === === 
function BuildUtils() {
    
}
module.exports.BuildUtils = BuildUtils;

var me = BuildUtils.prototype;
me.copyDirectory = copyDirectory;
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

