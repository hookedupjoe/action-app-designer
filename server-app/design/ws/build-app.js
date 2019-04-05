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

    //--- Load the prototype
    base.run = function (req, res, next) {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {
                console.log( 'req.query', req.query);
                console.log( 'req.params', req.params);

                var tmpAppName = req.query.appname || req.query.name || req.query.filename || '';
                var tmpWSDir = scope.locals.path.start + '/../local_ws/apps/';
                var tmpAppBase = tmpWSDir + tmpAppName + '/';
                var tmpAppDetails = $.await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))

                var tmpBuildCfg = $.await($.bld.getJsonFile(scope.locals.path.designer + '/build/app-build-config.json'));
// console.log( 'tmpBuildCfg', tmpBuildCfg);
// console.log( 'tmpAppDetails', tmpAppDetails);

                var tmpPartsLoc = scope.locals.path.designer + '/build/tpl-parts/';
                var tmpIndex = $.await($.bld.getTextFile(tmpPartsLoc + 'tpl-index.html'))
                var tmpApp = $.await($.bld.getTextFile(tmpPartsLoc + 'tpl-app-js.txt'))

                var tmpLibLocs = $.bld.getIndexFromArray(tmpBuildCfg.libraryLocations, 'name');
                var tmpLibLoc = tmpLibLocs[tmpAppDetails.cdn] || 'local';
                var tmpOptLibCSS = '';
                var tmpOptLibJS = '';
                var tmpLibsConfig = tmpAppDetails.libraries || false;
                if( tmpLibsConfig && tmpLibsConfig.length ){
                    var tmpLibs = $.bld.getIndexFromArray(tmpBuildCfg.libraries, 'name');
                    // console.log( 'tmpLibsConfig', tmpLibsConfig);
                    // console.log( 'tmpLibs', tmpLibs);
                    for( var aIndex in tmpLibsConfig){
                        var tmpLibDetails = tmpLibsConfig[aIndex];
                        tmpLibDetails = tmpLibs[tmpLibDetails];
                        if( tmpLibDetails && tmpLibDetails.css){
                            // console.log( 'tmpLibDetails', tmpLibDetails);
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
                                // console.log( 'tmpCSS', tmpCSS);
                            }
                            
                        }
                        if( tmpLibDetails && tmpLibDetails.js){
                            // console.log( 'tmpLibDetails', tmpLibDetails);
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
                                // console.log( 'tmpJS', tmpJS);
                            }
                            
                        }
console.log( 'tmpOptLibCSS', tmpOptLibCSS);
                        console.log( 'tmpOptLibJS', tmpOptLibJS);
                        // if (tmpLibName){
                        //     var tmpLibText = tmpLibs[tmpLibName];
                        //     if (tmpLibText){
                        //         if( tmpLibsText ){
                        //             tmpLibsText += '\n\t';
                        //         }
                        //         tmpLibsText += tmpLibText
                        //     }
                        // }
                    }
                }
                //var tmpLibLoc = tmpLibLocs[tmpAppDetails.cdn] || 'local';

                var tmpTitle = tmpAppDetails.title || 'Action App';

                // console.log( 'tmpLibLoc', tmpLibLoc);
                var tmpIndexMap = {
                    "{{LIBRARY-LOCATION}}": tmpLibLoc.prefix || '.',
                    "{{OPTIONAL-LIB-CSS}}": tmpOptLibCSS,
                    "{{OPTIONAL-CSS}}": "<link rel=\"stylesheet\" href=\"/app/css/app.css\">",
                    "{{PAGE-TITLE}}": tmpTitle,
                    "{{APP-TITLE}}": tmpTitle,
                    "{{OPTIONAL-PLUGINS}}": "<script src=\"//localhost:7071/plugins/jquery-datatables-helper.js\"></script>\n<script src=\"//localhost:7071/plugins/datatables-plugin.js\"></script>",
                    "{{OPTIONAL-LIB-JS}}": tmpOptLibJS
                }

                var tmpAppMap = {
                    "{{PAGES-ARRAY}}": "[\"HomePage\",\"LogsPage\"]",
                    "{{PLUGINS-ARRAY}}": "[\"DataTables\"]",
                    "{{REQUIRED-OBJECT}}": "{}",
                    "{{EXTEND-OBJECT}}": "{}",
                    "{{OPTIONAL-APP-CODE}}": ""
                }

               tmpIndex = $.bld.replaceFromMap(tmpIndex,tmpIndexMap);
               $.await($.bld.replaceFile(tmpAppBase + 'index.html', tmpIndex))
  
               tmpApp = $.bld.replaceFromMap(tmpApp,tmpAppMap);
               $.await($.bld.replaceFile(tmpAppBase + 'app/app.js', tmpApp))

                var tmpRet = {
                    status: true,
                    // app: tmpApp,
                    index: tmpIndex,
                    info: tmpAppDetails,
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





