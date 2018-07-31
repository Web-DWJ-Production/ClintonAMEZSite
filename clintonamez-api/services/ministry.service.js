var path = require('path');
var util = require('util');
var database = require('../config/database');
var mongoClient = require('mongodb').MongoClient;

/*
    Routes
    
     -- Ministry --
    Get: Individual or Tree
    Post: Update Individual
    Put: Add Individual
    Delete: Remove Individual

*/

var ministry = {
    all: {
        getById: function(req, res){
            var response = {"errorMessage":null, "results":null};
            try {
                var mId = ("ministryId" in req.params ? req.params.ministryId : null);

                if(mId == "all")
                {
                     getTree(function(ret) { res.status(200).json(ret); });
                } 
                else { 
                    getIndividual(mId, function(ret) { res.status(200).json(ret); });
                }
            }
            catch(ex){
                console.log("Error getting ministry by Id: ",ex);
                response.errorMessage = ex;
                res.status(400).json(response);
            }
        },
        updateById: function(req, res){
            var response = {"errorMessage":null, "results":null};
            try {

            }
            catch(ex){

            }
        },
        insertById: function(req,res) { 
            var response = {"errorMessage":null, "results":null};
            try {

            }
            catch(ex){
                
            }
        },
        deleteById: function(req, res){
            var response = {"errorMessage":null, "results":null};
            try {

            }
            catch(ex){
                
            }
        }
    }
};

/* Get Individual Ministry */
function getIndividual(mId, callback){
    var response = {"errorMessage":null, "results":null};

    try {
        mongoClient.connect(database.remoteUrl, database.mongoOptions, function(err, client){
            if(err) {
                response.errorMessage = err;
                callback(response);
            }
            else {  
                const db = client.db(database.dbName).collection('ministries');

                db.find({'title': mId}).toArray(function(err, res){
                    if(res == null || res == undefined) { response.errorMessage = "Unable to find id";}
                    else { response.results = res[0];}
                    callback(response);
                });
            }
        });
    }
    catch(ex){
        response.errorMessage = "Error getting Individuals: " + ex;
        callback(response);
    }
}

/* Get Tree Ministry List */
function getTree(callback){
    var response = {"errorMessage":null, "results":null};

    try {
        mongoClient.connect(database.remoteUrl, database.mongoOptions, function(err, client){
            if(err) {
                response.errorMessage = err;
                callback(response);
            }
            else {  
                const db = client.db(database.dbName).collection('ministries');

                db.find({},{title: 1, section:1, subSections:1,defaultMedia:1,logo:1}).toArray(function(err, res){
                    if(res == null || res == undefined) { response.errorMessage = "Unable get list";}
                    else { response.results = buildTree(res);}
                    callback(response);
                });
            }
        });
    }
    catch(ex){
        response.errorMessage = "Error getting Tree: " + ex;
        callback(response);
    }
}

function buildTree(list){
    var self = this;
    var ret = {};
    try {
        for(var i=0; i < list.length; i++){
            if(!(list[i].section in ret)){
                ret[list[i].section] = {"children":{}};
            }
            addBranches(list[i], checkRet(ret[list[i].section].children), 0);
        }
    }
    catch(ex){
        console.log("Error Building Tree: ",ex);
    }
    return ret;
}

function addBranches(item, ret, loc){
    try {
        if(item.title in ret){
            // update ret info
            ret[item.title].base = true;
            ret[item.title].subSections = item.subSections;
            ret[item.title].defaultMedia = item.defaultMedia;
            ret[item.title].logo = item.logo;
            ret[item.title].section = item.section;
            // return
            return;
        }

        if((loc+1) > item.subSections.length){
            // push to list
            ret[item.title]= item;
        }
        else if(item.subSections[loc] in ret){
            // send inside to recursive (loc+1)
            addBranches(item, checkRet(ret[item.subSections[loc]].children), (loc+1));
        }
        else {
            // add to list
            ret[item.subSections[loc]] = {"children":{}};
            // send inside to recursize (loc+1)
            addBranches(item, checkRet(ret[item.subSections[loc]].children), (loc+1));
        }
    }
    catch(ex){
        console.log("Error: ", ex);
    }
    return;
}

function checkRet(ret){
    return (!ret? {}: ret );
}

module.exports = ministry;