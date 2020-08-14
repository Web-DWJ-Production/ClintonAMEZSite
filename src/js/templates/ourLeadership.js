import React, { Component } from 'react';
import SbEditable from 'storyblok-react';
import StoryblokService from '../utils/storyblok.service';

import backImg from "../../assets/img/siteMedia/group4.jpg";

const stb = new StoryblokService();

class OurLeadership extends Component{
    constructor(props) {
        super(props);

        this.state = {
            staffList: []
        }

        this.loadStaff = this.loadStaff.bind(this);
    } 

    render(){        
        return(
            <div className="site-page our-staff">
                <section className="title-card">
                    <h1 className="font-title1">Our Leadership</h1>
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                        <img src={backImg} alt="clergy background img"/>
                    </div>
                </section>
                
                {this.state.staffList.map((team,i) => 
                    <section className={"body-section staffList notched-top " + team.colorClass} key={i}>                    
                        <SbEditable content={team}>
                            <div className="staffTeamContainer">
                                <div className="content-container">
                                    <h2>{team.name}</h2>
                                    {team.members.map((member,j) =>
                                        <SbEditable content={member}>
                                            <div className="teamMember" key={j}>
                                                <div className="member-name">{member.name}</div>
                                                <div className="member-title">{member.title}</div>
                                            </div> 
                                        </SbEditable>
                                    )}
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
            //console.log(page.data.story.content.body);
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
        stb.getInitialProps({"query":"home"}, 'cdn/stories/aboutus/ourleadership', function(page){
            self.loadStaff(page);
        });
    }
}

export default OurLeadership;