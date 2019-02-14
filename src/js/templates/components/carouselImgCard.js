import React, { Component } from 'react';

class CarouselImgCard extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    }

   

    render(){        
        return(
            <div className="carousel-card img-card"> 
                <div className="img-card-container">                       
                    <div className="img-container"><img src={this.props.item.media} className="carousel-card-img" alt="" /></div>
                    <div className="card-content">
                        <div className="content-title">{this.props.item.title}</div>
                        {this.props.item.lines.map((line,i) =>
                            <div className={'content-line ' + line.size + (line.bold === true ? ' bold': '')} key={i}>{line.text}</div>
                        )}                        
                    </div>
                </div>
            </div>    
        );        
    }

    componentDidMount(){
        //let self = this;        
    }
}

export default CarouselImgCard;