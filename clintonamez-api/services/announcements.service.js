var path = require('path');
var util = require('util');
var database = require('../config/database');
var mongoClient = require('mongodb').MongoClient;

var announcements = {
    all: {
        getList: function(req, res){			
			var response = {"errorMessage":null, "results":null};

			try {
				mongoClient.connect(database.remoteUrl, database.mongoOptions, function(err, client){
					if(err) {
						response.errorMessage = err;
						callback(response);
					}
					else {  
						const db = client.db(database.dbName).collection('announcements');
						// Get Announcement List From DB
						db.find({}, {useNewUrlParser: true}).sort( { order: 1 } ).toArray(function(err, dbres){
							if(dbres == null || dbres == undefined) { response.errorMessage = "Unable get list";}
							else {  
                                response.results = dbres;
                                res.status(200).json(response); 
                            }													
						});
					}
				});
			}
			catch(ex){
				console.log("Error getting list: ",ex);
                response.errorMessage = ex;
                res.status(400).json(response);
			}
		},
        update: function(req, res){
			var response = {"errorMessage":null, "results":null};
			try {
				var aList = req.body.list;
				if(aList != null){
					// Update all in list
					updateList(aList, 0, function(retVal){ res.status(200).json({"status":retVal}); })
				}
				else {
					res.status(200).json({"status":false});
				}
			}
			catch(ex){
				console.log("Error getting list: ",ex);                
                res.status(400).json({"status":false});
			}
		}
	},
	individual: {}
};

module.exports = announcements;

function updateList(list, loc, callback){
	try {
		console.log(" [DEBUG]: ", list[loc]);
		if(loc >= list.length){
			callback(true);
		}
		else {
			mongoClient.connect(database.remoteUrl, database.mongoOptions, function(err, client){
				if(err) {
					response.errorMessage = err;
					callback(response);
				}
				else {  
					const db = client.db(database.dbName).collection('announcements');
					// Get Announcement List From DB
					db.update({ _id: list[loc]._id }, list[loc], {upsert: true, useNewUrlParser: true});
					updateList(list, loc+1,callback);
				}
			});
		}
	}
	catch(ex){
		console.log("Error updating list: ", ex);
	}
}