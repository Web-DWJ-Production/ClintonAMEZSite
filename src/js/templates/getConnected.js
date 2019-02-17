import React, { Component } from 'react';
import Calendar from "react-big-calendar";
import moment from 'moment';

import backImg from "../../assets/img/tmpMedia/img3.jpg";
import pastorImg from "../../assets/img/tmpMedia/pastor-mini.jpg";

const localizer = Calendar.momentLocalizer(moment);

class GetConnected extends Component{
    constructor(props) {
        super(props);

        this.state = {
            events: [
                {title:"Test Event 1", start:new Date('January 17, 2019 03:24:00'), end:new Date('January 17, 2019 05:24:00')},
                {title:"Test Event 2", start:new Date('January 28, 2019 15:00:00'), end:new Date('January 28, 2019 17:00:00')},
                {title:"Test Event 3", start:new Date('February 08, 2019 10:24:00'), end:new Date('February 08, 2019 12:24:00')},
                {title:"Test Event 4", start:new Date('February 17, 2019 13:24:00'), end:new Date('February 17, 2019 15:24:00')},
                {title:"Test Event 5", start:new Date('March 1, 2019 20:24:00'), end:new Date('March 1, 2019 22:24:00')},
                {title:"Test Event 6", start:new Date('April 27, 2019 18:24:00'), end:new Date('April 27, 2019 18:24:00')},
                {title:"Test Event 7", start:new Date('May 3, 2019 17:24:00'), end:new Date('May 3, 2019 17:24:00')},
                {title:"Test Event 8", start:new Date('July 8, 2019 12:24:00'), end:new Date('July 8, 2019 12:24:00')}
            ]
        }
    } 

    render(){        
        return(
            <div className="site-page get-connected">
                <section className="title-card">
                    <h1 className="font-title1">Get Connected</h1>
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                        <img src={backImg} />
                    </div>
                </section>

                <section className="body-section prayerCall notched-top">
                    <div className="callCard">
                        <div className="call-info">
                            <div className="pastor-img"><img src={pastorImg} /></div>
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

                <section className="body-section events notched-top light">
                    <h2 className="font-title1">Events</h2>    
                    <div className="events-container">
                        <Calendar localizer={localizer} defaultDate={new Date()}
                            defaultView="month" events={this.state.events}
                            style={{ height: "100%" }} />
                    </div>
                </section>
            </div> 
        );        
    }

    componentDidMount(){
        //let self = this;        
    }
}

export default GetConnected;