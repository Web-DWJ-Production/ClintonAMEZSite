import React, { Component } from 'react';
import Calendar from "react-big-calendar";
import moment from 'moment';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import SbEditable from 'storyblok-react';
import StoryblokService from '../utils/storyblok.service';

import backImg from "../../assets/img/siteMedia/group5.jpg";
import noVidImg from "../../assets/img/siteMedia/churchback0.jpg";
import eventBack from "../../assets/img/siteMedia/Back10-mini.png";
import callBack from "../../assets/img/siteMedia/Back09-mini.png";

const localizer = Calendar.momentLocalizer(moment);
var Month = ["January", "February", "March","April","May","June","July","August","September","October","November","December"];
var Day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const stb = new StoryblokService();

class GetConnected extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            modalvisible:false,
            modalevent:{},
            events: [],
            prayerCall:null,
            worshipVideo: null
        }
        this.parseDate = this.parseDate.bind(this);
        this.compareDates = this.compareDates.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.isMedia = this.isMedia.bind(this);
    } 

    isMedia(file, type){
        var ret = false;
        try {
            if(type === "video"){
                var vidList = [".mp4", ".mov"];
                for(var i =0; i < vidList.length; i++){
                    if(file.endsWith(vidList[i])) {
                        ret = true;
                        break;
                    }
                }
            }
            else {
                var audList = [".mp3"];
                for(var j=0; j < audList.length; j++){
                    if(file.endsWith(audList[j])) {
                        ret = true;
                        break;
                    }
                }
            }
        }
        catch(ex){
            console.log(" [Error] checking file type: ",ex);
        }
        return ret;
    }
    compareDates(start, end) {
        var ret = true;
        try {
            var tmpSt = this.parseDate(start, "date");
            var tmpEd = this.parseDate(end, "date");

            ret = (tmpSt === tmpEd);
        }
        catch(ex){
            console.log("Error comparing dates: ", ex);
        }

        return ret;
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
                    ret = Day[date.getDay()]+ ", "+ date.getDate() + " " + Month[date.getMonth()] + " " + date.getFullYear();
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

    loadEvents(){
        var self = this;
        try {
            
            var futureDt = new Date();
            futureDt.setFullYear(futureDt.getFullYear() + 1);
            var postData = {"startDt": new Date(), "endDt":futureDt};

            axios.post(self.props.rootPath + "/api/getEvents", postData, {'Content-Type': 'application/json'})
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
    loadPage(page){
        try {
            var validPage = { "prayerCall":true, "worshipVideo":true };

            if(page.data.story.content.body){
                for(var i =0; i < page.data.story.content.body.length; i++){
                    var tmpItem = page.data.story.content.body[i];
                    if(tmpItem.component in validPage){
                        this.setState({ [tmpItem.component] : tmpItem });
                    }
                }
            }
        }
        catch(ex){
            console.log(" Error loading page: ",ex);
        }
    }

    componentDidMount(){
        var self = this;
        try {
            window.scrollTo(0, 0);
            stb.initEditor(this);
            stb.getInitialProps({"query":"home"}, 'cdn/stories/getconnected/connectwithus', function(page){
                self.loadEvents();
                self.loadPage(page);
            });
            
        }
        catch(ex){
            console.log(" Error Loading data: ",ex);
        }  
        
    }

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
                    <div className="back-img"><img src={callBack} alt="background" /></div>

                    <div className="split-section">
                        <div className="split-content">
                            <h2 className="font-title1">Sunday Service</h2>
                            <p>Every Sunday for Discipleship Training at 8:30 a.m. & Morning Worship at 10:00 a.m.</p>
                            <div className="btn2-container">
                                <a className="btn2" href="https://us02web.zoom.us/j/81318905630?pwd=bU0vUWtDOFRudSsvbXdEL3F1RGl5Zz09" target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-tablet-alt" />
                                    <span>Online</span>
                                </a>

                                <div className="btn2 noback c6">
                                    <i className="fas fa-phone-volume" />
                                    <span>Dial In: +1 (301) 715-8592</span>
                                </div>
                            </div>

                            <div className="content-sub">
                                <p>Meeting ID: <span>813 1890 5630</span></p>
                                <p>Password: <span>676479</span></p>
                            </div>
                        </div>

                        <div className="splitImg">
                            { this.state.worshipVideo !== null ?
                                <SbEditable content={this.state.worshipVideo}>
                                    <div className="video-content">
                                        {this.isMedia(this.state.worshipVideo.file, "video") ? 
                                            <video controls>
                                                <source src={this.state.worshipVideo.file} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                            : <div className="no-video" /> 
                                        }
                                        <div className="video-title">
                                            <div className="title">{this.state.worshipVideo.title}</div>
                                            <div className="scripture">{this.state.worshipVideo.scripture}</div>
                                            <div className="date">{this.parseDate(this.state.worshipVideo.date, "date")}</div>
                                        </div>
                                    </div>
                                </SbEditable>
                                : <img src={noVidImg} alt="video coming soon"/>
                            }
                        </div>
                    </div>

                    <div className="split-section">
                        <div className="splitImg"><img src="/images/prayerCall02.jpg" alt="prayer call flyer"/></div>
                        <div className="split-content">
                            <h2 className="font-title1">Mid-Week Prayer Calls</h2>
                            <p>We invite you to come GROW in CHRIST with us: Every Wednesday at 7 a.m. for the Mid-Week Prayer Call</p>
                            <p>Listen to our most recent prayer call:</p>
                            {this.state.prayerCall !== null && 
                                <SbEditable content={this.state.prayerCall}>
                                    <div className="callInfo">         
                                        <div className="title">{this.state.prayerCall.title}</div>
                                        <div className="scripture">{this.state.prayerCall.scripture}</div>
                                        <div className="date">{this.parseDate(this.state.prayerCall.date, "date")}</div>                           
                                        {this.isMedia(this.state.prayerCall.file, "audio") ?
                                            <audio controls>
                                                <source src={this.state.prayerCall.file} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                            </audio>
                                            : <div className="no-audio" />
                                        }
                                    </div>
                                </SbEditable>
                            }
                        </div>
                    </div>
                    
                </section> 

                <section className="body-section biblestudy notched-top c2">
                    <h2 className="font-title1">Bible Study</h2> 
                    <p>Please Check Back Later For Our Bible Studies</p>
                </section>

                <section className="body-section events notched-top">
                    <div className="back-img"><img src={callBack} alt="background" /></div>
                    
                    <h2 className="font-title1">Events</h2>    
                    <div className="events-container">
                        <Calendar popup localizer={localizer} defaultDate={new Date()}
                            defaultView="month" events={this.state.events}
                            onSelectEvent={event => this.openModal(event)} style={{ height: "100%" }} />

                        <Modal visible={this.state.modalvisible}
                            width="450" effect="fadeInUp"
                            onClickAway={() => this.closeModal()}>
                            <div className="modalContainer">
                                <div className="modalHeader">
                                    <div className="title">Clinton Events</div>
                                    <div className="modal-close" onClick={() => this.closeModal()}><i className="far fa-times-circle" /></div>
                                </div> 

                                <div className="event-img"><img src={eventBack} alt="event styled background" /></div>
                                                                   
                                <div className="modalBody">
                                    <div className="body-line">
                                        <div className="line-icon"><div className="color-blk"/></div>
                                        <div className="line-text">
                                            <span className="title">{this.state.modalevent.title}</span>
                                        </div>
                                    </div>

                                    <div className="body-line">
                                        <div className="line-icon"><i className="far fa-calendar-alt" /></div>
                                        <div className="line-text">
                                            <span>{this.parseDate(this.state.modalevent.start_dt,"date")}</span>
                                            {!this.compareDates(this.state.modalevent.start_dt, this.state.modalevent.end_dt) && 
                                                <span className="subtext">{this.parseDate(this.state.modalevent.end_dt,"date")}</span>
                                            }
                                        </div>
                                        
                                    </div>

                                    <div className="body-line">
                                        <div className="line-icon"><i className="far fa-clock" /></div>
                                        <div className="line-text"><span>{this.parseDate(this.state.modalevent.start_dt,"time")} - {this.parseDate(this.state.modalevent.end_dt,"time")}</span></div>
                                    </div>

                                    {(this.state.modalevent.location && this.state.modalevent.location.length > 0) &&
                                        <div className="body-line">
                                            <div className="line-icon"><i className="fas fa-map-marker-alt" /></div>
                                            <div className="line-text"><span>{this.state.modalevent.location}</span></div>
                                        </div>
                                    }

                                    {(this.state.modalevent.who && this.state.modalevent.who.length > 0) &&
                                        <div className="special-line">
                                            <div className="line-icon"><i className="fas fa-user-circle" /></div>
                                            <div className="line-text"><span>{this.state.modalevent.who}</span></div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Modal>
                    </div>
                </section>
            </div> 
        );        
    }
}

export default GetConnected;