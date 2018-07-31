import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxCarousel } from 'ngx-carousel';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

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
  public ministryImgs = [];
  public ministryActivities = [];
  public siblingCarousel: NgxCarousel;
  public mId:string = null;
  
  constructor(private coreService: CoreService, private route: ActivatedRoute, private mScrollbarService: MalihuScrollbarService) { }

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
        self.ministryImgs = self.groupImgs(self.ministryComponent.images);
        self.ministryActivities = self.groupActivities(self.ministryComponent.activities);
    });
  }

  public getAddress(name){
    var cleanName = name.split(' ').join("%20");
    return "/site/ministries/"+cleanName;
  }

  public logoEmpty(logo) {
    return (logo == null || logo == "");
  }

  public groupImgs(list){
    var groups = [];
    var groupNum = -1;
    var insertNum = 0;
    for(var i =0; i < list.length; i++){
      if(insertNum == 0) { groupNum++; insertNum = (groupNum%2 ==0 ? 3 : 4);}
      if(groups[groupNum] == undefined){ groups.push(new Array());}

      groups[groupNum].push(list[i]);
      insertNum--;
    }
    return groups;
  }

  public groupActivities(list){
    var groups = [];
    var groupNum = -1;
    var insertNum = 0;
    for(var i =0; i < list.length; i++){
      if(insertNum == 0) { groupNum++; insertNum = 2;}
      if(groups[groupNum] == undefined){ groups.push(new Array());}

      groups[groupNum].push(list[i]);
      insertNum--;
    }
    return groups;
  }

  public getImgSz(i){
    return (i == 1 || i == 2? "sz-15": "sz-30");
  }

  public horizontalJump(tag){
    let time = 1000;
    var timeInc = 10;
    var loc = (tag == '' ? 0: document.getElementById(tag).offsetLeft);
    let scrollArea = document.getElementsByClassName('slide-top');
    // Value of difference between points
    var distance = loc - scrollArea[0].scrollLeft;
    // pixels per .25 sec
    var pps = distance / (time/timeInc);

    this.setJumpTimer(timeInc, pps, scrollArea[0], loc, (distance > 0));
  }

  public setJumpTimer(time, pps, scrollArea, finalLoc, forwardDir){
    var self = this;
    if((forwardDir && scrollArea.scrollLeft < finalLoc) 
    || (!forwardDir && scrollArea.scrollLeft > finalLoc)){
      setTimeout(()=> {
        scrollArea.scrollLeft = scrollArea.scrollLeft + pps;
        self.setJumpTimer(time, pps, scrollArea, finalLoc, forwardDir);
      }, time);
    }
  }
}