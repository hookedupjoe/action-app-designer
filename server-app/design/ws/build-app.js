'use strict';
const THIS_MODULE_NAME = 'build-app';
const THIS_MODULE_TITLE = 'Create application files for specified app';

module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;

    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }
    var base = Route.prototype;

    var $ = config.locals.$;
    var bld = $.bld;

    //--- Load the prototype
    base.run = function (req, res, next) {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {
                console.log( 'req.query', req.query);
                console.log( 'req.params', req.params);

                var tmpAppName = req.query.appname || req.query.name || req.query.filename || '';

                var tmpWSDir = scope.locals.path.workspace + 'apps/';
                
                var tmpAppBase = tmpWSDir + tmpAppName + '/';
                var tmpAppDetails = $.await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))

                var tmpBuildCfg = $.await($.bld.getJsonFile(scope.locals.path.designer + '/build/app-build-config.json'));

                var tmpPartsLoc = scope.locals.path.designer + '/build/tpl-parts/';
                var tmpIndex = $.await($.bld.getTextFile(tmpPartsLoc + 'tpl-index.html'))
                var tmpApp = $.await($.bld.getTextFile(tmpPartsLoc + 'tpl-app-js.txt'))

                var tmpLibLocs = $.bld.getIndexFromArray(tmpBuildCfg.libraryLocations, 'name');
                var tmpLibLoc = tmpLibLocs[tmpAppDetails.cdn] || 'local';
                var tmpOptLibCSS = '';
                var tmpOptLibJS = '';
                var tmpPluginsText = '';

                var tmpPIConfig = tmpAppDetails.plugins || false;
                if( tmpPIConfig && tmpPIConfig.length ){
                    var tmpPIs = $.bld.getIndexFromArray(tmpBuildCfg.plugins, 'name');
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
                    var tmpLibs = $.bld.getIndexFromArray(tmpBuildCfg.libraries, 'name');
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
                
                console.log( 'tmpExtendAppText', tmpExtendAppText);
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

               tmpIndex = $.bld.replaceFromMap(tmpIndex,tmpIndexMap);
               $.await($.bld.replaceFile(tmpAppBase + 'index.html', tmpIndex))
  
               tmpApp = $.bld.replaceFromMap(tmpApp,tmpAppMap);
               $.await($.bld.replaceFile(tmpAppBase + 'app/app.js', tmpApp))

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





