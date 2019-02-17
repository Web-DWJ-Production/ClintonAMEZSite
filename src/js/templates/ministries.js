import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import backImg from "../../assets/img/tmpMedia/img3.jpg";
import amezLogo from "../../assets/img/logos/ame_zion_logo.png";

import ministryImg1 from "../../assets/img/tmpMedia/c7.jpg";
import ministryImg2 from "../../assets/img/tmpMedia/c8.jpg";
import ministryImg3 from "../../assets/img/tmpMedia/c9.jpg";

class Ministries extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    } 

    render(){        
        return(
            <div>
               {(this.props.match.params.ministryId ? <MinistryInd ministryId={this.props.match.params.ministryId}/> : <MinistryAll />)}
            </div>    
        );        
    }

    componentDidMount(){}
}

class MinistryAll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ministryList:[
                {sectionTitle:"Section 1", list:[
                    {title:"Ministry 1", logo:null, subSections:["test subsection"]},
                    {title:"Ministry 2", logo:null, subSections:["test subsection"]},
                    {title:"Ministry 3", logo:null, subSections:["test subsection"]},
                    {title:"Ministry Long Name 4", logo:null, subSections:["test subsection"]},
                    {title:"Ministry 5", logo:null, subSections:["test subsection"]},
                    {title:"Ministry 6", logo:null, subSections:[]},
                    {title:"Ministry 7", logo:null, subSections:[]},
                    {title:"Ministry 8", logo:null, subSections:["test subsection"]},
                    {title:"Ministry Long Name 9", logo:null, subSections:[]}
                ]},
                {sectionTitle:"Section 2", list:[
                    {title:"Ministry 1", logo:null, subSections:["test subsection"]},
                    {title:"Ministry Long Name 2", logo:null, subSections:["test subsection"]},
                    {title:"Ministry 3", logo:null, subSections:["test subsection"]},
                    {title:"Ministry Long Name 4", logo:null, subSections:["test subsection"]},
                    {title:"Ministry 5", logo:null, subSections:["test subsection"]}
                ]},
                {sectionTitle:"Section 3", list:[
                    {title:"Ministry Long Name 1", logo:null, subSections:["test subsection"]},
                    {title:"Ministry 2", logo:null, subSections:["test subsection Long Name "]},
                    {title:"Ministry 3", logo:null, subSections:["test subsection"]},
                    {title:"Ministry 4", logo:null, subSections:["test subsection"]},
                    {title:"Ministry 5", logo:null, subSections:["test subsection"]},
                    {title:"Ministry 6", logo:null, subSections:[]},
                    {title:"Ministry 7", logo:null, subSections:[]},
                    {title:"Ministry Long Name 8", logo:null, subSections:["test subsection"]}
                ]}
            ]
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
                        <img src={backImg} />
                    </div>
                </section>
                {this.state.ministryList.map((msection,i) =>
                    <section className={"body-section notched-top" + (i%2==1? " c3-mid" : "")} key={i}>
                        <h1 className="font-title1">{ msection.sectionTitle }</h1>
                        <div className="ministry-container">
                            {msection.list.map((ministry,j) =>
                                <Link to={"/ministries" + this.getUrl(ministry.title)} key={j} className="ministry-tag">
                                    <div className="tag-img"><img src={this.checklogo(ministry.icon)} alt="minstry icon"/></div>
                                    <div className="tag-info">
                                        <div className="tag-title">{ministry.title}</div>
                                        {ministry.subSections.length > 0 && <div className="tag-subsection">{ministry.subSections[0]}</div>}
                                    </div>
                                </Link>
                            )}
                        </div>
                    </section>                
                )}                
            </div>    
        );        
    }

    componentDidMount(){}

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
            ret ="/"+title.replace(/([&\/\\()])/g,"_").split(' ').join("");
        }
        catch(ex){
            console.log("error setting url: ", ex);
            ret = "";
        }
        return ret;
    }
}

