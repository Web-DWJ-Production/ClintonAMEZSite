import React, { Component } from 'react';
import PicBook from './components/picBook';

/* Images */
/* Story 1 */
import s1I1 from "../../assets/img/tmpMedia/c1.jpg";
import s1I2 from "../../assets/img/tmpMedia/Clinton_2012.jpg";
import s1I3 from "../../assets/img/tmpMedia/c2.jpg";
import s1I4 from "../../assets/img/tmpMedia/c3.jpg";
import s1I5 from "../../assets/img/tmpMedia/c4.jpg";

/* Story 2 */
import s2I1 from "../../assets/img/tmpMedia/c9.jpg";
import s2I2 from "../../assets/img/tmpMedia/c8.jpg";
import s2I3 from "../../assets/img/tmpMedia/c7.jpg";
import s2I4 from "../../assets/img/tmpMedia/c6.jpg";
import s2I5 from "../../assets/img/tmpMedia/c5.jpg";
import s2I6 from "../../assets/img/tmpMedia/c4.jpg";

class OurHistory extends Component{
    constructor(props) {
        super(props);

        this.state = {
            story1:[
                {title:"", text:'The African Methodist Episcopal Zion Connection is an international Christian denomination. Its main roots stem from the founding of the Methodist denomination in England by John Wesley, a priest in the Anglican Church (Church of England) in 1738. Wesley led a group of people who believed the Church should make greater efforts to reach the poor and working class. Because of their structured and methodical forms of services and activities, their associates deridingly called them "Methodist."', pictureLoc:s1I1},
                {title:"", text:'In 1766, three lay Methodists began missionary work in the American Colonies. Black freemen and slaves were included among the early Methodist converts. Because Methodists and Baptists were willing to ordain Blacks as preachers, the number of Blacks in these two denominations grew rapidly to about one-fourth of these denominations by 1797.', pictureLoc:s1I2},
                {title:"", text:'Whites in some congregations felt the role of Blacks should be subordinate and insisted on segregating the congregation, placing Blacks in the balcony, having them to receive the sacraments last, and restricting their participation in members’ meetings. The dissatisfaction with these practices led to the desire to separate, and with the help of liberal members of the congregations they formed three separatists movements, one of which resulted in the formation of African Methodist Episcopal Zion Church.', pictureLoc:s1I3},
                {title:"", text:'The African Methodist Episcopal Zion Church was organized in 1796 by James Varick and others in New York City out of the John Street Methodist Episcopal Church, which had Black members as early as 1765. The group was granted permission from Bishop Francis Asbury to hold their separate meetings. In the fall of 1800 they completed and dedicated a church in New York City.', pictureLoc:s1I4},
                {title:"", text:'The black church maintained cooperative relationships with the white Methodist Church, but in 1820 this cooperation failed. The Zion members joined with separate black congregations in other cities; in 1821 they held an annual conference and elected James Varick as their first bishop. A form of Discipline was selected which differs only slightly from that of the Methodist Episcopal Church.', pictureLoc:s1I5}
            ],
            story2:[
                {title:"", text:'Clinton Church was founded by a group of freed slaves in 1867 who, after their emancipation, had worshipped in the basement of the Jerusalem Methodist Episcopal Church. Their dissatisfaction with this arrangement led them to find a place of their own – a log cabin on the north corner of Wood Lane and Washington Street in Rockville.', pictureLoc:s2I1},
                {title:"", text:'Reverend Charles E. Pipkins, became the first pastor of the newly organized African Methodist Episcopal Zion Church, which eventually became Clinton A.M.E. Zion Church – named in honor of Bishop George Wylie Clinton. The original founders were Reverend Pipkins and his wife, Margaret, Raymond Baine, Hezekiah and Ann Busey, Nace Butler, Isaac and Charlotte Johnson, Andrew Mason, Benjamin and Ann Smith, Milton Smith, Solomon Williams and Ellen Wood.', pictureLoc:s2I2},
                {title:"", text:'Clinton’s first permanent structure was built in 1870 on the north side of Middle Lane. Ground breaking services at the present Westmore and Elizabeth Avenues site were held on May 27, 1956. On Sunday, October 15, 1956, Reverend Morris F. Wallace led the congregation to their new place of worship. The growth of Clinton was the impetus for the most recent expansion effort.', pictureLoc:s2I3},
                {title:"", text:'Construction of the new sanctuary began in 1989 and the newly renovated edifice was dedicated on Sunday, May 13, 1990. The church has been served by more than 37 pastors in its long history. In June 2009, The Reverend T. Kenneth Venable, was appointed to Clinton. Reverend Venable is a graduate of the School of Theology, Virginia Union University.', pictureLoc:s2I4},
                {title:"", text:'The history of Clinton African Methodist Episcopal Zion Church is proud and glorious one. We draw upon the experiences in our history as the foundation for our understanding of Christianity and discipleship.', pictureLoc:s2I5},
                {title:"", text:'It is by faith and God’s divine providence that we are able to serve our community, our church and humankind. We understand ministry to be telling the story of God’s action in the world through Jesus Christ. Therefore, we are steadfastly moving towards equipping ourselves for ministry – for we must know the story of Jesus Christ in order to proclaim the story.', pictureLoc:s2I6}
            ]
        }
    } 

    render(){        
        return(
            <div className="site-page our-history">
                <section className="title-card">
                    <h1 className="font-title1">Our History</h1>
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                    </div>
                </section>
                
                <section className="body-section churchHistory notched-top">
                    <h1 className="section-title font-title1">The AME Zion Church</h1>
                    <PicBook pages={this.state.story1} side="right" colorclass="color3"></PicBook>
                </section>  

                <section className="body-section localHistory c2-mid notched-top">
                    <h1 className="section-title font-title1">Our Local Church</h1>
                    <PicBook pages={this.state.story2} side="left" colorclass="colorg"></PicBook>                    
                </section>  
            </div>   
        );        
    }

    componentDidMount(){window.scrollTo(0, 0);}
}

export default OurHistory;