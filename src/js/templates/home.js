import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-awesome-modal';

/* Components */
import CarouselImgCard from './components/carouselImgCard'

/* Media */
import amezLogo from "../../assets/img/logos/ame_zion_logo.png";
import carouselCover from "../../assets/img/siteMedia/ChurchBody.jpg";

import welcomeVid from '../../assets/img/tmpMedia/tmpVideo.mp4'
import spacer from '../../assets/img/tmpMedia/church2.jpg';

/* Temp Images */
import pastorImg from "../../assets/img/siteMedia/pastor1.jpg";
var carouselBase = [{type:"cover-title", title:"Welcome To Clinton"}];

class Home extends Component{
    constructor(props) {
        super(props);
        this.rootPath = "http://"+window.location.hostname + (window.location.port != "" ? ":"+window.location.port : "");
        //this.rootPath = "http://localhost:7777";

        this.state = {
            scrollSpy: true,
            scrollSmooth: true,
            scrollDuration: 7000,
            showThumbs: false,
            modalvisible:false,
            modalevent:{},
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1024: { items: 3 },
            },
            carouselData: [],
            ministriesData: [],
            eventsData: []
        }
        this.renderSwitch = this.renderSwitch.bind(this);
        this.parseDate = this.parseDate.bind(this);
        this.checklogo = this.checklogo.bind(this);
    }

    openModal(event) {  this.setState({ modalvisible : true, modalevent:event });  }
    closeModal() { this.setState({ modalvisible : false }); }

    renderSwitch(item) {
        switch(item.type) {
          case 'cover-title':
            return <div className="carousel-card cover-title"><div className="content-title">{item.title}</div></div>;
          case 'card-img':
            return <CarouselImgCard item={item}></CarouselImgCard>;
          default:
            return <div></div>;
        }
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
                    var Month = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
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

    buildEventItems() {
        return (
          this.state.eventsData.map((event, i) => (
            <div className="details-container">
                {event.type === "all" ?
                    <Link to="/getConnected" className="event-container all">
                        <div className="all-container">
                            <div className="info-title">{event.title}</div>
                        </div>
                    </Link>
                :
                    <div className="event-container" onClick={() => this.openModal(event)}>
                        <div className="event-details-container event-date">
                            <div className="date-day">{this.parseDate(event.start_dt,"day")}</div>
                            <div className="date-month">{this.parseDate(event.start_dt,"month")}</div>
                        </div>
                        <div className="event-details-container event-info">
                            <div className="info-title">{event.title}</div>
                            <div className="info-time">{this.parseDate(event.start_dt,"time")}</div>
                        </div>
                    </div>
                }
            </div>
          ))
        )
    };

    render(){ 
        const eventItems = this.buildEventItems();

        return(
            <div className="site-page home">
                <section className="main-carousel background3">
                    <div className="back-cover"><img src={carouselCover} alt="Carousel Cover"/></div>
                    <Carousel className="clinton-carousels home-carousel" showThumbs={this.state.showThumbs} showStatus={false} interval={this.state.scrollDuration} infiniteLoop autoPlay>
                        {this.state.carouselData.map((item, i) => 
                            <div className="carousel-page" key={i}>
                                { this.renderSwitch(item) }
                            </div>
                        )}
                    </Carousel>
                </section>
                
                {/* Get Connected */}
                <section className="getConnected">
                    <h1 className="font-title1">Get Connected</h1>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    <div className="cards-holder">
                        <div className="card service">
                            <div className="card-container">
                            <div className="card-title">
                                    <div className="icon-header"><div className="icon-container c6"><i className="icon-center far fa-clock"></i></div></div>
                                    <div className="text">Service Times</div>
                                </div>
                            </div>
                        </div>
                        <div className="card prayer">
                            <div className="card-container">                    
                                <div className="card-title">
                                    <div className="icon-header c6"><div className="icon-container c6"><i className="icon-center fas fa-phone"></i></div></div>
                                    <div className="text">Prayer Call</div>
                                </div>
                            </div>
                        </div>
                        <div className="card bible">
                            <div className="card-container">
                            <div className="card-title">
                                    <div className="icon-header c6"><div className="icon-container c6"><i className="icon-center fab fa-audible"></i></div></div>
                                    <div className="text">Bible Study</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ministries */}
                <section className="ourMinistries">                    
                    <h1 className="font-title1">Ministries</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    
                    <div className="ministry-container" id="ministryList">
                        {this.state.ministriesData.map((ministry,i) => 
                            <Link to={"/ministries" + this.getUrl(ministry.title)} className="ministry-tag" key={i}>
                                <div className="tag-img"><img src={this.checklogo(ministry.logo)} alt="minstry icon"/></div>
                                <div className="tag-title">{ministry.title}</div>
                            </Link>
                        )}
                        <Link to="/ministries" className="ministry-tag all">                                
                            <div className="tag-title">View All Ministries</div>
                        </Link>
                    </div>
                </section>

                {/* Welcome From Our Pastor */}
                <section className="welcome">
                    <div className="text-content">
                        <h1 className="font-title1">Welcome From Our Pastor</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <div className="tablet-cover">
                        <span className="half-tablet content">
                            <div className="content-area">
                                <div className="video-container">
                                    <video className="mini-video" controls><source src={welcomeVid} /></video>
                                </div>
                            </div>
                        </span>
                    </div>
                </section>

                {/* Spacer */}
                <section className="para-spacer">
                    <div className="cover">
                        <div className="cover-text">
                            <div className="title">"For where two or three are gathered together in my name, there am I in the midst of them...."</div>
                            <div className="sub-text">Matthew 18:20</div>
                        </div>
                    </div>
                    <div className="spacer1"><img src={spacer} alt="spacer"/></div>
                </section>

                {/* Events */ }
                <section className="upcomingEvents">
                    <h1 className="font-title1">Upcoming Events</h1>

                    <div className="event-list">
                        <span className="ctrl prev" onClick={() => this.Carousel._slidePrev()}><i className="fas fa-chevron-left"></i></span>
                        <span className="ctrl next" onClick={() => this.Carousel._slideNext()}><i className="fas fa-chevron-right"></i></span>
                        
                        <AliceCarousel className="event-carousel" items={eventItems}
                            duration={400} mouseDragEnabled={true} autoPlay={true} 
                            autoPlayInterval={7000} autoPlayDirection="ltr" responsive={this.state.responsive}
                            disableAutoPlayOnAction={true}  buttonsDisabled={true} ref={ el => this.Carousel = el }/>

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

    checklogo(logo) {
        var ret = null;
        try {
            ret = (!logo ? amezLogo : logo);
        }
        catch(ex){
            console.log("Error checking logo: ", ex);
        }
        return ret;
    }

    getUrl(title){
        var ret = "";
        try {
            ret ="/"+title.replace(/([&\/\\()])/g,"_").split(' ').join("").toLowerCase();
        }
        catch(ex){
            console.log("error setting url: ", ex);
            ret = "";
        }
        return ret;
    }

    loadAnnouncements(){
        var self = this;
        try {
            fetch(self.rootPath + "/api/getAnnouncements")
            .then(function(response) {
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                var carouselList = carouselBase.concat(data.results);
                self.setState({ carouselData: carouselList});
            });
        }
        catch(ex){
            console.log(" Error loading announcements: ",ex);
        }
    }

    loadMinistries(){
        var self = this;
        try {
            fetch(self.rootPath + "/api/getSpotlightMinistries")
            .then(function(response) {
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                self.setState({ ministriesData: data.results});
            });
        }
        catch(ex){
            console.log(" Error loading announcements: ",ex);
        }
    }

    loadEvents(){
        var self = this;
        try {
            
            var futureDt = new Date();
            futureDt.setFullYear(futureDt.getFullYear() + 1);
            var postData = {"startDt": new Date(), "endDt":futureDt};

            axios.post(self.rootPath + "/api/getEvents", postData, {'Content-Type': 'application/json'})
            .then(function(response) {
                var eData = response.data.results.slice(0,8);
                // Add Add Events
                eData.push({title:"All Events",type:"all"});
                self.setState({ eventsData: eData});
            });
        }
        catch(ex){
            console.log(" Error loading announcements: ",ex);
        }
    }

    componentDidMount(){
        let self = this;        
        try {
            window.scrollTo(0, 0);
            self.loadAnnouncements();
            self.loadMinistries();
            self.loadEvents();
        }
        catch(ex){
            console.log(" Error Loading data: ",ex);
        }
    }
}

export default Home;