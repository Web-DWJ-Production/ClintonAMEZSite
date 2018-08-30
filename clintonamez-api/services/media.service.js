'use strict';

var path = require('path');
var util = require('util');
var fs = require('fs');
var request = require('request');

var flickrConfig = require("../config/flickrconfig.json");
var Flickr = require("flickrapi");

var FlickrOptions = { 
    permissions: "write", 
    api_key: flickrConfig.token, 
    secret: flickrConfig.secret,
    access_token: flickrConfig.access_token,
    access_token_secret: flickrConfig.access_token_secret 
 };

var configFile = '../config/gallerycache.json';
var DIR = './upload/';


/*
    Routes
    
     -- Individual Photoset --
    Get: All Photos in Set
    Post: Add Photo to Set
    Put: Set Primary Photo
    Delete: Remove Photo From Set

     -- All Photo Sets --
     x Get: All Photosets
    Post: Create Photoset with Images
    Delete: Remove Photoset

*/

var media = {
    photo: {
        getPhotos: function(req, res){
            var setId = ("setId" in req.params ? req.params.setId : null);

            var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=%s&photoset_id=%s&user_id=%s&format=json&nojsoncallback=1";
            var apiUrl = util.format(url, flickrConfig.token, setId, flickrConfig.userId);

            request.get({ url: apiUrl, json: true}, function (err, resp, body){
                if(!err && resp.statusCode === 200){
                    var ret = [];
                    try {
                        if(body.photoset != undefined){
                            for(var i =0; i < body.photoset.photo.length; i++){
                                var tmp = getImgUrl(body.photoset.photo[i]);

                                if(tmp != {}) { ret.push(tmp);}
                            }
                        }
                    }
                    catch(ex){
                        console.log("Error building Img list: ", ex);
                    }
                    res.status(200).json(ret);
                }
                else {
                    console.error(err);
                    res.status(400).json(ret);
                }
            });
        }
    },
    photoset: {
        getAllSets: function(req, res){
            var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=%s&user_id=%s&format=json&nojsoncallback=1";
            var apiUrl = util.format(url, flickrConfig.token, flickrConfig.userId);

            request.get({ url: apiUrl, json: true}, function (err, resp, body){
                if(!err && resp.statusCode === 200){
                    var ret = [];
                    for(var i =0; i < body.photosets.photoset.length; i++){
                        var tmp = getSetInfo(body.photosets.photoset[i]);

                        if(tmp != "") { ret.push(tmp);}
                    }
                    
                    res.status(200).json(ret);
                }
                else {
                    console.error(err);                    
                    res.status(400).json(ret);
                }
            });
        },
        getSetId: function(req, res){
            var setname = req.body.setname;

            try {
                checkSets(setname, false, function(ret){ 
                    res.status(200).json({"setId":ret, "token":flickrConfig.token, "userId":flickrConfig.userId, "secret":flickrConfig.secret});
                });
            }
            catch(ex){
                res.status(400).json({"errorMessage":"error setting id: "+ ex});
            }
        },
        uploadPhotos: function(req,res){
            var self = this;
            try {
                //var name = "_announcements";
                var name = (req.body.name ? req.body.name : null);
                var createNew = (req.body.createNew ? req.body.createNew : false);

                req.files = updateFileNames(req.files);

                Flickr.authenticate(FlickrOptions, function(error, flickrAuth) {
                    var uploadOptions = { photos:[] };
                    for(var i =0; i < req.files.length; i++){
                        var tmpPhoto = { title:req.files[i].originalname, tags:[], photo:path.join(__dirname, '../upload/') +req.files[i].originalname};
                        uploadOptions.photos.push(tmpPhoto);
                    }
                    // Upload File to Flikr
                    Flickr.upload(uploadOptions, FlickrOptions, function(err, result) {
                        if(err) {
                          console.log(error);
                        }
                        if(result.length){
                            var photo_id = result[0];
                            // Get Flickr Folder Set ID
                            checkSets(name, createNew, false, function(retId){
                                // Move File to Flikr Folder
                                if(retId){
                                    if(createNew && retId == -22){
                                        flickrAuth.photosets.create({api_key: flickrAuth.api_key, title: name, primary_photo_id: photo_id}, function(err, result){
                                            res.end('File is uploaded');
                                            // Delete Local file
                                            deleteLocalImg(req.files);
                                        });
                                    }
                                    else {
                                        flickrAuth.photosets.addPhoto({api_key: flickrAuth.api_key, photoset_id:retId, photo_id: photo_id}, function(err, result){
                                            res.end('File is uploaded');
                                            // Delete Local File
                                            deleteLocalImg(req.files);
                                        });
                                    }
                                }
                                else {
                                    res.end('File is uploaded');
                                    // Delete Local File
                                    deleteLocalImg(req.files);
                                }
                            });
                        } 
                        else {
                            res.status(200).json(false);
                        }                       
                    });
                });                
            }
            catch(ex){
                console.log("Error Uploading File: ", ex);
                res.status(200).json(false);
            }
        }
    }
};
/* Delete Local File */
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
/* Update file name for loading */
function updateFileNames(fileList){
    try {
        if(fileList){
            for(var i=0; i < fileList.length; i++){
                var oldPath = DIR + fileList[i].filename;
                var newPath = DIR + fileList[i].originalname;
                fs.renameSync(oldPath, newPath);
            }
        }
    }
    catch(ex){
        console.log("error updating name: ",ex);
    }
    return fileList;
}
function returnUploadResults(total, results, name, value, callback){
    results[name] = value;
    var length = Object.keys(results).length;

    if(length == total){
        callback(results);        
    }
}

function checkSets(name, createNew, run, callback){
    try {
        var obj = JSON.parse(fs.readFileSync(configFile, 'utf8'));

        if(name in obj){
            // return value
            callback(obj[name]);
        }
        else if(!run){
            // get data from flickr
            var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=%s&user_id=%s&format=json&nojsoncallback=1";
            var apiUrl = util.format(url, flickrConfig.token, flickrConfig.userId);
            request.get({ url: apiUrl, json: true}, function (err, resp, body){
                if(!err && resp.statusCode === 200){
                    var tmpList = {};
                    for(var i =0; i < body.photosets.photoset.length; i++){
                        tmpList[body.photosets.photoset[i].title._content] = body.photosets.photoset[i].id;
                    }
                    
                    fs.writeFileSync(configFile, JSON.stringify(tmpList), 'utf8');
                }
                checkSets(name, createNew, true, callback);
            });
        }
        else {
            
            if(createNew){
                // Return ID (-22): create set, add to config file, return ID
                callback(-22);
            }
            else {
                callback(null);
            }
        }
    }
    catch(ex){
        console.log("Error checking Image set: ", ex);
        callback(null);
    }
}

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

function getSetInfo(obj){
    var ret = {};

    try{
        ret.title = obj.title._content;
        ret.totalImgs = obj.photos;
        ret.setId = obj.id;
        ret.previewImg = getImgUrl(obj);
    }
    catch(ex){
        console.log("Error Processing Set Info: ", ex);
    }
    return ret;
}

module.exports = media;