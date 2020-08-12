import React, { Component } from 'react';
import { Link } from "react-router-dom";

import SbEditable from 'storyblok-react';
import StoryblokService from '../utils/storyblok.service';

import backImg from "../../assets/img/siteMedia/ministry1.jpg";
import amezLogo from "../../assets/img/logos/ame_zion_logo.png";

import ministryImg1 from "../../assets/img/siteMedia/leadership1.jpg";
import ministryImg2 from "../../assets/img/siteMedia/group7.jpg";
import ministryImg3 from "../../assets/img/siteMedia/child1.jpg";
import ministryImg4 from "../../assets/img/siteMedia/ministryImg4.jpg";
import ministryImg5 from "../../assets/img/siteMedia/ministryImg5.jpg";
import ministryImg6 from "../../assets/img/siteMedia/ministryImg6.jpg";
import ministryImg7 from "../../assets/img/siteMedia/ministryImg7.jpg";
import ministryImg8 from "../../assets/img/siteMedia/ministryImg8.jpg";
import ministryImg9 from "../../assets/img/siteMedia/ministryImg9.jpg";
import ministryImg10 from "../../assets/img/siteMedia/ministryImg10.jpg";
import ministryImg11 from "../../assets/img/siteMedia/ministryImg11.jpg";

const stb = new StoryblokService();

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

        this.loadMinistries = this.loadMinistries.bind(this);
        this.checklogo = this.checklogo.bind(this);
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

    loadMinistries(page){
        var ret = [];

        try {
            var tmpList = {};
            
            if(page.data.stories){
                for(var i = 0; i < page.data.stories.length; i++){
                    var item = page.data.stories[i];
                    if(tmpList[item.content.section]){
                        tmpList[item.content.section].push(item);
                    }
                    else if(item.content.section && item.content.section.length > 0){
                        tmpList[item.content.section] = [item];
                    }
                }
                
                Object.keys(tmpList).forEach(function(item){
                    ret.push({ sectionTitle: item, list: tmpList[item] });
                });

                ret.sort((a, b) => (a.sectionTitle > b.sectionTitle) ? 1 : -1);
            }          
        }
        catch(ex){
            console.log("Error loading ministries: ",ex);
        }

        if(ret.length > 0 ){
            this.setState({ ministryList: ret });
        }  
    }

    componentDidMount(){
        var self = this;
        try {
            window.scrollTo(0, 0);
            stb.initEditor(this);
            stb.getInitialParamProps({"query":"ministries"}, 'cdn/stories', {starts_with: 'ministries', per_page: 40},function(page){
                self.loadMinistries(page);
            });
        }
        catch(ex){
            console.log(" Error Loading data: ",ex);
        }  
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
                        <section className={"body-section notched-top" + (i%2===1? " c3" : "")} key={i}>
                            <h1 className="font-title1">{ msection.sectionTitle }</h1>
                            <div className="ministry-lrg-container">
                                {msection.list.map((ministry,j) =>
                                    <Link to={"/ministries/" + ministry.slug} key={j} className="ministry-lrg-tag">
                                        <div className="tag-img"><img src={this.checklogo(ministry.content.icon)} alt="minstry icon"/></div>
                                        <div className="tag-info">
                                            <div className="tag-title">{ministry.content.name}</div>
                                            {ministry.content.smallgroup && <div className="tag-subsection">{ministry.content.smallgroup}</div>}
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
}

class MinistryInd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ministryComponent: null,
            siblings: [],
            noData: false,
            imgList:{ 
                section1:[ministryImg1, ministryImg5, ministryImg6, ministryImg7],
                section2:[ministryImg2, ministryImg4, ministryImg8, ministryImg11],
                section3:[ministryImg3, ministryImg9, ministryImg10]
            }
        }

        this.checklogo = this.checklogo.bind(this);
        this.loadMinistry = this.loadMinistry.bind(this);
        this.loadSiblings = this.loadSiblings.bind(this);
        this.getPhoto = this.getPhoto.bind(this);
    }

    loadSiblings(subsection){
        var self = this;
        try {
            if(subsection){
                stb.getInitialParamProps({"query":"ministries"}, 'cdn/stories', {filter_query: { smallgroup: { "in": subsection } }, per_page: 15},function(page){
                    if(page.data.stories){ 
                        var tmpList = page.data.stories.map(function(item){ return { name: item.name, slug: item.slug, smallgroup: item.content.smallgroup, icon: item.content.icon }});
                        self.setState({ siblings: tmpList });
                    }
                });
            }            
        }
        catch(ex){
            console.log(" [Error] loading siblings");
        }
    }

    loadMinistry(page){
        var self = this;
        try {
            if(page.data.story.content && page.data.story.content.name){
                this.setState({ ministryComponent: page.data.story });
                if(page.data.story.content.smallgroup) {
                    self.loadSiblings(self.state.ministryComponent.content.smallgroup);
                } 
            }
            else { 
                this.setState({ noData: true });
            }
        }
        catch(ex){
            console.log("Error Loading Individual Ministry: ",ex);
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

    getPhoto(imgId){
        var ret = "";
        try {
            var tmpList = [];
            switch(imgId){
                case 1:
                    tmpList = this.state.imgList.section1;
                    break;
                case 2:
                    tmpList = this.state.imgList.section2;
                    break;
                case 3:
                    tmpList = this.state.imgList.section3;
                    break;
                default:
                    break;
            }

            let rand = Math.random() * tmpList.length;
            ret = tmpList[Math.floor(rand)];
        }
        catch(ex){
            console.log("Error Getting Photo: ", imgId, " : ", ex);
        }
        return ret;
    }

    componentDidMount(){
        var self = this;
        try {
            window.scrollTo(0, 0);
            stb.initEditor(this);
            stb.getInitialProps({"query":"ministries"}, 'cdn/stories/ministries/' + self.props.ministryId, function(page){              
                self.loadMinistry(page);
            });
        }
        catch(ex){
            console.log(" Error Loading data: ",ex);
        }  
    }

    render(){        
        return(
            <div className="site-page indministry">
                <section className="sub-nav-card c1">
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                    </div>

                    <div className="tag-nav-container">
                        <div className="tag-sub-container">
                            <Link to="/ministries" className="ministry-tag all">
                                <div className="all-container">
                                    <div className="tag-img"><i className="fas fa-arrow-left"></i></div>
                                    <div className="tag-info"><div className="tag-title">Return To Ministry List</div></div>
                                </div>
                            </Link>
                        </div>

                        <div className="sibling-container">
                            {this.state.siblings.map((sibling, i) => 
                                <a href={"/ministries/"+sibling.slug} className="sibling-tag" key={i}>
                                    <div className="sibling-img"><img src={this.checklogo(sibling.icon)} alt={sibling.name} /></div>
                                    <div className="sibling-name">{ sibling.name }</div>
                                </a>
                            )}
                        </div>
                    </div>
                </section>
                {this.state.ministryComponent ? 
                    <SbEditable content={this.state.ministryComponent}>
                    <span>
                        <section className="body-section ministry-title">
                            <div className="ministry-individual">
                                <div className="individual-img"><img src={this.checklogo(this.state.ministryComponent.content.icon)} alt="minstry icon"/></div>
                                <div className="individual-info">
                                    <div className="individual-title">{this.state.ministryComponent.content.name}</div>
                                    {this.state.ministryComponent.content.smallgroup && <div className="individual-subsection">{this.state.ministryComponent.content.smallgroup}</div>}
                                </div>
                            </div>
                        </section>

                        <section className="body-section ministry-mission">
                            <h2 className="font-title1">Our Mission</h2>
                            <p>{this.state.ministryComponent.content.mission}</p>
                        </section>

                        <section className="body-section ministry-content notched-top">
                            {/* Leadership*/}
                            <div className="basic-section">
                                <div className="basic-img"><img src={this.getPhoto(1)} alt="ministry leadership img"/></div>
                                <div className="basic-content">
                                    <h2 className="font-title1">Leadership</h2>
                                    <div className="leadership-container">
                                        {this.state.ministryComponent.content.leadership.map((leader,i) =>
                                            <div className="leader-info" key={i}>
                                                <div className="leader-name">{leader.name}</div>
                                                <div className="leader-position">{leader.position}</div>
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
                                    <div className="membership-container">{this.state.ministryComponent.content.membership}</div>
                                </div>
                            </div>
                            {/* Goals*/}
                            <div className="basic-section">
                                <div className="basic-img"><img src={this.getPhoto(3)} alt="ministry goals img"/></div>
                                <div className="basic-content">
                                    <h2 className="font-title1">Goals</h2>
                                    <div className="goals-container">
                                        <ul className="fa-ul">
                                            {this.state.ministryComponent.content.goals.map((goal,i) =>
                                                <li key={i}><span className="fa-li" ><i className="fas fa-check"></i></span>{goal.goal}</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </span>
                    </SbEditable>
                : <div className="loader-container"><div className="hm-spinner" /></div> }
            </div>                   
        );
    }
}

export default Ministries;