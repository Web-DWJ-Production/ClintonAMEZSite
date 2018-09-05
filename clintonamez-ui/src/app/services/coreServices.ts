import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserInfoModel } from '../datamodels/userInfoModel';
import { AnnouncementModel } from '../datamodels/announcementModel';
import { LineTypeModel } from '../datamodels/lineTypeModel';
import { MinistryModel } from '../datamodels/ministryModel';
import { EventsModel } from '../datamodels/eventsModel';
import { GalleryModel } from '../datamodels/galleryModel';
import { BibleStudyModel } from '../datamodels/bibleStudyModel';

import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent } from 'angular-calendar';

const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')
};

const fileHttpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'multipart/form-data; charset=utf-8')
};

@Injectable()
export class CoreService {
    public userKey: string = "clintonEditorUser";
    //urlBase: string = 'http://localhost:5000/api';
    urlBase: string = '/api';

   
    constructor(private http: HttpClient) { }
    
    public features = {        
        "announcements": { "navItem":'fa-bullhorn'},
        "forms": { "navItem":'fa-clipboard'},
        "calender": { "navItem":'fa-calendar-alt'},
        "gallery": { "navItem":'fa-images'},
        "ministries": { "navItem":'fa-child'}
    };

    public tmpEvents = {
        "General Body":[{
          start: subDays(startOfDay(new Date()), 1),
          end: addDays(new Date(), 1),
          title: 'A 3 day event',
          color: { primary: '#ad2121', secondary: '#FAE3E3' }
        },
        {
          start: startOfDay(new Date()),
          title: 'An event with no end date',
          color: { primary: '#ad2121', secondary: '#FAE3E3' }
        }],
        "Administrators":[{
          start: subDays(endOfMonth(new Date()), 3),
          end: addDays(endOfMonth(new Date()), 3),
          title: 'A long event that spans 2 months',
          color: { primary: '#1e90ff', secondary: '#D1E8FF' }
        },
        {
          start: addHours(startOfDay(new Date()), 2),
          end: new Date(),
          title: 'A draggable and resizable event',
          color: { primary: '#1e90ff', secondary: '#D1E8FF' }     
        }]
    };

    getFeatureList(){
        return this.features;
    }

    getEvents(filterList:string[], callback){
        var retList: CalendarEvent[] = [];

        for(var i=0; i < filterList.length; i++){            
            if(filterList[i] in this.tmpEvents){
                retList = retList.concat(this.tmpEvents[filterList[i]]);
            }
        }        
        callback({"errorMessage":null,"results":retList});
    }

