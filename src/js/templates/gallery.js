import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import axios from 'axios';

import backImg from "../../assets/img/tmpMedia/img3.jpg";

class Gallery extends Component{
    constructor(props) {
        super(props);

        //this.rootPath = "";
        this.rootPath = "http://localhost:7777";

        this.state = {
            selected:null,
            selectedImages:[],
            loading:false,
            page:0,
            pageTotal:1,
            pageMax: 9,
            displayList: [],
            galleryList:[]
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
                        <img src={backImg} alt="gallery background img"/>
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
                                            <div className="img-container"><img src={gallery.previewImg} alt="gallery preview img"/></div>
                                            <div className="item-title">{ gallery.title }</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="listControl">
                                <div className="ctrl-container">
                                    <div className="ctrl ctrl-left" onClick={() => this.changePage(-1)}><i className="fas fa-caret-left" ></i></div>
                                    <div className="page-values"><span className="ctrl-page">{this.state.page + 1}</span> / <span className="ctrl-total">{this.state.pageTotal}</span></div>
                                    <div className="ctrl ctrl-right" onClick={() => this.changePage(1)}><i className="fas fa-caret-right"></i></div>
                                </div>
                            </div>
                        </div> :<span></span> 
                    )}

                    {/* Selected Galleries */}
                    {(this.state.selected !== null ? 
                        <div className="selected-gallery">
                            <div className="gallery-tag all" onClick={() => this.selectGallery(null)}>    
                                <div className="tag-img"><i className="fas fa-arrow-left"></i></div>
                                <div className="tag-info"><div className="tag-title">Return To Ministry List</div></div>                                
                            </div>
                            <h1 className="font-title1">{this.state.selected.title }</h1>
                            <ImageGallery items={this.state.selectedImages.map(function(item){ return {"original":item, "thumbnail":item}; })}/>
                        </div> : <span></span>   
                    )}                        
                </section>
            </div>   
        );        
    }

    componentDidMount(){
        let self = this;    
        window.scrollTo(0, 0);
        self.loadGalleries();    
    }

    selectGallery(gallery){
        var self = this;
        try {
            self.setState({selected: gallery});

            axios.post(self.rootPath + "/api/getIndGallery", {setId:gallery.setId}, {'Content-Type': 'application/json'})
            .then(function(response) {
                var galleryData = response.data.results
                self.setState({ selectedImages: galleryData});
            });
        }
        catch(ex){
            console.log("Error selecting gallery: ", ex);
        }
    }

    loadGalleries(){
        var self = this;
        try {
            fetch(self.rootPath + "/api/getGalleries")
            .then(function(response) {
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                self.setState({ galleryList: data.results}, () => {
                    var newPgTotal = Math.ceil(self.state.galleryList.length / self.state.pageMax);
                    self.setState({ pageTotal: newPgTotal}, () => { self.galleryFilter(); });
                });                
            });
        }
        catch(ex){
            console.log(" Error loading galleries: ",ex);
        }
    }

    galleryFilter() {
        var self =this;
        var ret = [];
        try {
            var list = self.state.galleryList;
            var newPgTotal = Math.ceil(list.length / self.state.pageMax);
            this.setState({ pageTotal: newPgTotal});

            var minItem = self.state.page * self.state.pageMax;
            var maxItem = ((self.state.page+1) < newPgTotal ? ((self.state.page+1) * self.state.pageMax) :list.length);
    
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
            newPg = (this.state.page === 0 ? this.state.page : this.state.page -1);
        }
        else {
            newPg = (this.state.page === (this.state.pageTotal -1) ? this.state.page : this.state.page +1);
        }

        this.setState({page: newPg}, () => { this.galleryFilter(); });        
    }
}

export default Gallery;