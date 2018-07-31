import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EventsModel } from '../../../../datamodels/eventsModel';

@Component({
    selector:'event-dialog',  
    templateUrl: './eventDialog.html',
    styleUrls: ['./eventDialog.less', '../../site.styles.less']
})
export class EventDialogComponent {
    zoomVal: number = 15;
    constructor(
      public dialogRef: MatDialogRef<EventDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: EventsModel) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }

  
}