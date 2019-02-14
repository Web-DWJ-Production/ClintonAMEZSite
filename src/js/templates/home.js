import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-awesome-modal';

/* Components */
import CarouselImgCard from './components/carouselImgCard'

/* Media */
import amezLogo from "../../assets/img/logos/ame_zion_logo.png";
import carouselCover from "../../assets/img/siteMedia/cover5.jpg";

import welcomeVid from '../../assets/img/tmpMedia/tmpVideo.mp4'
import spacer from '../../assets/img/tmpMedia/church2.jpg';

/* Temp Images */
import pastorImg from "../../assets/img/tmpMedia/pastor1.jpg";

class Home extends Component{
    constructor(props) {
        super(props);

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
            carouselData: [
                {type:"cover-title", title:"Welcome To Clinton"},
                {type:"carousel-card-img", title:"Welcome", media:pastorImg, lines:[
                    {size:"h1", bold:true, text:""},
                    {size:"paragraph", bold:false, text:"Our vision is to affect a completely transformed community of faith, worthy of citizenship in the Kingdom of God, by the power of God through His Son Jesus Christ. Our mission is to produce ministries that will serve the CAUSE of Christ through the spiritual transformation of minds, bodies and spirits."},
                    {size:"paragraph", bold:false, text:"Sunday morning worship services begin at 10:00 AM.  Visitors, we encourage you to be sure to explore our 'Galleries' tab."}
                ]}
            ],
            ministriesData: [
                { title:"Christian Education Department", icon:amezLogo},
                { title:"WHOMS", icon:amezLogo},
                { title:"Lay Council", icon:amezLogo},
                { title:"Faith & Social Justice Ministry", icon:amezLogo},
                { title:"Young Adults", icon:amezLogo},
                { title:"Men of Varick", icon:amezLogo},
                { title:"Women of Zion", icon:amezLogo},
                { title:"Sunday School", icon:amezLogo}
            ],
            eventsData: [
                {title:"Test Event 1", date:new Date('January 17, 2019 03:24:00')},
                {title:"Test Event 2", date:new Date('January 28, 2019 15:00:00')},
                {title:"Test Event 3", date:new Date('February 08, 2019 10:24:00')},
                {title:"Test Event 4", date:new Date('February 17, 2019 13:24:00')},
                {title:"Test Event 5", date:new Date('March 1, 2019 20:24:00')},
                {title:"Test Event 6", date:new Date('April 27, 2019 18:24:00')},
                {title:"Test Event 7", date:new Date('May 3, 2019 17:24:00')},
                {title:"Test Event 8", date:new Date('July 8, 2019 12:24:00')}
            ]
        }
        this.renderSwitch = this.renderSwitch.bind(this);
        this.parseDate = this.parseDate.bind(this);
    }

    openModal(event) {  this.setState({ modalvisible : true, modalevent:event });  }
    closeModal() { this.setState({ modalvisible : false }); }

    renderSwitch(item) {
        switch(item.type) {
          case 'cover-title':
            return <div className="carousel-card cover-title"><div className="content-title">{item.title}</div></div>;
          case 'carousel-card-img':
            return <CarouselImgCard item={item}></CarouselImgCard>;
          default:
            return <div></div>;
        }
    }    

    parseDate(date, type){
        var ret = null;
        try {
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
                <div className="event-container" onClick={() => this.openModal(event)}>
                    <div className="event-details-container event-date">
                        <div className="date-day">{this.parseDate(event.date,"day")}</div>
                        <div className="date-month">{this.parseDate(event.date,"month")}</div>
                    </div>
                    <div className="event-details-container event-info">
                        <div className="info-title">{event.title}</div>
                        <div className="info-time">{this.parseDate(event.date,"time")}</div>
                    </div>
                </div>
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
                            <Link to="/ministries" className="ministry-tag" key={i}>
                                <div className="tag-img"><img src={ministry.icon} alt="minstry icon"/></div>
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
                    <div className="spacer1"><img src={spacer} alt="spacer image"/></div>
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

    componentDidMount(){
        //let self = this;        
    }
}

export default Home;