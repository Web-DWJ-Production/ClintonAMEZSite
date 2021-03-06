import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import backImg from "../../assets/img/siteMedia/ministry1.jpg";
import amezLogo from "../../assets/img/logos/ame_zion_logo.png";

import ministryImg1 from "../../assets/img/siteMedia/leadership1.jpg";
import ministryImg2 from "../../assets/img/siteMedia/group7.jpg";
import ministryImg3 from "../../assets/img/siteMedia/child1.jpg";

class Ministries extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    } 

    render(){        
        return(
            <div>
               {(this.props.match.params.ministryId ? <MinistryInd rootPath={this.props.rootPath} ministryId={this.props.match.params.ministryId}/> : <MinistryAll rootPath={this.props.rootPath} />)}
            </div>    
        );        
    }

    componentDidMount(){}
}

class MinistryAll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ministryList:[]
        }

        this.checklogo = this.checklogo.bind(this);
        this.getUrl = this.getUrl.bind(this);
    } 

    render(){        
        return(
            <div className="site-page ministries">
                <section className="title-card c1">
                    <h1 className="font-title1">Ministries</h1>
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                        <img src={backImg} alt="ministries background img"/>
                    </div>
                </section>

                {this.state.ministryList && this.state.ministryList.length > 0 ?
                    this.state.ministryList.map((msection,i) =>
                        <section className={"body-section notched-top" + (i%2===1? " c3-mid" : "")} key={i}>
                            <h1 className="font-title1">{ msection.sectionTitle }</h1>
                            <div className="ministry-lrg-container">
                                {msection.list.map((ministry,j) =>
                                    <Link to={"/ministries/" + this.getUrl(ministry.title)} key={j} className="ministry-lrg-tag">
                                        <div className="tag-img"><img src={this.checklogo(ministry.logo)} alt="minstry icon"/></div>
                                        <div className="tag-info">
                                            <div className="tag-title">{ministry.title}</div>
                                            {ministry.subSections.length > 0 && <div className="tag-subsection">{ministry.subSections[0]}</div>}
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </section>                
                    )             
                    : <div className="loader-container"><div className="hm-spinner" /></div> }   
            </div>    
        );        
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        this.loadMinistries();
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
            ret = title.replace(/([&\/\\()])/g,"_").split(' ').join("").toLowerCase();
        }
        catch(ex){
            console.log("error setting url: ", ex);
            ret = "";
        }
        return ret;
    }

    loadMinistries(){
        var self = this;
        try {
            fetch(this.props.rootPath + "/api/getAllMinistries")
            .then(function(response) {
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                self.setState({ ministryList: data.results});
            });
        }
        catch(ex){
            console.log(" Error loading announcements: ",ex);
        }
    }
}

