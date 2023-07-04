'use strict';
const THIS_MODULE_NAME = 'test-auth';
const THIS_MODULE_TITLE = 'Data: Testing authentication';
//ToDo: Also create mongo user details?
//      roles?
module.exports.setup = function setup(scope) {
    var config = scope;
    var $ = config.locals.$;

    const bcrypt = require("bcrypt")
    const saltRounds = 10
    const jwt = require('jsonwebtoken');

    function Route() {
        this.name = THIS_MODULE_NAME;
        this.title = THIS_MODULE_TITLE;
    }
    var base = Route.prototype;
    
    var $ = config.locals.$;

    //--- Load the prototype
    base.run = async function (req, res, next) {
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
                
                // var tmpHash = '';
                // bcrypt
                // .hash(password, saltRounds)
                // .then(hash => {
                //     tmpHash = hash;
                //     var tmpRet = {success:true, hash: tmpHash};
    
                //     resolve(tmpRet);
                // })
                // .catch(err => console.error(err.message))
                
                let jwtSecretKey = 'tokenkey';
                let data = {
                    time: Date(),
                    userId: 12,
                }
              
//                var token = jwt.sign(data, jwtSecretKey);

// jwt.sign({ user: 'test1' }, "secretkey", function(err, theToken) {

//     var tmpRet = {success:true};
//     tmpRet.token = theToken;
//     resolve(tmpRet);

//   });


var tmpAuthDir = $.scope.locals.path.ws.root + 'auth/';
$.fs.ensureDir(tmpAuthDir);
//console.log($.scope.locals.path.ws.root + 'auth/');


// PAYLOAD
var payload = {
    data1: "Data 1",
    data2: "Data 2",
    data3: "Data 3",
    data4: "Data 4",
   };

   // PRIVATE and PUBLIC key
   var privateKEY  = $.fs.readFileSync(tmpAuthDir + 'private.key', 'utf8');
   var publicKEY  = $.fs.readFileSync(tmpAuthDir + 'public.key', 'utf8');
   var i  = 'Mysoft corp';          // Issuer 
   var s  = 'some@user.com';        // Subject 
   var a  = 'http://mysoftcorp.in'; // Audience
   // SIGNING OPTIONS
   var signOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  "RS256"
   };

   var token = jwt.sign(payload, privateKEY, signOptions);
console.log("Token - " + token)



// jwt.verify(req.token, "secretkey", (err, authData) => {

//     if (err) {

//       reject(err)

//     } else {

//       res.json({

//         message: "POST created...",

//         authData

//       });

//     }

//   });


                  
                var tmpRet = {success:true};
                tmpRet.token = token;



                // //--- V2
                // var tmpHash = '';
                // var tmpPassword = 'orange12';
                // var tmpHash = await bcrypt.hash(tmpPassword, saltRounds);
                // tmpRet.pw = tmpPassword;
                // tmpRet.hash = tmpHash;

                // //=== So any hash will do ... get a hash, pass it back and use it to validate
                // var tmpHash2 = "$2b$10$VC2EdeH7ensTWJRAWqrINebe6yDVFuIwdcKul6qtrjKPaOue6atOC";
                
                // var tmpRes = false;
                // var tmpRes2 = false;
                // try {
                //     tmpRes = await bcrypt.compare(tmpPassword, tmpHash);    
                //     tmpRes2 = await bcrypt.compare(tmpPassword, tmpHash2);    
                // } catch (error) {
                    
                // }
                // tmpRet.result = tmpRes;
                // tmpRet.result2 = tmpRes2;
                

                resolve(tmpRet);


                

                // var tmpAccount = await $.MongoManager.getAccount('local');
                // var tmpDB = await tmpAccount.getDatabase('actappauth');
                // var tmpDocType = 'user';
                // var tmpCollName = 'actapp-'  + tmpDocType;

                // //--- ToDo: Refactor this ...
                // var tmpAddRet = false;
                // var tmpID = tmpBody.data._id || false;
                // //--- Remove ID (even if blank) for add / edit operations
                // if( tmpBody.data.hasOwnProperty('_id')){
                //     delete tmpBody.data._id;
                // }
                // if( tmpID ){
                //     var tmpCollection = await tmpDB.getCollection(tmpCollName);
                //     var tmpUD =  { $set: tmpBody.data };
                //     tmpAddRet = await tmpCollection.updateOne({_id: new ObjectId(tmpID)}, tmpUD)

                // } else {
                //     tmpAddRet = await tmpDB.createDoc(tmpCollName, tmpBody.data);
                // }
               
               

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





