import React, { Component } from 'react';
import SbEditable from 'storyblok-react';
import StoryblokService from '../utils/storyblok.service';

import backImg from "../../assets/img/siteMedia/group4.jpg";
import callBack from "../../assets/img/siteMedia/Back09-mini.png";

const stb = new StoryblokService();

class OurClergy extends Component{
    constructor(props) {
        super(props);

        this.state = {
            staffList: []
        }

        this.loadStaff = this.loadStaff.bind(this);
    } 

    render(){        
        return(
            <div className="site-page our-staff our-clergy">
                <section className="title-card">
                    <h1 className="font-title1">Our Clergy</h1>
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                        <img src={backImg} alt="clergy background img"/>
                    </div>
                </section>
                
                {this.state.staffList.map((team,i) => 
                    <section className={"body-section clergyList notched-top " + team.colorClass} key={i}>                    
                        <div className="back-img"><img src={callBack} alt="background" /></div>
                        
                        <SbEditable content={team}>
                            <div className="clergyContainer">
                                <div className="clergy-img"><img src={team.image} alt="clergy group"/></div>
                                <div className="content-container">
                                    {team.members.map((member,j) =>
                                        <SbEditable content={member} key={j}>
                                            <div className="teamMember" key={j}>
                                                <div className="member-name">{member.name}</div>
                                                <div className="member-title">{member.title}</div>
                                            </div> 
                                        </SbEditable>
                                    )}

                                    <div className="teamMember special" >
                                        <div className="member-name">Rev. Alyce R. Walker Johnson</div>
                                        <div className="member-title">Pastor & Chief Servant</div>
                                    </div> 
                                </div>
                            </div>  
                        </SbEditable>                 
                    </section>    
                 )} 
            </div>    
        );        
    }

    loadStaff(page){
        try {
            if(page.data.story.content.body){
                this.setState({ staffList: page.data.story.content.body });
            }
        }
        catch(ex){
            console.log("Error Loading Staff List: ",ex);
        }
    }

    componentDidMount(){
        var self = this;
        window.scrollTo(0, 0);
        stb.initEditor(this);
        stb.getInitialProps({"query":"home"}, 'cdn/stories/aboutus/ourclergy', function(page){
            self.loadStaff(page);
        });
    }
}

export default OurClergy;