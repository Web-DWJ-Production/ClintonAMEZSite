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
                            <p>COMING SOON!</p>
                            <p>Stay Tuned for</p>
                            <p>our <span>NEW Online</span> Experience</p>
                        </div>

                        <div className="tmpTxt">
                            <p>In the meantime, we invite you to come GROW in CHRIST with us:</p>
                            <p>Every Wednesday at 7 a.m. for the <span>Mid-Week Prayer Call</span></p>
                        </div>

                        <div className="tmpBtn-container">
                            <div className="tmpBtn noback">
                                <i className="fas fa-phone-volume" />
                                <span>Dial In: +1 (301) 298-1561</span>
                            </div>

                            <div className="tmpBtn noback">
                                <span>Password: 630958#</span>
                            </div>
                        </div>

                        <div className="tmpTxt">
                            <p>Every Sunday for <span>Discipleship Training</span> at 8:30 a.m. & <span>Morning Worship</span> at 10:00 a.m.</p>
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

                        <div className="tmpTxt">
                            <p><span>Rev. Alyce R. Walker Johnson, Pastor & Chief Servant</span></p>
                           
                        </div>

                    </div>
                </div>
                <div className="img-body"><img src={soloImg} alt="solo" /></div>
            </div>    
        );
    }
}

export default ComingSoon;