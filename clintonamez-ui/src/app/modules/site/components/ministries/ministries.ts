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
    /*this.coreService.getTmpMinistries().subscribe(res => { 
        self.ministryList = res;
    });*/
    self.coreService.getTmpMinistries( function(res){
        self.ministryList = res.results;
    });
  }

  public getAddress(name){
    var cleanName = name.split(' ').join("%20");
    return "/site/ministries/"+cleanName;
  }
}
