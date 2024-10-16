import React, { Component } from 'react';
import Calendar from "react-big-calendar";
import moment from 'moment';
import Modal from 'react-awesome-modal';
import axios from 'axios';

import backImg from "../../assets/img/siteMedia/group5.jpg";
import eventBack from "../../assets/img/siteMedia/Back10-mini.png";

const localizer = Calendar.momentLocalizer(moment);
var Month = ["January", "February", "March","April","May","June","July","August","September","October","November","December"];
var Day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class GetConnected extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            modalvisible:false,
            modalevent:{},
            events: []
        }
        this.parseDate = this.parseDate.bind(this);
        this.compareDates = this.compareDates.bind(this);
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
                    <div className="prayerCardImg"><img src="/images/prayerCall.jpg" alt="prayer call flyer"/></div>
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

            /*axios.post(self.props.rootPath + "/api/getEvents", postData, {'Content-Type': 'application/json'})
            .then(function(response) {
                var retData = response.data.results ? response.data.results : [];
                var eData = retData.map(function(el) {
                    var o = Object.assign({}, el);
                    o.start = o.start_dt;
                    o.end = o.end_dt;
                    return o;
                });
                self.setState({ events: eData});
            });*/
        }
        catch(ex){
            console.log(" Error loading announcements: ",ex);
        }
    }
}

export default GetConnected;