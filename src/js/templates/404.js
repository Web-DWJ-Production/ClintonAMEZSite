import React, { Component } from 'react';

class NoMatch extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    } 

    render(){        
        return(
            <div className="us-container">
               <h1>404</h1>
            </div>    
        );        
    }

    componentDidMount(){
        //let self = this;        
    }
}

export default NoMatch;