import React, { Component } from 'react';

class Home extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    } 

    render(){        
        return(
            <div className="uc-container">
               <h1>Home</h1>
            </div>    
        );        
    }

    componentDidMount(){
        //let self = this;        
    }
}

export default Home;