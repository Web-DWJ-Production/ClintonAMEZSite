import React, { Component } from 'react';
//import { BrowserRouter as Link } from "react-router-dom";

class Footer extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    } 

    render(){        
        return(
            <div className="footer-body">
                <div className="footer-container">
                    <div className="footer-column">
                        <div className="column-title">About Clinton</div>
                        <p>Our mission is to produce ministries that will serve the CAUSE of Christ through the spiritual transformation of minds, bodies and spirits.</p>
                        <div className="column-title">Service Times</div>
                        <p>Sunday School: 8:30am</p>
                        <p>Sunday Morning Worship: 10:00am</p>
                    </div>

                    <div className="footer-column">
                        <div className="column-title">Quick Links</div>
                        <p><a href="/ministries">Ministries</a></p>
                        <p><a href="http://www.amez.org/" target="_blank" rel="noopener noreferrer">Inside Zion</a></p>
                        <p><a href="/aboutUs">About Clinton</a></p>
                        <p><a href="/getConnected">Get Connected</a></p>
                        
                    </div>

                    <div className="footer-column">
                        <div className="column-title">More Info</div>
                        
                    </div>

                    <div className="footer-column">
                        <div className="column-title">Contact Us</div>
                        <p>223 Elizabeth Avenue</p>
                        <p className="lrg-margin">Rockville, MD 20850</p>
                        
                        <p>Phone: (301) 340-7942</p>
                        <p>Fax: (301) 825-8938</p>
                        <p>Email: camez223@aol.com</p>
                    </div>
                </div>
            </div>  
        );        
    }

    componentDidMount(){
        //let self = this;        
    }
}

export default Footer;