var path = require('path');
var util = require('util');
var database = require('../config/database');
var mongoClient = require('mongodb').MongoClient;

var response = {"errorMessage":null, "results":null};

var data = {
    getAnnouncements:function(req,ret){ 
        try {
            mongoClient.connect(database.remoteUrl, database.mongoOptions, function(err, client){
                if(err) {
                    response.errorMessage = err;
                    res.status(200).json(response);
                }
                else {
                    db.find({}, {useNewUrlParser: true}).sort( { order: 1 } ).toArray(function(err, dbres){

                    });
                }
            });
        }
        catch(ex){
            console.log(" [Error]: Error getting announcements: ",ex);
        }
    },
    getEvents:function(req,ret){ 
        try {

        }
        catch(ex){
            console.log(" [Error]: Error getting events: ",ex);
        }
    },
    getAllMinistries:function(req,ret){ 
        try {

        }
        catch(ex){
            console.log(" [Error]: Error getting all ministries: ",ex);
        }
    },
    getIndMinistry:function(req,ret){
        try {

        }
        catch(ex){
            console.log(" [Error]: Error getting individual ministry: ",ex);
        }
     },
    getGalleries:function(req,ret){ 
        try {

        }
        catch(ex){
            console.log(" [Error]: Error getting galleries: ",ex);
        }
    }
};

module.exports = data;