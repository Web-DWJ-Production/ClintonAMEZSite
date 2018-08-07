import { Component, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import {trigger, transition, style, animate, keyframes, query, stagger, group, state, animateChild} from '@angular/animations'

import { MinistryModel } from '../../../../datamodels/ministryModel';

@Component({
  selector:'dynamic-list',  
  templateUrl: './dynamicList.html',
  styleUrls: []
})
export class DynamicListComponent {   
    @Input() models: MinistryModel[]; 
    constructor(private renderer: Renderer){    }

    ngOnInit() {  }    
}