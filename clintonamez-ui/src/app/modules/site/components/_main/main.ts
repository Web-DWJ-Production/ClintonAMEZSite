import { Component} from '@angular/core';
import { CmsNavModel } from '../../../../datamodels/cmsNavModel';

@Component({
    templateUrl: './main.html',
    styleUrls: ['./main.less', '../../site.styles.less']
  })
  export class MainComponent {    
    constructor(){ }   

    public navitems: CmsNavModel[] = [
      new CmsNavModel("about us", null, 'site/about-us', [new CmsNavModel("our history", null, 'site/about-us/our-history', null, false), new CmsNavModel("our staff", null, 'site/about-us/our-staff', null, false),new CmsNavModel("service information", null, 'site/about-us/our-service', null, false),new CmsNavModel("inside zion", null, 'http://www.amez.org/', null,true)], false),
      new CmsNavModel("pastors page", null, '', null, false),
      new CmsNavModel("ministries", null, '', null, false),
      new CmsNavModel("get connected", null, '', [new CmsNavModel("events calender", null, '', null, false), new CmsNavModel("clinton resources", null, '', null, false)], false),
      new CmsNavModel("gallery", null, '', null, false),
      new CmsNavModel("contact us", null, 'site/contact-us', null, false)
    ];
  }