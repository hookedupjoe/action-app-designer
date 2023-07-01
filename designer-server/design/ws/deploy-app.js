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
        return new Promise( async function (resolve, reject) {
            try {
                var tmpWSDir = scope.locals.path.ws.uiApps;
                var tmpDeployDir = scope.locals.path.ws.deploy;

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
                var tmpAppDetails = await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))
                var tmpAppTitle = tmpAppDetails.title || '';

                if( !(tmpAppTitle) ){
                    throw( "Application " + tmpAppName + " not found");
                }

                tmpPrefix = tmpPrefix || tmpAppDetails.prefix || ('actapp-' + tmpAppName)

                var tmpDeployBase = tmpDeployDir + tmpAppName + '/';
                var tmpDeployTemp = tmpDeployDir + "temp_files" + '/';

                await($.fs.ensureDir(tmpDeployBase));
                await($.fs.ensureDir(tmpDeployBase + '/ui-app'));

                await($.fs.ensureDir(tmpDeployTemp));
                await($.fs.emptyDir(tmpDeployTemp));
                
                //--- Copy to a TEMP location, remove the .git repo 
                //... if present before doig the copy to deploy, 
                //...   so it can be repo'd as well for FTP pushes, etc
                await($.fs.copy(tmpAppBase,tmpDeployTemp));
                
                var tmpDeployGIT = tmpDeployTemp + ".git/";
                //-- Create if does not exists, so we can clean remove it
                await($.fs.ensureDir(tmpDeployGIT));
                await($.fs.remove(tmpDeployGIT));

                await($.fs.copy(tmpDeployTemp,tmpDeployBase + '/ui-app'));
                
                await($.fs.remove(tmpDeployTemp));

                var tmpServerFilesLoc = scope.locals.path.designer + '/build/tpl-servers/ui-app/';


                await($.fs.copy(tmpServerFilesLoc,tmpDeployBase));
                var tmpManifestText = await($.bld.getTextFile(tmpDeployBase + 'manifest.yml'));
                tmpManifestText = tmpManifestText.replace('{{URL-PREFIX}}', tmpPrefix);
                await($.fs.writeFile(tmpDeployBase + 'manifest.yml',tmpManifestText))

                //--- Rebuild using defaults
                await($.bld.buildApp(tmpAppName,scope,{deploy:true}));

                await($.fs.copy(scope.locals.path.uilibs + '/',tmpDeployBase + '/ui-app/'));
                var tmpEPFrom = scope.locals.path.appdataendpoints + '/api/';
                var tmpEPTo = tmpDeployBase + 'server-app/appdata/api/';

                await($.fs.copy(tmpEPFrom,tmpEPTo));

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

        });



    }

    //====== IMPORTANT --- --- --- --- --- --- --- --- --- --- 
    //====== End of Module / setup ==== Nothing new below this
    return async function processReq(req, res, next) {
        try {
            var tmpRoute = new Route();
            var tmpResults = await(tmpRoute.run(req, res, next));

            //--- Getting documents to use directly by source, 
            //    .. do not wrap the success flag
            res.json(tmpResults)
        } catch (ex) {
            res.json({ status: false, error: ex.toString() })
        }
    }
    
};





