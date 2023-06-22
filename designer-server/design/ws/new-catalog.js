'use strict';
const THIS_MODULE_NAME = 'build-catalog';
const THIS_MODULE_TITLE = 'Create catalog directory';

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
                var tmpCatName = tmpBody.catname;
                if (!(tmpCatName)){
                    throw("Missing Catalog Name")    
                }
                var tmpCatTitle = tmpBody.title || tmpCatName;
                var tmpCatDesc = tmpBody.description || '';
                // var tmpTemplate = tmpBody.template || 'default';

                var tmpWSDir = scope.locals.path.ws.catalogs;
                var tmpCatBase = tmpWSDir + tmpCatName + '/';

                // var tmpBuildCfg = await($.bld.getBuildConfigJson(scope));
                // var tmpFromDir = scope.locals.path.root + '/' + tmpBuildCfg.applicationTemplateLocation + tmpTemplate + '/';
                // var tmpToDir = tmpCatBase;

                // await($.fs.copy(tmpFromDir,tmpToDir));

                await($.fs.ensureDir(tmpCatBase));
                await($.fs.ensureDir(tmpCatBase + 'panels/'));
                await($.fs.ensureDir(tmpCatBase + 'controls/'));
                await($.fs.ensureDir(tmpCatBase + 'tpl/'));
                await($.fs.ensureDir(tmpCatBase + 'html/'));

                var tmpCatDetails = await($.bld.getJsonFile(tmpCatBase + 'cat-info.json'));
                tmpCatDetails.title = tmpCatTitle;
                tmpCatDetails.details = tmpCatDesc || '';
                tmpCatDetails.name = tmpCatName;
                
                await($.bld.saveJsonFile(tmpCatBase + 'cat-info.json', tmpCatDetails))

                // $.bld.buildApp(tmpCatName, scope).then(function(theReply){
                //     var tmpRet = {status: true};
                //     resolve(tmpRet);
                // })
                var tmpRet = {status: true};
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





