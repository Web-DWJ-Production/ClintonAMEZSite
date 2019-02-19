//https://reacttraining.com/react-router/web/example/route-config
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CSSTransitionGroup } from 'react-transition-group';

/* Components */
import Footer from './templates/footer';
import Home from './templates/home';
import AboutUs from './templates/aboutUs';
import OurHistory from './templates/ourHistory';
import OurClergy from './templates/ourClergy';
import OurService from './templates/ourService';
import PastorsPage from './templates/pastorsPage';
import Ministries from './templates/ministries';
import GetConnected from './templates/getConnected';
import ContactUs from './templates/contactUs';
import Gallery from './templates/gallery';

import UC from './templates/uc';
import NoMatch from './templates/404';

/* Styles */
import "../css/app.less";

/* Images */
import logoW from "../assets/img/logos/Clinton_logoW.png";

const routes = [
    { title:"about us", path:"/aboutUs", component:AboutUs, subPages:[{ title:"our history",path:"/aboutUs/ourHistory", component:OurHistory},{title:"our clergy", path:"/aboutUs/ourClergy", component:OurClergy},{ title:"service information", path:"/aboutUs/ourService", component:OurService},{ title:"inside zion", external:true, path:"http://www.amez.org/"}]},
    { title:"pastors page", path:"/pastorsPage", component:PastorsPage},
    { title:"ministries", path:"/ministries", optionalPath:"/:ministryId?", component:Ministries},
    { title:"get connected", path:"/getConnected", component:GetConnected},
    { title:"gallery", path:"/gallery", component:Gallery},
    { title:"contact us", path:"/contactUs", component:ContactUs}  
];

const SiteRoutes = route => (
    <div> 
        {route.subPages ?        
            <span>
                <Route exact path={route.path} component={route.component}/>            
                {route.subPages.map((subroute, i) => <SiteRoutes key={i} {...subroute} />)}
            </span>           
            : <span><Route path={route.path + (route.optionalPath?route.optionalPath:"")} render={props => ( <route.component {...props} />)} /></span>
        }     
    </div>
);


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            additonalMenuDisplay: false,
            additonalMenu:[]
        };

        this.showAdditionalMenu = this.showAdditionalMenu.bind(this);
        this.hideAdditionalMenu = this.hideAdditionalMenu.bind(this);
    }

    render(){     
        return(
           <Router>
                <div className="app-body">
                    { /* HEADER */}                    
                    <div className="nav-header fixed-header" id="clintonHeader">
                        <div className="main-nav-container">
                            <div className="split-nav left">                                
                                <div className="navbar-header">
                                    <Link to="/" className="navbar-brand">                                        
                                        <img src={logoW} className="logo" alt="A.M.E. Zion Logo" />
                                    </Link>
                                </div>
                            </div>

                            <div className="split-nav right">                                
                                <div className="top-nav">
                                    <div className="text-container left-alight">
                                        <div className="scripture">"O magnify the Lord with me, and let us exalt his name together"</div>
                                    </div>
                                    <div className="nav-container right-align">            
                                        <div className="social-btn give"><i className="fas fa-dollar-sign"></i> <span>Give Online</span></div>                
                                        
                                        <div className="social-btn facebook" data-fa-transform="shrink-8"><i className="fab fa-facebook-f fa-fw"></i></div>
                                        <div className="social-btn twitter" data-fa-transform="shrink-8"><i className="fab fa-twitter fa-fw"></i></div>
                                    </div>
                                </div>

                                
                                <div className="bottom-nav">
                                    <div className="navbar-items full">
                                        {routes.map((route, i) =>
                                            <div className="nav-link" key={i} onMouseEnter ={() => this.showAdditionalMenu(route.subPages)} onMouseLeave={this.hideAdditionalMenu}>
                                                <Link to={route.path}>
                                                    <span>{route.title}</span> 
                                                    {(route.subPages && route.subPages.length > 0 ?
                                                        <span className="nav-more"><i className="fas fa-chevron-down"></i></span> 
                                                        : <span></span>)}
                                                </Link>
                                            </div>
                                        )}                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CSSTransitionGroup className="navslider" transitionName="navslide" transitionEnterTimeout={300} transitionLeaveTimeout={500}>
                            {(this.state.additonalMenuDisplay === true ?                         
                                <div className="additionalMenu" onMouseLeave={this.hideAdditionalMenu}>
                                    <div className="additionalContainer">
                                        {this.state.additonalMenu.map((item,i) => 
                                            <div className="add-nav-link" key={i}>
                                                {(item.external ?
                                                    <a href={item.path} target="_blank" rel="noopener noreferrer">{item.title}</a>
                                                    : <Link to={item.path}>{item.title}</Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                : null
                            )}
                        </CSSTransitionGroup>
                    </div>
                    
                    {/* Body*/}
                    <div className="body-container">
                        <Switch>
                            <Route exact path="/" component={Home} />                            
                            { routes.map((route, i) => <SiteRoutes key={i} {...route} />) }                            
                            <Route component={NoMatch} />                            
                        </Switch>        
                    </div>

                    {/* Footer */}
                    <Footer />
                </div>
           </Router>
        );
     }
  
     componentDidMount(){}

     showAdditionalMenu(menu){
         var self = this;
         try {             
              if(menu != null){
                self.setState({ additonalMenu: menu });
                self.setState({ additonalMenuDisplay: true});
              }
              else {
                self.setState({ additonalMenu: []});
                self.setState({ additonalMenuDisplay: false});
              }
         }
         catch(ex){
            console.log(" Error showing sub menu: ", ex);
         }
     }

     hideAdditionalMenu(e){
        var self = this;
        try {
            e = e || window.event;
            var x = e.clientX;
            var y = e.clientY;
            var elm = document.elementFromPoint(x,y);
            var inAdditionalMenu = elm.className.includes("additionalMenu"); 

            if(self.state.additonalMenuDisplay === true && !inAdditionalMenu){
                self.setState({ additonalMenu: []});
                self.setState({ additonalMenuDisplay: false});
            }
        }
        catch(ex){
            console.log(" Error hiding sub menu: ", ex);
        }
      }
}

export default App;