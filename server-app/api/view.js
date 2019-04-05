/*
Standard NoSQL Viewer
*/
'use strict';
const THIS_MODULE_NAME = 'views';
const THIS_MODULE_TITLE = 'NoSQL views proxy with mapping';

module.exports.setup = function setup(scope) {
    var config = scope;

    var $ = config.locals.$;

    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }

    
    var base = Route.prototype;
    base.run = function (req, res, next) {
        var self = this;
        return new Promise($.async(function (resolve, reject) {
            try {

                var tmpViewName = req.query.viewname || req.query.name || '';
                if (!tmpViewName) {
                    throw "No view name provided";
                }
                
                var tmpViewDetails = $.cloneObject(require('./views/' + tmpViewName + '.js'));
                var tmpDB = $.AppUtils.getDatabaseForView(tmpViewDetails);

                var tmpViewURI = tmpViewDetails.uri;

                var tmpDocs = [];

                var tmpKeys = req.query.keys || req.query.key || '';
                if((tmpKeys) && typeof(tmpKeys) == 'string'){
                    tmpKeys = tmpKeys.split(",");
                }

     
                if( tmpKeys && tmpViewDetails.isView ){
                    tmpDocs = $.await(tmpDB.getDocumentsByViewKeys(tmpViewURI, tmpKeys));
                } else if (tmpKeys) {
                   tmpDocs = $.await(tmpDB.getDocumentsByKeys(tmpKeys));
                } else {
                    //-- getRowDocs will enforces / defaults - {valueAsDoc:true}
                   tmpDocs = $.await(tmpDB.getRowDocs(tmpViewURI, tmpViewDetails.options || {}));
                }

                var tmpReport = {
                    keys: tmpKeys,
                    data: tmpDocs
                }

                resolve(tmpReport);
            }
            catch (error) {
                console.log('Err : ' + error);
                reject(error);
            }
        }));
    }


    


    //====== End of Module / setup ==== Nothing new below this
    return $.async(function processReq(req, res, next) {
        try {
            var tmpModule = new Route();
            var tmpResults = $.await(tmpModule.run(req, res, next));
            res.json({
                status: true,
                results: tmpResults
            })
        } catch (ex) {
            res.json({ status: false, error: ex.toString() })
        }
    })

};
