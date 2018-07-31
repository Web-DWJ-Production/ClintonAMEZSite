export class EventsModel {
    public title: string;
    public date: string;
    public time: string;
    public location: {lat:number, lng: number, address:string};

    constructor(myTitle, myDate, myLoc){        
        this.title = myTitle;
        this.date = myDate;
        this.location = myLoc;
    }
}