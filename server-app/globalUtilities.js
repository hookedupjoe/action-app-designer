/*
  Commonly Used Global Utilities
*/
'use strict';

var merge = require('merge');

let $ = {}; // local gulpMoney
module.exports.$ = $;
function mergeWith(theGulpMoney) {
    return merge(false, theGulpMoney, $);
}
module.exports.mergeWith = mergeWith;

$.merge = merge;
$.replace = require('gulp-replace');
$.path = require('path');
$.request = require('request');
$._ = require('lodash');
$.async = require('asyncawait/async');
$.await = require('asyncawait/await');
$.jsonQuery = require('json-query');
$.fs = require('fs-extra');

$.cloneObject = cloneObject;
$.getEpoch = getEpoch;
$.getNowTimestamp = getNowTimestamp;


function cloneObject(object) {

    try {
        return JSON.parse(JSON.stringify(object));
    }
    catch (err) {
        return {};
    }
}

function getEpoch() {
    return parseInt(Date.now());
}

function getNowTimestamp() {

    let timestamp = __getISODate();

    let tmpTSPos = timestamp.indexOf(".");

    if (tmpTSPos > -1) {
        //--- we have a decimal, fix it
        timestamp = timestamp.substring(0, tmpTSPos) + 'Z';
    }

    return timestamp;
}

function __getISODate(date) {
    try {
        return (date || new Date()).toISOString();
    }
    catch (err) {
        return '';
    }
}

