/*
  Action Application Build Assistance

  Author: Joseph Francis
  License: MIT  
*/
'use strict';

let $ = require("./globalUtilities").$;



var detailsIndex = {
    "getDetails": function (theName) {
        return this[this.getUnifiedName(theName)];
    },
    "getUnifiedName": function (theName) {
        if (typeof (theName) != 'string') {
            return "";
        }
        var tmpNameCheck = theName.toLowerCase();
        if (tmpNameCheck == 'control' || tmpNameCheck == 'controls') {
            return 'Control';
        }
        if (tmpNameCheck == 'panel' || tmpNameCheck == 'panels') {
            return 'Panel';
        }
        if (tmpNameCheck == 'html') {
            return 'HTML';
        }
        if (tmpNameCheck == 'template' || tmpNameCheck == 'templates') {
            return 'Template';
        }

    },
    "Control": { name: "Control", category: 'Controls', dir: "controls", icon: 'newspaper', lang: 'javascript' },
    "Panel": { name: "Panel", category: 'Panels', dir: "panels", icon: 'newspaper outline', lang: 'javascript', type: 'json' },
    "HTML": { name: "HTML", category: 'HTML', dir: "html", icon: 'code', lang: 'html' },
    "Template": { name: "Template", category: 'Templates', dir: "tpl", icon: 'object group outline', lang: 'html' }
}

let utils = {
    getDirFiles: getDirFiles,
    getTextFile: getTextFile,
    getJsonFile: getJsonFile,
    saveJsonFile: saveJsonFile,
    writeJsonFile: saveJsonFile,
    settingsHome: settingsHome,
    buildApp: buildApp,
    updateAppSetup: updateAppSetup,
    updateCatSetup: updateCatSetup,    
    getBuildConfigJson: getBuildConfigJson,
    restartServer: restartServer,
    replaceAll: replaceAll,
    replaceFromMap: replaceFromMap,
    replaceFile: replaceFile,
    getIndexFromArray: getIndexFromArray,
    detailsIndex: detailsIndex,
    getDefaultContentForResource: getDefaultContentForResource,
};

module.exports = utils;

function getDefaultContentForResource(theType) {
    if (!(theType)) {
        return "";
    }
    var tmpType = detailsIndex.getUnifiedName(theType);
    if (tmpType == 'HTML' || tmpType == 'Template') {
        return "";
    }

    //ToDo:  Use a file template?  Lazy Load It?
    if (tmpType == 'Control') {

        var tmpHTML = [];
        tmpHTML.push('(function (ActionAppCore, $) {')
        tmpHTML.push('')
        tmpHTML.push('	var ControlSpecs = { ')
        tmpHTML.push('		options: {')
        tmpHTML.push('			padding: true')
        tmpHTML.push('		},')
        tmpHTML.push('		content: [')
        tmpHTML.push('		{')
        tmpHTML.push('			ctl: "spot",')
        tmpHTML.push('			name: "body",')
        tmpHTML.push('			text: "Use loadSpot to load me"')
        tmpHTML.push('		}')
        tmpHTML.push('		]')
        tmpHTML.push('	}')
        tmpHTML.push('')
        tmpHTML.push('	var ControlCode = {};')
        tmpHTML.push('')
        tmpHTML.push('    ControlCode.setup = setup;')
        tmpHTML.push('    function setup(){')
        tmpHTML.push('        console.log("Ran setup")')
        tmpHTML.push('    }')
        tmpHTML.push('')
        tmpHTML.push('	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};')
        tmpHTML.push('	return ThisControl;')
        tmpHTML.push('})(ActionAppCore, $);')

        return tmpHTML.join('\n');
    } else if (tmpType == 'Panel') {
        var tmpHTML = [];
        tmpHTML.push('{')
        tmpHTML.push('    "options":{')
        tmpHTML.push('        "padding": true')
        tmpHTML.push('    },')
        tmpHTML.push('	"content": [')
        tmpHTML.push('	')
        tmpHTML.push('		{')
        tmpHTML.push('			"ctl": "title",')
        tmpHTML.push('			"name": "title",')
        tmpHTML.push('		    "text": "Page Title"')
        tmpHTML.push('		}')
        tmpHTML.push('	]')
        tmpHTML.push('}')
        return tmpHTML.join('\n');
    }

    return "";

}

