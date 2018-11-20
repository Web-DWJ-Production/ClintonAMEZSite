export class EventsModel {
    public title: string;
    public who: string;
    
    //public location: {lat:number, lng: number, address:string};
    public location: string;

    private start_dt: Date;
    private end_dt: Date;

    constructor(myTitle, myDate, myLoc){        
        this.title = myTitle;
        //this.date = myDate;
        this.location = myLoc;
    }
}