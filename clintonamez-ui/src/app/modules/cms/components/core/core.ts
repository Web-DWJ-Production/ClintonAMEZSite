import { Component, OnInit, ViewChild, ComponentFactoryResolver, EventEmitter, NgZone } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { Router } from '@angular/router';

/* Service */
import { AuthService } from '../../../../services/authServices';

/* Components */
import { CoreDirective } from '../../directives/core.directive';
import { SignInComponent } from '../signin/signin';
import { HomeComponent } from '../home/home';
import { SettingsComponent } from '../settings/settings';
import { AdminComponent } from '../admin/admin';
import { CalendarComponent } from '../calendar/calendar';
import { MinistriesComponent } from '../ministries/ministries';
import { GalleryComponent } from '../gallery/gallery';

/* Data Models */
import { CmsNavModel } from '../../../../datamodels/cmsNavModel';
import { UserInfoModel } from '../../../../datamodels/userInfoModel';

@Component({
  selector: 'cms-core',
  templateUrl: './core.html',
  styleUrls: ['./core.less'],
  animations:[]
})
export class CMSCoreComponent implements OnInit {
  @ViewChild(CoreDirective) coreHost: CoreDirective;
  
  public cmsNavItems = {
    "signin":{ "navItem":null, "template":SignInComponent },
    "settings":{ "navItem":null, "template":SettingsComponent },
    "admin":{ "navItem":null, "template":AdminComponent },
    "announcements": { "navItem":new CmsNavModel('announcements', 'fa-bullhorn', 'announcements', null, false), "template":HomeComponent},
    "ministries": { "navItem":new CmsNavModel('ministries', 'fa-child', 'ministries', null, false), "template":MinistriesComponent},    
    "gallery": { "navItem":new CmsNavModel('gallery', 'fa-images', 'gallery', null, false), "template":GalleryComponent},
    "calender": { "navItem":new CmsNavModel('calender', 'fa-calendar-alt', 'calender', null, false), "template":CalendarComponent},    
    "forms": { "navItem":new CmsNavModel('forms', 'fa-clipboard', 'forms', null, false), "template":HomeComponent}    
  };

  public userInfo: UserInfoModel = null;

  public navData = {
    "displayList": [],
    "selectedTemp":null
  };

  constructor(private router: Router, public zone: NgZone, private componentFactoryResolver: ComponentFactoryResolver, private authService: AuthService) { }
  ngOnInit() {
    this.validateUser();
  } 
  
  /* User Validation */
  public validateUser(){
    var self = this;
    this.authService.validateUser(function(res){
      self.userInfo = res;
      self.buildNavData(res);
      self.setTemplate(self.navData.selectedTemp);
    });
  }
  /* Set CMS Template */
  public setTemplate(template){
    this.navData.selectedTemp = template;    
    let templateComponent = (template in this.cmsNavItems ? this.cmsNavItems[template].template : HomeComponent);

    try {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(templateComponent);
      let viewContainerRef = this.coreHost.viewContainerRef;
      viewContainerRef.clear();
      let componentRef = viewContainerRef.createComponent(componentFactory);         
    }
    catch(ex){ console.log(ex); }
  }

  /* Build User Permission Based Navigation List */
  public buildNavData(myUserInfo) {
    if(myUserInfo != null){
      var tmpList = Object.keys(myUserInfo.permissions);
      for(var i = 0; i < tmpList.length; i++){
        if(myUserInfo.permissions[tmpList[i]] == true){
          this.navData.displayList.push(this.cmsNavItems[tmpList[i]].navItem);
        }
      }
    }
    else {
      this.navData.selectedTemp = "signin";
    }    
  }

  /* Check if logged in user is an Admin */
  public isAdmin(){
    return (this.userInfo != null && this.userInfo.adminStatus);
  }

  /* Check if navitem is active */
  public isActive(name){
    return (this.navData.selectedTemp == name ? 'active' : '');
  }

  /* Log User Out */
  public logOut(){
    if(this.authService.logoutUser()){      
      this.validateUser();
    }
    else {
      // Error Message unable to logout
    }
  }

  public test(){
    console.log("this is a test");
  }
  /*End*/
}