    getAnnouncements(callback){
        var vidAnnouncement: AnnouncementModel=  new AnnouncementModel(5,"assets/images/tmpMedia/tmpVideo.mp4", "full-video",null, null);
        vidAnnouncement.defaultMedia = "assets/images/tmpMedia/tmpVide_mini.JPG";

        var tmpList1: LineTypeModel[] = [
            new LineTypeModel("We are marking our 150th year as a continuing congregation.", "h1", true),
            new LineTypeModel("Our vision is to affect a completely transformed community of faith, worthy of citizenship in the Kingdom of God, by the power of God through His Son Jesus Christ. Our mission is to produce ministries that will serve the CAUSE of Christ through the spiritual transformation of minds, bodies and spirits.", "p", false),
            new LineTypeModel("Sunday morning worship services begin at 10:00 AM.  Visitors, we encourage you to be sure to explore our 'Galleries' tab.", "p", true)
        ];
        var tmpList2: LineTypeModel[] = [
            new LineTypeModel("Uplifting and Informative", "h2",true),
            new LineTypeModel("Music, Wellness,Special Events and Outreach Ministries", "h2",true),
            
            new LineTypeModel("Spiritual Insights", "h2",true),
            new LineTypeModel("Dynamic monthly 1st Friday Dinner and Seminar", "h2",true),

            new LineTypeModel("Engaging Youth and Children Ministries", "h2",true),
            new LineTypeModel("Including Children’s Church", "h2",true),
        ];
        var tmpList3: LineTypeModel[] = [
            new LineTypeModel("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "p", false),
            new LineTypeModel("Date: February 18, 2018", "p",true),
            new LineTypeModel("Time: 2pm", "p",true)
        ];

        var retList: AnnouncementModel[] = [
            //vidAnnouncement,           
            new AnnouncementModel(0,"assets/images/tmpMedia/pastor1.jpg","card-img", "Welcome", tmpList1),
            new AnnouncementModel(1,"assets/images/tmpMedia/Clinton_2012.jpg","card-img", "Clinton For Your Spirit, Mind and Body", tmpList2),
            new AnnouncementModel(2,"assets/images/tmpMedia/Homecoming-Flyer.png","card-img", "New Event", tmpList3)
        ];

        callback({"errorMessage":null,"results":retList});
    }

    getTmpEvents(callback){
        var tmpEvents: EventsModel[] = [
            new EventsModel("Leadership Meeting", addDays(new Date(), 3), {address:"223 Elizabeth Ave, Rockville, MD. 20850", lat: 39.0959446, lng: -77.1504001}),
            new EventsModel("Test Event 2", addDays(new Date(), 7), {address:"13501 Richter Farm Rd, Germantown, MD. 20874", lat: 39.1517872, lng: -77.2818221}),
            new EventsModel("Test Event 3", addDays(new Date(), 14), {address:"223 Elizabeth Ave, Rockville, MD. 20850", lat: 39.0959446, lng: -77.1504001}),
            new EventsModel("Leadership Meeting 2", addDays(new Date(), 15), {address:"223 Elizabeth Ave, Rockville, MD. 20850", lat: 39.0959446, lng: -77.1504001}),
            new EventsModel("Leadership Meeting 3", addDays(new Date(), 20), {address:"223 Elizabeth Ave, Rockville, MD. 20850", lat: 39.0959446, lng: -77.1504001})
        ];
        callback({"errorMessage":null,"results":tmpEvents});
    }
    getTmpMinistry(id,callback){
        var tmpMinistry = {
            "section":"Administration & Stewardship", 
            "title":"Event Planning & Management", 
            "defaultMedia":"assets/images/tmpMedia/c1.jpg",
            "logo":"", 
            "subSections":["Admin & Tech"],
            "mission":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "populationsServed":"population1",
            "activities":[{"name":"Test Activity 1", "description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},{"name":"Test Activity 2", "description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},
            {"name":"Test Activity 3", "description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},{"name":"Test Activity 4", "description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},
            {"name":"Test Activity 5", "description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."},{"name":"Test Activity 6", "description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}],
            "leadership":[{"name": "John Test", "title":"President", "email": "J.Test@testmail.com"}, {"name": "Wilma Test", "title":"Vice-President", "email": "W.Test@testmail.com"}],
            "images":[
                "https://farm1.staticflickr.com/899/42000886905_61f66ed1ea_z.jpg",
                "https://farm2.staticflickr.com/1802/42000886335_1ba1c46904_z.jpg",
                "https://farm2.staticflickr.com/1763/42000885735_dd0675dae2_z.jpg",
                "https://farm2.staticflickr.com/1810/42000885635_0e0db29f47_z.jpg",
                "https://farm1.staticflickr.com/895/42000885415_f6d87fc13f_z.jpg",
                "https://farm2.staticflickr.com/1827/42000885265_f093b2a334_z.jpg",
                "https://farm2.staticflickr.com/1768/42000884985_3e05056de6_z.jpg",
                "https://farm2.staticflickr.com/1804/42000884745_35de1be7cb_z.jpg",
                "https://farm1.staticflickr.com/888/42000884565_9dc77f2800_z.jpg",
                "https://farm2.staticflickr.com/1789/42000884505_db2365b0a5_z.jpg"
            ],
            "siblings": [
                    {"section":"Administration & Stewardship", "title":"Trustee Board", "defaultMedia":"assets/images/tmpMedia/c1.jpg","logo":"", "subSections":[]},
                    {"section":"Administration & Stewardship", "title":"Steward Board", "defaultMedia":"assets/images/tmpMedia/c1.jpg","logo":"", "subSections":[]},
                    {"section":"Administration & Stewardship", "title":"Budget and Finance", "defaultMedia":"assets/images/tmpMedia/c1.jpg","logo":"", "subSections":[]},
                    {"section":"Administration & Stewardship", "title":"Calendar and Scheduling", "defaultMedia":"assets/images/tmpMedia/c1.jpg","logo":"", "subSections":["Admin & Tech"]}
                ]
        };
        callback({"errorMessage":null, "results":tmpMinistry});
    }

    getTmpBibleStudy(callback){
        let tmpData = [
            new BibleStudyModel('05-24-2018','Test-7',''),
            new BibleStudyModel('06-12-2018','Test-8',''),
            new BibleStudyModel('07-08-2018','Test-9',''),
            new BibleStudyModel('07-23-2018','Test-10','')
        ];

        callback({"errorMessage":null, "results":tmpData});
    }
    getMinistries(mId){
        mId = (!mId ? "all" : mId);
        return this.http.get<{"errorMessage":string, "results":any}>(this.urlBase+'/ministry/'+mId);
    }

    getGalleryList(){
        return this.http.get<GalleryModel[]>(this.urlBase+'/mediaSet');
    }

    getGallery(photosetId){
        let body = JSON.stringify({setId:photosetId});

        return this.http.get(this.urlBase+'/media'+'/'+photosetId);
    }
    sendEmail(form){
        return this.http.post(this.urlBase+'/mail', form, httpOptions);
    }

    /* CMS */
    getUploadUrl(type){  
        var retUrl = this.urlBase;
        switch(type){
            case "media":
                retUrl += '/media';
                break;
            case "announcements":
                retUrl += '/announcements';
                break;
            default:
                break;
        }     

        return retUrl;
    }
}
