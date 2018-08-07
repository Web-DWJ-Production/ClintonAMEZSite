import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxCarousel } from 'ngx-carousel';
import { MatDialog } from '@angular/material';

/* Data Models */
import { LineTypeModel } from '../../../../datamodels/lineTypeModel';
import { AnnouncementModel } from '../../../../datamodels/announcementModel';
import { MinistryModel } from '../../../../datamodels/ministryModel';
import { EventsModel } from '../../../../datamodels/eventsModel';

/* Services */
import { CoreService } from '../../../../services/coreServices';

/* Components */
import { EventDialogComponent } from '../../components/templates/eventDialog';

@Component({
  selector: 'pg-home',
  templateUrl: './home.html',
  styleUrls: ['./home.less']
})
export class HomeComponent implements OnInit {
  public mainCarousel: NgxCarousel;
  public eventsCarousel: NgxCarousel;

  public homeCards: AnnouncementModel[];
  public ministryList: MinistryModel[];
  public eventsList: EventsModel[];
  public intervalId = null;
  public mobileCheck = new RegExp('Android|webOS|iPhone|iPad|' + 'BlackBerry|Windows Phone|'  + 'Opera Mini|IEMobile|Mobile' , 'i');
  
  constructor(private coreService: CoreService, public dialog: MatDialog) { }

  ngOnInit() { 
    this.mainCarousel = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1, speed: 400, interval: 10000,
      point: { visible: true },
      load: 2, touch: true, loop: true, custom: 'banner'
    }

    this.eventsCarousel = {
      grid: {xs: 1, sm: 2, md: 3, lg: 3, all: 0},
      slide: 3, speed: 0, interval: 0,
      point: { visible: true },
      load: 3, touch: true, loop: false, custom: 'banner'
    }

    this.loadAnnouncements();
    this.loadMinistries();
    this.loadEvents();
  }
  
  public loadCarousel(loadType:string, event: Event) { }

  public loadAnnouncements(){
    var self = this;
    this.coreService.getAnnouncements(function(res){
      if(res.errorMessage == null){
        self.homeCards = res.results;
      }
    });
  }

  public loadMinistries(){
    var self = this;
    self.ministryList = [];
    
    this.coreService.getMinistries("all").subscribe(res => { 
      if(!res.errorMessage){
        var key1 = Object.keys(res.results);
        for(var i=0; i < key1.length; i++){
          var key2 = Object.keys(res.results[key1[i]].children);
          for(var j =0; j < key2.length; j++){
            self.ministryList.push(res.results[key1[i]].children[key2[j]]);
          }
        }
      }
    });
  }

  public loadEvents(){
    var self = this;
    this.coreService.getTmpEvents(function(res){
      if(!res.errorMessage){
        self.eventsList = res.results;
      }
    });
  }

  public getPageType(type){
    var cardType = type.split("-");
    return cardType[0];
  }

  public isBold(bold){
    return(bold == true? 'bold': '');
  }

  public scrollActivate(direction:number , container: string){
    var containerObj = document.getElementById(container);
    let scrollSpace: number = 15;

    if(containerObj != null && !this.mobileCheck.test(navigator.userAgent)){
      clearInterval(this.intervalId);

      this.intervalId = setInterval(function() {
        let scrollLoc: number = containerObj.scrollLeft + (scrollSpace * direction);
        containerObj.scrollLeft = scrollLoc;
      }, 25);
    }
  }

  public scrollDeactivate(){
    clearInterval(this.intervalId);
  }

  public openEvent(evnt):void{
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '75%',
      data: evnt
    });
  }
}
