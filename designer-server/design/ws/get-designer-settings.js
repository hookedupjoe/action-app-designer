'use strict';
const THIS_MODULE_NAME = 'get-designer-settings';
const THIS_MODULE_TITLE = 'Designer: Get Settings';

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

               var tmpRet = {
                    sitetitle: "Action App Designer",
                    sitetype: "Local"
                };
                var tmpConfigPath = $.scope.locals.path.ws.root + '/config/';
                await $.fs.ensureDir(tmpConfigPath);
                var tmpSettings = await $.bld.getJsonFile(tmpConfigPath + '/designer-settings.json');
                if( tmpSettings && tmpSettings.sitetitle ){
                    tmpRet = tmpSettings;
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





