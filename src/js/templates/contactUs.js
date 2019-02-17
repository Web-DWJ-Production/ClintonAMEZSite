import React, { Component } from 'react';

import backImg from "../../assets/img/tmpMedia/img3.jpg";

class ContactUs extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    } 

    render(){        
        return(
            <div class="site-page contact-us">
                <section class="title-card c1">
                    <h1 class="font-title1">Contact Us</h1>
                    <div class="back-img">
                        <div class="cover c3c2"></div>
                        <img src={backImg} />
                    </div>
                </section>
            </div>
        );        
    }

    componentDidMount(){
        //let self = this;        
    }
}

export default ContactUs;