class MinistryInd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ministryComponent: null,
            ministryImgs:{
                "10":"classLeaders.JPG",
                "deaconessboard":"deaconess.JPG",
                "greetersministry":"greeters.JPG",
                "menofvarick":"mensMinistry.JPG",
                "14":"multiMedia.JPG",
                "progressiveclub":"progressiveClub.JPG",
                "stewardboard":"stewardBoard.JPG",
                "trusteeboard":"trusteeBoard.JPG",
                "16":"ushers.JPG",
                "womenofzion":"womensMinistry.JPG",
                "18":"ministrysociety.JPG",
                "christianeducationdepartment":"christianEdu.JPG",
                "youngadultmissionarysociety_yams_":"youngadult.JPG"
            }
        }

        this.checklogo = this.checklogo.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
        this.getPhoto = this.getPhoto.bind(this);
    }

    render(){        
        return(
            <div className="site-page indministry">
                <section className="sub-nav-card c1">
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                    </div>

                    <div className="tag-nav-container">
                        <Link to="/ministries" className="ministry-tag all">
                            <div className="all-container">
                                <div className="tag-img"><i className="fas fa-arrow-left"></i></div>
                                <div className="tag-info"><div className="tag-title">Return To Ministry List</div></div>
                            </div>
                        </Link>

                        <div className="sibling-container">
                            {this.state.ministryComponent && this.state.ministryComponent.siblings ? this.state.ministryComponent.siblings.map((ministry,j) =>
                                <Link to={"/ministries/" + this.getUrl(ministry.title)} className="ministry-tag" key={j} onClick={() => this.reloadPage(ministry.title)}>
                                    <div className="tag-img"><img src={this.checklogo(ministry.logo)} alt="minstry icon"/></div>
                                    <div className="tag-info">
                                        <div className="tag-title">{ministry.title}</div>
                                        {ministry.subSections.length > 0 && <div className="tag-subsection">{ministry.subSections[0]}</div>}
                                    </div>
                                </Link>
                            ) : <span></span>}
                        </div>
                    </div>
                </section>
                {this.state.ministryComponent ? 
                    <span>
                        <section className="body-section ministry-title">
                            <div className="ministry-individual">
                                <div className="individual-img"><img src={this.checklogo(this.state.ministryComponent.logo)} alt="minstry icon"/></div>
                                <div className="individual-info">
                                    <div className="individual-title">{this.state.ministryComponent.title}</div>
                                    {this.state.ministryComponent.subSections.length > 0 && <div className="individual-subsection">{this.state.ministryComponent.subSections[0]}</div>}
                                </div>
                            </div>
                        </section>

                        <section className="body-section ministry-mission">
                            <h2 className="font-title1">Our Mission</h2>
                            <p>{this.state.ministryComponent.mission}</p>
                        </section>

                        <section className="body-section ministry-content notched-top">
                            {/* Leadership*/}
                            <div className="basic-section">
                                <div className="basic-img"><img src={this.getPhoto(1)} alt="ministry leadership img"/></div>
                                <div className="basic-content">
                                    <h2 className="font-title1">Leadership</h2>
                                    <div className="leadership-container">
                                        {this.state.ministryComponent.leadership.map((leader,i) =>
                                            <div className="leader-info" key={i}>
                                                <div className="leader-name">{leader.name}</div>
                                                <div className="leader-position">{leader.title}</div>
                                                <a href={"mailto:"+leader.email} className="leader-email">{leader.email}</a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Membership*/}
                            <div className="basic-section flip">
                                <div className="basic-img"><img src={this.getPhoto(2)} alt="ministry membership img"/></div>
                                <div className="basic-content">
                                    <h2 className="font-title1">Membership</h2>
                                    <div className="membership-container">{this.state.ministryComponent.membership}</div>
                                </div>
                            </div>
                            {/* Goals*/}
                            <div className="basic-section">
                                <div className="basic-img"><img src={this.getPhoto(3)} alt="ministry goals img"/></div>
                                <div className="basic-content">
                                    <h2 className="font-title1">Goals</h2>
                                    <div className="goals-container">
                                        <ul className="fa-ul">
                                            {this.state.ministryComponent.goals.map((goal,i) =>
                                                <li key={i}><span className="fa-li" ><i className="fas fa-check"></i></span>{goal}</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="body-section notched-top light ministry-activities">
                            <h2 className="font-title1">Our Activities</h2>
                            
                            <div className="activity-center">
                                {this.state.ministryComponent.activities.map((activity,i) =>
                                    <div className="activity-item" key={i}>
                                        <div className="item-title">{activity.title}</div>
                                        <div className="item-description">{activity.description}</div>
                                    </div>
                                )}
                            </div>
                        </section>
                    </span>
                : <div className="loader-container"><div className="hm-spinner" /></div> }
                }
            </div>            
        );
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        this.loadMinistry(this.props.ministryId);
    }

    getPhoto(imgId){
        var ret = "";
        try {
            if(imgId == 1){
                var minID = this.props.ministryId.toLowerCase();
                if(minID in this.state.ministryImgs){
                    ret = '/images/'+this.state.ministryImgs[minID];
                }
                else {
                    ret = ministryImg1;
                }
            }
            else if(imgId == 2){
                ret = ministryImg2;
            }
            else if(imgId == 3){
                ret = ministryImg3;
            }
        }
        catch(ex){

        }
        return ret;
    }

    loadMinistry(mId){
        var self = this;
        try {
            var postData = {"ministryId": mId};

            axios.post(this.props.rootPath + "/api/getIndMinistry", postData, {'Content-Type': 'application/json'})
            .then(function(response) {
                self.setState({ ministryComponent: response.data.results});
            });
        }
        catch(ex){
            console.log(" Error loading announcements: ",ex);
        }
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
            ret = title.replace(/([&\/\\()])/g,"_").split(' ').join("").toLowerCase();
        }
        catch(ex){
            console.log("error setting url: ", ex);
            ret = "";
        }
        return ret;
    }

    reloadPage(title){
        var titleId = this.getUrl(title);
        var newUrl = "/ministries/" + titleId;
        window.location = newUrl;
        window.scrollTo(0, 0);
        this.loadMinistry(titleId);
    }
}

export default Ministries;