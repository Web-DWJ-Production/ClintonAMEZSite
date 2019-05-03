import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

import backImg from "../../assets/img/tmpMedia/img3.jpg";

const MapMarker = () => <div className="react-mapMarker"><i className="fas fa-church"></i></div>;

class ContactUs extends Component{
    constructor(props) {
        super(props);

        this.state = {
            key:"AIzaSyAhRHiVtCfg6orX2hg3KhCyMQ_OrBso_Es",
            center:[39.0959181, -77.1504537],
            zoom: 15,
            office: {lat: 39.0959181, lng: -77.1504537}
        }
    } 

    render(){        
        return(
            <div className="site-page contact-us">
                <section className="title-card c1">
                    <h1 className="font-title1">Contact Us</h1>
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                        <img src={backImg} alt="contact us background img"/>
                    </div>
                </section>

                <section className="body-section contact-form notched-top">
                    <p className="contact-message">The Clinton Church Family invites you to join us in Christian Fellowship. <br/>Please reach out to us below for any question, prayer requests, or general information.</p>
                </section>

                <section className="body-section contact-info c3 notched-top c3-mid">
                    <div className="info-section">
                        <h2>Church Address</h2>
                        <p>Clinton African Methodist Episcopal Zion Church</p>
                        <p>223 Elizabeth Avenue</p>
                        <p>Rockville, MD. 20850</p>
                    </div>

                    <div className="info-section">
                        <h2>Contact Information</h2>
                        <p><span>Phone:</span> (301) 340-7942</p>
                        <p><span>Fax:</span> (301) 825-8938</p>
                        <p><span>Email:</span> <a class="mail-to" href="mailto:camez223@aol.com">camez223@aol.com</a></p>
                    </div>
                </section>

                <section className="body-section contact-map map notched-top">
                    <div className="map-container">
                        <GoogleMap apiKey={this.state.key} center={this.state.center} zoom={this.state.zoom} margin={[30,30,30,30]}>
                            <MapMarker lat={this.state.office.lat} lng={this.state.office.lng} name="Company Location"></MapMarker>
                        </GoogleMap>
                    </div>
                </section>
            </div>
        );        
    }

    componentDidMount(){window.scrollTo(0, 0);}
}

export default ContactUs;