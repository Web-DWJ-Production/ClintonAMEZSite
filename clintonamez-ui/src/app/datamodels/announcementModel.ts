import { LineTypeModel } from './lineTypeModel';

export class AnnouncementModel {
    public media: string;
    public defaultMedia: string;
    public type: string;
    public title: string;
    public order: number;
    public lines: LineTypeModel[];    

  constructor(myOrder, myMedia, myType, myTitle, myLines) {
        this.order = myOrder;
        this.media = myMedia;
        this.type = myType;
        this.title = myTitle;
        this.lines = myLines;
    }
}
