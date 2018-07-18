import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxCarousel } from 'ngx-carousel';

/* Models */
import { MinistryModel } from '../../../../datamodels/ministryModel';
/* Services */
import { CoreService } from '../../../../services/coreServices';

@Component({
  selector: 'pg-ministy',
  templateUrl: './indMinistry.html',
  styleUrls: ['./indMinistry.less']
})
export class indMinistryComponent implements OnInit {
  public ministryComponent: MinistryModel = null;
  public siblingCarousel: NgxCarousel;
  public mId:string = null;

  constructor(private coreService: CoreService, private route: ActivatedRoute) { }

  ngOnInit() { 
    this.siblingCarousel = {
        grid: {xs: 1, sm: 3, md: 4, lg: 4, all: 0},
        slide: 1, speed: 400, interval: 10000,
        point: { visible: true },
        load: 2, touch: true, loop: true, easing: 'ease'
    }
    this.route.params.forEach((params: Params) => {
        if (params['id'] !== undefined) {
          this.mId = params['id'];
          this.loadMinistry(this.mId);
        }
        else {
          console.log("Invalid Ministry Name");
        }
    });
  }  
  
  public loadMinistry(mId){
    var self = this;
    /*this.coreService.getTmpMinistry(mId).subscribe(res => { 
        self.ministryComponent = res;
    });*/
    self.coreService.getTmpMinistry(mId, function(res){
        self.ministryComponent = res.results;
    });
  }

  public getAddress(name){
    var cleanName = name.split(' ').join("%20");
    return "/site/ministries/"+cleanName;
  }

  public logoEmpty(logo) {
      return (logo == null || logo == "");
  }
}
