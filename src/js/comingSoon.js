import React, { Component } from 'react';

/* Images */
import logoW from "../assets/img/logos/Clinton_logoW.png";
import backImg from "../assets/img/siteMedia/Back10-mini.png";
import soloImg from "../assets/img/siteMedia/church3.jpg";

class ComingSoon extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){     
        return(            
            <div className="cs-body">
                <div className="content-body">
                    <div className="back-img"><img src={backImg} alt="background" /></div>

                    <div className="body-info">
                        <div className="tmpLogo"><img src={logoW} className="logo" alt="A.M.E. Zion Logo" /></div>

                        <div className="tmpTxt header">
                            <p>Stay Tuned,</p>
                            <p>Our <span>New Online</span> Experience</p>
                            <p>Is Coming Soon</p>
                        </div>

                        <div className="tmpTxt">
                            <p>As we prepare our new website and digital platform we welcome you to join us online every Sunday for <span>Online Sunday School</span> & <span>Worship</span>. To login: </p>
                        </div>

                        <div className="tmpBtn-container">
                            <a className="tmpBtn" href="https://us02web.zoom.us/j/81318905630?pwd=bU0vUWtDOFRudSsvbXdEL3F1RGl5Zz09" target="_blank" rel="noopener noreferrer">
                                <i className="fas fa-tablet-alt" />
                                <span>Online</span>
                            </a>

                            <div className="tmpBtn noback">
                                <i className="fas fa-phone-volume" />
                                <span>Dial In: +1 (301) 715-8592</span>
                            </div>
                        </div>

                        <div className="tmpTxt">
                            <p>Meeting ID: <span>813 1890 5630</span></p>
                            <p>Password: <span>676479</span></p>
                        </div>

                    </div>
                </div>
                <div className="img-body"><img src={soloImg} alt="solo" /></div>
            </div>    
        );
    }
}

export default ComingSoon;