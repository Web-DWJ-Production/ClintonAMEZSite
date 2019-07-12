var path = require('path');
var util = require('util');
var request = require('request');
var Flickr = require("flickrapi");


require('dotenv').config();
var flickrConfig = {
	token:process.env.FLICKR_TOKEN,
    secret:process.env.FLICKR_SECRET,
    userId:process.env.FLICKR_USERID,
    access_token:process.env.FLICKR_ACCESS_TOKEN,
    access_token_secret:process.env.FLICKR_ACCESS_TOKEN_SECRET
}

var database = {
    remoteUrl: process.env.REMOTEURL,
    dbName: process.env.DBNAME,
    mongoOptions: { connectTimeoutMS: 2000, socketTimeoutMS: 2000}
}
var mongoClient = require('mongodb').MongoClient;

var activeStatus = false;

var apiUrl = {
    event: {
        "url":"https://api.teamup.com/",
        "key":process.env.EVENT_KEY,
        "token":process.env.EVENT_TOKEN
    },
    flickrOptions: { 
        permissions: "write", 
        api_key: flickrConfig.token, 
        secret: flickrConfig.secret,
        access_token: flickrConfig.access_token,
        access_token_secret: flickrConfig.access_token_secret 
     }
}

var data = {
    getAnnouncements:function(req,res){ 
        var response = {"errorMessage":null, "results":null};

        try {
            mongoClient.connect(database.remoteUrl, database.mongoOptions, function(err, client){
                if(err) {
                    response.errorMessage = err;
                    res.status(200).json(response);
                }
                else {
                    const db = client.db(database.dbName).collection('announcements');
                    db.find({}, {useNewUrlParser: true}).sort( { order: 1 } ).toArray(function(err, dbres){
                        
                        if(dbres == null || dbres == undefined) { 
                            response.errorMessage = "Unable get list";
                        }
						else {
                            var list = [];
                            dbres.forEach(function(item){
                                if(item.mediaArray != null) {
                                    item.media = item.mediaArray.join("");
                                    item.mediaArray = null;
                                }
                                list.push(item);
                            });
                            response.results = list;
                        }
                        res.status(200).json(response);
                    });
                }
            });
        }
        catch(ex){
            response.errorMessage = "[Error]: Error getting announcements: "+ex;
            console.log(response.errorMessage);
            res.status(200).json(response);
        }
    },
    getEvents:function(req,res){ 
        var response = {"errorMessage":null, "results":null};

        try {
            var startDt = req.body.startDt;
            var endDt = req.body.endDt;

            getEventsByRange(startDt, endDt, function(ret) { res.status(200).json(ret); });
        }
        catch(ex){
            response.errorMessage = "[Error]: Error getting events: "+ex;
            console.log(response.errorMessage);
            res.status(200).json(response);
        }
    },
    getAllMinistries:function(req,res){ 
        var response = {"errorMessage":null, "results":null};

        try {
            getTree(function(ret) { res.status(200).json(ret); });
        }
        catch(ex){
            response.errorMessage = "[Error]: Error getting all ministries: "+ex;
            console.log(response.errorMessage);
            res.status(200).json(response);
        }
    },
    getSpotlightMinistries:function(req,res){ 
        var response = {"errorMessage":null, "results":null};

        try {
            getSpotlightTree(function(ret) { res.status(200).json(ret); });
        }
        catch(ex){
            response.errorMessage = "[Error]: Error getting all ministries: "+ex;
            console.log(response.errorMessage);
            res.status(200).json(response);
        }
    },
    getIndMinistry:function(req,res){
        var response = {"errorMessage":null, "results":null};

        try {
            var mId = ("ministryId" in req.body ? req.body.ministryId : null);

            getIndividual(mId, function(ret) { res.status(200).json(ret); });
        }
        catch(ex){
            response.errorMessage = "[Error]: Error getting individual ministries: "+ex;
            console.log(response.errorMessage);
            res.status(200).json(response);
        }
     },
    getGalleries:function(req,res){ 
        var response = {"errorMessage":null, "results":null};

        try {
            var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=%s&user_id=%s&format=json&nojsoncallback=1";
            var apiUrl = util.format(url, flickrConfig.token, flickrConfig.userId);

            request.get({ url: apiUrl, json: true}, function (err, resp, body){
                if(!err && resp.statusCode === 200){
                    var ret = [];
                    for(var i =0; i < body.photosets.photoset.length; i++){
                        var tmp = getSetInfo(body.photosets.photoset[i]);

                        if(tmp != "" && !tmp.title.startsWith("_")) { ret.push(tmp);}
                    }

                    response.results = ret;
                    res.status(200).json(response);
                }
                else {
                    console.error(err);  
                    response.errorMessage = err;                  
                    res.status(400).json(response);
                }
            });
        }
        catch(ex){
            response.errorMessage = "[Error]: Error getting galleries: "+ex;
            console.log(response.errorMessage);
            res.status(200).json(response);
        }
    },
    getIndGallery:function(req,res){ 
        var response = {"errorMessage":null, "results":null};

        try {
            var setId = ("setId" in req.body ? req.body.setId : null);

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
                        response.results = ret;
                    }
                    catch(ex){
                        console.log("Error building Img list: ", ex);
                    }
                    res.status(200).json(response);
                }
                else {
                    console.error(err);
                    response.errorMessage = err;
                    res.status(400).json(response);
                }
            });
        }
        catch(ex){
            response.errorMessage = "[Error]: Error getting galleries: "+ex;
            console.log(response.errorMessage);
            res.status(200).json(response);
        }
    }
};

