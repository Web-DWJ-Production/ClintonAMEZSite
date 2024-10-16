import React, { Component } from 'react';
import SbEditable from 'storyblok-react'
// import marked from 'marked'

class CarouselImgCard extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    }

    body(text) {
        var rawMarkup = "";
        try {
            if(text) {
                rawMarkup = text; // marked(text);
            }
        }
        catch(ex){
            console.log("Error getting body Text: ",ex);
        }
        return { __html:  rawMarkup};
    }

    render(){       
        var cardItem = (this.props.blok ? this.props.blok : {});

        return(
            <SbEditable content={cardItem}>
                <div className="carousel-card img-card"> 
                    <div className="img-card-container">                       
                        <div className="img-container"><img src={cardItem.image} className="carousel-card-img" alt="" /></div>
                        <div className="card-content">
                            <div className="content-title">{cardItem.title}</div>
                            <div className='content-line' dangerouslySetInnerHTML={this.body(cardItem.text)}></div>                      
                        </div>
                    </div>
                </div> 
            </SbEditable>   
        );        
    }

    componentDidMount(){}
}

export default CarouselImgCard;