'use strict';
const THIS_MODULE_NAME = 'initial-setup';
const THIS_MODULE_TITLE = 'Create the initial setup json for the application';

module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;

    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }
    var base = Route.prototype;

    var $ = config.locals.$;
    var bld = require(scope.locals.path.libraries + '/lib_buildUtils.js');

    //--- Load the prototype
    base.run = function (req, res, next) {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {
                var tmpSetupDetails = {
                    rootDir: 'c:/actapp/',
                    libDir: 'C:/Users/josephfrancis/git/huj/action-app-web/www/'
                }
                const tmpSettingsDir = bld.settingsHome();
                console.log( 'tmpSettingsDir', tmpSettingsDir);
                $.await($.fs.ensureDir(tmpSettingsDir));
                $.await(bld.saveJsonFile(tmpSettingsDir + 'setup.json', tmpSetupDetails));
                
                var tmpRet = {status:true}
                console.log( 'tmpSetupDetails.rootDir', tmpSetupDetails.rootDir);
                $.await($.fs.ensureDir(tmpSetupDetails.rootDir))
                $.await($.fs.ensureDir(tmpSetupDetails.rootDir + 'apps/'))
                
                // var tmpAppName = req.query.appname || req.query.name || req.query.filename || '';
                // var tmpWSDir = scope.locals.path.start + '/../local_ws/apps/';
                // var tmpAppBase = tmpWSDir + tmpAppName + '/';
                // var tmpAppDetails = $.await($.bld.getJsonFile(tmpAppBase + 'app-info.json'))

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





