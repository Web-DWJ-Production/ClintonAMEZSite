var path = require('path');
var util = require('util');

/*
    Routes
    
     -- Individual Photoset --
    Post: Get Events

*/

var ministry = {
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
}

/* Get Individual Ministry */
function getEventsByRange(startDt, endDt, callback){
    var response = {"errorMessage":null, "results":null};

    try {

    }
    catch(ex){

    }
    callback(response);
}