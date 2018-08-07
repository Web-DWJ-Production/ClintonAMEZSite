import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxCarousel } from 'ngx-carousel';

/* Models */
import { MinistryModel } from '../../../../datamodels/ministryModel';
/* Services */
import { CoreService } from '../../../../services/coreServices';

@Component({
  selector: 'pg-ministries',
  templateUrl: './ministries.html',
  styleUrls: ['./ministries.less']
})
export class MinistriesComponent implements OnInit {
  public ministryList:{sectionTitle: string, list: MinistryModel[]}[] = [];
  public ministryCarousel: NgxCarousel;

  constructor(private coreService: CoreService) { }

  ngOnInit() { 
    this.ministryCarousel = {
      grid: {xs: 1, sm: 3, md: 3, lg: 3, all: 0},
      slide: 1, speed: 400, interval: 10000,
      point: { visible: true },
      load: 2, touch: true, loop: true, easing: 'ease'
    }
    this.loadMinistries();
  }  
  
  public loadMinistries(){
    var self = this;
    this.coreService.getMinistries("all").subscribe(res => { 
      if(!res.errorMessage){
        self.ministryList =[];
        var key1 = Object.keys(res.results);
        for(var i=0; i < key1.length; i++){
          var tmpObj = {"sectionTitle":key1[i], "list":[]};
          var key2 = Object.keys(res.results[key1[i]].children);

          for(var j =0; j < key2.length; j++){
            tmpObj.list.push(res.results[key1[i]].children[key2[j]]);
          }
          self.ministryList.push(tmpObj);
        }
      }
    });
  }

  public getAddress(name){
    var cleanName = name.replace(/([&\/\\()])/g,"_").split(' ').join("");
    return "/site/ministries/"+cleanName;
  }
}
