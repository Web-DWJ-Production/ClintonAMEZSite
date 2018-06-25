var path = require('path');
var util = require('util');
var request = require('request');

var flickrConfig = {
    token:"8fbb27fc0ec755b0591ab7e5a4b02be8",
    secret:"20fb55a36bdcf198",
    userId:"140987161@N03"
};
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
            var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=%s&photoset_id=%s&user_id=%s&format=json&nojsoncallback=1";
            var apiUrl = util.format(url, flickrConfig.token, req.body.setId, flickrConfig.userId);

            request.get({ url: apiUrl, json: true}, function (err, resp, body){
                if(!err && resp.statusCode === 200){
                    var ret = [];
                    try {
                        for(var i =0; i < body.photoset.photo.length; i++){
                            var tmp = getImgUrl(body.photoset.photo[i]);

                            if(tmp != {}) { ret.push(tmp);}
                        }
                    }
                    catch(ex){
                        console.log("Error building Img list: ", ex);
                    }
                    // For Dev
                    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
                    res.status(200).json(ret);
                }
                else {
                    console.error(err);
                    // For Dev
                    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
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

                        if(tmp != {}) { ret.push(tmp);}
                    }

                    // For Dev
                    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
                    res.status(200).json(ret);
                }
                else {
                    console.error(err);
                    
                    // For Dev
                    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
                    res.status(400).json(ret);
                }
            });
        }
    }
};

function getImgUrl(imgObj){
    var url = "";

    try{
        url = util.format("http://c1.staticflickr.com/%s/%s/%s_%s_b.jpg", imgObj.farm, imgObj.server, imgObj.primary, imgObj.secret);
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