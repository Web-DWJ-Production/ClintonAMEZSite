import React, { Component } from 'react';

/* Images */
import churchImg from "../../assets/img/tmpMedia/img3.jpg";
import backImg from "../../assets/img/tmpMedia/church1.jpg";

class OurService extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    } 

    render(){        
        return(
            <div class="site-page our-service">
                <section class="title-card">
                    <h1 class="font-title1">Service Information</h1>
                    <div class="back-img">
                        <div class="cover c3c2"></div>
                        <img src={backImg} />
                    </div>
                </section>
                
                <section class="body-section serviceInfo notched-top">
                    <div class="service-card">
                        <div class="church-img"><img src={churchImg} /></div>
                        <div class="service-content">
                            <div class="content-info where-we-are txt c3 left">
                                <div class="info-txt">
                                    <p>Come join us at Clinton A.M.E. Zion anytime,</p> 
                                    <p>We are located at</p>
                                </div>
                                <div class="address">
                                    <p>223 Elizabeth Avenue</p>
                                    <p>Rockville, MD 20850</p>
                                </div>
                            </div>
                            <div class="content-info our-times txt c6 right">
                                <div class="info-txt">Sunday Services</div>
                                <div class="service-info">
                                    <div class="title">Sunday School</div>
                                    <div class="time">8:30am</div>
                                </div>
                                <div class="service-info">
                                    <div class="title">Morning Worship Service</div>
                                    <div class="time">10:00am</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>     
            </div>    
        );        
    }

    componentDidMount(){
        //let self = this;        
    }
}

export default OurService;