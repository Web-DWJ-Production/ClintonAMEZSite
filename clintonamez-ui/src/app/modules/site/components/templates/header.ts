import { Component, Output, Input, EventEmitter, HostListener, ViewChild, ElementRef, Renderer } from '@angular/core';
import {trigger, transition, style, animate, keyframes, query, stagger, group, state, animateChild} from '@angular/animations'

import { CmsNavModel } from '../../../../datamodels/cmsNavModel';

@Component({
  selector:'my-header',  
  templateUrl: './_header.html',
  styleUrls: ['./_header.less', '../../site.styles.less']
})
export class HeaderComponent {
    @Output() toggleEvent = new EventEmitter<string>();
    @Input() navitems: CmsNavModel[];    
    @ViewChild('clintonHeader') el:ElementRef;

    public additonalMenu = {display: false, items:[], title: null, titlepage: ''};

    constructor(private renderer: Renderer){}

    toggleSideNav() {
      this.toggleEvent.next();
    }
    
    showAdditionalMenu(item){
      var menu = item.subPages;

      if(menu != null){
        this.additonalMenu.title = item.title;
        this.additonalMenu.titlepage = item.page;
        this.additonalMenu.items = menu;
        this.additonalMenu.display = true;
      }
      else {
        this.additonalMenu.title = null;
        this.additonalMenu.titlepage = '';
        this.additonalMenu.display = false;
        this.additonalMenu.items = [];
      }
    }

    hideAdditionalMenu(){
      if(this.additonalMenu.display == true){
        this.additonalMenu.display = false;
        this.additonalMenu.items = [];
      }
    }
}