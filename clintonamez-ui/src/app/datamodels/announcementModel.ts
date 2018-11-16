import { LineTypeModel } from './lineTypeModel';

export class AnnouncementModel {
    public _id: any;
    //public media: any;
    public mediaArray: string[];
    public type: string;
    public title: string;
    public order: number;
    public lines: LineTypeModel[];    

  constructor(myOrder, myMedia, myType, myTitle, myLines) {
        this.order = myOrder;
        //this.media = myMedia;
        this.mediaArray = [myMedia];
        this.type = myType;
        this.title = myTitle;
        this.lines = myLines;
    }
}
