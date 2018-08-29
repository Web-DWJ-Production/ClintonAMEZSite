import { Component, Input, Renderer } from '@angular/core';


@Component({
  selector:'dynamic-field',  
  templateUrl: './dynamicField.html',
  styleUrls: ['./announcements.less', '../../cms.styles.less']
})
export class DynamicFieldComponent {   
    @Input() text: string; 

    constructor(private renderer: Renderer){    }

    ngOnInit() {}

    public textAreaAdjust(obj, ret){
        obj.style.height = "1px";
        var objHeight = (2+obj.scrollHeight)+"px";
        obj.style.height = objHeight;
        
        if(ret) return objHeight;
    }
}