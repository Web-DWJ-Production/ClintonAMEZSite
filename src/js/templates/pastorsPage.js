import React, { Component } from 'react';

/* Images */
import backImg from "../../assets/img/siteMedia/pastor6.jpg";
import pastorImg from "../../assets/img/siteMedia/pastor1.jpg";

class PastorsPage extends Component{
    constructor(props) {
        super(props);

        this.state = {}
    } 

    render(){        
        return(
            <div className="site-page our-pastor">
                <section className="title-card">
                    <h1 className="font-title1">Our Pastor</h1>
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                        <img src={backImg} alt="pastor background img"/>
                    </div>
                </section>
                
                <section className="body-section pastorInfo notched-top">
                    <h1 className="section-title">Alyce R. Walker Johnson, B.A., MPA, M.Div.</h1>

                    <div className="pastor-blog">
                        <div className="row headline">
                            <div className="church-img">
                                <img src={pastorImg} alt="pastor background img"/>
                            </div>
                            <div className="text">
                                <p className="txt">A native of Columbus, Ohio, Alyce Walker Johnson was appointed pastor of the historic Clinton African Methodist Episcopal Zion Church in September, 2016 by the Right Revered W. Darin Moore, Presiding Prelate of the Mid-Atlantic Episcopal District.  Prior to assuming the pastorate at Clinton, she served as the Executive Minister for Trinity A. M. E. Zion Church in Washington DC.  Rev. Walker Johnson has held leadership positions in church at the local, district and annual conference levels.  She has also served as a strategist and consultant for episcopal leaders, the Executive Board of the Women’s Home and Overseas Missionary Society (WHOMS), the Connectional Lay Council (CLC) and the Christian Education Department (CED). She is currently a member of the Management Review Team (MRT), a group of five business and strategic consultants advising the Restructuring Commission on ways to improve efficiency and effectiveness of Zion’s headquarters operations.</p>
                                <p className="txt">From August 2011 to April 2015, Rev. Alyce served as the Interim Chief Administrative Officer and  Chair’s Liaison for Transition and Governance the for the National Council of Negro Women, Inc. (NCNW) which is headquartered in Washington, DC.  In this position, she was responsible for NCNW’s day to day operations (Public Policy, National Programs, Membership, Finance, etc.), strategic planning and governance.</p>
                            </div>
                        </div>
                        <div className="row info">
                            <div className="txt">
                                <p>In 2005 Alyce founded Rhema Consulting, LLC which specializes in strategy, planning, change management, executive coaching and non-profit governance. Having spent more than twenty years in government and the non-profit sector, Alyce served as the Director of the HIV/AIDS Clinic at ECCO Family Health Center (Columbus, OH) and Vice President of Diversity (United Way of Central Ohio).  She spent ten years at what is now United Way Worldwide where she led the effort to re-think United Way’s mission, vision and strategy.  Responsible for corporate planning, budgeting and system design, Alyce was Senior Vice President of Strategy, Planning and Diversity and the National System Planning Officer when she concluded her service to United Way.
                                Today, a sought after preacher, teacher and lecturer, Alyce is privileged to work with government, non-profit organizations, corporations, faith-based organizations in the U.S., U.K., Africa and the Caribbean.
                                She is joyfully married to Timothy Kirk Johnson.  Together, they share their lives with two college students, Elijah and Ephraim, Santele (Philip Jarad) Taylor and their sons, Jaidan, Tyler and Cason and a large family and extended family.</p>
                            </div>
                        </div>
                    </div>
                </section>     
            </div>    
        );        
    }

    componentDidMount(){window.scrollTo(0, 0);}
}

export default PastorsPage;