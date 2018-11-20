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
    church = {"location": {lat: 39.0959446, lng: -77.1504001}};
    constructor(
      public dialogRef: MatDialogRef<EventDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: EventsModel) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    getTime(event): string {
      var retTime = null;
      try {
        var stDt = new Date(event.start_dt);
        var endDt = new Date(event.end_dt);
        retTime = (stDt.getTime() != endDt.getTime() ? stDt.toLocaleTimeString('en-US') + " - " +endDt.toLocaleTimeString('en-US') : stDt.toLocaleTimeString('en-US'));
      }
      catch(ex){

      }
      return retTime;
    }

  
}