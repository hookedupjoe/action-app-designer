/*
 *  Send bulk data from CSV to NoSQL Database
 */
'use strict';

const THIS_MODULE_NAME = 'build-preview-app';
const THIS_MODULE_TITLE = 'Load application for preview';

module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;

    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }
    var base = Route.prototype;
    //==== End of common setup - add special stuff below
    //--- must have a "run" method *** 
    
    var $ = config.locals.$;

    //--- Load the prototype
    base.run = function (req, res, next) {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {
                var tmpRet = {
                    app: 'demo app', 
                    designerPath: scope.locals.path.designer,
                    build: {}
                }

                var tmpSource = scope.locals.path.designer + '/build/tpl-apps/preview-app';
                var tmpTarget = scope.locals.path.preview;
                tmpRet.locations = {
                    source: tmpSource,
                    target: tmpTarget
                }
                $.fs.emptyDir(tmpTarget).then(function(){
                    $.fs.copy(tmpSource, tmpTarget).then(function(){
                        resolve(tmpRet);
                    })
                })

                //$.await(scope.locals.$.BuildUtils.copyDirectory(tmpSource, tmpTarget));

               
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
            res.json({
                status: true,
                results: tmpResults
            })
        } catch (ex) {
            res.json({ status: false, error: ex.toString() })
        }
    })
};