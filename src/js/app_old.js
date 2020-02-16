//https://reacttraining.com/react-router/web/example/route-config
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CSSTransitionGroup } from 'react-transition-group';
import { spring, AnimatedSwitch } from 'react-router-transition';

/* Components */
import Footer from './templates/footer';
//import Home from './templates/home';
import Home from './templates/home2';
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
  
function slide(val) {
    return spring(val, { stiffness: 125, damping: 16, });
}
  
const topBarTransitions = {
    atEnter: {  offset: -100 },
    atLeave: { offset: slide(-150) },
    atActive: { offset: slide(0) }
};

function mapStyles(styles) {
    return { opacity: styles.opacity, transform: 'translateY(${styles.offset}px)' };
}

const SiteRoutes = route => (
    <div> 
        {route.subPages ?        
            <span>
                <Route exact path={route.path} component={route.component} />            
                {route.subPages.map((subroute, i) => <SiteRoutes key={i} {...subroute} />)}
            </span>           
            : <span><Route path={route.path + (route.optionalPath?route.optionalPath:"")} render={props => ( <route.component {...props} />)} /></span>
        }     
    </div>
);

function MobileNav(props){
    return (
        <div className={"sidenav-container" + (props.sidebarOpen ? " active": "")}>
            <div className="nav-close" onClick={() => props.setSidebarDisplay(false)}><i className="fas fa-times"></i></div>
            <div className="sidenav-section">
                {routes.map((route, i) =>
                    <div className="route-page-container">
                        <Link className="sidenav-link" key={i} to={route.path}>{route.title}</Link>
                        <div className="sidenav-subcontainer">
                            {route.subPages && route.subPages.map((subItem,k) => 
                                <span className="sub-link" key={k}>
                                {(subItem.external ?
                                    <a href={subItem.path} target="_blank" key={k} rel="noopener noreferrer">{subItem.title}</a>
                                    : <Link key={k} to={subItem.path}>{subItem.title}</Link>
                                )}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="sidenav-section btn-section">
                <a href="https://giv.li/0euaiq" target="_blank" className="donate-btn">Donate</a>
                <div className="social-btn-container">
                    <a href="https://www.facebook.com/Clinton-African-Methodist-Episcopal-Zion-Church-344226358930084/" target="_blank" className="social-btn facebook" data-fa-transform="shrink-8"><i className="fab fa-facebook-f fa-fw"></i></a>
                    <a href="https://twitter.com/ClintonAMEZion" target="_blank" className="social-btn twitter" data-fa-transform="shrink-8"><i className="fab fa-twitter fa-fw"></i></a>
                </div>
            </div>
        </div>
    );
}


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            additonalMenuDisplay: false,
            additonalMenu:[]
        };

        this.showAdditionalMenu = this.showAdditionalMenu.bind(this);
        this.hideAdditionalMenu = this.hideAdditionalMenu.bind(this);
        this.setSidebarDisplay = this.setSidebarDisplay.bind(this);
    }

    render(){     
        return(
           <Router>
                <div className="app-body">
                    {/* Mobile Nav */}
                    <MobileNav setSidebarDisplay={this.setSidebarDisplay} sidebarOpen={this.state.sidebarOpen}/>
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
                                        <a href="https://giv.li/0euaiq" target="_blank" className="social-btn give"><i className="fas fa-dollar-sign"></i> <span>Give Online</span></a>                
                                        
                                        <a href="https://www.facebook.com/Clinton-African-Methodist-Episcopal-Zion-Church-344226358930084/" target="_blank" className="social-btn facebook" data-fa-transform="shrink-8"><i className="fab fa-facebook-f fa-fw"></i></a>
                                        <a href="https://twitter.com/ClintonAMEZion" target="_blank" className="social-btn twitter" data-fa-transform="shrink-8"><i className="fab fa-twitter fa-fw"></i></a>
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

                                <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={() => this.setSidebarDisplay(true)}>
                                    <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
                                </button>
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

      setSidebarDisplay(status) {
        this.setState({ sidebarOpen: status }, () =>{
            document.body.classList.toggle('noscroll', status);
        });
      }
}

export default App;