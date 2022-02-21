'use strict';
const THIS_MODULE_NAME = 'deploy-cordova';
const THIS_MODULE_TITLE = 'Deploy Cordova - mobile application';

module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;

    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }
    var base = Route.prototype;

    var $ = config.locals.$;

    
    //--- Load the prototype
    base.run = function (req, res, next) {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {
                var tmpWSDir = scope.locals.path.ws.uiApps;
                var tmpDeployDir = scope.locals.path.ws.deploy;
                tmpDeployDir += 'cordova/';

                if( !(req.query.appname) ){
                    throw "App name not provided";
                }
                var tmpReq = {
                    appname: req.query.appname,
                    prefix: req.query.prefix || ''
                }
                
                
                var tmpPrefix = tmpReq.prefix;
                
                var tmpAppName = tmpReq.appname;
                tmpAppName = tmpAppName.replace('.json', '');

                if( !(tmpAppName) ){
                    throw "Application name not provided"
                }
              
                var tmpAppBase = tmpWSDir + tmpAppName + '/';
                var tmpAppDetails = $.await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))
                var tmpAppTitle = tmpAppDetails.title || '';

                if( !(tmpAppTitle) ){
                    throw( "Application " + tmpAppName + " not found");
                }

                tmpPrefix = tmpPrefix || tmpAppDetails.prefix || ('actapp-' + tmpAppName)

                var tmpDeployBase = tmpDeployDir + tmpAppName + '/';
                
                $.await($.fs.ensureDir(tmpDeployBase));

                var tmpServerFilesLoc = scope.locals.path.designer + '/build/tpl-servers/cordova/';
 
                //--- Copy the app.js from this file to cordova
                var tmpKeepAppFN = tmpAppBase + 'app/app.js';

                var tmpKeepConfigFN = tmpDeployBase + 'CordovaApp/config.xml';
                var tmpKeepPackageFN = tmpDeployBase + 'CordovaApp/package.json';

                var tmpKeepAppText = $.await($.bld.getTextFile(tmpKeepAppFN));
                var tmpKeepConfigText = $.await($.bld.getTextFile(tmpKeepConfigFN));
                var tmpKeepPackageText = $.await($.bld.getTextFile(tmpKeepPackageFN));

                $.await($.fs.copy(tmpServerFilesLoc,tmpDeployBase));

                $.await($.fs.ensureDir(tmpDeployBase + '/CordovaApp/www'));
                $.await($.fs.copy(tmpAppBase,tmpDeployBase + '/CordovaApp/www'));

                $.await($.fs.remove(tmpDeployBase + '/CordovaApp/www/.git/'));

                $.await($.fs.copy(scope.locals.path.uilibs + '/',tmpDeployBase + '/CordovaApp/www'));

                //--- Only do this one time or if forced
                //Todo: force option *
                var tmpSaveFN = tmpDeployBase + 'CordovaApp/config.xml';
                
                var tmpSaveText = '';

                if( tmpKeepConfigText != ''){
                    tmpSaveText = tmpKeepConfigText;
                } else {
                    tmpSaveText = $.await($.bld.getTextFile(tmpSaveFN));
                    tmpSaveText = replacePlaceholders(tmpSaveText, tmpAppDetails);
                }

                //tmpSaveText = replacePlaceholders(tmpSaveText, tmpAppDetails);
                
                $.await($.fs.writeFile(tmpSaveFN,tmpSaveText))

              

                tmpSaveFN = tmpDeployBase + 'CordovaApp/package.json';
                if( tmpKeepPackageText != ''){
                    tmpSaveText = tmpKeepPackageText;
                } else {
                    tmpSaveText = $.await($.bld.getTextFile(tmpSaveFN));
                    tmpSaveText = replacePlaceholders(tmpSaveText, tmpAppDetails);
                }
                $.await($.fs.writeFile(tmpSaveFN,tmpSaveText))

                tmpSaveFN = tmpDeployBase + 'package.json';
                tmpSaveText = $.await($.bld.getTextFile(tmpSaveFN));
                tmpSaveText = replacePlaceholders(tmpSaveText, tmpAppDetails);

                //                tmpSaveText = $.await($.bld.getTextFile(tmpSaveFN));
                //                tmpSaveText = replacePlaceholders(tmpSaveText, tmpAppDetails);
                $.await($.fs.writeFile(tmpSaveFN,tmpSaveText))

                // var tmpSaveFN = tmpDeployBase + 'CordovaApp/config.xml';
                // var tmpSaveText = $.await($.bld.getTextFile(tmpSaveFN));
                // tmpSaveText = tmpSaveText
                //     .replace('xxxxxxxx', yyyyyyyyyyy);
                // $.await($.fs.writeFile(tmpSaveFN,tmpSaveText))

                //var tmpManifestText = $.await($.bld.getTextFile(tmpDeployBase + 'manifest.yml'));
                //tmpManifestText = tmpManifestText.replace('{{URL-PREFIX}}', tmpPrefix);
                //$.await($.fs.writeFile(tmpDeployBase + 'manifest.yml',tmpManifestText))

                //--- Rebuild using defaults
                $.await($.bld.buildApp(tmpAppName,scope,{cdn:'mobile', deploy:true, deployType: 'cordova'}));

                tmpSaveFN = tmpDeployBase + 'CordovaApp/www/app/app.js';
                var tmpSaveText = '';

                // //--- No Longer Save App - Use Build Version
                // tmpKeepAppText = '';
                
                if( tmpKeepAppText != ''){
                    tmpSaveText = tmpKeepAppText;
                    $.await($.fs.writeFile(tmpSaveFN,tmpSaveText));
                    //console.log("saving new app file from content from app side",tmpKeepAppFN,tmpKeepAppText);
                } else {
                    //console.log("No content, keeping");
                }
                
                var tmpRet = {
                    status: true,
                    path: tmpDeployBase
                }

                resolve(tmpRet);

            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);                
            }

        }));

        

    }


    var placeholderMap = {
        "{{APP-ID}}": "app-id",
        "{{APP-VERSION}}": "app-version",
        "{{APP-TITLE}}": "app-title",
        "{{APP-DESC}}": "app-desc",
        "{{APP-AUTHOR}}": "app-author",
        "{{APP-AUTHOR-EMAIL}}": "app-author-email",
        "{{APP-URL}}": "app-url"
    }

    function replacePlaceholders(theString, theAppDetails){
        var tmpAppDetails = theAppDetails || {};
        var tmpString = theString || '';
        for( var aName in placeholderMap ){
            var tmpFN = placeholderMap[aName];
            if( tmpAppDetails.hasOwnProperty(tmpFN)){
                var tmpFV = tmpAppDetails[tmpFN] || '';
                tmpString = tmpString.replace(aName, tmpFV);
            }

        }
        return tmpString;            
    }



    //====== IMPORTANT --- --- --- --- --- --- --- --- --- --- 
    //====== End of Module / setup ==== Nothing new below this
    return $.async(function processReq(req, res, next) {
        try {
            var tmpRoute = new Route();
            var tmpResults = $.await(tmpRoute.run(req, res, next));

            //--- Getting documents to use directly by source, 
            //    .. do not wrap the success flag
            res.json(tmpResults)
        } catch (ex) {
            res.json({ status: false, error: ex.toString() })
        }
    })
};