module.exports = data;

/* Private Methods */
/* Get Events By Range */
function getEventsByRange(startDt, endDt, callback){
    var response = {"errorMessage":null, "results":null};

    try {
        var sdt = getDateFormat(startDt);
        var edt = getDateFormat(endDt);

        if(sdt != null && edt != null){

            var url = apiUrl.event.url + apiUrl.event.key + "/events?startDate="+sdt+"&endDate="+edt;

            request({ url: url, json: true, headers: { 'Teamup-Token': apiUrl.event.token }}, function (error, res, body){
                if(!error && res.statusCode === 200){
                    response.results = (body && body.events? body.events : []);                                
                    callback(response);
                }
            });
        }
    }
    catch(ex){
        console.log("error getting events by range: ", ex);
        response.errorMessage = "Error Getting Events Range";
        callback(response);
    }    
}

/* Get Date Format */
function getDateFormat(date){
    var ret = null;

    try {
        var d = new Date(date);
        ret = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    }
    catch(ex){
        console.log("Error Getting Date Format: ", ex);
    }
    return ret;
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

                db.find({active: activeStatus},{ projection:{_id:0, title: 1, section:1, subSections:1,logo:1}}).toArray(function(err, res){
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

/* Get Tree Ministry List */
function getSpotlightTree(callback){
    var response = {"errorMessage":null, "results":null};

    try {
        mongoClient.connect(database.remoteUrl, database.mongoOptions, function(err, client){
            if(err) {
                response.errorMessage = err;
                callback(response);
            }
            else {  
                const db = client.db(database.dbName).collection('ministries');

                db.find({spotlight:true, active: activeStatus}, { projection:{_id:0, title: 1, section:1, subSections:1,logo:1}})
                .toArray(function(err, res){
                    if(res == null || res == undefined) { response.errorMessage = "Unable get list";}
                    else { response.results = res;}

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
                ret[list[i].section] = {"sectionTitle":list[i].section, "list":[]};
            }
            ret[list[i].section].list.push(list[i]);
        }
    }
    catch(ex){
        console.log("Error Building Tree: ",ex);
    }
    var retVal = (!ret ? {} : Object.values(ret).sort(function(a,b){ return a.list.length < b.list.length; }));
    return retVal;
}

/* Get Individual Ministry */
function getIndividual(mId, callback){
    var response = {"errorMessage":null, "results":null};

    try {
        mId = mId.toLowerCase();
        mongoClient.connect(database.remoteUrl, database.mongoOptions, function(err, client){
            if(err) {
                response.errorMessage = err;
                callback(response);
            }
            else {  
                const db = client.db(database.dbName).collection('ministries');

                db.find({'titleId': mId, active: activeStatus}).toArray(function(err, res){
                    if(!res || res.length == 0) { 
                        response.errorMessage = "Unable to find id";
                        callback(response);
                    }
                    else { 
                        response.results = res[0];                    
                    
                        var siblingSearch = (response.results.subSections.length > 0 ? response.results.subSections[response.results.subSections.length - 1] : response.results.title);
                        if(response.results.subSections.length >= 0){}

                        db.find({ $or: [{'subSections': siblingSearch, 'titleId':{$ne: mId}, active: activeStatus}, {'title': siblingSearch, active: activeStatus}]}).toArray(function(err,res){
                            response.results.siblings = (res && res.length > 1 ? res : []);
                            callback(response);
                        });
                    }
                });
            }
        });
    }
    catch(ex){
        response.errorMessage = "Error getting Individuals: " + ex;
        callback(response);
    }
}

/* Get Photoset info */
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

/* Get Img URL */
function getImgUrl(imgObj){
    var url = "";

    try{
        var photoId = (imgObj.primary == undefined ? imgObj.id : imgObj.primary);
        url = util.format("https://farm%s.staticflickr.com/%s/%s_%s_z.jpg", imgObj.farm, imgObj.server, photoId, imgObj.secret);
    }
    catch(ex){
        console.log("Error Processing Img: ", ex);
    }
    return url;
}