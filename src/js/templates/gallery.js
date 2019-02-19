import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

import backImg from "../../assets/img/tmpMedia/img3.jpg";

/* Temp Images */
import img1 from '../../assets/img/tmpMedia/c1.jpg';
import img2 from '../../assets/img/tmpMedia/c2.jpg';
import img3 from '../../assets/img/tmpMedia/c3.jpg';
import img4 from '../../assets/img/tmpMedia/c4.jpg';
import img5 from '../../assets/img/tmpMedia/c5.jpg';
import img6 from '../../assets/img/tmpMedia/c6.jpg';

const tmpGallery = [img1,img2,img3,img4,img5,img6,
                    img1,img2,img3,img4,img5,img6,
                    img1,img2,img3,img4,img5,img6,
                    img1,img2,img3,img4,img5,img6,
                    img1,img2,img3,img4,img5,img6];

class Gallery extends Component{
    constructor(props) {
        super(props);

        this.state = {
            selected:null,
            loading:false,
            page:0,
            pageTotal:1,
            pageMax: 9,
            displayList: [],
            galleryList:[
                {title:"Test Gallery 1",previewImg: img1, images:tmpGallery},
                {title:"Test Gallery 2",previewImg: img2, images:tmpGallery},
                {title:"Test Gallery 3",previewImg: img3, images:tmpGallery},
                {title:"Test Gallery 4",previewImg: img4, images:tmpGallery},
                {title:"Test Gallery 5",previewImg: img5, images:tmpGallery},
                {title:"Test Gallery 6",previewImg: img6, images:tmpGallery},
                {title:"Test Gallery 7",previewImg: img1, images:tmpGallery},
                {title:"Test Gallery 8",previewImg: img2, images:tmpGallery},
                {title:"Test Gallery 9",previewImg: img3, images:tmpGallery},
                {title:"Test Gallery 10",previewImg: img4, images:tmpGallery}
            ]
        }

        this.selectGallery = this.selectGallery.bind(this);
        this.galleryFilter = this.galleryFilter.bind(this);
        this.changePage = this.changePage.bind(this);
    } 

    render(){        
        return(
            <div className="site-page gallery">
                <section className="title-card c1">
                    <h1 className="font-title1">Gallery</h1>
                    <div className="back-img">
                        <div className="cover c3c2"></div>
                        <img src={backImg} />
                    </div>
                </section>

                <section className="body-section gallery-display notched-top">
                    {/* All Galleries */}
                    {(this.state.selected === null ?
                        <div className="galleryListContainer" >
                            <div className="galleryListSubContainer" >
                                {this.state.displayList.map((gallery,i) =>
                                    <div className="galleryItem" key={i} onClick={() => this.selectGallery(gallery)}>
                                        <div className="itemContainer">
                                            <div className="img-container"><img src={gallery.previewImg} /></div>
                                            <div className="item-title">{ gallery.title }</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div class="listControl">
                                <div class="ctrl-container">
                                    <div class="ctrl ctrl-left" onClick={() => this.changePage(-1)}><i class="fas fa-caret-left" ></i></div>
                                    <div class="page-values"><span class="ctrl-page">{this.state.page + 1}</span> / <span class="ctrl-total">{this.state.pageTotal}</span></div>
                                    <div class="ctrl ctrl-right" onClick={() => this.changePage(1)}><i class="fas fa-caret-right"></i></div>
                                </div>
                            </div>
                        </div> :<span></span> 
                    )}

                    {/* Selected Galleries */}
                    {(this.state.selected !== null ? 
                        <div className="selected-gallery">
                            <div className="gallery-tag all" onClick={() => this.selectGallery(null)}>    
                                <div className="tag-img"><i class="fas fa-arrow-left"></i></div>
                                <div className="tag-info"><div className="tag-title">Return To Ministry List</div></div>                                
                            </div>
                            <h1 className="font-title1">{this.state.selected.title }</h1>
                            <ImageGallery items={this.state.selected.images.map(function(item){ return {"original":item, "thumbnail":item}; })}/>
                        </div> : <span></span>   
                    )}                        
                </section>
            </div>   
        );        
    }

    componentDidMount(){
        let self = this;    
        this.loadGalleries();    
    }

    selectGallery(gallery){
        var self = this;
        try {
            this.setState({selected: gallery});
        }
        catch(ex){
            console.log("Error selecting gallery: ", ex);
        }
    }

    loadGalleries(){
        var self =this;
        try {
            var newPgTotal = Math.ceil(self.state.galleryList.length / self.state.pageMax);
            this.setState({ pageTotal: newPgTotal}, () => { this.galleryFilter(); });
        }
        catch(ex){
            console.log("Error loading galleries: ", ex);
        }
    }

    galleryFilter() {
        var self =this;
        var ret = [];
        try {
            var list = self.state.galleryList;
            var newPgTotal = Math.ceil(list.length / self.state.pageMax);
            this.setState({ pageTotal: newPgTotal});

            var minItem = this.state.page * this.state.pageMax;
            var maxItem = ((this.state.page+1) < newPgTotal ? ((this.state.page+1) * this.state.pageMax) :list.length);
    
            ret = list.slice(minItem, maxItem);
        }
        catch(ex){
            console.log("Error filtering galleries: ", ex);
        }

        this.setState({displayList: ret});
    }

    changePage(direction) {
        var newPg = 0;
        if(direction < 0){
            newPg = (this.state.page == 0 ? this.state.page : this.state.page -1);
        }
        else {
            newPg = (this.state.page == (this.state.pageTotal -1) ? this.state.page : this.state.page +1);
        }

        this.setState({page: newPg}, () => { this.galleryFilter(); });        
    }
}

export default Gallery;