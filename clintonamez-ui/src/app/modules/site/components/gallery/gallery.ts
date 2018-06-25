import { Component, OnInit, Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GalleryModel } from '../../../../datamodels/galleryModel';

/* Services */
import { CoreService } from '../../../../services/coreServices';

@Component({
  selector: 'pg-gallery',
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.less']
})
export class GalleryComponent implements OnInit {
  public galleryObject = {
    selected: null,
    list: [],
    page:0,
    pageTotal:1,
    pageMax: 8
  };
  public searchText: string="";

  constructor(private coreService: CoreService, private chRef: ChangeDetectorRef) { }
  ngOnInit() {
      this.loadGalleries();
   }   

  public loadGalleries(){
    var self = this;
    /*this.coreService.getTmpGalleries(function(res){
      if(!res.errorMessage){
        self.galleryObject.list = res.results;
        self.galleryObject.pageTotal = Math.ceil(res.results.size / self.galleryObject.pageMax);
      }
    });*/

    this.coreService.getGalleryList().subscribe(res => { 
      self.galleryObject.list = res;
      self.galleryObject.pageTotal = Math.ceil(res.length / self.galleryObject.pageMax);
    });
  }

  public changeSelected(gallery){
    this.galleryObject.selected = gallery;
  }

  public changePage(direction) {
    if(direction < 0){
      this.galleryObject.page = (this.galleryObject.page == 0 ? this.galleryObject.page : this.galleryObject.page -1);
    }
    else {
      this.galleryObject.page = (this.galleryObject.page == (this.galleryObject.pageTotal -1) ? this.galleryObject.page : this.galleryObject.page +1);
    }
    this.chRef.detectChanges();
  }
  
  public galleryFilter(search, list){
    var ret = [];
    try {
      ret = list.filter(it => { 
        return it.title.toLowerCase().includes(search);
      });

      // Pagnation
      this.galleryObject.pageTotal = Math.ceil(list.length / this.galleryObject.pageMax);

      var minItem = this.galleryObject.page * this.galleryObject.pageMax;
      var maxItem = ((this.galleryObject.page+1) < this.galleryObject.pageTotal ? ((this.galleryObject.page+1) * this.galleryObject.pageMax) :list.length);
    
      ret = ret.slice(minItem, maxItem);
    }
    catch(ex){
      console.log("Error: ", ex);
    }
    return ret;
  }

  public getDisplayImg(gallery){
    return (gallery.images == null || gallery.images == 0 ? '' : gallery.images[0]);
  }
}