function restartServer() {
    var { spawn } = require('child_process');


    var logfile = 'restart.log';
    var out = $.fs.openSync(logfile, 'a');
    var err = $.fs.openSync(logfile, 'a');
    //var subprocess = spawn('./restart.sh', [], { detached: true, stdio: ['ignore', out, err] });

    subprocess.unref();

    process.exit();
}

function getDirApps() {

}


function updateCatSetup(theName, theSetupDetails, scope) {
    // console.log( 'updateCatSetup', theName, theSetupDetails);
    var self = this;
    return new Promise($.async(function (resolve, reject) {
        try {
            var bld = $.bld;
            var tmpName = theName || '';
            if (!(tmpName)) {
                throw "Application name not provided"
            }

            var tmpWSDir = scope.locals.path.ws.catalogs;

            var tmpAppBase = tmpWSDir + tmpName + '/';
            // console.log( 'Saving to ', tmpAppBase, theSetupDetails);
            $.await(utils.saveJsonFile(tmpAppBase + 'cat-info.json', theSetupDetails))
            //$.await(buildApp(tmpName, scope));

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

function updateAppSetup(theAppName, theSetupDetails, scope) {
    // console.log( 'updateAppSetup', theAppName, theSetupDetails);
    var self = this;
    return new Promise($.async(function (resolve, reject) {
        try {
            var bld = $.bld;
            var tmpAppName = theAppName || '';
            if (!(tmpAppName)) {
                throw "Application name not provided"
            }

            var tmpWSDir = scope.locals.path.ws.uiApps;

            var tmpAppBase = tmpWSDir + tmpAppName + '/';
            // console.log( 'Saving to ', tmpAppBase, theSetupDetails);
            $.await(utils.saveJsonFile(tmpAppBase + 'app-info.json', theSetupDetails))
            $.await(buildApp(tmpAppName, scope));

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

function buildApp(theAppName, scope, theOptions) {
    var self = this;
    return new Promise($.async(function (resolve, reject) {
        try {
            var tmpOptions = theOptions || {};

            var bld = $.bld;
            var tmpAppName = theAppName || '';
            if (!(tmpAppName)) {
                throw "Application name not provided"
            }

            var tmpWSDir = scope.locals.path.ws.uiApps;
            var tmpDeployDir = scope.locals.path.ws.deploy;

            var tmpAppBase = tmpWSDir + tmpAppName + '/';
            var tmpAppDetails = $.await(utils.getJsonFile(tmpAppBase + 'app-info.json'))

            if (tmpOptions.deployType === 'cordova') {
                tmpDeployDir += 'cordova/';
                tmpDeployDir += tmpAppName + '/CordovaApp/www/';
                $.await($.fs.ensureDir(tmpDeployDir));
            } else {
                tmpDeployDir += tmpAppName + '/ui-app/';
                $.await($.fs.ensureDir(tmpDeployDir));
            }

            var tmpBuildCfg = $.await(utils.getBuildConfigJson(scope));

            if (typeof (tmpOptions.cdn) === 'string') {
                tmpAppDetails.cdn = tmpOptions.cdn;
            }
            if (tmpOptions.deploy === true) {
                tmpAppBase = tmpDeployDir;
            }

            var tmpPartsLoc = scope.locals.path.designer + '/build/tpl-parts/';
            if (tmpOptions.deployType === 'cordova') {
                tmpPartsLoc += 'cordova/';
            }
            var tmpIndex = $.await(utils.getTextFile(tmpPartsLoc + 'tpl-index.html'))
            var tmpApp = $.await(utils.getTextFile(tmpPartsLoc + 'tpl-app-js.txt'))

            var tmpLibLocs = utils.getIndexFromArray(tmpBuildCfg.libraryLocations, 'name');
            if (tmpOptions.deployType === 'cordova') {
                tmpAppDetails.cdn = 'mobile'
            }

            var tmpLibLoc = tmpLibLocs[tmpAppDetails.cdn] || 'local';
            
            var tmpOptLibCSS = '';
            var tmpOptLibJS = '';
            var tmpPluginsText = '';

            var tmpPIConfig = tmpAppDetails.plugins || false;
            if (tmpPIConfig && tmpPIConfig.length) {
                var tmpPIs = utils.getIndexFromArray(tmpBuildCfg.plugins, 'name');
                for (var aIndex in tmpPIConfig) {
                    var tmpPIDetails = tmpPIConfig[aIndex];
                    tmpPIDetails = tmpPIs[tmpPIDetails];
                    if (tmpPIDetails && tmpPIDetails.css) {
                        var tmpCSSs = tmpPIDetails.css;
                        if (typeof (tmpCSSs) == 'string') {
                            tmpCSSs = [tmpCSSs];
                        }
                        for (var iCSS in tmpCSSs) {
                            var tmpCSS = tmpCSSs[iCSS];
                            if (tmpPICSS) {
                                tmpPICSS += '\n\t'
                            }
                            tmpPICSS += tmpCSS;
                        }

                    }
                    if (tmpPIDetails && tmpPIDetails.js) {
                        var tmpJSs = tmpPIDetails.js;
                        if (typeof (tmpJSs) == 'string') {
                            tmpJSs = [tmpJSs];
                        }
                        for (var iJS in tmpJSs) {
                            var tmpJS = tmpJSs[iJS];
                            if (tmpPluginsText) {
                                tmpPluginsText += '\n\t'
                            }
                            tmpPluginsText += tmpJS;
                        }

                    }
                }
            }

            var tmpOptCSS = '';
            if (tmpAppDetails && tmpAppDetails.hasAppCSS) {
                tmpOptCSS = "<link rel=\"stylesheet\" href=\"/app/css/app.css\">"
            }
            var tmpLibsConfig = tmpAppDetails.libraries || false;
            if (tmpLibsConfig && tmpLibsConfig.length) {
                var tmpLibs = utils.getIndexFromArray(tmpBuildCfg.libraries, 'name');
                for (var aIndex in tmpLibsConfig) {
                    var tmpLibDetails = tmpLibsConfig[aIndex];
                    tmpLibDetails = tmpLibs[tmpLibDetails];
                    if (tmpLibDetails && tmpLibDetails.css) {
                        var tmpCSSs = tmpLibDetails.css;
                        if (typeof (tmpCSSs) == 'string') {
                            tmpCSSs = [tmpCSSs];
                        }
                        for (var iCSS in tmpCSSs) {
                            var tmpCSS = tmpCSSs[iCSS];
                            if (tmpOptLibCSS) {
                                tmpOptLibCSS += '\n\t'
                            }
                            tmpOptLibCSS += tmpCSS;
                        }

                    }
                    if (tmpLibDetails && tmpLibDetails.js) {
                        var tmpJSs = tmpLibDetails.js;
                        if (typeof (tmpJSs) == 'string') {
                            tmpJSs = [tmpJSs];
                        }
                        for (var iJS in tmpJSs) {
                            var tmpJS = tmpJSs[iJS];
                            if (tmpOptLibJS) {
                                tmpOptLibJS += '\n\t'
                            }
                            tmpOptLibJS += tmpJS;
                        }

                    }
                }
            }

            var tmpHideHeader = tmpAppDetails.hideheader || false;
            var tmpHeaderApp = '';
            var tmpHeaderIndex = '';
            if( tmpHideHeader == 'y'){
                tmpHeaderApp = 'customHeader: true, ';
                tmpHeaderIndex = 'display:none;';
            }
            var tmpTitle = tmpAppDetails.title || 'Action App';

            var tmpPagesText = '[]';
            if (tmpAppDetails.pages) {
                if (typeof (tmpAppDetails.pages) == 'string') {
                    tmpPagesText = tmpAppDetails.pages;
                } else {
                    tmpPagesText = JSON.stringify(tmpAppDetails.pages);
                }
            }


            var tmpPagesText = '[]';
            if (tmpAppDetails.pages) {
                if (typeof (tmpAppDetails.pages) == 'string') {
                    tmpPagesText = tmpAppDetails.pages;
                } else {
                    tmpPagesText = JSON.stringify(tmpAppDetails.pages);
                }
            }

            var tmpPluginsAppText = '[]';
            if (tmpAppDetails.plugins) {
                if (typeof (tmpAppDetails.plugins) == 'string') {
                    tmpPluginsAppText = tmpAppDetails.plugins;
                } else {
                    tmpPluginsAppText = JSON.stringify(tmpAppDetails.plugins);
                }
            }


            var tmpReqAppText = '{}';
            if (tmpAppDetails.required) {
                if (typeof (tmpAppDetails.required) == 'string') {
                    tmpReqAppText = tmpAppDetails.required;
                } else {
                    tmpReqAppText = JSON.stringify(tmpAppDetails.required);
                }
            }

            var tmpExtendAppText = '{}';
            if (tmpAppDetails.extend) {
                if (typeof (tmpAppDetails.extend) == 'string') {
                    tmpExtendAppText = tmpAppDetails.extend;
                } else {
                    tmpExtendAppText = JSON.stringify(tmpAppDetails.extend);
                }
            }
            
            var tmpOptionalTags = "";
            if (tmpAppDetails.headtags) {
                if (typeof (tmpAppDetails.headtags) == 'string') {
                    tmpOptionalTags = tmpAppDetails.headtags;
                }
            }
            
            tmpOptCSS = bld.replaceAll(tmpOptCSS, "{{LIBRARY-LOCATION}}", (tmpLibLoc.prefix || ''));
            tmpOptLibJS = bld.replaceAll(tmpOptLibJS, "{{LIBRARY-LOCATION}}", (tmpLibLoc.prefix || ''));
            tmpOptLibCSS = bld.replaceAll(tmpOptLibCSS, "{{LIBRARY-LOCATION}}", (tmpLibLoc.prefix || ''));
            tmpPluginsText = bld.replaceAll(tmpPluginsText, "{{LIBRARY-LOCATION}}", (tmpLibLoc.prefix || ''));

            var tmpIndexMap = {
                "{{LIBRARY-LOCATION}}": tmpLibLoc.prefix || '',
                "{{OPTIONAL-LIB-CSS}}": tmpOptLibCSS,
                "{{OPTIONAL-TAGS}}": tmpOptionalTags,
                "{{OPTIONAL-CSS}}": tmpOptCSS,
                "{{PAGE-TITLE}}": tmpTitle,
                "{{APP-TITLE}}": tmpTitle,
                "{{OPTIONAL-PLUGINS}}": tmpPluginsText,
                "{{OPTIONAL-LIB-JS}}": tmpOptLibJS,
                "NORTH:STYLE;": tmpHeaderIndex
            }

            var tmpAppMap = {
                "{{PAGES-ARRAY}}": tmpPagesText,
                "{{PLUGINS-ARRAY}}": tmpPluginsAppText,
                "{{REQUIRED-OBJECT}}": tmpReqAppText,
                "{{EXTEND-OBJECT}}": tmpExtendAppText,
                "{{OPTIONAL-APP-CODE}}": "",
                "{{INIT_OPTIONS}}": tmpHeaderApp
            }

            tmpIndex = utils.replaceFromMap(tmpIndex, tmpIndexMap);
            
            $.await(utils.replaceFile(tmpAppBase + 'index.html', tmpIndex))

            tmpApp = utils.replaceFromMap(tmpApp, tmpAppMap);
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


function replaceAll(str, replaceWhat, replaceTo) {
    var re = new RegExp(replaceWhat, 'g');
    return str.replace(re, replaceTo);
}

function getIndexFromArray(theArray, theKeyField) {
    var tmpRet = {};
    for (var aIndex in theArray) {
        var tmpEntry = theArray[aIndex];
        var tmpKey = tmpEntry[(theKeyField || 'id')];
        tmpRet[tmpKey] = tmpEntry;
    }
    return tmpRet;
}
function replaceFromMap(theString, theMap) {
    var tmpRet = '' + theString;
    for (var aName in theMap) {
        var tmpValue = theMap[aName];
        if (typeof (tmpValue) == 'function') {
            tmpValue = tmpValue(aName);
        }
        tmpRet = replaceAll(tmpRet, aName, tmpValue)
    }
    return tmpRet;
}


function settingsHome() {
    const tmpHomeDir = $.os.homedir();
    return tmpHomeDir + '/.actapp/';
}

function getBuildConfigJson(scope) {
    return utils.getJsonFile(scope.locals.path.designer + '/build/app-build-config.json');
}




//--- Replace File
function replaceFile(theFilename, theValue) {
    return new Promise($.async(function (resolve, reject) {
        try {
            $.fs.writeFile(theFilename, theValue, 'utf8', function (err, theContent) {
                if (err) {
                    console.error("COuld not save file",err)
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
function getTextFile(theFilename) {
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
function getJsonFile(theFilename) {
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
function saveJsonFile(theFilename, theObject) {

    var tmpObject = theObject || {};
    if (typeof (tmpObject) == 'string') {
        tmpObject = JSON.parse(tmpObject);
    }
    return $.fs.writeJson(theFilename, tmpObject)
}

//--- Like readJson but returns [] if not there
function getDirFiles(theDirectory) {
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



