'use strict';

var path = require('path');
var util = require('util');
var request = require('request');

/*
    Routes
    
     -- Individual Photoset --
    Post: Get Events

*/
var apiUrl = {
    "url":"https://api.teamup.com/",
    "key":"ks3b71fcec97794663",
    "token":"2e6db0375ea2d7f6982f5255d0348f31000a230dd0f84e7a667729e1d0e37ed4"
}

var events = {
    all: {
        getEvents: function(req, res){
            var response = {"errorMessage":null, "results":null};
            try {
                var startDt = req.body.startDt;
                var endDt = req.body.endDt;

                getEventsByRange(startDt, endDt, function(ret) { res.status(200).json(ret); });
            }
            catch(ex){
                console.log("Error getting events in range: ",ex);
                response.errorMessage = ex;
                res.status(400).json(response);
            }
        }
    }
};

module.exports = events;

/* Get Individual Ministry */
function getEventsByRange(startDt, endDt, callback){
    var response = {"errorMessage":null, "results":null};

    try {
        var sdt = getDateFormat(startDt);
        var edt = getDateFormat(endDt);

        if(sdt != null && edt != null){

            var url = apiUrl.url + apiUrl.key + "/events?startDate="+sdt+"&endDate="+edt;

            request({ url: url, json: true, headers: { 'Teamup-Token': apiUrl.token }}, function (error, res, body){
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