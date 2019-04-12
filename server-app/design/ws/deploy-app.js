'use strict';
const THIS_MODULE_NAME = 'deploy-app';
const THIS_MODULE_TITLE = 'Deploy application';

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

                if( !(req.query.appname) ){
                    throw "App name not provided";
                }
                var tmpReq = {
                    appname: req.query.appname,
                    prefix: req.query.prefix || ('actapp-' + req.query.appname)
                }
                
                
                if( !(tmpReq.prefix) ){
                    throw "No host name prefix provided"
                }    

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

                // var tmpDeployDetails = $.await($.bld.getJsonFile(tmpAppBase + 'deploy-info.json'))
                
                var tmpDeployBase = tmpDeployDir + tmpAppName + '/';

                $.await($.fs.ensureDir(tmpDeployBase));
                $.await($.fs.ensureDir(tmpDeployBase + '/ui-app'));
                $.await($.fs.copy(tmpAppBase,tmpDeployBase + '/ui-app'));

                var tmpServerFilesLoc = scope.locals.path.designer + '/build/tpl-servers/ui-app/';

                $.await($.fs.copy(tmpServerFilesLoc,tmpDeployBase));
                var tmpManifestText = $.await($.bld.getTextFile(tmpDeployBase + 'manifest.yml'));
                tmpManifestText = tmpManifestText.replace('{{URL-PREFIX}}', tmpReq.prefix);
                $.await($.fs.writeFile(tmpDeployBase + 'manifest.yml',tmpManifestText))

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





