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
        return new Promise( async function (resolve, reject) {
            try {

                
               


                var tmpBody = req.body || {};
                if (typeof (tmpBody) == 'string') {
                    try {
                        tmpBody = JSON.parse(tmpBody)
                    } catch (ex) {
                        throw("Bad JSON Passed")
                    }
                }
                var tmpAppName = tmpBody.appname;
                if (!(tmpAppName)){
                    throw("Missing Application Name")    
                }
                var tmpAppTitle = tmpBody.title || tmpAppName;
                var tmpAppDesc = tmpBody.description || '';
                var tmpTemplate = tmpBody.template || 'default';

                var tmpWSDir = scope.locals.path.ws.uiApps;
                var tmpAppBase = tmpWSDir + tmpAppName + '/';

                var tmpBuildCfg = await($.bld.getBuildConfigJson(scope));
                var tmpFromDir = scope.locals.path.root + '/' + tmpBuildCfg.applicationTemplateLocation + tmpTemplate + '/';
                var tmpToDir = tmpAppBase;

                await($.fs.copy(tmpFromDir,tmpToDir));

                var tmpAppDetails = await($.bld.getJsonFile(tmpAppBase + 'app-info.json'));
                tmpAppDetails.title = tmpAppTitle;
                tmpAppDetails.details = tmpAppDesc || '';
                tmpAppDetails.name = tmpAppName;
                
                await($.bld.saveJsonFile(tmpAppBase + 'app-info.json', tmpAppDetails))

                $.bld.buildApp(tmpAppName, scope).then(function(theReply){
                    var tmpRet = {status: true};
                    resolve(tmpRet);
                })


            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }

        });



    }





    //====== IMPORTANT --- --- --- --- --- --- --- --- --- --- 
    //====== End of Module / setup ==== Nothing new below this
    return  async function processReq(req, res, next) {
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





