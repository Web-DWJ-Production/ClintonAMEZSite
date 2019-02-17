import React, { Component } from 'react';

import backImg from "../../assets/img/siteMedia/group4.jpg";

class OurStaff extends Component{
    constructor(props) {
        super(props);

        this.state = {
            colorClass:["", "c2-mid",""],
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
            <div class="site-page our-staff">
                <section class="title-card">
                    <h1 class="font-title1">Our Clergy</h1>
                    <div class="back-img">
                        <div class="cover c3c2"></div>
                        <img src={backImg} />
                    </div>
                </section>
                
                {this.state.staffList.map((team,i) => 
                    <section class={"body-section staffList notched-top " + this.state.colorClass[i]} key={i}>                    
                        <div class="staffTeamContainer">
                            <div class="content-container">
                                <h2>{team.name}</h2>
                                {team.members.map((member,j) =>
                                    <div class="teamMember" key={j}>
                                        <div class="member-name">{member.name}</div>
                                        <div class="member-title">{member.title}</div>
                                    </div> 
                                )}
                            </div>
                        </div>                   
                    </section>    
                 )} 
            </div>    
        );        
    }

    componentDidMount(){
        //let self = this;        
    }
}

export default OurStaff;