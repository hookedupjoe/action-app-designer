'use strict';
const THIS_MODULE_NAME = 'launch-cordova-deploy';
const THIS_MODULE_TITLE = 'Launch mobile application deployment area';

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
                    status: true
                }
                var tmpWSDir = scope.locals.path.ws.uiApps;
                var tmpDeployDir = scope.locals.path.ws.deploy;

                var tmpAppName = req.query.appname || req.query.name || req.query.filename || '';
                tmpAppName = tmpAppName.replace('.json', '')

                var tmpAppBase = tmpDeployDir + 'cordova/' + tmpAppName + '/';

                const { spawn } = require('child_process');
                const ls = spawn('vscode.bat', [tmpAppBase]);

                ls.stdout.on('data', (data) => {
                    //console.log(`stdout: ${data}`);
                });

                ls.stderr.on('data', (data) => {
                    //console.log(`stderr: ${data}`);
                });

                ls.on('close', (code) => {
                    //console.log(`child process exited with code ${code}`);
                });


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





