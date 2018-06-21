import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GalleryModel } from '../../../../datamodels/galleryModel';

/* Services */
import { CoreService } from '../../../../services/coreServices';

@Pipe({ name: 'galleryfilter' })
export class GalleryFilterPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(items: GalleryModel[], searchText: string) {
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter( it => { 
        return it.title.toLowerCase().includes(searchText);
    });
  }
}

@Pipe({ name: 'gallerypaging' })
export class GalleryPagingPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(items: GalleryModel[], searchText: string) {
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter( it => { 
        return it.title.toLowerCase().includes(searchText);
    });
  }
}

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
  public galleryList: GalleryModel[] = null;

  constructor(private coreService: CoreService) { }
  ngOnInit() {
      this.loadGalleries();
   }   

  public loadGalleries(){
    var self = this;
    this.coreService.getTmpGalleries(function(res){
      if(!res.errorMessage){
        self.galleryObject.list = res.results;
        self.galleryObject.pageTotal = Math.ceil(res.results.size / self.galleryObject.pageMax);
      }
    });
  }

  public displayGalleryList(){
    var self = this;
    var ret = [];

    try {
      var minItem = this.galleryObject.page * this.galleryObject.pageMax;
      var maxItem = ((this.galleryObject.page+1) < this.galleryObject.pageTotal ? ((this.galleryObject.page+1) * this.galleryObject.pageMax) : this.galleryObject.list.length);

      ret = this.galleryObject.list.slice(minItem, maxItem);
    }
    catch(ex){
      console.log("error: ", ex);
    }
    return ret;
  }

  public getDisplayImg(gallery){
    return (gallery.images == null || gallery.images == 0 ? '' : gallery.images[0]);
  }
}
