import React, { Component } from 'react';
import backImg from "../../assets/img/tmpMedia/img3.jpg";

class Ministries extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    } 

    render(){        
        return(
            <div>
               {(this.props.match.params.ministryId ? <div>{this.props.match.params.ministryId}</div> : <MinistryAll />)}
            </div>    
        );        
    }

    componentDidMount(){
        //let self = this;        
    }
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
                    <section className={"body-section notched-top" + (i%2==1? " c2-mid" : "")}>
                        <h1 className="font-title1">{ msection.sectionTitle }</h1>
                        <div className="ministry-container">
                            {msection.list.map((ministry,j) =>
                                <a href="">
                                    <div className="tag-img"><img src={ministry.icon} alt="minstry icon"/></div>
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
}

export default Ministries;