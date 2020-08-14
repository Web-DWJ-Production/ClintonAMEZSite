import React, { Component } from 'react';

/* Images */
import churchImg from "../../assets/img/siteMedia/dance2.jpg";
import backImg from "../../assets/img/siteMedia/dance1.jpg";
import callBack from "../../assets/img/siteMedia/Back09-mini.png";

class OurService extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    } 

    render(){        
        return(
            <div className="site-page our-service">
                <section className="title-card">
                    <h1 className="font-title1">Service Information</h1>
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                        <img src={backImg} alt="service background"/>
                    </div>
                </section>
                
                <section className="body-section serviceInfo notched-top">
                    <div className="back-img"><img src={callBack} alt="background" /></div>

                    <div className="service-card">
                        <div className="church-img"><img src={churchImg} alt="church"/></div>
                        <div className="service-content">
                            <div className="content-info where-we-are txt c3">
                                <div className="info-txt">
                                    <p>Clinton A.M.E. Zion Church Home</p> 
                                </div>
                                <div className="address">
                                    <p>223 Elizabeth Avenue</p>
                                    <p>Rockville, MD 20850</p>
                                </div>
                            </div>
                            <div className="content-info our-times txt c6">
                                <div className="info-txt lrg">Sunday Services</div>
                                <div className="service-info-container">
                                    <div className="service-info">
                                        <div className="title">Sunday  School</div>
                                        <div className="time">8:30am</div>
                                    </div>
                                    <div className="service-info">
                                        <div className="title">Morning Worship Service</div>
                                        <div className="time">10:00am</div>
                                    </div>
                                </div>

                                <div className="more-info-container">
                                    <div className="info-txt lrg">Join Us Online</div>

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
                                
                            </div>
                        </div>
                    </div>
                </section>     
            </div>    
        );        
    }

    componentDidMount(){window.scrollTo(0, 0);}
}

export default OurService;