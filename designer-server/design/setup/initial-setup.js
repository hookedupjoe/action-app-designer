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
    var bld = require(scope.locals.path.libraries + '/lib_BuildUtils.js');

    //--- Load the prototype
    base.run = function (req, res, next) {
        var self = this;
        return new Promise( async function (resolve, reject) {
            try {

                var tmpRootDir = req.query.root || req.query.rootdir || ($.os.homedir() + '/actapp/');

                tmpRootDir = tmpRootDir.replace('[home]', $.os.homedir());

                if( !(tmpRootDir.endsWith('/'))){
                    tmpRootDir += '/';
                }
                var tmpSetupDetails = {
                    rootDir: tmpRootDir
                }
                const tmpSettingsDir = bld.settingsHome();
                await($.fs.ensureDir(tmpSettingsDir));
                await(bld.saveJsonFile(tmpSettingsDir + 'setup.json', tmpSetupDetails));
                
                var tmpRet = {status:true}
                await($.fs.ensureDir(tmpSetupDetails.rootDir))
                await($.fs.ensureDir(tmpSetupDetails.rootDir + 'ui-apps/'))
                await($.fs.ensureDir(tmpSetupDetails.rootDir + 'server-apps/'))
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





