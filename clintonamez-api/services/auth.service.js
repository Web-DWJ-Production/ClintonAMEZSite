var path = require('path');
var util = require('util');
var bcrypt = require('bcrypt');
var database = require('../config/database');
var mongoClient = require('mongodb').MongoClient;

const saltRounds = 15;
/*
    Routes

    -- Individual User --
    Put: Authenticate Email & UserId
    Post: Login User w/ Password
    Put: Email Temp Password

    -- Admin Controls --
    Get: Get All Users
    Post: Update User
    Put: Add User
    Delete: Remove User
*/

var auth = {
    individual: {
        basicAuthenticate: function(req, res){
            var response = {"errorMessage":null, "results":null};
            try {
                var email = ("email" in req.params ? req.params.email : null);
                var userId = ("userId" in req.params ? req.params.userId : null);

                if(!email || !userId){
                    response.errorMessage = "Email or UserId is undefined";
                    res.status(400).json(response);
                }
                else {
                    getUser(email, function(res){
                        if(!res || res.length == 0){
                            response.errorMessage = "Unable to find user: "+email;
                            res.status(400).json(response);
                        }
                        else {
                            if(res.length > 1){
                                response.errorMessage = "Multiple Users with the email address: "+email;
                                response.results = "error";
                            }
                            else if(res[0]._id != userId){
                                response.errorMessage = "UserId doesn't match";
                                response.results = "error";
                            }
                            else{
                                response.results = "success";
                            }

                            res.status(200).json(response);
                        }
                    });
                }
            }
            catch(ex){
                console.log("Error getting User by Id: ",ex);
                response.errorMessage = ex;
                res.status(400).json(response);
            }
        },
        loginUser: function(req, res){
            var response = {"errorMessage":null, "results":null};
            try {
                var email = (!req.body.email ? null : req.body.email);
                var password = (!req.body.password ? null : req.body.password);
                if(!email){
                    response.errorMessage = "Email is undefined";
                    res.status(400).json(response);
                }
                else {
                    getUser(email, function(res){
                        if(!res || res.length == 0){
                            response.errorMessage = "Unable to find user: "+email;
                            res.status(400).json(response);
                        }
                        else {
                            if(res.length > 1){
                                response.errorMessage = "Multiple Users with the email address: "+email;
                                response.results = "error";
                            }
                            else if(!bcrypt.compareSync(password, res[0].password)){
                                response.errorMessage = "Password is invalid";
                                response.results = {};
                            }
                            else{
                                response.results = res[0];
                            }
                            res.status(200).json(response);
                        }
                    });
                }
            } catch(ex){

            }
        },
        tmpPasswordReset: function(req, res){ }
    },
    admin: {
        getAllUsers: function(req, res){ },
        updateUserById: function(req, res){ },
        addUser: function(req,res){ 
            var response = {"errorMessage":null, "results":null};

            try {
                var resBody = getUserRequest(req.body);
                if(resBody.errorMessage.length > 0){
                    response.errorMessage = "Missing the following fields: "+ resBody.errorMessage.join(", ");
                }
                else {
                    isAdmin(req.body.requester.email, req.body.requester.id, function(res){
                        if(!res){

                        }
                        else {
                            getUser(resBody.email, function(res2){
                                if(res2.length > 0) {
                                    response.errorMessage = "User Email already exists";
                                }
                                else {
                                    mongoClient.connect(database.remoteUrl, database.mongoOptions, function(err, client){
                                        if(err) {
                                            console.log("Error adding user: ", err);
                                            res.status(400).json(response);
                                        }
                                        else {  
                                            resBody.password = bcrypt.hashSync(resBody.password, saltRounds);

                                            const db = client.db(database.dbName).collection('users');
                                            db.insert(resBody);
                                            response.results = "success";
                                            
                                            res.status(200).json(response);                                            
                                        }
                                    });
                                }
                                res.status(200).json(response);
                            });
                        }
                        
                    });
                }
            }
            catch(ex){

            }
        },
        deleteUser: function(req, res){ }
    }
};

/* User is Admin */
function isAdmin(email, id, callback){
    getUser(email, function(res){
        if(!res || res.length == 0 || res.length > 1 || res[0]._id != id){
            callback(false);
        }
        else {
            callback((res[0].admin == true));
        }
    });
}
/* Get User by Email */
function getUser(email, callback) {
    var response = null;
    try {
        email = email.toLowerCase();
        mongoClient.connect(database.remoteUrl, database.mongoOptions, function(err, client){
            if(err) {
                console.log("Error getting user: ", err);
                callback(response);
            }
            else {  
                const db = client.db(database.dbName).collection('users');

                db.find({'email': email}).toArray(function(err, res){
                    if(res == null || res == undefined) { response.errorMessage = "Unable to find this user";}
                    else { response = res;}
                    callback(response);
                });
            }
        });
    }
    catch(ex){
        response.errorMessage = "Error getting user: " + ex;
        callback(response);
    }
}

/* Parse User Request from body */
function getUserRequest(body){
    var ret = {"errorMessage":[], "results":{}};
    var userValues = {"name":true, "title":false, "email":true, "password":true, "adminStatus":false, "permissions":false};
    try {
        var keys = Object.keys(userValues);
        for(var i =0; i < keys.length; i++){
            if(!body[keys[i]] && userValues[keys[i]]) {
                ret.errorMessage.push= keys[i];
            }
            else {
                ret.results[keys[i]] = body[keys[i]];
            }
        }
    }
    catch(ex){
        ret.errorMessage = "Error Processing User Request: "+ex;
    }
    return ret;
}

module.exports = auth;