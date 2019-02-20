import React, { Component } from 'react';
import Calendar from "react-big-calendar";
import moment from 'moment';
import Modal from 'react-awesome-modal';
import axios from 'axios';

import backImg from "../../assets/img/siteMedia/group5.jpg";
import pastorImg from "../../assets/img/siteMedia/pastor-mini.jpg";

const localizer = Calendar.momentLocalizer(moment);

class GetConnected extends Component{
    constructor(props) {
        super(props);

        this.rootPath = "http://"+window.location.hostname + (window.location.port != "" ? ":"+window.location.port : "");
        //this.rootPath = "http://localhost:7777";
        
        this.state = {
            modalvisible:false,
            modalevent:{},
            events: []
        }
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
                            <p className="sub-txt">Via Email At CAMEZPASTOR@Gmail.com</p>
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
                            <div>
                                <h1>{this.state.modalevent.title}</h1>
                                <p></p>
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
                var eData = response.data.results.map(function(el) {
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