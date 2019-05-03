import React, { Component } from 'react';

class UC extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    } 

    render(){        
        return(
            <div className="uc-container">
               <h1>Under Construction</h1>
            </div>    
        );        
    }

    componentDidMount(){
        //let self = this;        
    }
}

export default UC;