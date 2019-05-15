import React, { Component } from 'react';
import Calendar from "react-big-calendar";
import moment from 'moment';
import Modal from 'react-awesome-modal';
import axios from 'axios';

import backImg from "../../assets/img/siteMedia/group5.jpg";
import pastorImg from "../../assets/img/siteMedia/pastor-mini.jpg";

const localizer = Calendar.momentLocalizer(moment);
var Month = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

class GetConnected extends Component{
    constructor(props) {
        super(props);

        //this.rootPath = "";
        this.rootPath = "http://localhost:7777";
        
        this.state = {
            modalvisible:false,
            modalevent:{},
            events: []
        }
        this.parseDate = this.parseDate.bind(this);
    } 

    parseDate(stdate, type){
        var ret = null;
        try {
            var date = new Date(stdate);
            switch(type){
                case "day":
                    ret = (date.getDate() < 10 ? "0"+date.getDate() : date.getDate());
                    break;
                case "month":                    
                    ret = Month[date.getMonth()];
                    break;
                case "year":
                    ret = date.getFullYear();
                    break;
                case "time":
                    ret = ((date.getHours() +1 > 12) ? (date.getHours()+1) -12 : (date.getHours()+1)) +":"
                    + ((date.getMinutes() < 10) ? "0"+ date.getMinutes() : date.getMinutes())
                    + ((date.getHours() +1 > 12) ? " PM" : " AM");
                    break;
                case "date":
                    ret = Month[date.getMonth()] + " " + date.getDate() + " ";
                    break;
                default:
                    ret = null;
                    break;
            }
        }
        catch(ex){
            console.log("Error parsing date: ", ex);
        }
        return ret;
    }

    openModal(event) {  this.setState({ modalvisible : true, modalevent:event });  }
    closeModal() { this.setState({ modalvisible : false }); }

    render(){        
        return(
            <div className="site-page get-connected">
                <section className="title-card">
                    <h1 className="font-title1">Get Connected</h1>
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                        <img src={backImg} alt="get connected img"/>
                    </div>
                </section>

                <section className="body-section prayerCall notched-top">
                    <div className="callCard">
                        <div className="call-info">
                            <div className="pastor-img"><img src={pastorImg} alt="pastor img"/></div>
                            <div className="pastor-name"><div className="name">Rev. Alyce R. Walker Johnson</div> <div className="title">Pastor</div></div>
                            <div className="info-section">
                                <p>Clinton African Methodist Episcopal Zion Church</p>
                                <p>223 Elizabeth Avenue</p>
                                <p>Rockville, MD. 20850</p>
                            </div>
                        </div>

                        <div className="call-content">
                            <h1>Clinton A.M.E. Zion Church</h1>
                            <p>Join Us For</p>
                            <h2>Mid-Week Prayer</h2>

                            <p>Wednesdays @ 7:00 a.m.</p>
                            <p>Dial In: (712) 770-8064</p>
                            <p>Passcode: 757837#</p>

                            <p className="info">Don't worry about anything; instead, pray about everything.  
                                Tell God what you need, and thank him for all he has done. Then you will 
                            experiance God's peace, which exceeds anything we can understand.  His peace will guard
                            your hearts and minds as you line in Christ Jesus.</p>
                            <p className="info loc"><span>Philippians 4:6-7(NLT)</span></p>

                            <p>Open To All</p>

                            <p className="sub-txt">Submit Prayer Requests Via Text to (301) 741-0325 Or</p>
                            <p className="sub-txt">Via Email At <a class="mail-to" href="mailto:CAMEZPASTOR@Gmail.com">CAMEZPASTOR@Gmail.com</a></p>
                        </div>
                    </div>
                </section> 

                <section className="body-section biblestudy notched-top c3-mid">
                    <h2 className="font-title1">Bible Study</h2> 
                    <p>Please Check Back Later For Our Bible Studies</p>
                </section>

                <section className="body-section events notched-top">
                    <h2 className="font-title1">Events</h2>    
                    <div className="events-container">
                        <Calendar popup localizer={localizer} defaultDate={new Date()}
                            defaultView="month" events={this.state.events}
                            onSelectEvent={event => this.openModal(event)} style={{ height: "100%" }} />

                        <Modal visible={this.state.modalvisible}
                            width="400" height="300" effect="fadeInUp"
                            onClickAway={() => this.closeModal()}>
                            <div className="modalContainer">
                                <h2>{this.state.modalevent.title}</h2>
                                <div className="modalBody">
                                    <p>Date: {this.parseDate(this.state.modalevent.start_dt,"date")}</p>
                                    <p>Time: {this.parseDate(this.state.modalevent.start_dt,"time")}</p>
                                    <p>{this.state.modalevent.location}</p>
                                </div>
                                <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                            </div>
                        </Modal>
                    </div>
                </section>
            </div> 
        );        
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        this.loadEvents();
    }

    loadEvents(){
        var self = this;
        try {
            
            var futureDt = new Date();
            futureDt.setFullYear(futureDt.getFullYear() + 1);
            var postData = {"startDt": new Date(), "endDt":futureDt};

            axios.post(self.rootPath + "/api/getEvents", postData, {'Content-Type': 'application/json'})
            .then(function(response) {
                var retData = response.data.results ? response.data.results : [];
                var eData = retData.map(function(el) {
                    var o = Object.assign({}, el);
                    o.start = o.start_dt;
                    o.end = o.end_dt;
                    return o;
                });
                self.setState({ events: eData});
            });
        }
        catch(ex){
            console.log(" Error loading announcements: ",ex);
        }
    }
}

export default GetConnected;