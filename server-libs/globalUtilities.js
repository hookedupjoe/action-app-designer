/*
  Commonly Used Global Utilities
*/
'use strict';

var merge = require('merge');
const subProcess = require('child_process')
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)

let $ = {}; // local gulpMoney
module.exports.$ = $;
function mergeWith(theGulpMoney) {
    return merge(false, theGulpMoney, $);
}
module.exports.mergeWith = mergeWith;

$.exec = exec;
$.merge = merge;
$.subProcess = subProcess;
$.promisify = promisify;
$.replace = require('gulp-replace');
$.path = require('path');
$.request = require('request');
$._ = require('lodash');
$.jsonQuery = require('json-query');
$.fs = require('fs-extra');
$.os = require('os');
$.cloneObject = cloneObject;
$.getEpoch = getEpoch;
$.getNowTimestamp = getNowTimestamp;
$.getGitUser = getGitUser;
$.getPMList = getPMList;

async function getPMList() {
    // Exec output contains both stderr and stdout outputs
    const running = await exec('pm2 jlist')
  
    return { 
        running: running.stdout.trim()
    }
  };

async function getGitUser() {
    // Exec output contains both stderr and stdout outputs
    const nameOutput = await exec('git config --global user.name')
    const emailOutput = await exec('git config --global user.email')
  
    return { 
      name: nameOutput.stdout.trim(), 
      email: emailOutput.stdout.trim()
    }
  };


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

