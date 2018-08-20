import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatSort, MatTableDataSource} from '@angular/material';
import { FileUploader } from 'ng2-file-upload';
/* Data Models */

/* Service */
import { AuthService } from '../../../../services/authServices';
import { CoreService } from '../../../../services/coreServices';

@Component({
  selector: 'cms-gallery',
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.less', '../../cms.styles.less']
})
export class GalleryComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: this.coreService.getUploadImagesUrl()});

  public dataSource;
  public galleryObject = {
    selected: null,
    list: [],
    page:0,
    pageTotal:1,
    pageMax: 8,
    loading: false
  };
  public selectAlbum = null;
  public newAlbum = null;

  constructor(private authService: AuthService, private coreService: CoreService, private chRef: ChangeDetectorRef) { }
  

  ngOnInit() { 
    this.loadGalleries();
    this.dataSource = new MatTableDataSource(this.uploader.queue);
  } 

  /* Load all Galleries */
  public loadGalleries(){
    var self = this;

    this.galleryObject.loading = true;
    this.coreService.getGalleryList().subscribe(res => { 
      self.galleryObject.list = res.filter(it => { 
        return !it.title.toLowerCase().startsWith("_");
      });
      self.galleryObject.pageTotal = Math.ceil(res.length / self.galleryObject.pageMax);

      this.galleryObject.loading = false;
    });
  }

  /* Set Selected Display */
  public changeSelected(gallery){
    var self = this;
    this.galleryObject.selected = gallery;

    if(gallery != null){
      if(self.galleryObject.selected.images == null || self.galleryObject.selected.images == undefined){
        this.galleryObject.loading = true;
        this.coreService.getGallery(this.galleryObject.selected.setId).subscribe(res => { 
          self.galleryObject.selected.images = res;
          this.galleryObject.loading = false;
        });
      }
    }

  }
  
  /* Set Display */
  public galleryFilter(){
    var self = this;
    var ret = [];
    try {
      ret = self.galleryObject.list;

      // Pagnation
      this.galleryObject.pageTotal = Math.ceil(ret.length / this.galleryObject.pageMax);

      var minItem = this.galleryObject.page * this.galleryObject.pageMax;
      var maxItem = ((this.galleryObject.page+1) < this.galleryObject.pageTotal ? ((this.galleryObject.page+1) * this.galleryObject.pageMax) :ret.length);
    
      ret = ret.slice(minItem, maxItem);
    }
    catch(ex){
      console.log("Error: ", ex);
    }
    return ret;
  }

  /* Change page */
  public changePage(direction) {
    if(direction < 0){
      this.galleryObject.page = (this.galleryObject.page == 0 ? this.galleryObject.page : this.galleryObject.page -1);
    }
    else {
      this.galleryObject.page = (this.galleryObject.page == (this.galleryObject.pageTotal -1) ? this.galleryObject.page : this.galleryObject.page +1);
    }
    this.chRef.detectChanges();
  }

  /* Check Ready For upload */
  public readyForUpload(){
    var self = this;
    var status = false;
    try {
      status = (self.uploader.queue.length > 0 
        && self.selectAlbum != null 
        && (self.selectAlbum != "_NewAlbum_" || ( self.newAlbum && self.albumNameValidator() == null)));
    }
    catch(ex){
      console.log("Error Checking Status: ", ex);
    }
    return status;
  }

  /* New Album Name Validator */
  public albumNameValidator(){
    var self = this;
    let aname = self.newAlbum;

    if(aname){
      if(aname.startsWith("_")){
        return {"underscore": true};
      }

      var nameList = self.galleryObject.list.filter(it => { 
        return it.title.toLowerCase() == aname.toLowerCase();
      });

      if(nameList && nameList.length> 0){
        return { "repeat":true };
      }
    }

    return null;
  }

  /* Upload Files */
  public uploadImgs(){
    var self = this;
    try {
      var albumName = ((self.selectAlbum == "_NewAlbum_") ?  self.newAlbum : self.selectAlbum);
      var createAlbum = ((self.selectAlbum == "_NewAlbum_" && self.newAlbum) ? true: false);  

      self.uploader.onBuildItemForm = (fileItem: any, form: any) => {        
        form.append('name' , albumName);
        form.append('createNew' , createAlbum);
      };
      self.uploader.uploadAll();
      self.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
        if(self.uploader.progress == 100){
          // Clear upload values
          self.selectAlbum = null;
          self.newAlbum = null;

          // Load Galleries
          self.loadGalleries();
        }
      }
    }
    catch(ex){
      // Error Message
    }
  }

  
}
