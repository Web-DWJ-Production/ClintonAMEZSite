import React, { Component } from 'react';

import backImg from "../../assets/img/tmpMedia/img3.jpg";
import amezLogo from "../../assets/img/logos/ame_zion_logo.png";

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
                    <section className={"body-section notched-top" + (i%2==1? " c3-mid" : "")}>
                        <h1 className="font-title1">{ msection.sectionTitle }</h1>
                        <div className="ministry-container">
                            {msection.list.map((ministry,j) =>
                                <a href="" className="ministry-tag">
                                    <div className="tag-img"><img src={this.checklogo(ministry.icon)} alt="minstry icon"/></div>
                                    <div className="tag-info">
                                        <div className="tag-title">{ministry.title}</div>
                                        {ministry.subSections.length > 0 && <div className="tag-subsection">{ministry.subSections[0]}</div>}
                                    </div>
                                </a>
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
}

class MinistryInd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ministryComponent: {
                title:"",
                defaultMedia:null,
                logo:null,
                leadership:[{name:"",title:"",email:""}],
                mission:"",
                section:"",
                subSections: [""],
                activities: [{name:"",description:""}],
                siblings: [{title:"", logo:"", subsections:[""]}],                
                gallery: [""]
            }
        }
    }

    render(){        
        return(
            <div class="site-page ministry">
                <section class="sub-nav-card c1">
                    <div class="back-img">
                        <div class="cover c3c2"></div>
                    </div>
                </section>
            </div>            
        );
    }

    componentDidMount(){}
}

export default Ministries;