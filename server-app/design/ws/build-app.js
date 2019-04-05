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
console.log( 'tmpBuildCfg', tmpBuildCfg);
console.log( 'tmpAppDetails', tmpAppDetails);

                var tmpPartsLoc = scope.locals.path.designer + '/build/tpl-parts/';
                var tmpIndex = $.await($.bld.getTextFile(tmpPartsLoc + 'tpl-index.html'))
                var tmpApp = $.await($.bld.getTextFile(tmpPartsLoc + 'tpl-app-js.txt'))

                var tmpLibLocs = $.bld.getIndexFromArray(tmpBuildCfg.libraryLocations, 'name');
                var tmpLibLoc = tmpLibLocs[tmpAppDetails.cdn] || 'local';
                console.log( 'tmpLibLoc', tmpLibLoc);
                var tmpIndexMap = {
                    "{{LIBRARY-LOCATION}}": tmpLibLoc.prefix || '.',
                    "{{OPTIONAL-LIB-CSS}}": "<link rel=\"stylesheet\" href=\"//localhost:7071/lib/datatables/datatables.min.css\">\n<link rel=\"stylesheet\" href=\"//localhost:7071/lib/datatables/responsive.custom.css\">\n<link rel=\"stylesheet\" href=\"//localhost:7071/lib/css/dataTables.semanticui.min.css\">",
                    "{{OPTIONAL-CSS}}": "<link rel=\"stylesheet\" href=\"/app/css/app.css\">",
                    "{{PAGE-TITLE}}": "My First App",
                    "{{APP-TITLE}}": "My First App",
                    "{{OPTIONAL-PLUGINS}}": "<script src=\"//localhost:7071/plugins/jquery-datatables-helper.js\"></script>\n<script src=\"//localhost:7071/plugins/datatables-plugin.js\"></script>",
                    "{{OPTIONAL-LIB-JS}}": "<script src=\"//localhost:7071/lib/datatables/datatables.min.js\"></script>\n<script src=\"//localhost:7071/lib/ace/ace.js\"></script>"
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





