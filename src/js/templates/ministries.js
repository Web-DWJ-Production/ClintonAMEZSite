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

        this.state = {}
    } 

    render(){        
        return(
            <div class="site-page ministries">
                <section class="title-card c1">
                    <h1 class="font-title1">Ministries</h1>
                    <div class="back-img">
                        <div class="cover c3c2"></div>
                        <img src={backImg} />
                    </div>
                </section>
            </div>    
        );        
    }

    componentDidMount(){}
}

export default Ministries;