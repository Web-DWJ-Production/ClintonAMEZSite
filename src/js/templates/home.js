import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import SbEditable from 'storyblok-react';
import StoryblokService from '../utils/storyblok.service';

/* Components */
import CarouselImgCard from './components/carouselImgCard'

/* Media */
import amezLogo from "../../assets/img/logos/ame_zion_logo.png";
import spacer from "../../assets/img/siteMedia/Back10-mini.png";
//'../../assets/img/tmpMedia/church2.jpg';

import visitImg from "../../assets/img/siteMedia/group3.jpg";

const stb = new StoryblokService();

var carouselBase = [{type:"cover-title", title:"Welcome To Clinton"}];
var Month = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

class Home extends Component{
    constructor(props) {
        super(props);

        this.state = {
            scrollSpy: true,
            scrollSmooth: true,
            scrollDuration: 12000,            
            modalvisible:false,
            modalevent:{},
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1024: { items: 2 }
            },
            page:{},
            sliderContent:null,
            welcomeContent: null,
            carouselData: [],
            ministriesData: [],
            eventsData: []
        }

        this.renderSwitch = this.renderSwitch.bind(this);
        this.parseDate = this.parseDate.bind(this);

        this.loadAnnouncements = this.loadAnnouncements.bind(this);
        this.loadMinistries = this.loadMinistries.bind(this);
        this.loadEvents = this.loadEvents.bind(this);
    }

    renderSwitch(item) {
        switch(item.type) {
          case 'cover-title':
            return <div className="carousel-card cover-title"><div className="content-title">{item.title}</div></div>;
          case 'card-img':
            return <CarouselImgCard blok={item}></CarouselImgCard>;
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

    buildEventItems() {
        return (
            this.state.eventsData.map((event, i) => ( 
                <div className="event-container">
                    <div className="event-date">
                        <div className="date-month">{this.parseDate(event.start_dt,"month")}</div>
                        <div className="date-day">{this.parseDate(event.start_dt,"day")}</div>
                    </div>

                    <div className="event-info">
                        <div className="info-title">{event.title}</div>
                        <div className="info-base">
                            <span>{event.location}</span>
                            <span>{this.parseDate(event.start_dt,"time")}</span>
                        </div>
                    </div>
                </div>
            ))
        )
    }

    render(){  
        const eventItems = this.buildEventItems();

        return(
            <div className="site-page home">
               <section className="main-carousel background3">
                   {/* Landing Slider - [E] */}
                   {this.state.sliderContent &&
                        <SbEditable content={this.state.sliderContent}>
                            <div className="back-cover"><img src={(this.state.sliderContent ? this.state.sliderContent.backCover : amezLogo)} alt="Carousel Cover"/></div>
                            {this.state.carouselData && this.state.carouselData.length > 0 ? 
                                <Carousel className="clinton-carousels home-carousel" showIndicators={false} showThumbs={false} showStatus={false} interval={this.state.scrollDuration} infiniteLoop autoPlay>
                                    {this.state.carouselData.map((item, i) => 
                                        <div className="carousel-page" key={i}>
                                            { this.renderSwitch(item) }
                                        </div>
                                    )}
                                </Carousel>
                                : <div className="loader-container"><div className="hm-spinner" /></div>
                            }
                            <div className="event-scroller">
                                <div className="event-title">Upcoming <br/>Events</div>
                                <div className="events-container">
                                    <AliceCarousel className="event-carousel" items={eventItems}
                                        duration={500} mouseDragEnabled={true} autoPlay={true} dotsDisabled={true}
                                        autoPlayInterval={7000} autoPlayDirection="ltr" responsive={this.state.responsive}
                                        disableAutoPlayOnAction={true} buttonsDisabled={true} ref={ el => this.Carousel = el }/>
                                </div>
                            </div>
                        </SbEditable>
                    }
                </section>

                {/* Welcome From Our Pastor - [E] */}
                { this.state.welcomeContent &&
                    <section className="welcome">
                        <SbEditable content={this.state.welcomeContent}>
                            <div className="text-content">
                                <h1 className="font-title1">{this.state.welcomeContent.title}</h1>
                                <p>{this.state.welcomeContent.text}</p>
                            </div>

                            <div className="tablet-cover">
                                <span className="half-tablet content">
                                    <div className="content-area">
                                        <div className="video-container">
                                            <img src={ (this.state.welcomeContent.image ? this.state.welcomeContent.image : amezLogo)} alt="home welcome img"/>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </SbEditable>
                    </section>
                }

                {/* Get Connected */}
                <section className="getConnected">
                    <div className="connected-puzzle">
                        <Link to="/getConnected/ourService" className="piece sz-2 c4 r2">
                            <div className="icon-row"><div className="icon-container"><i className="icon-center far fa-clock"/></div></div>
                            <div className="text">Service Times</div>
                        </Link>
                        <Link to="/getConnected/connectWithUs" className="piece sz-1 c3 t">
                            <div className="icon-row"><div className="icon-container"><i className="icon-center fas fa-phone"/></div></div>
                            <div className="text">Prayer Call</div>
                        </Link>
                        <Link to="/getConnected/connectWithUs" className="piece sz-1 c5 l">
                            <div className="icon-row"><div className="icon-container"><i className="icon-center fab fa-audible"/></div></div>
                            <div className="text">Bible Study</div>
                        </Link>
                    </div>

                    <div className="text-content">
                        <h1 className="font-title1">Get Connected</h1>
                        <p>Here at Clinton we are a bible preaching, teaching, & believing minsitry. We invite you to fellowship with us, to walk your faith journey with us, and to join Clinton African Methodist Episcopal Zion Church.</p>
                    </div>

                    <div className="spacer1"><img src={spacer} alt="spacer"/></div>
                </section>

                {/* Ministries */}
                <section className="ministries">
                    <div className="text-content">
                        <h1 className="font-title1">Ministries</h1>
                        <p>We believe in the living word and being an active body of christ, through our ministries we are able to connected and serve those within our community and promote positive change.</p>
                        
                        {/*<Link to="/ministries" className="ministry-tag all">                                
                            <div className="tag-title">View All Ministries</div>
                        </Link>*/}
                    </div>
                </section>

                {/* Visit */}
                <section className="visitUs">
                    <div className="visit-content notched-right">
                        <h1 className="font-title1">Visit Us</h1>
                        <div className="item-container">
                            <div className="visit-item">
                                <h2>Address</h2>
                                <p className="addr">Clinton African Methodist Episcopal Zion Church</p>
                                <p className="addr">223 Elizabeth Avenue</p>
                                <p className="addr">Rockville, MD. 20850</p>
                            </div>

                            <div className="visit-item">
                                <h2>Follow Us</h2>
                                <p className="social"><div className="social-icon"><i className="fab fa-facebook-f fa-fw"/></div> <div className="txt">Clinton African Methodist Episcopal Zion Church</div></p>
                                <p className="social"><div className="social-icon"><i className="fab fa-twitter fa-fw"/></div><div className="txt">@ClintonAMEZion</div></p>
                            </div>
                        </div>
                    </div>

                    <div className="visit-img"><img src={visitImg} alt="pastor img"/></div>
                </section>
            </div>    
        );        
    }

    componentDidMount(){   
        var self = this;           
        try {
            window.scrollTo(0, 0);
            stb.initEditor(this);
            stb.getInitialProps({"query":"home"}, 'cdn/stories/home', function(page){
                self.setState({page:page}, ()=> {
                    self.loadAnnouncements();
                });
            });

            this.loadMinistries();
            this.loadEvents();
        }
        catch(ex){
            console.log(" Error Loading data: ",ex);
        }       
    }

    loadAnnouncements(){
        var self = this;
        try {
            this.setState({ sliderContent: stb.getContentType("slider", this.state.page), welcomeContent: stb.getContentType("welcome", this.state.page) }, () =>{
                var itemList = self.state.sliderContent;
                var tmpList = (itemList && itemList.body ? itemList.body : []);
                var carouselList = carouselBase.concat(tmpList.map(function(item){ item.type = "card-img"; return item; }));
                
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
            fetch(self.props.rootPath + "/api/getSpotlightMinistries")
            .then(function(response) {
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                var datRet = data.results ? data.results: [];
                self.setState({ ministriesData: datRet});
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

            axios.post(self.props.rootPath + "/api/getEvents", postData, {'Content-Type': 'application/json'})
            .then(function(response) {
                var retData = response.data.results ? response.data.results : [];
                var eData = retData.slice(0,8);
                self.setState({ eventsData: eData});
            });
        }
        catch(ex){
            console.log(" Error loading announcements: ",ex);
        }
    }
}

export default Home;