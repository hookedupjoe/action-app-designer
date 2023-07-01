'use strict';
const THIS_MODULE_NAME = 'save-designer-settings';
const THIS_MODULE_TITLE = 'Designer: Save Settings';

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
                var tmpBody = req.body || {};
                if (typeof (tmpBody) == 'string') {
                    try {
                        tmpBody = JSON.parse(tmpBody)
                    } catch (ex) {
                        throw("Bad JSON Passed")
                    }
                }

                var tmpConfigPath = $.scope.locals.path.ws.root + '/config/';
                await $.fs.ensureDir(tmpConfigPath);
                var tmpStatus = true;
                if( tmpBody && tmpBody.sitetitle ){
                    await $.bld.saveJsonFile(tmpConfigPath + '/designer-settings.json', tmpBody);     

                } else {
                    tmpStatus = false;
                }

                var tmpRet = {
                    status: tmpStatus
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

    function wrapIt(theString) {
        return '\r\n\r\n' + theString + '\r\n\r\n'
    }
};





