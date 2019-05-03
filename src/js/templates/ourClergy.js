import React, { Component } from 'react';

import backImg from "../../assets/img/siteMedia/group4.jpg";

class OurStaff extends Component{
    constructor(props) {
        super(props);

        this.state = {
            colorClass:["", "light",""],
            staffList: [
                {"name":"Administrative Team", "members":[
                    {"name":"Ms. Jonice Adams & Ms. Donna Cawley", "title":"Co-Directors, Communication & Brand Management"},
                    {"name":"Mrs. Robin Avant Brown", "title":"Director, Special Events"},
                    {"name":"Mr. Ricky Capers", "title":"Treasurer"},
                    {"name":"Ms. Gina Snowden Harrell", "title":"Quarterly Conference Secretary"},
                    {"name":"Mr. Timothy K. Johnson", "title":"Director, Media & Technology"},
                    {"name":"Mrs. Cristina Palmer-Moore", "title":"Director, Scheduling & Space Management"},
                    {"name":"Ms. Sharon Tucker", "title":"Ministry of Kindness Steward"},
                    {"name":"Mrs. Verna Woodson", "title":"Financial Secretary"}
                ]},
                {"name":"Board Leadership", "members":[
                    {"name":"Mr. Felton Armstrong", "title":"Preacher's Steward & Chair or Steward Board"},
                    {"name":"Mr. Dwayne Holloway", "title":"Immediate Past Chair, Trustee Board"},
                    {"name":"Mrs. Alvanell Thompson", "title":"Leader of Leaders"}
                ]},
                {"name":"Clergy", "members":[
                  {"name":"Rev. Dr. E. Marie Johnson", "title":""},
                  {"name":"Rev. Deborah Johnson-Mosley", "title":""},
                  {"name":"Rev. Dr. Barbara Quinton", "title":""}
              ]}            
            ]
        }
    } 

    render(){        
        return(
            <div className="site-page our-staff">
                <section className="title-card">
                    <h1 className="font-title1">Our Clergy</h1>
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                        <img src={backImg} alt="clergy background img"/>
                    </div>
                </section>
                
                {this.state.staffList.map((team,i) => 
                    <section className={"body-section staffList notched-top " + this.state.colorClass[i]} key={i}>                    
                        <div className="staffTeamContainer">
                            <div className="content-container">
                                <h2>{team.name}</h2>
                                {team.members.map((member,j) =>
                                    <div className="teamMember" key={j}>
                                        <div className="member-name">{member.name}</div>
                                        <div className="member-title">{member.title}</div>
                                    </div> 
                                )}
                            </div>
                        </div>                   
                    </section>    
                 )} 
            </div>    
        );        
    }

    componentDidMount(){window.scrollTo(0, 0);}
}

export default OurStaff;