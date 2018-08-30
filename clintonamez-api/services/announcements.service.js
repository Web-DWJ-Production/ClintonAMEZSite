var path = require('path');
var util = require('util');
var database = require('../config/database');
var mongoClient = require('mongodb').MongoClient;

var flickrConfig = require("../config/flickrconfig.json");
var Flickr = require("flickrapi");

var FlickrOptions = { 
    permissions: "delete", 
    api_key: flickrConfig.token, 
    secret: flickrConfig.secret,
    access_token: flickrConfig.access_token,
    access_token_secret: flickrConfig.access_token_secret 
};

var photosetInfo = {name:"_announcements", setId:""};

/*
    Routes
    
     -- Announcements --
    Get: Get List Of Announcements
    Post: Update All Announcements
    Put: Upload Image for Individual Announcement
    Delete: Remove Individual Annoucement

*/

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
						db.find({}).toArray(function(err, res){
							if(res == null || res == undefined) { response.errorMessage = "Unable get list";}
							else { formList(res, response, function(retVal){ res.status(200).json(retVal); });}
													
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
				var aList = ("list" in req.params ? req.params.list : null);
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
	individual: {
        add: function(req,res) {
			var response = {"errorMessage":null, "results":null};

			try {								
				var newAnnouncement = ("annoncement" in req.params ? req.params.annoncement : null);			

				Flickr.authenticate(FlickrOptions, function(error, flickrAuth) {
                    var uploadOptions = { photos:[] };
                    for(var i =0; i < req.files.length; i++){
                        var tmpPhoto = { title:req.files[i].originalname, tags:[], photo:path.join(__dirname, '../upload/') +req.files[i].originalname};
                        uploadOptions.photos.push(tmpPhoto);
                    }
					// Upload New Image to Flikr
                    Flickr.upload(uploadOptions, FlickrOptions, function(err, result) {
                        if(err) {
                          console.log(error);
                        }
                        if(result.length){
							var photo_id = result[0];
							// Add to announcement image to photoset
							flickrAuth.photosets.addPhoto({api_key: flickrAuth.api_key, photoset_id:retId, photo_id: photo_id}, function(err, result){
                                res.end('File is uploaded');
                                // Delete Local File
								deleteLocalImg(req.files);
								// set photoId on announcement item
								newAnnouncement.photoId = photo_id;

								// add/update announcment to DB
								mongoClient.connect(database.remoteUrl, database.mongoOptions, function(err, client){
									if(err) {
										response.errorMessage = err;
										callback(response);
									}
									else {  
										const db = client.db(database.dbName).collection('announcements');
																				
										if(!newAnnouncement._id){
											// create new announcement
											db.insert(buildItems(newAnnouncement));
											response.results = true;
										}
										else {
											// update announcement by Id
											db.update({ _id: newAnnouncement._id }, buildItems(newAnnouncement));
											response.results = true;
										}										
									}
									res.status(200).json(response);
								});								
                            });
						}
					});
				});
			}
			catch(ex){
				response.errorMessage = "Error adding announcement: " + ex;                
                res.status(400).json(response);
			}
		},
        delete: function(req, res){
			var response = {"errorMessage":null, "results":null};
			try {
				var removeAnnouncement = ("annoncement" in req.params ? req.params.annoncement : null);
				var removePhotoId = removeAnnouncement.photoId;
				
				mongoClient.connect(database.remoteUrl, database.mongoOptions, function(err, client){
					if(err) {
						response.errorMessage = err;
						callback(response);
					}
					else {  
						// delete item from DB
						const db = client.db(database.dbName).collection('announcements');
						db.remove({ _id: removeAnnouncement._id });
						
						// delete image from Flickr
						Flickr.authenticate(FlickrOptions, function(error, flickrAuth) { 
							flickrAuth.photos.delete({api_key: flickrAuth.api_key, photo_id: removePhotoId}, function(err, result){
								response.results = true;
								res.status(200).json(response);
							});
						});
					}					
				});	
			}
			catch(ex){
				response.errorMessage = "Error removing image: "+ex;
				res.status(400).json(response);
			}
		}
    }
};


module.exports = announcements;

/* Private Functions */
function getImgUrl(imgObj){
    var url = "";

    try{
        var photoId = (imgObj.primary == undefined ? imgObj.id : imgObj.primary);
        //url = util.format("http://c1.staticflickr.com/%s/%s/%s_%s_b.jpg", imgObj.farm, imgObj.server, photoId, imgObj.secret);
        url = util.format("https://farm%s.staticflickr.com/%s/%s_%s_z.jpg", imgObj.farm, imgObj.server, photoId, imgObj.secret);
    }
    catch(ex){
        console.log("Error Processing Img: ", ex);
    }
    return url;
}

// Build Announcement list with image URLS
function formList(list, response, callback){
	var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=%s&photoset_id=%s&user_id=%s&format=json&nojsoncallback=1";
    var apiUrl = util.format(url, flickrConfig.token, photosetInfo.setId, flickrConfig.userId);
	var imgDictionary = {};

	try {			
			
		// Get _announcement Image List
		request.get({ url: apiUrl, json: true}, function (err, resp, body){
            if(!err && resp.statusCode === 200){
                var ret = [];
                try {
                    if(body.photoset != undefined){
                        for(var i =0; i < body.photoset.photo.length; i++){
							var imgObj = body.photoset.photo[i];
							var photoId = (imgObj.primary == undefined ? imgObj.id : imgObj.primary);
                            imgDictionary[photoId] = getImgUrl(imgObj);
                        }
                    }

					// Pair Image URL with Announcement By Id
					for(var j=0; j <list.length; j++){
						if(list[j].photoId in imgDictionary){
							list[j].imgUrl = imgDictionary[list[j].photoId];
						}
					}

					response.results = list;
					callback(response);
                }
                catch(ex){
                    response.errorMessage = "Error Building Annoucement List[0]: " + ex;
					callback(response);
                }
            }
            else {
                response.errorMessage = "Error Building Annoucement List[1]: " + err;
				callback(response);
            }
        });
	}
	catch(ex2){
		response.errorMessage = "Error Building Annoucement List[2]: " + ex2;
		callback(response);
	}
}

// Update List of Announcements
function updateList(list, loc, callback){
	try {
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
					db.update({ _id: list[loc]._id }, buildItems(list[loc]));
					updateList(list, loc+1,callback);
				}
			});
		}
	}
	catch(ex){
		console.log("Error updating list: ", ex);
	}
}

function buildItems(item){
	try {
		var newItem = { type: item.type, title: item.title, order: item.order, lines: item.lines, photoId: item.photoId};
		return newItem;
	}
	catch(ex){
		console.log("buildItem Error: ", ex);
	}
}

/* Delete Local Img */
function deleteLocalImg(locList){
    try {
        for(var i =0; i < locList.length; i++){
            var loc = locList[i].destination + locList[i].originalname;
            fs.unlinkSync(loc);
        }
    }
    catch(ex){
        console.log("Error deleting Local Img: ", ex);
    }
}