class MinistryInd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ministryComponent: {
                title:"Young Adults",
                logo:null,
                website:"http://yacmamez.org/",
                leadership:[{name:"Jay Greenman", title:"Chairperson", email:"j.greenman@gmail.com"},
                    {name:"Jill Greenman", title:"Treasurer", email:"jill.greenman@gmail.com"}    
                ],
                mission:"To foster the spiritual growth and development of our youth by working collaboratively with all adults in the church so that the joy of learning about Christ is a reward and the programs only serve as a benchmark of opportunities.",
                membership:"The Young Adults in Christian Ministries shall be composed of all young adults between the ages of 22 and 40 in the AME Zion denomination. However, allowances will be made on all levels for those whose life circumstances dictate a younger age that they are no longer youths.",
                subSections: ["Christian Education Department"],
                activities: [{title:"Youth Fellowship and Kingdom building", description:"Youth, ages 12-22 are provided exciting opportunities for bible study; monthly youth focused activities; liturgical dancing and participation in dynamic special seasonal programs and special programs for College Youth"}, {title:"Baltimore District Conferences and Workshops", description:""}],
                goals: ["Gain knowledge of the Christian tradition",
                    "Study the bible", "Attend worship services", "Set examples for Christian behavior",
                    "Provide church leadership", "Explore how to build a Christian community by participating in church activities and community service", "Grow in faith"],
                siblings: [
                    {title:"adults", logo:null, subSections:["Christian Education Department"]},
                    {title:"men of varick", logo:null, subSections:["Christian Education Department"]},
                    {title:"women of zion", logo:null, subSections:["Christian Education Department"]},
                    {title:"progressive club", logo:null, subSections:["Christian Education Department"]}
                ],                
                gallery: [""]
            }
        }

        this.checklogo = this.checklogo.bind(this);
        this.getUrl = this.getUrl.bind(this);
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
                                <div className="tag-img"><i class="fas fa-arrow-left"></i></div>
                                <div className="tag-info"><div className="tag-title">Return To Ministry List</div></div>
                            </div>
                        </Link>

                        <div className="sibling-container">
                            {this.state.ministryComponent.siblings.map((ministry,j) =>
                                <Link to={"/ministries" + this.getUrl(ministry.title)} className="ministry-tag" key={j}>
                                    <div className="tag-img"><img src={this.checklogo(this.state.ministryComponent.icon)} alt="minstry icon"/></div>
                                    <div className="tag-info">
                                        <div className="tag-title">{ministry.title}</div>
                                        {ministry.subSections.length > 0 && <div className="tag-subsection">{ministry.subSections[0]}</div>}
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                <section className="body-section ministry-title">
                    <div className="ministry-individual">
                        <div className="individual-img"><img src={this.checklogo(this.state.ministryComponent.icon)} alt="minstry icon"/></div>
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
                        <div className="basic-img"><img src={ministryImg1}/></div>
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
                        <div className="basic-img"><img src={ministryImg2}/></div>
                        <div className="basic-content">
                            <h2 className="font-title1">Membership</h2>
                            <div className="membership-container">{this.state.ministryComponent.membership}</div>
                        </div>
                    </div>
                    {/* Goals*/}
                    <div className="basic-section">
                        <div className="basic-img"><img src={ministryImg3}/></div>
                        <div className="basic-content">
                            <h2 className="font-title1">Goals</h2>
                            <div className="goals-container">
                                <ul className="fa-ul">
                                    {this.state.ministryComponent.goals.map((goal,i) =>
                                        <li key={i}><span class="fa-li" ><i className="fas fa-check"></i></span>{goal}</li>
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
            </div>            
        );
    }

    componentDidMount(){}

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
            ret ="/"+title.replace(/([&\/\\()])/g,"_").split(' ').join("");
        }
        catch(ex){
            console.log("error setting url: ", ex);
            ret = "";
        }
        return ret;
    }
}

export default Ministries;