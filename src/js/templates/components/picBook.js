import React, { Component } from 'react';

class PicBook extends Component{
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
            activePage:{},
            pages:[]
        }
        this.navigatePages = this.navigatePages.bind(this);
    } 

    render(){        
        return(
            <div className="picBook">
                <div className={"book-container " + this.props.side + " "+ this.props.colorclass}>
                    <div className="content-section">
                        <div className="content-img">
                            <span className={"half-tablet content "+ this.props.side}>
                                <div className="content-area">
                                    <img src={this.state.activePage.pictureLoc} className="tablet-img" alt="picbook img"/>
                                </div>
                            </span>
                        </div>

                        <div className="content-text">
                            <div className="info">
                                <h2>{this.state.activePage.title}</h2>
                                <p>{this.state.activePage.text}</p>
                            </div>

                            <div className="controls">
                                { this.state.activeIndex > 0 && 
                                    <div className="fill-btn" onClick={() => this.navigatePages(-1)}><i className="fas fa-caret-left"></i> <span>Previous</span></div>
                                }
                                { (this.state.activeIndex +1) < this.state.pages.length &&
                                    <div className="fill-btn" onClick={() => this.navigatePages(1)}><span>Next</span> <i className="fas fa-caret-right"></i></div>
                                }
                                <div className="pageNum"><div className="pageNum-container">{this.state.activeIndex + 1} / {this.state.pages.length}</div></div>
                            </div>
                        </div>            
                    </div>
                </div>
            </div>  
        );        
    }

    componentDidMount(){
        let self = this;        
        try {
            self.setState({ activeIndex:0, activePage:this.props.pages[0], pages: this.props.pages});
        }
        catch(ex){
            console.log("Error: ",ex);
        }
    }

    navigatePages(direction){
        var self = this;
        try {
            var newLoc = this.state.activeIndex + direction;
            if(newLoc >= 0 && newLoc < this.state.pages.length ){                
                self.setState({ activeIndex:newLoc, activePage:this.state.pages[newLoc]});
            }
        }
        catch(ex){
            console.log("Error navigating to page: ", ex);
        }
    }
}

export default PicBook;